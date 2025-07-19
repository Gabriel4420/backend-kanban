# Backend Kanban

API RESTful desenvolvida com NestJS e TypeORM para gerenciamento de quadros Kanban, permitindo criar, listar, atualizar, mover e remover cartões (cards), colunas (columns) e boards.

---

## Tecnologias

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/) (padrão, pode ser alterado)
- [Jest](https://jestjs.io/)

---

## Instalação

```sh
git clone <url-do-repositorio>
cd backend-kanban
npm install
npm run start
```

Servidor padrão: `http://localhost:3000`

---

## Configuração

- Banco padrão: SQLite (configurado em `src/app.module.ts`)
- Para outro banco, ajuste as opções do TypeORM.
- Entidades principais: `KanbanColumn`, `Card` e `KanbanBoard`.

---

## Estrutura do Projeto

```
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── board/
│   ├── board.controller.ts
│   ├── board.entity.ts
│   ├── board.module.ts
│   ├── board.service.ts
│   └── dto/
├── card/
│   ├── card.controller.ts
│   ├── card.entity.ts
│   ├── card.module.ts
│   ├── card.service.ts
│   └── dto/
│       └── create-card.dto.ts
├── column/
│   ├── column.controller.ts
│   ├── column.entity.ts
│   ├── column.module.ts
│   ├── column.service.ts
│   └── dto/
│       └── create-column.dto.ts
├── app.module.ts
└── main.ts
```

---

## Endpoints

### Board (`/board`)

- **Listar todos os boards**
  - `GET /board`

- **Buscar board por ID**
  - `GET /board/:id`

- **Criar board**
  - `POST /board`
  - Body:

    ```json
    {
      "name": "Meu Board"
    }
    ```

- **Atualizar board**
  - `PUT /board/editBoard/:id`
  - Body:

    ```json
    {
      "name": "Novo Nome"
    }
    ```

- **Remover board**
  - `DELETE /board/removeBoard/:id`

---

### Colunas (`/columns`)

- **Listar todas as colunas**
  - `GET /columns`

- **Buscar coluna por ID**
  - `GET /columns/:id`

- **Criar coluna**
  - `POST /columns`
  - Body:

    ```json
    {
      "name": "To Do"
    }
    ```

- **Atualizar coluna**
  - `PUT /columns/editColumn/:id`
  - Body:

    ```json
    {
      "name": "Em andamento"
    }
    ```

- **Remover coluna**
  - `DELETE /columns/removeColumn/:id`

---

### Cartões (`/cards`)

- **Listar todos os cartões**
  - `GET /cards`

- **Buscar cartão por ID**
  - `GET /cards/:id`

- **Criar cartão**
  - `POST /cards`
  - Body:

    ```json
    {
      "title": "Implementar autenticação",
      "description": "Adicionar JWT ao backend",
      "columnId": 1
    }
    ```

- **Remover cartão**
  - `DELETE /cards/:id`

- **Mover cartão entre colunas**
  - `PUT /cards/move`
  - Body:

    ```json
    {
      "cardId": 1,
      "fromColumnId": 1,
      "toColumnId": 2
    }
    ```

---

## Observações

- Ao criar um cartão, o sistema valida se a coluna existe.
- O relacionamento entre cartões, colunas e boards é feito via entidades do TypeORM.
- O endpoint `/cards/move` permite transferir um cartão de uma coluna para outra.
- Todos os endpoints retornam objetos JSON.

---

## Testes

```sh
npm run test
```

---

## Licença

MIT
