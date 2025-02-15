import React, { useState } from 'react'

export const Stock = ({state}) => {

    const [stockVal,setStock] =useState(0);
    const { contract } = state;
    async function getStock(){
        let stock = await contract.getStock();
        console.log("contract is : ",contract);
        console.log("stcock is : ",stock);
        // setStock(stock)
    }
  return (
    <div>
              <button onClick={getStock}>GetStock</button> 
              <p>Stock  : {stockVal}</p>
    </div>
  )
}
