const constants = {
  SERVER_BASE_URL: process.env.SERVER_BASE_URL || 'http://localhost:3030',
  B64_SECRET: 'b@s36As3crEtkeY',
  USERS_API: process.env.USER_API || '/users',
  USER_LOCAL_STORAGE: 'webapp:user',
};

export default constants;
