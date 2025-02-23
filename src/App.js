import { useState } from "react";
import WordInput from "./components/WordInput";
import Flashcards from "./components/Flashcards";
import Gamepage from "./components/Gamepage";
import NavBar from "./components/NavBar";
function App() {
  const [activeTab, setActiveTab] = useState(<WordInput />);
  const tabs = [
    { label: "Wordlist", content: <WordInput /> },
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
