const express = require('express');
const mongoose = require('mongoose');
const https = require("https");
const cors = require('cors');
const Moive = require('./models/movies');
const Review = require('./models/Reviews');
const { json } = require('body-parser');

const app = express();

// get use
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// set database url
const url = "mongodb://localhost:27017/moviesDB";


//----------Get Section--------------------
// fetch movies form the route
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
               //res.write(DesplayMovieData(parsedData));
               res.send(parsedData);
            })
    
        })
    
    
    });


//get all all movies we have in the data base                                                     
app.get("/moviesList/", async (req,res)=>{
    try{
        await mongoose.connect(url);
        console.log("Database connected");
        Moive.find((err, moives)=>{
            if(err) console.log(err);
            else {
                console.log(moives);
                res.send(moives);
                mongoose.connection.close();
            }
        })
    }
    catch(error){
        console.log(error);
    }
})



//get all movies commands and rates
app.get("/allMoiveReviews/", async (req,res)=>{
    try{
        await mongoose.connect(url);
        Review.find((err, commands)=>{
            if(err) console.log(err);
            else {
                res.send(commands);
                mongoose.connection.close();
            }
        })
    }
    catch(error){
        console.log(error);
    }

})

//get spicific movies commands and rates
app.get("/spicificMoiveReview/:ref", async (req,res)=>{
    try{
        var passedMoiveRef = req.params.ref;
        await mongoose.connect(url);
        Review.find({moiveRef:passedMoiveRef},(err,doc)=>{
             if (!err){
                 res.send(doc);
             }
         });

    }
    catch(error){
        console.log(error);
    }

})

///------ delete commands-------
app.get("/deleteReview/:ReviewId", async (req,res)=>{
    try{
        
           //--- get the info
           let ReviewId = req.params.ReviewId;
           _id = mongoose.Types.ObjectId(ReviewId);         
           await mongoose.connect(url);
           Review.deleteOne({_id: _id},(err)=>{
                    if(!err){
                        console.log("The document deleted successfully");
                        //res.redirect("/spicificMoiveReview/tt0111161");
                        
                        mongoose.connection.close();                  
                      }
            });
        }
    catch(error){
        console.log(error);
    }
});

//-------------Post Section----------------------
app.post("/submitReview/", async (req,res)=>{
    try{
        
        const {moiveRef,userFirstName,userLastName,userCommand,userRate} = req.body;
        //console.log(moiveRef,userFistName,userLastName,userCommand,userRate);
        const newCommandMovie = new Review({
            moiveRef: "moiveRef",
            userFirstName: "userFirstName",
            userLastName: "userLastName",
            userCommand: "userCommand",
            userRate:5,
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



// this function is used to print the movies' table if you want

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
app.listen(5000, ()=>{
    console.log("the server is up and listening on port 5000");
})
