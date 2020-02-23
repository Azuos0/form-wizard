import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

axios.defaults.baseURL = "http://localhost:8000/api";

export default new Vuex.Store({
    state: {
        clientes: [],
        profissionais: [],
        forms: [],
        formContent: {},
        formSelectedInfo: {}
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
        getFormSelectedInfo(state){
            return state.formSelectedInfo;
        }
    },
    mutations: {
        //Métodos relacionados aos formulários
        getForm(state, id) {
            return state.forms.find(form => form.id === id);
        },
        includeDataContent(state, input) {
            state.formContent[input.nome] = input.valor;
        },
        includeEditContentData(state, data){
            state.formContent = data;
        },
        retrieveForms(state, data) {
            state.forms = data;
        },
        instantiateForm(state, dados){
            state.formSelectedInfo = dados;
        },
        clearFormContent(state) {
            state.formContent = {};
        },

        // Métodos relacionados aos clientes ///
        getCliente(state, id){
            return state.clientes.find(cliente =>cliente.id === id);
        },
        addCliente(state, cliente){
            const objectLenght = Object.keys(state.clientes).length;
            state.clientes[objectLenght] = cliente;
        },
        editCliente(state, cliente){
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
        getProfissional(state, id){
            return state.profissionais.find(cliente =>cliente.id === id);
        },
        addProfissional(state, profissional){
            const objectLenght = Object.keys(state.profissionais).length;
            state.profissionais[objectLenght] = profissional;
        },
        editProfissional(state, profissional){
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
            return new Promise((resolve, reject)=> {
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
        }
    }
});