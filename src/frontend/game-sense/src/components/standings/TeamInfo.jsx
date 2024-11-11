export default function TeamInfo({ clubStanding }) {
    return (
        <>
            <div>
                <h1>Team Info</h1>
                <h2>{clubStanding.position}</h2>
                <h2>{clubStanding.club.name}</h2>
                <h2>{clubStanding.played}</h2>
                <h2>{clubStanding.points}</h2>
                <h2>{(clubStanding.gs - clubStanding.gc)}</h2>
                <h2>{clubStanding.won}</h2>
                <h2>{clubStanding.drawn}</h2>
                <h2>{clubStanding.lost}</h2>
            </div>
            <div style={{width: '100%', height: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 8, paddingBottom: 8, background: '#F3F3F3', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
                <div style={{height: 15}}>
                    <div style={{color: 'white', fontSize: 12, fontWeight: '700', wordWrap: 'break-word'}}>1</div>
                    <div style={{color: 'black', fontSize: 12, fontWeight: '700'}}>{clubStanding.club.name}</div>
                </div>
                <div style={{width: 157.09, height: 15.12, position: 'relative'}}>
                    <div style={{width: 22.14, left: 0, top: 1.12, position: 'absolute', color: 'black', fontSize: 12,  fontWeight: '700', wordWrap: 'break-word'}}>5</div>
                    <div style={{width: 24, left: 64.09, top: 0, position: 'absolute', color: 'black', fontSize: 12,  fontWeight: '700', wordWrap: 'break-word'}}>13:4</div>
                    <div style={{width: 14.09, left: 143, top: 1, position: 'absolute', color: 'black', fontSize: 12,  fontWeight: '700', wordWrap: 'break-word'}}>15</div>
                </div>
            </div>
        </>
    )
}