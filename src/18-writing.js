/* ---------- Escrita: copiar à mão no caderno uma página do seu livro (PDF) ---------- */
const WR = mkBooks({
  key:"wr", mode:"text", legacy:true, view:"wrView", body:"wrBody", head:"wrHead", intro:"wrintro",
  available: () => S.lang === "en",
  eyebrow:"Escreva à mão", ini:"E", titleRest:"scrita",
  introText:"Copiar à mão fixa vocabulário, ortografia e o jeito das frases. Você informa o título do seu livro e carrega o PDF dele (fica só no seu navegador); pode ter vários livros e escolher qual usar. Todo dia o app sorteia uma página para você copiar no caderno e marcar como feito.",
  statOne:"página copiada no caderno", statMany:"páginas copiadas no caderno", statNone:"nenhuma página copiada ainda", startLabel:"Começar escrita",
  importText:"Qual livro você vai usar? Escreva o título e carregue o PDF dele. O app escolhe uma página aleatória do texto da história, mostra a página como ela é no livro, e você copia no caderno. <b>O arquivo fica só neste navegador</b>: não é enviado para lugar nenhum nem vira parte do app.",
  titleHint:"Ex.: King Arthur and the Knights of the Round Table",
  steps:'<li><b>Leia</b> a página em voz alta, devagar.</li><li><b>Copie à mão</b> no caderno. Se a página for longa, copie pelo menos até o fim de um parágrafo completo.</li><li><b>Confira</b> palavra por palavra e clique em <b>Copiei no caderno</b>.</li>',
  finishLabel:"Copiei no caderno ✓", doneTitle:"Página copiada!", doneNote:'A missão "Escrita do dia" foi marcada. Quer copiar outra página?', moreLabel:"Fazer outra página",
  rangeText:"Usar as páginas do PDF de",
  onComplete: p => { const ml = mlogToday(), mid = "wr_" + T; if (!ml.includes(mid)) ml.push(mid); }
});
function wrAvailable(){ return WR.available(); }
function wrDailyN(p){ return WR.dailyN(p); }
function renderWrIntro(){ WR.renderIntro(); }
function renderWrStage(){ WR.renderStage(); }
function openWrView(){ WR.open(); }
function closeWrView(){ WR.close(); }
function openWrDaily(){ WR.open(); } // atalho da missão "Escrita do dia"
