const Contacto = require("../models/Contacto");
const { respuestaExito, respuestaError } = require("../utils/respuesta");

// POST /api/contacto
const crear = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message)
      return respuestaError(res, "Nombre, email y mensaje son requeridos.", 400);
    const contacto = await Contacto.create({ name, email, phone, subject, message });
    return respuestaExito(res, contacto, "Mensaje recibido correctamente.", 201);
  } catch (err) {
    return respuestaError(res, "Error al guardar el mensaje.");
  }
};

// GET /api/contacto  (solo admin)
const listar = async (req, res) => {
  try {
    const mensajes = await Contacto.find().sort({ createdAt: -1 });
    return respuestaExito(res, mensajes, `${mensajes.length} mensaje(s) encontrado(s).`);
  } catch (err) {
    return respuestaError(res, "Error al obtener los mensajes.");
  }
};

// PUT /api/contacto/:id/leido  (marcar como leído)
const marcarLeido = async (req, res) => {
  try {
    const msg = await Contacto.findByIdAndUpdate(
      req.params.id, { leido: true }, { new: true }
    );
    if (!msg) return respuestaError(res, "Mensaje no encontrado.", 404);
    return respuestaExito(res, msg, "Mensaje marcado como leído.");
  } catch (err) {
    return respuestaError(res, "Error al actualizar el mensaje.");
  }
};

// DELETE /api/contacto/:id
const eliminar = async (req, res) => {
  try {
    const msg = await Contacto.findByIdAndDelete(req.params.id);
    if (!msg) return respuestaError(res, "Mensaje no encontrado.", 404);
    return respuestaExito(res, { id: req.params.id }, "Mensaje eliminado.");
  } catch (err) {
    return respuestaError(res, "Error al eliminar el mensaje.");
  }
};

module.exports = { crear, listar, marcarLeido, eliminar };
