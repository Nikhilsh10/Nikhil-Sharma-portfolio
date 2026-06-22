'use client';

import React from 'react';
import Image from 'next/image';
import { IconMail, IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';
import { useReveal } from '@/hooks/useReveal';

export default function ContactSection() {
  const ref = useReveal();

  const contacts = [
    {
      name: 'Email',
      value: 'nikhilsh810@gmail.com',
      href: 'mailto:nikhilsh810@gmail.com',
      icon: IconMail,
    },
    {
      name: 'GitHub',
      value: 'github.com/Nikhilsh10',
      href: 'https://github.com/Nikhilsh10',
      icon: IconBrandGithub,
    },
    {
      name: 'LinkedIn',
      value: 'linkedin.com/in/nikhil-sh10',
      href: 'https://linkedin.com/in/nikhil-sh10',
      icon: IconBrandLinkedin,
    },
    {
      name: 'Twitter / X',
      value: 'x.com/Nikhil_Sharam10',
      href: 'https://x.com/Nikhil_Sharam10',
      icon: IconBrandX,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal py-24 px-4 md:px-8 xl:px-0"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-2 mb-12">
          <span className="text-micro font-semibold tracking-[0.15em] uppercase text-primary opacity-70">
            04 / Contact
          </span>
        </div>

        <div className="glass-panel rounded-card p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Invitation copy */}
            <div className="flex flex-col">
              {/* Avatar */}
              <div className="mb-8 overflow-hidden rounded-full w-[120px] h-[120px] bg-primary/10 relative flex items-center justify-center">
                <span
                  className="text-[40px] font-semibold text-primary select-none"
                  id="avatar-initials"
                  aria-hidden="true"
                >
                  NS
                </span>
                <Image
                  src="/avatar.jpg"
                  alt="Nikhil Sharma"
                  width={120}
                  height={120}
                  className="absolute inset-0 w-full h-full object-cover"
                  onLoad={() => {
                    const initials = document.getElementById('avatar-initials');
                    if (initials) initials.style.display = 'none';
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              <h2
                id="contact-heading"
                className="text-display font-semibold text-textPrimary leading-tight mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
              >
                Get in touch.
              </h2>
              <p className="text-bodyLg text-textSecondary max-w-md" style={{ lineHeight: 1.65 }}>
                Currently open to AI/ML internship opportunities and entry-level
                roles. Reach out via any channel below.
              </p>
            </div>

            {/* Contact links */}
            <div className="flex flex-col gap-4 w-full max-w-md lg:ml-auto">
              {contacts.map((contact) => {
                const Icon = contact.icon;
                const isEmail = contact.href.startsWith('mailto:');
                return (
                  <a
                    key={contact.name}
                    href={contact.href}
                    target={isEmail ? undefined : '_blank'}
                    rel={isEmail ? undefined : 'noopener noreferrer'}
                    className="flex items-center p-4 glass-panel rounded-btn hover:border-primary/50 group transition-all duration-[var(--duration-hover)] focus-ring"
                  >
                    <div className="text-textSecondary group-hover:text-primary transition-colors">
                      <Icon size={24} stroke={1.5} aria-hidden="true" />
                    </div>
                    <div className="ml-4 flex flex-col">
                      <span className="text-micro font-semibold text-textSecondary uppercase tracking-wider mb-0.5">
                        {contact.name}
                      </span>
                      <span className="text-body font-medium text-textPrimary group-hover:text-primary transition-colors">
                        {contact.value}
                      </span>
                    </div>
                    <div
                      aria-hidden="true"
                      className="ml-auto text-textTertiary group-hover:text-primary transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-150"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
                      </svg>
                    </div>
                  </a>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
