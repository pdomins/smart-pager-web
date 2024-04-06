'use client'
import Image from 'next/image'
import Hand from 'public/hand.png'

import Container from '@/components/restaurants/new/container'
import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
export default function Navbar() {
  const { data: session } = useSession()
  // const router = useRouter()

  const unsignedlinks = [
    {
      to: '/#',
      label: 'Registrarse',
    },
    {
      to: '/#',
      label: 'Iniciar Sesión',
    },
  ]

  const signedLinks = [
    {
      to: '/#',
      label: 'Mi Restaurante',
    },
    {
      to: '/#',
      label: 'Lista de Comensales',
    },
    {
      to: '/#',
      label: 'Lista de Pedidos',
    },
    {
      to: '/#',
      label: 'Cerrar sesión',
    },
  ]

  const links = session ? signedLinks : unsignedlinks

  return (
    <nav className="absolute z-10 w-full border-b border-black/5 lg:border-transparent">
      <Container>
        <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 md:gap-0 md:py-4">
          <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-max">
            <div className="flex items-center content-center">
              <Image
                src={Hand.src}
                alt="Logo"
                width={80}
                height={80}
                unoptimized={true}
              />
              <span className="text-2xl font-bold text-gray-900">
                Smart Pager
              </span>
            </div>

            <div className="relative flex max-h-10 items-center lg:hidden">
              <button
                aria-label="humburger"
                id="hamburger"
                className="relative -mr-6 p-6"
              >
                <div
                  aria-hidden="true"
                  id="line"
                  className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300"
                ></div>
                <div
                  aria-hidden="true"
                  id="line2"
                  className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300"
                ></div>
              </button>
            </div>
          </div>
          <div
            id="navLayer"
            aria-hidden="true"
            className="fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 lg:hidden"
          ></div>
          <div
            id="navlinks"
            className="invisible absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-90 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 lg:visible lg:relative lg:flex lg:w-7/12 lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none"
          >
            <div className="w-full text-gray-600  lg:w-auto lg:pr-4 lg:pt-0">
              <ul className="flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
                {/* <li>
                  <a
                    href="https://tailus.gumroad.com/l/astls-premium"
                    target="_blank"
                    className="flex gap-2 font-semibold text-gray-700 transition hover:text-primary md:px-4"
                    rel="noreferrer"
                  >
                    <span>Premium</span>
                  </a>
                </li> */}
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.to}
                      className="hover:text-primary block transition md:px-4"
                    >
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  )
  {
    /* <style>
    #toggle_nav:checked ~ div #hamburger #line {
        @apply translate-y-1.5 rotate-45;
    }

    #toggle_nav:checked ~ div #hamburger #line2 {
        @apply -translate-y-1 -rotate-45;
    }

    .toggled div:first-child {
        @apply translate-y-1.5 rotate-45;
    }
    .toggled div:last-child {
        @apply -translate-y-1 -rotate-45;
    }
</style> */
  }
}
