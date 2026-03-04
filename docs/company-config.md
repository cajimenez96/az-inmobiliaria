# Configuración de empresa (company config)

La aplicación usa un único archivo de configuración para los datos de la empresa. Así se puede **rebrandear** la web para otra inmobiliaria cambiando solo ese archivo, sin tocar código ni traducciones.

## Archivo

- **Ruta:** `config/company.json`
- **Carga:** `getCompanyConfig()` en `lib/company.ts` (tipado con `CompanyConfig`)

## Estructura del JSON

| Sección   | Campos | Uso |
|-----------|--------|-----|
| **Raíz**  | `name`, `tagline`, `since`, `legalName` | Nombre de marca, eslogan, año "desde", nombre legal (footer ©). |
| **meta**  | `defaultTitle`, `titleTemplate`, `defaultDescription` | Título y descripción por defecto de la web (SEO / pestaña). |
| **contact** | `address`, `phone`, `phoneSchedule`, `email`, `emailSupport` | Página de contacto y datos de la empresa. |
| **social** | `twitterUrl`, `instagramUrl`, `facebookUrl` | Enlaces del footer (iconos de redes). |
| **stats**  | `listingsCount`, `soldCount`, `satisfactionPercent` | Cifras del bloque de estadísticas en la home (ej. "2,500+", "850+", "98%"). |

Ejemplo mínimo:

```json
{
  "name": "Mi Inmobiliaria",
  "tagline": "Tu hogar, nuestra misión",
  "since": "Desde 2020",
  "legalName": "Mi Inmobiliaria S.L.",
  "meta": {
    "defaultTitle": "Mi Inmobiliaria",
    "titleTemplate": "%s | {companyName}",
    "defaultDescription": "Plataforma inmobiliaria. Busca, publica y gestiona propiedades."
  },
  "contact": {
    "address": "Calle Principal 1, 28001 Madrid",
    "phone": "+34 912 345 678",
    "phoneSchedule": "Lun-Vie 9:00–18:00",
    "email": "hola@miinmobiliaria.com",
    "emailSupport": "soporte@miinmobiliaria.com"
  },
  "social": {
    "twitterUrl": "https://twitter.com/miinmobiliaria",
    "instagramUrl": "https://instagram.com/miinmobiliaria",
    "facebookUrl": "https://facebook.com/miinmobiliaria"
  },
  "stats": {
    "listingsCount": "1,200+",
    "soldCount": "400+",
    "satisfactionPercent": "99%"
  }
}
```

- `titleTemplate` usa el placeholder `{companyName}`; se sustituye por `name` al generar el título de la pestaña.

## Cómo rebrandear para otra empresa

1. Copiar `config/company.json` (o crearlo a partir del ejemplo anterior).
2. Sustituir todos los valores por los de la nueva empresa (nombre, contacto, redes, stats, meta).
3. No es necesario cambiar `messages/en.json` ni `messages/es.json` para el nombre ni los datos de contacto: la app inyecta `companyName` y el resto desde `getCompanyConfig()`.
4. Desplegar; la misma build sirve para cualquier empresa que use su propio `company.json`.

## Dónde se usa en la app

- **Layout raíz:** metadata (template de título, título y descripción por defecto).
- **Layout [locale]:** título y descripción por defecto.
- **Header:** nombre de la empresa (logo/texto).
- **Footer:** nombre legal (©), enlaces de redes desde `social.*`.
- **Home:** Hero (subtitle con `companyName`), Stats (cifras desde `stats`), Values (título con `companyName`).
- **About:** badge con `since`, título y misión con `companyName`.
- **Contact:** dirección, teléfono, horario, emails desde `contact.*`.
- **Auth (sign-in):** cita testimonial con `companyName`.
- **Dashboard:** nombre en sidebar y en cabecera móvil (`companyName` en "Agente {companyName}").

## ¿Por qué base de datos además del JSON?

- **`config/company.json`** sigue siendo la fuente por defecto: si no hay fila en la BD, la app usa este archivo (útil para rebrand por despliegue y para el seed).
- **La BD se usa** para que el formulario del dashboard (**Configuración web**) pueda **guardar cambios** y que la web los refleje al instante.
- En entornos **serverless** (p. ej. Vercel) el sistema de archivos es **solo lectura**: no se puede escribir en `company.json` desde el servidor. Por eso las ediciones desde el panel se persisten en la BD.
- **Solo JSON es viable** si no necesitas editar desde el dashboard en producción, o si despliegas en un servidor donde el proceso pueda escribir en `config/company.json`. En ese caso se podría quitar el modelo `CompanyConfig` y hacer que "Guardar" escriba en el archivo (solo en entornos con disco escribible).

## Detalle y decisiones de diseño

Para el listado completo de qué va en el JSON vs qué se mantiene en i18n (placeholders), casos especiales y decisiones de producto, ver **`docs/company-config-detail.md`**.
