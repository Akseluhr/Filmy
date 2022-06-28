import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <>
    <NavBar />
    <BrowserRouter>
      <div className='content'>
        <Routes>
          <Route exact path='/' element={<App />} />
        </Routes>
      </div>
    </BrowserRouter>
    <Footer />
  </>
)
