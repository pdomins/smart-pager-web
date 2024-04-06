import Link from 'next/link'

export default function Footer() {
  return (
    <div className="relative flex inset-x-0 bottom-0 justify-center my-3.5">
      <div className={'flex text-base font-light'}>
        © 2024 Copyright:
        <Link
          href="/"
          className={
            'pl-1 text-center font-light hover:text-violet-700 text-decoration-none '
          }
        >
          Smart Pager
        </Link>
      </div>
    </div>
  )
}
