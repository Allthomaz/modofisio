# Spec — Melhorias visuais (Modo Fisio)

Direções aprovadas em testes isolados para futura aplicação no site.
Protótipos: `teste-sidebar-logo.html` (sidebar) e `teste-liquid-glass.html`
(header/hero — **versão de referência aprovada**). Nenhum arquivo do site foi alterado.

## 1. Header — ilha flutuante de vidro (aprovado)

**Nomes do padrão:** glassmorphism (efeito vidro) + floating pill header / ilha flutuante
(container arredondado que "flutua" sobre o conteúdo, estilo Dynamic Island).

Comportamento:

- No topo da página o header fica **transparente** (como no site atual).
- Ao rolar (>30px), o header vira uma **ilha de vidro**: pílula arredondada (18px)
  com `backdrop-filter: saturate(180%) blur(18px)`, fundo translúcido branco,
  borda clara e sombra interna de brilho (`inset 0 1px 0 rgba(255,255,255,.85)`).
- Transições suaves (~.45s, easing `cubic-bezier(.22,.61,.36,1)`).

## 2. Linha de progresso na ilha (aprovado)

- Linha de 3px na borda inferior da ilha, aparece junto com o modo vidro.
- Preenche **da direita para a esquerda** conforme o scroll (gradiente
  verde-água `--accent` → `#5ad6c9`).
- **Solução da curva:** a barra fica DENTRO da ilha com `overflow:hidden` no
  container — o próprio arredondamento recorta a linha na curva. Não usar
  `border-radius` na barra (não acompanha a curvatura real).

## 3. Logo animada (aprovado)

- Símbolo (`logo-mark-160.jpg`) + wordmark tipográfico ao lado (a logo PNG
  completa tem texto embutido — não usar com wordmark do lado, duplica).
- Efeitos no símbolo: **respiração** (escala 1→1.035, ciclo 4.2s), **shine**
  (brilho percorrendo a cada 5.5s), **halo** verde-água pulsando atrás.
- Dois estados: **topo** = símbolo 54px + nome 21px + tagline "FISIOTERAPIA &
  PILATES" em caixa alta espaçada; **rolado** = compacta (42px / 16.5px),
  encolhendo animado junto com a ilha.

## 4. Hero — brilho acolhedor seguindo o mouse (aprovado)

- Radial gradient quente (âmbar ~`rgba(255,196,128,.28)`, ~420px) posicionado
  via variáveis CSS `--mx/--my` atualizadas em `mousemove` (leve, sem blur).
- Surge/desaparece com fade (~.8s) ao entrar/sair do hero.

## 5. Ilhas liquid glass no conteúdo (aprovado com ressalvas)

- Cards de vidro (mesmos tokens da ilha) exigem **cor/imagem atrás** para
  aparecer — sobre fundo branco liso o efeito não existe.
- Hero demo usa foto de fundo + blobs coloridos desfocados em movimento lento
  + card de vidro principal flutuando + foto em moldura de vidro (polaroid).
- Ressalva de performance: limitar quantidade de ilhas com `backdrop-filter`
  (custo em celulares fracos).

## 6. Responsividade e acessibilidade (aprovado)

- Mobile: menu vira drawer de vidro (canto inferior direito), CTA sai do
  header, hero empilha, ilhas em coluna única.
- `prefers-reduced-motion: reduce` desliga todas as animações (logo, flutuação,
  blobs) — obrigatório manter na implementação final.

## Ideias pendentes (ainda não prototipadas)

- [ ] Trocar imagens da home e da equipe (aguardando materiais da clínica).
- [ ] Imagem da coluna colorida com efeito scroll (scrollytelling: imagem sticky
      + highlight percorrendo cervical→torácica→lombar; no mobile, arrastar
      indicador pela coluna revelando cards por região).
- [ ] Avaliar GSAP ScrollTrigger caso o scroll da coluna precise de scrub suave
      (implementação atual é vanilla: IntersectionObserver + CSS).

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
