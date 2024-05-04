'use client'

import Image from 'next/image'
import Cloche from 'public/cloche.png'

import Container from '@/components/style/container'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const [isToggleActive, setIsToggleActive] = useState(false)

  const baseButtonStyle = 'flex h-11 items-center justify-center px-6'
  const activeTab = 'text-violet-500'

  const unsignedlinks = [
    {
      action: () =>
        signIn('google', {
          callbackUrl: '/management/sign-up',
        }),
      style: baseButtonStyle,
      textStyle: '',
      label: 'Registrarse',
    },
    {
      action: () =>
        signIn('google', {
          callbackUrl: '/management',
        }),
      style:
        baseButtonStyle +
        ' relative before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-violet-700/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max',
      textStyle: 'relative text-purple-700 font-semibold',
      label: 'Iniciar Sesión',
    },
  ]

  const signedLinks = [
    {
      action: () => {
        router.push('/management')
      },
      style: `${baseButtonStyle}`,
      textStyle: `${pathname === '/management' && activeTab}`,
      label: 'Mi Restaurante',
    },
    {
      action: () => {
        router.push('/management/queue')
      },
      style: `${baseButtonStyle}`,
      textStyle: `${pathname.startsWith('/management/queue') && activeTab}`,
      label: 'Comensales',
    },
    {
      action: () => {
        router.push('/management/pick-up')
      },
      style: `${baseButtonStyle}`,
      textStyle: `${pathname.startsWith('/management/pick-up') && activeTab}`,
      label: 'Pedidos',
    },
    {
      action: () => {
        router.push('/management/analytics')
      },
      style: `${baseButtonStyle}`,
      textStyle: `${pathname.startsWith('/management/analytics') && activeTab}`,
      label: 'Analíticas',
    },
    {
      action: () => {
        signOut({ callbackUrl: '/' })
      },
      style: `${baseButtonStyle}  relative before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-violet-700/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max`,
      textStyle: 'relative text-purple-700 font-semibold',
      label: 'Cerrar Sesión',
    },
  ]

  const links =
    status === 'loading'
      ? []
      : session && session.user?.name === 'true'
        ? signedLinks
        : unsignedlinks

  return (
    <nav className="absolute z-10 w-full border-b border-black/5 lg:border-transparent">
      <Container>
        <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 md:gap-0 md:py-4">
          <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-max">
            <button
              className="text-2xl font-bold text-gray-700 pl-1 flex items-end content-center" // text-violet-900
              onClick={() => router.replace('/')}
            >
              <Image
                src={Cloche.src}
                alt="Logo"
                width={40}
                height={40}
                unoptimized={true}
                loading="lazy"
                className="mr-1"
              />
              Smart Pager
            </button>

            <div className="relative flex max-h-10 items-center lg:hidden">
              <button
                aria-label="humburger"
                id="hamburger"
                className={`${
                  isToggleActive ? 'toggled' : ''
                } relative -mr-6 p-6`}
                onClick={() => {
                  setIsToggleActive((toggle) => !toggle)
                }}
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
            className={`${
              isToggleActive ? 'origin-top scale-y-100 ' : ''
            } fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 lg:hidden`}
          ></div>
          <div
            id="navlinks"
            className={`${
              isToggleActive
                ? '!visible !scale-100 !opacity-100 !lg:translate-y-0'
                : ''
            } invisible absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-90 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 lg:visible lg:relative lg:flex lg:w-7/12 lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none`}
          >
            <div className="w-full text-gray-600 lg:w-auto lg:pr-4 lg:pt-0">
              <ul className="flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      className={link.style}
                      onClick={() => link.action()}
                    >
                      <span className={link.textStyle}>{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  )
}
