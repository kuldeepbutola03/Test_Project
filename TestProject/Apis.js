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
export const LANDING_CDM = BASE_URL + "landing/getTopThreeCDM";
export const LANDING_PDM = BASE_URL + "landing/getTopThreePDM";

export const AREA_PDM = BASE_URL + 'area/getAreaByLocationPolDist';
export const AREA_CDM = BASE_URL + 'area/getAreaByLocationFirDist';

export const GPR_FLAG = BASE_URL + 'gpr/markGPRFlag';

export const TREND_ = BASE_URL + 'trends/getResourceGprHistoryDetails';