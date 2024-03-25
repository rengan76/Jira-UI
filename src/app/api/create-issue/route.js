import { NextResponse } from "next/server"
import axios from "axios";

export const POST = async (req, res) => {
   const body1 = await req.json()

   let body = {
      "fields": {
         "customfield_10009": "Copy - Core+ | [CM] New Brand: SLH - Phase 1",
         "project": {
            "key": "CP"
         },
         "summary": body1.issuetype,
         "description": body1.issuetype,
         "issuetype": {
            "name": 'Epic'
         }
      }
   }
   const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
    }

   try {

      const response = await axios.post(
         `${process.env.API_URL}`, body, { headers }
      );
      console.log("response", response)
      if (response.status === 201 || response.status === 200) {
        console.log({ message: `Your Epic is created`, data: response.data });
      } else {
         console.log({ error: `Failed to create Epic` });
      }
      // Array to store request bodies
      const requestBodies = [];

      for (let i = 1; i < 3; i++) {
         let body = {
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

         requestBodies.push(body); // Add the body to the array
      }

      // Function to make requests asynchronously
      async function makeRequests() {
         for (const body of requestBodies) {
            try {
                  await axios.post(`${process.env.API_URL}`, body, { headers });
                  console.log('Request successful');
            } catch (error) {
                  console.error('Error making request:', error.message);
            }
         }
      }

      await makeRequests(); // Call makeRequests asynchronously

      // Return a response indicating success
      return NextResponse.json({ message: 'Requests completed successfully' });

   } catch (error) {
      return NextResponse.json({ 'Catch error': error });
   }

}

