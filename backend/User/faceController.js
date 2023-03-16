var express= require("express")
var router=express.Router()
const multer=require('multer');
var faceService=require("./faceService")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/face');
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`;
      cb(null, fileName);
    },
  });

  const upload=multer({storage}).single('faceData');


  router.post("/upload",upload,faceService.addFace)


  module.exports = router;