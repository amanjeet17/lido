import {GET_TEAMS, 
        ASSIGN_RIGHT_TEAMS, 
        ASSIGN_LEFT_TEAMS,
        UPDATE_TEAMS,
        UPDATE_ROUND,
        READY_FINALE,
        WINNER_ANNOUNCEMENT
     } from './types'
import axios from 'axios'

const power_of_2 = (n) => {
    if (typeof n !== 'number')
        return 'Not a number';

    return n && (n & (n - 1)) === 0;
}

export const getTeams = () => async dispatch => {
    const res = await axios.get('https://raw.githubusercontent.com/bttmly/nba/master/data/teams.json')
    let data = res.data;
    const powerCheck = power_of_2(data.length);
    const lefthalfarray = data.slice(0, res.data.length / 2).map((team) => ({ ...team, score: undefined }));
    const righthalfarray = data.slice(res.data.length / 2).map((team) => ({ ...team, score: undefined }));
    if (!powerCheck) {
        lefthalfarray.push({ abbreviation: "Pass", score: undefined,teamId:Math.random()*100000 })
        righthalfarray.push({ abbreviation: "Pass", score: undefined,teamId:Math.random()*100000 })
    }
    dispatch({
        type: GET_TEAMS,
        payload: data
    })
    rightTeams(righthalfarray)(dispatch);
    leftTeams(lefthalfarray)(dispatch);
}


export const leftTeams = (data) => dispatch => {
    dispatch({
        type: ASSIGN_LEFT_TEAMS,
        payload: data
    })
}

export const rightTeams = (data) => dispatch => {
    dispatch({
        type: ASSIGN_RIGHT_TEAMS,
        payload: data
    })
}

export const simulationDone = (round,nextround,half,data,winningTeam,toggle,callback) => dispatch =>{
    let payload={round,half,data,winningTeam,nextround,toggle,callback}
    setTimeout(() => {
        dispatch({
            type: UPDATE_TEAMS,
            payload: payload
        })
      }, 5000);   
}
export const nextRound = (side) => dispatch =>{
        dispatch({
            type: UPDATE_ROUND
        })
        
}

export const readyFinale = (half,winner) => dispatch =>{
    let payload={side:half,winner}
    dispatch({
        type: READY_FINALE,
        payload: payload
    })
}

export const announceWinner =(scoreUpdation,winner) => dispatch =>{
    let payload ={scoreUpdation,winner}
    dispatch({
        type: WINNER_ANNOUNCEMENT,
        payload: payload
    })
}