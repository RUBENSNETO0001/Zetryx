import { useState } from 'react';
import './FormularioCompleto.css';
// DADOS DE ETAPAS
const ETAPAS = [
  'Início',
  'Dados Pessoais',
  'Critérios',
  'Banco',
  'Socioeconômico',
  'Curso',
  'Termo',
];

// COMPONENTE: Barra de Progresso
function BarraProgresso({ etapa }) {
  const total = ETAPAS.length;
  const pct = Math.round((etapa / (total - 1)) * 100);
  return (
    <div className="barra-progresso-container">
      <div className="barra-progresso-label">
        <span>{ETAPAS[etapa]}</span>
        <span>Etapa {etapa + 1} de {total}</span>
      </div>
      <div className="barra-progresso-trilho">
        <div className="barra-progresso-preenchimento" style={{ width: `${pct}%` }} />
      </div>
      <div className="etapas-indicador">
        {ETAPAS.map((nome, i) => (
          <div
            key={i}
            className={`etapa-ponto ${i === etapa ? 'ativa' : i < etapa ? 'feita' : ''}`}
            title={nome}
          >
            {i < etapa ? '✓' : i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

// ETAPA 0 – Início / Modalidade

function Etapa0({ avancar }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Início da inscrição. Verifique sua caixa de email para acompanhar o processo.');
    avancar();
  };
  return (
    <form onSubmit={handleSubmit} className="formulario-inscricao">
      <section>
        <h3>Informações de Contato</h3>
        <div className="campo-formulario">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="seu.email@exemplo.com" required />
        </div>
      </section>
      <hr />
      <section>
        <h3>Modalidade</h3>
        <div className="campo-formulario">
          <label className="label-principal">Selecione a modalidade de auxílio pretendida:</label>
          <div className="opcoes-grupo">
            {[
              ['permanencia', 'Auxílio Permanência'],
              ['transporte', 'Auxílio Transporte'],
              ['ambos', 'Ambos (Permanência e Transporte)'],
            ].map(([val, label]) => (
              <label key={val} className="opcao-item">
                <input type="radio" name="auxilio" value={val} required />
                {label}
              </label>
            ))}
          </div>
        </div>
      </section>
      <button type="submit" className="btn-enviar">Começar inscrição →</button>
    </form>
  );
}

// ETAPA 1 – Dados Pessoais + Endereço

function Etapa1({ avancar }) {
  const handleSubmit = (e) => { e.preventDefault(); avancar(); };
  return (
    <form onSubmit={handleSubmit} className="formulario-inscricao">
      <section>
        <h3>Dados Pessoais</h3>
        <div className="campo-formulario">
          <label htmlFor="nome">Nome Completo</label>
          <input type="text" id="nome" name="nome" placeholder="Seu nome completo" required />
        </div>
        <div className="campo-formulario">
          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required />
        </div>
        <div className="campo-formulario">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input type="date" id="dataNascimento" name="dataNascimento" required />
        </div>
        <div className="campo-formulario">
          <label>Estado civil:</label>
          <div className="opcoes-grupo">
            {['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'União Estável'].map((e) => (
              <label key={e} className="opcao-item">
                <input type="radio" name="estadoCivil" value={e.toLowerCase()} /> {e}
              </label>
            ))}
            <label className="opcao-item">
              <input type="radio" name="estadoCivil" value="outro" />
              Outro:
              <input type="text" name="estadoCivilOutro" className="input-inline" />
            </label>
          </div>
        </div>
        <div className="campo-formulario">
          <label>Concorre às vagas destinadas às pessoas com deficiência?</label>
          <div className="opcoes-grupo">
            <label className="opcao-item"><input type="radio" name="pcd" value="sim" /> Sim</label>
            <label className="opcao-item"><input type="radio" name="pcd" value="nao" /> Não</label>
          </div>
        </div>
        <div className="campo-formulario">
          <label htmlFor="telefone">Telefone para contato</label>
          <input type="tel" id="telefone" name="telefone" placeholder="(68) 99999-9999" />
        </div>
      </section>
      <hr />
      <section>
        <h3>Endereço</h3>
        {[
          ['cidade', 'text', 'Sua cidade', 'Rio Branco', true],
          ['rua', 'text', 'Rua', 'Nome da rua', true],
          ['numero', 'text', 'Número', 'Ex: 123', true],
          ['bairro', 'text', 'Bairro', 'Seu bairro', true],
          ['complemento', 'text', 'Complemento', 'Apto, Bloco, etc.', false],
          ['cep', 'text', 'CEP', '69900-000', true],
        ].map(([id, type, label, ph, req]) => (
          <div className="campo-formulario" key={id}>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={id} placeholder={ph} required={req} />
          </div>
        ))}
      </section>
      <button type="submit" className="btn-enviar">Próxima etapa →</button>
    </form>
  );
}

// ETAPA 2 – Critérios de Elegibilidade
function Etapa2({ avancar }) {
  const handleSubmit = (e) => { e.preventDefault(); avancar(); };
  const perguntas = [
    {
      name: 'tipoEscola', label: 'Em qual tipo de escola você estudava antes de vir para o Ifac?',
      opcoes: [['publica', 'Pública'], ['particular_bolsa', 'Particular com bolsa'], ['particular', 'Particular']]
    },
    {
      name: 'leiCotas', label: 'Está matriculado nas vagas para pretos e pardos (Lei de cotas)?',
      opcoes: [['sim', 'Sim'], ['nao', 'Não']]
    },
    {
      name: 'rendaMinima', label: 'Possui renda per capita familiar de até um salário mínimo?',
      opcoes: [['sim', 'Sim'], ['nao', 'Não']]
    },
    {
      name: 'pcdAcompanhamento', label: 'Possui deficiência e necessita de acompanhamento pedagógico?',
      opcoes: [['sim', 'Sim'], ['nao', 'Não']]
    },
    {
      name: 'origemTradicional', label: 'É de origem quilombola, indígena ou de comunidades tradicionais?',
      opcoes: [['sim', 'Sim'], ['nao', 'Não']]
    },
    {
      name: 'estrangeiroRefugiado', label: 'É estrangeiro em situação de vulnerabilidade socioeconômica ou refugiado?',
      opcoes: [['sim', 'Sim'], ['nao', 'Não']]
    },
  ];
  return (
    <form onSubmit={handleSubmit} className="formulario-inscricao">
      <section>
        <div className="cabecalho-verde">
          <h3>Informações primárias</h3>
          <p>É necessário <strong>atender e comprovar</strong> pelo menos uma das condições descritas nesta seção.</p>
        </div>
        {perguntas.map(({ name, label, opcoes }) => (
          <div className="campo-formulario" key={name}>
            <label>{label} *</label>
            <div className="opcoes-grupo">
              {opcoes.map(([val, txt]) => (
                <label key={val} className="opcao-item">
                  <input type="radio" name={name} value={val} required /> {txt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </section>
      <button type="submit" className="btn-enviar">Próxima etapa →</button>
    </form>
  );
}

// ETAPA 3 – Dados Bancários
function Etapa3({ avancar }) {
  const handleSubmit = (e) => { e.preventDefault(); avancar(); };
  const bancos = [
    ['001', '001 – Banco do Brasil'],
    ['104', '104 – Caixa Econômica Federal'],
    ['237', '237 – Bradesco'],
    ['260', '260 – Nubank'],
    ['077', '077 – Inter'],
  ];
  return (
    <form onSubmit={handleSubmit} className="formulario-inscricao">
      <section>
        <div className="cabecalho-verde">
          <h3>Dados Bancários</h3>
          <p>Conta Corrente ou Poupança em seu nome</p>
        </div>
        <div className="campo-formulario">
          <label>Possui conta bancária? *</label>
          <div className="opcoes-grupo">
            <label className="opcao-item"><input type="radio" name="possuiConta" value="sim" required /> Sim</label>
            <label className="opcao-item"><input type="radio" name="possuiConta" value="nao" /> Não</label>
          </div>
        </div>
        <div className="campo-formulario">
          <label>Nome do Banco</label>
          <div className="opcoes-grupo">
            {bancos.map(([val, txt]) => (
              <label key={val} className="opcao-item"><input type="radio" name="nomeBanco" value={val} /> {txt}</label>
            ))}
            <label className="opcao-item">
              <input type="radio" name="nomeBanco" value="outro" /> Outro:
              <input type="text" className="input-inline" placeholder="Especifique" />
            </label>
          </div>
        </div>
        <div className="campo-formulario">
          <label>Tipo de Conta</label>
          <div className="opcoes-grupo">
            <label className="opcao-item"><input type="radio" name="tipoConta" value="corrente" /> Corrente</label>
            <label className="opcao-item"><input type="radio" name="tipoConta" value="poupanca" /> Poupança</label>
          </div>
        </div>
        <div className="campo-formulario">
          <label>Variação da Poupança (se aplicável)</label>
          <input type="text" name="variacaoPoupanca" className="input-texto-linha" placeholder="Ex: 1288" />
        </div>
        <div className="campo-formulario">
          <label>Número da Agência</label>
          <input type="text" name="numeroAgencia" className="input-texto-linha" />
        </div>
        <div className="campo-formulario">
          <label>Número da Conta (para Poupança BB, informar como está no contrato)</label>
          <input type="text" name="numeroConta" className="input-texto-linha" />
        </div>
      </section>
      <button type="submit" className="btn-enviar">Próxima etapa →</button>
    </form>
  );
}

// ETAPA 4 – Dados Socioeconômicos
function Etapa4({ avancar }) {
  const handleSubmit = (e) => { e.preventDefault(); avancar(); };
  return (
    <form onSubmit={handleSubmit} className="formulario-inscricao">
      <section>
        <div className="cabecalho-verde">
          <h3>Dados Socioeconômicos</h3>
          <p> Seus dados socioeconômicos são importantes para a análise da sua situação e para a definição de possíveis apoios. </p>
        </div>

        <div className="campo-formulario">
          <label>Em quantas disciplinas você está matriculado? *</label>
          <div className="opcoes-grupo">
            {[['uma', 'Em apenas uma'], ['duas', 'Em duas disciplinas'], ['mais_duas', 'Em mais de duas disciplinas'],
            ['tcc', 'Apenas em fase de elaboração de TCC'], ['estagio', 'Apenas fazendo estágio curricular']].map(([v, t]) => (
              <label key={v} className="opcao-item"><input type="radio" name="qtdDisciplinas" value={v} required /> {t}</label>
            ))}
          </div>
        </div>

        <div className="campo-formulario">
          <label>Você recebe algum auxílio ou bolsa no Ifac? *</label>
          <div className="opcoes-grupo">
            <label className="opcao-item"><input type="radio" name="recebeAuxilio" value="nao" required /> Não</label>
            <label className="opcao-item"><input type="radio" name="recebeAuxilio" value="sim" /> Sim</label>
          </div>
        </div>

        <div className="campo-formulario">
          <label>Se sim, informe qual(is) auxílio(s):</label>
          <div className="opcoes-grupo">
            {[['extensao', 'Bolsa de extensão'], ['pesquisa', 'Bolsa de pesquisa'], ['pibid', 'PIBID'],
            ['residencia', 'Residência pedagógica'], ['monitoria', 'Monitoria'],
            ['ensino', 'Bolsa de Projeto de Ensino'], ['pe-de-meia', 'Pé-de-meia']].map(([v, t]) => (
              <label key={v} className="opcao-item"><input type="checkbox" name="tipoBolsa" value={v} /> {t}</label>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="informativo-texto">
          <p><strong>Responda sobre sua situação familiar</strong></p>
          <p>Entende-se por Grupo Familiar as pessoas que residem em um mesmo domicílio e se mantêm pela contribuição de seus membros, incluindo você.</p>
        </div>

        <div className="campo-formulario">
          <label>Há pessoas com deficiência na sua família? *</label>
          <div className="opcoes-grupo">
            {[['nenhuma', 'Não há pessoas com deficiência na minha família'], ['intelectual', 'Deficiência intelectual'],
            ['auditiva', 'Deficiência auditiva'], ['visual', 'Deficiência visual'],
            ['tgd', 'Transtorno Global de Desenvolvimento'], ['fisica', 'Deficiência física']].map(([v, t]) => (
              <label key={v} className="opcao-item"><input type="checkbox" name="pcdFamilia" value={v} /> {t}</label>
            ))}
          </div>
        </div>

        <div className="campo-formulario">
          <label>Há pessoas com alguma doença grave ou crônica na sua família? *</label>
          <div className="opcoes-grupo">
            {[['nenhuma', 'Nenhuma'], ['tuberculose', 'Tuberculose ativa'], ['hanseniase', 'Hanseníase'],
            ['alienacao_mental', 'Transtorno mental grave'], ['cancer', 'Neoplasia maligna (câncer)'],
            ['cegueira', 'Cegueira'], ['paralisia', 'Paralisia irreversível'], ['cardiopatia', 'Cardiopatia grave'],
            ['parkinson', 'Doença de Parkinson'], ['aids', 'AIDS'], ['esclerose', 'Esclerose múltipla']].map(([v, t]) => (
              <label key={v} className="opcao-item"><input type="checkbox" name="doencaFamilia" value={v} /> {t}</label>
            ))}
          </div>
        </div>

        <div className="campo-formulario">
          <label>Qual é o tipo de sua moradia? *</label>
          <div className="opcoes-grupo">
            <label className="opcao-item"><input type="radio" name="tipoMoradia" value="alugada_financiada" required /> Alugada ou financiada</label>
            <label className="opcao-item"><input type="radio" name="tipoMoradia" value="propria_cedida" /> Própria ou cedida</label>
          </div>
        </div>

        <div className="campo-formulario">
          <label>Mora em: *</label>
          <div className="opcoes-grupo">
            <label className="opcao-item"><input type="radio" name="zonaResidencia" value="urbana" required /> Zona urbana</label>
            <label className="opcao-item"><input type="radio" name="zonaResidencia" value="rural" /> Zona rural</label>
          </div>
        </div>

        <div className="campo-formulario">
          <label>Sua família é beneficiária do Bolsa Família ou inscrita no Cadúnico? *</label>
          <div className="opcoes-grupo">
            <label className="opcao-item"><input type="radio" name="bolsaFamilia" value="sim" required /> Sim</label>
            <label className="opcao-item"><input type="radio" name="bolsaFamilia" value="nao" /> Não</label>
          </div>
        </div>

        <div className="campo-formulario">
          <label>Sua família é beneficiária do BPC (Benefício de Prestação Continuada)? *</label>
          <div className="opcoes-grupo">
            <label className="opcao-item"><input type="radio" name="beneficioBpc" value="sim" required /> Sim</label>
            <label className="opcao-item"><input type="radio" name="beneficioBpc" value="nao" /> Não</label>
          </div>
        </div>

        <div className="campo-formulario">
          <label>Qual a renda bruta TOTAL da família neste momento? (Apenas valor inteiro) *</label>
          <input type="number" name="rendaBruta" placeholder="0" required className="input-linha" />
        </div>

        <div className="campo-formulario">
          <label>Quantas pessoas moram na sua casa (incluindo você)? *</label>
          <input type="number" name="qtdPessoas" placeholder="1" required className="input-linha" />
        </div>

        <div className="campo-formulario">
          <label>Descreva as informações de cada pessoa (Nome, parentesco, idade, profissão, vínculo e renda): *</label>
          <textarea name="descricaoFamiliar" placeholder="Ex: Fulano de tal, irmão, 22 anos, pedreiro, CLT, R$ 2.000" required className="textarea-linha" />
        </div>
      </section>
      <button type="submit" className="btn-enviar">Próxima etapa →</button>
    </form>
  );
}

// ETAPA 5 – Curso Superior
function Etapa5({ avancar }) {
  const handleSubmit = (e) => { e.preventDefault(); avancar(); };
  return (
    <form onSubmit={handleSubmit} className="formulario-inscricao">
      <section>
        <div className="cabecalho-verde"><h3>Cursos na modalidade Superior</h3></div>
        <div className="campo-formulario">
          <label>Em qual curso você está estudando no Ifac? *</label>
          <div className="opcoes-grupo">
            {[['uma', 'Em apenas uma disciplina'], ['duas', 'Em duas disciplinas'],
            ['mais_duas', 'Em mais de duas disciplinas'],
            ['tcc', 'Apenas em fase de elaboração de TCC'],
            ['estagio', 'Apenas fazendo estágio curricular']].map(([v, t]) => (
              <label key={v} className="opcao-item"><input type="radio" name="cursoSuperior" value={v} required /> {t}</label>
            ))}
          </div>
        </div>
      </section>
      <button type="submit" className="btn-enviar">Próxima etapa →</button>
    </form>
  );
}

// ETAPA 6 – Termo de Compromisso
function Etapa6({ avancar }) {
  const handleSubmit = (e) => { e.preventDefault(); avancar(); };
  return (
    <form onSubmit={handleSubmit} className="formulario-inscricao">
      <section className="secao-termo">
        <div className="cabecalho-termo">
          <h3>Termo de Compromisso</h3>
          <p>Leia com atenção os compromissos assumidos abaixo antes de concluir a inscrição.</p>
        </div>
        <div className="corpo-termo">
          <p>Assumo perante ao Instituto Federal de Educação, Ciência e Tecnologia do Acre – Ifac, que declarei as informações corretas no momento da minha inscrição e COMPROMETO-ME a:</p>
          <ul className="lista-compromissos">
            <li><strong>I –</strong> Ter frequência igual ou superior à definida pela instituição.</li>
            <li><strong>II –</strong> Buscar evolução do meu desempenho acadêmico.</li>
            <li><strong>III –</strong> Informar à Equipe de Assistência Estudantil qualquer alteração sobre minha situação socioeconômica durante todo o período de recebimento do auxílio.</li>
            <li><strong>IV –</strong> Sempre que necessário, responder às pesquisas de acompanhamento e avaliação realizadas pela Dsaes.</li>
            <li><strong>V –</strong> Participar, sempre que solicitado, das reuniões de acompanhamento do programa.</li>
          </ul>
        </div>
        <div className="campo-formulario">
          <label className="opcao-item">
            <input type="checkbox" name="aceiteTermo" required />
            Li e concordo com os termos acima mencionados. *
          </label>
        </div>
      </section>
      <button type="submit" className="btn-enviar">Concluir inscrição ✓</button>
    </form>
  );
}

// TELA DE SUCESSO
function TelaSucesso() {
  return (
    <div className="tela-sucesso">
      <div className="icone-sucesso">✅</div>
      <h2>Inscrição realizada com sucesso!</h2>
      <p>Sua inscrição foi enviada. Verifique sua caixa de e-mail para acompanhar o processo.</p>
    </div>
  );
}

// COMPONENTE RAIZ
export default function Formulario() {
  const [etapa, setEtapa] = useState(-1); 
  const avancar = () => setEtapa((e) => e + 1);

  const etapas = [
    <Etapa0 avancar={avancar} />,
    <Etapa1 avancar={avancar} />,
    <Etapa2 avancar={avancar} />,
    <Etapa3 avancar={avancar} />,
    <Etapa4 avancar={avancar} />,
    <Etapa5 avancar={avancar} />,
    <Etapa6 avancar={avancar} />,
  ];

  return (
    <>
      <div className="formulario-wrapper">

        {/* Cabeçalho */}
        <header className="cabecalho-principal">
          <h1>Formulário Naes – IFAC</h1>
          <div className="alerta-importante">
            <h2>Informação Importante</h2>
            <p>Leia atentamente as diretrizes antes de prosseguir.</p>
          </div>
        </header>

        {/* Informativo inicial */}
        {etapa === -1 && (
          <>
            <div className="conteudo-informativo">
              <p>Caro estudante,</p>
              <p>
                Conforme <strong>Edital nº 02/2026/DSAES/Ifac</strong>, este questionário tem como objetivo
                selecionar discentes para serem atendidos pelo Auxílio Permanência e Auxílio Transporte
                Intermunicipal do Ifac para o <strong>campus Rio Branco</strong>.
              </p>
              <div className="aviso-legal">
                <p>
                  Todas as perguntas devem ser respondidas com total responsabilidade com a veracidade das
                  informações, considerando o <strong>Decreto-Lei nº 2.848/40, Art. 299</strong>. Informações
                  falsas podem prejudicar outras pessoas em situação mais vulnerável.
                </p>
              </div>
            </div>
            <div className="container-formulario">
              <div className="formulario-inscricao" style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 40 }}>
                <p style={{ marginBottom: 24, color: 'var(--texto-leve)', fontSize: '.9rem' }}>
                  Clique no botão abaixo para iniciar o formulário de inscrição.
                </p>
                <button className="btn-enviar" style={{ display: 'inline-block', marginTop: 0 }} onClick={avancar}>
                  Iniciar formulário →
                </button>
              </div>
            </div>
          </>
        )}

        {/* Barra de progresso + etapas */}
        {etapa >= 0 && etapa < etapas.length && (
          <>
            <BarraProgresso etapa={etapa} />
            <div className="container-formulario">
              {etapas[etapa]}
            </div>
          </>
        )}

        {/* Sucesso */}
        {etapa >= etapas.length && <TelaSucesso />}
      </div>
    </>
  );
}
