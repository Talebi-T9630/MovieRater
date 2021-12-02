import React from "react";
import Tanatak2 from '../svg/t2.jpeg';
import Andrew from '../svg/a1.jpeg';

const AboutUs = () => {
    return (
        <>
        <h1> About Us</h1>
        <div class="text-center">
            <p>This project is done by  </p>
            <p>  Tarane Talebi 300319129<img  className="img-thumbnail rounded " src = {Tanatak2} style={{height: 300}}  alt="" /></p>
            <p>  Andre Shanan 300319129 <img  className="img-thumbnail rounded " src = {Andrew} style={{height: 300}}  alt="" /></p>
            

        </div>
        </>
      );
}
 
export default AboutUs;