# PlantCo.

Proyecto de tienda de plantas desarrollado con React y Vite.

## Desarrollo

Instalá las dependencias e iniciá el servidor de desarrollo:

```sh
npm install
npm run dev
```

## Usuarios de demostración

El login es una simulación local: no hay servidor de autenticación. Estas credenciales son ficticias, solo para practicar y no deben reutilizarse como contraseñas reales.

| Rol | Email | Contraseña |
|---|---|---|
| Admin | `admin@plantco.test` | `admin123` |
| Cliente | `cliente@plantco.test` | `cliente123` |

El visitante es quien no ha iniciado sesión.

## Administración

El panel `/admin` y sus módulos requieren una sesión con rol admin. Los cambios de productos, categorías y tags se guardan en `localStorage` del navegador de esta demostración local.

Al eliminar un tag, se quita de todos los productos que lo tenían; los productos pueden quedar sin tags. Los cambios de título de categoría también actualizan la categoría asociada a sus productos.

## Capturas

El recorrido visual está en [docs/README.md](./docs/README.md): incluye el inicio, catálogo filtrado, detalle, carrito, compra confirmada y panel de administración.
