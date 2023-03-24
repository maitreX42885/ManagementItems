import React, { useEffect, useState } from 'react'
import { HiReceiptRefund } from 'react-icons/hi'
import './css/Return.css'
import Loading from '../Loading'

function Return() {
  const [loading2, setLoading] = useState(false)
  const [item, setItem] = useState([
    //{"bID":"3","studentID":"63413424","toolName":"Box","bCount":"3","bDate":"2023-03-24","bTime":"19:13:20","toolPhoto":"ddd.png","studentName":"werr"},
    //{"bID":"5","studentID":"63413424","toolName":"Box","bCount":"3","bDate":"2023-03-24","bTime":"20:16:41","toolPhoto":"ddd.png","studentName":"werr"},
    //{"bID":"6","studentID":"12324242","toolName":"mic","bCount":"3","bDate":"2023-03-24","bTime":"22:24:56","toolPhoto":"download.jpg","studentName":"ff"},
    //{"bID":"7","studentID":"11231231","toolName":"Box","bCount":"4","bDate":"2023-03-24","bTime":"23:23:39","toolPhoto":"ddd.png","studentName":"dsaasd"},
    //{"bID":"8","studentID":"12312312","toolName":"mic","bCount":"3","bDate":"2023-03-24","bTime":"23:48:51","toolPhoto":"download.jpg","studentName":"ad"}
  ])

  useEffect(() => {
    setLoading(true)
    async function ff() {
      const aa = await fetch('./back-end/connect/fetchReturn.php')
      const bb = await aa.json()
      bb.forEach(element => {
        setItem(item => [...item, element])
      });
      //console.log(b)
      //console.log(b.length)
      createReturnTable(bb)
    }
    ff()
    //console.log(item)
    
  }, [])

  function createReturnTable(data) {
    
    //console.log(data)
    const checkTemp = document.querySelectorAll('.item-return')
    checkTemp.forEach(element => {
      element.remove()
    });

    if (data.length > 0) {
      data.forEach(element => {
        const bodyReturn = document.getElementById('return-content')
        const div1 = document.createElement('div')
        const div2 = document.createElement('div')
        const p1 = document.createElement('p')
        const p2 = document.createElement('p')
        const p3 = document.createElement('p')
        const p4 = document.createElement('p')
        const p5 = document.createElement('p')
        const p6 = document.createElement('p')
        const hr1 = document.createElement('hr')
        const hr2 = document.createElement('hr')
        const hr3 = document.createElement('hr')
        const btnR = document.createElement('button')
        const img = document.createElement('img')
        const wrapper = document.createElement('div')
        wrapper.className = 'item-return'

        img.src = `./back-end/connect/uploads/${element.toolPhoto}`
        img.alt = element.toolPhoto
        div1.append(img)

        const tt = element.bTime.split(":")
        const dd = element.bDate.split("-").reverse()
   

        p1.innerHTML = `รหัสนิสิต: ${element.studentID}`
        p2.innerHTML = `ชื่อ: ${element.studentName}`
        p3.innerHTML = `อุปกรณ์: ${element.toolName}`
        p4.innerHTML = `จำนวน: ${element.bCount}`
        p5.innerHTML = `เวลายืม: ${tt[0]}:${tt[1]}`
        p6.innerHTML = `วันที่ยืม: ${dd[0]}-${dd[1]}-${dd[2]}`

        btnR.id = element.bID
        btnR.innerHTML = "คืน"
        btnR.onclick = handleReturn

        div2.append(p1, p2, hr1, p3, p4, hr2, p5, p6, hr3, btnR)
        wrapper.append(div1, div2)
        bodyReturn.append(wrapper)
      });
      
      setLoading(false)
    } else {
      const bodyReturn = document.getElementById('return-content')
      const divv = document.createElement('div')
      divv.className = "item-return"
      divv.id = 'tmp-re'
      divv.innerHTML = "ไม่พบข้อมูล"
      bodyReturn.append(divv)
      setLoading(false)
    }
    const te = document.getElementById('tempL')
    if (te) {
        te.remove()
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

  const handleSearch = (e) => {
    //console.log(e.target.value)
    const values = e.target.value
    const ad = item
    try {
      const newAllTool3 = ad.filter((x)=>{
        return Object.keys(x).some(k=>x[k].toLowerCase().includes(values.toLowerCase()))
      })
      //console.log(newAllTool)
      createReturnTable(newAllTool3)
    }catch {
      const newAllTool3 = 0
      createReturnTable(newAllTool3)
    }
  }


  const handleReturn = (e) => {
    // console.log(e.target.id)
    setLoading(true)
    let xhr = new XMLHttpRequest();
    let url = "./back-end/connect/CommandReturn.php";
    let formData = new FormData();

    formData.append("id", e.target.id);
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let x = xhr.responseText
        if (x=="Success") {
          alert('คืนอุปกรณ์สำเร็จ')
          window.location.reload()
        }else if (x=="Error") {
          alert('คืนอุปกรณ์ไม่สำเร็จ')
        }else {
          alert('ไม่พบข้อมูล')
        }
        setLoading(false)
      }else {
        let x = xhr.responseText
        console.log("Error : ", x)
        setLoading(false)
      }
      setLoading(false)
    }
    xhr.send(formData);
  }

  

  return (
    <div className='return-container'>
      {(loading2) ? (<div className='r-load'><Loading /></div>) : ""}
      <div className="return-header">
        <div className="r-h-title">
          <div>คืนอุปกรณ์ &nbsp; <HiReceiptRefund /></div>
        </div>
        <div className="r-h-search">
          <div>
            <input type="search" name="" id="" onChange={debounce(handleSearch, 500)} placeholder='Search' required/>
          </div>
        </div>
      </div>
      <div className="return-content" id='return-content'>
        
        <div id='tempL'>Loading</div>
      </div>
    </div>
  )
}

export default Return