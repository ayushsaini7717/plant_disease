import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { LanguageProvider } from './LanguageContext'

export const metadata: Metadata = {
  title: 'Krishi Saathi',
  description: 'An AI-powered plant disease detection and management app for farmers.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // <ClerkProvider>
    //   <html lang="en">
    //     <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
    //       {children}
    //       <Analytics />
    //     </body>
    //   </html>
    // </ClerkProvider>
    <ClerkProvider>
      <html lang="en">
        <body>
          <LanguageProvider>{children}</LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
