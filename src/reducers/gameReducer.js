import {
    GET_TEAMS,
    ASSIGN_RIGHT_TEAMS,
    ASSIGN_LEFT_TEAMS,
    UPDATE_TEAMS,
    UPDATE_ROUND,
    READY_FINALE,
    WINNER_ANNOUNCEMENT
} from '../actions/types';

const initialState = {
    rounds: ["knockout", "quarterFinal", "semiFinal", "groupFinalist", "grandFinals"],
    counter: 0,
    teams: [],
    lefthalf: {
        knockout: [],
        quarterFinal: Array(8).fill({ abbreviation: "", score: undefined }),
        semiFinal: Array(4).fill({ abbreviation: "", score: undefined }),
        groupFinalist: Array(2).fill({ abbreviation: "", score: undefined }),
        final:[]
    },
    righthalf: {
        knockout: [],
        quarterFinal: Array(8).fill({ abbreviation: "", score: undefined }),
        semiFinal: Array(4).fill({ abbreviation: "", score: undefined }),
        groupFinalist: Array(2).fill({ abbreviation: "", score: undefined }),
        final:[]
    },
    grandFinals: [],
    winner: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload
            }
        case ASSIGN_RIGHT_TEAMS:
            return {
                ...state,
                righthalf: {
                    ...state.righthalf,
                    knockout: action.payload
                }
            }

        case ASSIGN_LEFT_TEAMS:
            return {
                ...state,
                lefthalf: {
                    ...state.lefthalf,
                    knockout: action.payload
                }
            }
        case UPDATE_TEAMS:
            const { round, half, data, nextround, winningTeam } = action.payload;
            const obj = winningTeam.map((team) => ({ ...team, score: undefined }))
            return {
                ...state,
                [half]: {
                    ...state[half],
                    [round]: data,
                    [nextround]: obj
                }
            }

        case READY_FINALE:
             const {side, winner } = action.payload;
             const obj1 = winner.map((team) => ({ ...team, score: undefined }))
            return {
                ...state,
                [side]:{
                    ...state[side],
                    final:obj1
                },
                grandFinals: state.grandFinals.concat(obj1)
            }

        case UPDATE_ROUND:
            return {
                ...state,
                counter: state.counter + 1,
            }

        case WINNER_ANNOUNCEMENT:
            console.log(action.payload)
            return{
                ...state,
                winner:action.payload.winner,
                grandFinals:action.payload.scoreUpdation,
                lefthalf:{
                    ...state.lefthalf,
                    final:[action.payload.scoreUpdation[0]]
                },
                righthalf:{
                    ...state.righthalf,
                    final:[action.payload.scoreUpdation[1]]
                }      
            }
        default:
            return state;
    }

}
