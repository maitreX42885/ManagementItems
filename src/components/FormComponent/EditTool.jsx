import React, { useContext, useEffect, useState } from 'react'
import './css/EditTool.css'
import { MdClose } from 'react-icons/md'
import { AddToolContext } from '../DashboardComponent/ValDashboard'
import Loading from '../Loading'
import Swal from 'sweetalert2'

function EditTool(props) {

    const [loading, setLoading] = useState(false)
    const { forms, setPageForm } = useContext(AddToolContext)

    useEffect(() => {
        // console.log(props.data[0].toolID)
        const p = document.createElement('p')
        const header = document.getElementById('edittool-header')
        p.innerHTML = `Edit Tool ID : ${props.data}`
        header.append(p)

        // document.getElementById('edittool-name').value = `${props.data[0].toolName}`
        // document.getElementById('edittool-des').value = `${props.data[0].toolDes}`
        // document.getElementById('edittool-count').value = `${props.data[0].toolCount}`
    }, [])

    const handleCloseEditTool = () => {
        setPageForm(0)
    }

    const handleEditToolSubmit = async () => {
        const id = props.data
        const name = document.getElementById('edittool-name').value
        const des = document.getElementById('edittool-des').value
        const count = document.getElementById('edittool-count').value
        if (window.confirm('ต้องการเปลี่ยนรายระเอียดอุปกรณ์นี้?')) {
            // console.log(id, name, des, count)
            setLoading(true)
            const a = await fetch(`./back-end/connect/reTool.php?id=${id}&name=${name}&des=${des}&count=${count}`)
            if (a.status == 200) {
                setLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'เปลี่ยนข้อมูลสำเร็จ',
                })
                setTimeout(() => {
                    setPageForm(0)
                }, 1000);
                
            }else {
                Swal.fire({
                    icon: 'warning',
                    title: 'เปลี่ยนข้อมูลไม่สำเร็จ',
                })
            }
        }
    }
  return (
    <div>
        <div className="editTool-container">
            {(loading) ? (<div className="l-edittool"><Loading /></div>) : ''}
            <div className="edittool-close">
                <div onClick={handleCloseEditTool}><MdClose /></div>
            </div>
            <div className="edittool-header" id='edittool-header'></div>
            <div className="edittool-content">
                <div className="edittool-items">
                    <input type="text" name="" id="edittool-name" required/>
                    <label htmlFor="">ชื่อ</label>
                </div>
                <div className="edittool-items">
                    <textarea name="" id="edittool-des" cols="30" rows="10" placeholder='รายระเอียด*' required></textarea>
                </div>
                <div className="edittool-items">
                    <input type="number" name="count" id="edittool-count" required placeholder='จำนวน'/>
                </div>
                <div className="edittool-items">
                    <input type="button" value="ยืนยัน" onClick={handleEditToolSubmit}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditTool