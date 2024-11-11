import EntityCard from "../components/cards/EntityCard.jsx"
import PageTemplate from "./PageTemplate.jsx";
import Standings from "../components/standings/Standings.jsx"

function LeaguePageBase({ children }) {
    return (
        <>
            <PageTemplate>
                <EntityCard image='/pl.png' name='Premier'/>
                <Standings />
            </PageTemplate>
        </>
    );
}

export default LeaguePageBase;
