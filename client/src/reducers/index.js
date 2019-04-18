import personalInfo from './personalInfo';
import summary from './summary';
import title  from './title';
import {combineReducers} from 'redux';

export default combineReducers({
    personalInfo,
    summary,
    title
});