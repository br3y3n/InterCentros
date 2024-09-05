import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CardEquipo } from '../Cards/CardEquipo'
import { useNavigate, useParams } from 'react-router-dom'
import { SorteoEquiposInter } from '../../utils/SorteoEquiposInter'

export const Inscripcion = () => {
  const { id } = useParams()
  const [cedulaEquipo, setCedulaEquipo] = useState()
  const [equipos, setEquipos] = useState([])
  const [equiposInscritos, setEquiposInscritos] = useState([])
  const [sorteo, setSorteo] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const equiposInscritos = async () => {
      const response = await axios.get('http://localhost:3001/equipoInscripto', {
        headers: {
          id: id
        }
      })
      console.log(response.data)

      setEquiposInscritos(response.data)
    }
    equiposInscritos()
  }, [])

  const searchEquipo = async (idEquipo) => {
    try {
      const response = await axios.get(`http://localhost:3001/inscripcionEquipos/${idEquipo}`)
      if (response.data == "EQUIPO NO ENCONTRADO") {
        alert("Equipo no encontrado")
      } else {
        alert("Equipo encontrado correctaente")
        const responseInscripcion = await axios.post(`http://localhost:3001/equipoInscripto`, {
          Equipo: response.data,
          idCampeonato: id
        })

        alert(responseInscripcion.data.msg)
        setEquipos(prev => [...prev, response.data])
      }
    } catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    if (equipos.length === 3 || equiposInscritos.length === 3) {
      setSorteo(true)
    }
  }, [equipos, equiposInscritos])

  console.log(sorteo)
  const sorteoIntercentros = async () => {
    if(equipos.length === 3){
      const data= {
        equipos: equipos,
        idCampeonato: id
      }

     SorteoEquiposInter(data)
    }

    if(equiposInscritos.length === 3){
      const data= {
        equipos: equiposInscritos,
        idCampeonato: id
      }
      
      SorteoEquiposInter(data)
    }
    navigate(`/intercentros/cronograma/${id}`)
  }
  console.log(sorteo)
  console.log(equiposInscritos)
  return (
    <article>
      {sorteo && equiposInscritos.length >0 ? '' :
        <form class="max-w-md mx-auto mt-5">
          <label for="buscar_equipo" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="buscar_equipo"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Busca el equipo por numero de cedula" required
              onChange={(e) => setCedulaEquipo(e.target.value)}
            />
            <button type="button"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              onClick={() => searchEquipo(cedulaEquipo)}
            >Buscar</button>
          </div>
        </form>
      }
      <div className='flex justify-evenly mt-10 flex-wrap'>
        {equipos.length > 0 ? equipos.map((equipo, index) => (
          <CardEquipo key={index} equipo={equipo}/>
        )):
         equiposInscritos.map((equipo, index)=>(
          <CardEquipo key={index} equipo={equipo.Equipo} />
        ))
        }
      </div>
      {sorteo ?
        <div className='flex justify-center'>
          <button
            onClick={() => sorteoIntercentros()}
            className='mt-5 bg-black font-medium text-white py-5 px-2 rounded-md'>Sortear Equipos</button>

        </div>
        : ''}
    </article>
  )
}
