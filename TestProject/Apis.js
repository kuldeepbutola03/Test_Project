export const DEBUG = 0; //put 1 -- api will work
export const BASE_URL = "http://"; //Base url
export const SEND_OTP = BASE_URL + "sendMobileOtp";
export const VALIDATE_OTP = BASE_URL + "validateMobileOtp";
export const EMAIL_REGISTRATION = BASE_URL + "sendEmailRegistrationLink";
export const FACEBOOK_REGISTRATION = BASE_URL + "userRegistrationByFB";
export const UPDATE_USER = BASE_URL + "updateUserDetails";
export const FORGET_PASSWORD = BASE_URL + "forgetPassword";


export const GET_USER_DETAILS_EMAIL = BASE_URL + 'user/getUserDetails';


export const LANDING_RESOURCES = BASE_URL + "landing/getFirPolResourceAndHeatMapDtl";
export const LANDING_CDM = BASE_URL + "landing/getTopThreeCDM";
export const LANDING_PDM = BASE_URL + "landing/getTopThreePDM";

export const AREA_PDM = BASE_URL + 'area/getAreaByLocationPolDist';
export const AREA_CDM = BASE_URL + 'area/getAreaByLocationFirDist';

export const GPR_FLAG = BASE_URL + 'gpr/markGPRFlag';