import { useState } from "react";
import HomePage from "./components/HomePage";
import Flashcards from "./components/Flashcards";
import Gamepage from "./components/Gamepage";
import NavBar from "./components/NavBar";
function App() {
  const [activeTab, setActiveTab] = useState(<HomePage />);
  const tabs = [
    { label: "Wordlist", content: <HomePage /> },
    { label: "Flashcards", content: <Flashcards /> },
    { label: "Games", content: <Gamepage /> },
  ];

  return (
    <NavBar tabs={tabs} size={"text-[30px]"} setActiveTab={setActiveTab}>
      {activeTab}
    </NavBar>
  );
}

export default App;
