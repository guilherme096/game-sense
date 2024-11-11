import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header";
import Overview from "./Overview.jsx";
import HorizontalTab from "../components/HorizontalTab.jsx";

const tabs = [
  { name: "Overview", content: <Overview /> },
  { name: "Stats", content: <div></div> },
];

function Game() {
  return (
    <>
      <Header />
      <HorizontalTab categories={tabs} />
      <Navbar />
    </>
  );
}

export default Game;
