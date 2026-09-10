"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig, photos } from "@/config/site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "./PageHeader";
import { Reveal } from "./Reveal";

interface ContactFormProps {
  locale?: Locale;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-faint">
        {label}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function ContactForm({ locale = "fr" }: ContactFormProps) {
  const dict = getDictionary(locale);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, locale }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const details = [
    { label: dict.contactPage.addressLabel, value: dict.contactPage.addressValue },
    {
      label: dict.contactPage.emailLabel,
      value: (
        <a
          href={`mailto:${siteConfig.email}`}
          className="border-b border-ink/25 pb-0.5 transition-colors duration-300 hover:border-ink/70"
        >
          {siteConfig.email}
        </a>
      ),
    },
    { label: dict.contactPage.hostLabel, value: dict.contactPage.hostValue },
  ];

  return (
    <>
      <PageHeader
        eyebrow={dict.contactPage.eyebrow}
        title={dict.contactPage.heroTitle}
        lede={dict.contactPage.heroSubtitle}
      />

      <div className="shell pb-section">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Coordonnées */}
          <Reveal className="lg:col-span-4">
            <dl className="border-t border-provence-200">
              {details.map((detail, index) => (
                <div key={index} className="border-b border-provence-200 py-5">
                  <dt className="font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-faint">
                    {detail.label}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="photo relative mt-10 aspect-[4/3] w-full">
              <Image
                src={photos.terrassePergola}
                alt="La terrasse ombragée des Restanques"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover object-[45%_60%]"
              />
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal className="lg:col-span-7 lg:col-start-6" delay={100}>
            {isSuccess ? (
              <div className="border-t border-provence-200 py-16 text-center">
                <h2 className="font-serif text-display-sm text-ink">
                  {dict.contactPage.successTitle}
                </h2>
                <p className="mx-auto mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-soft">
                  {dict.contactPage.success}
                </p>
                <Button
                  variant="outline"
                  className="mt-10"
                  onClick={() => {
                    setIsSuccess(false);
                    setSubject("");
                    setMessage("");
                  }}
                >
                  {dict.contactPage.sendAnother}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="border-b border-provence-200 pb-5 font-serif text-display-sm text-ink">
                  {dict.contactPage.formTitle}
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <Field label={`${dict.contactPage.name} *`}>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={dict.contactPage.namePlaceholder}
                      required
                    />
                  </Field>
                  <Field label={`${dict.contactPage.email} *`}>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={dict.contactPage.emailPlaceholder}
                      required
                    />
                  </Field>
                </div>

                <div className="mt-8">
                  <Field label={`${dict.contactPage.subject} *`}>
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={dict.contactPage.subjectPlaceholder}
                      required
                    />
                  </Field>
                </div>

                <div className="mt-8">
                  <Field label={`${dict.contactPage.message} *`}>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={dict.contactPage.messagePlaceholder}
                      rows={6}
                      required
                    />
                  </Field>
                </div>

                <div className="mt-10 flex justify-end">
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? dict.contactPage.sending : dict.contactPage.sendButton}
                  </Button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </>
  );
}
