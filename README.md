# AZ Inmobiliaria

**AZ Inmobiliaria** es una aplicación web de inmobiliaria moderna construida con Next.js 16, Prisma, BetterAuth y ShadCN/UI. Los usuarios pueden explorar propiedades, publicar anuncios y gestionar sus listados desde un dashboard. La información de la empresa (nombre, contacto, redes, meta) es configurable desde un único JSON o desde el panel de administración.

---

## ✨ Características

- 🔐 Autenticación con BetterAuth (email/contraseña)
- 🌐 Internacionalización (español e inglés) con next-intl
- 🏡 Explorar propiedades con búsqueda y filtros
- 📝 Añadir y editar listados con imágenes, precio, ubicación y detalles
- 📸 Subida de imágenes con ImageKit
- 🗂️ Gestionar tus propios anuncios (editar/eliminar)
- ⚙️ Configuración de la empresa desde el dashboard (nombre, contacto, redes, SEO)
- 💅 Interfaz con ShadCN/UI y Tailwind CSS
- 📱 Diseño responsive

---

## 📦 Stack técnico

- **Next.js 16**
- **Tailwind CSS**
- **ShadCN/UI**
- **TypeScript**
- **Prisma ORM**
- **BetterAuth**
- **next-intl** (i18n)
- **ImageKit** (subida de imágenes)

---

## 🛠 Configuración del proyecto (paso a paso)

### 1. Clonar el repositorio

```bash
git clone https://github.com/cajimenez96/az-inmobiliaria.git
cd az-inmobiliaria
```

### 2. Instalar dependencias

```bash
npm install
# o
bun install
```

### 3. Variables de entorno

Copia `.env.example` a `.env` en la raíz y rellena los valores:

```env
# Base de datos (PostgreSQL)
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBRE_BD"

# BetterAuth
BETTER_AUTH_BASE_URL="http://localhost:3000"
BETTER_AUTH_SECRET="un_secreto_largo_y_aleatorio"

# Seed: usuario admin (opcional; por defecto admin@example.com / Admin123!)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="Admin123!"
ADMIN_NAME="Admin"

# ImageKit (subida de imágenes)
IMAGEKIT_PUBLIC_KEY=""
IMAGEKIT_PRIVATE_KEY=""
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/tu_id"
```

- **DATABASE_URL:** Conexión a PostgreSQL. El scheme debe ser `postgresql://`. Si la contraseña tiene caracteres especiales, codifícalos en URL (ej. `@` → `%40`).
- **BETTER_AUTH_BASE_URL:** En local, `http://localhost:3000`; en producción, la URL pública de la app.
- **BETTER_AUTH_SECRET:** Secreto para sesiones (ej. `openssl rand -base64 32`).
- **ADMIN_***:** Usado por el seed para crear el usuario administrativo.
- **ImageKit:** Credenciales en [imagekit.io](https://imagekit.io/dashboard).

### 4. Crear la base de datos

Crea una base de datos vacía en PostgreSQL (Prisma no la crea por ti). Por ejemplo:

```bash
createdb az_inmobiliaria
# o desde psql: CREATE DATABASE az_inmobiliaria;
```

### 5. Migraciones y tablas

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Con esto se generan el cliente de Prisma y las tablas en la BD.

### 6. (Opcional) Seed: usuario admin y datos de la empresa

```bash
npm run db:seed
```

El seed inserta los datos de `config/company.json` en la BD (si no existen) y crea un usuario con rol AGENT. Por defecto podrás iniciar sesión con `admin@example.com` / `Admin123!` y acceder al dashboard.

### 7. Arrancar en desarrollo

```bash
npm run dev
# o
bun run dev
```

La app queda en **http://localhost:3000**. Las rutas con idioma son `/es/...` y `/en/...`.

---

## 📜 Scripts útiles

| Comando | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run db:generate` | Generar cliente Prisma |
| `npm run db:migrate` | Aplicar migraciones (dev) |
| `npm run db:seed` | Ejecutar seed (admin + company config) |
| `npm run db:reset` | Resetear BD y volver a aplicar migraciones (y seed si está configurado) |
| `npm run db:studio` | Abrir Prisma Studio |

---

## 📚 Documentación

- [Setup y configuración](docs/setup.md) — Requisitos, variables de entorno, base de datos, seed.
- [Configuración de la empresa](docs/company-config.md) — Estructura de `config/company.json` y rebrand.

---

## 💼 Contribución

Las contribuciones son bienvenidas. Haz fork del repo, crea una rama y envía un pull request.
