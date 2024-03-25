'use client'
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Styles from './Styles.module.css';
const Create_Issue = () => {
   const [userInput, setUserInput] = useState('Brand');
   const [isLoading, setIsLoading] = useState(false)
   const handleInput = (e) => {
      const value = e.target.value;
      console.log("change value", value)
      setUserInput(value);
   }

   const handleEpic = async () => {
      const body = {
         issuetype: userInput
      }
      try {
         setIsLoading(true)
         const res = await axios.post('http://localhost:3000/api/create-issue', body)
         if (res.status === 200 || res.statusText === 'OK') {
            toast.success('Your Epic is Created', {
               duration: 2000,
               position: 'top-center',

               // Styling
               style: {},
               className: '',

               // Custom Icon
               icon: '👏',

               // Change colors of success/error/loading icon
               iconTheme: {
                  primary: '#000',
                  secondary: '#fff',
               },

               // Aria
               ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
               },
            });
         }
         setIsLoading(false)
      } catch (error) {
         console.log("catch error ", error)
         toast.error('Failed to Create Epic');
      }
   }
   return (
      <div className={Styles.container}>
         <Toaster />
         <div className={Styles.wrapper}>
            <div className='flex gap-3 items-center'>
               <label htmlFor="box">Epic :</label>
               <select name="" id="" onChange={handleInput} style={{ background: 'black', color: 'white', padding: '5px', borderRadius: '10px' }}>
                  <option value="Brand">Brand</option>
                  <option value="Auto Complete">Auto Complete</option>
               </select>
            </div>
            <button className={`w-30 border border-slate-500 bg-slate-600 text-white p-2 rounded-md ${isLoading && 'opacity-20	'}`} onClick={handleEpic} disabled={isLoading}>{isLoading ? 'Please Wait' : 'Create Epic'}</button>
         </div>
      </div>
   )
}

export default Create_Issue;
