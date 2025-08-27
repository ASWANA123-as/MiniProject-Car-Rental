import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import Header from './Components/Header'
import Footer from './Components/Footer'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import About from './Pages/About'
import Cars from './Pages/Cars'
import Contact from './Pages/Contact'

function App() {
  const [count, setCount] = useState(0)
  const router=createBrowserRouter([
    {
      path:'/',
      element:<NavBar/>,
      children:[
        {path:'/',element:<Home/>},
         {path:'/about',element:<About/>},
          {path:'/cars',element:<Cars/>},
           {path:'/contact',element:<Contact/>},
         
      ]
    }
  ])

  return  (
    
    <>
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header/>
    <HomePage/>
    <Footer/>
    </div>
  
    </>
  )
}

export default App
