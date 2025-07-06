

const AnimatedCard = ({  cover, title, character }:any) => {
  return (
    // <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="donor-card">
        <div className="donor-card-wrapper">
          <img src={cover} alt="cover" className="donor-card-cover" />
        </div>
        <img src={title} alt="title" className="donor-card-title" />
        <img src={character} alt="character" className="donor-card-character" />
      </div>
    // </a>
  );
};

export default AnimatedCard;
