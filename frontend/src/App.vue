<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <form v-if="getFormInputs" @submit.prevent="cadastrar" ref="form">
      <div class="container mt-2">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <div class="card card-header">
              <H3>{{getFormInputs.nome}}</H3>
            </div>
            <div class="card card-body">
              <div class="form-group" v-for="(input, index) in getFormInputs.inputs" :key="index">
                <label for="exampleFormControlInput1">{{input.label}}</label>
                <component
                  :is="input.tipo"
                  :nome="input.nome"
                  :valores="input.values"
                  :valor="input.valor"
                  :id="input.id"
                ></component>
                <hr />
              </div>
            </div>
            <div class="card card-footer">
              <button type="submit" class="btn btn-outline-primary">{{getFormInputs.button}}</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <h3 v-else>Carregando Formulário</h3>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import inputDate from "./components/Date";
import inputText from "./components/Input";
import inputSelect from "./components/Select";

export default {
  name: "App",
  data() {
    return {
      id: 1
    };
  },
  beforeCreate() {
    this.$store.dispatch("retrieveForms");
  },
  components: {
    inputDate,
    inputText,
    inputSelect
  },
  computed: {
    ...mapGetters(["getAllForms", "getFormContent"]),
    getFormInputs() {
      const temp = this.getAllForms.find(form => form.id === this.id);
      return temp;
    }
  },
  methods: {
    ...mapMutations(["getForm"]),
    cadastrar() {
      this.$store.dispatch("submit", {
        action:this.getFormInputs.action, 
        method:this.getFormInputs.method
        });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
