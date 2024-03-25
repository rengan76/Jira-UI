'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Styles from './Styles.module.css';
const Create_Issue = () => {
   const [userInput, setUserInput] = useState('Brand');
   const handleInput = (e) => {
      const value = e.target.value;
      console.log("change value", value)
      setUserInput(value);
   }

   const handleEpic = async () => {
      debugger;
      const body = {
         issuetype: userInput
      }
      console.log("user input", userInput)
      try {
         const res = await axios.post('http://localhost:3000/api/create-issue', body)
         console.log("Response", res)
      } catch (error) {
         console.log("catch error ", error)
      }
   }
   return (
      <div className={Styles.container}>
         <div className={Styles.wrapper}>
            <div className='flex gap-3 items-center'>
               <label htmlFor="box">Epic :</label>
               <select name="" id="" onChange={handleInput} style={{ background: 'black', color: 'white', padding: '5px', borderRadius: '10px' }}>
                  <option value="Brand">Brand</option>
                  <option value="Auto Complete">Auto Complete</option>
               </select>
            </div>
            <button className='w-30 border border-slate-500 bg-slate-600 text-white p-2 rounded-md' onClick={handleEpic}>Create Epic</button>
         </div>

      </div>

   )
}

export default Create_Issue;
