const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const { respuestaExito, respuestaError } = require("../utils/respuesta");
require("dotenv").config();

// ─── POST /api/auth/registro ──────────────────────────────────────────────────
const registro = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password)
      return respuestaError(res, "Nombre, email y contraseña son requeridos.", 400);

    const existe = await Usuario.findOne({ email });
    if (existe)
      return respuestaError(res, "Ya existe un usuario con ese email.", 409);

    const rolFinal = rol === "admin" && req.usuario?.rol === "admin" ? "admin" : "cliente";

    const usuario = await Usuario.create({ nombre, email, password, rol: rolFinal });

    return respuestaExito(
      res,
      { id: usuario._id, nombre, email, rol: rolFinal },
      "Usuario registrado correctamente.",
      201
    );
  } catch (err) {
    console.error(err);
    return respuestaError(res, err.message || "Error al registrar el usuario.");
  }
};

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return respuestaError(res, "Email y contraseña son requeridos.", 400);

    const usuario = await Usuario.findOne({ email }).select("+password");
    if (!usuario)
      return respuestaError(res, "Credenciales incorrectas.", 401);

    if (!usuario.activo)
      return respuestaError(res, "Cuenta desactivada. Contacta al administrador.", 403);

    const passwordValida = await usuario.compararPassword(password);
    if (!passwordValida)
      return respuestaError(res, "Credenciales incorrectas.", 401);

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    return respuestaExito(res, {
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    }, "Sesión iniciada correctamente.");
  } catch (err) {
    console.error(err);
    return respuestaError(res, "Error al iniciar sesión.");
  }
};

// ─── GET /api/auth/perfil ─────────────────────────────────────────────────────
const perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario) return respuestaError(res, "Usuario no encontrado.", 404);
    return respuestaExito(res, usuario, "Perfil obtenido correctamente.");
  } catch (err) {
    console.error(err);
    return respuestaError(res, "Error al obtener el perfil.");
  }
};

module.exports = { registro, login, perfil };
