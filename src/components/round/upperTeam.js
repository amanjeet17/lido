import React from 'react'

const UpperTeam = (props) => {
    const { abbreviation, score } = props.team
    return (
        <React.Fragment>
            <li className="spacer">&nbsp;</li>
            <li className="game game-top">{abbreviation} <span>{score}</span></li>
        </React.Fragment>
    )
}

export default UpperTeam;