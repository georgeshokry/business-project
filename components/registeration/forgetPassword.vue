<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>

<v-form ref="form">
    <v-card  min-height="45vh" width="500px">
        <v-container fluid fill-height class="pa-0">
                <v-layout row wrap justify-center fill-height style="padding: 25px;">
                    <v-flex lg8 xs10>
                        <v-card-title style="color: #e60000; justify-content: center;">
                            {{ $t('registration.signin.Send Reset Password') }}
                        </v-card-title>
                    </v-flex>

                    <v-flex lg8 xs10 style="margin: auto;text-align: center;">
                        <v-text-field
                                :rules="[ value => !!value || $t( 'registration.signup.required' ) , value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || $t('registration.signup.emailvalid')]"
                                v-model="forgetemail"
                                class="ma-1"
                                :placeholder="$t( 'registration.signup.Email' )"
                                dense
                                solo
                                color="#e60000"
                                autocomplete="off"
                                :error-messages="wrongEmail === 'Wrong Email, Try again!' ? $t('registration.signin.Wrong Email, Try again!') : ''"
                        >
                        </v-text-field>

                        <transition name="fade">
                        <v-alert text v-if="sendMsg !== ''" border="left" type="success" colored-border style="color: green">
                            {{sendMsg === 'Email sent' ? $t('registration.signin.Wrong Email, Try again!') : ''}}
                        </v-alert>

                        </transition>



                        <v-btn small dark rounded color="#e60000" @click="SendResetEmailLink()" :loading="sendLaoding" :disabled="disBtn">


                            {{textBtn === 'Send' ? $t('registration.signin.Send') : textBtn === 'Sent' ? $t('registration.signin.Sent') : ''}}
                        </v-btn>
                    </v-flex>
                </v-layout>
        </v-container>
    </v-card>
</v-form>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "forgetPassword",
        data:()=>{
            return{
                textBtn: 'Send',
                disBtn: false,
                sendLaoding: false,
                wrongEmail: '',
                forgetemail: '',
                sendMsg: '',
                rules: {

                    required: value => !!value || 'Required.',
                    email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"
                },
            }
        },
        computed:{
            getResetPasswordMsg(){
                return this.$store.getters.getResetPasswordMsg;
            }
        },
        watch:{
            getResetPasswordMsg(flag){
                if(flag === 1){
                    this.wrongEmail = "Wrong Email, Try again!";
                    this.sendLaoding = false;
                }else if(flag === true){
                    this.disBtn = true;
                    this.wrongEmail = "";
                    this.textBtn = "Sent";
                    this.sendMsg = "Email sent";
                    this.sendLaoding = false;
                }
            }
        },
        methods: {
            SendResetEmailLink(){
                this.wrongEmail = "";
                this.sendLaoding = true;
                this.$store.commit('setResetPasswordMsg', null);
                if(this.$refs.form.validate()) {
                    this.$store.dispatch('SendResetEmailLink', {
                        email: this.forgetemail,
                    });


                }

            },
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
