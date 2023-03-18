import React, { Suspense, useContext, useEffect, useState } from 'react'
import './css/Dashboard.css'
import { BiArrowBack, BiArrowFromLeft, BiArrowToLeft, BiBox, BiHistory, BiHomeAlt, BiLogOut, BiUser, BiUserPlus } from "react-icons/bi";
import { FiArrowRight, FiBox, FiMoon, FiSun } from "react-icons/fi";
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import { IoMdContact } from 'react-icons/io';
import { HiReceiptRefund } from 'react-icons/hi';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from 'react-icons/md';
import Loading from './Loading'
import { DashContext } from './DashboardComponent/ValDashboard';

const DashLend = React.lazy(() => import('./DashboardComponent/Lend'));
const DashReturn = React.lazy(() => import('./DashboardComponent/Return'));

function Dashboard() {

  const [ ham, setHam ] = useState(false)
  const [ side, setSide] = useState(false)
  const [ night, setNight ] = useState('')

  const { btn, setPageBtn } = useContext(DashContext)


  useEffect(() => {
    if (localStorage.getItem('theme') == null) {
      localStorage.setItem("theme", "light")
      setNight('light')
    }else {
      setNight(localStorage.getItem('theme'))
    }
  }, [])

  useEffect(() => {
    if (night == 'light') {
      localStorage.setItem("theme", "light")
      document.documentElement.style.setProperty('--colorFont', '#1a1a1a')
      document.documentElement.style.setProperty('--colorDark1', '#f2f2f2')
      document.documentElement.style.setProperty('--colorDark2', '#f4f4f4')
      document.documentElement.style.setProperty('--colorDark3', '#f6f6f6')
    }else {
      localStorage.setItem("theme", "dark")
      document.documentElement.style.setProperty('--colorFont', '#fff')
      document.documentElement.style.setProperty('--colorDark1', '#161b22')
      document.documentElement.style.setProperty('--colorDark2', '#30363d')
      document.documentElement.style.setProperty('--colorDark3', '#0d1117')
    }
  }, [night])


  const btnNight = () => {
    const btnNightA = document.getElementById('btn-night-mode')
    if (night == 'light') {
      setNight('dark')
      btnNightA.style.transform = 'rotate(0deg)'
    }else {
      setNight('light')
      btnNightA.style.transform = 'rotate(360deg)'
    }
  }

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
    // console.log(e.target.id)
    document.getElementById('mobile-item-container').style.display = 'none'
    document.getElementById(e.target.id).classList.add('btnDash-active')
    setPageBtn(parseInt(e.target.id))
    // console.log(e.target.id)
    setHam(!ham)
  }

  return (
    <div>
      <div className="dash-container">
        <div className="btn-open-sidebar" id='btn-open-sidebar' onClick={openSidebar}>
          <BiArrowFromLeft />
        </div>
        <div className="btn-night-mode" id='btn-night-mode' onClick={btnNight}>
          {
            (night == 'light') ? (<BsSunFill />) : (<BsMoonFill />)
          }
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
            <div className="dash-tool-items btnDash-active" id='0' onClick={menuClick}><BiHomeAlt />&nbsp; ยืม</div>
            <div className="dash-tool-items" id='1' onClick={menuClick}><HiReceiptRefund />&nbsp; คืน</div>
            {/* <div className="dash-tool-items" id='2' onClick={menuClick}><BiBox/>&nbsp; สมาชิก</div> */}
            <div className="dash-tool-items" id='3' onClick={menuClick}><FiBox/>&nbsp; อุปกรณ์</div>
          </div>
          <div className="dash-tool-container">
            <h4>Other</h4>
            <div className="dash-tool-items" id='8' onClick={menuClick}><BiHistory/>&nbsp; ประวัติการยืม-คืน</div>
            <div className="dash-tool-items" id='6' onClick={menuClick}><IoMdContact />&nbsp; ติดต่อเรา</div>
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
                  <div className="items-mobile-items" id='0' onClick={menuClick}><BiHomeAlt />&nbsp; ยืม</div>
                  <div className="items-mobile-items" id='1' onClick={menuClick}><HiReceiptRefund />&nbsp; คืน</div>
                  <div className="items-mobile-items" id='3' onClick={menuClick}><FiBox />&nbsp; อุปกรณ์</div>
                </div>
                <div className="item-mobile-container">
                  <h4>Other</h4>
                  {/* <div className="items-mobile-items" id='6' onClick={menuClick}><FiBox/>&nbsp; เพิ่มอุปกรณ์</div> */}
                  <div className="items-mobile-items" id='8' onClick={menuClick}><BiHistory/>&nbsp; ประวัติการยืม-คืน</div>
                  <div className="items-mobile-items" id='6' onClick={menuClick}><IoMdContact />&nbsp; ติดต่อเรา</div>
                </div>
              </div>
            </div>
          </div>
          <div className="dash-body">
            <Suspense fallback={<Loading />}>
              {
                (btn === 0) ? (<DashLend />)
                : (btn === 1) ? (<DashReturn />)
                : ""
              }
              
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard