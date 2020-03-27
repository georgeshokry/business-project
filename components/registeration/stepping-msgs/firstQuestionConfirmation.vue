<template>
    <v-container class="pa-0">
        <v-card width="70%" elevation="2" style="margin: auto">
<!--            this show right after basic info form-->
        <v-layout jusify-content-center v-if="showQuestion">
            <v-flex lg12 class="pa-2 animated fadeInDown">
                    <v-img
                            class="animated infinite pulse slow "
                            alt="business-account"
                            height="150px"
                            width="160px"
                            style=" margin: auto;"
                            src="/images/List_business_Dark.svg"
                    >
                    </v-img>
<!--            <div class="pt-0 first-line" >-->
<!--                {{$t('registration.personalProfileRegisteration.If you have a business or wish to build one')}}-->
<!--            </div>-->
            <div class="pt-0 second-line" v-html="$t('registration.personalProfileRegisteration.Get')">

            </div>
                <div class="pt-0 mb-3" style="color:#666666; justify-content: center;text-align: center;font-size: x-large;">
                    <span>{{$t('registration.personalProfileRegisteration.Your business will be visible locally & globally')}}</span>
                </div>
                <v-flex lg12  class="pb-2" style="justify-content: center;text-align: center;">
                    <v-btn @click="chooseYes()" rounded  dark color="#E60000" elevation="0" style="font-size: 17px;margin-bottom: 15px;letter-spacing: 0.03568rem;">
                        {{$t('registration.personalProfileRegisteration.List your business for FREE')}}
                    </v-btn>
                    <v-btn @click="chooseNo()" rounded outlined color="#E60000" style="font-size: 17px;margin-bottom: 15px;">
                        {{$t('registration.personalProfileRegisteration.No Thanks')}}
                    </v-btn>
<!--                    <v-radio-group-->
<!--                            v-model="userChoice"-->
<!--                            style="margin-top: 15px;justify-content: center;"-->
<!--                            row-->
<!--                            color="#E60000"-->
<!--                    >-->
<!--                        <v-radio value="yes" color="#E60000" label="Yes,List my business"></v-radio>-->
<!--                        <v-radio value="no" color="#E60000" label="No,Thank you"></v-radio>-->
<!--                    </v-radio-group>-->
<!--                    <v-scroll-y-transition>-->
<!--                    <v-btn rounded dark color="#E60000" v-if="userChoice==='no'" >Finish</v-btn>-->
<!--                    <v-btn rounded dark color="#E60000" v-if="userChoice==='yes'" to="choose-type">Create Free Business Account</v-btn>-->
<!--                    </v-scroll-y-transition>-->

                </v-flex>
            </v-flex>
        </v-layout>
<!--            this show if user select NO from previous question-->
        <v-layout jusify-content-center v-if="showCong" style="min-height: 345px;">
            <v-flex lg12>
                <v-card-title class="pa-0 pb-1" style="justify-content: center;"  >
                    <div class="animated rotateIn mt-5">
                    <v-icon size="150" style="background-color: green;border-radius: 50%;" color="white" v-if="showCheck">check</v-icon>
                    </div>
                </v-card-title>
            <v-card-title class="pt-0 pb-0 cong">
                {{$t('registration.personalProfileRegisteration.Cong')}}
            </v-card-title>
            <div class="pt-0" style="font-size:larger ;justify-content: center;text-align: center">
                <span style="font-size: x-large;font-weight: bold;">{{$t('registration.personalProfileRegisteration.You have created your Personal Account')}}</span>
            </div>
                <div class="pt-0" style="font-size:larger ;justify-content: center;text-align: center">
                    <span style="font-size: x-large;">{{$t('registration.personalProfileRegisteration.You will be redirect')}} {{timer}}</span>
                </div>
            </v-flex>
        </v-layout>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "firstQuestionConfirmation",
        data:()=>{
            return{
                userChoice: '',
                showCheck:false,
                showCong: false,
                showQuestion: true,
                timer: 7,
            }
        },
        beforeDestroy(){
            this.$store.commit('setDisableMyProfileBtn', true);
        },
        mounted() {

        },
        methods:{
            chooseYes(){
                this.$router.replace({path: 'choose-type'})
            },
            chooseNo(){
                this.showQuestion = false;
                this.showCong = true;
                this.showCheck = true;
                this.countDown()

            },
            countDown(){
                if (this.timer !== 0) {
                    setTimeout(() => {
                        this.timer--;
                        this.countDown();
                    }, 1000)

                    if(this.timer === 1){
                        let personalSlug = this.$store.getters.getUserProfiles;
                        this.$router.replace({name: 'personalProfile', params:{id: personalSlug[0].slug, lang:this.$route.params.lang}})
                    }

                }
            }
        }
    }
</script>

<style scoped >
    @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css';
    >>>.slide-fade-enter-active {
        transition: all .20s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    >>>.slide-fade-leave-active {
        transition: all .20s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    >>>.slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateY(100px);
        opacity: .5;
    }
    >>>.v-label {
        font-size: 30px !important;
        line-height: 1;
        min-height: 8px;
        transition: .3s cubic-bezier(.25,.8,.5,1);
    }

    >>>.first-line{
        color:#E60000;
        text-align: center;
        justify-content: center;
        font-size: xx-large;
    }
    >>>.second-line{
        justify-content: center;
        text-align: center;
        font-size: xx-large;
        font-weight: bold;
    }
    >>>.cong{
        justify-content: center;
        color: #E60000;
        font-size: xx-large;
        font-weight: bold;
        margin-bottom: 15px;
    }
</style>
