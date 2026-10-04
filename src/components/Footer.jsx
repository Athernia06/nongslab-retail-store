const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    path: 'M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.9.07s-3.63 0-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.37 2.2 8.76 2.2 12 2.2Zm0 1.8c-3.15 0-3.52 0-4.77.06-1.08.05-1.67.23-2.06.38-.52.2-.89.44-1.28.83-.39.39-.63.76-.83 1.28-.15.39-.33.98-.38 2.06C2.61 8.48 2.6 8.85 2.6 12s.01 3.52.06 4.77c.05 1.08.23 1.67.38 2.06.2.52.44.89.83 1.28.39.39.76.63 1.28.83.39.15.98.33 2.06.38 1.25.05 1.62.06 4.77.06s3.52-.01 4.77-.06c1.08-.05 1.67-.23 2.06-.38.52-.2.89-.44 1.28-.83.39-.39.63-.76.83-1.28.15-.39.33-.98.38-2.06.05-1.25.06-1.62.06-4.77s-.01-3.52-.06-4.77c-.05-1.08-.23-1.67-.38-2.06a2.9 2.9 0 0 0-.83-1.28 2.9 2.9 0 0 0-1.28-.83c-.39-.15-.98-.33-2.06-.38C15.52 4 15.15 4 12 4Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-2.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z',
  },
  {
    label: 'X / Twitter',
    href: 'https://twitter.com',
    path: 'M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-6.5L6.2 22H3l7.3-8.3L1.2 2h6.4l4.5 6 5.8-6Zm-1.1 18h1.7L7 3.9H5.2L17.8 20Z',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    path: 'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z',
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    path: 'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z',
  },
]

const LINK_GROUPS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Ready-to-Eat', href: '#menu' },
      { label: 'Coffee & Drinks', href: '#menu' },
      { label: 'Hot Snacks', href: '#menu' },
      { label: 'Ice Cream', href: '#menu' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Store Locator', href: '#stores' },
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#about' },
      { label: 'Press', href: '#about' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center', href: '#about' },
      { label: 'Feedback', href: '#about' },
      { label: 'Privacy Policy', href: '#about' },
      { label: 'Terms of Service', href: '#about' },
    ],
  },
]

export default function Footer() {
  return (
    <footer id="about" className="bg-ink-900 text-ink-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
              <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
                <path d="M8 3a3 3 0 0 0-3 3H4.5A1.5 1.5 0 0 0 3 7.5v6A1.5 1.5 0 0 0 4.5 15H5v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-3h.5a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 19.5 7H18a3 3 0 0 0-3-3H8Z" />
              </svg>
            </span>
            <span className="text-left leading-tight">
              <span className="block text-base font-extrabold text-white">
                FamilyStore
              </span>
              <span className="block text-[10px] font-mono font-bold tracking-widest text-brand-300 uppercase">
                Retail Demo
              </span>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm text-ink-400">
            A demo convenience-store experience — fresh ready-to-eat, hot
            coffee, and express self-pickup, built mobile-first.
          </p>
          <div className="mt-5 flex gap-2.5">
            {SOCIALS.map(({ label, href, path }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-ink-300 transition hover:bg-brand-600 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {LINK_GROUPS.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h3 className="text-xs font-bold tracking-widest text-white uppercase">
                {group.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-400 transition hover:text-brand-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-5 sm:flex-row sm:justify-between sm:px-6">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} FamilyStore / Retail Demo. All rights
            reserved.
          </p>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-400" />
            <span className="text-xs font-semibold text-brand-300">
              Built by{' '}
              <span className="font-bold text-brand-200">
                Nongslab Digital Studio
              </span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
