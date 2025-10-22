import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", number: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
    toast.success("Thank you for contacting us 🎬", {
      position: "top-right",
      autoClose: 2500,
    });

    try{
      const res= await axios.post("https://camramen-api.onrender.com/api/contact/owner", form);
      if(res.status===200){
        console.log(res);
        toast.success("Thank you! Your message has been sent 💌", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }

    }catch(error){
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 2500,
      });
    }

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-3 bg-transparent border-b border-ivory focus:outline-none"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 bg-transparent border-b border-ivory focus:outline-none"
        required
      />
      {/* number: "" */}
      <input
        type="text"
        name="number"
        placeholder="Your Number"
        value={form.number}
        onChange={handleChange}
        className="w-full p-3 bg-transparent border-b border-ivory focus:outline-none"
        required
      />

      <textarea
        name="message"
        rows="4"
        placeholder="Your Message Here
              ex: subject 
              message which type service you want and also your budget
            
        "
        value={form.message}
        onChange={handleChange}
        className="w-full p-3 bg-transparent border-b border-ivory focus:outline-none"
        required
      ></textarea>
      <button
        type="submit"
        className="border border-reddeep text-reddeep px-6 py-3 hover:bg-reddeep hover:text-white transition duration-300"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
