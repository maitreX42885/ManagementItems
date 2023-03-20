import React, { Suspense, useContext, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import './css/Tool.css'
import Loading from '../Loading'
import { AddToolContext } from './ValDashboard'

const FormAddTool = React.lazy(() => import('../FormComponent/AddTool'))

function Tool() {

  const data = []
  const [loadStatus, setLoadStatus] = useState(true)
  const [search, setSearch] = useState('')
  const [allData, setAllData] = useState([])
  
  const { forms, setPageForm } = useContext(AddToolContext)

  useEffect(() => {
    setLoadStatus(true)
    async function f() {
      const a = await fetch('./back-end/connect/tool.php')
      const b = await a.json()
      b.forEach(element => {
        data.push(element)
      });
      setAllData(data)
      createTable(data)
      setLoadStatus(false)
    }
    f()
    
  }, [])

  async function fData() {
    const af = []
    setLoadStatus(true)
    const aa = await fetch('./back-end/connect/tool.php')
    const bb = await aa.json()
    bb.forEach(element => {
      af.push(element)
    });
    setAllData(af)
    createTable(af)
    setLoadStatus(false)
  }
 

  function createTable(allData) {
    
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

    if (allData.length > 0) {
      allData.forEach(element => {

        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')
        const td4 = document.createElement('td')
        const td5 = document.createElement('td')
        const td6 = document.createElement('td')
  
        const btnRe = document.createElement('button')
        const btnDel = document.createElement('button')
  
        tr.id = 'tool-contents'
        td1.innerHTML = element.toolID
        td2.innerHTML = element.toolName
        td3.innerHTML = element.toolDes
        td4.innerHTML = element.toolCount
        td5.innerHTML = element.toolPhoto
        
        btnRe.innerHTML = "Re"
        btnDel.innerHTML = "Del"
        btnDel.id = element.toolID
        btnDel.onclick = handleDel
  
        td6.append(btnRe, btnDel)
  
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
        alert('ลบข้อมูลสำเร็จ')
      }else {
        alert('ลบข้อมูลไม่สำเร็จ!')
      }
      setLoadStatus(false)
      await fData()
    }
  }

  const handleSearch = (e) => {
   
    const value = e.target.value
    console.log('val: ', value)
    try {
      const newAllTool = allData.filter((x)=>{
        return Object.keys(x).some(k=>x[k].toLowerCase().includes(value.toLowerCase()))
      })
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

  const handleAddTool = () => {
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
        <Suspense fallback={<Loading />}>
          {(forms === 1) ? (<FormAddTool />) : ""}
        </Suspense>
        {(loadStatus)?(<div className="tool-load">{<Loading />}</div>):""}
        <table id='table-tool'></table>
      </div>
    </div>
  )
}

export default Tool