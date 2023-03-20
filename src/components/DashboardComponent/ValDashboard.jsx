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

    function setPageForm(val) {
        setForm(val)
    }

    const funSetForm = {
        forms,
        setPageForm
    }
    return (
        <AddToolContext.Provider value={funSetForm}>
            { children }
        </AddToolContext.Provider>
    )
}
