import React, { useContext, useState } from 'react'
import './css/Dashboard.css'
import { BiArrowBack, BiArrowFromLeft, BiArrowToLeft, BiBox, BiHistory, BiHomeAlt, BiLogOut, BiUser, BiUserPlus } from "react-icons/bi";
import { FiArrowRight, FiBox, FiMoon, FiSun } from "react-icons/fi";
import { FaCoins } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from 'react-icons/md';
import Loading from './Loading'
import { DashContext } from './DashboardComponent/ValDashboard';

function Dashboard() {

  const [ ham, setHam ] = useState(false)
  const [ side, setSide] = useState(false)

  const { btn, setBtn } = useContext(DashContext)

  const btnSide = () => {
    const sidebar = document.getElementById('dash-sidebar')
    const btnOpenSide = document.getElementById('btn-open-sidebar')
    if (side) {
      sidebar.style.width = '25%'
      btnOpenSide.style.display = 'none'
      setSide(!side)
    }else {
      sidebar.style.width = '0'
      btnOpenSide.style.display = 'flex'
      setSide(!side)
    }
  }

  const openSidebar = () => {
    const sidebar = document.getElementById('dash-sidebar')
    const btnOpenSide = document.getElementById('btn-open-sidebar')
    if (side) {
      sidebar.style.width = '25%'
      btnOpenSide.style.display = 'none'
      setSide(!side)
    }else {
      sidebar.style.width = '0'
      btnOpenSide.style.display = 'flex'
      setSide(!side)
    }
  }

  const hamClick = () => {
    const side = document.getElementById('mobile-item-container')
    if (ham) {
      side.style.display = 'none'
      setHam(!ham)
    }else {
      side.style.display = 'flex'
      setHam(!ham)
    }
  }

  const menuClick = (e) => {
    const allBtn = document.querySelectorAll('.btnDash-active')
    allBtn.forEach(element => {
      element.classList.remove('btnDash-active')
    });
    console.log(e.target.id)
    document.getElementById('mobile-item-container').style.display = 'none'
    document.getElementById(e.target.id).classList.add('btnDash-active')
    setHam(!ham)
  }

  return (
    <div>
      <div className="dash-container">
        <div className="btn-open-sidebar" id='btn-open-sidebar' onClick={openSidebar}>
          <BiArrowFromLeft />
        </div>
        <div className="dash-sidebar" id='dash-sidebar'>
          <div className="dash-logo">
            <h1>Icon</h1>
          </div>
          <div className="close-sidebar">
            <div onClick={btnSide}><BiArrowToLeft /></div>
          </div>
          <div className="dash-tool-container">
            <h4>Quick Access</h4>
            <div className="dash-tool-items btnDash-active" id='0' onClick={menuClick}><BiHomeAlt/>&nbsp; ยืม</div>
            <div className="dash-tool-items" id='1' onClick={menuClick}><BiUser/>&nbsp; คืน</div>
            <div className="dash-tool-items" id='2' onClick={menuClick}><BiBox/>&nbsp; สมาชิก</div>
            <div className="dash-tool-items" id='3' onClick={menuClick}><FaCoins/>&nbsp; อุปกรณ์</div>
          </div>
          <div className="dash-tool-container">
            <h4>Other</h4>
            <div className="dash-tool-items" id='6' onClick={menuClick}><FiBox/>&nbsp; เพิ่มอุปกรณ์</div>
            <div className="dash-tool-items" id='8' onClick={menuClick}><BiHistory/>&nbsp; ประวัติการยืม-คืน</div>
          </div>
        </div>
        <div className="dash-content">
          <div className="dash-header">
            <p id='dash-header-title'><strong>Welcome</strong></p>
            <div id="dash-header-mobile" onClick={hamClick}><h2><GiHamburgerMenu /></h2></div>
            <div className="mobile-item-container" id='mobile-item-container'>
              <div className="close-mobile" onClick={hamClick}><MdClose /></div>
              <div className="item-mobile">
                <div className="item-mobile-container">
                  <h4>Quick Access</h4>
                  <div className="items-mobile-items" id='0' onClick={menuClick}><BiHomeAlt/>&nbsp; ยืม</div>
                  <div className="items-mobile-items" id='1' onClick={menuClick}><BiUser/>&nbsp; คืน</div>
                  <div className="items-mobile-items" id='2' onClick={menuClick}><BiBox/>&nbsp; สมาชิก</div>
                  <div className="items-mobile-items" id='3' onClick={menuClick}><FaCoins/>&nbsp; อุปกรณ์</div>
                </div>
                <div className="item-mobile-container">
                  <h4>Other</h4>
                  <div className="items-mobile-items" id='6' onClick={menuClick}><FiBox/>&nbsp; เพิ่มอุปกรณ์</div>
                  <div className="items-mobile-items" id='8' onClick={menuClick}><BiHistory/>&nbsp; ประวัติการยืม-คืน</div>
                </div>
              </div>
            </div>
          </div>
          <div className="dash-body">
            {<Loading />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard