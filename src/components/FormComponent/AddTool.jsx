import React, { useContext, useState } from 'react'
import { AddToolContext } from '../DashboardComponent/ValDashboard'
import './css/addTool.css'
import { MdClose } from 'react-icons/md'
import { BsClipboardPlus } from 'react-icons/bs'
import Loading from '../Loading'
import Swal from 'sweetalert2'

function AddTool() {

  const [loading, setLoading] = useState(false)
  const { forms, setPageForm } = useContext(AddToolContext)

  const handleCloseAddTool = () => {
    setPageForm(0)
  }

  const submitAddTool = () => {
    setLoading(true)
    const id = document.getElementsByName('id')[0].value
    const name = document.getElementsByName('name')[0].value
    const Des = document.getElementsByName('Des')[0].value
    const count = document.getElementsByName('count')[0].value
    const file = document.getElementById('file_addTool').files[0]
    
    if (id != "" && name != "" && Des != "" && count != "" && file != undefined) {

      let xhr = new XMLHttpRequest();
      let url = "./back-end/connect/addTool.php";
      let formData = new FormData();

      formData.append("file", file);
      formData.append("id", id);
      formData.append("name", name);
      formData.append("Des", Des);
      formData.append("count", count);

      xhr.open("POST", url, true);
      xhr.onreadystatechange = function() {
       
        if (xhr.readyState === 4 && xhr.status === 200) {
          setLoading(false)
          let x = xhr.responseText
            if (x == "id") {
              Swal.fire({
                icon: 'warning',
                title: 'มี ID นี้อยู่ในระบบแล้ว',
              })
            }
            if (x == "type") {
              
              Swal.fire({
                icon: 'warning',
                title: 'ต้องเป็นไฟล์รูปภาพ .png, .jpeg, .jpg เท่านั้น',
              })
            }
            if (x == "large") {
              
              Swal.fire({
                icon: 'warning',
                title: 'รูปต้องมีขนาดน้อยกว่า 1MB.',
              })
            }
            if (x == "ok") {
              
              Swal.fire({
                icon: 'warning',
                title: 'เพิ่มอุปกรณ์สำเร็จ',
              })
              setLoading(false)
              setTimeout(() => {
                setPageForm(0)
              }, 1000);
            }else {
              // console.log(x)
            }
            setLoading(false)
        } else {
          console.log(x.responseText)
        }
        
      };
      xhr.send(formData);
    }else {
      Swal.fire({
        icon: 'info',
        title: 'กรุณากรอกข้อมูลให้ครบ',
      })
    }
  }

  return (
    <div>
      <div className="addTool-container">
        {(loading) ? (<div className="l-addTool"><Loading/></div>) : ""}
        <div className="addtool-close" >
          <div onClick={handleCloseAddTool}><MdClose /></div>
        </div>
        <div className="addtool-header">เพิ่มอุปกรณ์</div>
        <div className="addtool-content">
          <form action="#" method="post" id='form-addtool'>
            <div className="items-addtool">
              <input type="text" name="id" id="inputAddTool" required/>
              <label htmlFor="">ID</label>
            </div>
            <div className="items-addtool">
              <input type="text" name="name" id="inputAddTool" required/>
              <label htmlFor="">ชื่อ</label>
            </div>
            <div className="items-addtool">
              <textarea name="Des" id="" cols="30" rows="10" placeholder='รายระเอียด' required></textarea>
            </div>
            <div className="items-addtool">
              <input type="number" name="count" id="" required placeholder='จำนวน'/>
            </div>
            <div className="items-addtool">
              <p>*ต้องเป็นไฟล์รูปภาพ .png, .jpeg, .jpg เท่านั้น และ ขนาดไฟล์น้อยกว่า 1MB.</p>
              <input type="file" name="file" id="file_addTool" required/>
            </div>
            <div className="items-addtool">
              <input type="button" value="ยืนยัน" name='submit'onClick={submitAddTool}/>
              <input type="reset" value="เคลียร์" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTool