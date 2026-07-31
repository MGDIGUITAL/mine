# 🎮 Guía de Instalación — Plugin MyLifeCraft

> Guía para el administrador del servidor. Sigue estos pasos en orden.

---

## ¿Qué hace este plugin?

Automatiza la entrega de productos comprados en la tienda web **mylifecraft.net**.
Cuando un cliente compra un rango, kit, llave o cualquier producto, el plugin lo entrega
directamente en el servidor sin intervención manual.

---

## Requisitos

- ✅ Servidor **Paper 1.21** (recomendado: Paper 1.21.1)
- ✅ **Java 21** instalado en el servidor
- ✅ **LuckPerms** instalado (para rangos)
- ✅ Maven instalado (solo para compilar)

---

## Paso 1 — Compilar el plugin

En la máquina donde tienes el código fuente (o en el servidor):

```bash
cd plugin/
mvn package -DskipTests
```

Esto genera el archivo:
```
plugin/target/MyLifeCraft-Plugin-1.0.0.jar
```

---

## Paso 2 — Instalar el plugin en el servidor

1. Copia el archivo `MyLifeCraft-Plugin-1.0.0.jar` a la carpeta `plugins/` de tu servidor Paper.
2. **Inicia o reinicia** el servidor una vez para que se genere la configuración automáticamente.

---

## Paso 3 — Configurar la clave de Supabase

Después del primer inicio, aparecerá el archivo de configuración en:
```
plugins/MyLifeCraftPlugin/config.yml
```

Ábrelo y reemplaza `CONFIGURAR_AQUI` con la service_role key de Supabase:

```yaml
supabase:
  url: "https://yuesvfqiuxnphrqvwkll.supabase.co"
  service_key: "sb_secret_2DJ10WEjAZ-Bcy4cdDVlLA_hA8-fLNT"   # ← ya configurada

delivery:
  check_interval_seconds: 30
  max_attempts: 5
  notify_player: true
```

> ⚠️ Esta clave ya está lista. Solo cópiala exactamente como está arriba.

---

## Paso 4 — Recargar el plugin

En la consola del servidor escribe:

```
/mlc reload
```

Deberías ver en la consola:
```
✅ MyLifeCraft Plugin v1.0.0 activado.
   Intervalo de entrega: cada 30 segundos
   Supabase: https://yuesvfqiuxnphrqvwkll.supabase.co
```

---

## Comandos disponibles (solo OPs)

| Comando | Descripción |
|---|---|
| `/mlc status` | Ver cuántos pedidos están pendientes |
| `/mlc deliver <nick>` | Entregar manualmente a un jugador en línea |
| `/mlc grants <nick>` | Ver rangos activos de un jugador |
| `/mlc check` | Forzar revisión de pedidos ahora |
| `/mlc reload` | Recargar configuración |

---

## ¿Cómo funciona automáticamente?

```
1. Cliente compra en mylifecraft.net con PayPal
2. Al completar el pago, la web registra el pedido en Supabase
3. El plugin consulta Supabase cada 30 segundos
4. Si el jugador está en línea → entrega inmediata
5. Si está offline → entrega en cuanto se conecte
```

---

## Verificar que funciona

Después de instalar, puedes hacer una prueba:

1. Ejecuta en la consola: `/mlc status` → debe decir "0 pedidos pendientes" si no hay compras
2. Compra un producto en la tienda web con tu nick
3. Conéctate al servidor → deberías recibir el producto automáticamente con un mensaje en el chat

---

## Soporte

Si algo no funciona, revisa los logs del servidor buscando `[MyLifeCraft]`.

Contacto del desarrollador: configurar en Discord del servidor.
