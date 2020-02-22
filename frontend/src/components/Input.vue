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
            valor: null
        }
    },
    props: {
     nome:{
         type: String,
         required: true
     },
     id:{
         type:Number,
         required: true
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