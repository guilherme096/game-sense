import PageTemplate from "./PageTemplate.jsx";
import EntityCard from "../components/cards/EntityCard.jsx"
import HorizontalTab from "../components/HorizontalTab.jsx";
import Chelsea from "../../public/chelsea.png"


function PlayerPageBase({ children }) {
    return (
        <>
            <PageTemplate>
                <EntityCard image={Chelsea} name1='Marc' name2='Cucurella'/>
                <HorizontalTab color_back="bg-gray-700" categories={[ { name: 'Overview' , content: "" }, {name:'Statistics'}, {name:'Injuries'}, {name:'Tips'} ]} />
            </PageTemplate>
        </>
    );
}

export default PlayerPageBase;
