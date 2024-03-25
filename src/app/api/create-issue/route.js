import { NextResponse } from "next/server"
import axios from "axios";

export const POST = async (req, res) => {
   const body1 = await req.json()

   let body = {
      "fields": {
         "project": {
            "key": "RP"
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
      'Authorization': 'Basic ZW1haWxAZXhhbXBsZS5jb206PGFwaV90b2tlbj4=',
      'Cookie': 'atlassian.xsrf.token=4313b2204442a13eb3bf443cd6790bd277430009_lout'
   }

   try {

      const response = await axios.post(
         `https://team-muba.atlassian.net/rest/api/2/issue`, body, { headers }
      );
      for (let i = 1; i < 6; i++) {
         let body = {
            "fields": {
               "project": {
                  "key": "RP"
               },
               "summary": 'Story ' + i,
               "description": 'Story ' + i,
               "issuetype": {
                  "name": 'Story'
               }
            }
         }
         await axios.post(
            `https://team-muba.atlassian.net/rest/api/2/issue`, body, { headers }
         );
      }
      console.log("response", response)
      if (response.status === 201 || response.status === 200) {
         return NextResponse.json({ message: `Your Epic is created`, data: response.data });
      } else {
         return NextResponse.json({ error: `Failed to create Epic` });
      }
   } catch (error) {
      return NextResponse.json({ 'Catch error': error });
   }

}