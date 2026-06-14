import { useState, useRef } from 'react';
import './FormularioCompleto.css';

const ETAPAS = [
  'Início',
  'Dados Pessoais',
  'Critérios',
  'Banco',
  'Socioeconômico',
  'Curso',
  'Documentos',
  'Termo',
];

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

function Etapa0({ avancar }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    avancar({
      email: fd.get('email'),
      auxilio: fd.get('auxilio'),
    });
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

function Etapa1({ avancar }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    avancar({
      matricula: fd.get('matricula'),
      nome: fd.get('nome'),
      cpf: fd.get('cpf'),
      dataNascimento: fd.get('dataNascimento'),
      estadoCivil: fd.get('estadoCivil') === 'outro' ? fd.get('estadoCivilOutro') : fd.get('estadoCivil'),
      pcd: fd.get('pcd'),
      telefone: fd.get('telefone'),
      cidade: fd.get('cidade'),
      rua: fd.get('rua'),
      numero: fd.get('numero'),
      bairro: fd.get('bairro'),
      complemento: fd.get('complemento'),
      cep: fd.get('cep'),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-inscricao">
      <section>
        <h3>Dados Pessoais</h3>
        <div className="campo-formulario">
          <label htmlFor="matricula">Matrícula Ifac *</label>
          <input type="text" id="matricula" name="matricula" placeholder="Ex: Codigo da sua matricula" required />
          <span className="campo-dica">Sua matrícula institucional no Ifac</span>
        </div>
        <div className="campo-formulario">
          <label htmlFor="nome">Nome Completo *</label>
          <input type="text" id="nome" name="nome" placeholder="Insira seu nome completo" required />
        </div>
        <div className="campo-formulario">
          <label htmlFor="cpf">CPF *</label>
          <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required />
        </div>
        <div className="campo-formulario">
          <label htmlFor="dataNascimento">Data de Nascimento *</label>
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
          ['cidade', 'text', 'Cidade *', 'Rio Branco', true],
          ['rua', 'text', 'Rua *', 'Nome da rua', true],
          ['numero', 'text', 'Número *', 'Ex: 123', true],
          ['bairro', 'text', 'Bairro *', 'Seu bairro', true],
          ['complemento', 'text', 'Complemento', 'Apto, Bloco, etc.', false],
          ['cep', 'text', 'CEP *', '69900-000', true],
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

function Etapa2({ avancar }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    avancar({
      tipoEscola: fd.get('tipoEscola'),
      leiCotas: fd.get('leiCotas'),
      rendaMinima: fd.get('rendaMinima'),
      pcdAcompanhamento: fd.get('pcdAcompanhamento'),
      origemTradicional: fd.get('origemTradicional'),
      estrangeiroRefugiado: fd.get('estrangeiroRefugiado'),
    });
  };

  const perguntas = [
    {
      name: 'tipoEscola',
      label: 'Em qual tipo de escola você estudava antes de vir para o Ifac?',
      opcoes: [['publica', 'Pública'], ['particular_bolsa', 'Particular com bolsa'], ['particular', 'Particular']],
    },
    {
      name: 'leiCotas',
      label: 'Está matriculado nas vagas para pretos e pardos (Lei de cotas)?',
      opcoes: [['sim', 'Sim'], ['nao', 'Não']],
    },
    {
      name: 'rendaMinima',
      label: 'Possui renda per capita familiar de até um salário mínimo?',
      opcoes: [['sim', 'Sim'], ['nao', 'Não']],
    },
    {
      name: 'pcdAcompanhamento',
      label: 'Possui deficiência e necessita de acompanhamento pedagógico?',
      opcoes: [['sim', 'Sim'], ['nao', 'Não']],
    },
    {
      name: 'origemTradicional',
      label: 'É de origem quilombola, indígena ou de comunidades tradicionais?',
      opcoes: [['sim', 'Sim'], ['nao', 'Não']],
    },
    {
      name: 'estrangeiroRefugiado',
      label: 'É estrangeiro em situação de vulnerabilidade socioeconômica ou refugiado?',
      opcoes: [['sim', 'Sim'], ['nao', 'Não']],
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

function Etapa3({ avancar }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    avancar({
      possuiConta: fd.get('possuiConta'),
      nomeBanco: fd.get('nomeBanco'),
      bancoOutro: fd.get('bancoOutro'),
      tipoConta: fd.get('tipoConta'),
      variacaoPoupanca: fd.get('variacaoPoupanca'),
      numeroAgencia: fd.get('numeroAgencia'),
      numeroConta: fd.get('numeroConta'),
    });
  };

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
              <label key={val} className="opcao-item">
                <input type="radio" name="nomeBanco" value={val} /> {txt}
              </label>
            ))}
            <label className="opcao-item">
              <input type="radio" name="nomeBanco" value="outro" /> Outro:
              <input type="text" name="bancoOutro" className="input-inline" placeholder="Especifique" />
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
          <label>Variação da Poupança <span className="campo-dica-inline">(apenas para Poupança BB)</span></label>
          <input type="text" name="variacaoPoupanca" className="input-texto-linha" placeholder="Ex: 1288" />
        </div>
        <div className="campo-formulario">
          <label>Número da Agência</label>
          <input type="text" name="numeroAgencia" className="input-texto-linha" placeholder="Ex: 111"/>
        </div>
        <div className="campo-formulario">
          <label>Número da Conta <span className="campo-dica-inline">(para Poupança BB, informar como está no contrato)</span></label>
          <input type="text" name="numeroConta" className="input-texto-linha" placeholder="Ex: 12345-6" />
        </div>
      </section>
      <button type="submit" className="btn-enviar">Próxima etapa →</button>
    </form>
  );
}

const MEMBRO_VAZIO = {
  nome: '',
  parentesco: '',
  dataNascimento: '',
  profissao: '',
  vinculo: '',
  renda: '',
  possuiDeficiencia: false,
  possuiDoencaCronica: false,
};

function CardMembro({ index, membro, onChange, onRemover, podRemover }) {
  const handle = (campo) => (e) => {
    const valor = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    onChange(index, campo, valor);
  };

  return (
    <div className="card-membro">
      <div className="card-membro-header">
        <span className="card-membro-titulo">
          {membro.nome.trim() ? membro.nome : `Membro ${index + 1}`}
        </span>
        {podRemover && (
          <button type="button" className="btn-remover-membro" onClick={() => onRemover(index)} aria-label="Remover membro">
            ✕
          </button>
        )}
      </div>
      <div className="card-membro-corpo">
        <div className="campo-formulario">
          <label>Nome completo *</label>
          <input type="text" value={membro.nome} onChange={handle('nome')} placeholder="Nome do familiar" required />
        </div>
        <div className="campo-formulario">
          <label>Parentesco *</label>
          <select value={membro.parentesco} onChange={handle('parentesco')} required>
            <option value="">Selecione…</option>
            {['Pai', 'Mãe', 'Cônjuge/Companheiro(a)', 'Filho(a)', 'Irmão/Irmã', 'Avô/Avó', 'Tio(a)', 'Outro'].map(p => (
              <option key={p} value={p.toLowerCase()}>{p}</option>
            ))}
          </select>
        </div>
        <div className="campo-formulario">
          <label>Data de nascimento</label>
          <input type="date" value={membro.dataNascimento} onChange={handle('dataNascimento')} />
        </div>
        <div className="campo-formulario">
          <label>Profissão</label>
          <input type="text" value={membro.profissao} onChange={handle('profissao')} placeholder="Ex: Pedreiro, Professora…" />
        </div>
        <div className="campo-formulario">
          <label>Vínculo empregatício</label>
          <select value={membro.vinculo} onChange={handle('vinculo')}>
            <option value="">Selecione…</option>
            {['CLT', 'Servidor público', 'Autônomo', 'Informal', 'Desempregado(a)', 'Aposentado(a)', 'Pensionista', 'Estudante', 'Outro'].map(v => (
              <option key={v} value={v.toLowerCase()}>{v}</option>
            ))}
          </select>
        </div>
        <div className="campo-formulario">
          <label>Renda mensal (R$) *</label>
          <input type="number" value={membro.renda} onChange={handle('renda')} placeholder="0" min="0" step="0.01" required />
          <span className="campo-dica">Informe 0 se não possui renda</span>
        </div>
        <div className="campo-formulario campo-checkboxes-saude">
          <label className="opcao-item">
            <input type="checkbox" checked={membro.possuiDeficiencia} onChange={handle('possuiDeficiencia')} />
            Possui deficiência
          </label>
          <label className="opcao-item">
            <input type="checkbox" checked={membro.possuiDoencaCronica} onChange={handle('possuiDoencaCronica')} />
            Possui doença crônica/grave
          </label>
        </div>
      </div>
    </div>
  );
}

function Etapa4({ avancar, setMembrosGlobal }) {
  const [membros, setMembros] = useState([{ ...MEMBRO_VAZIO }]);

  const handleMembro = (index, campo, valor) =>
    setMembros(prev => prev.map((m, i) => i === index ? { ...m, [campo]: valor } : m));

  const adicionarMembro = () => setMembros(prev => [...prev, { ...MEMBRO_VAZIO }]);
  const removerMembro = (index) => setMembros(prev => prev.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setMembrosGlobal(membros);
    avancar({
      qtdDisciplinas: fd.get('qtdDisciplinas'),
      recebeAuxilio: fd.get('recebeAuxilio'),
      tipoBolsa: fd.getAll('tipoBolsa').join(','),
      tipoMoradia: fd.get('tipoMoradia'),
      zonaResidencia: fd.get('zonaResidencia'),
      bolsaFamilia: fd.get('bolsaFamilia'),
      beneficioBpc: fd.get('beneficioBpc'),
      rendaBruta: fd.get('rendaBruta'),
      qtdPessoas: fd.get('qtdPessoas'),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-inscricao">
      <section>
        <div className="cabecalho-verde">
          <h3>Dados Socioeconômicos</h3>
          <p>Seus dados socioeconômicos são importantes para a análise da sua situação.</p>
        </div>
        <div className="campo-formulario">
          <label>Em quantas disciplinas você está matriculado? *</label>
          <div className="opcoes-grupo">
            {[
              ['uma', 'Em apenas uma'],
              ['duas', 'Em duas disciplinas'],
              ['mais_duas', 'Em mais de duas disciplinas'],
              ['tcc', 'Apenas em fase de elaboração de TCC'],
              ['estagio', 'Apenas fazendo estágio curricular'],
            ].map(([v, t]) => (
              <label key={v} className="opcao-item">
                <input type="radio" name="qtdDisciplinas" value={v} required /> {t}
              </label>
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
            {[
              ['extensao', 'Bolsa de extensão'],
              ['pesquisa', 'Bolsa de pesquisa'],
              ['pibid', 'PIBID'],
              ['residencia', 'Residência pedagógica'],
              ['monitoria', 'Monitoria'],
              ['ensino', 'Bolsa de Projeto de Ensino'],
              ['pe-de-meia', 'Pé-de-meia'],
            ].map(([v, t]) => (
              <label key={v} className="opcao-item">
                <input type="checkbox" name="tipoBolsa" value={v} /> {t}
              </label>
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
            {[
              ['nenhuma', 'Não há pessoas com deficiência na minha família'],
              ['intelectual', 'Deficiência intelectual'],
              ['auditiva', 'Deficiência auditiva'],
              ['visual', 'Deficiência visual'],
              ['tgd', 'Transtorno Global de Desenvolvimento'],
              ['fisica', 'Deficiência física'],
            ].map(([v, t]) => (
              <label key={v} className="opcao-item"><input type="checkbox" name="pcdFamilia" value={v} /> {t}</label>
            ))}
          </div>
        </div>
        <div className="campo-formulario">
          <label>Há pessoas com alguma doença grave ou crônica na sua família? *</label>
          <div className="opcoes-grupo">
            {[
              ['nenhuma', 'Nenhuma'],
              ['tuberculose', 'Tuberculose ativa'],
              ['hanseniase', 'Hanseníase'],
              ['alienacao_mental', 'Transtorno mental grave'],
              ['cancer', 'Neoplasia maligna (câncer)'],
              ['cegueira', 'Cegueira'],
              ['paralisia', 'Paralisia irreversível'],
              ['cardiopatia', 'Cardiopatia grave'],
              ['parkinson', 'Doença de Parkinson'],
              ['aids', 'AIDS'],
              ['esclerose', 'Esclerose múltipla'],
            ].map(([v, t]) => (
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
      </section>

      <section>
        <div className="cabecalho-membros">
          <div>
            <h3>Composição familiar</h3>
            <p className="cabecalho-membros-desc">
              Informe os dados de cada pessoa que mora com você. Cada membro gera um registro.
            </p>
          </div>
        </div>
        <div className="lista-membros">
          {membros.map((membro, i) => (
            <CardMembro
              key={i}
              index={i}
              membro={membro}
              onChange={handleMembro}
              onRemover={removerMembro}
              podRemover={membros.length > 1}
            />
          ))}
        </div>
        <button type="button" className="btn-adicionar-membro" onClick={adicionarMembro}>
          + Adicionar outro membro
        </button>
      </section>

      <button type="submit" className="btn-enviar">Próxima etapa →</button>
    </form>
  );
}

function Etapa5({ avancar }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    avancar({
      cursoSuperior: fd.get('cursoSuperior'),
      cursoSuperiorOutro: fd.get('cursoSuperiorOutro'),
    });
  };

  const cursos = [
    ['biologia', 'Biologia'],
    ['administração', 'Administração'],
    ['matematica', 'Matemática'],
    ['spi', 'Sistemas para Internet'],
    ['pe', 'Processos escolares'],
    ['logistica', 'Logística'],
    ['outro', 'Outro'],
  ];

  return (
    <form onSubmit={handleSubmit} className="formulario-inscricao">
      <section>
        <div className="cabecalho-verde"><h3>Cursos na modalidade Superior</h3></div>
        <div className="campo-formulario">
          <label>Em qual curso você está estudando no Ifac? *</label>
          <div className="opcoes-grupo">
            {cursos.map(([v, t]) => (
              <label key={v} className="opcao-item">
                <input type="radio" name="cursoSuperior" value={v} required /> {t}
              </label>
            ))}
          </div>
        </div>
        <div className="campo-formulario">
          <label>Se selecionou "Outro", especifique:</label>
          <input type="text" name="cursoSuperiorOutro" className="input-texto-linha" placeholder="Nome do curso" />
        </div>
      </section>
      <button type="submit" className="btn-enviar">Próxima etapa →</button>
    </form>
  );
}

const DOC_VAZIO = () => ({ id: Date.now() + Math.random(), nome: '', arquivo: null });

function CardDocumento({ doc, onChange, onRemover, podRemover }) {
  const inputFileRef = useRef();

  const handleArquivo = (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    onChange(doc.id, 'arquivo', arquivo);
  };

  const removerArquivo = () => {
    onChange(doc.id, 'arquivo', null);
    if (inputFileRef.current) inputFileRef.current.value = '';
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="card-membro">
      <div className="card-membro-header">
        <input
          type="text"
          className="card-doc-nome-input"
          value={doc.nome}
          onChange={(e) => onChange(doc.id, 'nome', e.target.value)}
          placeholder={`Documento ${doc.index + 1} — clique para nomear`}
        />
        {podRemover && (
          <button type="button" className="btn-remover-membro" onClick={() => onRemover(doc.id)} aria-label="Remover documento">
            ✕
          </button>
        )}
      </div>
      <div className="card-doc-corpo">
        {!doc.arquivo ? (
          <label className="card-doc-zona-upload">
            <input ref={inputFileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={handleArquivo} />
            <span className="card-doc-upload-icone">⬆</span>
            <span className="card-doc-upload-texto">Clique para selecionar o arquivo</span>
            <span className="card-doc-upload-dica">PDF, JPG ou PNG</span>
          </label>
        ) : (
          <div className="card-doc-preview">
            <div className={`card-doc-preview-icone ${doc.arquivo.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'img'}`}>
              {doc.arquivo.name.toLowerCase().endsWith('.pdf') ? '📄' : '🖼'}
            </div>
            <div className="card-doc-preview-info">
              <span className="card-doc-preview-nome">{doc.arquivo.name}</span>
              <span className="card-doc-preview-meta">{formatSize(doc.arquivo.size)} · {doc.arquivo.type || 'arquivo'}</span>
            </div>
            <div className="card-doc-preview-acoes">
              <label className="btn-doc-trocar">
                Trocar
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={handleArquivo} />
              </label>
              <button type="button" className="btn-doc-excluir" onClick={removerArquivo}>Excluir</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Etapa6({ avancar, setArquivosGlobal }) {
  const [docs, setDocs] = useState([{ ...DOC_VAZIO(), index: 0 }]);

  const handleDoc = (id, campo, valor) => setDocs(prev => prev.map(d => d.id === id ? { ...d, [campo]: valor } : d));
  const adicionarDoc = () => setDocs(prev => [...prev, { ...DOC_VAZIO(), index: prev.length }]);
  const removerDoc = (id) => setDocs(prev => prev.filter(d => d.id !== id).map((d, i) => ({ ...d, index: i })));

  const handleSubmit = (e) => {
    e.preventDefault();
    const arquivosBinarios = docs.filter(d => d.arquivo).map(d => d.arquivo);
    setArquivosGlobal(arquivosBinarios);
    avancar({});
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-inscricao">
      <section>
        <div className="cabecalho-verde">
          <h3>Documentos</h3>
          <p>Anexe os documentos necessários para a sua inscrição.</p>
          <a href="https://sei.ifac.edu.br/sei/publicacoes/controlador_publicacoes.php?acao=publicacao_visualizar&id_documento=1378286&id_orgao_publicacao=0" target="_blank" rel="noopener noreferrer" style={{ marginBottom: 24, color: 'var(--texto-leve)', fontSize: '.9rem' }}>Ver o edital</a>
        </div>
        <div className="lista-membros">
          {docs.map((doc) => (
            <CardDocumento key={doc.id} doc={doc} onChange={handleDoc} onRemover={removerDoc} podRemover={docs.length > 1} />
          ))}
        </div>
        <button type="button" className="btn-adicionar-membro" onClick={adicionarDoc}>
          + Adicionar documento
        </button>
      </section>
      <button type="submit" className="btn-enviar">Próxima etapa →</button>
    </form>
  );
}

function Etapa7({ avancar, enviando }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    avancar({ aceiteTermo: true });
  };

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
      <button type="submit" className="btn-enviar" disabled={enviando}>
        {enviando ? '⏳ Enviando…' : 'Concluir inscrição ✓'}
      </button>
    </form>
  );
}

function TelaSucesso() {
  return (
    <div className="tela-sucesso">
      <div className="icone-sucesso">✅</div>
      <h2>Inscrição realizada com sucesso!</h2>
      <p>Sua inscrição foi enviada. Verifique sua caixa de e-mail para acompanhar o processo.</p>
    </div>
  );
}


export default function Formulario() {
  const [etapa, setEtapa] = useState(-1);
  const [dadosCompletos, setDadosCompletos] = useState({});
  const [membros, setMembros] = useState([]);
  const [arquivos, setArquivos] = useState([]);
  const [enviando, setEnviando] = useState(false);

  const avancar = (novosDados = {}) => {
    setDadosCompletos(prev => ({ ...prev, ...novosDados }));
    setEtapa(e => e + 1);
  };

  const enviarInscricao = async (dadosTermo) => {
    setEnviando(true);
    const tudo = { ...dadosCompletos, ...dadosTermo };

    const formData = new FormData();

    Object.entries(tudo).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        formData.append(k, v);
      }
    });

    // Membros da família como JSON
    formData.append('membros', JSON.stringify(membros));

    // Arquivos binários
    arquivos.forEach(arq => formData.append('documentos', arq));

    try {
      const res = await fetch('http://localhost:5000/api/inscricao', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setEtapa(8); // tela de sucesso
      } else {
        alert(`❌ Erro: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Não foi possível conectar ao servidor.\nVerifique se o backend Python está rodando na porta 5000.');
    } finally {
      setEnviando(false);
    }
  };

  const etapas = [
    <Etapa0 avancar={avancar} />,
    <Etapa1 avancar={avancar} />,
    <Etapa2 avancar={avancar} />,
    <Etapa3 avancar={avancar} />,
    <Etapa4 avancar={avancar} setMembrosGlobal={setMembros} />,
    <Etapa5 avancar={avancar} />,
    <Etapa6 avancar={avancar} setArquivosGlobal={setArquivos} />,
    <Etapa7 avancar={enviarInscricao} enviando={enviando} />,
  ];

  return (
    <div className="formulario-wrapper">
      <header className="cabecalho-principal">
        <h1>Formulário Naes – IFAC</h1>
        <div className="alerta-importante">
          <h2>Informação Importante</h2>
          <p>Leia atentamente as diretrizes antes de prosseguir.</p>
        </div>
      </header>

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
              <a href="https://sei.ifac.edu.br/sei/publicacoes/controlador_publicacoes.php?acao=publicacao_visualizar&id_documento=1378286&id_orgao_publicacao=0" target="_blank" rel="noopener noreferrer" style={{ marginBottom: 24, color: 'var(--texto-leve)', fontSize: '.9rem' }}>Ver o edital</a>
              <p style={{ marginBottom: 24, color: 'var(--texto-leve)', fontSize: '.9rem' }}>
                Clique no botão abaixo para iniciar o formulário de inscrição.
              </p>
              <button className="btn-enviar" style={{ display: 'inline-block', marginTop: 0 }} onClick={() => avancar()}>
                Iniciar formulário →
              </button>
            </div>
          </div>
        </>
      )}

      {etapa >= 0 && etapa < etapas.length && (
        <>
          <BarraProgresso etapa={etapa} />
          <div className="container-formulario">
            {etapas[etapa]}
          </div>
        </>
      )}

      {etapa >= etapas.length && <TelaSucesso />}
    </div>
  );
}