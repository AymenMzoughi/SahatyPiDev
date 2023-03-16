const express = require("express");
const router = express.Router();
const userService = require("./userService");
const authService = require("./auth");
const passport = require("passport");
const Face=require("./faceauth");
const multer = require("multer");
const faceService = require("./faceService");
const bodyParser = require("body-parser");
const CLIENT_URL = "http://localhost:3002/";

// Multer Configurations
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, fileName);
  },
});

const uploadface = multer({ storage }).single("faceData");

const upload = multer({ storage }).fields([
  { name: "pdp", maxCount: 1 },
  { name: "docVerif", maxCount: 10 },
  // { name: "faceData", maxCount: 1 },
]);

const app = express();
app.use(bodyParser.json());
/////////Zeineb///////
router.post("/addUser", upload, userService.signup);
router.post("/login", userService.login);
router.post('/forgot-password', userService.forget);
router.post('/reset-password', userService.reset);

//////Rayen
router.get("/login/success",authService.loginSucces);
router.get("/login/failed", authService.loginfield);
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback",passport.authenticate("google", {successRedirect: CLIENT_URL,failureRedirect: "/login/failed",}));
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
//////AYmen
router.get("/showUser", userService.showUsers);
router.get("/showUser/:id", userService.getUser);
router.delete("/delUser/:id", userService.deleteUser);
router.put("/updateUser/:id", userService.updateUser);
router.get("/search", userService.findUser);
//////Anouar
router.post("/upload", uploadface, faceService.addFace);

module.exports = router;
