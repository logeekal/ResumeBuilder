import {genTitle} from '../state/genfakeData';

export default (state=genTitle(), action) => {
    return state;
}