'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Styles from './Styles.module.css';
import Image from 'next/image';

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
         {/* Header */}
         <header style={{ backgroundColor: 'lightblue', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Your header content here */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="" height={100} width={100}></img>
                  <h1 className={Styles.title}><center>PE OnePortal App</center></h1>
                </div>
                <nav className={Styles.menu} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <ul className={Styles.menuList} style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
                     <li style={{ marginRight: '10px' }}><a href="/search">Search Tickets</a></li>
                     <li style={{ marginRight: '10px' }}>|</li>
                     <li style={{ marginRight: '10px' }}><a href="/manifest">Manifest</a></li>
                     <li style={{ marginRight: '10px' }}>|</li>
                     <li style={{ marginRight: '10px' }}><a href="/prerefiments">My Pre-refinements</a></li>
                     <li style={{ marginRight: '10px' }}>|</li>
                     <li><a href="/refinements">My Refinements</a></li>
                  </ul>
               </nav>
                <br></br>
                <hr></hr>
            </header>
            <br></br>
            {/* Menu */}
         <div className={Styles.wrapper}>
            <div className='flex gap-3 items-center'>
               <select name="topic" onChange={handleInput} style={{ background: 'black', color: 'white', padding: '5px', borderRadius: '10px' }}>
                  <option value="">Select Topic</option>
                  <option value="Brand">Brand</option>
                  <option value="Shop">Shop</option>
                  <option value="Honors">Honors</option>
                  <option value="Reservations">Reservations</option>
                  <option value="Auto Complete">Auto Complete</option>
               </select>
               <select name="phase" onChange={handleInput} style={{ background: 'black', color: 'white', padding: '5px', borderRadius: '10px' }}>
                  <option value="">Select Phase</option>
                  <option value="Phase_1">Phase 1</option>
                  <option value="Phase_2">Phase 2</option>
               </select>
               <input type="text" name="numTickets" onChange={handleInput} 
               style={{ background: 'black', color: 'white', padding: '5px', borderRadius: '10px', border: '1px solid #ccc' }} 
               placeholder='No of Tickets Needed'
               ></input>
            </div>
            <button className='w-30 border border-slate-500 bg-slate-600 text-white p-2 rounded-md' onClick={handleEpic}>Create Epic and Stories</button>
         </div>

     {/* Display ticket numbers */}
      {tickets.length > 0 && (
      <div className={Styles.ticketList}>
         <h3 className={Styles.ticketHeader}>Tickets Created:</h3>
         <div className={Styles.ticketContainer}>
            {tickets.map((ticket, index) => (
            <a
               href={`https://jira.xxxx.com/browse/${ticket}`}
               target="_blank"
               rel="noopener noreferrer"
               key={index}
               className={Styles.ticketLink}
            >
               {ticket}
            </a>
            ))}
         </div>
      </div>
      )}

      </div>

   )
}

export default Create_Issue;
