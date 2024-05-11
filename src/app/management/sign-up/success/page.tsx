import RegistrationSuccess from '@/components/restaurants/sign-up/success'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '¡Gracias! - Smart Pager',
  description: 'smartpager.com.ar',
}

export default function Page() {
  return <RegistrationSuccess />
}
