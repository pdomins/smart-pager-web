import Spinner from './spinner'

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="inline-block">
        <Spinner />
      </div>
    </div>
  )
}
