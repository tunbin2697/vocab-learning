import MatchingGame from "./MatchingGame";
import GuessImageGame from "./GuessImageGame";
import NavBar from "./NavBar";
import BlankFilling from "./BlankFilling";
import { useState } from "react";

const Gamepage = () => {
  const [activeTab, setActiveTab] = useState(<MatchingGame />);

  const tabs = [
    {
      label: "Matching",
      content: <MatchingGame />,
    },
    {
      label: "Image Game",
      content: <GuessImageGame />,
    },
    { label: "Blank Filling", content: <BlankFilling /> },
  ];

  return (
    <NavBar tabs={tabs} size={"text-[30px]"} setActiveTab={setActiveTab}>
      {activeTab}
    </NavBar>
  );
};

export default Gamepage;
