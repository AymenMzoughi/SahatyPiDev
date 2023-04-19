import About from "../components/About";
import Appointment from "../components/Appointment";
import Doctors from "../components/Doctors";
import Hero from "../components/Hero";
import Services from "../components/Services";

const Landing = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Doctors landing={true} />
      <Appointment />
      <About />
    </div>
  );
};

export default Landing;
