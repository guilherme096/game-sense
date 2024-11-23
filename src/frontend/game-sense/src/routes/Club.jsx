import PageTemplate from "./PageTemplate.jsx";
import ClubCard from "../components/cards/ClubCard.jsx";
import HorizontalTab from "../components/HorizontalTab.jsx";
import Overview from "../components/ClubPage/Overview.jsx";

const England = "/england.png";
const WolvesLogo = "/wolves.png";
const Chelsea = "/chelsea.png";

function Club() {
    return (
        <PageTemplate>
            {/* Club Card */}
            <ClubCard
                image={WolvesLogo}
                name="Wolverhampton Wanderers"
                league="Premier League"
                rank={3}
                countryFlag={England}
                isFollowed={true}
            />

            {/* Horizontal Tab */}
            <HorizontalTab
                color_back="bg-gray-700"
                categories={[
                    { name: "Overview", content: <Overview />},
                    { name: "Statistics", content: "" },
                    { name: "Injuries", content: <div>Injuries Content</div> },
                    { name: "Tips", content: <div>Tips Content</div> },
                ]}
            />
        </PageTemplate>
    );
}

export default Club;
