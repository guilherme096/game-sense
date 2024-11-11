
export default function EntityCard({ image, name }) {
    return (
        <>
            <div className="card card-side bg-base-100 shadow-xl m-4 items-center"
                 style={{position: 'relative', overflow: 'hidden'}}>
                <div
                    style={{
                        width: 500,
                        height: 150,
                        position: 'absolute',
                        top: '70%',
                        left: '-20%',
                        transform: 'rotate(160deg)',
                        background: '#333D4D',
                    }}
                />

                <div
                    className="card-body"
                    style={{
                        color: 'black',
                        fontSize: 24,
                        fontWeight: '700',
                        wordWrap: 'break-word',
                        zIndex: 2,
                        position: 'relative',
                    }}
                >
                    Premier<br/>League
                </div>

                <div className="card-body w-14 p-1 " style={{zIndex: 2, position: 'relative'}}>
                    <img style={{width: '100%', height: '100%'}} src={image} alt="Premier League Logo"/>
                </div>
            </div>

        </>
    );
}