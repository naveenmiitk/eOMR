import type { NextApiRequest, NextApiResponse } from "next";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";
import { Email, emailHtml } from "@/components/omr/SubmitOMREmailTemplate";
import { AppleReceiptEmailHtml } from "@/components/Email-Templates/Receipt";
import SignUpMail from "@/components/Email-Templates/SignUp";
import { getUserAuth } from "@/lib/auth/utils";
import { api } from "@/lib/trpc/api";

type ResponseData = {
  message: string;
};


export async function PUT(req: Request) {
  const body = await req.json();
  console.log(body);
  
  const { session } = await getUserAuth();
  if (!session) return new Response("Error, User Not Authenticated", { status: 400 });

  const test = await api.users.getTestByIdTrpc.query(body.testId);
  if(test === undefined) return new Response("Test Doesn't Exists", { status: 400 });


  const data = {
    name: session.user.name!,
    email : session.user.email!,
    testId : body.testId, 
    testName : test[0].name!,
    testCoaching : test[0].coaching!,
  };
 
  const client = new SESClient({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY as string,
    },
  });
  

  const input = {
    // SendEmailRequest
    Source: "noreply@eomr.in", // required
    Destination: {
      // Destination
      ToAddresses: [
        // AddressList
        data.email,
      ],
      // CcAddresses: ["STRING_VALUE"],
      BccAddresses: ["contact@eomr.in"],
    },
    Message: {
      // Message
      Subject: {
        // Content
        Data: `${data.testName} successfully submitted`, // required
        Charset: "UTF-8",
      },
      Body: {
        // Body
        Text: {
          Data: "Sent From eOMR By Code.", // required
          Charset: "UTF-8",
        },
        Html: {
          Data: `<html>
          <h3>Hi ${data.name},</h3>
          <h3>Test ${data.testCoaching} - ${data.testName} successfully submitted.</h3>
          <h3>Result can be check <a href={https://eomr.in/result/${data.testId}}>in the portal.</a></h3>
          <h4>Thanks and Regards</h4>
          <h4>eOMR India</h4>
          <html>`, // required
          Charset: "UTF-8",
        },
      },
    },
    // ReplyToAddresses: ["contact@eomr.in"],
    //   ReturnPath: "STRING_VALUE",
    //   SourceArn: "STRING_VALUE",
    //   ReturnPathArn: "STRING_VALUE",
    //   Tags: [
    //     // MessageTagList
    //     {
    //       // MessageTag
    //       Name: "STRING_VALUE", // required
    //       Value: "STRING_VALUE", // required
    //     },
    //   ],
    //   ConfigurationSetName: "STRING_VALUE",
  };
  const command = new SendEmailCommand(input);
  const response = await client.send(command);
  console.log(response);
  return new Response(JSON.stringify({ message: "SUCCESS" }), {
    status: 200,
  });
}
