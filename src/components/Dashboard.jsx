import React from 'react'
import './css/Dashboard.css'
import { BiArrowBack, BiBox, BiHistory, BiHomeAlt, BiLogOut, BiUser, BiUserPlus } from "react-icons/bi";
import { FiArrowRight, FiBox, FiMoon, FiSun } from "react-icons/fi";
import { FaCoins } from "react-icons/fa";

function Dashboard() {
  return (
    <div>
      <div className="dash-container">
        <div className="dash-sidebar">
          <div className="dash-logo">
            <h1>Dashboard</h1>
          </div>
          <div className="dash-tool-container">
            <h4>Quick Access</h4>
            <div className="dash-tool-items"><BiHomeAlt/>| หน้าหลัก</div>
            <div className="dash-tool-items"><BiUser/>| สมาชิก</div>
            <div className="dash-tool-items"><BiBox/>| อุปกรณ์</div>
            <div className="dash-tool-items"><FaCoins/>| การเงิน</div>
            <div className="dash-tool-items"><BiArrowBack/>| กลับ</div>
          </div>
          <div className="dash-tool-container">
            <h4>Other</h4>
            <div className="dash-tool-items"><BiUserPlus/>| เพิ่มสมาชิก</div>
            <div className="dash-tool-items"><FiBox/>| เพิ่มอุปกรณ์</div>
            <div className="dash-tool-items"><BiLogOut/>| ออกจากระบบ</div>
          </div>
          <div className="dash-tool-container">
            <h4>History</h4>
            <div className="dash-tool-items"><BiHistory/>| ประวัติการยืม-คืน</div>
            <div className="dash-tool-items"><BiHistory/>| ประวัติการเข้าสู่ระบบ</div>
            <div className="dash-tool-items"><BiHistory/>| ประวัติการเงิน</div>
          </div>
        </div>
        <div className="dash-content">
          hi content
        </div>
      </div>
    </div>
  )
}

export default Dashboard