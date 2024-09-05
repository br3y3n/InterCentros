import { BrowserRouter, useRoutes } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Inscripcion } from './Components/EstadosCampeonatos/Inscripcion'
import { Ejecuccion } from './Components/EstadosCampeonatos/Ejecuccion'
import { Resultados } from './Components/EstadosCampeonatos/Resultados'


function App() {

  const AppRoute =()=>{
    const routes =useRoutes([
      {path:'/', element:<Home/>},
      {path:'/intercentros/verparticipantes/:id', element: <Inscripcion/>},
      {path:'/intercentros/cronograma/:id', element: <Ejecuccion/>},
      {path:'/intercentros/resultados/:id', element: <Resultados/>}
    ])

    return routes
  }

  return (
  <BrowserRouter>
  <AppRoute/>
  </BrowserRouter>
  )
}

export default App
