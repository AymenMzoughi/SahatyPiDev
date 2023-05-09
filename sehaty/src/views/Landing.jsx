import About from "../components/About";

import Doctors from "../components/Doctor";
import Hero from "../components/Hero";
import Services from "../components/Services";

const Landing = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Doctors landing={true} />
      <About />
    </div>
  );
};

export default Landing;
