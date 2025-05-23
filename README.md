# 🧠 Tektus.SO

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Made with React](https://img.shields.io/badge/made%20with-React-blue?logo=react)

**Tektus.SO** é um sistema modular de gestão criado especialmente para agências de marketing. Ele centraliza operações essenciais como gestão de clientes, tarefas, funil de vendas, conteúdo, automações, financeiro e muito mais — inspirado na experiência fluida e personalizável do Notion.

> Desenvolvido por [Tektus Publicidade](https://www.instagram.com/agencia.tektus).

---

## 🚧 Em desenvolvimento

Este projeto está em fase ativa de desenvolvimento. Funcionalidades, estrutura e documentação podem mudar com frequência.  
Contribuições são bem-vindas, mas recomendamos acompanhar os commits e issues para evitar conflitos com alterações recentes.

Versão atual: `v0.1-alpha`

---

## 🚀 Tecnologias

- ⚛️ React + TypeScript
- 💨 TailwindCSS
- ⚡ Vite
- 🔗 Wouter (roteamento)
- 🌐 i18next (tradução)
- 🔄 Prisma ORM
- 🧩 Express (Node.js)
- 🛢️ PostgreSQL

---

## 🛠️ Instalação Local

```bash
# Clone o projeto
git clone https://github.com/Agenciatektus/Tektus-SO.git
cd Tektus-SO

# Instale dependências
npm install

# Configure variáveis de ambiente
# Edite o arquivo .env com sua conexão PostgreSQL

# Execute as migrações
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

---

## 📁 Estrutura de Pastas

```
Tektus-SO/
├── client/                # Frontend em React
│   ├── src/pages/         # Páginas por módulo (tarefas, tráfego, etc.)
│   ├── components/        # Componentes visuais reutilizáveis
│   └── lib/, hooks/, i18n/
├── server/                # API Express + Auth
│   ├── routes/            # Endpoints da aplicação
│   └── storage.ts         # Integrações com banco via Prisma
├── prisma/                # Schema + migrações
└── shared/                # Schemas reutilizados (Zod)
```

---

## 📌 Funcionalidades

- ✅ Dashboard por setor
- ✅ Tabela de Tarefas estilo Notion com prioridades e filtros
- ✅ Controle de Clientes com status, orçamento e CRM
- ✅ Sistema de NPS, onboarding e offboarding
- ✅ Central de Anúncios (Meta & Google)
- ✅ Automação e integração com n8n
- ✅ Interface traduzida para 🇧🇷 (pt-BR)
- ✅ Sessões autenticadas com permissões

---

## 🔒 Licença

Distribuído sob a licença **MIT**. Veja `LICENSE` para mais informações.
