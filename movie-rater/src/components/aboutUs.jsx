import React from "react";
import Tanatak2 from '../svg/t2.jpeg';
import Andrew from '../svg/a1.jpeg';
import MyPDF from '../textfile/readme.txt';



const AboutUs = () => {
    return (
        
        <div style={{ backgroundColor: "#c4d4cb" }}>
            <h1  class="text-center"> About Us</h1>
            <div class="text-center">
                <h4> Andre</h4>
                    <img className="img-thumbnail rounded " src={Andrew} style={{ height: 300 }} alt="" />
                <h4> Tarane</h4>
                    <img className="img-thumbnail rounded " src={Tanatak2} style={{ height: 300 }} alt="" />

                    <br/>
                    <br/>
                    <br/>
                    <br/>


                <p className="text font-italic"> Movie Rater is co desgined and created by Tarane and Andre. This app is inspired by IMBD but with more user interactions on the platform..
                    We are so happy to announce that this software will be free of charge on all browsers.
                </p>

                <p> To  find more information about ways to install this app, read the ReadMe file
                    <a href={MyPDF} download="ReadMe.txt"> here. </a></p>

            </div>
        </div>
    );
}
export default AboutUs;