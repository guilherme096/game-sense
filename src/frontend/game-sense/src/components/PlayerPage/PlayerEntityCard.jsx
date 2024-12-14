import PropTypes from 'prop-types';
import { useQuery } from "react-query";
import axios from "axios";

export default function PlayerEntityCard({name1, name2, playerData }) {

    const fetchClub = async () => {
        console.log("Fetching club");
        const response = await axios.get(`/api/v1/club/${playerData.clubId}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
            },
        });
        console.log("Club API Response:", response.data);
        return response.data;
    };

    const { data: club, isLoadingClub, errorClub } = useQuery(["club", playerData.clubId], fetchClub);

    if (isLoadingClub) {
        console.log("Club data is loading...");
        return <div>Loading Club Data...</div>;
    }

    if (errorClub) {
        console.error("Error fetching club data:", errorClub);
        return (
            <div>
                An error has occurred while fetching club data:{" "}
                {errorClub?.message || "Unknown error"}
            </div>
        );
    }

    if (!club) {
        console.error("Unexpected response format for club.");
        return <div>An error occurred while fetching club.</div>;
    }

    return (
        <>
            <div className="card card-side bg-base-100 shadow-xl m-4 items-center relative overflow-hidden">
                {/* Background Div */}
                <div className="bg-gray-700"
                    style={{
                        position: 'absolute',
                        top: '80%',
                        left: '-20%',
                        width: '150%', 
                        height: '200%', 
                        transform: 'rotate(165deg)',
                        zIndex: 1, // Ensures it stays behind the content
                    }}
                />

                {/* Title */}
                <div className="card-body text-black text-2xl">
                    {name1}
                    <div className="font-bold -mt-2">
                        {name2}
                    </div>
                </div>

                {/* Image */}
                <div
                    className="card-body w-8 p-4"
                    style={{
                        zIndex: 2,
                        position: 'relative',
                    }}
                >
                    <img style={{ width: '100%', height: '100%' }} src={club.logo} alt={club.name} />
                </div>
            </div>

        </>
    );
}

PlayerEntityCard.propTypes = {
    name1: PropTypes.string.isRequired,
    name2: PropTypes.string.isRequired,
};