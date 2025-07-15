# Arquivo: news-controller.ts

- O alias de importação `service` é genérico demais.
- A função `getSpecificNews()` tem nome pouco semântico e repete a validação do `id`.
- A função `alterNews()` repete a validação do `id` e utiliza a variável `alteredNews`, que o nome é pouco descritivo.
- A função `deleteNews()` também repete a validação do `id`.

# Arquivo: error-handler.ts

- A função `errorHandlingMiddleware()` apresenta uma cascata de `if`, que prejudica a semântica.

# Arquivo: news-repository.ts

- As funções `getNoticias()`, `getNoticiaById()`, `createNoticia()`, `updateNoticia()` e `removeNoticia()` misturam inglês e português no nome.
- O tipo `AlterNewsData` é redundante.

# Arquivo: news-schema.ts

- O schema Joi não valida o tamanho mínimo (500 caracteres) de `newsData.text`.

# Arquivo: news-service.ts

- As funções `getNews()`, `createNews()`, `alterNews()` e `deleteNews()` chamam funções que misturam inglês e português nos nomes.
- A função `validate()` tem muitas responsabilidades e tem nome pouco descritivo.
- A constante que verifica o tamanho do texto utiliza um magic number.
- A constante usada para checar a data possui nome pouco semântico.
