# 💸 Omni Challenger API

Este projeto é uma API RESTful desenvolvida em **NestJS** com **Sequelize** para simular operações bancárias simples entre usuários. O deploy foi realizado na plataforma **Render**, utilizando **Docker** para gerenciamento do ambiente.

## 🚀 Deploy

A API está disponível no seguinte endereço:

🔗 [https://omni-challanger.onrender.com](https://omni-challanger.onrender.com)

---

## 📌 Endpoints

### 🔐 Cadastro de Usuário

**POST** `/users/signup`

Cria um novo usuário.

#### JSON Request Body
```json
{
  "username": "string",
  "password": "string",
  "birthdate": "string"
}
```

#### JSON Response (201 CREATED)
```json
{
  "id": "string"
}
```

---

### 🔐 Login de Usuário

**POST** `/users/signin`

Autentica o usuário e retorna um token JWT.

#### JSON Request Body
```json
{
  "username": "string",
  "password": "string"
}
```

#### JSON Response (200 OK)
```json
{
  "token": "string",
  "expiresIn": "string"
}
```

---

### 💸 Transferência entre Usuários

**POST** `/transfer`

Realiza uma transferência de saldo entre dois usuários.  
**Autenticação**: Bearer Token

#### JSON Request Body
```json
{
  "fromId": "string",
  "toId": "string",
  "amount": number
}
```

#### Response (204 NO CONTENT)
Sem corpo de resposta em caso de sucesso.

---

### 👥 Listagem de Usuários

**GET** `/users`

Retorna todos os usuários cadastrados com seus dados e saldo.  
**Autenticação**: Bearer Token

#### JSON Response (200 OK)
```json
[
  {
    "id": "string",
    "username": "string",
    "birthdate": "string",
    "balance": "string"
  }
]
```

---

## 🛠️ Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Sequelize](https://sequelize.org/)
- [Docker](https://www.docker.com/)
- [Render](https://render.com/) (Deploy)

---

## 📫 Deploy

Todas as rotas devem ser chamadas utilizando a URL base:  
**https://omni-challanger.onrender.com**
