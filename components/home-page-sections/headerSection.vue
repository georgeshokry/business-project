<template>
    <v-card flat class="header-bg">
        <v-container fluid fill-height>
        <v-layout justify-center align-center style="    height: 325px;">
            <v-flex d-flex lg5 >
                <div style="padding: 20px;font-size: 20px" class="animated bounceInDown  delay-1s">
                    <v-card-title class="pa-0 head-title" style="text-align: initial;">{{$t('home-page-sections.headerSection.Individual or Group')}}</v-card-title>
                    <v-card-title class="pa-0 head-title" style="text-align: initial;">{{$t('home-page-sections.headerSection.Professional or Enterprise')}}</v-card-title>

                    <v-card-title class="sec-title pa-0" style=" letter-spacing: inherit;font-size: 19px !important;word-break: normal;text-align: initial;">

                        {{$t('home-page-sections.headerSection.Your BUSINESS is Visible')}}

                    </v-card-title>
                    <v-layout justify-center align-center>

                        <v-layout row wrap>
                            <v-btn
                                    rounded
                                    elevation="0"
                                    small
                                    color="#E60000"
                                    style="color: white;width: 210px;font-weight: bold;"
                                    :to="{name: 'chooseBusinessType', params:{lang: $i18n.locale}}"
                            >
                                {{$t('home-page-sections.headerSection.create your business now')}}
                            </v-btn>
                            <div style="margin-right:5px; margin-left:5px;font-weight: 300;" v-if="checkLoggedin">
                                {{$t('home-page-sections.headerSection.or')}}
                            </div>
                            <v-btn
                                    v-if="checkLoggedin"
                                    rounded
                                    outlined
                                    small
                                    color="#E60000"
                                    style="width:180px;font-weight: bold;"
                                    @click="loginPage('lo')"
                            >
                                {{$t('home-page-sections.headerSection.Login to your account')}}
                            </v-btn>
                </v-layout>
            </v-layout>
        </div>
            </v-flex>
            <v-flex d-flex lg2 xl2 style="justify-content: flex-end;" class="animated infinite pulse slower">
                <img  :style="[ checkRtlFlag === true ? {'transform': 'rotateY(180deg)'} : '' ]"  class="dis-in-mobile " width="270"  src="../resources/Laptop.svg">
            </v-flex>
            </v-layout>


        </v-container>

        <v-flex style="margin-left: 23%; margin-right: 23%;" class="trustedby-header">
            <h5 style="margin-bottom:0;padding: 5px;text-align: center;">{{$t('home-page-sections.headerSection.TRUSTED BY')}}</h5>
        </v-flex>
        <v-card flat style="background-color: #333333; border-radius: 0;">

<!--                <v-container fluid fill-height>-->
                    <v-layout row justify-center align-center>
            <v-flex lg1 sm2 xs2 md1 >
                <v-slide-item

                >
                    <v-card-title class="trusted-num pr-0 pl-0">
                        50+
                    </v-card-title>
                </v-slide-item>
            </v-flex>
            <v-flex lg5 xl6 md5 xs7>
            <v-sheet
                    class="mx-auto"
                    elevation="0"
                    max-width="1800px"
                    style="background-color: #333333"
            >
                <v-slide-group
                        v-model="model"
                        class="pa-2"
                        active-class="success"
                        show-arrows
                        style="height: 130px;"
                        dark
                >

                    <v-slide-item
                            v-for="n in 10"
                            :key="n"

                    >
                        <div

                                class="ma-4"


                        >
                            <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center"
                            >
                                <v-img
                                        width="100px"
                                        height="80px"
                                        src="https://brandlance.com/wp-content/uploads/2018/03/LARGE-brandlance-black-logo.png"
                                >

                                </v-img>
                            </v-row>
                        </div>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
            </v-flex>
                    </v-layout>
<!--                </v-container>-->

        </v-card>

<!--        <v-layout row wrap justify-center align-center class="join-now-div">-->
<!--            <h5 style="text-align: center;margin-bottom:0" class="dis-in-mobile">{{$t('home-page-sections.headerSection.Join them and list your business on our network')}}</h5>-->
<!--            <v-divider dark vertical class="ma-3"></v-divider>-->
<!--            <v-btn-->
<!--                    rounded-->
<!--                    elevation="0"-->
<!--                    small-->
<!--                    color="#ff0000"-->
<!--                    style=" color: white; letter-spacing: 0.015rem;font-size: 14px;"-->
<!--            >-->
<!--                {{$t('home-page-sections.headerSection.Make your business Visible')}}-->
<!--            </v-btn>-->
<!--        </v-layout>-->
    </v-card>
</template>

<script>
    export default {
        name: "headerSection",
        data:()=>{
            return{
                model: null,
                checkRtlFlag: null,
                checkLoggedin: null,
            }
        },
        created(){
           if(localStorage.getItem('s') !== ''){
               this.checkLoggedin = false;
           }else {
               this.checkLoggedin = true;
           }
            this.$vuetify.rtl === true ? this.checkRtlFlag = true : "";
        },
        computed:{
            checkRtl(){
                return this.$vuetify.rtl;
            },
            checkUserAuth(){
                return this.$store.getters.getAuthFlag;
            },
        },
        watch:{

            checkRtl(flag){
                flag === true ? this.checkRtlFlag = true : this.checkRtlFlag = false;
            }
        },
        methods:{
            loginPage(type){
                if(this.$router.currentRoute.name !== 'authPage') {
                    if (type === 'lo') {
                        this.$router.push({
                            name: 'authPage',
                            params: {lang: this.$route.params.lang},
                            query: {type: 'login'}
                        });
                    } else if (type === 're') {
                        this.$router.push({
                            name: 'authPage',
                            params: {lang: this.$route.params.lang},
                            query: {type: 'register'}
                        });
                    }
                }
            },
        }
    }
</script>

<style scoped>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css';
>>>.img-bg{
    /* Set rules to fill background */
    height: 100%;

    /* Set up proportionate scaling */
    width: 100%;

    /* Set up positioning */
    position: fixed;
    top: 0;
    left: 0;
}
    >>>.sec-title{
        font-weight: 600;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    >>>.trustedby-header{
        width: 135px;
        border-radius: 10px 10px 0 0;
        background-color: #333333;
        color: white;
        text-align: center;
        justify-content: center;
    }
    >>>.join-now-div{
        background-color: #f1f1f1;
        min-height: 65px;
    }
    >>>.dis-in-mobile{
        display: block;
    }
@media only screen and (max-width: 600px) {
    .dis-in-mobile{
        display: none !important;
    }
}
    >>>.trusted-num{
        color:white;
        font-weight: bold;
        font-size: xx-large;
        justify-content: center;
    }
    .header-bg{
        background-image: url("../resources/BGpic.png");
        background-position: center center;
        background-repeat-x: unset;
    }
    >>>.head-title{
        color:#E60000;
        font-weight: 300;
        font-size: 19px !important;
        word-break: normal !important;
    }
</style>