const express = require("express");
const router = express.Router();
const tipService = require("../controllers/tipsController");
const multer = require("multer");
const bodyParser = require("body-parser");


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


const upload = multer({ storage }).fields([
  { name: "picture", maxCount: 1 },
  { name: "tippdf", maxCount: 1 },
  { name: "video", maxCount: 1 },

  // { name: "faceData", maxCount: 1 },
]);

  const app = express();
app.use(bodyParser.json());


router.post("/addtip", upload, tipService.addTips);
router.get("/getTips", tipService.getTips);
router.get("/searchTip/:title", tipService.searchTipsBytitle);

router.delete("/deleteTip/:id", tipService.deleteTip);
router.put("/updatTip", upload, tipService.updateTip);


module.exports = router;
