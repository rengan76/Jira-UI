import axios from "axios";
import { json } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
   try {

      // Read the raw request body
    let body = '';
    for await (const chunk of req.body) {
      body += chunk;
    }

    //console.log("Raw request body:", body);

    // Split the string into an array of character codes
   const charCodes = body.split(",").map(Number);

   // Convert the character codes to characters and join them into a string
   const jsonString = String.fromCharCode(...charCodes);

   // Parse the JSON string into a JavaScript object
   const jsonObject = JSON.parse(jsonString);

   const headers = {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
   };

      const epicBody = {
         "fields": {
            "customfield_10009": "Copy - dd+ | [CM] New Brand: dd - "+ jsonObject.phase,
            "project": {
               "key": "CP"
            },
            "summary": 'Epic Summary',
            "description": 'Epic Description',
            "issuetype": {
               "name": 'Epic'
            }
         }
      };
      const storyTickets = [];

      const epicResponse = await axios.post(process.env.API_URL, epicBody, { headers });

      storyTickets.push(epicResponse.data.key);

      if (epicResponse.status !== 201 && epicResponse.status !== 200) {
         throw new Error('Failed to create Epic');
      }


      for (let i = 1; i < jsonObject.numTickets; i++) {
         const storyBody = {
            "fields": {
               "project": {
                  "key": "CP"
               },
               "summary": 'Story ' + i,
               "description": 'Story ' + i,
               "issuetype": {
                  "name": 'Story'
               }
            }
         };

         const storyResponse = await axios.post(process.env.API_URL, storyBody, { headers });

         if (storyResponse.status !== 201 && storyResponse.status !== 200) {
            throw new Error(`Failed to create Story ${i}`);
         }

         storyTickets.push(storyResponse.data.key);
      }

      return NextResponse.json({ message: 'Tickets successfully created', data: { epicTicket: epicResponse.data.key, storyTickets } });
   } catch (error) {
      console.error('Error:', error.message);
      return NextResponse.json({ error: error.message });
   }
};
