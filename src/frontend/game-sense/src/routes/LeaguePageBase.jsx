import EntityCard from "../components/cards/EntityCard.jsx"
import PageTemplate from "./PageTemplate.jsx";
import Standings from "../components/standings/Standings.jsx"
import HorizontalTab from "../components/HorizontalTab.jsx";

function LeaguePageBase({ children }) {
    return (
        <>
            <PageTemplate>
                <EntityCard image='/pl.png' name='Premier'/>
                <HorizontalTab color_back="bg-gray-700" categories={[ { name: 'Overview' , content: <Standings /> }, {name:'Next Games'}, {name:'Results'}, {name:'Statistics'} ]} />
            </PageTemplate>
        </>
    );
}

export default LeaguePageBase;
