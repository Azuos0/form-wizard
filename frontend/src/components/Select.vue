<template>
  <div class="form-group">
    <select @change="adicionarValor" v-model="valor" class="form-control" id="exampleFormControlSelect1" :name="this.nome">
      <option v-for="(option, index) in options" :key="index">{{option.valor}}</option>
    </select>
  </div>
</template>

<script>
export default {
    name: 'input-select',
    data(){
        return{
            valor: this.value
        }
    },
    props: {
     nome:{
         type: String,
         required: true
     },
     options:{
         type: Array,
         required: true
     },
     value:{
         type:String || null
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