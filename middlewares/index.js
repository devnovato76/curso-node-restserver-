const validarJWT = require("../middlewares/validar-jwt");
const validaCampos = require("../middlewares/validar-campos");
const validarRoles = require("../middlewares/validar-roles");

module.exports = { ...validaCampos, ...validarJWT, ...validarRoles };
