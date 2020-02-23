<template>
  <div>
    <div class="container">
      <button @click="cadastrar" class="btn btn-primary mb-3 mt-2">Cadastrar Novo Profissional</button>
      <table v-if="getAllProfissionais.length > 0" class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Profissão</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="profissional in getAllProfissionais" :key="profissional.id">
            <th scope="row">{{profissional.id}}</th>
            <td>{{profissional.nome}}</td>
            <td>{{profissional.profissao}}</td>
            <td>
              <button @click="editar(profissional)" class="btn btn-outline-success mr-2">
                <b-icon icon="pencil"></b-icon>
              </button>
              <button @click="deletar(profissional.id)" class="btn btn-outline-danger">
                <b-icon icon="trash"></b-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <h2 v-else>Não há profissionais cadastrados</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "profissional-list",
  computed: {
    ...mapGetters(["getAllProfissionais"])
  },
  methods: {
    cadastrar() {
      this.$store.commit("instantiateForm", {
        form: "Formulário do Profissional",
        formHeader: "Cadastrar",
        mutation: "addProfissional",
        backPage: "profissionais",
      });
      this.$router.push({ name: "cadastrarProfissional" });
    },
    editar(cliente) {
      //cria um object input sem a chave id
      const inputs = Object.keys(cliente).reduce((object, key) => {
        if (key !== 'id') {
          object[key] = cliente[key];
        }
        return object;
      }, {});

      this.$store.commit("instantiateForm", {
        form: "Formulário do Profissional",
        formHeader: "Editar",
        mutation: "editProfissional",
        backPage: "profissionais",
        inputValues: inputs
      });

      this.$store.commit("includeEditContentData", inputs);

      this.$router.push({ name: "editarProfissional", params: { id: cliente.id } });
    },
    deletar(id) {
      this.$store.dispatch("deleteProfissional", id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
