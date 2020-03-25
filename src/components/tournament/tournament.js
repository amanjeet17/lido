import React, { Component } from 'react'
import Fixtures from './fixtures';
import { connect } from 'react-redux';
import { getTeams, simulationDone, nextRound, readyFinale, announceWinner } from '../../actions/gameActions';

class Tournament extends Component {

    state={
        disableBtn:false
    }


startSimulation = () => {
    this.setState({disableBtn:true});
    setTimeout(()=>{this.setState({disableBtn:false})},6000)
    let leftGroupSimulation = [];
    let rightGroupSimulation = [];
    let currentRound = this.props.rounds[this.props.counter];
    let nextRound = this.props.rounds[this.props.counter + 1];
    switch (currentRound) {
        case 'knockout':
            leftGroupSimulation = this.props.lefthalf.knockout;
            rightGroupSimulation = this.props.righthalf.knockout;
            break;
        case 'quarterFinal':
            leftGroupSimulation = this.props.lefthalf.quarterFinal
            rightGroupSimulation = this.props.righthalf.quarterFinal
            break;
        case 'semiFinal':
            leftGroupSimulation = this.props.lefthalf.semiFinal
            rightGroupSimulation = this.props.righthalf.semiFinal
            break;
        case 'groupFinalist':
            leftGroupSimulation = this.props.lefthalf.groupFinalist
            rightGroupSimulation = this.props.righthalf.groupFinalist
            break;
        default:
            leftGroupSimulation = this.props.grandFinals[0]
            rightGroupSimulation = this.props.grandFinals[1]
            this.simulateGame(false, currentRound, null, this.props.grandFinals, null);
            return;
    }
    this.simulateGame(false, currentRound, 'lefthalf', leftGroupSimulation, nextRound);
    this.simulateGame(true, currentRound, 'righthalf', rightGroupSimulation, nextRound);

}

simulateGame = (toggle, round, half, currentTeams, nextRound) => {
    var arr1 = [];
    var arr2 = JSON.parse(JSON.stringify(currentTeams))
    for (let i = 0; i < currentTeams.length; i = i + 2) {
        var team1_score = Math.floor(Math.random() * 11)
        var team2_score = Math.floor(Math.random() * 11)
        if (team1_score >= team2_score || arr2[i + 1].abbreviation==='Pass') {
            arr1.push(arr2[i]);
        }
        else {
            arr1.push(arr2[i + 1]);
        }
        arr2[i].score = team1_score
        arr2[i + 1].score = team2_score

    } if (round === "grandFinals") {
        alert(arr1[0].abbreviation);
        this.props.announceWinner(arr2, arr1[0])
        return;
    }
    else if (round === "groupFinalist") {
        this.props.readyFinale(half, arr1)
    }
    else {
        this.props.simulationDone(round, nextRound, half, arr2, arr1);
    }
    if (toggle) {
        this.props.nextRound()
    }
}

componentDidMount() {
    if (!localStorage.getItem('persist:root')) {
        this.props.getTeams()
    }
}

render() {
    const { lefthalf, righthalf } = this.props;
    return (
        <div>
            <div>
                <button onClick={this.startSimulation} disabled={this.state.disableBtn} >Simulate </button>
            </div>
            <Fixtures teams={lefthalf} reverse={false} />
            <span className="final">Final</span>
            <Fixtures teams={righthalf} reverse={true} />
        </div>
    )
}
}


const mapStateToProps = (state) => ({
    teams: state.game.allTeams,
    lefthalf: state.game.lefthalf,
    righthalf: state.game.righthalf,
    rounds: state.game.rounds,
    counter: state.game.counter,
    grandFinals: state.game.grandFinals
});


export default connect(mapStateToProps, { getTeams, simulationDone, nextRound, readyFinale, announceWinner })(Tournament);