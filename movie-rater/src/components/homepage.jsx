import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AttackOnTitan from '../svg/attackontitan.svg';
import '../style/homepage.css';



const cardIformation = [
  { id: 1, name: "The big bang theory", image: "https://upload.wikimedia.org/wikipedia/commons/1/13/TBBT_logo.svg", genre: "Comedy sitcom" },
  { id: 2, name: "Attack on Titan", image: `${AttackOnTitan}`, genre: "Anime" },
  { id: 3, name: "Dexter", image: "", genre: "Thriller" }];

const Homepage = () => {
  const [cardInfos] = useState(cardIformation);



  return (
    <div className="container">
      <Card style={{ width: '18rem' }}>
        {cardInfos.map(cardInfo =>
          <Card.Body>
            <Card.Img variant="top" src={cardInfo.image} />
            <Card.Title>{cardInfo.name}</Card.Title>
            <Card.Text>
              {cardInfo.genre}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>)}

      </Card>
    </div>
  )
}

export default Homepage;