import Link from 'next/link'

export default function Footer() {
  return (
    <div className="relative flex inset-x-0 bottom-0 justify-center my-3.5">
      <div className={'flex text-base font-light'}>
        © 2023 Copyright:
        <Link
          href="/"
          className={
            'pl-1 text-center font-averta font-light hover:text-amber-500 text-decoration-none '
          }
        >
          Smart-Pager
        </Link>
      </div>
    </div>
  )
}
