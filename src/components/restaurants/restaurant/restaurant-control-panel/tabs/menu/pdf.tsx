import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css' // please dont delete -- needed for pdf styling

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

const ViewMenu = ({ menu }: { menu: string }) => {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [isErrored, setIsErrored] = useState(false)
  const width = document?.getElementById('PdfDiv')?.clientWidth || 200

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  return (
    <div className="flex flex-col items-center" id="PdfDiv">
      {isErrored ? (
        <div className="w-full max-w-md p-4 border border-red-400 bg-red-100 rounded-lg shadow">
          <p className="text-red-700 text-center">
            Ha ocurrido un error al intentar mostrar tu menú. Por favor, intenta
            nuevamente más tarde.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md overflow-hidden">
          <Document
            file={menu}
            onLoadError={() => setIsErrored(true)}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              width={width}
            />
          </Document>
          <div className="flex flex-col items-center">
            <p>
              Página {pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}
            </p>
            <div className="flex items-center justify-center space-x-2">
              <button
                type="button"
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-violet-700/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                disabled={pageNumber <= 1}
                onClick={previousPage}
              >
                <span className="relative text-purple-700">Anterior</span>
              </button>
              <button
                type="button"
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-violet-700/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
              >
                <span className="relative text-purple-700">Siguiente</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewMenu
