import Image from 'next/image'
import Spinner from '@/app/images/loading/spinner.svg'

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="inline-block">
        <Image
          src={Spinner.src}
          alt="Loading..."
          width={62}
          height={62}
          unoptimized={true}
        />
      </div>
    </div>
  )
}
