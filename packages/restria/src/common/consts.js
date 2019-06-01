// @flow

export const ERROR = 'ERROR';
export const OK = 'OK';

// TODO - handle user language on server
// ERROR_CODES
export const errCodes = {
  notAuthenticated: 'NOT_AUTHENTICATED',
  missingEmail: 'MISSING_EMAIL',
  invalidEmail: 'INVALID_EMAIL',
  notRegistered: 'NOT_REGISTERED',
  alreadyFBAccount: 'ALREADY_FB_ACCOUNT',
  invalidPassword: 'INVALID_PASSWORD',
  invalidEmailOrPassword: 'INVALID_EMAIL_PASSWORD',
  emailAlreadyInUse: 'EMAIL_ALREADY_IN_USE',
};

export const validLoginTokenScopes = {
  userLogin: 'USER_LOGIN',
  userLoginAfterSignUp: 'USER_LOGIN_AFTER_SIGN_UP',
  userManagerInvitationEmail: 'USER_MANAGER_INVITATION_EMAIL',
  userLoginComplaintEmail: 'USER_LOGIN_COMPLAINT_EMAIL',
};
