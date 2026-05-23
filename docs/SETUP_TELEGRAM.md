# 🤖 Configuración del Bot de Telegram para Leads

## ¿Qué hace?
Cada vez que un lead envía el formulario de contacto, recibes una notificación instantánea en Telegram con:
- Email del lead
- Empresa/Rol
- Mensaje que mandó
- Hora exacta de llegada

## Pasos de Configuración

### 1️⃣ Crear el Bot en Telegram

1. Abre Telegram y busca **@BotFather**
2. Envía el comando `/newbot`
3. Dale un nombre a tu bot (ej: "n0hacks-leads")
4. Dale un username único (ej: "n0hacks_leads_bot")
5. 🎉 Te dará un **TOKEN** que se verá así:
   ```
   123456789:ABCdefGHIjklmNOpqrsTUVwxyz123
   ```
6. **Guarda ese token** en un lugar seguro

### 2️⃣ Obtener tu Chat ID

#### Opción A (Más fácil):
1. Abre Telegram y busca **@userinfobot**
2. Envía cualquier mensaje
3. Te mostrará tu ID (número largo)
4. Copia ese número

#### Opción B (Alternativa):
1. Crea un grupo en Telegram
2. Añade a tu bot (@n0hacks_leads_bot)
3. Añade a @userinfobot al grupo
4. Verás el ID del grupo

### 3️⃣ Configurar Variables de Entorno

1. En la carpeta raíz del proyecto, crea `.env.local`
2. Añade estas líneas:
   ```
   TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklmNOpqrsTUVwxyz123
   TELEGRAM_CHAT_ID=987654321
   ```
3. Reemplaza los valores con los tuyos
4. **Guarda el archivo**

### 4️⃣ Restart y Prueba

1. Reinicia el servidor: `npm run dev`
2. Ve a la web en http://localhost:3000
3. Completa el formulario de contacto
4. Deberías recibir un mensaje en Telegram al instante ✅

## 📋 Estructura del Mensaje en Telegram

```
🚨 Nuevo Lead en n0hacks

📧 Email: usuario@empresa.com
🏢 Empresa/Rol: CTO @ Fintech
💬 Mensaje: Queremos hacer un red team urgente
⏰ Hora: 23/05/2026, 14:30:45
```

## 🔒 Seguridad

- Los leads se guardan en `leads.json` (local)
- El bot token está en variables de entorno
- No se expone información sensible en logs

## 🆘 Troubleshooting

**"No recibo mensajes"**
- Verifica que el CHAT_ID es correcto
- Asegúrate de haber iniciado al menos un chat con el bot
- Revisa que el TOKEN sea correcto

**"Error: Missing required fields"**
- Todos los campos del formulario son obligatorios
- Email debe ser un email válido

**"Telegram API error"**
- El TOKEN puede haber expirado
- Intenta crear un nuevo bot con @BotFather

## 📊 Próximas Mejoras

- [ ] Dashboard para ver todos los leads
- [ ] Integración con base de datos (en lugar de JSON)
- [ ] Exportar leads a CSV
- [ ] Múltiples canales de Telegram
- [ ] Webhooks para otras plataformas (Slack, Discord, etc.)
