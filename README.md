# Form Wizard :crystal_ball:

**Form Wizard** é um gerador automático de formulários para sistemas que utilizam o VueJs no frontend. Atualmente, o **Form Wizard** suporta apenas dois tipos de campos: text e select.

## Como utilizar :computer:

Por padrão, esse projeto vem configurado para utilizar dois formulários criados para teste:  

 - Um formulário relacionados com clientes (chamado de "Formulário do Cliente");
 - E um relacionado com profissionais (chamado de "Formulário do Profissional");

Por enquanto, para utilizar esses formulários é necessário adicionar as informações de configuração deles manualmente no BD (o seeder e a factory não estão configurados).

### Adicionando os formulários padrões pelo *backend* :satellite:
Para adicionar o forms basta iniciar o banco de dados e no terminal do projeto digitar o comando migrate para que as tabelas sejam geradas no BD.

    php artisan migrate
Feito isso, adicione os dados do form à tabela. Como o controller, seeder e factory do form ainda não estão totalmente implementados é necessário que os dados sejam implementados manualmente pelo BD. Sendo assim, abaixo seguem os dados que devem ser inseridos em cada tabela:

 - Tabela forms
	
| id |  nome |
|--|--|
| 1 | Formulário do Cliente |
| 2 | Formulário do Profissional|
 
 - Tabela content_headers
 
| id | url | nome | method | form_id |
|--|--|--|--|--|
| 1 | /cadastrar | Cadastrar | POST | 1 |
| 2 | /editar | Editar | PATCH | 1 |
| 3 | /cadastrarProfissional | Cadastrar | POST | 2 |
| 4 | /editarProfissional | Editar | PATCH | 2 |

 - Tabela inputs

| id | nome| tipo | label | form_id |
|--|--|--|--|--|
| 1 | nome | input-text | Nome | 1 |
| 2 | sexo | input-select| Sexo| 1 |
| 3 | nome | input-text| Nome | 2 |
| 4 | profissao | input-text| Profissão | 2 |

 - Tabela options

| id | valor| input_id |
|--|--|--|
| 1 | Masculino | 2 
| 2 | Feminino | 2|

Pronto! O sistema está pronto para ser utilizado.

## Rodando o sistema :rocket:
Para rodar o sistema web, abra o diretório *frontend* e digite no terminal:

    yarn serve //caso você utilize o yarn como gerenciador de pacotes

Para rodar o *backend* do sistema, abra o diretório *backend* e rode a linha de comando com o banco de dados funcionando:

    php artisan serve

E pronto! O seu sistema está configurado e rodando! 


