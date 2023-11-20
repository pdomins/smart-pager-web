import React, { useRef, useEffect, use, useState } from "react";
import foodtrcuckLogo from '../../../app/images/food_truck_logo.png'
export default function QueueScreen() {
  

  return (
    <>
        <div className="flex absolute top-1/2 left-1/2  translate-x-1/2 -translate-y-1/2  w-1/3 flex-row items-center">
          <img
            className="object-contain blur-sm box-content"
            src={foodtrcuckLogo.src}
            alt="logo"
          />
        </div>
        <div className="min-h-screen flex flex-col justify-center relative ">
            <p className="text-6xl font-sans mb-2 text-center">
                <b>
                tenés <br/> 7 <br/> Personas adelante
                </b>
          </p>
        <p className="text-2sm font-sans text-custom-blue text-center italic mb-2 ">
            <b>
              tiempo estimado: 30 minutos, nosotros te avisamos por mail cuando la mesa este lista
            </b>
          </p>
        </div>

   

    </>
  );
}
