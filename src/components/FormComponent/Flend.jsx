import React, { useContext, useEffect, useState } from 'react'
import './css/Flend.css'
import { MdClose } from 'react-icons/md'
import { AddToolContext } from '../DashboardComponent/ValDashboard'
import Loading from '../Loading'

function Flend() {

    const [loading, setLoading] = useState(false)
    const [rest, setRest] = useState([])
    const { formLend, setPageFormLend, cart, addCart , check, setCheck} = useContext(AddToolContext)

    useEffect(() => {
        setLoading(true)
        const a = newR()
        createTableFlend(a)
        setLoading(false)
    }, [])

    const counts = cart.reduce((acc, curr) => {
        if (acc[curr.toolID]) {
          acc[curr.toolID] += 1;
        } else {
          acc[curr.toolID] = 1;
        }
        return acc;
    }, {});

    function newR() {
        const r = []
        const cc = counts
        const c1 = Object.keys(cc)
        for (const item of cart) {
            c1.forEach(ex => {
                if (ex == item.toolID) {
                    r.push({...item, toolCount:cc[ex]})
                }  
            })
        }

        const toolSet = new Set();
        const subset = [];
        
        for (const tool of r) {
          const toolKey = tool.toolID + tool.toolName;
          if (!toolSet.has(toolKey)) {
            subset.push(tool);
            toolSet.add(toolKey);
          }
        }
        return subset
    }

    function createTableFlend(data) {

        const body = document.getElementById('f-l-content')
        
        const tempVal = document.querySelectorAll('.f-l-items')
        tempVal.forEach(ee => {
            ee.remove()
        })

        const divItem = document.createElement('div')
        const pID = document.createElement('p')
        const pName = document.createElement('p')
        const pCount = document.createElement('p')
        const pAc = document.createElement('p')
       
        divItem.className = 'f-l-items'
        pName.innerHTML = `อุปกรณ์`
        pCount.innerHTML = `จำนวน`
      
        divItem.append(pName, pCount)
        body.append(divItem)

        if (data.length > 0) {
            const wfc = document.getElementById('wrapper-content-footer')
            wfc.style.display = 'block'
            data.forEach(element => {
                // console.log(element, "val ", ma[element])
                const alert = document.createElement('p')
                const divItem = document.createElement('div')
                const pID = document.createElement('p')
                const pName = document.createElement('p')
                const pCount = document.createElement('p')
                const btnAc = document.createElement('div')

                // btnAc.id = element.toolID
                // btnAc.innerHTML = "X"
                // btnAc.className = 'remove-lend'
                // btnAc.onclick = actionRe

                divItem.className = 'f-l-items'
                
                pID.innerHTML = element.toolID
                pName.innerHTML = `${element.toolName}`
                pCount.innerHTML = `${element.toolCount}`
                divItem.append(pName, pCount)
                body.append(divItem)


            });
            
            // const divItem2 = document.createElement('div')
            // const btnYes = document.createElement('button') 
            // const btnClear = document.createElement('button') 
            
            // btnYes.innerHTML = "ยืนยัน"
            // btnClear.innerHTML = "ลบทั้งหมด"
            
            // btnYes.id = 'l-btn-yes'
            // btnClear.id = 'l-btn-clear'
    
            // btnYes.onclick = handleConfirm
            // btnClear.onclick = handleClear
            
            // divItem2.className = 'f-l-items'
            // divItem2.append(btnYes, btnClear)
            // body.append(divItem2)
        } else {
            const wfc = document.getElementById('wrapper-content-footer')
            wfc.style.display = 'none'
            const divItem = document.createElement('div')
            divItem.innerHTML = "ไม่มีอุปกรณ์ที่เลือก"
            body.append(divItem)
        }

      

    }

    const flClose = () => {
        setPageFormLend(0)
    }

    const handleClear = () => {
        if (window.confirm('ต้องการลบอุปกรณ์ทั้งหมด ?')) {
            window.location.reload()
        }
    }

    const handleConfirm = async () => {
        setLoading(true)
        const numStu = document.getElementById('numStu').value
        const nameStu = document.getElementById('nameStu').value
        const telStu = document.getElementById('telStu').value
        const facStu = document.getElementById('facStu').value
        const classStu = document.getElementById('classStu').value
        if (numStu != '' && nameStu != '' && telStu != '' && facStu != '' && classStu !='') {
            const b = newR()
            // if (b.length > 1) {
            //     await setCheck(b)
            // }else {
            //     await setCheck(...b)
            // }
            // console.log(b)
            // console.log("C ", check)
            const bb = JSON.stringify(b)
            //console.log(numStu, nameStu, telStu, facStu, classStu, bb)

            let xhr = new XMLHttpRequest();
            let url = "./back-end/connect/lend.php";
            let formData = new FormData();

            formData.append("numStu", numStu);
            formData.append("nameStu", nameStu);
            formData.append("telStu", telStu);
            formData.append("facStu", facStu);
            formData.append("classStu", classStu);
            formData.append("all", bb);

            xhr.open("POST", url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let x = xhr.responseText
                    // console.log("Flend (xhr) : ", x)
                    if (x[0]=="S") {
                        alert('สำเร็จ')
                        window.location.reload()
                    }else {
                        alert('จำนวนอุปกรณ์บางรายการคงเหลือไม่เพียงพอ')
                        window.location.reload()
                    }
                }else {
                    let x = xhr.responseText
                    // console.log(x)
                }
                setLoading(false)
            }
            xhr.send(formData);
        } else {
            alert('กรอกข้อมูลให้เรียบร้อย')
            setLoading(false)
        }
    }

    const numStu = (e) => {
        let num = e.target.value
        num = num.substring(0, 8)
        e.target.value = num
    }
    const handleTel = (e)=> {
        let value = e.target.value
        value = value.replace(/\D/g, ""); // remove non-numeric characters
        value = value.substring(0, 10); // limit to 10 digits
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // add formatting
        e.target.value = value
    }

  return (
    <div className='f-lend-container'>
        {(loading) ? (<div className='f-l-loading'><Loading /></div>) : ""}
        <div className="f-l-close">
            <div onClick={flClose}><MdClose /></div>
        </div>
        <div className="f-l-header">ยืนยัน</div>
        <div className="f-l-content" id='f-l-content'>
            <div className="f-l-items">
                <p>ID</p>
                <p>ชื่อ</p>
                <p>จำนวน</p>
            </div>
        </div>
        <hr />
        <div className="f-l-footer">
            <div id='wrapper-content-footer'>
                <div className="f-l-footer-items">
                    <p>Infomation</p>
                </div>
                <div className="f-l-footer-items">
                    <input type="text" name="" id="numStu" onChange={numStu} required/>
                    <label htmlFor="">รหัสนิสิต</label>
                </div>
                <div className="f-l-footer-items">
                    <input type="text" name="" id="nameStu" required/>
                    <label htmlFor="">ชื่อ</label>
                </div>
                <div className="f-l-footer-items">
                    <input type="text" name="" id="telStu" onChange={handleTel} required/>
                    <label htmlFor="">เบอร์</label>
                </div>
                <div className="f-l-footer-items">
                    <select required id='facStu'>
                        <option value=''>คณะ</option>
                        <option value="บัณฑิตวิทยาลัย">0 : บัณฑิตวิทยาลัย</option>
                        <option value="วิทยาลัยพลังงานทดแทนและสมาร์ตกริดเทคโนโลยี">1 : วิทยาลัยพลังงานทดแทนและสมาร์ตกริดเทคโนโลยี</option>
                        <option value="สถานการศึกษาต่อเนื่อง">2 : สถานการศึกษาต่อเนื่อง</option>
                        <option value="คณะโลจิสติกส์และดิจิทัลซัพพลายเชน">3 : คณะโลจิสติกส์และดิจิทัลซัพพลายเชน</option>
                        <option value="วิทยาลัยเพื่อการค้นคว้าระดับรากฐาน">4 : วิทยาลัยเพื่อการค้นคว้าระดับรากฐาน</option>
                        <option value="สถานพัฒนาวิชาการด้านภาษา">5 : สถานพัฒนาวิชาการด้านภาษา</option>
                        <option value="วิทยาลัยการจัดการระบบสุขภาพ">6 : วิทยาลัยการจัดการระบบสุขภาพ</option>
                        <option value="วิทยาลัยนานาชาติ">7 : วิทยาลัยนานาชาติ</option>
                        <option value="คณะเกษตรศาสตร์ ทรัพยากรธรรมชาติและสิ่งแวดล้อม">8 : คณะเกษตรศาสตร์ ทรัพยากรธรรมชาติและสิ่งแวดล้อม</option>
                        <option value="คณะเภสัชศาสตร์">9 : คณะเภสัชศาสตร์</option>
                        <option value="คณะวิทยาศาสตร์">10 : คณะวิทยาศาสตร์</option>
                        <option value="คณะวิศวกรรมศาสตร์">11 : คณะวิศวกรรมศาสตร์</option>
                        <option value="คณะศึกษาศาสตร์">12 : คณะศึกษาศาสตร์</option>
                        <option value="คณะแพทยศาสตร์">13 : คณะแพทยศาสตร์</option>
                        <option value="คณะสาธารณสุขศาสตร์">14 : คณะสาธารณสุขศาสตร์</option>
                        <option value="คณะวิทยาศาสตร์การแพทย์">15 : คณะวิทยาศาสตร์การแพทย์</option>
                        <option value="คณะพยาบาลศาสตร์">16 : คณะพยาบาลศาสตร์</option>
                        <option value="คณะทันตแพทยศาสตร์">17 : คณะทันตแพทยศาสตร์</option>
                        <option value="คณะสหเวชศาสตร์">18 : คณะสหเวชศาสตร์</option>
                        <option value="คณะสถาปัตยกรรมศาสตร์ ศิลปะและการออกแบบ">19 : คณะสถาปัตยกรรมศาสตร์ ศิลปะและการออกแบบ</option>
                        <option value="คณะนิติศาสตร์">20 : คณะนิติศาสตร์</option>
                        <option value="คณะมนุษยศาสตร์">21 : คณะมนุษยศาสตร์</option>
                        <option value="คณะบริหารธุรกิจ เศรษฐศาสตร์และการสื่อสาร">22 : คณะบริหารธุรกิจ เศรษฐศาสตร์และการสื่อสาร</option>
                        <option value="คณะสังคมศาสตร์">23 : คณะสังคมศาสตร์</option>
                        <option value="โรงเรียนสาธิตมหาวิทยาลัยนเรศวร">24 : โรงเรียนสาธิตมหาวิทยาลัยนเรศวร</option>
                    </select>
                </div>
                <div className="f-l-footer-items">
                    <select name="" id="classStu" required>
                        <option value="">ชั้นปี</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                </div>
                <div className="f-l-footer-items">
                    <input type="button" value="ยืนยัน" id="l-btn-yes" onClick={handleConfirm}/>
                    <input type="button" value="ลบทั้งหมด" id="l-btn-clear" onClick={handleClear}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Flend