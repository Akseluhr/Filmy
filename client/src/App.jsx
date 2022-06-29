import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import Home from './views/Home'
import NavBar from './components/Global/NavBar'
import Footer from './components/Global/Footer'
import About from './views/About'
import Search from './views/Search'

export default function App() {
  return (
    <>
      <NavBar />
      <div className='content'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
