import React from "react";
import Tanatak1 from '../svg/t1.jpg';
import Tanatak2 from '../svg/t2.jpeg';
import Andrew from '../svg/a1.jpeg';

const AboutUs = () => {
    return (
        <>
        <h3> About Us</h3>
        <div lass="container">
            <p>This project is done by  </p>
            <p> - Taranak Shanan 300319129</p>
            <p> - Andre Shanan 300319129 </p>
            <img src = {Tanatak1} style={{height: 700}}  alt="" />..
            <img src = {Tanatak2} style={{height: 700}}  alt="" />..
            <img src = {Andrew} style={{height: 700}}  alt="" />..

        </div>
        </>
      );
}
 
export default AboutUs;