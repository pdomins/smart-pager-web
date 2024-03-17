export default function Loading() {
    return (
        <div className='flex justify-center items-center min-h-screen'>

        <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-t-transparent text-info motion-reduce:animate-spin"
            role="status">
        <span
            className="sr-only">
                Loading...
        </span>
        </div>
        </div>
    )
}
