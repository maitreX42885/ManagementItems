import React, { useState } from "react";



export const DashContext = React.createContext()

export const DashProvider = ({ children }) => {
    const [ btn, setBtn ] = useState(0)

    function setPageBtn(val) {
        setBtn(val)
    }

    const funSetBtn = {
        btn,
        setPageBtn
    }

    return (
        <DashContext.Provider value={funSetBtn}>
             { children }
        </DashContext.Provider>
    )
}

export const AddToolContext = React.createContext()

export const AddToolProvider = ({ children }) => {
    const [forms , setForm] = useState(0)
    const [formLend, setFormLend] = useState(0)
    const [cart, setCart] = useState([])
    const [check, setCheckk] = useState([])

    function setPageForm(val) {
        setForm(val)
    }

    function addCart(xx) {
        setCart(cart => [...cart, xx])
    }
    function setCheck(xc) {
        setCheckk(check => [...check, xc])
    }

    function setPageFormLend(x) {
        setFormLend(x)
    }

    const funSetForm = {
        forms,
        setPageForm,
        formLend,
        setPageFormLend,
        cart,
        addCart,
        check,
        setCheck
       
    }
    return (
        <AddToolContext.Provider value={funSetForm}>
            { children }
        </AddToolContext.Provider>
    )
}
