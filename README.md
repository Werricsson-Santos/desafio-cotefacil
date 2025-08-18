<h1 align="center">Portfólio de Aplicações com React e TypeScript</h1>

<p align='center'>
    <a href="https://desafio-cotefacil-wrn.vercel.app/">
        <img src="https://img.shields.io/badge/Teste%20as%20Aplicações-20232A?style=for-the-badge&logo=vercel&logoColor=white" />
    </a>
</p>

<p align='center'> 
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
    <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white"/>
    <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/>
</p>

<p>Este projeto é uma Single-Page Application (SPA) que centraliza três aplicações front-end distintas, demonstrando diversas habilidades em desenvolvimento com React. Todas as aplicações utilizam o <code>localStorage</code> do navegador para persistência de dados, simulando uma experiência completa sem a necessidade de um backend.</p>

<h2>Aplicações Inclusas</h2>

<h3>1. Dashboard Kanban:</h3>
<ul>
    <li>Permite criar, atualizar e excluir tarefas de forma visual.</li>
    <li>Funcionalidade de arrastar e soltar (drag-and-drop) para mover tarefas entre as colunas (Pendente, Em Progresso, Concluída).</li>
    <li>Design responsivo que se adapta a telas de desktop e mobile.</li>
    <li>Persistência de dados no <code>localStorage</code>.</li>
</ul>

<h3>2. To-Do List (Lista de Tarefas):</h3>
<ul>
    <li>Permite adicionar, editar, marcar como concluída e remover tarefas.</li>
    <li>Reordenação automática que move as tarefas concluídas para o final da lista.</li>
    <li>Funcionalidade para limpar todas as tarefas concluídas com um diálogo de confirmação.</li>
    <li>Persistência de dados no <code>localStorage</code>.</li>
</ul>

<h3>3. Galeria de Imagens:</h3>
<ul>
    <li>Exibe imagens consumidas da API pública da Unsplash.</li>
    <li>Funcionalidade de busca para filtrar imagens por um termo.</li>
    <li>Permite ao usuário adicionar novas imagens via upload de arquivo (convertido para Base64), que são salvas localmente.</li>
    <li>Permite excluir apenas as imagens adicionadas pelo usuário e filtrar para vê-las.</li>
    <li>Roteamento para uma página de detalhes para cada imagem, com tratamento diferenciado para imagens da API e imagens locais.</li>
</ul>

<hr>

<h2>Requisitos Técnicos</h2>

<h3>Linguagens e Frameworks:</h3>
<ul>
    <li><strong>Core:</strong> React 18+, TypeScript, Vite</li>
    <li><strong>UI:</strong> Material-UI & Emotion</li>
    <li><strong>Roteamento:</strong> React Router DOM</li>
    <li><strong>Drag & Drop:</strong> dnd-kit</li>
    <li><strong>Validação:</strong> Zod</li>
</ul>

<h3>Como rodar o projeto:</h3>

<h4>Clonando o Repositório:</h4>
<p>Para clonar o repositório, use o seguinte comando:</p>
<pre><code>git clone https://github.com/Werricsson-Santos/desafio-cotefacil.git</code></pre>

<h4>Iniciando o Projeto:</h4>
<p>Este é um projeto <strong>front-end only</strong> e não requer um backend para ser executado.</p>
<ol>
    <li>Navegue até o diretório do projeto:
        <pre><code>cd desafio-cotefacil</code></pre>
    </li>
    <li>Instale as dependências:
        <pre><code>npm install</code></pre>
    </li>
    <li>Inicie o servidor de desenvolvimento:
        <pre><code>npm run dev</code></pre>
    </li>
</ol>
<p>O frontend estará disponível em <code>http://localhost:5173</code> (ou a porta que o Vite indicar).</p>

<h4>Configuração de Variáveis de Ambiente:</h4>
<p>Para a Galeria de Imagens funcionar, você precisa de uma chave de API da Unsplash.</p>
<ol>
    <li>Crie um arquivo <code>.env.local</code> na raiz do projeto.</li>
    <li>Adicione sua chave de API a ele:
        <pre><code>VITE_UNSPLASH_ACCESS_KEY=SUA_CHAVE_DE_ACESSO_DA_UNSPLASH_AQUI</code></pre>
    </li>
</ol>

<hr>

<h2>Estrutura do Projeto</h2>
<ul>
    <li><strong>src/components/:</strong> Contém componentes reutilizáveis, organizados por funcionalidade (Dashboard, TodoList, Gallery, etc.).</li>
    <li><strong>src/pages/:</strong> Contém os componentes que representam as páginas completas da aplicação (Home, Dashboard, etc.).</li>
    <li><strong>src/services/:</strong> Lógica de negócio isolada, como chamadas de API e manipulação do <code>localStorage</code>.</li>
    <li><strong>src/types/:</strong> Definições de interfaces e tipos do TypeScript para garantir a consistência dos dados.</li>
    <li><strong>src/contexts/:</strong> Contextos do React, como o <code>HeaderContext</code> para comunicação entre páginas e o header.</li>
    <li><strong>src/router/:</strong> Configuração das rotas da aplicação com React Router.</li>
    <li><strong>src/styles/:</strong> Arquivos de tema e estilos globais.</li>
</ul>

<hr>

<h2>Testes</h2>
<p>Testes unitários e de integração ainda não foram implementados.</p>

<hr>

<div align="center">
<h2>Werricsson Santos</h2>
    <img align="center" alt="Werricsson Santos" style="border-radius: 25px;" height="190" width="190" src="https://avatars.githubusercontent.com/u/112734393?v=4">
</div>
</br> </br>
<div align="center">
    <a href = "mailto:werricsson.santos@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
    <a href="https://www.linkedin.com/in/werricsson-santos/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</div>