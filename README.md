# PHASER — Tienda de guitarras eléctricas

Proyecto académico de catálogo de guitarras con Bootstrap 5, Tailwind CSS y JavaScript, consumiendo MockAPI.

## Requisitos
- Navegador moderno.
- Visual Studio Code.
- Extensión Live Server (recomendado).
- Conexión a Internet (Bootstrap, Tailwind, Bootstrap Icons, Google Fonts y MockAPI se cargan desde CDN).

## Ejecutar
1. Descomprimir PHASER.zip.
2. Abrir la carpeta PHASER en Visual Studio Code.
3. Abrir index.html con Live Server. La portada muestra una selección de 8 guitarras; catalogo.html contiene el catálogo completo.

También se puede abrir index.html directamente, pero Live Server es recomendable.

## API
Endpoint:
https://6afeff523a0e70bc8d54665f.mockapi.io/productos

Archivo js/api.js: centraliza las llamadas HTTP.
- GET: listar productos y consultar uno por ID.
- POST: crear producto.
- PUT: editar producto.
- PATCH: actualizar stock al confirmar la compra.
- DELETE: eliminar producto.

## Funcionalidades
- Portada con una selección de 8 productos y página independiente catalogo.html con el inventario completo consumido desde MockAPI.
- Búsqueda por nombre, marca, modelo, categoría y descripción.
- Filtros por marca y categoría.
- Ordenamiento por precio y nombre.
- Modal de detalles.
- Carrito de compra de demostración.
- Al confirmar la compra, vuelve a consultar el stock y lo descuenta en MockAPI mediante PATCH.
- Panel administrativo con alta, edición y eliminación de productos.
- Interfaz adaptable a móvil, tablet y escritorio.

## Acceso administrativo de práctica
- Usuario: admin
- Contraseña: PHASER

**Seguridad:** estas credenciales están implementadas en el frontend solo para cumplir la práctica. Cualquier persona puede inspeccionar el JavaScript y descubrirlas. No es un sistema de autenticación seguro para una tienda real. Para producción se necesita un backend con autenticación y autorización.

## Nota sobre precios e imágenes
Los precios cargados son datos de demostración. Las URLs de imagen existentes en MockAPI se respetan. Algunos registros de práctica usan imágenes genéricas o repetidas; se recomienda reemplazarlas por fotografías correspondientes a cada modelo.

## Tecnologías
- HTML5
- CSS3
- Bootstrap 5.3
- Tailwind CSS CDN
- Bootstrap Icons
- JavaScript (Fetch API)
- MockAPI

## Pie de página
Incluye enlaces externos a las páginas principales de YouTube (https://www.youtube.com/) e Instagram (https://www.instagram.com/). El enlace de contacto dirige a Instagram.

## Fotografías del catálogo
Cada uno de los 34 productos iniciales tiene una URL de imagen individual asociada por marca y nombre exacto del modelo en js/products.js. Las URLs genéricas repetidas del catálogo de prueba de MockAPI se sustituyen en la interfaz por esas fotografías. Si desde el administrador se guarda una URL personalizada, esa URL tiene prioridad. Si una web externa deja de servir una fotografía, la tarjeta queda sin imagen en vez de mostrar una guitarra equivocada.

Las imágenes se sirven desde páginas/CDN de fabricantes y comercios musicales externos; se requiere conexión a Internet y esos proveedores pueden cambiar sus URLs o políticas de hotlinking.

## Panel de administración (CRUD)
En la cabecera de la tienda, pulsar ADMIN e iniciar sesión:
- Usuario: admin
- Contraseña: PHASER

Desde el panel se puede:
- Consultar todos los productos y existencias.
- Crear productos (POST).
- Editar nombre, marca, modelo, categoría, precio, stock, imagen y descripción (PUT).
- Eliminar productos (DELETE), con confirmación.
- Actualizar la tabla volviendo a consultar MockAPI.

El panel vuelve a cargar el inventario desde el endpoint para reflejar cambios persistidos.
La autenticación se implementa en JavaScript del navegador para la práctica; las credenciales pueden inspeccionarse desde el código. No debe usarse como seguridad real en producción.

## Navegación
- El logotipo PHASER de la cabecera lleva siempre a index.html.
- El botón hamburguesa despliega el menú responsive con Inicio, Catálogo, Marcas y Contacto.
- Los enlaces llevan a la sección correcta incluso si se está en catalogo.html.

## Menú móvil y panel administrativo
El botón hamburguesa usa un controlador JavaScript propio, independiente del plugin Collapse de Bootstrap. Al desplegarse muestra Inicio, Catálogo, Marcas, Contacto y Panel administrativo. El acceso administrativo abre el formulario de inicio de sesión admin / PHASER.

## Corrección visual de cabecera (19/11/2026)
- El ícono de Bootstrap Icons se carga como hoja CSS, no como script.
- El botón hamburguesa usa tres barras CSS visibles, sin depender de fuentes externas.
- En móvil aparece un acceso ADMIN visible al lado del botón hamburguesa.
- El desplegable contiene Inicio, Catálogo, Marcas, Contacto y Panel administrativo.
- El botón ADMIN móvil y la opción del menú abren el mismo login: admin / PHASER.

## Menú desplegable: corrección final
Se quitó la clase collapse de Bootstrap del panel de navegación. El panel ahora usa exclusivamente phaser-menu-open y CSS propio, para evitar que Bootstrap mantenga ocultas las opciones aunque el botón cambie a estado de cierre. En móvil se muestra como panel negro con borde dorado y cinco accesos: Inicio, Catálogo, Marcas, Contacto y Panel administrativo.

## Ajuste de cabecera
Se eliminó el botón ADMIN duplicado que aparecía junto a la hamburguesa en móvil. El acceso al panel administrativo queda únicamente dentro del menú desplegable.

## Imágenes locales corregidas para los tres productos que faltaban
Se añadieron fotografías locales dentro de assets/products/ para:
- Fender Player Stratocaster
- PRS McCarty 594
- Jackson Soloist

Para estos tres modelos la tienda prioriza las imágenes incluidas en el ZIP, evitando depender de las URLs externas anteriores que no cargaban. Las fotografías se usan tanto en las tarjetas del catálogo como en el detalle del producto.
