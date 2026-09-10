-- ==============================================================================
-- SCHEMA DE BASE DE DONNÉES SUPABASE — GÎTE "LES RESTANQUES"
-- ==============================================================================

-- 1. Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'rejected', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE blocked_source AS ENUM ('manual', 'airbnb_ical');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. TABLE: bookings (Demandes et Réservations)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    guest_first_name TEXT NOT NULL,
    guest_last_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT NOT NULL,
    guest_message TEXT,
    guest_locale TEXT DEFAULT 'fr' NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests_count INTEGER NOT NULL CHECK (guests_count >= 1 AND guests_count <= 6),
    include_cleaning BOOLEAN DEFAULT false NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    status booking_status DEFAULT 'pending' NOT NULL,
    rejection_reason TEXT,
    CONSTRAINT check_dates CHECK (check_out > check_in)
);

-- Index for date availability searches
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON public.bookings (check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings (status);

-- 4. TABLE: blocked_dates (Blocages manuels ou synchronisés depuis Airbnb)
CREATE TABLE IF NOT EXISTS public.blocked_dates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    source blocked_source DEFAULT 'manual' NOT NULL,
    CONSTRAINT check_blocked_dates CHECK (end_date >= start_date)
);

CREATE INDEX IF NOT EXISTS idx_blocked_dates_range ON public.blocked_dates (start_date, end_date);

-- 5. TABLE: pricing_rules (Saisons et Règles Tarifaires)
CREATE TABLE IF NOT EXISTS public.pricing_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price_per_night NUMERIC(10, 2) NOT NULL,
    min_stay_nights INTEGER DEFAULT 7 NOT NULL,
    allowed_checkin_days INTEGER[] DEFAULT '{6}'::INTEGER[] NOT NULL,
    CONSTRAINT check_pricing_dates CHECK (end_date >= start_date)
);

-- 6. SEED DATA (Saisons par défaut)
INSERT INTO public.pricing_rules (name, start_date, end_date, price_per_night, min_stay_nights, allowed_checkin_days)
VALUES 
    ('Basse Saison 2026', '2026-01-01', '2026-04-30', 140.00, 3, '{0,1,2,3,4,5,6}'),
    ('Moyenne Saison Printemps 2026', '2026-05-01', '2026-06-30', 190.00, 4, '{0,1,2,3,4,5,6}'),
    ('Haute Saison Été 2026', '2026-07-01', '2026-08-31', 260.00, 7, '{6}'),
    ('Moyenne Saison Automne 2026', '2026-09-01', '2026-09-30', 190.00, 4, '{0,1,2,3,4,5,6}'),
    ('Basse Saison Hiver 2026', '2026-10-01', '2026-12-31', 140.00, 3, '{0,1,2,3,4,5,6}')
ON CONFLICT DO NOTHING;

-- 7. SECURITY & ROW LEVEL SECURITY (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;

-- Pricing rules: Public can read, authenticated admin can mutate
CREATE POLICY "Public read pricing rules" ON public.pricing_rules FOR SELECT USING (true);
CREATE POLICY "Admin write pricing rules" ON public.pricing_rules FOR ALL TO authenticated USING (true);

-- Blocked dates: Public can read to compute calendar availability, authenticated admin can mutate
CREATE POLICY "Public read blocked dates" ON public.blocked_dates FOR SELECT USING (true);
CREATE POLICY "Admin write blocked dates" ON public.blocked_dates FOR ALL TO authenticated USING (true);

-- Bookings: Public can insert pending booking requests; public can read dates (status confirmed or pending) for calendar availability; authenticated admin has full access
CREATE POLICY "Public insert booking" ON public.bookings FOR INSERT WITH CHECK (status = 'pending');
CREATE POLICY "Public read booking dates" ON public.bookings FOR SELECT USING (status IN ('pending', 'confirmed'));
CREATE POLICY "Admin full access bookings" ON public.bookings FOR ALL TO authenticated USING (true);
