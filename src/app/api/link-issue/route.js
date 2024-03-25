import { NextResponse } from "next/server"
import axios from "axios";

export const POST = async (req, res) => {
   const body = {
      "inwardIssue": {
         "key": "CP-10235"
      },
      "outwardIssue": {
         "key": "CP-10235"
      },
      "type": {
         "name": "Epic"
      }
   }
   const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
   }

   try {
      const response = await axios.post(
         `${process.env.API_URL}/CP-10/link`, body, { headers }
      );
      console.log("response", response)
      if (response.status === 201 || response.status === 200) {
         return NextResponse.json({ message: `Your Epic is created`, data: response.data });
      } else {
         return NextResponse.json({ error: `Failed to create Epic` });
      }
   } catch (error) {
      console.log("Catch Error", error)
      return NextResponse.json({ 'Catch error': error });
   }
}