import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { axiosConfig } from "./assets/axios/axiosConfig";
import Header from './components/header/Header'
import Card from './components/cards/Card'
import Details from './components/cards/Details'

function App() {
  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(5)

  async function getAllProducts(limit) {
    const { data } = await axiosConfig({
      url:`/products?limit=${limit}`,
      method:"GET",
    })
    setProducts(data)
  }

  useEffect(() => {
    getAllProducts(limit)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getAllProducts(limit)
  }, [limit])

  return (
    <BrowserRouter>
      <div className='app--container'>
        <Routes>
          <Route path='/' element={
            <>
              <Header/>
              <div className="card--container">
                {products.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
              </div>
              <h3 className='product-length'>{products.length} Products</h3>
              <button onClick={() => {
                setLimit(limit + 3);
                }}>
                Show More
              </button>
            </>
          }/>
          <Route path='/details/:productId' element={<Details />}/>
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App