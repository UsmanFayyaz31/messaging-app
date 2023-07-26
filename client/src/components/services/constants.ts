export const BASE_URL = process.env.REACT_APP_BASE_URL;

// authentication routes
export const SIGN_UP = "/sign-up";
export const LOG_IN = "/log-in";

//authenticated routes
export const HOME = "/";

//un-authenticated routes
export const ABOUT_US = "/about-us";

//endPoints
export const SIGN_UP_API = BASE_URL + "signup/"
export const LOG_IN_API = BASE_URL + "login/"
export const GET_FRIENDS = BASE_URL + "get-friends/"