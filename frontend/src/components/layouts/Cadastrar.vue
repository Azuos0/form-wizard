<template>
  <div>
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
    <h3 v-else>Carregando Formulário...</h3>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import inputDate from "../Date";
import inputText from "../Input";
import inputSelect from "../Select";

export default {
  name: "App",
  data() {
    return {
      id: 1
    };
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