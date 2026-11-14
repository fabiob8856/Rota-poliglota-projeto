/* A1 · unidade extra (20ª) para etapas que ficaram com 19 */
const suAdd = (k, u) => { const d = STEPU.en.A1[k]; d.units.push({id:`su-A1-${k}-${d.units.length+1}`, title:u[0], expl:u[1], items:u[2]}); };
suAdd(3,["Revisão: palavras do dia a dia","Revise palavras básicas: <b>water, food, house, friend, family</b>.",[
 c("“Water” significa:","água",["fogo","vinho","leite"]),c("“Friend” significa:","amigo",["família","inimigo","vizinho"]),c("“House” significa:","casa",["porta","cidade","quarto"]),t("Escreva “comida” em inglês (uma palavra).","food",null)]]);
suAdd(6,["Revisão: Present Simple","Lembre: he/she/it + <b>s</b>. I <b>work</b>, she <b>works</b>.",[
 c("He ___ football on Sundays.","plays",["play","playing","is play"]),c("They ___ in London.","live",["lives","living","is live"]),c("She doesn't ___ coffee.","drink",["drinks","drinking","drank"]),t("Complete: My brother ___ in a shop. (work)","works",null)]]);
suAdd(8,["Revisão: ouvir e ler","Ouça com atenção e escolha a opção correta.",[
 {t:"choice",q:"Ouça: qual é o nome?",say:"Hello, my name is Peter.",opts:["Peter","Pedro","Paul","Pete"],a:0},
 {t:"choice",q:"Ouça: de onde ele é?",say:"I am from Canada.",opts:["Canadá","Cuba","China","Chile"],a:0},
 {t:"choice",q:"Ouça: que dia é?",say:"Today is Monday.",opts:["segunda-feira","sábado","domingo","sexta-feira"],a:0},
 {t:"choice",q:"Ouça: qual é o número?",say:"Thirteen",opts:["13","30","3","31"],a:0}]]);
suAdd(10,["Revisão: perguntas básicas","<b>What, Where, Who, How old, Do you...?</b>",[
 c("___ is your name?","What",["Where","Who","When"]),c("___ do you live?","Where",["What","Who","How old"]),c("___ old are you?","How",["What","Where","Who"]),c("Do you speak English? — ___","Yes, I do.",["Yes, I am.","Yes, I does.","Yes, I speak."])]]);
suAdd(11,["Revisão: placas e avisos","<b>Exit · Entrance · Open · Closed · Push · Pull · No smoking</b>",[
 c("“Exit” significa:","saída",["entrada","aberto","fechado"]),c("“Push” significa:","empurre",["puxe","abra","feche"]),c("“Closed” significa:","fechado",["aberto","livre","novo"]),c("“No smoking” significa:","proibido fumar",["fumar liberado","sem fogo","sem cigarros à venda"])]]);
suAdd(12,["Revisão: textos curtos","“Anna lives in Paris. She works in a school. She likes books.”",[
 c("Onde Anna mora?","In Paris",["In Rome","In London","In Madrid"]),c("Onde Anna trabalha?","In a school",["In a bank","In a shop","In a hospital"]),c("Do que Anna gosta?","Books",["Films","Music","Football"]),c("“She” se refere a:","Anna",["Paris","a escola","os livros"])]]);
suAdd(13,["Revisão: formulário completo","Revise: first name, surname, age, address, phone, signature.",[
 c("“Surname” é:","sobrenome",["nome","idade","telefone"]),c("“Phone number” é:","número de telefone",["número de casa","número de rua","CEP"]),c("“Signature” é:","assinatura",["senha","nome","data"]),t("Escreva “idade” em inglês (uma palavra).","age",null)]]);
suAdd(16,["Revisão: vocabulário geral","Revise cores, números e verbos básicos.",[
 c("“Green” é:","verde",["vermelho","azul","amarelo"]),c("“Twenty” é:","20",["12","200","2"]),c("“Drink” é:","beber",["comer","correr","dormir"]),t("Escreva “casa” em inglês (uma palavra).","house|home",null)]]);
