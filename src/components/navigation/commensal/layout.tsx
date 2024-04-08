/* eslint-disable react/prop-types */
import Footer from '../footer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="bg-custom-bg">
      <div className="flex flex-col justify-between min-h-screen">
        <main className="flex-grow lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm w-full container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full overflow-y-auto py-4">{props.children}</div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
