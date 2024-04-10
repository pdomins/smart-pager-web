import Container from '../style/container'
import Gradient from '../style/gradient'
import Spinner from './spinner'

export default function Loading() {
  return (
    <div className="relative flex min-h-screen justify-center items-center">
      <Gradient />
      <Container>
        <div className="relative inline-block">
          <Spinner />
        </div>
      </Container>
    </div>
  )
}
