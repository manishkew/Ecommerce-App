import React from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={'About us'}>
    <div className="row contactus d-flex align-items-center min-vh-80">
       <div className="col-12 col-md-6 text-center">
         <img
           src="/images/About.jpeg"
           alt="contact us"
           style={{ width: '75%', justifyContent:'center',alignItems:'center',margin:'50px'}}
         />
       </div>
     
       <div className="col-12 col-md-5">
         <h1 className="bg-dark p-2 ml-5 text-white text-center">About Us</h1>
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
  
  );
};

export default About;
