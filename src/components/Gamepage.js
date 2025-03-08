import MatchingGame from "./MatchingGame";
import GuessImageGame from "./GuessImageGame";
import NavBar from "./NavBar";
import BlankFilling from "./BlankFilling";

const Gamepage = () => {
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

  return <NavBar tabs={tabs} />;
};

export default Gamepage;
