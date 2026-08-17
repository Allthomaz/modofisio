# Spec — Melhorias visuais (Modo Fisio)

Direções aprovadas em testes isolados para futura aplicação no site.
Protótipos: `teste-liquid-glass.html` (header ilha v1), `teste-sidebar-logo.html`
(sidebar — não adotada) e `teste-hero-spine.html` (**versão de referência final**).
Nenhum arquivo do site foi alterado.

## 0. Decisões de paleta (fechadas)

- **Paleta do site original mantida** (index.html): azul `#023384` +
  verde-água `#1FA89A` (CTA) + `#157F74` (hover). NÃO adotar terracota,
  dourado, prata ou verde esmeralda — testados e descartados ("brigavam" com
  a marca / destoavam do fundo).
- Botão secundário igual ao site: fundo branco, texto/borda azul.
- Evitar brilho quente (âmbar/cobre) sobre a hero — destoa da paleta fria.

## 1. Header — ilha flutuante de vidro (aprovado)

**Nomes do padrão:** glassmorphism (efeito vidro) + floating pill header /
ilha flutuante (estilo Dynamic Island).

- No topo o header fica transparente; ao rolar (>30px) vira ilha de vidro:
  pílula 18px, `backdrop-filter: saturate(180%) blur(18px)`, fundo
  translúcido branco, borda clara, brilho interno.
- **Sombras:** CTA, pílula da marca e foto da marca SEM sombra (removidas a
  pedido). A sombra da ilha do header foi mantida.
- Mobile: drawer de vidro, CTA sai do header.

## 2. Linha de progresso na ilha (aprovado)

- Linha 3px na borda inferior, preenche **da direita para a esquerda**,
  gradiente verde-água (`--accent` → `#5ad6c9`), acompanha o scroll.
- **Solução da curva:** barra DENTRO da ilha + `overflow:hidden` no
  container — o arredondamento recorta a linha na curva. Não usar
  `border-radius` na própria barra.

## 3. Logo animada (aprovado)

- Efeitos no símbolo: **respiração** (escala 1→1.035, 4.2s), **shine**
  (brilho percorrendo, 5.5s), **halo** verde-água pulsando atrás.
- Dois estados: **topo** = símbolo 54px + nome 21px + tagline "FISIOTERAPIA
  & PILATES"; **rolado** = compacta (42px / 16.5px), encolhendo animado.
- **Última decisão:** a marca do teste usa foto da fachada
  (`modofisio_2025_001.JPG`, `object-position:center 38%`) — avaliar se vira
  recorte do letreiro ou volta ao símbolo oficial (`logo-mark-160.jpg`).
- A logo PNG completa tem texto embutido — não usar com wordmark ao lado.

## 4. Hero — coluna colorida de fundo (aprovado)

Layout **institucional** (igual ao site original), SEM cards flutuantes:

- **Fundo:** imagem da coluna (`Human_spine_graphic_design_layout_*.jpeg`)
  cobrindo toda a hero, coluna central atrás do conteúdo.
- **Véu de vidro fino:** filme translúcido (blur só 2.5px + degradê branco)
  com reforço à esquerda (onde entra o texto) e fundição pro `--mf-cool` na
  base. A coluna permanece visível.
- **Parallax sutil** da coluna (25% da velocidade do scroll), só enquanto a
  hero está visível.
- **Texto direto sobre o véu** (sem ilha de vidro). Kicker em pílula com
  borda verde-água fina.
- **Foto da equipe:** `modofisio_2025_043.JPG`, moldura limpa (raio 22px),
  selo "São Roque/SP" em pílula neutra fria, sem moldura de vidro.
  Fotos testadas: _033 (substituída), _043 (atual).
- **Hover da foto:** zoom mínimo (scale 1.015) + **partículas azuladas
  sutis** (canvas, ~22 partículas, matiz 208-226, 0.8-2.6px) que sobem
  lentamente; só animam com mouse sobre a foto; desativadas com
  `prefers-reduced-motion`.
- **Brilho que seguia o mouse pela hero: REMOVIDO** (testado em âmbar e
  azul; rejeitado).
- Animação "polaroid" (inclinar/endireitar) da foto: **rejeitada**.

## 5. Ilhas liquid glass no conteúdo (padrão aprovado, uso futuro)

- O modelo de ilha/card de vidro (hero v1, cards de serviços) **pode ser
  reutilizado em outra seção** — candidata natural: seção de serviços.
- Cards de vidro exigem **cor/imagem atrás** para aparecer.
- Limitar quantidade de `backdrop-filter` (custo em celular fraco).

## 6. Responsividade e acessibilidade (aprovado)

- Mobile: hero empilha (foto max-width 420px centrada), coluna permanece
  centralizada (imagem paisagem corta laterais), header sem nav/CTA.
- `prefers-reduced-motion: reduce` desliga TODAS as animações (logo,
  partículas, parallax) — obrigatório na implementação final.

## Ideias pendentes (ainda não prototipadas)

- [ ] Efeito scroll percorrendo a coluna (scrollytelling: cervical→torácica→
      lombar; no mobile, arrastar indicador revelando cards por região).
- [ ] Avaliar GSAP ScrollTrigger se o scrub precisar ser mais suave
      (implementação atual é vanilla: IntersectionObserver + CSS).
- [ ] Definir imagem final da marca no header (fachada x símbolo oficial).
- [ ] Trocar demais imagens do site pelos materiais oficiais da clínica.

## Tokens liquid glass (extraír ao implementar)

```css
--glass-bg: rgba(255,255,255,.55);
--glass-bg-strong: rgba(255,255,255,.72);
--glass-border: rgba(255,255,255,.65);
--glass-blur: saturate(180%) blur(18px);
--glass-shadow: 0 18px 44px -20px rgba(2,51,132,.35),
                inset 0 1px 0 rgba(255,255,255,.85),
                inset 0 -1px 0 rgba(255,255,255,.25);
--glass-shadow-float: 0 28px 60px -24px rgba(2,51,132,.45),
                      inset 0 1px 0 rgba(255,255,255,.9);
```
