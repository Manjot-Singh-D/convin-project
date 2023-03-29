import React from 'react'
import Bucket from '../component/Bucket';
import Empty from '../component/Empty';
import "../Stylesheets/styles.css"

import { useDispatch, useSelector } from 'react-redux'
import { addBucket } from '../store/slices/userSlices'

const HomePage = () => {
  const dispatch=useDispatch();
  const data=useSelector((state)=>{
    return state.users;
  });


  const addBucketFcn=(bucket)=>{
    dispatch(addBucket(bucket))
  };

  const newBucket={
    bucketName:"",
    cardDetails:[
    ],
    edit:true,
  };

  return (
    <div className='bucketContainer'>
    <div style={{}}>
    <button style={{margin:"1rem"}} onClick={()=>addBucketFcn(newBucket)}>Add New Bucket</button>
    </div>
      <div className='bucketsBox'>
        {data.length===0 && <Empty value={["Add New Bucket","No Bucket Found."]} />}
        {
          data.length>0 &&
          data.map((bucketData,index)=>{
            return (
                <Bucket key={index} bucketData={bucketData} index={index}/>
            );
          })
        }
      </div>
    </div>
  )
}

export default HomePage;