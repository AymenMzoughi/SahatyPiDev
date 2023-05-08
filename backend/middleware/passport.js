const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const passport = require("passport");
const GOOGLE_CLIENT_ID =
  "8416898283-eqrpl85q6gujf94ghdvv5aqlug16ik4m.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const GITHUB_CLIENT_ID = "80af88e447d9026a07ef";
const GITHUB_CLIENT_SECRET = "1565f099785e851d2bda3d95c2c1bb7a53f9a5a3";

const FACEBOOk_CLIENT_ID = "150177937955607";
const FACEBOOk_CLIENT_SECRET = "e513e3564f2258b10ec8f2fc4abc0fc2";
//Github
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOk_CLIENT_ID,
      clientSecret: FACEBOOk_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

//Google
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
