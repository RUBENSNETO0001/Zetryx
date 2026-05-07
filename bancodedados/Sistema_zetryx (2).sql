-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 07/05/2026 às 23:43
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `Sistema_zetryx`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `Banco_Oficiais`
--

CREATE TABLE `Banco_Oficiais` (
  `id_bancoOf` int(11) NOT NULL,
  `codigo_bacen` char(3) NOT NULL,
  `nome_instituicao` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `Banco_Oficiais`
--

INSERT INTO `Banco_Oficiais` (`id_bancoOf`, `codigo_bacen`, `nome_instituicao`) VALUES
(1, '001', 'Banco do Brasil'),
(2, '104', 'Caixa Econômica Federal'),
(3, '237', 'Bradesco'),
(4, '341', 'Itaú Unibanco'),
(5, '033', 'Santander'),
(6, '260', 'Nubank'),
(7, '077', 'Banco Inter'),
(8, '290', 'PagSeguro'),
(9, '380', 'PicPay');

-- --------------------------------------------------------

--
-- Estrutura para tabela `Curso`
--

CREATE TABLE `Curso` (
  `id_curso` int(11) NOT NULL,
  `id_participante` int(11) DEFAULT NULL,
  `nome_curso` varchar(100) NOT NULL,
  `tipo_curso` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Dados_Bancarios`
--

CREATE TABLE `Dados_Bancarios` (
  `id_banco` int(11) NOT NULL,
  `id_participante` int(11) NOT NULL,
  `id_bancoOf` int(11) NOT NULL,
  `possui_conta` tinyint(1) DEFAULT 0,
  `tipo_conta` varchar(20) DEFAULT NULL,
  `variacao_poupanca` varchar(10) DEFAULT NULL,
  `numero_conta` varchar(20) DEFAULT NULL,
  `agencia` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Dados_Socioeconomicos`
--

CREATE TABLE `Dados_Socioeconomicos` (
  `id_socio` int(11) NOT NULL,
  `id_participante` int(11) NOT NULL,
  `tipo_moradia` varchar(50) DEFAULT NULL,
  `mora_em` varchar(50) DEFAULT NULL,
  `renda_bruta_total_familiar` decimal(10,2) DEFAULT 0.00,
  `quantidade_pessoas_casa` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Endereco_participante`
--

CREATE TABLE `Endereco_participante` (
  `id_participante` int(11) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `bairro` varchar(50) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `ponto_referencia` varchar(255) DEFAULT NULL,
  `cep` char(8) NOT NULL DEFAULT '',
  `complemento` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Matricula`
--

CREATE TABLE `Matricula` (
  `id_matricula` int(11) NOT NULL,
  `id_participante` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `data_matricula` date DEFAULT curdate(),
  `qtd_disciplinas_matriculadas` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Membros_Familia`
--

CREATE TABLE `Membros_Familia` (
  `id_membro` int(11) NOT NULL,
  `id_participante` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `parentesco` varchar(50) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Membro_Profissional`
--

CREATE TABLE `Membro_Profissional` (
  `id_profissional` int(11) NOT NULL,
  `id_membro` int(11) NOT NULL,
  `profissao` varchar(100) DEFAULT NULL,
  `vinculo_empregaticio` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Membro_Renda`
--

CREATE TABLE `Membro_Renda` (
  `id_renda` int(11) NOT NULL,
  `id_membro` int(11) NOT NULL,
  `renda_mensal` decimal(10,2) DEFAULT 0.00,
  `observacao` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Membro_Saude`
--

CREATE TABLE `Membro_Saude` (
  `id_saude` int(11) NOT NULL,
  `id_membro` int(11) NOT NULL,
  `possui_deficiencia` tinyint(1) DEFAULT 0,
  `possui_doenca_cronica` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Participante`
--

CREATE TABLE `Participante` (
  `id_participante` int(11) NOT NULL,
  `matricula` varchar(20) NOT NULL,
  `nome_completo` varchar(100) NOT NULL,
  `cpf` char(11) NOT NULL,
  `data_nascimento` date NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `estado_civil` varchar(20) DEFAULT NULL,
  `modalidade_auxilio` enum('permanencia','transporte','ambos') NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Participante_Beneficios`
--

CREATE TABLE `Participante_Beneficios` (
  `id_beneficios` int(11) NOT NULL,
  `id_socio` int(11) NOT NULL,
  `recebe_auxilio_bolsa` tinyint(1) DEFAULT 0,
  `nome_beneficio` varchar(100) DEFAULT NULL,
  `beneficiario_bolsa_familia_cadunico` tinyint(1) DEFAULT 0,
  `recebe_bpc` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Pdf_Participante`
--

CREATE TABLE `Pdf_Participante` (
  `id_pdf` int(11) NOT NULL,
  `id_participante` int(11) NOT NULL,
  `url_imagemDocumento` text DEFAULT NULL,
  `titulo_do_pdf` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `perfil_declaracao`
--

CREATE TABLE `perfil_declaracao` (
  `id_declaracao` int(11) NOT NULL,
  `id_participante` int(11) NOT NULL,
  `lei_cotas` tinyint(1) DEFAULT 0,
  `possui_deficiencia` tinyint(1) DEFAULT 0,
  `origem_quilombola` tinyint(1) DEFAULT 0,
  `estrangeiro` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Perfil_requisitos`
--

CREATE TABLE `Perfil_requisitos` (
  `id_perfil` int(11) NOT NULL,
  `id_participante` int(11) DEFAULT NULL,
  `escolaridade` varchar(100) DEFAULT NULL,
  `renda_per_capita` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `Banco_Oficiais`
--
ALTER TABLE `Banco_Oficiais`
  ADD PRIMARY KEY (`id_bancoOf`),
  ADD UNIQUE KEY `codigo_bacen` (`codigo_bacen`);

--
-- Índices de tabela `Curso`
--
ALTER TABLE `Curso`
  ADD PRIMARY KEY (`id_curso`),
  ADD KEY `id_participante` (`id_participante`);

--
-- Índices de tabela `Dados_Bancarios`
--
ALTER TABLE `Dados_Bancarios`
  ADD PRIMARY KEY (`id_banco`),
  ADD KEY `fk_banco_participante` (`id_participante`),
  ADD KEY `fk_banco_oficial` (`id_bancoOf`);

--
-- Índices de tabela `Dados_Socioeconomicos`
--
ALTER TABLE `Dados_Socioeconomicos`
  ADD PRIMARY KEY (`id_socio`),
  ADD KEY `fk_socio_participante` (`id_participante`);

--
-- Índices de tabela `Endereco_participante`
--
ALTER TABLE `Endereco_participante`
  ADD PRIMARY KEY (`id_participante`);

--
-- Índices de tabela `Matricula`
--
ALTER TABLE `Matricula`
  ADD PRIMARY KEY (`id_matricula`),
  ADD KEY `fk_mat_participante` (`id_participante`),
  ADD KEY `fk_mat_curso` (`id_curso`);

--
-- Índices de tabela `Membros_Familia`
--
ALTER TABLE `Membros_Familia`
  ADD PRIMARY KEY (`id_membro`),
  ADD KEY `fk_fam_participante` (`id_participante`);

--
-- Índices de tabela `Membro_Profissional`
--
ALTER TABLE `Membro_Profissional`
  ADD PRIMARY KEY (`id_profissional`),
  ADD KEY `fk_prof_membro` (`id_membro`);

--
-- Índices de tabela `Membro_Renda`
--
ALTER TABLE `Membro_Renda`
  ADD PRIMARY KEY (`id_renda`),
  ADD KEY `fk_renda_membro` (`id_membro`);

--
-- Índices de tabela `Membro_Saude`
--
ALTER TABLE `Membro_Saude`
  ADD PRIMARY KEY (`id_saude`),
  ADD KEY `fk_saude_membro` (`id_membro`);

--
-- Índices de tabela `Participante`
--
ALTER TABLE `Participante`
  ADD PRIMARY KEY (`id_participante`),
  ADD UNIQUE KEY `matricula` (`matricula`),
  ADD UNIQUE KEY `cpf` (`cpf`);

--
-- Índices de tabela `Participante_Beneficios`
--
ALTER TABLE `Participante_Beneficios`
  ADD PRIMARY KEY (`id_beneficios`),
  ADD KEY `fk_benef_socio` (`id_socio`);

--
-- Índices de tabela `Pdf_Participante`
--
ALTER TABLE `Pdf_Participante`
  ADD PRIMARY KEY (`id_pdf`),
  ADD KEY `fk_pdf_participante` (`id_participante`);

--
-- Índices de tabela `perfil_declaracao`
--
ALTER TABLE `perfil_declaracao`
  ADD PRIMARY KEY (`id_declaracao`),
  ADD KEY `fk_decl_participante` (`id_participante`);

--
-- Índices de tabela `Perfil_requisitos`
--
ALTER TABLE `Perfil_requisitos`
  ADD PRIMARY KEY (`id_perfil`),
  ADD KEY `id_participante` (`id_participante`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Banco_Oficiais`
--
ALTER TABLE `Banco_Oficiais`
  MODIFY `id_bancoOf` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `Curso`
--
ALTER TABLE `Curso`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Dados_Bancarios`
--
ALTER TABLE `Dados_Bancarios`
  MODIFY `id_banco` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Dados_Socioeconomicos`
--
ALTER TABLE `Dados_Socioeconomicos`
  MODIFY `id_socio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Matricula`
--
ALTER TABLE `Matricula`
  MODIFY `id_matricula` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Membros_Familia`
--
ALTER TABLE `Membros_Familia`
  MODIFY `id_membro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Membro_Profissional`
--
ALTER TABLE `Membro_Profissional`
  MODIFY `id_profissional` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Membro_Renda`
--
ALTER TABLE `Membro_Renda`
  MODIFY `id_renda` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Membro_Saude`
--
ALTER TABLE `Membro_Saude`
  MODIFY `id_saude` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Participante`
--
ALTER TABLE `Participante`
  MODIFY `id_participante` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Participante_Beneficios`
--
ALTER TABLE `Participante_Beneficios`
  MODIFY `id_beneficios` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Pdf_Participante`
--
ALTER TABLE `Pdf_Participante`
  MODIFY `id_pdf` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `perfil_declaracao`
--
ALTER TABLE `perfil_declaracao`
  MODIFY `id_declaracao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Perfil_requisitos`
--
ALTER TABLE `Perfil_requisitos`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `Curso`
--
ALTER TABLE `Curso`
  ADD CONSTRAINT `Curso_ibfk_1` FOREIGN KEY (`id_participante`) REFERENCES `Participante` (`id_participante`);

--
-- Restrições para tabelas `Dados_Bancarios`
--
ALTER TABLE `Dados_Bancarios`
  ADD CONSTRAINT `fk_banco_oficial` FOREIGN KEY (`id_bancoOf`) REFERENCES `Banco_Oficiais` (`id_bancoOf`),
  ADD CONSTRAINT `fk_banco_participante` FOREIGN KEY (`id_participante`) REFERENCES `Participante` (`id_participante`) ON DELETE CASCADE;

--
-- Restrições para tabelas `Dados_Socioeconomicos`
--
ALTER TABLE `Dados_Socioeconomicos`
  ADD CONSTRAINT `fk_socio_participante` FOREIGN KEY (`id_participante`) REFERENCES `Participante` (`id_participante`) ON DELETE CASCADE;

--
-- Restrições para tabelas `Endereco_participante`
--
ALTER TABLE `Endereco_participante`
  ADD CONSTRAINT `fk_end_participante` FOREIGN KEY (`id_participante`) REFERENCES `Participante` (`id_participante`) ON DELETE CASCADE;

--
-- Restrições para tabelas `Matricula`
--
ALTER TABLE `Matricula`
  ADD CONSTRAINT `fk_mat_curso` FOREIGN KEY (`id_curso`) REFERENCES `Curso` (`id_curso`),
  ADD CONSTRAINT `fk_mat_participante` FOREIGN KEY (`id_participante`) REFERENCES `Participante` (`id_participante`) ON DELETE CASCADE;

--
-- Restrições para tabelas `Membros_Familia`
--
ALTER TABLE `Membros_Familia`
  ADD CONSTRAINT `fk_fam_participante` FOREIGN KEY (`id_participante`) REFERENCES `Participante` (`id_participante`) ON DELETE CASCADE;

--
-- Restrições para tabelas `Membro_Profissional`
--
ALTER TABLE `Membro_Profissional`
  ADD CONSTRAINT `fk_prof_membro` FOREIGN KEY (`id_membro`) REFERENCES `Membros_Familia` (`id_membro`) ON DELETE CASCADE;

--
-- Restrições para tabelas `Membro_Renda`
--
ALTER TABLE `Membro_Renda`
  ADD CONSTRAINT `fk_renda_membro` FOREIGN KEY (`id_membro`) REFERENCES `Membros_Familia` (`id_membro`) ON DELETE CASCADE;

--
-- Restrições para tabelas `Membro_Saude`
--
ALTER TABLE `Membro_Saude`
  ADD CONSTRAINT `fk_saude_membro` FOREIGN KEY (`id_membro`) REFERENCES `Membros_Familia` (`id_membro`) ON DELETE CASCADE;

--
-- Restrições para tabelas `Participante_Beneficios`
--
ALTER TABLE `Participante_Beneficios`
  ADD CONSTRAINT `fk_benef_socio` FOREIGN KEY (`id_socio`) REFERENCES `Dados_Socioeconomicos` (`id_socio`) ON DELETE CASCADE;

--
-- Restrições para tabelas `Pdf_Participante`
--
ALTER TABLE `Pdf_Participante`
  ADD CONSTRAINT `fk_pdf_participante` FOREIGN KEY (`id_participante`) REFERENCES `Participante` (`id_participante`) ON DELETE CASCADE;

--
-- Restrições para tabelas `perfil_declaracao`
--
ALTER TABLE `perfil_declaracao`
  ADD CONSTRAINT `fk_decl_participante` FOREIGN KEY (`id_participante`) REFERENCES `Participante` (`id_participante`) ON DELETE CASCADE;

--
-- Restrições para tabelas `Perfil_requisitos`
--
ALTER TABLE `Perfil_requisitos`
  ADD CONSTRAINT `Perfil_requisitos_ibfk_1` FOREIGN KEY (`id_participante`) REFERENCES `Participante` (`id_participante`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
