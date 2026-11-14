/* ---------- Livro didático: carregue o PDF do livro que você estuda e receba uma página aleatória ---------- */
const TD = mkBooks({
  key:"td", mode:"all", view:"tdView", body:"tdBody", head:"tdHead", intro:"tdintro",
  eyebrow:"Estude no seu livro", ini:"L", titleRest:"ivro didático",
  introText:"Carregue o PDF do livro didático que você está estudando (fica só no seu navegador). Pode ter vários livros e escolher qual usar. O app abre uma página aleatória para você estudar e fazer os exercícios.",
  statOne:"página estudada", statMany:"páginas estudadas", statNone:"nenhuma página estudada ainda", startLabel:"Abrir livro didático",
  importText:"Qual livro didático você está estudando? Escreva o título e carregue o PDF dele. O app sorteia uma página aleatória, mostra como ela é no livro, e você estuda e faz os exercícios no caderno. <b>O arquivo fica só neste navegador</b>: não é enviado para lugar nenhum nem vira parte do app.",
  titleHint:"Ex.: English File Intermediate",
  steps:'<li><b>Leia</b> a página com calma, em voz alta quando for texto ou diálogo.</li><li><b>Faça</b> os exercícios no caderno e anote o vocabulário novo.</li><li>Dúvidas e erros vão para o <b>Caderno de erros</b>. Depois clique em <b>Estudei esta página</b>.</li>',
  finishLabel:"Estudei esta página ✓", doneTitle:"Página estudada!", doneNote:"Quer sortear outra página do seu livro?", moreLabel:"Sortear outra página",
  rangeText:"Sortear páginas do PDF de"
});
function renderTdIntro(){ TD.renderIntro(); }
function renderTdStage(){ TD.renderStage(); }
function closeTdView(){ TD.close(); }
