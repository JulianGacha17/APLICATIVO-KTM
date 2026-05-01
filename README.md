# APLICATIVO-KTM

Aplicación web Full Stack desarrollada para la gestión integral de una tienda de motocicletas KTM en Colombia.
El sistema permite administrar usuarios, productos, pedidos y solicitudes de contacto mediante una API REST segura, implementando autenticación basada en tokens.

🎯 Objetivo del Proyecto

Diseñar e implementar una solución web que facilite la administración de una tienda KTM, optimizando procesos como:

Gestión de clientes y administradores
Administración de catálogo de motocicletas y servicios
Control de pedidos
Recepción y seguimiento de mensajes de contacto
Acceso seguro mediante autenticación
🛠️ Tecnologías Utilizadas
Capa	Tecnología
Backend	Node.js + Express
Base de Datos	MongoDB Atlas
Autenticación	JWT + bcryptjs
Frontend	Express + Handlebars
Control de Versiones	Git + GitHub
Testing API	Thunder Client (VS Code)
🧩 Arquitectura del Sistema

El proyecto está dividido en dos módulos principales:

🔹 Backend (API REST)

Encargado de la lógica de negocio, seguridad y acceso a datos.

🔹 Frontend

Encargado de la interfaz de usuario y consumo de la API.

📁 Estructura del Proyecto
APLICATIVO-KTM/
│
├── KTM-API/                # Backend - API REST
│   ├── server.js
│   ├── config/             # Configuración de MongoDB
│   ├── models/             # Modelos de datos
│   ├── controllers/        # Lógica de negocio
│   ├── routes/             # Definición de endpoints
│   ├── middleware/         # Seguridad (JWT)
│   └── database/           # Datos iniciales (seed)
│
└── Frontend_KTM/           # Aplicación Web
    ├── server.js
    ├── routes/             # Rutas del sitio
    ├── views/              # Plantillas Handlebars
    │   └── admin/          # Panel administrativo
    ├── services/           # Consumo de la API
    └── public/             # Archivos estáticos
    
🔌 API REST – Endpoints Principales
🔐 Autenticación
Registro de usuarios
Inicio de sesión con generación de token JWT
Consulta de perfil autenticado
👤 Usuarios
CRUD completo de usuarios
Gestión de roles (cliente / administrador)
🏍️ Productos
Administración del catálogo de motocicletas
Creación, edición, consulta y eliminación
📩 Contacto
Envío de mensajes desde el sitio web
Gestión de mensajes en el panel administrativo
🗄️ Modelo de Base de Datos

El sistema utiliza MongoDB Atlas con las siguientes colecciones:

usuarios → Información de clientes y administradores
productos → Motocicletas y servicios KTM
categorias → Clasificación de productos
pedidos → Registro de compras
resenas → Valoraciones de productos
contactos → Mensajes enviados por usuarios
⚙️ Instalación y Ejecución
1️⃣ Clonar el repositorio
git clone https://github.com/JulianGacha17/APLICATIVO-KTM.git
2️⃣ Ejecutar Backend (API)
cd KTM-API
npm install
node server.js

📍 Disponible en: http://localhost:8080

3️⃣ Ejecutar Frontend
cd Frontend_KTM
npm install
node server.js

📍 Disponible en: http://localhost:3001

🔐 Credenciales de Acceso (Pruebas)
Email: admin@ktmcolombia.com
Contraseña: Admin123!
🌐 Rutas del Sistema
Ruta	Descripción
/	Página principal
/catalogo	Catálogo de motocicletas
/servicios	Servicios KTM
/contacto	Formulario de contacto
/login	Inicio de sesión
/admin	Panel administrativo
✨ Características Destacadas
✔ Arquitectura modular (Backend + Frontend)
✔ Autenticación segura con JWT
✔ Encriptación de contraseñas
✔ API REST estructurada
✔ Separación de responsabilidades (MVC)
✔ Panel administrativo funcional
