/* eslint-disable react/prop-types */

import Footer from './footer'

interface LayoutProps {
  children: React.ReactNode
}

const LayoutWithOutNavbar: React.FC<LayoutProps> = (props) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <main className="flex-grow lg:max-w-screen-lg md:max-w-screen-md max-w-screen-sm container mx-auto">
        <div className="h-full overflow-y-auto">{props.children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default LayoutWithOutNavbar
