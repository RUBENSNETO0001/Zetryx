const EstruturadoFormularioSocioeconomico = ({ setNumeroEtapa }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        setNumeroEtapa(5);
    };

    return (
        <div className="container-formulario">
            <form className="formulario-inscricao" onSubmit={handleSubmit}>
                <section>
                    <div className="cabecalho-verde">
                        <h3>DADOS SOCIOECONÔMICOS</h3>
                    </div>

                    <div className="campo-formulario">
                        <label>Em quantas disciplinas você está matriculado? *</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item"><input type="radio" name="qtdDisciplinas" value="uma" required /><span className="custom-radio"></span> Em apenas uma</label>
                            <label className="opcao-item"><input type="radio" name="qtdDisciplinas" value="duas" /><span className="custom-radio"></span> Em duas disciplinas</label>
                            <label className="opcao-item"><input type="radio" name="qtdDisciplinas" value="mais_duas" /><span className="custom-radio"></span> Em mais de duas disciplinas</label>
                            <label className="opcao-item"><input type="radio" name="qtdDisciplinas" value="tcc" /><span className="custom-radio"></span> Apenas em fase de elaboração de TCC</label>
                            <label className="opcao-item"><input type="radio" name="qtdDisciplinas" value="estagio" /><span className="custom-radio"></span> Apenas fazendo estágio curricular</label>
                        </div>
                    </div>

                    <div className="campo-formulario">
                        <label>Você recebe algum auxílio ou bolsa no Ifac? *</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item"><input type="radio" name="recebeAuxilio" value="nao" required /><span className="custom-radio"></span> Não</label>
                            <label className="opcao-item"><input type="radio" name="recebeAuxilio" value="sim" /><span className="custom-radio"></span> Sim</label>
                        </div>
                    </div>

                    <div className="campo-formulario">
                        <label>Se a sua resposta foi sim na questão anterior, informe abaixo em qual(is) auxílio(s) você é beneficiário:</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item"><input type="checkbox" name="tipoBolsa" value="extensao" /> Bolsa de extensão</label>
                            <label className="opcao-item"><input type="checkbox" name="tipoBolsa" value="pesquisa" /> Bolsa de pesquisa</label>
                            <label className="opcao-item"><input type="checkbox" name="tipoBolsa" value="pibid" /> PIBID</label>
                            <label className="opcao-item"><input type="checkbox" name="tipoBolsa" value="residencia" /> Residência pedagógica</label>
                            <label className="opcao-item"><input type="checkbox" name="tipoBolsa" value="monitoria" /> Monitoria</label>
                            <label className="opcao-item"><input type="checkbox" name="tipoBolsa" value="ensino" /> Bolsa de Projeto de Ensino</label>
                            <label className="opcao-item"><input type="checkbox" name="tipoBolsa" value="pe-de-meia" /> Pé-de-meia</label>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="informativo-texto">
                        <p><strong>Agora responda as seguintes perguntas sobre sua situação familiar</strong></p>
                        <p>Entende-se por Grupo Familiar ou Família as pessoas que residem em um mesmo domicílio (possuindo ou não parentesco) e que se mantêm pela contribuição de seus membros, incluindo você.</p>
                    </div>

                    <div className="campo-formulario">
                        <label>Há pessoas com deficiência na sua família (considerando todas as pessoas que moram na mesma casa)? *</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item"><input type="checkbox" name="pcdFamilia" value="nenhuma" /><span className="custom-checkbox"></span> Não há pessoas com deficiência na minha família</label>
                            <label className="opcao-item"><input type="checkbox" name="pcdFamilia" value="intelectual" /> Deficiência intelectual</label>
                            <label className="opcao-item"><input type="checkbox" name="pcdFamilia" value="auditiva" /> Deficiência auditiva</label>
                            <label className="opcao-item"><input type="checkbox" name="pcdFamilia" value="visual" /> Deficiência visual</label>
                            <label className="opcao-item"><input type="checkbox" name="pcdFamilia" value="tgd" /> Transtorno Global de Desenvolvimento</label>
                            <label className="opcao-item"><input type="checkbox" name="pcdFamilia" value="fisica" /> Deficiência física</label>
                        </div>
                    </div>

                    <div className="campo-formulario">
                        <label>Há pessoas com alguma doença grave ou crônica na sua família? *</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item"><input type="checkbox" name="doencaFamilia" value="nenhuma" /><span className="custom-checkbox"></span> Não há pessoas com nenhuma dessas doenças na minha família</label>
                            <label className="opcao-item"><input type="checkbox" name="doencaFamilia" value="tuberculose" /> Tuberculose ativa</label>
                            <label className="opcao-item"><input type="checkbox" name="doencaFamilia" value="hanseniase" /> Hanseníase</label>
                            <label className="opcao-item"><input type="checkbox" name="doencaFamilia" value="alienacao_mental" /> Transtorno mental grave/alienação mental</label>
                            <label className="opcao-item"><input type="checkbox" name="doencaFamilia" value="cancer" /> Neoplasia maligna (câncer)</label>
                            <label className="opcao-item"><input type="checkbox" name="doencaFamilia" value="cegueira" /> Cegueira</label>
                            <label className="opcao-item"><input type="checkbox" name="doencaFamilia" value="paralisia" /> Paralisia irreversível e incapacitante</label>
                            <label className="opcao-item"><input type="checkbox" name="doencaFamilia" value="cardiopatia" /> Cardiopatia grave</label>
                            <label className="opcao-item"><input type="checkbox" name="doencaFamilia" value="parkinson" /> Doença de Parkinson</label>
                            <label className="opcao-item"><input type="checkbox" name="doencaFamilia" value="aids" /> AIDS</label>
                            <label className="opcao-item"><input type="checkbox" name="doencaFamilia" value="esclerose" /> Esclerose múltipla</label>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="campo-formulario">
                        <label>Qual é o tipo de sua moradia? *</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item"><input type="radio" name="tipoMoradia" value="alugada_financiada" required /><span className="custom-radio"></span> Alugada ou financiada</label>
                            <label className="opcao-item"><input type="radio" name="tipoMoradia" value="propria_cedida" /><span className="custom-radio"></span> Própria ou cedida</label>
                        </div>
                    </div>
                </section>

                <button type="submit" className="btn-enviar">ir para etapa 3</button>
            </form>
        </div>
    );
};

export default EstruturadoFormularioSocioeconomico;