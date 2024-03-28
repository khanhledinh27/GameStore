import Carousel from 'react-bootstrap/Carousel';
import { projects } from "./data";

function IndividualIntervalsExample() {
  return (
    
    <Carousel id ='img-home'>
      {projects.map((project) => (
      <Carousel.Item interval={1000}
      href={project.link}
      key={project.image}
      >
        <img id ='img-home' className='d-block w-100' height={680}
        src={project.image} alt={project.title} />
      </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default IndividualIntervalsExample;