import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header";
import EntityBox from "../components/EntityBox.jsx"

function LeaguePageBase({ children }) {
    return (
        <>
            <Header />
                <EntityBox image='/premier-league-icon-lion-png-large-size.png' name='Premier' surname='League'/>
            <Navbar/>
        </>
    );
}

export default LeaguePageBase;
