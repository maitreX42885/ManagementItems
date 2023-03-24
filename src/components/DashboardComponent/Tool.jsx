import React, { Suspense, useContext, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import './css/Tool.css'
import Loading from '../Loading'
import { AddToolContext } from './ValDashboard'

const FormAddTool = React.lazy(() => import('../FormComponent/AddTool'))
const FormEditTool = React.lazy(() => import('../FormComponent/EditTool'))
const FormPhotoEdit = React.lazy(() => import('../FormComponent/PhotoTool'))

function Tool() {

  const [loadStatus, setLoadStatus] = useState(false)
  const [dataNow, setDataNow] = useState(null)
  const [allData, setAllData] = useState([
   // {toolID:"123", toolName:"test", toolDes:"-", toolCount:5, toolPhoto:"ddd.png"},
   // {toolID:"555", toolName:"test", toolDes:"-", toolCount:5, toolPhoto:"download.jpg"}
  
  ]) // dev
  
  const { forms, setPageForm } = useContext(AddToolContext)

  useEffect(() => {
    const data = []
    setLoadStatus(true) // dev
    async function f() {
      const a = await fetch('./back-end/connect/tool.php')
      const b = await a.json()
      b.forEach(element => {
        data.push(element)
      });
      setAllData(data) // dev
      createTable(data) // dev
      // console.log(allData)
      setLoadStatus(false)
    }
    f()
  }, [])

  useEffect(() => {
    if (forms === 0) {
      fData()
    }
  }, [forms])


  async function fData() {
    const af = []
    setLoadStatus(true)
    const aa = await fetch('./back-end/connect/tool.php')
    const bb = await aa.json()
    bb.forEach(element => {
      af.push(element)
    });
    setAllData(af)// DEV
    createTable(af) // DEV
    setLoadStatus(false)
  }
 

  function createTable(allDatas) {
    
    const table = document.getElementById('table-tool')
    const qTable = document.querySelectorAll('#tool-contents')
   
    if (qTable) {
      qTable.forEach(element => {
        element.remove()
      });
    }

    const tr1 = document.createElement('tr')
    const th1 = document.createElement('th')
    const th2 = document.createElement('th')
    const th3 = document.createElement('th')
    const th4 = document.createElement('th')
    const th5 = document.createElement('th')
    const th6 = document.createElement('th')

    th1.innerHTML = "#"
    th2.innerHTML = "Name"
    th3.innerHTML = "Des"
    th4.innerHTML = "Count"
    th5.innerHTML = "Image"
    th6.innerHTML = "Action"

    tr1.id = 'tool-contents'
    tr1.append(th1, th2, th3, th4, th5, th6)
    table.append(tr1)

    if (allDatas.length > 0) {
      allDatas.forEach(element => {

        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')
        const td4 = document.createElement('td')
        const td5 = document.createElement('td')
        const td6 = document.createElement('td')
  
        const btnRe = document.createElement('button')
        const btnDel = document.createElement('button')
        const btnPho = document.createElement('button')

        const img = document.createElement('img')
        
        img.src = `/back-end/connect/uploads/${element.toolPhoto}`
        img.alt = element.toolPhoto

        tr.id = 'tool-contents'
        td1.innerHTML = element.toolID
        td2.innerHTML = element.toolName
        td3.innerHTML = element.toolDes
        td4.innerHTML = element.toolCount
        td5.append(img)
        
        btnPho.innerHTML = "Photo"
        btnRe.innerHTML = "Edit"
        btnDel.innerHTML = "Delete"

        btnPho.id = element.toolID
        btnPho.onclick = handlePhotoEdit

        btnRe.id = element.toolID
        btnRe.onclick = handleEditTool

        btnDel.id = element.toolID
        btnDel.onclick = handleDel
        
        td6.append(btnRe, btnPho, btnDel)
  
        tr.append(td1, td2, td3, td4, td5, td6)
  
        table.append(tr)
      });
    }else {
    
      const tr = document.createElement('tr')
      const td1 = document.createElement('td')
      const td2 = document.createElement('td')
      const td3 = document.createElement('td')
      const td4 = document.createElement('td')
      const td5 = document.createElement('td')
      const td6 = document.createElement('td')

      tr.id = 'tool-contents'
      td1.innerHTML = "ไม่พบข้อมูล"
      td2.innerHTML = "ไม่พบข้อมูล"
      td3.innerHTML = "ไม่พบข้อมูล"
      td4.innerHTML = "ไม่พบข้อมูล"
      td5.innerHTML = "ไม่พบข้อมูล"
      td6.innerHTML = "ไม่พบข้อมูล"

      tr.append(td1, td2, td3, td4, td5, td6)
      table.append(tr)
    }
   
  }

  const handleDel = async (e) => {
    if (window.confirm('ต้องการลบอุปกรณ์นี้?')) {
      setLoadStatus(true)
      const a = await fetch(`./back-end/connect/delTool.php?data=${e.target.id}`)
      if (a.status === 200) {
       // alert('ลบข้อมูลสำเร็จ')
      }else {
        alert('ลบข้อมูลไม่สำเร็จ!')
      }
      setLoadStatus(false)
      await fData()
    }
  }

  const handleSearch = (e) => {
    const testD = allData
    const value = e.target.value
    // console.log('val: ', value)
    try {
      const newAllTool = testD.filter((x)=>{
        return Object.keys(x).some(k=>x[k].toLowerCase().includes(value.toLowerCase()))
      })
      //console.log(newAllTool)
      createTable(newAllTool)
    }catch {
      const newAllTool = 0
      createTable(newAllTool)
    }
    
  }

  const searchDe = debounce(handleSearch, 500)

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

  const handlePhotoEdit = (e) => { 
    const qTable = document.querySelectorAll('#tool-contents')
    if (qTable) {
      qTable.forEach(element => {
        element.remove()
      });
    }
    const val = e.target.id
    setDataNow(val)
    setPageForm(3)
  }

  const handleEditTool = (e) => {
    const qTable = document.querySelectorAll('#tool-contents')
    if (qTable) {
      qTable.forEach(element => {
        element.remove()
      });
    }
    const val = e.target.id
    setDataNow(val)
    setPageForm(2)
  }
 
  const handleAddTool = () => {
    const qTable = document.querySelectorAll('#tool-contents')
    if (qTable) {
      qTable.forEach(element => {
        element.remove()
      });
    }
    setPageForm(1)
  }

  return (
    <div>
      <div className="tool-header">
        <div className="tool-title">Tool Table</div>
        <div className="tool-search-container">
          <input type="button" value="+" title='เพิ่มอุปกรณ์' onClick={handleAddTool}/>
          <input type="search" name="tool-search" id="tool-search" placeholder='Search' onChange={searchDe}/>
          <BsSearch />
        </div>
      </div>
      <div className="tool-content">
        <div className="tool-form">
          <Suspense fallback={<Loading />}>
            {   (forms === 1) ? (<FormAddTool />) 
              : (forms === 2) ? (<FormEditTool data={dataNow}/>) 
              : (forms === 3) ? (<FormPhotoEdit data={dataNow}/>)
              : "" }
          </Suspense>
        </div>
        {(loadStatus)?(<div className="tool-load">{<Loading />}</div>):""}
        <table id='table-tool'></table>
        
        
      </div>
    </div>
  )
}

export default Tool