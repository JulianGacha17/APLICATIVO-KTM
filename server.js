require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { conectarDB } = require("./config/database");
const bcrypt = require("bcryptjs");

const authRoutes     = require("./routes/authRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const productosRoutes = require("./routes/productosRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Conectar MongoDB y sembrar datos iniciales ────────────────────────────────
conectarDB().then(async () => {
  const Usuario  = require("./models/Usuario");
  const Producto = require("./models/Producto");

  // Admin por defecto
  const adminExiste = await Usuario.findOne({ email: "admin@ktmcolombia.com" });
  if (!adminExiste) {
    await Usuario.create({
      nombre: "Administrador KTM",
      email: "admin@ktmcolombia.com",
      password: "Admin123!",
      rol: "admin",
    });
    console.log("👤 Admin creado: admin@ktmcolombia.com / Admin123!");
  }

  // Productos iniciales
  const total = await Producto.countDocuments();
  if (total === 0) {
    await Producto.insertMany([
      { nombre: "KTM 200 Duke",            categoria: "Naked",     precio: 15900000, potencia: "25 HP",  stock: 5 },
      { nombre: "KTM 390 Duke",            categoria: "Naked",     precio: 23500000, potencia: "44 HP",  stock: 4 },
      { nombre: "KTM 890 Duke",            categoria: "Naked",     precio: 52900000, potencia: "115 HP", stock: 3 },
      { nombre: "KTM RC 390",              categoria: "Deportiva", precio: 25900000, potencia: "44 HP",  stock: 4 },
      { nombre: "KTM 790 Adventure",       categoria: "Adventure", precio: 48900000, potencia: "95 HP",  stock: 2 },
      { nombre: "KTM 1290 Super Adventure",categoria: "Adventure", precio: 95900000, potencia: "160 HP", stock: 2 },
      { nombre: "KTM 690 SMC R",           categoria: "Supermoto", precio: 42900000, potencia: "74 HP",  stock: 3 },
      { nombre: "KTM 1290 Super Duke R",   categoria: "Naked",     precio: 89900000, potencia: "180 HP", stock: 2 },
      { nombre: "Mantenimiento KTM",       categoria: "Servicio",  precio: 350000,   stock: 999 },
      { nombre: "Garantía Extendida KTM",  categoria: "Servicio",  precio: 800000,   stock: 999 },
    ]);
    console.log("🏍️  Productos iniciales cargados");
  }
});

// ── Documentación ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    proyecto: "KTM Colombia API",
    evidencia: "GA4-220501096-AA1-EV01",
    version: "1.0.0",
    baseDeDatos: "MongoDB Atlas",
    endpoints: {
      autenticacion: {
        "POST /api/auth/registro": "Registrar usuario",
        "POST /api/auth/login":    "Iniciar sesión (retorna JWT)",
        "GET  /api/auth/perfil":   "Ver perfil (requiere token)",
      },
      usuarios: {
        "GET    /api/usuarios":     "Listar usuarios (admin)",
        "GET    /api/usuarios/:id": "Obtener usuario por ID (admin)",
        "POST   /api/usuarios":     "Crear usuario (admin)",
        "PUT    /api/usuarios/:id": "Actualizar usuario (admin)",
        "DELETE /api/usuarios/:id": "Eliminar usuario (admin)",
      },
      productos: {
        "GET    /api/productos":     "Listar productos (público)",
        "GET    /api/productos/:id": "Obtener producto por ID (público)",
        "POST   /api/productos":     "Crear producto (admin)",
        "PUT    /api/productos/:id": "Actualizar producto (admin)",
        "DELETE /api/productos/:id": "Eliminar producto (admin)",
      },
    },
    credenciales_demo: {
      email: "admin@ktmcolombia.com",
      password: "Admin123!",
    },
  });
});

app.use("/api/auth",      authRoutes);
app.use("/api/usuarios",  usuariosRoutes);
app.use("/api/productos", productosRoutes);

app.use((req, res) => {
  res.status(404).json({ exito: false, mensaje: "Ruta no encontrada." });
});

app.listen(PORT, () => {
  console.log(`\n🏍️  KTM Colombia API — GA4-220501096-AA1-EV01`);
  console.log(`🚀  Servidor en http://localhost:${PORT}`);
  console.log(`📄  Docs en    http://localhost:${PORT}/\n`);
});
