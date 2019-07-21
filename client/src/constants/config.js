import {
    genEducation,
    genExperience,
    genPersonalInfo,
    genOtherDetails,
    genHeader,
    genSocial
} from '../state/genfakeData';


/**
 * loginInfo stores definition of all the values in loginInfo entity of state.
 */
export const loginInfo = {signin : "SignIn", signup:"SignUp" , loggedin:"LoggedIn"};
export const LEVEL_SECTION= "section";
export const LEVEL_SUB_SECTION = "subsection";
export const META_DEFS= {
    HEADER : "header",
    PERSONALINFO : 'personalInfo',
    SOCIAL  : 'social',
    EDUCATION : 'education',
    EXPERIENCE : 'experience',
    OTHERDETAILS : "otherDetails",
    SKILLS     : 'skills',
    LANGUAGES  : 'languages',
    PROJECTS   : 'projects',
    INTERESTS  : 'interests'
};

export const INITIAL_STATES = {
    [META_DEFS.HEADER] : genHeader(),
    [META_DEFS.EDUCATION] : genEducation(),
    [META_DEFS.EXPERIENCE] : genExperience(),
    [META_DEFS.PERSONALINFO] : genPersonalInfo(),
    [META_DEFS.OTHERDETAILS] : genOtherDetails(),
    [META_DEFS.SOCIAL] : genSocial()
}


export const templates = {
    bono : "../templates/bono.jsx"
}