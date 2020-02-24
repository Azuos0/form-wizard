import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

axios.defaults.baseURL = "http://localhost:8000/api";

export default new Vuex.Store({
    state: {
        clientes: [], //array com os clientes vindos do BD
        profissionais: [], //array com os profissionais vindos do BD
        forms: [], //arrays com os formulários vindos do BD
        formContent: {}, //conteúdo dos inputs do formulário
        formSelectedInfo: {}, //formulário que será montado (ex: form do cliente com o header cadastrar) 

        //array com as possíveis configurações dos formulários 
        //(um desses objetos deve ser inserido no formSelectInfo para que ele monte o formulário)
        formOptions: [
            {//Configuração para a criação do form de cadastrar cliente
                form: "Formulário do Cliente",
                formHeader: "Cadastrar",
                mutation: "addCliente",
                backPage: "clientes",
            },
            {//Configuração para a criação do form de editar cliente
                form: "Formulário do Cliente",
                formHeader: "Editar",
                mutation: "editCliente",
                backPage: "clientes",
            },
            {//Configuração para a criação do form de cadastrar profissional
                form: "Formulário do Profissional",
                formHeader: "Cadastrar",
                mutation: "addProfissional",
                backPage: "profissionais",
            },
            {//Configuração para a criação do form de editar profissional
                form: "Formulário do Profissional",
                formHeader: "Editar",
                mutation: "editProfissional",
                backPage: "profissionais",
            },
        ]

    },
    getters: {
        getAllForms(state) {
            return state.forms;
        },
        getFormContent(state) {
            return state.formContent;
        },
        getAllClientes(state) {
            return state.clientes;
        },
        getAllProfissionais(state) {
            return state.profissionais;
        },
        getFormSelectedInfo(state) {
            return state.formSelectedInfo;
        }
    },
    mutations: {
        //Métodos relacionados aos formulários
        getForm(state, id) {
            return state.forms.find(form => form.id === id);
        },
        //recebe o nome do input e o valor (feito durante o preenchimento do formulário)
        includeDataContent(state, input) {
            state.formContent[input.nome] = input.valor;
        },
        //recebe o objeto (cliente ou profissional) e exclui o id (feito antes de carregar o formulário)
        includeEditContentData(state, content) {
            //cria um object input sem a chave id
            const inputs = Object.keys(content).reduce((object, key) => {
                if (key !== 'id') {
                    object[key] = content[key];
                }
                return object;
            }, {});
            state.formContent = inputs;
        },
        retrieveForms(state, data) {
            state.forms = data;
        },
        instantiateForm(state, formOption) {
            state.formSelectedInfo = state.formOptions[formOption];
        },
        clearFormContent(state) {
            state.formContent = {};
        },
        clearSelectedOption(state) {
            state.formSelectedInfo = {};
        },

        // Métodos relacionados aos clientes ///
        getCliente(state, id) {
            return state.clientes.find(cliente => cliente.id === id);
        },
        addCliente(state, cliente) {
            const objectLenght = Object.keys(state.clientes).length;
            state.clientes[objectLenght] = cliente;
        },
        editCliente(state, cliente) {
            const index = state.clientes.findIndex(item => item.id == cliente.id);
            state.clientes.splice(index, 1, cliente);
        },
        deleteCliente(state, idCliente) {
            const index = state.clientes.findIndex(item => item.id == idCliente);
            state.clientes.splice(index, 1);
        },
        retrieveClientes(state, data) {
            state.clientes = data;
        },

        //métodos relacionados aos profissionais //
        getProfissional(state, id) {
            return state.profissionais.find(cliente => cliente.id === id);
        },
        addProfissional(state, profissional) {
            const objectLenght = Object.keys(state.profissionais).length;
            state.profissionais[objectLenght] = profissional;
        },
        editProfissional(state, profissional) {
            const index = state.profissionais.findIndex(item => item.id == profissional.id);
            state.profissionais.splice(index, 1, profissional);
        },
        deleteProfissional(state, idProfissional) {
            const index = state.profissionais.findIndex(item => item.id == idProfissional);
            state.profissionais.splice(index, 1);
        },
        retrieveProfissionais(state, data) {
            state.profissionais = data;
        },
    },
    actions: {
        retrieveForms(context) {
            axios.get('/forms')
                .then(response => {
                    context.commit('retrieveForms', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        retrieveClientes(context) {
            axios.get('/cliente')
                .then(response => {
                    context.commit('retrieveClientes', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        retrieveProfissionais(context) {
            axios.get('/profissionais')
                .then(response => {
                    context.commit('retrieveProfissionais', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        submitForm(context, config) {
            //Axios é configurado de acordo ao form
            console.log(config);
            return new Promise((resolve, reject) => {
                axios({
                    method: config.method.toLowerCase(),
                    url: config.action,
                    data: this.state.formContent
                })
                    .then((response) => {
                        context.commit(config.mutation, response.data);
                        context.commit('clearFormContent');
                        resolve(response);
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    });
            });
        },
        deleteCliente(context, id) {
            axios.delete('/deletar/' + id)
                .then(response => {
                    console.log(response.data);
                    context.commit('deleteCliente', id);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        deleteProfissional(context, id) {
            axios.delete('/deletarProfissional/' + id)
                .then(response => {
                    console.log(response.data);
                    context.commit('deleteProfissional', id);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        instantiateForm(context, form) {
            if (this.state.forms.length > 0) {
                context.commit('instantiateForm', form)
            }
            else {
                return new Promise((resolve, reject) => {
                    axios.get('/forms')
                        .then(response => {
                            context.commit('retrieveForms', response.data);
                            context.commit('instantiateForm', form);
                            resolve(response);
                        })
                        .catch(error => {
                            console.log(error);
                            reject(error);
                        });
                });
            }
        },
    }
});