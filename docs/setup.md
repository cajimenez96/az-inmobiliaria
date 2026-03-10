# Setup y configuración

## Requisitos

- Node.js (recomendado v20+)
- PostgreSQL (o URL de base de datos remota)
- Cuenta en [ImageKit](https://imagekit.io/) para subida de imágenes
- (Opcional) Bun — el proyecto puede usar `bun.lock`

## Instalación

```bash
# Clonar y entrar al proyecto
git clone <repo-url>
cd az-inmobiliaria

# Instalar dependencias (npm o bun)
npm install
# o
bun install
```

## Variables de entorno

Crear un archivo `.env` en la raíz (el proyecto tiene `.env*` en `.gitignore`). Ejemplo de variables necesarias:

```env
# Base de datos (Prisma + Accelerate si aplica)
DATABASE_URL="postgresql://usuario:password@host:puerto/nombre_db"

# BetterAuth
BETTER_AUTH_BASE_URL="http://localhost:3000"
BETTER_AUTH_SECRET="un_secreto_largo_y_aleatorio"

# ImageKit
IMAGEKIT_PUBLIC_KEY="tu_public_key"
IMAGEKIT_PRIVATE_KEY="tu_private_key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/tu_id"
```

- **DATABASE_URL:** Conexión a PostgreSQL. En producción puede ser la URL de Prisma Accelerate.
- **BETTER_AUTH_BASE_URL:** En desarrollo suele ser `http://localhost:3000`; en producción la URL pública de la app.
- **BETTER_AUTH_SECRET:** Secreto para firmar sesiones y tokens.
- **ImageKit:** Credenciales del dashboard de ImageKit para upload y URL endpoint.

No commitear `.env`. Usar `.env.example` como plantilla.

### Formato de `DATABASE_URL` (evitar error P1013)

- El **scheme** debe ser exactamente **`postgresql://`** (con "ql"), no `postgres://`.
- Sin espacios antes o después del `=`.
- Si la **contraseña** tiene caracteres especiales (`@`, `#`, `:`, `/`, `%`, etc.), hay que codificarlos en URL:
  - `@` → `%40`
  - `#` → `%23`
  - `:` → `%3A`
  - `/` → `%2F`
  - Ejemplo: contraseña `mi@pass#1` → `mi%40pass%231`

Formato correcto:
```env
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA_CODIFICADA@localhost:5432/NOMBRE_BD"
```

## Base de datos

**¿Se crea sola?** No. Tienes que **crear primero la base de datos vacía** en PostgreSQL. Prisma no crea el servidor ni la base de datos; solo crea las tablas dentro de una base de datos ya existente.

### 1. Crear la base de datos (una sola vez)

Puedes hacerlo desde **terminal**, desde **DBeaver** o desde otro cliente (pgAdmin, etc.).

#### Opción A: Con DBeaver

1. Abre DBeaver y conéctate a tu servidor PostgreSQL (si aún no tienes conexión: **Database → New Database Connection → PostgreSQL**; Host, Puerto, Usuario y Contraseña según tu instalación).
2. En el panel izquierdo, clic derecho sobre **PostgreSQL** (o sobre tu conexión).
3. Elige **Create → Database** (o **Nueva base de datos**).
4. En **Database name** escribe: `az_inmobiliaria`.
5. Deja el resto por defecto (Owner suele ser tu usuario de PostgreSQL; Encoding UTF8 está bien).
6. Pulsa **OK** (o **Finish**). La base de datos aparecerá bajo tu conexión.

Para más detalle, ver [Crear la base de datos con DBeaver](./dbeaver-crear-bd.md).

#### Opción B: Desde terminal

```bash
# Con createdb (nombre de BD y usuario según tu instalación)
createdb az_inmobiliaria

# O entrando a psql
psql -U postgres
CREATE DATABASE az_inmobiliaria;
\q
```

### 2. Generar cliente y tablas con Prisma

Con tu `.env` ya configurado (y `DATABASE_URL` apuntando a esa base de datos):

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear la primera migración y las tablas en la BD
npx prisma migrate dev --name init
```

A partir de aquí, las tablas (User, Account, Session, Property, etc.) quedarán creadas. En futuros cambios del schema, usa `npx prisma migrate dev` para nuevas migraciones.

### 3. (Opcional) Seed: usuario administrativo y datos de la empresa

```bash
npm run db:seed
# o
npx prisma db seed
```

El seed (`prisma/seed.ts`) solo hace dos cosas:

1. **Información de la empresa:** Si no existe ninguna fila en `company_config`, inserta los datos de **`config/company.json`** (nombre, contacto, redes, meta, etc.).
2. **Usuario administrativo:** Crea un usuario con rol AGENT (acceso al dashboard) y su cuenta email/contraseña. Usa las variables de entorno `ADMIN_EMAIL`, `ADMIN_PASSWORD` y `ADMIN_NAME` (ver `.env.example`). Por defecto: `admin@example.com` / `Admin123!` / `Admin`. Si ya existe un usuario con ese email, no se duplica.

Puedes iniciar sesión con ese email y contraseña y acceder al dashboard. Para usar otro admin, define en tu `.env`:

```env
ADMIN_EMAIL="tu@email.com"
ADMIN_PASSWORD="TuPasswordSegura"
ADMIN_NAME="Tu Nombre"
```

y ejecuta el seed de nuevo (solo creará el usuario si no existe ese email).

## Arranque

```bash
npm run dev
# o
bun run dev
```

La aplicación queda en `http://localhost:3000`.

## Build y producción

```bash
npm run build
npm run start
```

Comprobar que `DATABASE_URL` y `BETTER_AUTH_BASE_URL` en producción apunten a los valores correctos.
