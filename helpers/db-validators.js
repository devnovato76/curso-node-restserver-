const Role = require("../models/role");
const { Usuario, Categoria, Producto } = require("../models/");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo} ya está registrado en la BD`);
  }
};
const existeUsuarioPorId = async (id) => {
  const existeUsuario = await usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El  id no existe ${id}`);
  }
};
const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id: ${id} no existe en la BD`);
  }
};
const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id: ${id} no existe en la BD`);
  }
};
module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
};
