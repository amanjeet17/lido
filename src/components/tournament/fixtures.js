import React, { Component } from 'react'
import Round from '../round/round';

class Fixtures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rounds: ["knockout", "quarterFinal", "semiFinal", "groupFinalist"]
        }
    }

    render() {
        const {  rounds } = this.state;
        const { teams,reverse } = this.props;
        return (
            <div className={`${reverse ? "alignRight" : ""}`}>
                <main id="tournament" className={`${reverse ? "reverse" : ""}`}>
                    {   
                        rounds.map((r,index) => {
                            return (
                                <ul className="round round-1" key ={`key+ ${index}`} >
                                    <Round arr={teams[r]} />
                                </ul>
                            )
                        })
                    }
                    <ul className="round round-5">
                        <li className="spacer">&nbsp;</li>
                        <li className="game game-top winner">{teams['final'][0] ? teams['final'][0].abbreviation: "Finalist"}
                         <span>{teams['final'][0] ? teams['final'][0]['score']: null}</span></li>
                        <li className="spacer">&nbsp;</li>
                    </ul>

                </main>

            </div >
        )
    }
}

export default Fixtures;