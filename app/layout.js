import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PlaceMentor - Are You Actually Ready for Placements?',
  description: 'Get your real placement readiness score in 3 minutes. Brutally honest analysis of your resume against actual job requirements.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}