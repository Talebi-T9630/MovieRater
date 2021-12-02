import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AttackOnTitan from '../svg/attackontitan.svg';
import '../style/homepage.css';
import Background from '../svg/background.png';



const cardIformation = [
  { id: 1, name: "The big bang theory", image: "https://upload.wikimedia.org/wikipedia/commons/1/13/TBBT_logo.svg", genre: "Comedy sitcom" },
  { id: 2, name: "Attack on Titan", image: `${AttackOnTitan}`, genre: "Anime" },
  { id: 3, name: "Dexter", image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Dexter_Logo.svg", genre: "Thriller" }];
  

const Homepage = () => {
  const [cardInfos] = useState(cardIformation);



  return (
    <>
    <div style={{backgroundColor:"#c4d4cb",color:"Black"}}>
    <marquee behavior="scroll" direction="left"><h2>Wlecome to your movie rater</h2></marquee>
    </div>
    <h1 className="text-center">What's new Hollywood!</h1>
    {/* <div className="background">
      {cardInfos.map(cardInfo =>
        <Card>
          <Card.Body>
            <Card.Img variant="top" src={cardInfo.image} />
            <Card.Title>{cardInfo.name}</Card.Title>
            <Card.Text>
              {cardInfo.genre}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      )}

    </div> */}
    </>
  )
}

export default Homepage;