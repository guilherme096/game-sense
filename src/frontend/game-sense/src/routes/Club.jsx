import PageTemplate from "./PageTemplate";
import HorizontalTab from "../components/HorizontalTab";
import Overview from "../components/ClubPage/Overview";
import ClubCard from "../components/cards/ClubCard";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function Club() {
  const id = useParams().id;

  const fetchClub = async () => {
    console.log("fetching club");
    const response = await axios.get("/api/v1/club/"+id, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
        },
    });
    return response.data;
  }

  const { data: club, isLoading, error } = useQuery("club", fetchClub);
    console.log("club");
    console.log(club);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <PageTemplate>
      <ClubCard clubData={club} id={id} />
      <HorizontalTab
        color_back="bg-gray-700"
        categories={[
          { name: "Overview", content: <Overview clubData={club} id={id} /> },
          { name: "Statistics", content: "Statistics Content" },
          { name: "Injuries", content: "Injuries Content" },
          { name: "Tips", content: "Tips Content" },
        ]}
      />
    </PageTemplate>
  );
}

export default Club;
