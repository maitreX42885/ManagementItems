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