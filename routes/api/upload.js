const path = require('path');
const express = require('express')
const multer = require('multer')
const router = express.Router()
const auth = require("../../middleware/auth");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'client/public/images/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

//* @route  POST api/upload
//* @des    Handle image process
//* @access Private
router.post('/', upload.single('image'),[auth], (req, res) => {
  try{
    res.send(`/${req.file.filename}`)
  }catch(e){
    
  }
})

module.exports = router;