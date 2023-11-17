import footrcuckLogo from '../app/images/food_truck_logo.png';
export default function ClientLanding() {

    return (
        <>
        <main className="flex min-h-screen flex-col  p-24 bg-primary"> {/* TODO: COLORS ON TAILWIND CONFIG  */}

                    <div className="flex flex-col justify-center text-center my-7">
                        <h1 className="text-6xl font-bold text-black">Smart</h1>
                        <h2 className="text-2xl font-bold text-black">Tu fila inteligente</h2>
                    </div>
        <div className='flex justify-around'>
            <div className="flex flex-row items-center">
                <div className="flex flex-col ml-10 my-4">
                    <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold m-3 py-2 px-4 rounded">
                        Anotarme a la fila
                    </button>
                    <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold m-3 py-2 px-4 rounded">
                        Retirar pedido
                    </button>
                    <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold m-3 py-2 px-4 rounded">
                        Menu
                    </button>
                </div>
            </div>
            <div className="flex box-content w-1/3 flex-row items-center">
                <img className="object-contain  box-content" src={footrcuckLogo.src} alt="logo" />
            </div>    
        </div>      
      </main>
        </>
    )
}