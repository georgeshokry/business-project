<template>
<!--    this msg view after signup first account-->

            <v-layout   row wrap justify-center style="padding: 25px;    margin-top: 25px;">
                <v-flex lg8 xl5 xs10 style="margin: auto">
                    <v-layout  class="pa-0" justify-center style="padding: 25px;height: 150px">
                        <div class="animated infinite bounce slower">
                        <img width="150" alt="email-confrimation" src="/images/Email-confirmation_Red.svg">
                        </div>
                    </v-layout>
                    <v-layout  class="pa-0 pt-1" justify-center>
                    <div style="text-align: center;font-size: xx-large;font-weight: bold;">
                        {{$t('registration.signup.So Far, So Good')}}
                    </div>
                    </v-layout>
                    <v-layout  class="pt-0"  justify-center >

                        <v-flex lg8 xl6 xs12>
                        <v-card-subtitle style="text-align: center;font-size: medium;">
                            {{$t('registration.signup.A confirmation email has been sent')}}
                        </v-card-subtitle>
                        </v-flex>
                    </v-layout>
                    <v-layout  class="pt-0"  justify-center >
                        <v-btn text rounded @click="resendEmail" v-if="counterReSend" :loading="loadingSend" style="color: #E60000;font-weight: bold;">{{$t('registration.signup.Resend Confirmation Email')}}</v-btn>
                    </v-layout>
                </v-flex>

            </v-layout>

</template>

<script>
    let counter=120000;
    import Store from '../../../store/store';
    export default {
        name: "confirmEmail",
        data:()=>{
            return{
                counterReSend: false,
                loadingSend: false,
            }
        },
        beforeRouteEnter (to, from, next) {
            Store.commit('setDisableMyProfileBtn', false);
            next();
        },
        beforeDestroy(){
            this.$store.commit('setDisableMyProfileBtn', true);
        },
        mounted() {
            this.reViewLink();
        },
        computed:{
            getResendEmailFlag(){
                return this.$store.getters.getResendEmailFlag;
            }
        },
        watch:{
            getResendEmailFlag(flag){
                if(flag === 'sent' ){
                    this.counterReSend = false;
                    this.reViewLink();
                    this.$store.commit('setClearAppMsgs');
                    this.$store.commit('setAppMsgs', {
                        msg:"registration.signup.sent verify email",
                        color: "success",
                        icon: "check"
                    });
                }else if(flag === true ){
                    this.$router.replace({name: 'personalProfileRegisteration'});
                    this.$store.commit('setClearAppMsgs');
                    this.$store.commit('setAppMsgs', {
                        msg:"registration.signup.already verified",
                        color: "info",
                        icon: "info"
                    });
                }
            }
        },
        methods:{
            resendEmail(){
                this.loadingSend = true;
                this.$store.dispatch('reSendConfirmEmail');

                counter = counter*2;
            },
            reViewLink(){
                setTimeout(()=>{
                    this.loadingSend = false;
                    this.counterReSend = true;
                }, counter);
            }
        }
    }
</script>

<style scoped>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css';
    >>>.v-card__subtitle, >>>.v-card__text {
        font-size: 20px !important;
        font-weight: 400;
        line-height: 1.375rem;
    }
</style>
