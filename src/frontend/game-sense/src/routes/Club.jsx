import React from "react";
import PageTemplate from "./PageTemplate";
import HorizontalTab from "../components/HorizontalTab";
import Overview from "../components/ClubPage/Overview";
import ClubCard from "../components/cards/ClubCard";
import { clubData } from "../static/club";

function Club() {
  return (
    <PageTemplate>
      <ClubCard clubData={clubData} />
      <HorizontalTab
        color_back="bg-gray-700"
        categories={[
          { name: "Overview", content: <Overview clubData={clubData} /> },
          { name: "Statistics", content: "Statistics" },
          { name: "Injuries", content: "Injuries Content" },
          { name: "Tips", content: "Tips Content" },
        ]}
      />
    </PageTemplate>
  );
}

export default Club;
