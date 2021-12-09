import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route,Routes,Switch} from "react-router-dom";
import NavBar from './components/navBar';
import Homepage from './components/homepage';
import  AboutUs from './components/aboutUs';
import ContactUS from './components/contactUs';
import Movies from './components/movies';
import MovieReview from './components/movieReview';
import AddNewComment from './components/addnewcomment';


function App() {
  return (
    <div>
    <NavBar/>
  <Routes>
          <Route path="/about" exact element={<AboutUs/>}/>
          <Route path="/ConectUs" exact element={<ContactUS/>}/>
          <Route path="/movies" exact element={<Movies/>}/>
          <Route path="/home" exact element={<Homepage/>}/>
          <Route path="/" exact element={<Homepage/>}/>
          <Route path="/movieReview" exact element={<MovieReview/>}/>
          <Route path="/addnewcomment" exact element={<AddNewComment/>}/>


    </Routes>
    </div>
  );

}

export default App;
