export default function Navbar() {
  return (
    <nav className="bg-amber-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  // strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-emnn justify-start sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center" />
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <h2 className=" text-left text-2xl mr-5 pr-5 font-bold text-black">
                  Smart Pager
                </h2>
                <a
                  href="#"
                  className="bg-amber-300 text-black rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Analytics
                </a>
                <a
                  href="#"
                  className="text-black hover:bg-amber-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Team
                </a>
                <a
                  href="#"
                  className="text-black hover:bg-amber-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="text-black hover:bg-amber-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
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
            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Analytics
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
