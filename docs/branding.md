> Documentação de identidade visual e UI para devs no ambiente Next.js 14 (App Router)
> 

---

## 🎯 Identidade Visual

**Nome do Projeto:** `WOD[X] PRO`

**Token:** `$WOD`

**Domínio ENS:** `wod.eth`

---

## 🎨 Paleta Oficial

| Cor | Código HEX | Uso |
| --- | --- | --- |
| Preto Protocolo | `#000000` | Fundo principal, contraste |
| Vermelho Token | `#ff1c16` | Ação, botões primários, CTA |
| Branco Arena | `#f4f0e9` | Tipografia, contraste leve |

Use via `tailwind.config.ts` ou como variáveis CSS globais:

```tsx
// tailwind.config.ts (exemplo)
theme: {
  extend: {
    colors: {
      protocol: '#000000',
      token: '#ff1c16',
      arena: '#f4f0e9',
    }
  }
}

```

## 🔤 Tipografia

### Primária:

- **Fonte:** Space Grotesk ou alternativa moderna sans-serif com traço técnico e atlético
- **Peso preferido:** 500 (regular) a 700 (bold)
- **Uso:** headers, componentes, textos institucionais

### Secundária:

- **Monospace opcional:** para painéis de validação ou infos do protocolo (ex: `Reputation Score`, `Tx Hash`)

Sugestão no `layout.tsx` global:

```tsx
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '600', '700'] })

export const metadata = {
  title: 'WOD[X] PRO',
  description: 'Transforme esforço físico em valor digital real.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={spaceGrotesk.className}>
      <body>{children}</body>
    </html>
  )
}

```

---

## 🔲 Componentização (UI Tokens)

| Componente | Cor Base | Estado ativo |
| --- | --- | --- |
| Botão Primário | `bg-token` | `hover:bg-[#e61912]` |
| Botão Secundário | `border-token` | `text-token` |
| Backgrounds | `bg-protocol`, `bg-arena` | — |
| Sombra Global | `drop-shadow-[0_0_8px_#ff1c16aa]` | — |

---

## 💎 Ícones e Elementos Visuais

- Ícones preferencialmente **lineares ou geométricos**
- Estilo: **protocolar, técnico, não-decorativo**
- Usa `lucide-react` ou `phosphor-react` para consistência

Exemplo de uso:

```tsx
import { ShieldCheck } from 'lucide-react'

<ShieldCheck className="text-token w-5 h-5" />

```

---

## 🧱 Componentes Estratégicos (por página)

| Página | Elemento visual-chave |
| --- | --- |
| `/app/(auth)/login/page.tsx` | Ícone de login social + selo do protocolo |
| `/app/desafios/page.tsx` | Card de desafio com gradiente `token → arena` |
| `/app/dashboard/page.tsx` | Score visual (Ex: Reputation Grid) |
| `/app/validar/page.tsx` | Viewer de vídeo + overlay de decisão |
| `/app/arena/[id]/page.tsx` | HUD com timer, score, validações |

---

## 🪪 Marca e Simbologia

- Logo oficial: disponível em `/public/logo.svg`
- Versões horizontais e verticais (stacked)
- Símbolo "X" com uso isolado permitido para:
    - Favicon (`/favicon.ico`)
    - Meta OG (Open Graph)
    - Badge NFT de validador

---

## 🔁 Exemplos Rápidos

```tsx
// Botão CTA
<button className="bg-token text-arena px-4 py-2 rounded-lg shadow-md hover:bg-[#e61912]">
  Participar do Desafio
</button>

// Card
<div className="bg-arena border border-token p-4 rounded-xl">
  <h3 className="text-protocol text-lg font-bold">Desafio: 100 Burpees</h3>
</div>

```

---

## 🧩 Integrações Blockchain

- O branding do `$WOD` segue o padrão de **token real com utilidade**
- Componentes que usam `wagmi`, `viem`, `ethers` devem:
    - Usar `bg-protocol`, `text-token` para status
    - Mostrar feedback de transação com ícone + texto
    - Exibir `Tx Hash` com estilo `monospace + copy button`