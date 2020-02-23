<template>
    <div>
        <input @change="adicionarValor" v-model="valor" type="text" class="form-control" placeholder="" :name="nome" 
            ref="my_input">
    </div>
</template>

<script>
export default {
    name: 'input-text',
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
     value:{
         type: String || null,
     }
    },
    methods: {
         adicionarValor(){
            this.$store.commit('includeDataContent', {
                nome: this.nome,
                valor: this.valor
            });
         }
    }
}
</script>