import {genPersonalInfo} from '../state/genfakeData'

export default (state=genPersonalInfo(),action) => { 
    return state;
}