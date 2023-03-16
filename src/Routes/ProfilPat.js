import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  NavBarD  from "../components/NavBarP";
import  Projects  from '../components/Projects';
import Contact  from "../components/ContactP";
import Footer  from "../components/Footer";
import Banner from '../components/BannerP';

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