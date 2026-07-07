import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono, Be_Vietnam_Pro, Lora } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
})

const lora = Lora({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nguyễn Ngọc Phương — Portfolio',
  description: 'Full Stack Engineer & Creative Developer. Insert USB to explore my digital workspace.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ]
  },
  openGraph: {
    title: 'Nguyễn Ngọc Phương — Portfolio',
    description: 'An interactive OS-style portfolio. Insert USB. Boot PC. Explore.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} ${beVietnamPro.variable} ${lora.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  )
}
