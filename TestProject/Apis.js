export const DEBUG = 1; //put 1 -- api will work
export const BASE_URL = "http://www.eccfl.co.uk/customMapAPIs/"; //Base url
export const SEND_OTP = BASE_URL + "user/sendMobileOtp";
export const VALIDATE_OTP = BASE_URL + "user/validateMobileOtp";
export const EMAIL_REGISTRATION = BASE_URL + "user/sendEmailRegistrationLink";
export const FACEBOOK_REGISTRATION = BASE_URL + "user/userRegistratoionByFB";

export const UPDATE_USER = BASE_URL + "user/updateUserDetails";
export const FORGET_PASSWORD = BASE_URL + "user/forgetPassword";


export const GET_USER_DETAILS_EMAIL = BASE_URL + 'user/getUserDetails';


export const LANDING_RESOURCES = BASE_URL + "landing/getFirPolResourceAndHeatMapDtl";
export const LANDING_TOP_SIX = BASE_URL + 'landing/getTopSixResources';
export const LANDING_CDM = BASE_URL + "landing/getTopThreeCDM";
export const LANDING_PDM = BASE_URL + "landing/getTopThreePDM";

export const AREA_PDM = BASE_URL + 'area/getAreaByLocationPolDist';
export const AREA_CDM = BASE_URL + 'area/getAreaByLocationFirDist';

export const GPR_FLAG = BASE_URL + 'gpr/markGPRFlag';

export const TREND_ = BASE_URL + 'trends/getResourceGprHistoryDetails';
export const TREND_IMAGE = BASE_URL + 'trends/getTrendsImagesDetails';
export const TREND_PDM = BASE_URL + 'trends/getPDMResourceGprHistoryDetails';
export const TREND_CDM = BASE_URL + 'trends/getCDMResourceGprHistoryDetails';

export const GET_CURRENT_ACTIVE_SURVEY = BASE_URL + 'survey/getCurrActiveRegnSurvey';
export const SUBMIT_USER_SURVEY_QUESTION = BASE_URL + 'survey/postSurveyAnswers';

export const UPDATE_USER_AREA = BASE_URL + 'user/insertBaseAreaDetails';



// Api 1 - Error in sending sms
// Api 2 = Not validating api

export const MOBILE_NUMBER_ = "919729483089"; //put 1 -- api will work

export const TIMELINE_DATA = BASE_URL + 'message/getUserTimeLine';
export const LIKDISLIKE_POST = BASE_URL + 'message/messageLikeDislike';

export const REPORT_POST = BASE_URL  + "message/reportMessage"
// export const REPORT_POST = BASE_URL  + "Report_Abuse.php"; //Do not have the api

export const FETCH_REPLY_POST = BASE_URL + "message/getMessageByThreadId";


export const MESSAGE_COMPOSE = BASE_URL + 'message/messageCompose';
export const MEDIA_COMPOSE = BASE_URL + 'mediaCompose';//Do not have the api

export const MESSAGE_REPLY = BASE_URL + 'message/messageReply';
export const MEDIA_MESSAGE_REPLY = "http://holygrailwar.babbles.zone/" + 'mediaMessageReply';//Do not have the api

// http://localhost/customMapAPIs/message/messageCompose