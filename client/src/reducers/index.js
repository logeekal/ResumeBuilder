import personalInfo from './personalInfo';
import summary from './summary';
import title  from './title';
import fields from './fields';
import loginInfo from './loginInfo';
import education from './education';
import experience from './experience';
import {combineReducers} from 'redux';


export default combineReducers({
    personalInfo,
    summary,
    title,
    fields,
    loginInfo,
    education,
    experience
});