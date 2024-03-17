export default function AboutUs() {
  return (
    <div className="min-h-screen relative">
      <p className="font-averta text-m pt-5 text-indigo-500">SOBRE NOSOTROS</p>
      <p className="text-5xl mb-4 mt-2 text-custom-blue">
        <b>
          En Smart Pager nuestra idea es <br className="block md:inline" />{' '}
          integrar todo lo que su comercio
          <br className="block md:inline" /> necesita, en un sólo lugar.
        </b>
      </p>
      <p className="text-4xl mb-4 pt-5 text-custom-blue flex justify-end text-right">
        Para esto le brindamos una plataforma <br className="block md:inline" />{' '}
        que permite cargar su menú y gestionar a sus
        <br className="block md:inline" /> clientes en la fila, todo de manera
        eficiente
        <br className="block md:inline" /> y desde cualquier lugar.
      </p>
      <div className="flex justify-center">
        <p className="absolute  bottom-0 text-4xl mb-4 pt-5 text-custom-blue">
          ¿Qué está esperando?{' '}
          <span className="border-b-4 border-amber-400 mb-4">
            <a
              href="#"
              className="text-custom-blue hover:text-indigo-500 px-3 py-2 font-lg"
            >
              ¡Empiece ahora!
            </a>
          </span>{' '}
        </p>
      </div>
    </div>
  )
}
