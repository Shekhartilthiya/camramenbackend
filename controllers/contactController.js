import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const contact = async(req,res) =>{
    req.geturl = req.originalUrl;
    console.log(req.geturl);
    const {name,email,message,contact} = req.body;

    if(!name || !email || !message){
        return res.status(400).json({error: "All fields are required"});
    }

    try{
        //setupt mail transport
        const transport = nodemailer.createTransport({
            service : "gmail",
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
            
        });

        //define eamil option 
        const mailOptions = {
            from: email,
            to: process.env.SMTP_EMAIL,
            subject: `Message from ${name}`,
            text: `
             📸 New Contact Form Submission
              -------------------------------
                Name: ${name}
                Email: ${email}
                Contact: ${contact}
                Message: ${message}
            `,  
        };

        //send email 
         await transport.sendMail(mailOptions);

         res.status(200).json({success: true, message: "Email sent successfully"});

    }catch(error){
        return res.status(500).json({error: "Failed to send email"});
    }


    // res.status(200).json({name,email,message});
};