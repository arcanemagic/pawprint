import './App.css';
import Post from './components/post';
import logo from './images/pawprint_logo.png'
import cat_img from './images/powell_cat_image.jpg'
import dog_img from './images/lab_cute_image.jpg'
function App() {
  return (
    <div className="App">
      <div className="pawprint_header">
        <img
          className="pawprint_logo"
          src={logo}
          alt="Pawprint logo"/> 
            <strong>Pawprint</strong>
          <button className="pawprint_trending"><strong>Trending</strong></button>
          <button className="user_login"><strong>Log In</strong> </button>
      </div>
      <Post username="adithi.ramesh02" caption="So Cute!!" image={cat_img} tag="cat"/>
      <Post username="ar2302" caption="Adorable!!" image={dog_img} tag="dog"/>
    </div>
  );
}

export default App;
