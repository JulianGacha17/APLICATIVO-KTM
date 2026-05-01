require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// ── Esquemas ──────────────────────────────────────────────────────────────────
const usuarioSchema = new mongoose.Schema({
  nombre:   { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol:      { type: String, enum: ["admin", "cliente"], default: "cliente" },
  activo:   { type: Boolean, default: true },
}, { timestamps: true });

const productoSchema = new mongoose.Schema({
  nombre:      { type: String, required: true },
  descripcion: String,
  categoria:   { type: String, enum: ["Naked","Deportiva","Adventure","Supermoto","Servicio"], required: true },
  precio:      { type: Number, required: true },
  potencia:    String,
  imagen_url:  String,
  stock:       { type: Number, default: 0 },
  activo:      { type: Boolean, default: true },
}, { timestamps: true });

const pedidoSchema = new mongoose.Schema({
  usuario:   { type: mongoose.Schema.Types.ObjectId, ref: "Usuario",  required: true },
  producto:  { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
  cantidad:  { type: Number, required: true, min: 1 },
  total:     { type: Number, required: true },
  estado:    { type: String, enum: ["pendiente","confirmado","entregado","cancelado"], default: "pendiente" },
  direccion: { type: String, required: true },
}, { timestamps: true });

const resenaSchema = new mongoose.Schema({
  usuario:      { type: mongoose.Schema.Types.ObjectId, ref: "Usuario",  required: true },
  producto:     { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
  calificacion: { type: Number, required: true, min: 1, max: 5 },
  comentario:   String,
}, { timestamps: true });

const categoriaSchema = new mongoose.Schema({
  nombre:      { type: String, required: true, unique: true },
  descripcion: String,
  activo:      { type: Boolean, default: true },
}, { timestamps: true });

// ── Modelos ───────────────────────────────────────────────────────────────────
const Usuario   = mongoose.model("Usuario",   usuarioSchema);
const Producto  = mongoose.model("Producto",  productoSchema);
const Pedido    = mongoose.model("Pedido",    pedidoSchema);
const Resena    = mongoose.model("Resena",    resenaSchema);
const Categoria = mongoose.model("Categoria", categoriaSchema);

// ── Datos a insertar ──────────────────────────────────────────────────────────

const usuariosData = [
  {
    nombre:   "Administrador KTM",
    email:    "admin@ktmcolombia.com",
    password: bcrypt.hashSync("Admin123!", 10),
    rol:      "admin",
  },
  {
    nombre:   "Carlos Rodríguez",
    email:    "carlos@email.com",
    password: bcrypt.hashSync("pass1234", 10),
    rol:      "cliente",
  },
  {
    nombre:   "María López",
    email:    "maria@email.com",
    password: bcrypt.hashSync("pass1234", 10),
    rol:      "cliente",
  },
  {
    nombre:   "Andrés Martínez",
    email:    "andres@email.com",
    password: bcrypt.hashSync("pass1234", 10),
    rol:      "cliente",
  },
  {
    nombre:   "Sofía Gómez",
    email:    "sofia@email.com",
    password: bcrypt.hashSync("pass1234", 10),
    rol:      "cliente",
  },
  {
    nombre:   "Juan Pérez",
    email:    "juan@email.com",
    password: bcrypt.hashSync("pass1234", 10),
    rol:      "cliente",
  },
];

const productosData = [
  {
    nombre:      "KTM 200 Duke",
    descripcion: "Naked de entrada perfecta para ciudad, ágil y liviana",
    categoria:   "Naked",
    precio:      15900000,
    potencia:    "25 HP",
    stock:       5,
    imagen_url:  "https://images.unsplash.com/photo-1670012300918-6e0dda76af1a?w=600",
  },
  {
    nombre:      "KTM 390 Duke",
    descripcion: "Naked deportiva con gran rendimiento urbano y DNA de carrera",
    categoria:   "Naked",
    precio:      23500000,
    potencia:    "44 HP",
    stock:       4,
    imagen_url:  "https://images.unsplash.com/photo-1670012300918-6e0dda76af1a?w=600",
  },
  {
    nombre:      "KTM 890 Duke",
    descripcion: "Naked de mediana cilindrada con carácter y tecnología premium",
    categoria:   "Naked",
    precio:      52900000,
    potencia:    "115 HP",
    stock:       3,
    imagen_url:  "https://images.unsplash.com/photo-1740815538720-1e31f996b69f?w=600",
  },
  {
    nombre:      "KTM 1290 Super Duke R",
    descripcion: "La bestia naked más potente de KTM, 180 HP de pura adrenalina",
    categoria:   "Naked",
    precio:      89900000,
    potencia:    "180 HP",
    stock:       2,
    imagen_url:  "https://images.unsplash.com/photo-1740815538720-1e31f996b69f?w=600",
  },
  {
    nombre:      "KTM RC 390",
    descripcion: "Deportiva de pista accesible, aerodinámica y muy ágil",
    categoria:   "Deportiva",
    precio:      25900000,
    potencia:    "44 HP",
    stock:       4,
    imagen_url:  "https://images.unsplash.com/photo-1586708594147-e9c0d72f0c83?w=600",
  },
  {
    nombre:      "KTM RC 8C",
    descripcion: "Supersportiva de edición limitada para pista pura",
    categoria:   "Deportiva",
    precio:      145000000,
    potencia:    "130 HP",
    stock:       1,
    imagen_url:  "https://images.unsplash.com/photo-1586708594147-e9c0d72f0c83?w=600",
  },
  {
    nombre:      "KTM 790 Adventure",
    descripcion: "Adventure versátil para ruta y campo, equilibrio perfecto",
    categoria:   "Adventure",
    precio:      48900000,
    potencia:    "95 HP",
    stock:       2,
    imagen_url:  "https://images.unsplash.com/photo-1767116515980-3e260038ab2e?w=600",
  },
  {
    nombre:      "KTM 890 Adventure",
    descripcion: "Adventure de alto rendimiento con electrónica avanzada",
    categoria:   "Adventure",
    precio:      58900000,
    potencia:    "105 HP",
    stock:       3,
    imagen_url:  "https://images.unsplash.com/photo-1767116515980-3e260038ab2e?w=600",
  },
  {
    nombre:      "KTM 1290 Super Adventure",
    descripcion: "La más potente y tecnológica de KTM para largas distancias",
    categoria:   "Adventure",
    precio:      95900000,
    potencia:    "160 HP",
    stock:       2,
    imagen_url:  "https://images.unsplash.com/photo-1767116515980-3e260038ab2e?w=600",
  },
  {
    nombre:      "KTM 690 SMC R",
    descripcion: "Supermoto de alta cilindrada para dominar la pista urbana",
    categoria:   "Supermoto",
    precio:      42900000,
    potencia:    "74 HP",
    stock:       3,
    imagen_url:  "https://images.unsplash.com/photo-1721287164023-5d43daa06bc2?w=600",
  },
  {
    nombre:      "Mantenimiento KTM",
    descripcion: "Servicio de mantenimiento preventivo oficial certificado KTM",
    categoria:   "Servicio",
    precio:      350000,
    stock:       999,
  },
  {
    nombre:      "Reparación Especializada",
    descripcion: "Diagnóstico y reparación con técnicos certificados KTM",
    categoria:   "Servicio",
    precio:      500000,
    stock:       999,
  },
  {
    nombre:      "Garantía Extendida KTM",
    descripcion: "Cobertura extendida hasta 5 años con asistencia en carretera 24/7",
    categoria:   "Servicio",
    precio:      800000,
    stock:       999,
  },
  {
    nombre:      "Instalación Accesorios",
    descripcion: "Instalación de accesorios originales KTM PowerParts",
    categoria:   "Servicio",
    precio:      200000,
    stock:       999,
  },
];

const categoriasData = [
  {
    nombre:      "Naked",
    descripcion: "Motos sin carenado, diseño agresivo y DNA de carrera",
  },
  {
    nombre:      "Deportiva",
    descripcion: "Motos carenadas de alto rendimiento para pista y ruta",
  },
  {
    nombre:      "Adventure",
    descripcion: "Motos polivalentes para viajes de larga distancia y off-road",
  },
  {
    nombre:      "Supermoto",
    descripcion: "Motos de campo adaptadas para asfalto con gran agilidad",
  },
  {
    nombre:      "Servicio",
    descripcion: "Servicios de taller, mantenimiento y garantías oficiales KTM",
  },
];

// ── Ejecutar seed ─────────────────────────────────────────────────────────────
const ejecutarSeed = async () => {
  try {
    console.log("🔌 Conectando a MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a:", mongoose.connection.host);

    // Limpiar colecciones existentes
    console.log("\n🗑️  Limpiando colecciones anteriores...");
    await Promise.all([
      Usuario.deleteMany({}),
      Producto.deleteMany({}),
      Pedido.deleteMany({}),
      Resena.deleteMany({}),
      Categoria.deleteMany({}),
    ]);
    console.log("✅ Colecciones limpias");

    // ── INSERT Categorías ────────────────────────────────────────────────────
    console.log("\n📂 Insertando categorías...");
    const categorias = await Categoria.insertMany(categoriasData);
    console.log(`✅ ${categorias.length} categorías insertadas:`);
    categorias.forEach(c => console.log(`   • ${c.nombre}`));

    // ── INSERT Usuarios ──────────────────────────────────────────────────────
    console.log("\n👥 Insertando usuarios...");
    const usuarios = await Usuario.insertMany(usuariosData);
    console.log(`✅ ${usuarios.length} usuarios insertados:`);
    usuarios.forEach(u => console.log(`   • ${u.nombre} (${u.rol}) → ${u.email}`));

    // ── INSERT Productos ─────────────────────────────────────────────────────
    console.log("\n🏍️  Insertando productos...");
    const productos = await Producto.insertMany(productosData);
    console.log(`✅ ${productos.length} productos insertados:`);
    productos.forEach(p =>
      console.log(`   • [${p.categoria}] ${p.nombre} — $${p.precio.toLocaleString("es-CO")} | Stock: ${p.stock}`)
    );

    // ── INSERT Pedidos ───────────────────────────────────────────────────────
    console.log("\n📦 Insertando pedidos...");
    const pedidosData = [
      {
        usuario:   usuarios[1]._id,
        producto:  productos[0]._id,
        cantidad:  1,
        total:     productos[0].precio,
        estado:    "confirmado",
        direccion: "Calle 45 #23-10, Bogotá",
      },
      {
        usuario:   usuarios[2]._id,
        producto:  productos[4]._id,
        cantidad:  1,
        total:     productos[4].precio,
        estado:    "pendiente",
        direccion: "Carrera 7 #80-15, Medellín",
      },
      {
        usuario:   usuarios[3]._id,
        producto:  productos[6]._id,
        cantidad:  1,
        total:     productos[6].precio,
        estado:    "entregado",
        direccion: "Av. El Dorado #68-95, Bogotá",
      },
      {
        usuario:   usuarios[4]._id,
        producto:  productos[10]._id,
        cantidad:  2,
        total:     productos[10].precio * 2,
        estado:    "confirmado",
        direccion: "Calle 100 #15-20, Cali",
      },
      {
        usuario:   usuarios[5]._id,
        producto:  productos[2]._id,
        cantidad:  1,
        total:     productos[2].precio,
        estado:    "pendiente",
        direccion: "Carrera 50 #40-30, Barranquilla",
      },
      {
        usuario:   usuarios[1]._id,
        producto:  productos[8]._id,
        cantidad:  1,
        total:     productos[8].precio,
        estado:    "cancelado",
        direccion: "Calle 45 #23-10, Bogotá",
      },
    ];
    const pedidos = await Pedido.insertMany(pedidosData);
    console.log(`✅ ${pedidos.length} pedidos insertados:`);
    pedidos.forEach(p =>
      console.log(`   • Estado: ${p.estado.padEnd(12)} | Total: $${p.total.toLocaleString("es-CO")}`)
    );

    // ── INSERT Reseñas ───────────────────────────────────────────────────────
    console.log("\n⭐ Insertando reseñas...");
    const resenasData = [
      {
        usuario:      usuarios[1]._id,
        producto:     productos[0]._id,
        calificacion: 5,
        comentario:   "Excelente moto para empezar, muy ágil en ciudad",
      },
      {
        usuario:      usuarios[2]._id,
        producto:     productos[4]._id,
        calificacion: 5,
        comentario:   "La RC 390 es increíble en pista, muy precisa y obediente",
      },
      {
        usuario:      usuarios[3]._id,
        producto:     productos[6]._id,
        calificacion: 4,
        comentario:   "La 790 Adventure es perfecta para viajes largos por Colombia",
      },
      {
        usuario:      usuarios[4]._id,
        producto:     productos[1]._id,
        calificacion: 5,
        comentario:   "La 390 Duke superó todas mis expectativas, muy recomendada",
      },
      {
        usuario:      usuarios[5]._id,
        producto:     productos[2]._id,
        calificacion: 4,
        comentario:   "La 890 Duke tiene un sonido brutal y mucha potencia disponible",
      },
      {
        usuario:      usuarios[1]._id,
        producto:     productos[10]._id,
        calificacion: 5,
        comentario:   "Excelente servicio técnico, muy profesionales y puntuales",
      },
    ];
    const resenas = await Resena.insertMany(resenasData);
    console.log(`✅ ${resenas.length} reseñas insertadas:`);
    resenas.forEach(r =>
      console.log(`   • ${"⭐".repeat(r.calificacion)} — "${r.comentario.substring(0, 45)}..."`)
    );

    // ── Resumen ──────────────────────────────────────────────────────────────
    console.log("\n╔══════════════════════════════════════════╗");
    console.log("║     ✅ SEED COMPLETADO EXITOSAMENTE      ║");
    console.log("╠══════════════════════════════════════════╣");
    console.log(`║  📂 Categorías  : ${String(categorias.length).padEnd(24)}║`);
    console.log(`║  👥 Usuarios    : ${String(usuarios.length).padEnd(24)}║`);
    console.log(`║  🏍️  Productos   : ${String(productos.length).padEnd(24)}║`);
    console.log(`║  📦 Pedidos     : ${String(pedidos.length).padEnd(24)}║`);
    console.log(`║  ⭐ Reseñas     : ${String(resenas.length).padEnd(24)}║`);
    console.log("╠══════════════════════════════════════════╣");
    console.log("║  Login admin:                            ║");
    console.log("║  admin@ktmcolombia.com / Admin123!       ║");
    console.log("╚══════════════════════════════════════════╝\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Error en el seed:", err.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

ejecutarSeed();
