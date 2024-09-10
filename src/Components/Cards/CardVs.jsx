import React, { useEffect, useState } from 'react'
import { BuscarPlanillero } from '../Modal/BuscarPlanillero'
import axios from 'axios'

export const CardVs = ({ vs, cambiosRealizados }) => {

  const [hora, setHora] = useState()
  const [fecha, setFecha] = useState()
  const [openmodal, setOpenModal] = useState(false)
  const [nombrePlanillero, setNombrePlanillero] = useState({})

  const handlePlanilleroSeleccionado = (nombre, id) => {
    setNombrePlanillero({
      nombre: nombre,
      idPlanillero: id
    })
    setOpenModal(false)
  }
  const abrirModalPlanillero = () => {
    console.log(openmodal)
    setOpenModal(true)
  }

  const guardarCronograma=async(id)=>{
    const {idPlanillero} = nombrePlanillero
    if(!idPlanillero){
     return alert("primero escoge un planillero")
    }
    const estado = true
    const response = await axios.patch(`http://localhost:3001/vsInter/${id}`,{
      hora, fecha, idPlanillero, estado
    })

    cambiosRealizados(true)

    if(response.data._id ){
      alert("cronograma guardado correctamente ")
    }
    console.log(response.data)
  }

  const cerrarModalPlanillero =()=>{
    setOpenModal(false)
  }
  return (
    <>
    
      {vs&& (
    <article className="w-full sm:w-[48%] lg:w-[45%] xl:w-[30%] p-6 rounded-xl bg-slate-50 border border-gray-200 shadow-lg transition-shadow hover:shadow-2xl">

      
      <div className="flex justify-around items-center gap-4">
        <div>
          <p className="text-lg text-gray-700">
            <img src={vs.equipo1.imgLogo} alt="" className='w-28 ' />
          </p>
          <h1 className="text-2xl font-semibold text-gray-800">
            <span className="font-bold text-xl"></span> {vs.equipo1.nombreEquipo}
          </h1>
        </div>
        <div>
          <h1 className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-600'>vs</h1>
        </div>
        <div>
          <p className="text-lg text-gray-700">
            {vs.equipo2.imgLogo
             ?
            <img src={vs.equipo2.imgLogo} alt="logoImg" className='w-28 ' />
            :
            ''
          }
          </p>
          <h1 className="text-2xl font-semibold text-gray-800">
            <span className="font-bold text-xl"></span> {vs.equipo2.nombreEquipo}
          </h1>
        </div>
      </div>
      <div className='flex mt-5 '>
        <p className="text-lg text-gray-700">
          <span className="font-bold text-xl">Fecha de juego</span>
          {vs.fecha ?
            <span className='font-bold text-xl'>{vs.fecha}</span>
            :

          <input type="date" onChange={(e) => setFecha(e.target.value)} className='bg-transparent' />
          }
        </p>
        <p className="text-lg text-gray-700 ml-32">
          <span className="font-bold text-xl">Hora de juego</span>
          {vs.hora ? 
           <span className='font-bold text-xl'>{vs.hora}</span>  
           :
          <input type="time" onChange={(e) => setHora(e.target.value)} className='bg-transparent' />
        }
        </p>
      </div>

      {nombrePlanillero.nombre&& (
        <div className='flex mt-5 gap-52 '>
          <p className="text-lg text-gray-700">
            <span className="font-bold text-xl">Planillero</span>
          </p>
          <span className='text-2xl font-medium'>{nombrePlanillero.nombre}</span>
        </div>
      )}

      <div className='flex mt-5 gap-32 w-max'>
        <button onClick={abrirModalPlanillero} className='bg-black text-white py-3 px-2 rounded-lg font-bold  drop-shadow-lg shadow-white'>Agregar Planillero</button>
        <button onClick={()=>guardarCronograma(vs._id)} className='bg-black text-white py-3 px-2 rounded-lg font-bold  drop-shadow-lg shadow-white'>Agregar Cronograma</button>

      </div>

      <BuscarPlanillero isOpen={openmodal} onPlanilleroSeleccionado={handlePlanilleroSeleccionado} closeModal={cerrarModalPlanillero} />
      </article>
    )}
</>
  )
}
