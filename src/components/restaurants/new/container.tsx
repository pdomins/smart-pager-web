interface Props {
  children: React.ReactNode
}
export default function Container(props: Props) {
  const { children } = props

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">{children}</div>
  )
}
