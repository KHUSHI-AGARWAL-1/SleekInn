import React from 'react'
import{Routes,Route,Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import Tours from '../pages/Tours'
import Login from '../pages/Login'
import Register from '../pages/Register'
import SearchResultList from '../pages/SearchResultList'
import TourDetails from '../pages/TourDetails'
import Thankyou from '../pages/Thankyou'
import Myprofile from '../Dashboard/Myprofile'
import AboutUs from '../pages/AboutUs'
import PlanJoruney from '../pages/PlanJoruney'


function Routers() {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/tours' element={<Tours/>}/>
        <Route path='/planning' element={<PlanJoruney/>}/>
        <Route path='/tours/get/:id' element={<TourDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/thank-you' element={<Thankyou/>}/>
        <Route path='/tours/getsearch' element={<SearchResultList/>}/>
        <Route path='/dashboard' element={<Myprofile/>}/>
        <Route path='/about' element={<AboutUs/>}/>
    </Routes>
  )
}

export default Routers