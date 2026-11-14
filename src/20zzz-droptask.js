/* etapas de tarefa não usam unidades */
for (const lang in STEPT) for (const lvl in STEPT[lang]) for (const k in STEPT[lang][lvl]) if (STEPU[lang] && STEPU[lang][lvl]) delete STEPU[lang][lvl][k];
