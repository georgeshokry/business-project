<template>
    <v-card flat min-height="50vh" elevation="2">
        <v-responsive>
            <v-card-title style="justify-content: center">
<!--                {{$t('registration.signin.Sign in immediately')}} &nbsp;<span style="color: #e60000;font-weight: bold;">{{$t('registration.signin.Youve already missed a lot!')}}</span>-->
            </v-card-title>
        </v-responsive>

        <v-container fluid fill-height class="pa-0">

            <v-layout justify-center align-center>

                <v-layout class="pt-0" row wrap justify-center style="padding: 25px;">

                    <v-flex lg12 md12 xs12>
                        <v-flex lg5 style="margin: auto">
                        <v-form ref="login">
        <v-text-field
                autofocus
                :rules="[value => !!value || $t( 'registration.signup.required' ), value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || $t('registration.signup.emailvalid')]"
                v-model="email"
                class="ma-1"
                :placeholder="$t( 'registration.signup.Email' )"

                dense
                color="#e60000"
                @keyup.enter.native="login()"
                @keydown.native="errorForLoginTab = ''"
                :disabled="startLogin"
        ></v-text-field>
        <v-text-field
            :rules="[value => !!value || $t( 'registration.signup.required' )]"
                v-model="password"
                class="ma-1"
            :placeholder="$t('registration.signup.Password')"
            maxlength="32"
                dense
                color="#e60000"
                @keyup.enter.native="login()"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                @click:append="show = !show"
                @keydown.native="errorForLoginTab = ''"
            :disabled="startLogin"
        ></v-text-field>

                            <v-alert text v-if="errorlogin !== ''" colored-border border="left" type="error" style="text-align: center;color: red">
                                {{$t('registration.signin.' + errorlogin)}}
                            </v-alert>
                        <v-card-text class="pt-0 pb-0" style="color: #e60000;text-align: center;" >
                                <router-link :to="'forget-password'">
                                    <a style="color:#E60000" >
                                        {{$t('registration.signin.Forget Password?')}}
                                    </a>
                                </router-link>
                            <v-checkbox
                                    style="height: 40px;"
                                    color="#e60000"
                                    v-model="rememberMe"
                                    :label="$t('registration.signin.Remember Me')"
                                    :disabled="startLogin"
                            ></v-checkbox>

                        </v-card-text>

                        <v-btn block dark rounded color="#e60000" @click="login" :loading="signInLoading">
                            {{$t('registration.signin.login in')}}
                        </v-btn>
                        </v-form>
                    </v-flex>
                    </v-flex>

                    <v-flex lg5 >

                    <v-layout  row wrap justify-center>

                        <v-container fluid fill-height class="pa-5" style="text-align: center;">
                            <div style="width: 100%;">
                                <v-btn fab small color="#4267b2" style="color: white;" class="ma-2"  @click="AuthProvider('facebook')">
                                    <v-icon  color="white">mdi-facebook-box</v-icon>
                                </v-btn>
                                <v-btn fab small color="white" class="ma-2" @click="AuthProvider('google')">
                                    <img width="20"  src="../resources/google-icon.svg">

                                </v-btn>
                            </div>
                        </v-container>
                    </v-layout>
                    </v-flex>
                </v-layout>

            </v-layout>
        </v-container>

    </v-card>
</template>

<script>
    import axios from 'axios';

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    export default {
        name: "signin",
        data:()=>{
            return{
                errorlogin: '',

                signInLoading: false,
                rememberMe: false,
                show: false,
                email: '',
                password: '',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 6 || 'Minimum 6 characters',
                    max: v => v.length <= 32 || 'Maximum 32 characters',
                    email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"
                },
        startLogin: false,
            }
        },
        computed:{
            getAuthFlagLoginPage(){
                return this.$store.getters.getAuthFlagLoginPage;
            }
        },
        watch:{
            getAuthFlagLoginPage(flag){
                this.errorForLoginTab = "";

                if(flag.flag === true){
                    this.$router.push({name: 'personalProfile', params: {id:flag.personal_slug ,lang: this.$route.params.lang}, })
                }
                else if(flag.flag === false){
                    this.signInLoading = false;
                    this.startLogin = false;
                    this.errorlogin = "Wrong Email or Password,Try Again!";

                }

            }
        },
        methods:{
            navigateToForget(){
                this.$router.push({name: 'forgetPassword', params: {lang: this.$route.params.lang}});
            },
            login() {

                this.errorlogin = "";

                if (this.$refs.login.validate() ) {
                    this.signInLoading = true;
                    this.startLogin = true;
                    if (this.$refs.login.validate()) {
                        this.$store.dispatch('loginUser', {email: this.email, password: this.password, rememberme: this.rememberMe})
                    }
                }
            },
            AuthProvider(provider) {

                var self = this;

                this.$auth.authenticate(provider).then(response =>{

                    self.SocialLogin(provider,response)
                }).catch(err => {
                    window.location.href =  "https://ver4.mybusinessme.com";
                })
            },

            SocialLogin(provider,response){
                axios.get('/redirect/'+provider+'/',response).then(response => {

                    // commit('setAuthFlag', {flag:response.data.flag , personal_slug: response.data.personal_slug});

                }).catch(err => {
                    window.location.href =  "https://ver4.mybusinessme.com";
                })
            },


        }
    }
</script>

<style scoped>
    >>>.v-text-field.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo) .v-input__append-inner, .v-text-field.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo) .v-input__append-outer, .v-text-field.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo) .v-input__prepend-inner, .v-text-field.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo) .v-input__prepend-outer {
        margin-top: 7px !important;

    }
    >>>.v-text-field.v-text-field--enclosed .v-text-field__details {
        margin-bottom: 0px;

    }
    >>>.v-text-field--outlined.v-input--dense>.v-input__control>.v-input__slot {
        min-height: 30px !important;

    }
    >>>.v-text-field input {
        flex: 1 1 auto;
        line-height: 20px;
        padding: 0px 0 4px !important;
        max-width: 100%;
        min-width: 0;
        width: 100%;

    }
    >>>.v-label {
        margin-bottom: 0 !important;
    }
</style>
