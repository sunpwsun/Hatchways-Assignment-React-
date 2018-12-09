import React from 'react'
import './TagsSearchForm.css'

const TagsSearchForm = ({valueTag, onChangeTags }) => {
    return (
        <div className="form">

            <input placeholder='Search by tags' value={valueTag} onChange={onChangeTags}/>
          
        </div>
    )
}

export default TagsSearchForm