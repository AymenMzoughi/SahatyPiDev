import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  NavBar  from "../components/NavBar";
import  Projects  from '../components/Projects';
import Contact  from "../components/Contact";
import Footer  from "../components/Footer";
import Banner from '../components/Banner';

function Home() {
 
  return (
    <div className="App">
    <NavBar />
    <Banner/>
    <Projects />
    <Contact />
    <Footer />
    </div>
  );
}

export default Home;