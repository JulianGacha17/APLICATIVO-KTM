/**
 * Formatea respuestas JSON estandarizadas para toda la API
 */

const respuestaExito = (res, datos, mensaje = "Operación exitosa", codigo = 200) => {
  return res.status(codigo).json({
    exito: true,
    mensaje,
    datos,
  });
};

const respuestaError = (res, mensaje = "Error interno del servidor", codigo = 500, errores = null) => {
  const body = { exito: false, mensaje };
  if (errores) body.errores = errores;
  return res.status(codigo).json(body);
};

module.exports = { respuestaExito, respuestaError };
