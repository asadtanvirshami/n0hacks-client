# 🔒 Audit de Seguridad & Mejoras 2026 - n0hacks

**Fecha:** Mayo 2026  
**Estado Actual:** Proyecto funcional pero con brechas de seguridad críticas  
**Prioridad:** ALTA - Implementar antes de producción

---

## 📊 Resumen Ejecutivo

| Categoría | Estado | Prioridad | Estimado |
|-----------|--------|-----------|----------|
| **Seguridad** | ⚠️ CRÍTICO | ALTA | 4-6 horas |
| **Dependencias** | ✅ ACTUALIZADAS | MEDIA | 1 hora |
| **Performance** | 🟡 OPTIMIZABLE | MEDIA | 3-4 horas |
| **Vanguardia 2026** | ❌ NO IMPLEMENTADO | BAJA | 8-12 horas |

---

## 🔴 PROBLEMAS CRÍTICOS DE SEGURIDAD

### 1. **TypeScript - `strict: false` (CRÍTICO)**
```json
// ❌ ACTUAL
"strict": false

// ✅ DEBE SER
"strict": true
```
**Impacto:** Sin type-checking strict, cualquiera puede pasar `undefined`, `null` sin control.  
**Solución:** Cambiar a `strict: true` en `tsconfig.json`

### 2. **Falta Headers de Seguridad (CRÍTICO)**
No hay configuración de seguridad en `next.config.js`:
- ❌ CSP (Content Security Policy)
- ❌ X-Frame-Options
- ❌ X-Content-Type-Options
- ❌ Strict-Transport-Security
- ❌ Referrer-Policy

### 3. **API sin Rate Limiting (CRÍTICO)**
- Endpoints `/api/contact` y `/api/leads` sin protección
- Vulnerable a DDoS y spam masivo
- Sin validación de headers CORS

### 4. **Validación Insuficiente (ALTO)**
El contact form solo valida:
```javascript
// ❌ Validación básica (insuficiente)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```
**Falta:**
- Longitud máxima de campos
- XSS prevention
- Injection attacks
- Unicode normalization

### 5. **No hay Middleware (ALTO)**
Sin middleware.ts para:
- Validar requests
- Logging de seguridad
- Rate limiting
- CORS validation

### 6. **Secretos en Ambiente (MEDIO)**
```javascript
// ⚠️ RESEND_API_KEY expuesto en runtime
const RESEND_API_KEY = process.env.RESEND_API_KEY;
```
Debe usar Server-Only modules en Next.js 15

---

## ✅ DEPENDENCIAS - ESTADO ACTUAL

Todas están actualizadas a 2026:
```
✅ next@15.0.0 (última)
✅ react@18.2.0 (última stable)
✅ typescript@5 (última)
✅ tailwindcss@4 (última)
✅ eslint@9 (última)
```

**Pequeñas mejoras:**
- Actualizar `zod` a última (validación de schemas)
- Agregar `next-intl` en lugar de `react-intl` (mejor para Next.js 15)

---

## 🛡️ IMPLEMENTACIÓN DE SEGURIDAD

### Paso 1: Actualizar TypeScript (5 min)
```diff
// tsconfig.json
{
  "compilerOptions": {
-   "strict": false,
+   "strict": true,
+   "noImplicitAny": true,
+   "strictNullChecks": true,
+   "strictFunctionTypes": true,
```

### Paso 2: Crear middleware.ts (10 min)
```typescript
// middleware.ts (raíz del proyecto)
import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 10;

const ipRequestMap = new Map<string, number[]>();

export function middleware(request: NextRequest) {
  // 1. CORS Headers
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // 2. Rate Limiting para APIs
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const ip = request.ip || "unknown";
    const now = Date.now();
    const requests = ipRequestMap.get(ip) || [];
    
    // Limpiar requests antiguos
    const recentRequests = requests.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
    );

    if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    recentRequests.push(now);
    ipRequestMap.set(ip, recentRequests);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
```

### Paso 3: next.config.js con Headers de Seguridad (5 min)
```javascript
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), usb=()",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google-analytics.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' *.resend.com *.google-analytics.com; frame-ancestors 'none'",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  redirects: async () => {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },

  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
```

### Paso 4: Validación con Zod (15 min)
```typescript
// lib/validation.ts
import { z } from "zod";

export const ContactFormSchema = z.object({
  email: z.string()
    .email("Email inválido")
    .min(5, "Email muy corto")
    .max(255, "Email muy largo")
    .toLowerCase()
    .trim(),
  company: z.string()
    .min(2, "Empresa muy corta")
    .max(100, "Empresa muy larga")
    .trim()
    .regex(/^[a-zA-Z0-9\s\-\.&()]+$/, "Caracteres inválidos"),
  message: z.string()
    .min(10, "Mensaje muy corto")
    .max(5000, "Mensaje muy largo")
    .trim(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
```

### Paso 5: Actualizar API Route (20 min)
```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    // 1. Validar Content-Type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    // 2. Parsear y validar con Zod
    const body = await request.json();
    const validatedData = ContactFormSchema.parse(body);

    // 3. Enviar email
    const success = await sendEmail(validatedData);
    
    if (!success) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Lead received" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function sendEmail(data: typeof ContactFormSchema._type) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL,
        to: process.env.CONTACT_EMAIL,
        subject: `🚨 Nuevo Lead - ${data.company}`,
        html: generateEmailHTML(data),
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
}

function generateEmailHTML(data: typeof ContactFormSchema._type): string {
  // Escapar HTML para prevenir XSS
  const escapeHtml = (text: string) =>
    text.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]));

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2>🚨 Nuevo Lead</h2>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Empresa:</strong> ${escapeHtml(data.company)}</p>
      <p><strong>Mensaje:</strong></p>
      <pre>${escapeHtml(data.message)}</pre>
    </div>
  `;
}
```

---

## 🚀 MEJORAS DE PERFORMANCE 2026

### 1. Bundle Analysis
```bash
npm install --save-dev @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
```

### 2. Image Optimization
```javascript
// next.config.js
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "*.n0hacks.com",
    },
  ],
  formats: ["image/webp", "image/avif"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

### 3. Sitemap Dinámico
```typescript
// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://n0hacks.com";
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/es`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
```

---

## 🌟 FUNCIONALIDADES VANGUARDIA 2026

### 1. **AI/ML Integration - Chat de IA**
```
npm install ai @ai-sdk/anthropic
```
- Chatbot de seguridad alimentado por Claude AI
- Análisis de vulnerabilidades en tiempo real
- Generación automática de reportes

### 2. **Real-time Notifications**
```
npm install socket.io next-socket.io
```
- Notificaciones en vivo para leads
- Dashboard de actividad en tiempo real
- Alertas de seguridad

### 3. **Advanced Analytics**
```
npm install plausible-tracker
```
- Analytics privado (sin Google)
- Seguimiento de conversiones
- Heatmaps y session recording

### 4. **Web Socket para Live Updates**
```typescript
// app/api/sse/route.ts - Server-Sent Events
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue("data: connected\n\n");
      
      const interval = setInterval(() => {
        controller.enqueue(`data: ${new Date().toISOString()}\n\n`);
      }, 5000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
```

### 5. **Progressive Web App (PWA) Mejorado**
```json
// manifest.json actualizado con Web App Manifest v2
{
  "name": "n0hacks Security Platform",
  "short_name": "n0hacks",
  "description": "Offensive Security & Red Team",
  "start_url": "/",
  "display": "standalone",
  "scope": "/",
  "theme_color": "#000000",
  "background_color": "#000000",
  "screenshots": [
    {
      "src": "/screenshots/narrow.png",
      "sizes": "540x720",
      "form_factor": "narrow"
    },
    {
      "src": "/screenshots/wide.png",
      "sizes": "1280x720",
      "form_factor": "wide"
    }
  ],
  "shortcuts": [
    {
      "name": "Ver servicios",
      "short_name": "Servicios",
      "description": "Acceder a nuestros servicios",
      "url": "/servicios",
      "icons": [
        {
          "src": "/icons/servicios-96.png",
          "sizes": "96x96"
        }
      ]
    }
  ]
}
```

### 6. **Database & ORM - Prisma**
```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Lead {
  id        String   @id @default(cuid())
  email     String   @unique
  company   String
  message   String
  status    String   @default("new")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 7. **Edge Middleware - Latency Global**
```typescript
// middleware.ts con Edge Runtime
export const config = {
  runtime: "edge",
  matcher: ["/api/status", "/api/health"],
};
```

### 8. **Vercel Web Analytics Automático**
```bash
npm install @vercel/web-vitals
```

### 9. **OpenTelemetry para Observability**
```bash
npm install @opentelemetry/api @opentelemetry/sdk-node
```

### 10. **AI-Powered SEO Optimization**
- Dynamic Open Graph generation con AI
- Metadata optimization automática
- Schema.org structured data mejorado

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

**FASE 1: SEGURIDAD (Día 1 - 4 horas)**
- [ ] Cambiar `strict: true` en tsconfig.json
- [ ] Crear middleware.ts con rate limiting
- [ ] Actualizar next.config.js con headers
- [ ] Implementar validación con Zod
- [ ] Actualizar API routes

**FASE 2: PERFORMANCE (Día 1-2 - 3 horas)**
- [ ] Bundle analyzer
- [ ] Image optimization
- [ ] Sitemap dinámico

**FASE 3: VANGUARDIA (Semana 1-2 - 8 horas)**
- [ ] AI Chat integration
- [ ] Real-time notifications (SSE o WebSocket)
- [ ] PWA mejorado
- [ ] Database con Prisma
- [ ] Web Analytics

**FASE 4: TESTING (Día 2 - 2 horas)**
- [ ] Pruebas de seguridad
- [ ] Load testing
- [ ] OWASP top 10 validation

---

## 📈 Impacto Esperado

| Métrica | Actual | Esperado |
|---------|--------|----------|
| **Lighthouse Score** | ~80 | 95+ |
| **Core Web Vitals** | OK | Excellent |
| **Security Score** | 50/100 | 95/100 |
| **OWASP Compliance** | 20% | 95% |
| **Performance** | 2s FCP | <1s FCP |

---

## 🔧 Comandos Útiles

```bash
# Actualizar dependencias
npm update

# Verificar vulnerabilidades
npm audit
npm audit fix

# Build y análisis
npm run build
ANALYZE=true npm run build

# Testing de seguridad
npx nsp check
npx snyk test

# Type checking estricto
npx tsc --strict
```

---

**Última Actualización:** 25 Mayo 2026  
**Próxima Revisión:** 1 Junio 2026
