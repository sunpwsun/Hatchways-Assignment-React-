import React from 'react'
import './NameSearchForm.css'

const NameSearchForm = ({valueName, onChangeName }) => {
    return (
        <div className="form">
       
                <input placeholder='Search by name' value={valueName} onChange={onChangeName} />
    
        </div>
    )
}

export default NameSearchForm