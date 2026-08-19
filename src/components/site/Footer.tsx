import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { contact, destinations } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="surface-deep mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-display text-2xl font-bold tracking-[0.18em] text-current">NOVERA</p>
          <p className="mt-1 text-xs font-semibold tracking-[0.35em] text-current/70">
            INTERNATIONAL
          </p>
          <p className="mt-4 max-w-xs text-sm text-current/75">
            Transforming Lives. Creating New Eras. A professional study abroad and visa
            consultancy based in Colombo, Sri Lanka.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-current">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-current/75">
            {[
              { to: "/about", label: "About Us" },
              { to: "/why-choose-us", label: "Why Choose Us" },
              { to: "/services", label: "Services" },
              { to: "/how-it-works", label: "How It Works" },
              { to: "/contact", label: "Contact Us" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-current">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-current">
            Destinations
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-current/75">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link
                  to="/destinations/$slug"
                  params={{ slug: d.slug }}
                  className="transition-colors hover:text-current"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-current">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-current/75">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <a href={contact.whatsappLink} className="hover:text-current">
                {contact.whatsapp}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0" />
              <a href={`mailto:${contact.email}`} className="break-all hover:text-current">
                {contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{contact.address}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0" />
              <span>
                {contact.hours.map((h) => (
                  <span key={h} className="block">
                    {h}
                  </span>
                ))}
              </span>
            </li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-widest text-current/70">
            {contact.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-current"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-current/60">
        © {new Date().getFullYear()} Novera International. All rights reserved.
      </div>
    </footer>
  );
}
