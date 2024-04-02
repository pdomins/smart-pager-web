import { signIn } from 'next-auth/react'
import Image from 'next/image'
import GoogleLogo from '../../app/images/logo/companies/google/logo.svg'

export const SignInWithGoogleButton: React.FC = () => {
  return (
    <button
      className="mx-auto mb-5 col-12 font-semibold py-2 px-4 border-2 border-gray-200 hover:bg-blue-500 hover:text-white focus:outline-none focus:border-current focus:shadow-none rounded-sm text-sm transition-colors duration-150 ease-in-out"
      onClick={() =>
        signIn('google', {
          callbackUrl: '/management',
        })
      }
    >
      <div className="flex items-center justify-center space-x-2">
        <Image
          width={24}
          height={24}
          src={GoogleLogo.src}
          alt=""
          className="block"
        />
        <span>Iniciar sesión con Google</span>
      </div>
    </button>
  )
}
