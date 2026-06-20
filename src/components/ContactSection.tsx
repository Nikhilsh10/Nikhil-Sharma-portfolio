'use client';

import Image from 'next/image';
import { IconMail, IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';

export default function ContactSection() {
  const contacts = [
    { name: 'email', value: 'nikhilsh810@gmail.com', href: 'mailto:nikhilsh810@gmail.com', icon: IconMail },
    { name: 'github', value: 'github.com/Nikhilsh10', href: 'https://github.com/Nikhilsh10', icon: IconBrandGithub },
    { name: 'linkedin', value: 'linkedin.com/in/nikhil-sh10', href: 'https://linkedin.com/in/nikhil-sh10', icon: IconBrandLinkedin },
    { name: 'twitter', value: 'x.com/Nikhil_Sharam10', href: 'https://x.com/Nikhil_Sharam10', icon: IconBrandX },
  ];

  return (
    <section id="contact" aria-label="Contact" className="py-24 px-4 md:px-8 xl:px-0 bg-surface dark:bg-main">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Invitation Copy */}
        <div className="flex flex-col">
          <div className="mb-8 overflow-hidden rounded-full w-[120px] h-[120px] bg-primary/10 relative flex items-center justify-center">
            <span className="text-[40px] font-medium text-primary select-none" id="avatar-initials">NS</span>
            {/* Drop your square-cropped photo into public/avatar.jpg — it will auto-display */}
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
          <h2 className="text-display font-medium text-textPrimary leading-tight mb-4">
            let&apos;s build something that ships.
          </h2>
          <p className="text-bodyLg text-textSecondary max-w-md">
            Currently open to AI/ML internship opportunities and entry-level roles.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-md lg:ml-auto">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <a 
                key={contact.name}
                href={contact.href}
                target={contact.name === 'email' ? undefined : '_blank'}
                rel={contact.name === 'email' ? undefined : 'noopener noreferrer'}
                className="flex items-center p-4 bg-main dark:bg-surface border border-borderCustom rounded-btn hover:border-primary/50 group transition-all duration-hover focus-ring"
              >
                <div className="text-textSecondary group-hover:text-primary transition-colors">
                  <Icon size={24} stroke={1.5} />
                </div>
                <div className="ml-4 flex flex-col">
                  <span className="text-micro font-medium text-textSecondary uppercase tracking-wider mb-0.5">
                    {contact.name}
                  </span>
                  <span className="text-body font-medium text-textPrimary group-hover:text-primary transition-colors">
                    {contact.value}
                  </span>
                </div>
                <div className="ml-auto text-textTertiary group-hover:text-primary transition-colors group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transform duration-150">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"></path><path d="M7 7h10v10"></path></svg>
                </div>
              </a>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
