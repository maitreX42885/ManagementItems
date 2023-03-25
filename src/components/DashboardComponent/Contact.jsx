import React from 'react'
import './css/Contact.css'
import { IoLocationSharp } from 'react-icons/io5'
import { BsFacebook } from 'react-icons/bs'
import { AiFillPhone } from 'react-icons/ai'

function Contact() {

  const face = () => {
    open("https://www.facebook.com/PhattanaChonnabotmornor", '_blank')
  }
  const map = () => {
    open("https://goo.gl/maps/pgmZojAoPkQhMwAi6", "_blank")
  }

  return (
    <div>
      <div className="contact-container">
        <div className="contact-item" onClick={map}>
          <IoLocationSharp />
          <p>Our Location</p>
          <p>Naresuan University</p>
        </div>
        <div className="contact-item" onClick={face}>
          <BsFacebook />
          <p>Our Facebook</p>
          <p>ชมรมพัฒนาชนบท</p>
        </div>
        <div className="contact-item">
          <AiFillPhone />
          <p>Our Phone</p>
          <p>000-000000</p>
        </div>
        <div className="contact-item">
          <AiFillPhone />
          <p>นักพัฒนา website</p>
          <p>093-3024324</p>
        </div>
        
      </div>
    </div>
  )
}

export default Contact