<template>
  <div class="form-group">
    <select @change="adicionarValor" v-model="valor" class="form-control" id="exampleFormControlSelect1" :name="this.nome">
      <option v-for="(valor, index) in valores" :key="index">{{valor.valor}}</option>
    </select>
  </div>
</template>

<script>
export default {
    name: 'input-select',
    data(){
        return{
            valor: null
        }
    },
    props: {
     nome:{
         type: String,
         required: true
     },
     valores:{
         type: Array,
         required: true
     },
     id:{
         type: Number,
         required: true
     }   
    },
    methods:{
        adicionarValor(){
            this.$store.commit('includeDataContent', {
                nome: this.nome,
                valor: this.valor
            });
        }
    }
};
</script>