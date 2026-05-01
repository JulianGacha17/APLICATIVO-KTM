const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { respuestaExito, respuestaError } = require("../utils/respuesta");

// GET /api/usuarios
const listar = async (req, res) => {
  try {
    const usuarios = await Usuario.find().sort({ createdAt: -1 });
    return respuestaExito(res, usuarios, `${usuarios.length} usuario(s) encontrado(s).`);
  } catch (err) {
    return respuestaError(res, "Error al obtener los usuarios.");
  }
};

// GET /api/usuarios/:id
const obtener = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return respuestaError(res, "Usuario no encontrado.", 404);
    return respuestaExito(res, usuario, "Usuario obtenido correctamente.");
  } catch (err) {
    return respuestaError(res, "Error al obtener el usuario.");
  }
};

// POST /api/usuarios
const crear = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password)
      return respuestaError(res, "Nombre, email y contraseña son requeridos.", 400);

    const existe = await Usuario.findOne({ email });
    if (existe) return respuestaError(res, "El email ya está registrado.", 409);

    const usuario = await Usuario.create({
      nombre,
      email,
      password,
      rol: rol === "admin" ? "admin" : "cliente",
    });

    return respuestaExito(res, usuario, "Usuario creado correctamente.", 201);
  } catch (err) {
    return respuestaError(res, err.message || "Error al crear el usuario.");
  }
};

// PUT /api/usuarios/:id
const actualizar = async (req, res) => {
  try {
    const { nombre, email, password, rol, activo } = req.body;

    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return respuestaError(res, "Usuario no encontrado.", 404);

    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (password) usuario.password = password; // el pre-save hace el hash
    if (rol) usuario.rol = rol;
    if (activo !== undefined) usuario.activo = activo;

    await usuario.save();

    return respuestaExito(res, usuario, "Usuario actualizado correctamente.");
  } catch (err) {
    return respuestaError(res, err.message || "Error al actualizar el usuario.");
  }
};

// DELETE /api/usuarios/:id
const eliminar = async (req, res) => {
  try {
    if (req.usuario.id === req.params.id)
      return respuestaError(res, "No puedes eliminar tu propia cuenta.", 400);

    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return respuestaError(res, "Usuario no encontrado.", 404);

    return respuestaExito(res, { id: req.params.id }, "Usuario eliminado correctamente.");
  } catch (err) {
    return respuestaError(res, "Error al eliminar el usuario.");
  }
};

module.exports = { listar, obtener, crear, actualizar, eliminar };
