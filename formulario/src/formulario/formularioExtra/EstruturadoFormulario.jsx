function EstruturadoFormulario({ setNumeroEtapa }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Início da inscrição. Verifique sua caixa de email para acompanhar o processo.");
        setNumeroEtapa(1);
    };

    return (
        <div className="container-formulario">
            <form onSubmit={handleSubmit} className="formulario-inscricao">
                
                <section>
                    <h3>Informações de Contato</h3>
                    <div className="campo-formulario">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="seu.email@exemplo.com"
                            required
                        />
                    </div>
                </section>

                <hr />

                <section>
                    <h3>Modalidade</h3>
                    <div className="campo-formulario">
                        <label className="label-principal">Selecione a modalidade de auxílio pretendida:</label>
                        
                        <div className="opcoes-grupo">
                            <label className="opcao-item">
                                <input type="radio" name="auxilio" value="permanencia" required />
                                <span className="custom-radio"></span>
                                Auxílio Permanência
                            </label>

                            <label className="opcao-item">
                                <input type="radio" name="auxilio" value="transporte" />
                                <span className="custom-radio"></span>
                                Auxílio Transporte
                            </label>

                            <label className="opcao-item">
                                <input type="radio" name="auxilio" value="ambos" />
                                <span className="custom-radio"></span>
                                Ambos (Permanência e Transporte)
                            </label>
                        </div>
                    </div>
                </section>

                <div className="container-btn">
                    <button type="submit" className="btn-enviar">
                        Começa inscrição
                    </button>
                </div>
                
            </form>
        </div>
    );
}

export default EstruturadoFormulario;