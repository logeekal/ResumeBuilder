import personalInfo from './personalInfo';
import summary from './summary';
import title  from './title';
import fields from './fields';
import loginInfo from './loginInfo';
import education from './education';
import experience from './experience';
import {combineReducers} from 'redux';
import { profileReducerFactory, profileReducer } from './profileReducerFactory';
import { META_DEFS } from '../constants/config';


export default combineReducers({
    summary,
    title,
    fields,
    loginInfo,
    [META_DEFS.PERSONALINFO] : profileReducerFactory(profileReducer, META_DEFS.PERSONALINFO),
    [META_DEFS.SOCIAL] : profileReducerFactory(profileReducer, META_DEFS.SOCIAL),
    [META_DEFS.EDUCATION] : profileReducerFactory(profileReducer, META_DEFS.EDUCATION),
    [META_DEFS.EXPERIENCE] : profileReducerFactory(profileReducer, META_DEFS.EXPERIENCE),
    [META_DEFS.OTHERDETAILS] : profileReducerFactory(profileReducer, META_DEFS.OTHERDETAILS),
    [META_DEFS.HEADER] : profileReducerFactory(profileReducer, META_DEFS.HEADER)
});

