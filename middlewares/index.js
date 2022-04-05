const validarJWT = require("../middlewares/validar-jwt");
const validaCampos = require("../middlewares/validar-campos");
const validarRoles = require("../middlewares/validar-roles");
const validarArchivoSubir = require("../middlewares/validar-archivo");

module.exports = {
  ...validaCampos,
  ...validarJWT,
  ...validarRoles,
  ...validarArchivoSubir,
};
