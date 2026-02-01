import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PlaceMentor - Are You Actually Ready for Placements?',
  description: 'Get your real placement readiness score in 3 minutes. Brutally honest analysis of your resume against actual job requirements.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}