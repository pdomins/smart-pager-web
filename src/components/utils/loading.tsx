import Gradient from '../style/gradient'
import Spinner from './spinner'

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Gradient />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="relative inline-block">
          <Spinner />
        </div>
      </div>
    </div>
  )
}
