import React from "react";
import PageTemplate from "./PageTemplate";
import HorizontalTab from "../components/HorizontalTab";
import Overview from "../components/ClubPage/Overview";
import ClubCard from "../components/cards/ClubCard";
import { clubData } from "../static/club";
import axios from "axios";

function Club() {

  const fetchGame = async () => {
    const response = await axios.get("/api/v1/club/1", {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json'
        }
    });
    return response.data;
  }

  const {data: club, isLoading, error} = useQuery('club', fetchGame);
  if (isLoading) {
      return <div>Loading...</div>
  }
  if (error) {
      return <div>An error has occurred: {error.message}</div>
  }


  return (
    <PageTemplate>
      <ClubCard clubData={club} />
      <HorizontalTab
        color_back="bg-gray-700"
        categories={[
          { name: "Overview", content: <Overview clubData={club} /> },
          { name: "Statistics", content: "Statistics" },
          { name: "Injuries", content: "Injuries Content" },
          { name: "Tips", content: "Tips Content" },
        ]}
      />
    </PageTemplate>
  );
}

export default Club;
