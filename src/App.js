import HomePage from "./components/HomePage";
import Flashcards from "./components/Flashcards";
import Gamepage from "./components/Gamepage";
import NavBar from "./components/NavBar";
function App() {
  const tabs = [
    { label: "Wordlist", content: <HomePage /> },
    { label: "Flashcards", content: <Flashcards /> },
    { label: "Games", content: <Gamepage /> },
  ];

  return <NavBar tabs={tabs} />;
}

export default App;
