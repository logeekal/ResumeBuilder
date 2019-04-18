import {genSummary} from '../state/genfakeData';

export default (state=genSummary(),action)=>{
    return state;
}