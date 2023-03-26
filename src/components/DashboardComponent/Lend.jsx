import React, { Suspense, useContext, useEffect, useState } from 'react'
import { FiBox } from 'react-icons/fi'
import { MdTrolley } from 'react-icons/md'
import './css/Lend.css'
import Loading from '../Loading'
import { AddToolContext } from './ValDashboard'



const FormLendD = React.lazy(() => import('../FormComponent/Flend'))

function Lend() {

  const [loading, setLoading] = useState(true)
  const {formLend, setPageFormLend, cart, addCart} = useContext(AddToolContext)
  const [item, setItem] = useState([
    //   {toolID:"123", toolName:"test", toolDes:"-", toolCount:5, toolPhoto:"ddd.png"},
    //   {toolID:"555", toolName:"box", toolDes:"-", toolCount:5, toolPhoto:"download.jpg"},
    //  {toolID:"233", toolName:"mic", toolDes:"-", toolCount:5, toolPhoto:"ddd.png"},
    //   {toolID:"14", toolName:"table", toolDes:"-", toolCount:0, toolPhoto:"ddd.png"},
    //  {toolID:"113", toolName:"5t", toolDes:"-", toolCount:5, toolPhoto:"ddd.png"},
    //  {toolID:"113", toolName:"5t", toolDes:"-", toolCount:5, toolPhoto:"ddd.png"},
    //  {toolID:"113", toolName:"5t", toolDes:"-", toolCount:5, toolPhoto:"ddd.png"},
    //  {toolID:"113", toolName:"5t", toolDes:"-", toolCount:5, toolPhoto:"ddd.png"},
    //  {toolID:"113", toolName:"5t", toolDes:"-", toolCount:5, toolPhoto:"ddd.png"},
    //  {toolID:"113", toolName:"5t", toolDes:"-", toolCount:5, toolPhoto:"ddd.png"},
    //  {toolID:"113", toolName:"5t", toolDes:"-", toolCount:5, toolPhoto:"ddd.png"}
  ])

  useEffect(() => {
    const num = document.getElementById('lnum')
    if (cart.length > 99) {
      // console.log(cart)
      num.innerHTML = `99+`
    }else {
      num.innerHTML = cart.length
    }
    
    createItemTable(item)
    //console.log("cart : ", cart)
  }, [cart])

  useEffect(() => {
    setLoading(true)
    async function f() {
      const a = await fetch('./back-end/connect/fetchTool.php')
      const b = await a.json()
      // console.log('b : ', b)
      b.forEach(element => {
        setItem(item => [...item, element])
      });
      createItemTable(b)
    }
    f()
    //console.log('item: ', item)
    
  }, [])


  function createItemTable(data) {
    setLoading(true)
    const mainTable = document.getElementById('l-container')
    const iTable = document.querySelectorAll('#l-items')
    iTable.forEach(element => {
      element.remove()
    });

    if (data.length > 0) {
      data.forEach(element => {
        const lItem = document.createElement('div')
        const pDiv = document.createElement('div')
        const imgDiv = document.createElement('div')
        const desDiv = document.createElement('div')
        const numDiv = document.createElement('div')
        const toolDiv = document.createElement('div')
        const img = document.createElement('img')
        const btn = document.createElement('button')
        const inp = document.createElement('input')

        lItem.className = 'l-items'
        lItem.id = 'l-items'
  
        pDiv.className = 'l-p'
        imgDiv.className = 'l-img'
        desDiv.className = 'l-des'
        numDiv.className = 'l-num'
        toolDiv.className = 'l-toolbar'
  
        pDiv.innerHTML = `${element.toolName}`
        desDiv.innerHTML = `${element.toolDes}`
        numDiv.innerHTML = `คงเหลือ : ${element.toolCount}`
  
        img.src = `./back-end/connect/uploads/${element.toolPhoto}`
        img.alt = element.toolPhoto
  
        if (element.toolCount > 0) {
          // inp.id = `f${element.toolID}`
          // inp.type = 'number'
          // inp.max = element.toolCount
          // inp.min = 1
          // inp.defaultValue = 1
          btn.id = `l-btn-t`
          btn.value = element.toolID
          btn.name = element.toolName
          btn.innerHTML = 'เลือก'
          btn.onclick = handleAdd
        }else {
          btn.id = `l-btn-f`
          btn.value = element.toolID
          btn.name = element.toolName
          btn.innerHTML = 'หมด'
        }
  
        toolDiv.append( btn)
        imgDiv.append(img, desDiv)
        lItem.append(pDiv, imgDiv, numDiv, toolDiv)
        mainTable.append(lItem)
      });
      document.getElementById('l-container').style.height = 'auto'
      setLoading(false)
    } else {
      const divv = document.createElement('div')
      divv.id = "l-items"
      divv.innerHTML = "ไม่พบข้อมูล"
      mainTable.append(divv)
      document.getElementById('l-container').style.height = '100vh'
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

 
  const searchDe = (e) => {
    //console.log(e.target.value)
    const ad = item
    const values = e.target.value
    // console.log('ad ', ad)
    try {
      const newAllTool2 = ad.filter((x)=>{
        return Object.keys(x).some(k=>x[k].toLowerCase().includes(values.toLowerCase()))
      })
      //console.log(newAllTool)
      createItemTable(newAllTool2)
    }catch {
      const newAllTool2 = 0
      createItemTable(newAllTool2)
    }
      // const newAllTool2 = []
      // createItemTable(newAllTool2)
  }

  const sDE = debounce(searchDe, 500)


  const openForm = () => {
    if (cart.length == 0) {

    } else {
      setPageFormLend(1)
    }
    
  }



  const handleAdd = (e) => {
   // const fnum = document.getElementById(`f${e.target.value}`)
    const name = e.target.getAttribute('name')
    const id = e.target.value
   // console.log("F num : ", fnum.value)
    document.getElementById('cart').style.animation = 'sh 200ms ease-in-out'
    setTimeout(() => {
      document.getElementById('cart').style.animation = undefined
    }, 200);
    const d = {'toolID':id, 'toolName':name}
    // setRestItem(restItem => [...restItem, d])
    addCart(d)
  }

  return (
    <div className='lend'>
      <div className="l-header">
        <div className="l-header-title">ยืมอุปกรณ์ &nbsp; <FiBox /></div>
        <div className="l-header-tool">
          <div className='l-header-search'>
            <input type="search" name="" id="" placeholder='Search' required onChange={sDE}/>
          </div>
          <div onClick={openForm} id='cart'>
            <MdTrolley />
            <div id='lnum'>32</div>
          </div>
        </div>
      </div>
      <div className="l-container" id='l-container'>
        {(loading) ? (<div className='l-loading'><Loading /></div>) : ""}
        <Suspense fallback={<Loading />}>
          {(formLend === 1) ? (<div className="form-lend">{<FormLendD />}</div>) : ""}
        </Suspense>
        

      </div>
    </div>
  )
}

export default Lend