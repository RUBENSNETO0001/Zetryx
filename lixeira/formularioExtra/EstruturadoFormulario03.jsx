const EstruturadoFormulario = ({ setNumeroEtapa }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        setNumeroEtapa(3);
    };

    return (
        <div className="container-formulario">
            <form className="formulario-inscricao" onSubmit={handleSubmit}>
                <section>
                    <div className="cabecalho-verde">
                        <h3>Informações primarias</h3>
                        <p>É necessário <strong>atender e comprovar</strong> pelo menos uma das condições descritas nesta seção.</p>
                    </div>
                    <div className="campo-formulario">
                        <label>Em qual tipo de escola você estudava antes de vim para o Ifac? *</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item">
                                <input type="radio" name="tipoEscola" value="publica" required />
                                <span className="custom-radio"></span> Pública
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="tipoEscola" value="particular_bolsa" />
                                <span className="custom-radio"></span> Particular com bolsa
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="tipoEscola" value="particular" />
                                <span className="custom-radio"></span> Particular
                            </label>
                        </div>
                    </div>
                    <div className="campo-formulario">
                        <label>Está matriculado nas vagas para pretos e pardos (Lei de cotas)? *</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item">
                                <input type="radio" name="leiCotas" value="sim" required />
                                <span className="custom-radio"></span> Sim
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="leiCotas" value="nao" />
                                <span className="custom-radio"></span> Não
                            </label>
                        </div>
                    </div>
                    <div className="campo-formulario">
                        <label>Possui renda per capita (por pessoa) familiar de até um salário mínimo? *</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item">
                                <input type="radio" name="rendaMinima" value="sim" required />
                                <span className="custom-radio"></span> Sim
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="rendaMinima" value="nao" />
                                <span className="custom-radio"></span> Não
                            </label>
                        </div>
                    </div>
                    <div className="campo-formulario">
                        <label>Possui deficiência e necessita de acompanhamento pedagógico para que consiga permanecer estudando? *</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item">
                                <input type="radio" name="pcdAcompanhamento" value="sim" required />
                                <span className="custom-radio"></span> Sim
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="pcdAcompanhamento" value="nao" />
                                <span className="custom-radio"></span> Não
                            </label>
                        </div>
                    </div>
                    <div className="campo-formulario">
                        <label>É de origem quilombola, indígena ou de comunidades tradicionais? *</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item">
                                <input type="radio" name="origemTradicional" value="sim" required />
                                <span className="custom-radio"></span> Sim
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="origemTradicional" value="nao" />
                                <span className="custom-radio"></span> Não
                            </label>
                        </div>
                    </div>
                    <div className="campo-formulario">
                        <label>É estrangeiro (nascido em outro país) em situação de vulnerabilidade socioeconômica ou refugiado? *</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item">
                                <input type="radio" name="estrangeiroRefugiado" value="sim" required />
                                <span className="custom-radio"></span> Sim
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="estrangeiroRefugiado" value="nao" />
                                <span className="custom-radio"></span> Não
                            </label>
                        </div>
                    </div>
                </section>

                <button type="submit" className="btn-enviar">ir para etapa 3</button>
            </form>
        </div>
    );
};

export default EstruturadoFormulario;