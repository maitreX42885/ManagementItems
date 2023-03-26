import React, { useEffect, useState } from 'react'
import { BiHistory } from 'react-icons/bi'
import './css/HistoryTool.css'
import Loading from '../Loading'
import Swal from 'sweetalert2'

function HistoryTool() {

  const [loading , setLoading] = useState(true)
  const [item, setItem] = useState([
    // {"bCount":"3","bDate":"2023-03-25","bTime":"03:07:34","returnDate":"2023-03-25","returnTime":"03:10:15","toolName":"mic","studentID":"63413523","studentName":"bg","studentPhone":"092-358-2352","studentClass":"5","studentFaculty":"คณะวิทยาศาสตร์"},
    // {"bCount":"1","bDate":"2023-03-25","bTime":"03:50:33","returnDate":"2023-03-25","returnTime":"04:04:21","toolName":"mic","studentID":"55135151","studentName":"we","studentPhone":"535-235-2523","studentClass":"4","studentFaculty":"คณะพยาบาลศาสตร์"},
    // {"bCount":"1","bDate":"2023-03-25","bTime":"03:50:34","returnDate":"2023-03-25","returnTime":"04:05:06","toolName":"Box","studentID":"55135151","studentName":"we","studentPhone":"535-235-2523","studentClass":"4","studentFaculty":"คณะพยาบาลศาสตร์"},
    // {"bCount":"1","bDate":"2023-03-25","bTime":"03:54:56","returnDate":"2023-03-25","returnTime":"04:04:41","toolName":"mic","studentID":"53252352","studentName":"sdf","studentPhone":"341-241-2342","studentClass":"2","studentFaculty":"คณะศึกษาศาสตร์"},

  ])

  useEffect(() => {
    setLoading(true)
    async function ff2() {
      const a = await fetch('./back-end/connect/fetchHisotory.php')
      const b = await a.json()
      b.forEach(element => {
        setItem(item => [...item, element])
      });
      createHistoryTable(b)
    }
    ff2()
  }, [])

  function createHistoryTable(data) {
    const tempOldData = document.querySelectorAll('.h-items')
    const bodyReturn = document.getElementById('h-content')
    if (tempOldData) {
      tempOldData.forEach(element => {
        element.remove()
      });
    }

    if (data.length > 0) {
      data.forEach(element => {
        const divItem = document.createElement('div')
        const detail = document.createElement('details')
        const sum = document.createElement('summary')
        const span = document.createElement('span')
        const ul = document.createElement('ul')
        const li1 = document.createElement('li')
        const li2 = document.createElement('li')
        const li3 = document.createElement('li')
        const li4 = document.createElement('li')
        const li5 = document.createElement('li')
        const li6 = document.createElement('li')
        const li7 = document.createElement('li')
        const li8 = document.createElement('li')
        const li9 = document.createElement('li')
        const li10 = document.createElement('li')
        const li11 = document.createElement('li')
        const li12 = document.createElement('li')
        const li13 = document.createElement('li')
        const li14 = document.createElement('li')
        const hr1 = document.createElement('hr')
        const hr2 = document.createElement('hr')
        const hr3 = document.createElement('hr')
        const hr4 = document.createElement('hr')

        divItem.className = 'h-items'
        sum.innerHTML = element.studentID
        span.className = 'sum-span'
        span.innerHTML = '(Click here)'
        sum.append(span)

        li1.append(hr1)
        li2.innerHTML = `ชื่อ: ${element.studentName}`
        li3.innerHTML = `เบอร์: ${element.studentPhone}`
        li4.innerHTML = `ปี: ${element.studentClass}`
        li5.innerHTML = `คณะ: ${element.studentFaculty}`
        li6.append(hr2)
        li7.innerHTML = `อุปกรณ์: ${element.toolName}`
        li8.innerHTML = `จำนวน: ${element.bCount}`
        li9.append(hr3)
        const dd1 = element.bDate.split('-').reverse()
        const tt1 = element.bTime.split(':')
        li10.innerHTML = `วันที่ยืม: ${dd1[0]}-${dd1[1]}-${dd1[2]}`
        li11.innerHTML = `เวลาที่ยืม: ${tt1[0]}:${tt1[1]}`
        li12.append(hr4)
        const dd2 = element.returnDate.split('-').reverse()
        const tt2 = element.returnTime.split(':')
        li13.innerHTML = `วันที่คืน: ${dd2[0]}-${dd2[1]}-${dd2[2]}`
        li14.innerHTML = `เวลาที่คืน: ${tt2[0]}:${tt2[1]}`

        ul.append(li1, li2, li3, li4, li5, li6, li7, li8, li9, li10, li11, li12, li13, li14)
        detail.append(sum, ul)
        divItem.append(detail)
        bodyReturn.append(divItem)

      });
      setLoading(false)
    } else {
      const divtemp = document.createElement('div')
      const d2 = document.createElement('div')
      divtemp.className = 'h-items'
      
      d2.className = 'tempHis'
      d2.innerHTML = 'ไม่พบข้อมูล'
      divtemp.append(d2)
      bodyReturn.append(divtemp)
      setLoading(false)
    }
  }
  function debounce(func, delay) {
    let timerId;
    
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    }
  }

  
  const handleDelHis = async () => {
    if (window.confirm('ต้องการลบรายชื่อทั้งหมดในประวัติยืม-คืน?')) {
      const a = await fetch('./back-end/connect/delHistory.php')
      const bbb = await a.text()
     
      if (bbb == "Success") {
        Swal.fire({
          icon: 'success',
          title: 'ลบรายการทั้งหมดสำเร็จ',
        })
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'ลบรายการทั้งหมดไม่สำเร็จ',
        })
      }
    }
  }

  const handleSearch = (e) => {
    const values = e.target.value
    const ad = item
    try {
      const newAllTool3 = ad.filter((x)=>{
        return Object.keys(x).some(k=>x[k].toLowerCase().includes(values.toLowerCase()))
      })
      //console.log(newAllTool)
      createHistoryTable(newAllTool3)
    }catch {
      const newAllTool3 = 0
      createHistoryTable(newAllTool3)
    }
  }

  return (
    <div className='h-container'>
      {(loading) ? (<div className='h-loading'><Loading /></div>) : ""}
      <div className="h-header">
        <div className="h-title">
          <div>ประวัติการยืม-คืน &nbsp; <BiHistory /></div>
        </div>
        <div className="h-search">
          <div>
            <input type="search" name="" id="" placeholder='Search' onChange={debounce(handleSearch, 300)} required/>
          </div>
        </div>
      </div>
      <div className="h-content" id='h-content'>
        <div className="btn-del-h"><button onClick={handleDelHis}>ลบทั้งหมด</button></div>
      </div>
    </div>
  )
}

export default HistoryTool