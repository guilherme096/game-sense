import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header";
import Overview from "./Overview.jsx";
import HorizontalTab from "../components/HorizontalTab.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const tabs = [
  { name: "Overview", content: <Overview /> },
  { name: "Stats", content: <div></div> },
];

function Game() {
  return (
    <>
      <Header />
      <div className="p-4 font-semibold pt-0">
        <div className="w-full text-center font-semibold">1st Half</div>
        <div className="w-full h-fit flex flex-row justify-between align-middle items-center">
          <div>
            <div className="flex flex-row items-center">
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: "#FFD43B" }}
                className="w-6 h-6 mr-2"
              />
              <div className="w-24 h-24 bg-base-200 rounded-lg"></div>
            </div>
            <div className="text-center my-2 ml-8">Team A</div>
          </div>
          <div className="h-fit flex flex-col align-middle items-center">
            <div className="h-24 flex-col items-center align-middle flex justify-center">
              <div className="w-fit h-fit text-4xl">1 - 0</div>
              <div className="w-fit h-fit text-sm text-center">32'</div>
            </div>
            <div className="w-6 h-6 rounded-full bg-primary"></div>
          </div>
          <div>
            <div className="flex flex-row items-center">
              <div className="w-24 h-24 bg-base-200 rounded-lg"></div>
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: "#FFD43B" }}
                className="w-6 h-6 ml-2"
              />
            </div>
            <div className="text-center my-2 mr-8">Team A</div>
          </div>
        </div>
      </div>
      <HorizontalTab categories={tabs} />
      <Navbar />
    </>
  );
}

export default Game;
