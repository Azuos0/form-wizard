# Form Wizard :crystal_ball:

**Form Wizard** � um gerador autom�tico de formul�rios para sistemas que utilizam o VueJs no frontend. Atualmente, o **Form Wizard** suporta apenas dois tipos de campos: text e select.

## Como utilizar :computer:

Por padr�o, esse projeto vem configurado para utilizar dois formul�rios criados para teste:  

 - Um formul�rio relacionados com clientes (chamado de "Formul�rio do Cliente");
 - E um relacionado com profissionais (chamado de "Formul�rio do Profissional");

Por enquanto, para utilizar esses formul�rios � necess�rio adicionar as informa��es de configura��o deles manualmente no BD (o seeder e a factory n�o est�o configurados).

### Adicionando os formul�rios padr�es pelo *backend* :satellite:
Para adicionar o forms basta iniciar o banco de dados e no terminal do projeto digitar o comando migrate para que as tabelas sejam geradas no BD.

    php artisan migrate
Feito isso, adicione os dados do form � tabela. Como o controller, seeder e factory do form ainda n�o est�o totalmente implementados � necess�rio que os dados sejam implementados manualmente pelo BD. Sendo assim, abaixo seguem os dados que devem ser inseridos em cada tabela:

 - Tabela forms
	
| id |  nome |
|--|--|
| 1 | Formul�rio do Cliente |
| 2 | Formul�rio do Profissional|
 
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
| 4 | profissao | input-text| Profiss�o | 2 |

 - Tabela options

| id | valor| input_id |
|--|--|--|
| 1 | Masculino | 2 
| 2 | Feminino | 2|

Pronto! O sistema est� pronto para ser utilizado.

## Rodando o sistema :rocket:
Para rodar o sistema web, abra o diret�rio *frontend* e digite no terminal:

    yarn serve //caso voc� utilize o yarn como gerenciador de pacotes

Para rodar o *backend* do sistema, abra o diret�rio *backend* e rode a linha de comando com o banco de dados funcionando:

    php artisan serve

E pronto! O seu sistema est� configurado e rodando! 


