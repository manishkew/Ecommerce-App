import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../components/context/search'

const Search = () => {
    const [values,setValues] = useSearch()
  return (
    <Layout title={'Search results'}>
        <div className='text-center'>
            <h1>Search Rresults</h1>
            <h6>{values?.results.length < 1 ? 'No product Found' :`Found${values?.results.length}`}
            </h6>
            <div className="d-flex flex-wrap mt-4">
        {values?.results.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                >
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">${p.price}</p>

                    <button class="btn btn-primary ms-2">More Details</button>
                    <button class="btn btn-secondary ms-2">Add To Cart</button>                    
                  </div>
                </div>
            ))}
        </div>
        </div>
    </Layout>
  )
}

export default Search