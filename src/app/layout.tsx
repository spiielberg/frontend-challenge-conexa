import { LoadingPage } from '@/components/loading-page'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode, Suspense } from 'react'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Frontend Challenge Conexa',
  description: 'Generated by create next app',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Suspense fallback={<LoadingPage />}>{children}</Suspense>
      </body>
    </html>
  )
}

export default RootLayout
