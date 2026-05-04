const finalizarFormulario = () => {
    return (
        <section className="secao-termo">
            <div className="cabecalho-termo">
                <h3>TERMO DE COMPROMISSO</h3>
                <p>(Leia com atenção os compromissos assumidos abaixo, uma vez que realize a inscrição no edital de auxílio permanência)</p>
            </div>

            <div className="corpo-termo">
                <p>
                    Assumo perante ao Instituto Federal de Educação, Ciência e Tecnologia do Acre - Ifac,
                    que declarei as informações corretas no momento da minha inscrição e COMPROMETO-ME a:
                </p>

                <ul className="lista-compromissos">
                    <li><strong>I –</strong> Ter frequência igual ou superior a definida pela instituição.</li>
                    <li><strong>II –</strong> Buscar evolução de meu desempenho acadêmico.</li>
                    <li><strong>III –</strong> Informar à Equipe de Assistência Estudantil do Campus qualquer alteração sobre minha situação socioeconômica durante todo período de recebimento do auxílio.</li>
                    <li><strong>IV –</strong> Sempre que necessário, responder às pesquisas de acompanhamento e avaliação realizadas pela Dsaes.</li>
                    <li><strong>V –</strong> Participar, sempre que solicitado, das reuniões de acompanhamento do programa.</li>
                </ul>
            </div>

            {/* Checkbox de Aceite */}
            <div className="campo-formulario">
                <label className="opcao-item">
                    <input type="checkbox" name="aceiteTermo" required />
                    <span className="custom-checkbox"></span>
                    Li e concordo com os termos acima mencionados. *
                </label>
            </div>
        </section>
    );
}
export default finalizarFormulario;