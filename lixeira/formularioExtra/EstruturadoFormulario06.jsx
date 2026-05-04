const EstruturadoFormularioSocioeconomico = ({ setNumeroEtapa }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        setNumeroEtapa(6);
    };

    return (
        <div className="container-formulario">
            <form className="formulario-inscricao" onSubmit={handleSubmit}>
                <section>
                    <div className="cabecalho-verde">
                        <h3>Cursos na modalidade Superior</h3>
                    </div>

                    <div className="campo-formulario">
                        <label>Em qual curso voce esta estudando no ifac? *</label>
                        <div className="opcoes-grupo">
                            <label className="opcao-item"><input type="radio" name="qtdDisciplinas" value="uma" required /><span className="custom-radio"></span> Em apenas uma</label>
                            <label className="opcao-item"><input type="radio" name="qtdDisciplinas" value="duas" /><span className="custom-radio"></span> Em duas disciplinas</label>
                            <label className="opcao-item"><input type="radio" name="qtdDisciplinas" value="mais_duas" /><span className="custom-radio"></span> Em mais de duas disciplinas</label>
                            <label className="opcao-item"><input type="radio" name="qtdDisciplinas" value="tcc" /><span className="custom-radio"></span> Apenas em fase de elaboração de TCC</label>
                            <label className="opcao-item"><input type="radio" name="qtdDisciplinas" value="estagio" /><span className="custom-radio"></span> Apenas fazendo estágio curricular</label>
                        </div>
                    </div>
                </section>

                <button type="submit" className="btn-enviar">ir para etapa 4</button>
            </form>
        </div>
    );
};

export default EstruturadoFormularioSocioeconomico;