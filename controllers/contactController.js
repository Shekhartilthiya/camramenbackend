import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const contact = async(req,res) =>{
    
    console.log("this is commig from contact controlle1");
    const {name,email,contact,message,} = req.body || {};
    console.log(req.body+"this is commig from contact controlle2");

    if(!name || !email || !message || !contact){
        return res.status(400).json({error: "All fields are required"});
    }

    console.log("test3");

    try{
        //setupt mail transport
        const transport = nodemailer.createTransport({
            service : "gmail",
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
            
        });
        console.log("test4");

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
         console.log("test5");

         res.status(200).json({success: true, message: "Email sent successfully"});
         console.log("test6");

    }catch(error){
        return res.status(500).json({error: "Failed to send email"});
    }
    console.log("test7");



    // res.status(200).json({name,email,message});
};