import React from "react";
import TopBar from '../components/TopBar';
import BurgerMenu from '../components/BurgerMenu';
import Card from '../components/Card';
import "../styles/Page3.css";

const Page3 = () => {
  const handleMoreInfo = (cardType) => {
    console.log(`${cardType} More Info clicked`);
  };
  return (
    <div className="UniPage">
      <TopBar title="Page3" />
      <BurgerMenu />
      <div className="CardGrid">
        <Card
          RichMedia="/images/Default_Card_Image.jpg"
          tag="General Information"
          title="Your Title Here"
          subtitle=""
          buttonLabel="More Info"
          linkButton={true}
          details="Details go here"
        />
      </div>
    </div>
  );
};
export default Page3;