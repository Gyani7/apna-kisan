
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Apna Kisan',
  description: 'The modern farming ecosystem.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", GeistSans.variable)}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
