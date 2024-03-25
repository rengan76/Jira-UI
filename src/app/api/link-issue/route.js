import { NextResponse } from "next/server"
import axios from "axios";

export const POST = async (req, res) => {
   const body = {
      "inwardIssue": {
         "key": "RP-23"
      },
      "outwardIssue": {
         "key": "RP-22"
      },
      "type": {
         "name": "Epic"
      }
   }
   const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ZW1haWxAZXhhbXBsZS5jb206PGFwaV90b2tlbj4=',
      'Cookie': 'atlassian.xsrf.token=4313b2204442a13eb3bf443cd6790bd277430009_lout'
   }

   try {
      const response = await axios.post(
         `https://team-muba.atlassian.net/rest/api/2/issue/RP-22/link`, body, { headers }
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