import { useState } from 'react'
import './css/header_form.css'
import './css/main_form.css'
import Form_01 from './formularioExtra/EstruturadoFormulario.jsx'
import Form_02 from './formularioExtra/EstruturadoFormulario02.jsx'
import Form_03 from './formularioExtra/EstruturadoFormulario03.jsx'
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
                <footer>
                    <h1>Formulário de Inscrição</h1>
                    <p>Preencha o formulário abaixo para se inscrever no evento.</p>
                </footer>
            </div>
        </>
    )
}

function Formularios() {
    const [numeroEtapa, setNumeroEtapa] = useState(0);
    return (
        <>
            <div className='formulario'>
                {numeroEtapa === 0 && <Form_01 setNumeroEtapa={setNumeroEtapa} />}
                {numeroEtapa === 1 && <Form_02 setNumeroEtapa={setNumeroEtapa} />}
                {numeroEtapa === 2 && <Form_03 setNumeroEtapa={setNumeroEtapa} />}
            </div>
        </>
    )
}

// Componente principal do formulário
function Formulario() {
    return (
        <>
            <div className='formulario'>
                <Informacao_importante />
                <Formularios />
            </div>
        </>
    )
}

export default Formulario