import React from 'react'
import UpperTeam from './upperTeam';
import LowerTeam from './lowerTeam'
const Round = (props) => {
    let size = props.arr.length - 1;
    return (
        <React.Fragment>
            {props.arr.map((team, index) => {
                if (index % 2 === 0) {
                    return (
                        <UpperTeam team={team} key={team.teamId}/>
                    )
                }
                else {
                    return (
                        <React.Fragment  >
                            <LowerTeam team={team} key={team.teamId}/>
                            {index === size ? <li className="spacer">&nbsp;</li> : null}
                        </React.Fragment>
                    )
                }
            })}
        </React.Fragment>
    )
}
export default Round;