import React from "react";


const Conditional = ({children, condition}) => {
    return(
        <>
            {condition && children}
        </>
    )
}

export default Conditional;