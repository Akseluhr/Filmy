import { Route, Routes } from 'react-router-dom'

import About from './views/About'
import Error from './components/Global/Error'
import Footer from './components/Global/Footer'
import Home from './views/Home'
import Movie from './views/Movie'
import NavBar from './components/Global/NavBar'
import Search from './views/Search'

export default function App() {
  return (
    <>
      <NavBar />
      <div className='content'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='search' element={<Search />}>
            <Route path=':query' element={<Search />} />
          </Route>
          <Route path='movie'>
            <Route path=':id' element={<Movie />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
