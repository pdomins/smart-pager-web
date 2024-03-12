"use client"
import {signIn, signOut, useSession} from 'next-auth/react'
export default function Navbar() {
  const {data: session} = useSession()
  console.log(session)
  return (
    <nav>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex flex-1 items-emnn justify-end sm:items-stretch sm:justify-end">
            <div className="hidden sm:ml-6 sm:block">
              {!session ? ( 
              <div className="flex space-x-16">
                <button
                  // onClick={() =>  signIn()}
                  onClick={() =>  signIn(undefined, {callbackUrl: "http://localhost:3000/restaurants"})}
                  className="font-averta font-light text-custom-blue hover:text-indigo-500 px-3 py-2 font-lg"
                  aria-current="page"
                >
                  Registrar mi Comercio
                </button>
                <a
                  href="#"
                  className="font-averta font-light  text-custom-blue hover:text-indigo-500 px-3 py-2 font-lg"
                >
                  Iniciar Sesion
                </a>
              </div>): (
              <div className="flex space-x-16">
                <button
                  onClick={() => signOut()}
                  className="font-averta font-light text-custom-blue hover:text-indigo-500 px-3 py-2 font-lg"
                  aria-current="page"
                >
                  logout
                </button>
              </div>)}
            </div>
          </div>
        </div>
      </div>
      {/* 
        //<!-- Mobile menu, show/hide based on menu state. --> 
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            // <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> 
            <a
              href="#"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
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
        */}
    </nav>
  )
}
