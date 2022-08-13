var express = require("express");
var router = express.Router();
const tableController = require("../../app/controllers/Tables")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/img')
    },
    filename: function (req, file, cb) {
      cb(null, randomstring.generate({length: 12, charset: 'alphabetic'}) + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage, limits:{fileSize: 1 * 1024 * 1024} })

router.get("(/status/:status)?", tableController.show)
router.get("/change-status/:id/:status", tableController.changeStatus)
router.post("/change-status/:status", tableController.changeStatusMutil)

router.get("/delete/:id", tableController.deleteStatus)
router.post("/delete", tableController.deleteStatusMutil)
 
router.post("/change-ordering", tableController.changeOrdering)

router.get("/form(/:slug)?", tableController.showEditForm)
router.post("/submit",upload.single('avatar'), tableController.addEditItem)

module.exports = router;
