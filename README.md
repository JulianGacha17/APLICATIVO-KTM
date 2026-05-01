# 🏍️ APLICATIVO WEB KTM 

Aplicación web **Full Stack** orientada a la gestión integral de una tienda de motocicletas KTM en Colombia.  
El sistema permite administrar usuarios, productos, pedidos y solicitudes de contacto mediante una **API REST segura**, implementando autenticación con **JWT**.

---

## 🎯 Objetivo del Proyecto

Diseñar e implementar una solución web que permita:

- Gestión de clientes y administradores  
- Administración del catálogo de motocicletas y servicios  
- Control de pedidos  
- Recepción de mensajes de contacto  
- Acceso seguro mediante autenticación  

---

## 🛠️ Tecnologías Utilizadas

| Capa | Tecnología |
|------|-----------|
| Backend | Node.js + Express |
| Base de Datos | MongoDB Atlas |
| Autenticación | JWT + bcryptjs |
| Frontend | Express + Handlebars |
| Control de Versiones | Git + GitHub |
| Testing | Thunder Client |

---

## 🧩 Arquitectura del Sistema

El proyecto se divide en:

### 🔹 Backend (API REST)
Encargado de la lógica de negocio y seguridad.

### 🔹 Frontend
Encargado de la interfaz y consumo de la API.

---

## 📁 Estructura del Proyecto

```bash
APLICATIVO-KTM/
│
├── KTM-API/
│   ├── server.js
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── database/
│
└── Frontend_KTM/
    ├── server.js
    ├── routes/
    ├── views/
    │   └── admin/
    ├── services/
    └── public/
```
## 🔌 API REST

### 🔐 Autenticación
- `POST /api/auth/registro`
- `POST /api/auth/login`
- `GET /api/auth/perfil`

### 👤 Usuarios
- `GET /api/usuarios`
- `GET /api/usuarios/:id`
- `POST /api/usuarios`
- `PUT /api/usuarios/:id`
- `DELETE /api/usuarios/:id`

### 🏍️ Productos
- `GET /api/productos`
- `GET /api/productos/:id`
- `POST /api/productos`
- `PUT /api/productos/:id`
- `DELETE /api/productos/:id`

### 📩 Contacto
- `POST /api/contacto`
- `GET /api/contacto`
- `PUT /api/contacto/:id/leido`
- `DELETE /api/contacto/:id`

---

## 🗄️ Base de Datos

**Colecciones principales:**

- `usuarios`
- `productos`
- `categorias`
- `pedidos`
- `resenas`
- `contactos`

---

## ⚙️ Instalación

### 1️⃣ Clonar repositorio
```bash
git clone https://github.com/JulianGacha17/APLICATIVO-KTM.git
```
### Backend
```bash
cd KTM-API
npm install
node server.js
```

### Fronted
```bash
cd Frontend_KTM
npm install
node server.js
```

### Credenciales de prueba
```bash
Email: admin@ktmcolombia.com
Password: Admin123!
```
