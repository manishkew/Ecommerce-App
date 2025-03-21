import React from 'react'
import Layout from '../../components/Layout/Layout'
import Adminmenu from '../../components/Layout/Adminmenu'
import { useAuth } from '../../components/context/auth'

const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>
          <div className='row'> 
              <div className='col-md-3'>
                <Adminmenu/>
              </div>
              <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h3>Admin Name:{auth?.user?.name}</h3>
                <h3>Admin Email:{auth?.user?.email}</h3>
                <h3>Admin Contact:{auth?.user?.Phone}</h3>
              </div>
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard