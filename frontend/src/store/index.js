import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

axios.defaults.baseURL = "http://localhost:8000/api";

export default new Vuex.Store({
    state: {
        clientes:[],
        forms: [],
        formContent: []
    },
    getters: {
        getAllForms(state) {
            return state.forms;
        },
        getFormContent(state) {
            return state.formContent;
        },
        getAllClientes(state){
            return state.clientes;
        }
    },
    mutations: {
        getForm(state, id) {
            return state.forms.find(form => form.id === id);
        },
        includeDataContent(state, content) {
            //problema nessa seção (campo pode ficar com mais de um item)
            state.formContent.push(content);
        },
        retrieveForms(state, data) {
            state.forms = data;
        },
        retrieveClientes(state, data) {
            state.clientes = data;
        },
        constructParams(state, params) {
            state.formContent.forEach(input => {
                params.append(input.nome, input.valor)
            });
            return params;
        }
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
        retrieveClientes(context){
            axios.get('/cliente')
                .then(response => {
                    context.commit('retrieveClientes', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        submit(context, config) {
            const params = new URLSearchParams();
            context.commit('constructParams', params);

            if (config.method.toLowerCase() === 'post'){
                axios.post(config.action, params)
                    .then((response) => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            else if (config.method.toLowerCase() === 'patch'){
                axios.patch(config.action, params)
                    .then((response) => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            else{
                axios.put(config.action, params)
                .then((response) => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
    }
});