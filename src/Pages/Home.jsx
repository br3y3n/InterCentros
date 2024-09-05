import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CardCampeonato } from '../Components/Cards/CardCampeonato'

export const Home = () => {
  
 
  return (
    <div className="flex w-[85vw] mx-auto mt-10">
    <div className="flex flex-wrap gap-6 w-full justify-center">
      
        
         <CardCampeonato/>
    
    </div>
  </div>
  )
}
