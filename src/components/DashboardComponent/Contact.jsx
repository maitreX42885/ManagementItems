import React from 'react'
import './css/Contact.css'
import { IoLocationSharp } from 'react-icons/io5'
import { BsFacebook } from 'react-icons/bs'
import { AiFillPhone } from 'react-icons/ai'

function Contact() {
  return (
    <div>
      <div className="contact-container">
        <div className="contact-item">
          <IoLocationSharp />
          <p>Our Location</p>
          <p>Naresuan University</p>
        </div>
        <div className="contact-item">
          <BsFacebook />
          <p>Our Facebook</p>
          <p>Facebook.com</p>
        </div>
        <div className="contact-item">
          <AiFillPhone />
          <p>Our Phone</p>
          <p>000-000000</p>
        </div>
      </div>
    </div>
  )
}

export default Contact