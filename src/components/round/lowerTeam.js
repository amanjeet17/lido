import React from 'react'

const LowerTeam = (props) => {
    const { abbreviation, score } = props.team
    return (
        <React.Fragment>
            <li className="game game-spacer">&nbsp;</li>
            <li className="game game-bottom ">{abbreviation} <span>{score}</span></li>
        </React.Fragment>
    )
}

export default LowerTeam;