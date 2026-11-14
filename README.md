# Rota Poliglota

Guia de estudo de idiomas (inglês, espanhol, francês, russo, turco e árabe), do A1 ao C2, como programa para Windows.

## Instalar
Baixe o `Rota-Poliglota-Setup-x.y.z.exe` na página **Releases** deste repositório e execute. O programa se atualiza sozinho: ao abrir, ele procura uma versão nova, baixa em segundo plano e pergunta se quer reiniciar para atualizar. Seu progresso (guardado no próprio programa) é mantido.

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
