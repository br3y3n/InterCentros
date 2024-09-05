import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const CardCampeonato = () => {
    const [campeonatos, setCampenatos] = useState(null)
    useEffect(() => {
        const obtenerCampeonatos = async () => {
          const response = await axios.get('http://localhost:3001/campeonato')
          if (response == undefined) {
            setCampenatos(null)
          } else {

            setCampenatos(response.data)
          }
        }
        obtenerCampeonatos()
      }, [])
  return (
    <>
        
    {campeonatos && campeonatos.map((campeonato) => (
    <article className="relative w-full sm:w-[48%] lg:w-[45%] xl:w-[30%] p-6 rounded-xl bg-white border border-gray-200 shadow-lg transition-shadow hover:shadow-2xl">
    <div className="flex flex-col gap-4">
    <h1 className="text-2xl font-semibold text-gray-800">
      <span className="font-bold text-xl">Nombre:</span> {campeonato.nombreCampeonato}
    </h1>
    <p className="text-lg text-gray-700">
      <span className="font-bold text-xl">Descripción:</span> {campeonato.descripcion}
    </p>
    <p className="text-lg text-gray-700">
      <span className="font-bold text-xl">Estado Campeonato:</span> {campeonato.estadoCampeonato}
    </p>
    <p className="text-lg text-gray-700">
      <span className="font-bold text-xl">Tipo Campeonato:</span> {campeonato.tipoCampeonato}
    </p>
    <p className="text-lg text-gray-700">
      <span className="font-bold text-xl">Fecha de inicio:</span> {campeonato.fechaInicio}
    </p>
    <p className="text-lg text-gray-700">
      <span className="font-bold text-xl">Fecha de finalización:</span> {campeonato.fechaFin}
    </p>

    <div className="flex gap-4 mt-4">
      {campeonato.tipoCampeonato == 'Intercentros' && campeonato.estadoCampeonato == 'Inscripcion'?
      
        <Link to={`/intercentros/verparticipantes/${campeonato._id}`}>
          <button className="px-6 py-3 text-sm font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:shadow-xl focus:opacity-90 focus:shadow-none active:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50">
            Ver Participantes Inter
          </button>
        </Link>
          :campeonato.tipoCampeonato == 'Intercentros' && campeonato.estadoCampeonato == 'Ejecucion'?
          <Link to={`/intercentros/cronograma/${campeonato._id}`}>
          <button className="px-6 py-3 text-sm font-medium text-white bg-[#12aed1cd] border-none rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:shadow-xl focus:opacity-90 focus:shadow-none active:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50">
           Agregar Resultados Inter
          </button>
        </Link>:''
        }
    </div>
  </div>
    </article>
    ))}
    </>
  )
}
