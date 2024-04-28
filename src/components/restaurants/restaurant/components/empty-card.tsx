const EmptyCardWithMessage = ({ message }: { message: string }) => (
  <div className="my-10 py-5 px-4 bg-white shadow rounded-lg flex justify-center items-center">
    <p className="text-gray-600">{message}</p>
  </div>
)

export default EmptyCardWithMessage
