# Projeto Hermes

Guia de estudo de idiomas (inglês, espanhol, francês, russo, turco e árabe), do A1 ao C2, como programa para Windows.

## Instalar
Baixe o `Projeto-Hermes-Setup-x.y.z.exe` na página **Releases** deste repositório e execute. O programa se atualiza sozinho: ao abrir, ele procura uma versão nova, baixa em segundo plano e pergunta se quer reiniciar para atualizar. Seu progresso (guardado no próprio programa) é mantido.

## Como o projeto é organizado
- `src/` — código-fonte do app (HTML/CSS/JS em partes). `node tools/build.js` junta tudo em `app/index.html`.
- `electron/main.js` — janela do programa e atualização automática.
- `.github/workflows/release.yml` — ao publicar uma tag `vX.Y.Z`, o GitHub gera o instalador e cria a Release.

## Publicar uma atualização
```
tools/release.sh 1.1.0 "o que mudou"
```
Isso sobe o código, cria a tag `v1.1.0` e o GitHub Actions gera o instalador e a Release. Quem já tem o programa recebe a atualização automaticamente.

## Rodar/testar localmente
```
npm install
npm start
```

## Gravações reais do Tatoeba (voz humana)

O botão 🔊 toca a gravação do Tatoeba quando a frase está na lista; se não houver internet ou gravação, usa a voz do aparelho.
Para gerar a lista de frases (uma vez, no seu computador):

```
node tools/tatoeba.js          # baixa as listas do Tatoeba, filtra licenças livres e escreve src/29g-tatoeba-data.js
node tools/build.js            # reconstrói o aplicativo
```

Opções: `--per 360` (frases por idioma), `--nc` (aceita também gravações NC/ND). Os créditos (autor e licença) aparecem em cada unidade "Ouça e escreva".
