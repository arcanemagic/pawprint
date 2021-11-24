import React from 'core-js/library/fn/reflect/es7/metadata'

function ImgUpload(){
    return(
        <div className="ImgUpload">
            <input type="text"/>
            <input type="file" onChange={handleChange}/>
            <input type="text"/>
        </div>
    )
}