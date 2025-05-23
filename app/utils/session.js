const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000, // 1 hour
    },
  };
  
  module.exports = sessionOptions;
  