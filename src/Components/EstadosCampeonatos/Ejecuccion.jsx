import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CardVs } from '../Cards/CardVs'

export const Ejecuccion = () => {
   const {id} = useParams()
   const [vsEquipos, setVsEquipos] = useState([])
   const [mostrarCambios, setMostrarCambios] = useState(false)
   const navigate = useNavigate()
   useEffect(()=>{
    const obtenerVs = async ()=>{
        const response = await axios.get('http://localhost:3001/vsInter',{
            headers:{
                idCampeonato: id
            }
        })
        setVsEquipos(response.data)

        // const vsLength = response.data.filter((item )=> item.estado == true)
        if(response.data.length === 3){
            console.log("holl")
            setTimeout(()=>{
                navigate(`/intercentros/resultados/${id}`)
            },700)
        }
    }
    obtenerVs()
   },[mostrarCambios])
   console.log(vsEquipos.length)
 
   const infoActualizada =(cambios)=>{
    setMostrarCambios(!mostrarCambios)
   }
  return (
   <div className='flex justify-evenly mt-12'>
    {vsEquipos && vsEquipos.map((vs, index)=>(
        <CardVs  key={index} vs={vs} cambiosRealizados={infoActualizada}   />

    ))}

   </div>
  )
}
