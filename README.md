# Driven-All-Articles-Back 📚
Projeto _fullstack_ para construção de uma aplicação de e-commerce.<br>
Repositório _back-end_ para desenvolvimento da API.
## Requisitos Obrigatórios ⚠️

### Geral:
- **Deploy do projeto back-end e do banco de dados na nuvem**.
- Utilização de coleções do banco de dados MongoDb.
- Arquiteturar o projeto em _controllers_, _middlewares_ e _routers_.
- Validação de dados utilizando a dependência _joi_.
- Criptografia de senhas utilizando a dependência _bcrypt_.
- _Token_ de sessão para controle de acesso de usuários logados.
- Logout para remover o token de sessão.

### Armazenamento dos Dados:
*Formato geral dos dados:*

- _payload_ da requisição:

``` javascript
LoginSchema = {
  email: 'email do usuário',
  password: 'senha do usuário' 
};

RegisterSchema = {
  name: 'nome do usuário',
  email: 'email do usuário',
  password: 'senha do usuário',
  image: 'imagem/avatar do usuário'
}

ProductSchema = {
  title: 'título do produto',
  description: 'descrição do produto',
  value: 'valor/preço do produto',
  image: 'imagem do produto',
  quantity: 'quantidade do produto'
}
```

- _collections_ do banco de dados:

``` javascript

UsersCollection = {
  _id: '(userID)',
  name,
  email,
  password,
  image
}

SessionsCollection = {
  _id: '(sessionID)',
  userID: '(from: Users collection)',
  token: '(token de sessão do usuário)'
}

ProductsCollection = {
  _id: '(productID)',
  userID: '(from: Users collection)',
  title,
  description,
  value,
  image,
  day: 'data de criação do produto - (DD/MM)'
}

ShoppingCartCollection = {
  _id: '(cartID)',
  userID: '(from: Users collection)',
  productID: '(from: Products collection)',
  title: '(from: Products collection)',
  description: '(from: Products collection)',
  value: '(from: Products collection)',
  image: '(from: Products collection)',
  day: '(from: Products collection)'
}

```


## Endpoints ⚙️
### AuthRoute 🚩
### /
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **email** e **password** pelo _body_, verifica se o usuário é valído no banco de dados e, em caso de sucesso, armazena o token de sessão no _localStorage_ do usuário.
<br>
### /cadastro
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **name, email, password** e **image** pelo _body_, salva o usuário no banco de dados e redireciona para a página de Login.
### /logout
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **token** pelo _header_ e remove o usuário da _collection_ de sessões.
<br>
### ProductsRoute 🚩
### /home
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Recebe **limit** por _query_, realiza paginação dos dados (_offset máximo de 20 produtos) e retorna a lista dos produtos do banco de dados.<br>
### /product-page/:id
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Recebe **id** por _params_ e retorna um produto de acordo com o _id_ fornecido.
### /create-product
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **value**, **description**, **value**, **image** e **quantity** pelo _body_ e cria um novo produto e salva este produto no banco de dados.<br>
### /delete-product/:id
![](https://place-hold.it/80x20/ec2626/ffffff?text=DELETE&fontsize=16) Recebe **id** por _params_, verifica se o usuário que pretende utilizar o método é o criador do produto e deleta o produto de acordo com o _id_ fornecido.<br>
### ShoppingCartRoute 🚩
### /cart-info
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Recebe **token** pelo _header_ e retorna a lista de produtos que estão no carrinho de compras do usuário.<br>
### /product-page/:id/buy
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **id** por _params_ e insere um produto de acordo com o _id_ fornecido no carrinho de compras do usuário.<br> 
### /finish-order
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Finaliza a compra do usuário e remove todos os dados do carrinho de compras do usuário.<br>
### /cart-info/:id/delete
![](https://place-hold.it/80x20/ec2626/ffffff?text=DELETE&fontsize=16) Recebe **id** por _params_ e deleta um produto de acordo com o _id_ fornecido do carrinho de compras do usuário.<br>
### UserRoute 🚩
### /user-info/:id
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Recebe **id** por _params_ e retorna informações de um usuário de acordo com o _id_ fornecido.
<br>
## Middlewares 🔛

### ValidateToken:
- Realiza a verificação de usuário autentificado através do **token** de sessão pelo _header_ da requisição.
- Rotas que utilizam este _middleware_:
  - **ProductsRoute** e **ShoppingCartRoute**.

### ValidateSchema:
- Recebe um _Schema_ por parámetro de função e realiza as verificações dos dados recebidos pelo _body_ e _params_.
- Realiza a sanitização dos dados.
- Rotas que utilizam este _middleware_:
  - **AuthRoute**:
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/**
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/cadastro**
  - **ProductsRoute**:
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/create-product**
   
### ValidateProductID:
- Realiza a verificação do _ID_ fornecido por _params_ no banco de dados das _collections_: Products, ShoppingCart.
- Rotas que utilizam este _middleware_:
  - **ShoppingCartRoute**:
    - ![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) **/product-page/:id**
    - ![](https://place-hold.it/80x20/ec2626/ffffff?text=DELETE&fontsize=16) **/delete-product/:id**
