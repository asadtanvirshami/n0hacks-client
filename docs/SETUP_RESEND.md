# 📧 Configuración de Resend para Emails

El formulario de contacto ya está listo. Solo necesitas configurar Resend en 3 pasos.

## Paso 1️⃣: Crear cuenta en Resend (1 min)

1. Ve a https://resend.com
2. Haz click en "Get Started" 
3. Regístrate con tu email
4. Verifica tu email
5. ¡Listo! Ya tienes una cuenta

## Paso 2️⃣: Obtener tu API Key (1 min)

1. En tu dashboard de Resend, ve a **API Keys** (en la barra lateral izquierda)
2. Haz click en **Create API Key**
3. Dale un nombre como "n0hacks-web"
4. Copia la key que te genera (empieza con `re_`)
5. **Guárdala** - la necesitas en un segundo

## Paso 3️⃣: Configurar tu dominio (opcional pero recomendado)

Para que el email venga de `noreply@n0hacks.com`:

1. En Resend, ve a **Domains**
2. Haz click en **Add Domain**
3. Añade `n0hacks.com` (o tu dominio)
4. Sigue los pasos de DNS que te muestra
5. Una vez verificado, ahora sí puedes enviar desde ese dominio

**Si no quieres hacer esto ahora:**
- Resend te da un dominio temporal (`onboarding@resend.dev`)
- Los emails funcionarán igual pero desde ese dominio
- Puedes hacerlo después

---

## Paso 4️⃣: Añadir la API Key a tu proyecto

1. Abre `.env.local` en la raíz del proyecto
2. Añade esta línea:
   ```
   RESEND_API_KEY=re_tu_api_key_aqui
   ```
3. **Reemplaza** `re_tu_api_key_aqui` con tu key real
4. Guarda el archivo

Ejemplo completo:
```
RESEND_API_KEY=re_1234567890abcdefghijklmnop
```

## Paso 5️⃣: (Si configuraste dominio) Actualizar el código

Si agregaste un dominio en Resend:

1. Abre `app/api/contact/route.ts`
2. Busca esta línea:
   ```javascript
   from: "noreply@n0hacks.com",
   ```
3. Si tu dominio es diferente, cámbialo
4. Si usas el dominio temporal de Resend, cámbialo a:
   ```javascript
   from: "onboarding@resend.dev",
   ```

## ✅ ¡Listo!

Ahora:
1. Reinicia el servidor: `npm run dev`
2. Ve a http://localhost:3000
3. Completa el formulario de contacto
4. ¡Deberías recibir el email en info@n0hacks.com! 🎉

## 🆘 Troubleshooting

**"No llega el email"**
- Verifica que el RESEND_API_KEY esté correcto en `.env.local`
- Reinicia el servidor después de añadir la variable
- Revisa el email en spam

**"Error: Invalid API key"**
- La API key debe empezar con `re_`
- Copia-pega directamente de Resend, sin espacios

**"Error sending email"**
- Verifica que el email en `to:` sea correcto
- Si cambió el dominio en `from:`, asegúrate que esté verificado en Resend
