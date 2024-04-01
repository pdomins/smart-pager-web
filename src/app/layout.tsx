import './globals.css'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'font-averta antialiased text-custom-blue'}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
