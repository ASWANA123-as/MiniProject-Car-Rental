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
import Layout from './Components/Layout'
import Login from './Pages/Login'
import Register from './Pages/Register'
import AdminDashboard from './Pages/AdminDashboard'
import CustomerDashboard from './Pages/CustomerDashboard'
import PaymentPage from './Pages/PaymentPage'
import BookingsPage from './Pages/Bookings'
function App() {
  const [count, setCount] = useState(0)

  const router=createBrowserRouter([
    // {
    //    path: "/",
    // element: <HomePage />,
    // },
    {
      path:'/',
      element:<Layout/>,
      children:[
        {path:'/',element:<Home/>},
         {path:'/about',element:<About/>},
         
           {path:'/contact',element:<Contact/>},
         
      ]
    },
    {path:'/',element:<HomePage/>},
     {
    path: "/login",
    element: <Login />,
  },
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/customer", element: <CustomerDashboard />
   
   },
   { path: "/customer/bookings", element: <BookingsPage /> },
   { path: "/bookings", element: <BookingsPage /> },
   {
    path: "/register",
    element: <Register/>,
  },
    {
    path: "/cars",
    element: <Cars />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  
  ])

  return  <RouterProvider  router={router}/>
}

export default App
