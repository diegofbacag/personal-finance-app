import type { Metadata } from 'next'
import { Geist, Geist_Mono, Poppins, Outfit } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-sans',
})

const alfa = Outfit({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400'],
  display: 'swap',
  variable: '--font-alfa',
})

export const metadata: Metadata = {
  title: 'Kuntur',
  description: 'Personal finance app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${alfa.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
