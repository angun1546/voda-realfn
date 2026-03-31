import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GNB from './components/GNB'
import Footer from './components/Footer'
import PersonPage from './pages/PersonPage'
import PersonCategoryPage from './pages/PersonCategoryPage'
import PersonProfilePage from './pages/PersonProfilePage'

const App = () => {
  return (
    <BrowserRouter>
      <div className='min-h-screen flex flex-col bg-[#0e0e13]'>
        <GNB />
        <main className='flex-1'>
          <Routes>
            <Route path='/' element={<PersonPage />} />
            <Route path='/people' element={<PersonPage />} />
            <Route path='/people/category' element={<PersonCategoryPage />} />
            <Route path='/people/:id' element={<PersonProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
