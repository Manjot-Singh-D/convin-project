import React from 'react'

const Empty = (props) => {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",width:"100%"}}>
        <h2>{props.value[0]}</h2>
        <p>{props.value[1]}</p>
    </div>
  )
}

export default Empty