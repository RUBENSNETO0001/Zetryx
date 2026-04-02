function EstruturadoFormulario({setNumeroEtapa}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dados = Object.fromEntries(formData);
        console.log("Dados do formulário:", dados);
        alert("Formulário enviado com sucesso! Verifique o console para os dados.");
        setNumeroEtapa(1);
    };

    return (
        <>
            <div className='formulario'>
                <h2>Formulário de Inscrição</h2>
                <form onSubmit={handleSubmit} className="formulario-inscricao">
                    
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

                    <div className="campo-selecao">
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

                    <div className="container-btn">
                        <button type="submit" className="btn-enviar">
                            Enviar Inscrição
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
export default EstruturadoFormulario;