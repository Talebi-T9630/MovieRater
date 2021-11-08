import React, { useState } from 'react';


function HomePage() {
    const imageURL1 = "https://www.imdb.com/title/tt0898266/mediaviewer/rm2794006016/?ref_=ext_shr_lnk";
    const imageURL2 = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rottentomatoes.com%2Ftv%2Fattack_on_titan%2Fs04&psig=AOvVaw0kr01ollwtG4lrR8oZLh6t&ust=1636445990442000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIi9m8KqiPQCFQAAAAAdAAAAABAD";
    const imageURL3 = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rottentomatoes.com%2Ftv%2Fdexter&psig=AOvVaw1xcekP85A53OQZz3e-Smh9&ust=1636446101664000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKi4hfeqiPQCFQAAAAAdAAAAABAG";
    const cartIformation = [["The big bang theory", "Comedy sitcom"], ["Attack on Titan", "Anime"], ["Dexter", "Thriller"]];

    return (
        <div>
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="..." alt="Card image cap" />
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    )
}

export default HomePage;