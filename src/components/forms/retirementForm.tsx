import { useRouter } from "next/navigation";
import React, { useRef, useEffect } from "react";

export default function RetireForm() {
  const router = useRouter();

  function handleClick() {
    router.push("/commensal/retire");
  }

  useEffect(() => {
    //on submit we redirect to /commensal/queue
    const form = document.getElementById("queueForm");

    const handleQueueFormSubmit = (e: Event) => {
      e.preventDefault();
      window.location.href = "/commensal/queue";
    };
    if (form) {
      form.addEventListener("submit", handleQueueFormSubmit);
    }

    return () => {
      if (form) {
        form.removeEventListener("submit", handleQueueFormSubmit);
      }
    };
  });

  return (
    <>
      <div className="min-h-screen font-sans flex flex-col justify-center relative ">
        <form className="w-full max-w-lg">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Inserte su número de orden
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="número de orden"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Inserte su mail
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="ejemplo@mail.com"
            />
          </div>

          <button
            onClick={() => {
              try {
                handleClick;
              } catch (error) {
                console.log(error);
              }
            }}
            className="bg-amber-500 border-gray-500 hover:bg-amber-700 text-white font-bold m-3 py-2 px-4 rounded"
          >
            Siguiente
          </button>
        </form>
      </div>
    </>
  );
}
