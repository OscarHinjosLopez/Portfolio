# Comprobación manual con NVDA o VoiceOver

Estado: **pendiente de ejecutar con un lector real**. Axe y teclado automatizado
no sustituyen esta revisión. Usar Home en la URL pública.

1. Abrir Chrome/Firefox con NVDA en Windows o Safari con VoiceOver en macOS/iOS.
   Activar el lector y comenzar desde el principio de cada página.
2. Pulsar Tab y activar «Saltar al contenido principal». Confirmar que el foco y
   la lectura llegan a main, no solo que cambia el scroll.
3. Recorrer landmarks: header, navegación principal, un main y footer. No deben
   existir regiones repetidas sin propósito ni nombres ambiguos.
4. Recorrer headings con H en NVDA o el rotor de VoiceOver: un H1, H2 por sección
   y H3 para subsecciones, sin saltos que dificulten la comprensión.
5. Revisar navbar y marca OHL.; en móvil, el botón debe anunciar expandido/contraído.
   Abrirlo, recorrer sus enlaces y cerrar con Escape; recuperar foco en el botón.
6. En Proyectos, comprobar que se anuncia el estado pendiente sin enlaces vacíos.
7. En el hero, comprobar que la foto anuncia el nombre de Oscar.
8. En Contact, escuchar email, LinkedIn, GitHub y Descargar CV. Verificar nombres
   comprensibles, nueva pestaña anunciada cuando corresponde y PDF descargable.
9. Recorrer con Tab y Shift+Tab todos los controles. Mantener foco visible y evitar
   trampas; probar Enter, vuelta a Work, Browser Back y links con fragment.
10. Activar movimiento reducido y repetir lectura/navegación. Confirmar que todo
    contenido sigue disponible y que el scroll no se anima.

Registrar fecha, sistema, navegador, versión del lector, ruta, resultado y cualquier
hallazgo reproducible. No marcar la revisión como completada solo por pasar axe.
