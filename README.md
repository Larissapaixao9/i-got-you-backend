# Projeto I got you 

Para rodar, abra o terminal na pasta do projeto e execute npm run devStart


## Documentação da API

#### Cadastra usuário

```http
  POST /sign-up
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**.|
| `name` | `string` | **Obrigatório**.|
| `password`       | `string`|  **Obrigatório**.|
| `confirmPassword`       | `string`|  **Obrigatório**.|


#### login do usuário (retorna Token)

```http
  POST /sign-in
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**.|
| `password`       | `string`|  **Obrigatório**. minimo 3 caracteres|



#### Cadastra pensamento do dia

```http
  POST /home
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Bearer Token`      | `string` | **Obrigatório**. Token do usuario logado |
|`text `     |`string`| **Obrigatório**|


#### Visualização de diagnóstico 

```http
  GET /diagnostic
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token`      | `string` | **Obrigatório**. `Token do usuario logado` |





## Rodando os testes

Para rodar os teste integrativos, rode o seguinte comando

```bash
  npm run test:integration
```

Para rodar os teste unitários, rode o seguinte comando

```bash
  npm run test:unit
```

