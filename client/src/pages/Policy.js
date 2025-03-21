import React from 'react'
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi'
import Layout from '../components/Layout/Layout'

const Policy = () => {
   return (
  <Layout title={'Privacy - Policy'}>

      <div className="row contactus d-flex align-items-center mt-5 min-vh-90">
      <div className="col-12 col-md-6 text-center">
        <img
          src="/images/policy.jpeg"
          alt="contact us"
          style={{ width: '80%'}}
        />
      </div>
    
      <div className="col-12 col-md-3">
        <h1 className="bg-dark p-2 text-white text-center">Privacy Policy</h1>
        <p className="text-justify m-6">
          Any query and info about the product, feel free to call anytime. We are available 24x7.
        </p>
        <p className="mt-4">
          <BiMailSend />: www.helpecommrce.com
        </p>
        <p className="mt-4">
          <BiPhoneCall />: 012-3456789
        </p>
        <p className="mt-4">
          <BiSupport />: 1800 - 0000 - 0000 (toll-free)
        </p>
      </div>
    </div>
    </Layout>
    
    )
}

export default Policy