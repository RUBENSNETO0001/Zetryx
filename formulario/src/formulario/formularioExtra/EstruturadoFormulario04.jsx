const EstruturadoFormularioBancario = ({ setNumeroEtapa }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        setNumeroEtapa(4);
    };

    return (
        <div className="container-formulario">
            <form className="formulario-inscricao" onSubmit={handleSubmit}>
                <section>
                    <div className="cabecalho-verde">
                        <h3>DADOS BANCÁRIOS</h3>
                        <p>Conta Corrente ou Poupança em seu nome</p>
                    </div>

                    <div className="campo-formulario">
                        <label>Possui conta bancária? *</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item">
                                <input type="radio" name="possuiConta" value="sim" required />
                                <span className="custom-radio"></span> Sim
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="possuiConta" value="nao" />
                                <span className="custom-radio"></span> Não
                            </label>
                        </div>
                    </div>
                    <div className="campo-formulario">
                        <label>Nome do Banco</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item">
                                <input type="radio" name="nomeBanco" value="001" />
                                <span className="custom-radio"></span> 001 - Banco do Brasil
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="nomeBanco" value="104" />
                                <span className="custom-radio"></span> 104 - Caixa Econômica Federal
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="nomeBanco" value="237" />
                                <span className="custom-radio"></span> 237 - Bradesco
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="nomeBanco" value="260" />
                                <span className="custom-radio"></span> 260- Nubank
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="nomeBanco" value="077" />
                                <span className="custom-radio"></span> 077- Inter
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="nomeBanco" value="outro" />
                                <span className="custom-radio"></span> Outro:
                                <input type="text" className="input-texto-linha" placeholder="Especifique" />
                            </label>
                        </div>
                    </div>
                    <div className="campo-formulario">
                        <label>Tipo de Conta</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item">
                                <input type="radio" name="tipoConta" value="corrente" />
                                <span className="custom-radio"></span> Corrente
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="tipoConta" value="poupanca" />
                                <span className="custom-radio"></span> Poupança
                            </label>
                        </div>
                    </div>
                    <div className="campo-formulario">
                        <label>Variação da Poupança (caso tenha marcado "Poupança" na questão anterior)</label>
                        <input type="text" name="variacaoPoupanca" className="input-texto-linha" placeholder="Ex: 1288" />
                    </div>
                    <div className="campo-formulario">
                        <label>Número da Agência</label>
                        <input type="text" name="numeroAgencia" className="input-texto-linha" />
                    </div>
                    <div className="campo-formulario">
                        <label>
                            Número da Conta (no caso de Poupança BB, informar exatamente como está no contrato, iniciando com 510 ou 960)
                        </label>
                        <input type="text" name="numeroConta" className="input-texto-linha" />
                    </div>
                </section>

                
                <button type="submit" className="btn-enviar">ir para etapa 3</button>
            </form>
        </div>
    );
};

export default EstruturadoFormularioBancario;