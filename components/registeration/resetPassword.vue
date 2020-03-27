<template>
    <v-container fluid fill-height>

        <v-layout justify-center align-center v-if="errorForReseting">
            <v-card  min-height="fit-content" width="400px">

                    <v-layout row wrap justify-center fill-height style="padding: 25px;">
                        <v-container fluid fill-height class="pa-0">
                    <v-flex lg8 xs10 style="margin: auto;text-align: center;">

            <v-alert text  border="left" type="error" colored-border style="color: red">
                Bad or Expired Link
            </v-alert>
            <v-btn small dark rounded color="#e60000" to="/en/login">
                Back To Login
            </v-btn>

                    </v-flex>
                        </v-container>
                    </v-layout>

            </v-card>
        </v-layout>
        <v-layout justify-center align-center v-else-if="errorForReseting === false">

            <v-form ref="form">
            <v-card  min-height="45vh" width="400px">
                <v-container fluid fill-height class="pa-0">
                    <v-layout row wrap justify-center fill-height style="padding: 25px;">
                        <v-flex lg8 xs10>
                            <v-card-title style="color: #e60000; justify-content: center;">
                                Reset Password
                            </v-card-title>
                        </v-flex>

                        <v-flex lg8 xs10 style="margin: auto;text-align: center;">
                            <v-text-field
                                    :rules="[rules.required, rules.email]"
                                    v-model="confirmEmail"
                                    class="ma-1"
                                    placeholder="Email"
                                    dense
                                    solo
                                    color="#e60000"
                                    autocomplete="new-password"
                                    :error-messages="wrongEmailToreset"
                            >
                            </v-text-field>
                            <v-text-field
                                    :rules="[rules.required,rules.min]"
                                    v-model="newPassword"
                                    class="ma-1"
                                    placeholder="Password"

                                    dense
                                    solo
                                    color="#e60000"
                                    :type="show ? 'text' : 'password'"
                                    :append-icon="show ? 'visibility' : 'visibility_off'"
                                    @click:append="show = !show"
                                    autocomplete="new-password"
                            ></v-text-field>
                            <v-text-field
                                    :rules="[rules.required,passwordConfirmationRule]"
                                    v-model="confirmNewPassword"
                                    class="ma-1"
                                    placeholder="Password"

                                    dense
                                    solo
                                    color="#e60000"
                                    :type="show ? 'text' : 'password'"
                                    :append-icon="show ? 'visibility' : 'visibility_off'"
                                    @click:append="show = !show"
                                    autocomplete="new-password"
                            ></v-text-field>
                            <v-alert text v-if="successReset !== ''" border="left" type="success" colored-border style="color: green">
                                {{successReset}}
                            </v-alert>
                            <v-btn small dark rounded color="#e60000" @click="ResetPassword()" :loading="resetPasswordBtn">
                                Reset password
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
        name: "resetPassword",
        data:()=>{
            return{
                show: false,
                errorForReseting: '',
                newPassword: '',
                confirmNewPassword: '',
                confirmEmail: '',
                alertType: 'success',
                successReset: '',
                wrongEmailToreset: '',
                resetPasswordBtn: false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 6 || 'Minimum 6 characters',
                    max: v => v.length <= 32 || 'Maximum 32 characters',
                    email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"
                },

            }
        },
        created(){
            this.$store.dispatch('checkToken', {token: this.$route.params.resetpasswordtoken})
        },
        computed:{
            passwordConfirmationRule() {
                return () => (this.newPassword === this.confirmNewPassword) || 'Password must match'
            },
            getResetPasswordMsg(){
                return this.$store.getters.getResetPasswordMsg;
            },
            getTokenResetMsg(){
                return this.$store.getters.getTokenResetMsg;
            },

        },
        watch:{
            getTokenResetMsg(flag){
                if(flag === 2 || flag === 3 || flag === 4){
                    this.errorForReseting = true;
                }else if(flag === 4) {

                } else if(flag === true){
                    this.errorForReseting = false;
                }
            },
            getResetPasswordMsg(flag){
                if(flag === 4){
                    this.resetPasswordBtn = false;
                    this.wrongEmailToreset = 'Wrong Email, Try again!'
                }else if(flag === true){
                    this.resetPasswordBtn = false;
                    this.wrongEmailToreset = '';
                    this.successReset = "Password Reset Successfully!"
                    setTimeout(()=>{
                        this.$router.push({name: 'authPage', params:{lang: 'en'}});
                    },3000);
                }
            }
        },
        methods:{
            ResetPassword(){

                if(this.$refs.form.validate()) {
                    this.resetPasswordBtn = true;
                    this.wrongEmailToreset = '';
                    this.$store.commit('setClearAppMsgs');
                    this.$store.dispatch('ResetPassword', {

                        token:this.$route.params.resetpasswordtoken,
                        email: this.confirmEmail,
                        password: this.newPassword,


                    });


                }

            },

        }
    }
</script>

<style scoped>

</style>
