const multer = require("multer");

const upload = multer();

const handleFormData = upload.fields([
  { name: "email" },
  { name: "nombreUsuario" },
  { name: "contrasena" },
  { name: "anoNacimiento" },
  { name: "rol" },
  { name: "img" },
]);

module.exports = { handleFormData };