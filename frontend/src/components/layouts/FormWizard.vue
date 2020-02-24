<template>
  <div>
    <form v-if="form" @submit.prevent="submitForm" ref="form">
      <div class="container mt-2">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <div class="card card-header">
              <H3>{{form.nome}} - {{formHeader.nome}}</H3>
            </div>
            <div class="card card-body">
              <div class="form-group" v-for="(input, index) in form.inputs" :key="index">
                <label for="exampleFormControlInput1">{{input.label}}</label>
                <component
                  :is="input.tipo"
                  :nome="input.nome"
                  :options="input.options"
                  :value="getFormContent? getFormContent[input.nome] : null"
                  :id="input.id"
                ></component>
                <hr />
              </div>
            </div>
            <div class="card card-footer">
              <button type="submit" class="btn btn-outline-primary">{{formHeader.nome}}</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <h3 v-else>Carregando Formulário...</h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import inputDate from "../Date";
import inputText from "../Input";
import inputSelect from "../Select";

export default {
  name: "form-wizard",
  data() {
    return {
      form: {},
      formHeader: {},
    };
  },
  mounted(){
    this.instantiateForm();
  },
  beforeDestroy(){
    this.$store.commit('clearFormContent');
    this.$store.commit('clearSelectedOption');
  },
  components: {
    inputDate,
    inputText,
    inputSelect
  },
  computed: {
    ...mapGetters(["getAllForms", "getFormContent", "getFormSelectedInfo"]),
  },
  methods: {
    submitForm() {
      const action = this.$route.params.id ? '/'+ this.$route.params.id : ''

      this.$store.dispatch("submitForm", {
        action:this.formHeader.url + action, 
        method:this.formHeader.method,
        mutation: this.getFormSelectedInfo.mutation
      }).then(() => {
        this.$router.push({name:this.getFormSelectedInfo.backPage});
      });
    },
    instantiateForm(){
      this.$store.dispatch('instantiateForm', this.$route.query.form)
      .then(() => {
        this.form = this.getAllForms.find(form => form.nome.toLowerCase() === this.getFormSelectedInfo.form.toLowerCase())
        this.formHeader = this.form.headers.find(header => 
          header.nome.toLowerCase() === this.getFormSelectedInfo.formHeader.toLowerCase()
        );
      })
    }
  }
};
</script>