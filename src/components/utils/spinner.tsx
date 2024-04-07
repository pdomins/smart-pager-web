import Image from 'next/image'
import SpinnerAnimation from '@/app/images/loading/spinner.svg'

const Spinner = () => {
  return (
    <Image
      src={SpinnerAnimation.src}
      alt="Loading..."
      width={62}
      height={62}
      unoptimized={true}
    />
  )
}

export default Spinner
