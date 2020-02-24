<template>
  <div>
    <div class="container">
      <button @click="cadastrar" class="btn btn-primary mb-3 mt-2">Cadastrar Novo Cliente</button>
      <table v-if="getAllClientes.length > 0" class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Sexo</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in getAllClientes" :key="cliente.id">
            <th scope="row">{{cliente.id}}</th>
            <td>{{cliente.nome}}</td>
            <td>{{cliente.sexo}}</td>
            <td>
              <button @click="editar(cliente)" class="btn btn-outline-success mr-2">
                <b-icon icon="pencil"></b-icon>
              </button>
              <button @click="deletar(cliente.id)" class="btn btn-outline-danger">
                <b-icon icon="trash"></b-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <h2 v-else>Não há usuários cadastrados</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "client-list",
  computed: {
    ...mapGetters(["getAllClientes"])
  },
  methods: {
    cadastrar() {
      this.$store.commit("instantiateForm", {
        form: "Formulário do Cliente",
        formHeader: "Cadastrar",
        mutation: "addCliente",
        backPage: "clientes",
      });
      this.$router.push({ name: "cadastrarCliente" });
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
        form: "Formulário do Cliente",
        formHeader: "Editar",
        mutation: "editCliente",
        backPage: "clientes",
        inputValues: inputs
      });

      this.$store.commit("includeEditContentData", inputs);

      this.$router.push({ name: "editarCliente", params: { id: cliente.id } });
    },
    deletar(id) {
      this.$store.dispatch("deleteCliente", id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
