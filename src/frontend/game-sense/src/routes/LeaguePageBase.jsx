import EntityCard from "../components/cards/EntityCard.jsx";
import PageTemplate from "./PageTemplate.jsx";
import Standings from "../components/standings/Standings.jsx";
import HorizontalTab from "../components/HorizontalTab.jsx";
import { useQuery } from 'react-query';
import axios from 'axios';
import PropTypes from "prop-types";

function LeaguePageBase() {
    const fetchLeagueDetails = async () => {
        const response = await axios.get("/api/v1/league/1", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
            },
        });
        return response.data;
    };

    const { data: league, isLoading, error } = useQuery('leagueDetails', fetchLeagueDetails);

    if (isLoading) {
        return <div>Loading league details...</div>;
    }

    if (error) {
        console.error("Error fetching league details:", error);
        return <div>An error has occurred: {error.message}</div>;
    }

    const [name1, name2] = league.name?.split(" ") || ["League", "Name"];
    const image = league.logo;

    return (
        <PageTemplate>
            <EntityCard image={image} name1={name1} name2={name2} />
            <HorizontalTab
                categories={[
                    { name: 'Overview', content: <Standings showHeader={true} /> },
                    { name: 'Next Games', content: "Next Games Content" },
                    { name: 'Results', content: "Results Content" },
                    { name: 'Statistics', content: "Statistics Content" },
                ]}
            />
        </PageTemplate>
    );
}

export default LeaguePageBase;

LeaguePageBase.propTypes = {
    league: PropTypes.shape({
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
    }).isRequired,
};
