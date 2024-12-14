import PageTemplate from "./PageTemplate";
import HorizontalTab from "../components/HorizontalTab";
import Overview from "../components/ClubPage/Overview";
import ClubCard from "../components/cards/ClubCard";
import SquadOverview from "../components/ClubPage/SquadOverview";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function Club() {
  const id = useParams().id;

  const fetchClub = async () => {
    console.log("Fetching club");
    const response = await axios.get(`/api/v1/club/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    });
    console.log("Club API Response:", response.data);
    return response.data;
  };

  const fetchLeagueClubInformation = async () => {
    console.log("Fetching league club information");
    const response = await axios.get(`/api/v1/league/club/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    });
    console.log("League Club API Response:", response.data);
    return response.data;
  };

  const { data: club, isLoading, error } = useQuery(["club", id], fetchClub);
  const { data: leagueClub, isLoadingLeagueClub, errorLeagueClub } = useQuery(["leagueClub", id],fetchLeagueClubInformation);

  if (isLoading || isLoadingLeagueClub) {
    console.log("Data is loading...");
    return <div>Loading...</div>;
  }

  if (error || errorLeagueClub) {
    console.error("Error fetching data:", error || errorLeagueClub);
    return <div>An error has occurred: {(error || errorLeagueClub)?.message}</div>;
  }

  return (
    <PageTemplate>
      <ClubCard clubData={club || {}} leagueClubData={leagueClub || {}} />
      <HorizontalTab
        color_back="bg-gray-700"
        categories={[
          { name: "Overview", content: <Overview clubData={club || {}} id={id} /> },
          { name: "Statistics", content: "Statistics Content" },
          { name: "Squad", content: <SquadOverview clubData={club || {}} id={id} /> },
          { name: "Tips", content: "Tips Content" },
        ]}
      />
    </PageTemplate>
  );
}

export default Club;

Club.propTypes = {
    club: PropTypes.shape({
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
    }).isRequired,
    leagueClub: PropTypes.shape({
        place: PropTypes.number.isRequired,
        country: PropTypes.string.isRequired,
        countryFlag: PropTypes.string.isRequired,
    }).isRequired
};  