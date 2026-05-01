const Producto = require("../models/Producto");
const { respuestaExito, respuestaError } = require("../utils/respuesta");

const CATEGORIAS = ["Naked", "Deportiva", "Adventure", "Supermoto", "Servicio"];

// GET /api/productos
const listar = async (req, res) => {
  try {
    const { categoria, activo, busqueda } = req.query;
    const filtro = {};

    if (categoria) filtro.categoria = categoria;
    if (activo !== undefined) filtro.activo = activo !== "false";
    if (busqueda) filtro.nombre = { $regex: busqueda, $options: "i" };

    const productos = await Producto.find(filtro).sort({ createdAt: -1 });
    return respuestaExito(res, productos, `${productos.length} producto(s) encontrado(s).`);
  } catch (err) {
    return respuestaError(res, "Error al obtener los productos.");
  }
};

// GET /api/productos/:id
const obtener = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return respuestaError(res, "Producto no encontrado.", 404);
    return respuestaExito(res, producto, "Producto obtenido correctamente.");
  } catch (err) {
    return respuestaError(res, "Error al obtener el producto.");
  }
};

// POST /api/productos
const crear = async (req, res) => {
  try {
    const { nombre, descripcion, categoria, precio, potencia, imagen_url, stock } = req.body;

    if (!nombre || !categoria || precio === undefined)
      return respuestaError(res, "Nombre, categoría y precio son requeridos.", 400);

    if (!CATEGORIAS.includes(categoria))
      return respuestaError(res, `Categoría inválida. Opciones: ${CATEGORIAS.join(", ")}`, 400);

    const producto = await Producto.create({
      nombre, descripcion, categoria,
      precio: Number(precio),
      potencia, imagen_url,
      stock: stock !== undefined ? Number(stock) : 0,
    });

    return respuestaExito(res, producto, "Producto creado correctamente.", 201);
  } catch (err) {
    return respuestaError(res, err.message || "Error al crear el producto.");
  }
};

// PUT /api/productos/:id
const actualizar = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return respuestaError(res, "Producto no encontrado.", 404);

    const campos = req.body;
    if (campos.categoria && !CATEGORIAS.includes(campos.categoria))
      return respuestaError(res, `Categoría inválida. Opciones: ${CATEGORIAS.join(", ")}`, 400);

    Object.assign(producto, campos);
    await producto.save();

    return respuestaExito(res, producto, "Producto actualizado correctamente.");
  } catch (err) {
    return respuestaError(res, err.message || "Error al actualizar el producto.");
  }
};

// DELETE /api/productos/:id
const eliminar = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return respuestaError(res, "Producto no encontrado.", 404);
    return respuestaExito(res, { id: req.params.id }, "Producto eliminado correctamente.");
  } catch (err) {
    return respuestaError(res, "Error al eliminar el producto.");
  }
};

module.exports = { listar, obtener, crear, actualizar, eliminar };
