import React from 'react'
import { Button } from "antd";
import { Link } from 'react-router-dom'
import notAuthImg from '../assets/pages/not-authorized.svg'
import logo from "../assets/logo.png"

import '../views/style.scss'

const NotAuthorized = () => {
  return (
    <>
     <div className='misc-wrapper'>
      <a className='brand-logo' href='#'>
       <img src={logo} alt="logo" />
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>You are not authorized! </h2>
          <p className='mb-2'>
            The Webtrends Marketing Lab website in IIS uses the default IUSR account credentials to access the web pages
            it serves.
          </p>
          <Button className='btn-sm-block mb-1'>
          <Link to="/"> Back to login</Link>
           
          </Button>
          <img className='img-fluid' src={notAuthImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
    </>
  )
}

export default NotAuthorized