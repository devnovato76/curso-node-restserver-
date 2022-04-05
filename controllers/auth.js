const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
//const { json } = require("express/lib/response");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }
    if (!usuario.estado) {
      return res.status(404).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(404).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        rol: "USER_ROLE",
        google: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hablé con el administrador, usuario Bloqueado",
      });
    }
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "El token no se pudo verificar",
    });
  }
};
module.exports = {
  login,
  googleSignIn,
};
