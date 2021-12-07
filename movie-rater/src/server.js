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

//Frist//----------Get Section--------------------
/***
 * fetch movies from the route
 * this API will be only used in the Home page as welcome, so it is not used to save data from
 * will pass the json array we get to a component that display each moive in dynamic and styled way
 * */ 
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


/**
 * get all movies we have in the database
 * in the database, will find 25 moives  that are ready to have review on
 * */                                                 
app.get("/moviesList", async (req,res)=>{
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


/**
 * get all movies Reviews 
 * */
app.get("/allMoiveReviews/show", async (req,res)=>{
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

/**get all spicific movies Review
 * this is one of the most importent array on our project, all command that related to the movie's Refrece (NOT ID)
 * will be displayed
 * important :::: movieRefrece is grabbed form API (imdb-api.com), so that what will be used when we add or browse a voive reviews
 * all movies in the database are populated with movieRefrece and its value already 
*/
app.get("/spicificMoiveReview/show/:movieRefrece", async (req,res)=>{
    try{
        var passedMoiveRef = req.params.movieRefrece;
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

///------ delete review-------
/***
 * when a review is deleted, the user will be redirected to the same page spicificMoiveReview/show/:movieRefrece to keep the user in the same page with updated data
 * so i have added movieRefrece as param
 * in app.get, i have used URL segments method *
 * for more information, Taranah, visit https://expressjs.com/en/guide/routing.html#:~:text=Route%20parameters%20are%20named%20URL%20segments%20that%20are%20used%20to%20capture%20the%20values%20specified%20at%20their%20position%20in%20the%20URL.%20The%20captured%20values%20are%20populated%20in%20the%20req.params%20object%2C%20with%20the%20name%20of%20the%20route%20parameter%20specified%20in%20the%20path%20as%20their%20respective%20keys. 
*/
app.get("/spicificMoiveReview/delete/:ReviewId/movie/:movieRefrece", async (req,res)=>{
    try{  
           //--- get the info
           let movieRefrence = req.params.movieRefrece; // get the movie refrece
           let ReviewId = req.params.ReviewId; // get the review Id
           _id = mongoose.Types.ObjectId(ReviewId);  // pointer the object    

           // get connection to DateBase
           await mongoose.connect(url);
           Review.deleteOne({_id: _id},(err)=>{
                    if(!err){
                        res.redirect(`/spicificMoiveReview/show/${movieRefrence}`);
                        mongoose.connection.close();                  
                      }
            });
        }
    catch(error){
        console.log(error);
    }
});

//Second//-------------Post Section----------------------
/***
 * this function is used to add a new review
 * the user will be redirected to the same page spicificMoiveReview/show/:movieRefrece to keep the user in the same page with updated data
*/
app.post("/spicificMoiveReview/submitNew/movie/:movieRefrece", async (req,res)=>{

    try{
        //1- get vars
        let movieRefrence = req.params.movieRefrece; // get the movie refrece
        const {moiveRef,userFistName,userLastName,userCommand,userRate} = req.body;
        //2- init an object
        const newReview = new Review({
            moiveRef: moiveRef,
            userFistName: userFistName,
            userLastName: userLastName,
            userCommand: userCommand,
            userRate:userRate,
        });
        
        //-3 get connection to the dataBase
        await mongoose.connect(url);

        //-4 submit the entity
        newReview.save((err)=>{
            if(err){
                console.log(err);
                res.send(err);
            }
            else{
               // res.send(newReview);
                res.redirect(`/spicificMoiveReview/show/${movieRefrence}`);
                mongoose.connection.close();
            }
        });
    }
    catch(error){
        console.log(error);
    }
})


//Thired//-------------Put Section----------------------
/***
 * this function is used to  update a review
 * the user will be redirected to the same page spicificMoiveReview/show/:movieRefrece to keep the user in the same page with updated data
*/
app.put("/spicificMoiveReview/update/:reviewId/movie/:movieRefrece", async (req,res)=>{
    try{
          //1- get the vars form the the url
           let movieRefrence = req.params.movieRefrece; // get the movie refrece
           let reviewId = req.params.reviewId;
           //2- get the object
           _id = mongoose.Types.ObjectId(reviewId);
           //3- get the vars form the body
           const {moiveRef,userFistName,userLastName,userCommand,userRate} = req.body;
           //4- make connection to the databse
           await mongoose.connect(url);
           //5- process update
           Review.updateOne(
                {_id: _id}, 
                {
                moiveRef: moiveRef,
                userFistName: userFistName, 
                userLastName: userLastName,
                userCommand:userCommand,
                userRate:userRate
                },
                (err)=>{
                    if(err){
                        console.log(err);
                        res.send(err);
                    }
                    else{
                        res.send("asdsa");
                        //res.redirect(`/spicificMoiveReview/show/${movieRefrence}`);
                        mongoose.connection.close();
                    }
                });
        }
    catch(error){
        console.log(error);
    }
});

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
