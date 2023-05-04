const router = require("express").Router();
const messageController = require("../controllers/messageController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/messages", messageController.getMessages);
router.post("/messages", messageController.addMessage);

module.exports = router;
