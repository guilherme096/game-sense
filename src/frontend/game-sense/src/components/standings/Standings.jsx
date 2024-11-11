import React from 'react';
import TeamInfo from './TeamInfo';

export default function Standings() {
    return (
        <div>
            <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                background: '#333D4D',
                borderRadius: 15,
                overflow: 'hidden'
            }}>
                <div style={{width: 64, height: 13, left: 172, top: 20, position: 'absolute'}}/>
                <div style={{
                    width: 137,
                    height: 18,
                    left: 24,
                    top: 10,
                    position: 'absolute',
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'Inria Sans',
                    fontWeight: '700',
                    wordWrap: 'break-word'
                }}>Standings
                </div>
                <div style={{
                    width: 234,
                    height: 18,
                    left: 204,
                    top: 9,
                    position: 'absolute',
                    color: '#989898',
                    fontSize: 18,
                    fontFamily: 'Inria Sans',
                    fontWeight: '400',
                    wordWrap: 'break-word'
                }}>Change Favorite Team
                </div>
            </div>
            <TeamInfo clubStanding={{
                position: 1,
                club: {name: 'Chelsea'},
                played: 38,
                points: 90,
                gs: 80,
                gc: 30,
                won: 28,
                drawn: 6,
                lost: 4
            }}/>
            
        </div>
    )
}