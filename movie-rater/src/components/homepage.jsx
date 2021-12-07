import React, { useState } from 'react';
import '../style/homepage.css';
import ReactPlayer from "react-player";



const Homepage = () => {

  return (
    <>
      <div style={{ backgroundColor: "#c4d4cb", color: "Black" }}>
        <marquee behavior="scroll" direction="left"><h2>Welcome to your movie rater</h2></marquee>
        <h1 className="text-center">What's new Hollywood!</h1>

        <ReactPlayer
          className="video-responsive"
          url={`https://www.youtube.com/embed/NQNlP20zvYA`}
          playing={true}
          width="853"
          height="480"
        />
      </div>
      )
    </>


  )
}

export default Homepage;