
export default function EntityCard({ image, name1, name2 }) {
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
                    className="card-body w-14 p-4"
                    style={{
                        zIndex: 2,
                        position: 'relative',
                    }}
                >
                    <img style={{ width: '100%', height: '100%' }} src={image} alt="Premier League Logo" />
                </div>
            </div>

        </>
    );
}