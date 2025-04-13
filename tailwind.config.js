/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./ts/*.ts"],
  safelist: [
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
    "text-7xl",
    "text-8xl",
    "text-9xl",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // Body text color
            '--tw-prose-body': 'var(--color-text-main)',
            // Headings color
            '--tw-prose-headings': 'var(--color-text-main)',
            // Lead paragraph color
            '--tw-prose-lead': 'var(--color-text-secondary)',
            // Link color
            '--tw-prose-links': 'var(--color-text-main)',
            // Bold text color
            '--tw-prose-bold': 'var(--color-text-main)',
            // List counters color
            '--tw-prose-counters': 'var(--color-text-secondary)',
            // List bullets color
            '--tw-prose-bullets': 'var(--color-text-secondary)',
            // Horizontal rule color
            '--tw-prose-hr': 'var(--color-text-secondary)',
            // Blockquote text color
            '--tw-prose-quotes': 'var(--color-text-main)',
            // Blockquote border color
            '--tw-prose-quote-borders': 'var(--color-text-secondary)',
            // Caption text color
            '--tw-prose-captions': 'var(--color-text-secondary)',
            // Inline code color
            '--tw-prose-code': 'var(--color-text-main)',
            // Preformatted code background color
            '--tw-prose-pre-bg': 'var(--color-dark-main)',
            // Preformatted code text color
            '--tw-prose-pre-code': 'var(--color-dark-text-main)',
            // Table header border color
            '--tw-prose-th-borders': 'var(--color-dark-secondary)',
            // Table cell border color
            '--tw-prose-td-borders': 'var(--color-dark-secondary)',
            // Inverted body text color (dark mode)
            '--tw-prose-invert-body': 'var(--color-dark-text-main)',
            // Inverted headings color (dark mode)
            '--tw-prose-invert-headings': 'var(--color-dark-text-main)',
            // Inverted lead paragraph color (dark mode)
            '--tw-prose-invert-lead': 'var(--color-dark-text-secondary)',
            // Inverted link color (dark mode)
            '--tw-prose-invert-links': 'var(--color-dark-text-main)',
            // Inverted bold text color (dark mode)
            '--tw-prose-invert-bold': 'var(--color-dark-text-main)',
            // Inverted list counters color (dark mode)
            '--tw-prose-invert-counters': 'var(--color-dark-text-secondary)',
            // Inverted list bullets color (dark mode)
            '--tw-prose-invert-bullets': 'var(--color-dark-text-secondary)',
            // Inverted horizontal rule color (dark mode)
            '--tw-prose-invert-hr': 'var(--color-dark-text-secondary)',
            // Inverted blockquote text color (dark mode)
            '--tw-prose-invert-quotes': 'var(--color-dark-text-main)',
            // Inverted blockquote border color (dark mode)
            '--tw-prose-invert-quote-borders': 'var(--color-dark-text-secondary)',
            // Inverted caption text color (dark mode)
            '--tw-prose-invert-captions': 'var(--color-dark-text-secondary)',
            // Inverted inline code color (dark mode)
            '--tw-prose-invert-code': 'var(--color-dark-text-main)',
            // Inverted preformatted code background color (dark mode)
            '--tw-prose-invert-pre-bg': 'var(--color-dark-main)',
            // Inverted preformatted code text color (dark mode)
            '--tw-prose-invert-pre-code': 'var(--color-dark-text-main)',
            // Inverted table header border color (dark mode)
            '--tw-prose-invert-th-borders': 'var(--color-dark-text-secondary)',
            // Inverted table cell border color (dark mode)
            '--tw-prose-invert-td-borders': 'var(--color-dark-text-secondary)',
          },
        },
      },
    },
  },
}

