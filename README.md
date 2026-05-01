# KTM Colombia – API REST
**Evidencia:** GA4-220501096-AA1-EV01  
**Tecnologías:** Node.js · Express · SQLite · JWT · bcryptjs

---

## Instalación

```bash
npm install
npm run dev     # Desarrollo (nodemon)
npm start       # Producción
```

Servidor disponible en: `http://localhost:3000`

---

## Base de datos (SQLite)

Se crea automáticamente en `./database/ktm_colombia.db` con dos tablas:

### Tabla `usuarios`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER PK | Auto-incremental |
| nombre | TEXT | Nombre completo |
| email | TEXT UNIQUE | Correo electrónico |
| password | TEXT | Hash bcrypt |
| rol | TEXT | `admin` o `cliente` |
| activo | INTEGER | 1=activo, 0=inactivo |
| creado_en | DATETIME | Fecha de creación |
| actualizado_en | DATETIME | Última actualización |

### Tabla `productos`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER PK | Auto-incremental |
| nombre | TEXT | Nombre del producto |
| descripcion | TEXT | Descripción |
| categoria | TEXT | Naked/Deportiva/Adventure/Supermoto/Servicio |
| precio | REAL | Precio en pesos COP |
| potencia | TEXT | Ej: "44 HP" |
| imagen_url | TEXT | URL de la imagen |
| stock | INTEGER | Unidades disponibles |
| activo | INTEGER | 1=activo, 0=inactivo |

---

## Credenciales iniciales (admin)
```
Email:    admin@ktmcolombia.com
Password: Admin123!
```

---

## Endpoints

### Autenticación

#### `POST /api/auth/registro`
Registra un nuevo usuario.

**Body (JSON):**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "password": "mipass123"
}
```

**Respuesta exitosa (201):**
```json
{
  "exito": true,
  "mensaje": "Usuario registrado correctamente.",
  "datos": { "id": 2, "nombre": "Juan Pérez", "email": "juan@email.com", "rol": "cliente" }
}
```

---

#### `POST /api/auth/login`
Inicia sesión y retorna el token JWT.

**Body (JSON):**
```json
{
  "email": "admin@ktmcolombia.com",
  "password": "Admin123!"
}
```

**Respuesta exitosa (200):**
```json
{
  "exito": true,
  "mensaje": "Sesión iniciada correctamente.",
  "datos": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": { "id": 1, "nombre": "Administrador KTM", "email": "admin@ktmcolombia.com", "rol": "admin" }
  }
}
```

---

#### `GET /api/auth/perfil`
Retorna el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

---

### Usuarios (requieren token de admin)

**Header requerido en todas:**
```
Authorization: Bearer <token_admin>
```

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/usuarios` | Listar todos |
| GET | `/api/usuarios/:id` | Obtener por ID |
| POST | `/api/usuarios` | Crear usuario |
| PUT | `/api/usuarios/:id` | Actualizar usuario |
| DELETE | `/api/usuarios/:id` | Eliminar usuario |

**Ejemplo PUT `/api/usuarios/2`:**
```json
{
  "nombre": "Juan Actualizado",
  "activo": false
}
```

---

### Productos

Los métodos GET son públicos. POST, PUT y DELETE requieren token de admin.

| Método | Ruta | Acceso |
|--------|------|--------|
| GET | `/api/productos` | Público |
| GET | `/api/productos/:id` | Público |
| POST | `/api/productos` | Admin |
| PUT | `/api/productos/:id` | Admin |
| DELETE | `/api/productos/:id` | Admin |

**Filtros disponibles (GET `/api/productos`):**
- `?categoria=Naked`
- `?busqueda=duke`
- `?activo=true`

**Ejemplo POST `/api/productos`:**
```json
{
  "nombre": "KTM 500 EXC-F",
  "descripcion": "Enduro de alta competencia",
  "categoria": "Adventure",
  "precio": 38500000,
  "potencia": "63 HP",
  "stock": 3
}
```

---

## Formato de respuesta

Todas las respuestas siguen el mismo formato JSON:

```json
{
  "exito": true | false,
  "mensaje": "Descripción del resultado",
  "datos": { ... }
}
```

---

## Testing con Postman / Insomnia

1. Importar las colecciones de la carpeta `/postman/`
2. Ejecutar primero `POST /api/auth/login` con las credenciales demo
3. Copiar el token retornado
4. En las demás solicitudes, agregar header: `Authorization: Bearer <token>`

---

## Estructura del proyecto

```
ktm-api/
├── server.js                  # Entrada del servidor Express
├── .env                       # Variables de entorno
├── package.json
├── config/
│   └── database.js            # Conexión y creación de tablas SQLite
├── controllers/
│   ├── authController.js      # Registro, login, perfil
│   ├── usuariosController.js  # CRUD usuarios
│   └── productosController.js # CRUD productos
├── middleware/
│   └── auth.js                # Verificación JWT y rol admin
├── models/
│   ├── Usuario.js             # Modelo de usuario (POO)
│   └── Producto.js            # Modelo de producto (POO)
├── routes/
│   ├── authRoutes.js
│   ├── usuariosRoutes.js
│   └── productosRoutes.js
└── utils/
    └── respuesta.js           # Helper de respuestas JSON estandarizadas
```
