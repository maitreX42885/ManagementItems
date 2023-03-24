import React, { useContext, useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { AddToolContext } from '../DashboardComponent/ValDashboard'
import './css/PhotoTool.css'
import Loading from '../Loading'

function PhotoTool(props) {

    const [loading, setLoading] = useState(false)
    const { forms, setPageForm } = useContext(AddToolContext)

    useEffect(() => {
        document.getElementById('edit-photo-title').innerHTML = `กำลังแก้ไขรูป (Tool ID : ${props.data})`
        document.getElementById('h-photo').value = props.data
    }, [])

    const handleClosePhotoEdit = () => {
        setPageForm(0)
    }

    const handlePhoto = async (e) => {
        if (window.confirm('ต้องการเปลี่ยนรูปอุปกรณ์นี้?')) {
            setLoading(true)
            const id = document.getElementById('h-photo')
            const file = document.getElementById('file')

            var xhr = new XMLHttpRequest();
            var url = "./back-end/connect/rePhoto.php";

            var formData = new FormData();
            formData.append("file", file.files[0]);
            formData.append("h-photo", id.value);

            xhr.open("POST", url, true);
            // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let x = xhr.responseText
                    if (x == "type") {
                        alert('ต้องเป็นไฟล์รูปภาพ .png, .jpeg, .jpg เท่านั้น')
                    }
                    if (x == "large") {
                        alert('รูปต้องมีขนาดน้อยกว่า 1MB.')
                    } 
                    if (x == "ok") { 
                        alert('เปลี่ยนรูปอุปกรณ์นี้สำเร็จ')
                        file.value = ""
                        setLoading(false)
                        setPageForm(0)
                    }
                    else {
                        // console.log(x)
                    }
                    setLoading(false)
                }else {
                    //console.log(xhr.responseText)
                    setLoading(false)
                }
                
            };
            xhr.send(formData);
        }

    }

  return (
    <div>
        <div className="photoedit-container">
            {(loading) ? (<div className="l-editphoto"><Loading /></div>) : ''}
            <div className="photoedit-close">
                <div onClick={handleClosePhotoEdit}><MdClose /></div>
            </div>
            <div className="photoedit-header"><p id='edit-photo-title'>sd</p></div>
            <div className="photoedit-content">
                <div className="items-photoedit">
                    <p>*ต้องเป็นไฟล์รูปภาพ .png, .jpeg, .jpg เท่านั้น และ ขนาดไฟล์น้อยกว่า 1MB.</p>
                    <input type="hidden" name="h-photo" id='h-photo'/>
                    <input type="file" name="file" id="file" required/>
                </div>
                <div className="items-photoedit">
                    <input type="button" value="ยืนยัน" onClick={handlePhoto}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PhotoTool