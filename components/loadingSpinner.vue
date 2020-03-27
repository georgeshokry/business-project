<template>
    <div
            style="
                 height: 100vh;
                 width: 100%;
                 display: flex;
                 align-items: center;
                 justify-content: center;
                 position: relative;">
        <v-progress-circular
                :size="70"
                :width="7"
                color="red"
                indeterminate
        ></v-progress-circular>

    </div>
</template>

<script>
    export default {
        name: "loadingSpinner",
        data:()=>{
            return{
                loading: true,
                loaded: false
            }
        },
        computed:{
            getLoadingSpinner(){
                return this.$store.getters.getLoadingSpinner;
            }
        },
        watch:{
            getLoadingSpinner(flag){
                if (flag !== null){
                    if (flag === true){
                        this.loading= true;
                    } else {
                        this.loading= false;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>