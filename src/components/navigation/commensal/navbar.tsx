export default function Navbar() {
  return (
    <nav className="bg-custom-beige">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-emnn justify-start sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <h2 className=" text-left text-2xl mr-5 pr-5 font-bold text-black">
                  Smart Pager
                </h2>
                <a
                  href="#"
                  className="text-black hover:bg-custom-brown hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Team
                </a>
                <a
                  href="#"
                  className="text-black hover:bg-custom-brown hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="text-black hover:bg-custom-brown hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Calendar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
          <a
            href="#"
            className="bg-custom-beige text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Team
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Projects
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  )
}
