import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const BuscarPlanillero = ({ isOpen, onPlanilleroSeleccionado, closeModal}) => {
    const [modal, setModal] = useState()
    useEffect(() => {
        setModal(isOpen)
    }, [isOpen])
    const [indentificacion, setIndentificacion] = useState()
    const [planillero, setPlanillero] = useState()
    const buscarPlanillero = async (idenfiticacion) => {
        const response = await axios.get(`http://localhost:3001/usuarios/identificacion/${idenfiticacion}`)
       
        setPlanillero(response.data)
    }

    const planilleroInfo =async()=>{
        onPlanilleroSeleccionado(planillero.nombres, planillero._id)
       closeModal()
    }
    return (
        <>
            {modal && (
                <div class="bg-black/60 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-2xl max-h-full">
                        <div class="relative bg-white rounded-lg shadow ">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                                <form class="max-w-md w-full mx-auto mt-5">
                                    <label for="buscar_planillero" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="search"
                                            id="buscar_planillero"
                                            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                                            placeholder="Busca el equipo por numero de cedula" required
                                            onChange={(e) => setIndentificacion(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                                            onClick={() => buscarPlanillero(indentificacion)}
                                        >Buscar</button>
                                    </div>
                                </form>
                                <button onClick={() => closeModal()} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            {planillero && (
                                <>
                                    <div class="p-4 md:p-5 space-y-4">
                                        <p class="text-base leading-relaxed text-gray-500 ">
                                            Nombre {planillero.nombres}
                                        </p>
                                        <p class="text-base leading-relaxed text-gray-500 ">
                                            Correo {planillero.correo}
                                        </p>
                                        <p class="text-base leading-relaxed text-gray-500 ">
                                            Identificacion {planillero.identificacion}
                                        </p>
                                    </div>
                                    <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
                                        <button onClick={()=>planilleroInfo()} data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">I accept</button>
                                        <button data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Decline</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
