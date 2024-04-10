export default function Gradient() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 "
    >
      <div className="blur-[106px] h-56 bg-gradient-to-br from-purple-400 to-purple-400"></div>
      <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300"></div>
    </div>
  )
}
