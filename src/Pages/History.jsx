import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { removeHistory } from '../store/slices/historySlices';
import Empty from '../component/Empty';
const { Panel } = Collapse;

const History = () => {
  const dispatch=useDispatch();
  const data=useSelector((state)=>{
    return state.history;
  });

  const deleteHistoryFcn=(index)=>{
    dispatch(removeHistory(index));
  }
  const deleteBtn = (index) => (
    <DeleteOutlined style={{zIndex:"10001"}}
      onClick={(event) => {
        deleteHistoryFcn(index)
      }}
    />
  );
  return (
    <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"flex-start",marginTop:"2rem"}}>
      {data.length>0 && <Collapse expandIconPosition={"start"}>
      {
        data.slice().reverse().map((dt,idx)=>{
          let idxx=data.length-1-idx;
          return (
              <Panel 
              style={{zIndex:"100",width:"100%"}} header={`${dt.bucketName}/${dt.cardName}`}  
              key={`${idxx+1}`} 
              extra={deleteBtn(idxx)}
              >
                <p>Time : {dt.time}</p>
                <p>Link : {dt.link}</p>
              </Panel>
          );
        })
      }
    </Collapse>
    }
    {data.length===0 && <Empty value={["No History Found","Watch Some Videos"]}/>}
    </div>
  )
}

export default History