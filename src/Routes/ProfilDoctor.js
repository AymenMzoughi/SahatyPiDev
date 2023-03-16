import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  NavBarD  from "../components/NavBarD";
import  Projects  from '../components/Projects';
import Contact  from "../components/ContactD";
import Footer  from "../components/Footer";
import Banner from '../components/BannerD';

function Home() {
 
  return (
    <div className="App">
    <NavBarD />
    <Banner/>
    <Projects />
    <Contact/>
    <Footer />
    </div>
  );
}

export default Home;