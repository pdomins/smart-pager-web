import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'font-recoleta antialiased text-custom-blue'}>
        {children}
      </body>
    </html>
  )
}
