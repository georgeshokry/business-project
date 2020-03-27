<template>
    <v-container style="min-height:85vh">
        <v-layout row wrap justify-content-center>
<!--            <v-card-title class="pa-5" >-->
<!--                <img width="250" src="/images/headerLogo.png"/>-->
<!--            </v-card-title>-->
        </v-layout>
        <v-layout row wrap justify-content-center style="margin-bottom: 10px;">
            <v-card-title style="text-align: center;height: 60px;">
                <p style="text-align: center;">
<!--                <span style="color: #E60000"> Register</span>-->
<!--                    <br/>-->
                {{ $t('registration.authPage.Personal Profile') }}
                </p>
            </v-card-title>
            <v-card-title style="text-align: center;height: 60px;">
                <p style="text-align: center;">
<!--                <span style="color: #E60000"> List </span>-->
<!--                    <br/>-->
                    {{ $t('registration.authPage.Free Business Listing') }}
                </p>
            </v-card-title>
            <v-card-title style="text-align: center;height: 60px;">
                <p style="text-align: center;">
<!--                <span style="color: #E60000">  Create</span>-->
<!--                    <br/> -->
                    {{ $t('registration.authPage.Efficient Business Page') }}
                </p>
            </v-card-title>
        </v-layout>
        <v-layout row wrap justify-content-center>
        <v-flex lg8 xl5 md7 sm8>
            <v-tabs
                    v-model="tab"

                    show-arrows
                    grow
                    color="red"
                    active-class="clicked-tab"
                    centered
                    class="elevation-2"
                    slider-color="#e60000"
                    background-color="#f2f2f2"
            >
                <v-divider  vertical></v-divider>

                <v-tab
                        style=" font-size: large;"
                        transition="scroll-y-transition"
                >

                    {{ $t('registration.authPage.Register') }}
                </v-tab>
                <v-divider  vertical color="#e60000" class="ma-0"></v-divider>
                <v-tab
                        style=" font-size: large;"
                        transition="scroll-y-transition"
                >

                    {{ $t('registration.authPage.sign in') }}
                </v-tab>





                <v-tab-item
                        eager
                >
                    <signup></signup>
                </v-tab-item>
                <v-tab-item
                        eager
                >
                    <signin></signin>
                </v-tab-item>


            </v-tabs>

        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Signin from "./signin";
    import Signup from "./signup";
    export default {
        name: "authPage",
        components: {Signup, Signin},
        data:()=>{
            return{
                tab:null,

            }
        },
        mounted(){
            if(this.$route.query.type === 'login') {
                this.tab = 1;
            }else if( this.$route.query.type === 'register'){
                this.tab = 0;
            }
        },

        methods: {

        }
    }
</script>

<style scoped>
>>>.v-tab {
    align-items: center;
    display: flex;
    flex: 0 1 auto;
    font-size: .875rem;
    font-weight: 500;
    justify-content: center;

    line-height: normal;
    min-width: 90px;
    max-width: 360px;
    outline: none;
    padding: 0 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
    >>>p{
        margin-bottom: 0 !important;
    }
</style>
