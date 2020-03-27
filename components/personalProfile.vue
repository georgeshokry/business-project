<template>
<v-card flat >
    <header-data></header-data>
    <v-divider dark></v-divider>
    <user-profile-edit></user-profile-edit>
</v-card>
</template>

<script>
    import userInfoMixin from "./userInfoMixin";
    import HeaderData from "./personalProfile/header-data";
    import UserProfileEdit from "./personalProfile/userProfileEdit";
    import inbox from "./inbox/inbox";
    export default {
        name: "personalProfile",
        components: {UserProfileEdit, HeaderData, inbox},
        mixins:[userInfoMixin],
        data:()=>{
            return{

            }
        },
        created(){
            this.$store.dispatch('userData', {id:this.$route.params.id, lang: this.$route.params.lang});
            this.$store.dispatch('checkUserAuth', this.$route.params.id);
            this.$store.commit('setLoadingSignOut', false);
        },
        watch:{
          '$route'(from, to){
              this.$store.dispatch('userData', {id:this.$route.params.id, lang: this.$route.params.lang});
              this.$store.dispatch('checkUserAuth', this.$route.params.id);
          }
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>