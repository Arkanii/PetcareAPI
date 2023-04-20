export default () => ({
  jwt: {
    expiration_time: process.env.JWT_EXPIRATION_TIME,
    secret: process.env.JWT_SECRET,
  },
});
