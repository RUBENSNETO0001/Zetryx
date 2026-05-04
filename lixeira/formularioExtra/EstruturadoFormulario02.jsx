const EstruturadoFormulario = ({ setNumeroEtapa }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        setNumeroEtapa(2);
    };
    return (
        <div className="container-formulario">

            <form onSubmit={handleSubmit} className="formulario-inscricao">
                <section>
                    <h3>Dados Pessoais</h3>

                    <div className="campo-formulario">
                        <label htmlFor="nome">Nome Completo</label>
                        <input type="text" id="nome" name="nome" placeholder="Seu nome completo" required />
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="cpf">Informe seu CPF</label>
                        <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required />
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="dataNascimento">Data de Nascimento:</label>
                        <input type="date" id="dataNascimento" name="dataNascimento" required />
                    </div>

                    <div className="campo-formulario">
                        <label>Estado civil:</label>
                        <div className="opcoes-grupo">
                            {['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'União Estável'].map((estado) => (
                                <label key={estado} className="opcao-item">
                                    <input type="radio" name="estadoCivil" value={estado.toLowerCase()} />
                                    <span className="custom-radio"></span>
                                    {estado}
                                </label>
                            ))}
                            <label className="opcao-item">
                                <input type="radio" name="estadoCivil" value="outro" />
                                <span className="custom-radio"></span>
                                Outro:
                                <input type="text" name="estadoCivilOutro" className="input-inline" />
                            </label>
                        </div>
                    </div>

                    <div className="campo-formulario">
                        <label>Concorre às vagas destinadas às pessoas com deficiência?</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item">
                                <input type="radio" name="pcd" value="sim" />
                                <span className="custom-radio"></span>
                                Sim
                            </label>
                            <label className="opcao-item">
                                <input type="radio" name="pcd" value="nao" />
                                <span className="custom-radio"></span>
                                Não
                            </label>
                        </div>
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="telefone">Telefone para contato:</label>
                        <input type="tel" id="telefone" name="telefone" placeholder="(68) 99999-9999" />
                    </div>
                </section>

                <hr />

                <section>
                    <h3>Endereço</h3>
                    <div className="campo-formulario">
                        <label htmlFor="cidade">Sua cidade:</label>
                        <input type="text" id="cidade" name="cidade" placeholder="Rio Branco" required />
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="rua">Rua</label>
                        <input type="text" id="rua" name="rua" placeholder="Nome da rua" required />
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="numero">Número</label>
                        <input type="text" id="numero" name="numero" placeholder="Ex: 123" required />
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" id="bairro" name="bairro" placeholder="Seu bairro" required />
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="complemento">Complemento</label>
                        <input type="text" id="complemento" name="complemento" placeholder="Apto, Bloco, etc." />
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" id="cep" name="cep" placeholder="69900-000" required />
                    </div>
                </section>

                <button type="submit" className="btn-enviar">ir para etapa 2</button>
            </form>
        </div>
    );
};

export default EstruturadoFormulario;