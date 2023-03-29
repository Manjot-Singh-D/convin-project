import React from 'react'

import Editable from './Editable';

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {removeBucket,editBucket,toggleEditBucket } from '../store/slices/userSlices'


const Bucket = (props) => {
    const dispatch=useDispatch();
    const data=useSelector((state)=>{
      return state.users;
    });
    const {bucketName,cardDetails,edit}=data[props.index];

    const handleChange=(e,idx)=>{
        e.preventDefault();
        dispatch(editBucket({name:e.target.value,idx:idx}));
    }
    const editValue=(idx,edit)=>{
        dispatch(toggleEditBucket({idx,edit}));
    }
    const deleteBucketFcn=(idx)=>{
        dispatch(removeBucket(idx));
    }
    const editBucketFcn=(name,idx)=>{
        editValue(idx,data[idx].edit);
      dispatch(editBucket({name:name,idx:idx}));
    }
    


    return (
        <div className='bucket'>
            {edit===false && <Link to ={`/${bucketName}_${props.index}`}></Link>}
            <div className='bucketData'>
                <Editable isEdit={edit} handleChange={(e)=>handleChange(e,props.index)} value={bucketName} name={"name"} />
                <p style={{color:"#000"}}>Total Cards : {cardDetails?.length}</p>
            </div>

            <div className='bucketBtnGroup'>
                <button onClick={()=>deleteBucketFcn(props.index)}>Delete Bucket</button>
                {!edit && <button onClick={()=>editValue(props.index,edit)}>Edit</button>}
                {edit && <button onClick={()=>editBucketFcn(bucketName,props.index)}>Save</button>}
            </div>
        </div>
    )
}

export default Bucket;
