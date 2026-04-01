import { useState } from 'react'
import './css/header_form.css'
import './css/main_form.css'

function Informacao_importante() {
    return (
        <>
            <div className="container-auxilio">
                <header className="cabecalho-principal">
                    <h1>Formulário Naes - Ifac</h1>
                    <div className="alerta-importante">
                        <h2>Informação Importante</h2>
                        <p>Leia atentamente as diretrizes antes de prosseguir.</p>
                    </div>
                </header>

                <main className="conteudo-informativo">
                    <p>Caro estudante,</p>
                    <p>Conforme <strong>Edital nº 02/2026/DSAES/Ifac</strong>, este questionário tem como objetivo selecionar discentes para serem atendidos pelo Auxílio Permanência e Auxílio Transporte Intermunicipal do Ifac para o <strong>campus Rio Branco</strong>.</p>
                    <div className="aviso-legal">
                        <p>Todas as perguntas devem ser respondidas com total responsabilidade com a veracidade das informações, considerando o <strong>Decreto-Lei nº 2.848/40, Art. 299</strong>. Lembre-se que informações falsas podem prejudicar outras pessoas que possam estar em situação socioeconomicamente mais vulnerável.</p>
                    </div>
                </main>
            </div>
        </>
    )
}

function EstruturadoFormulario() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dados = Object.fromEntries(formData);
        console.log("Dados do formulário:", dados);
        alert("Formulário enviado com sucesso! Verifique o console para os dados.");
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

// Componente principal do formulário
function Formulario() {
    return (
        <>
            <div className='formulario'>
                <Informacao_importante />
                <EstruturadoFormulario />
            </div>
        </>
    )
}

export default Formulario