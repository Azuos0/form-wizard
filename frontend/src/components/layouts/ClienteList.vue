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
      this.$router.push({ name: "cadastrarCliente", query:{form:0}});
    },
    editar(cliente) {
      this.$store.commit("includeEditContentData", cliente);
      this.$router.push({ name: "editarCliente", params: { id: cliente.id }, query:{form:1} });
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
