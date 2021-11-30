const express = require('express');
const mongoose = require('mongoose');
const https = require("https");
const cors = require('cors');
const Moive = require('./models/movies');

const app = express();

// get use
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// set database url
const url = "mongodb://localhost:27017/moviesDB";

// fetch movies form the route
/***
 * i will change tnhe route when i learn how to connect nodejs with react !!!!
 * 
 */
app.get("/",(req,res)=>{
    // 1- set the the url and its key
    const key = `k_tqc3a27f`;
    const url = `https://imdb-api.com/en/API/Top250Movies/${key}`;
    var dataCollector="";
    //3- start reading form url
    https.get(url,(response)=>{
            //A start load data
            response.on("data",(data)=>{
                dataCollector += data;  
            })
            //B process data and send it
            response.on("end",()=>{
               let parsedData = JSON.parse(dataCollector);
               res.write(DesplayMovieData(parsedData));
               res.send();
            })
    
        })
    
    
    });

app.post("/AddReview", async (req,res)=>{
try{
    
    const {moiveRef,userFistName,userLastName,userCommand} = req.body;
    console.log(moiveRef,userFistName,userLastName,userCommand);
    const newCommandMovie = new Moive({
        moiveRef: first_name,
        userFistName: last_name,
        userLastName: userLastName,
        userFistName: userFistName,
        userCommand:userCommand
    });

    await mongoose.connect(url);
    console.log("Database connected");
    Moive.save((err)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log("The document inserted successfully");
            res.send(newCommandMovie);
            mongoose.connection.close();
        }
    });
}
catch(error){
    console.log(error);
}
})
    
//get all movies that have command form database
/***
 * here we will re-fetch the movies that we have it in database by using the moive's refrence
 * from the following : https://imdb-api.com/en/API/Title/{key}/{movie'ref}
 * by using the prevois link, we can add more info about the moives(just for browsing)
 */                                                      
app.get("/MoviesInfo/", async (req,res)=>{
    try{
        await mongoose.connect(url);
        console.log("Database connected");
        Moive.find((err, moives)=>{
            if(err) console.log(err);
            else {
                console.log(moives);
                //** fetch is here  by moive's refrence*/
                res.send(moives);
                mongoose.connection.close();
            }
        })
    }
    catch(error){
        console.log(error);
    }

})


// this function is used to print the movies' table
/**
 * 
 *  i am thinking of  saving it in a component!!!
 * in that component we exe deletion...
 * 
 */
function DesplayMovieData(data){
    console.log(data);
    var desplayTable = `<table>`;
    for (var i = 0; i < 25; i++) {
        desplayTable += `<tr>
        <td><img src=${data.items[i].image}></td>
        <td><h1>movies Details</h1>
        <p><strong>Refrence:</strong>${data.items[i].id}</p>
        <p><strong>Title: </strong>${data.items[i].title}</p>
        <p><strong>fullTitle: </strong>${data.items[i].fullTitle}</p>
        <p><strong>Year:</strong>${data.items[i].year}</p>
        <p><strong>crew:</strong>${data.items[i].crew}</p>
        <button>Review</button>
        </td>
        </tr>`;
    }
    desplayTable += `</table>`;

    return desplayTable
}
// set a server
app.listen(4000, ()=>{
    console.log("the server is up and listening on port 4000");
})
