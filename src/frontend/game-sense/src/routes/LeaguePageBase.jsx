import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header";
import EntityCard from "../components/cards/EntityCard.jsx"
import Standings from "../components/standings/Standings.jsx"

function LeaguePageBase({ children }) {
    return (
        <>
            <Header />
                <EntityCard image='/pl.png' name='Premier'/>
                <Standings />
            <Navbar/>
        </>
    );
}

export default LeaguePageBase;
