interface Props {
  children: React.ReactNode
  className?: string
}
export default function Container(props: Props) {
  const { children, className } = props

  return (
    <div
      className={`${className || ''} max-w-7xl mx-auto px-6 md:px-12 xl:px-6`}
    >
      {children}
    </div>
  )
}
