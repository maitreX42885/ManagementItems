import React, { useContext } from 'react'
import { AddToolContext } from '../DashboardComponent/ValDashboard'
import './css/addTool.css'
import { MdClose } from 'react-icons/md'


function AddTool() {

  const { forms, setPageForm } = useContext(AddToolContext)

  const handleCloseAddTool = () => {
    setPageForm(0)
  }

  return (
    <div>
      <div className="addTool-container">
        <div className="addtool-close" >
          <div onClick={handleCloseAddTool}><MdClose /></div>
        </div>
        <div className="addtool-header">เพิ่มอุปกรณ์</div>
        <div className="addtool-content">
          <form action="./back-end/connect/addTool.php" method="post" id='form-addtool' enctype="multipart/form-data">
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
              <input type="file" name="file" id="file" required/>
            </div>
            <div className="items-addtool">
              <input type="submit" value="ยืนยัน" name='submit'/>
              <input type="reset" value="เคลียร์" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTool