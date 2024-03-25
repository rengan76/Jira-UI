'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Styles from './Styles.module.css';

const Create_Issue = () => {
   const [userInput, setUserInput] = useState({ topic: '', phase: '', numTickets: '' });
   const [tickets, setTickets] = useState([]);

   const handleInput = (e) => {
      const { name, value } = e.target;
      console.log("change value", value)
      setUserInput(prevState => ({
         ...prevState,
         [name]: value
      }));
   }

   const handleEpic = async () => {
      debugger;
      const body = {
         topic: userInput.topic,
         phase: userInput.phase,
         numTickets: userInput.numTickets
      }
      const headers = {
         'Content-Type': 'application/json'
       };

      console.log("user input", userInput)
      try {
         const res = await axios.post('http://localhost:3000/api/create-issue', body,  { headers });
         setTickets(res.data.data.storyTickets);
         console.log("Response", res);
        
      } catch (error) {
         console.log("catch error ", error)
      }
   }
   return (
      <div className={Styles.container}>
         <div className={Styles.wrapper}>
            <div className='flex gap-3 items-center'>
               <select name="topic" onChange={handleInput} style={{ background: 'black', color: 'white', padding: '5px', borderRadius: '10px' }}>
                  <option value="">Select Topic</option>
                  <option value="Brand">Brand</option>
                  <option value="Auto Complete">Auto Complete</option>
               </select>
               <select name="phase" onChange={handleInput} style={{ background: 'black', color: 'white', padding: '5px', borderRadius: '10px' }}>
                  <option value="">Select Phase</option>
                  <option value="Phase_1">Phase 1</option>
                  <option value="Phase_2">Phase 2</option>
               </select>
               Number of Tickets Needed <input type="text" name="numTickets" onChange={handleInput} style={{ background: 'black', color: 'white', padding: '5px', borderRadius: '10px', border: '1px solid #ccc' }} ></input>
            </div>
            <button className='w-30 border border-slate-500 bg-slate-600 text-white p-2 rounded-md' onClick={handleEpic}>Create Epic and Stories</button>
         </div>

      {/* Display ticket numbers */}
      {tickets.length > 0 && (
         <div className={Styles.ticketList}>
            <h3 className={Styles.ticketHeader}>Tickets Created:</h3>
            <ul className={Styles.ticketUl}>
               {tickets.map((ticket, index) => (
                  <li className={Styles.ticketLi} key={index}>
                  <a href={`https://jira.hilton.com/browse/${ticket}`} target="_blank" rel="noopener noreferrer">
                    {ticket}
                  </a>
                </li>
               ))}
            </ul>
         </div>
      )}

      </div>

   )
}

export default Create_Issue;
