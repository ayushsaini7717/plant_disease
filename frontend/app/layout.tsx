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
          <header className="flex justify-end items-center p-4 gap-4 h-16 bg-gradient-to-br from-green-400/10 to-lime-500/10">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-green-700 text-white text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <LanguageProvider>{children}</LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
