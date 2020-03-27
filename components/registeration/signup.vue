<template>
    <v-card flat tile min-height="fit-content" elevation="2" class="login-reg-card">
        <v-responsive>
        <v-card-title style="justify-content: center">
<!--            {{$t('registration.signup.start')}} &nbsp;<span style="color: #e60000;font-weight: bold;">{{$t('registration.signup.its free')}}</span>-->
        </v-card-title>
        </v-responsive>

        <v-container fluid fill-height class="pa-0">
            <v-layout justify-center align-center>
                <v-layout row wrap justify-center style="padding-right:25px;padding-left: 25px;padding-bottom: 25px;">
        <v-flex lg5 style="min-width: 330px;">
            <v-form ref="reg">
            <v-layout wrap>
                <v-text-field
                        autofocus
                        dense
                        v-model="firstName"
                        class="ma-1"
                        :placeholder="$t('registration.signup.First Name')"
                        :rules="[ value => !!value || $t( 'registration.signup.required' ) ,value => value.length >= 3 || $t('registration.signup.Minimum 3 characters'),value => value.length <= 10 || $t('registration.signup.Maximum 10 characters'),value =>  /^(?:[a-zA-Z\s,\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,10}$/.test(value) || $t('registration.signup.Only Alphabetical Letters') ]"
                        color="#e60000"
                        clearable
                        :disabled="startReg"
                ></v-text-field>
                <v-text-field
                        v-model="lastName"
                        class="ma-1"
                        :placeholder="$t('registration.signup.Last Name')"
                        :rules="[ value => !!value || $t( 'registration.signup.required' ) ,value => value.length >= 3 || $t('registration.signup.Minimum 3 characters'),value => value.length <= 10 || $t('registration.signup.Maximum 10 characters'),value =>  /^(?:[a-zA-Z\s,\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,10}$/.test(value) || $t('registration.signup.Only Alphabetical Letters')]"
                        color="#e60000"
                        dense
                        clearable
                        :disabled="startReg"
                ></v-text-field>
                <v-flex lg12 md12 xs12>
                    <v-text-field
                            v-model="email"
                            class="ma-1"
                            :placeholder="$t( 'registration.signup.Email' )"

                            color="#e60000"
                            dense
                            :rules="[ value => !!value || $t( 'registration.signup.required' ) , value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || $t('registration.signup.emailvalid')]"
                            :error-messages=" errors.length > 0 ? $t('registration.signup.EmailAlreadyExist') : '' "
                            clearable
                            @blur="checkEmail()"
                            @keydown.delete.native="notTakenEmail = false, errors = ''"
                            :disabled="startReg"
                    >

                        <template v-slot:append>
                            <v-fade-transition >
                                <v-icon
                                        v-if="notTakenEmail && email!==''"
                                        color="green"
                                >
                                    check
                                </v-icon>
                                <v-icon
                                        v-else-if="errors !=='' && email!==''"
                                        color="error"
                                >
                                    error
                                </v-icon>
                            </v-fade-transition>
                        </template>
                    </v-text-field>
                </v-flex>
                <v-flex lg6 md6 xs12>
                <v-text-field
                        v-model="newPassword"
                        class="ma-1"
                        :placeholder="$t('registration.signup.Password')"
                        maxlength="32"
                        color="#e60000"
                        dense
                        :rules="[value => !!value || $t('registration.signup.required'),value => value.length >= 6 || $t('registration.signup.Minimum 6 characters')]"
                        :type="show ? 'text' : 'password'"
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        @click:append="show = !show"
                        :disabled="startReg"
                ></v-text-field>
                </v-flex>
                <v-flex lg6 md6 xs12>
                <v-text-field
                        v-model="confirmPassword"
                        class="ma-1"
                        :placeholder="$t('registration.signup.Confirm Password')"
                        color="#e60000"
                        dense
                        maxlength="32"
                        :rules="[value => !!value || $t('registration.signup.required'),newPassword === confirmPassword || $t('registration.signup.Password must match')]"
                        :type="show ? 'text' : 'password'"
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        @click:append="show = !show"
                        :disabled="startReg"
                ></v-text-field>
                </v-flex>

                <v-flex lg12>
                    <v-alert text v-if="errorSignup !== ''" colored-border border="left" type="error" style="text-align:center;color: red">
                        {{ $t('registration.signup.' + errorSignup) }}
                    </v-alert>
                    <v-card-title class="pa-0" style="justify-content: center;font-size: 14px">
                      <span style="color: #E60000">*</span>{{$t('registration.signup.By signing up, you accept our')}}&nbsp; <router-link :to="'terms-privacy'"><a style="color:#E60000" >{{$t('registration.signup.Terms & Polices')}}</a></router-link>
                    </v-card-title>
                <v-btn block dark rounded color="#e60000" @click="register" :loading="signupLoadingBtn">
                    {{ $t('registration.signup.Register')}}
                </v-btn>

                </v-flex>

            </v-layout>
            </v-form>
        </v-flex>
                <v-flex lg1>
                    <v-container fluid fill-height style="justify-content: center;" class="pa-0 ma-0">
                        <div class="vl"></div>
                        <v-card-text class="pa-3" style="color:#e60000; text-align: center;font-size: larger;font-weight: 900;">
                            {{ $t('registration.signup.Or') }}
                        </v-card-text>
                        <div class="vl"></div>

                    </v-container>
                </v-flex>



            <v-flex d-flex lg5 xs12>
                <v-container fluid fill-height class="pa-0" style="padding: 30px;">
                    <div style="width: 100%;">
                    <v-btn block rounded color="#4267b2" style="color: white;margin-bottom: 20px;"  @click="AuthProvider('facebook')">
                        {{$t('registration.signup.Continue with Facebook')}}
                      <v-icon left style="margin: 5px;" color="white">mdi-facebook-box</v-icon>

                    </v-btn>
                    <v-btn block  rounded color="white"  @click="AuthProvider('google')">
                        {{$t('registration.signup.Continue with Google')}}
                       <img width="20" style="margin: 5px;" src="../resources/google-icon.svg">

                    </v-btn>
                    </div>
                </v-container>
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
        name: "signup",
        data:()=>{
            return{
                signupLoadingBtn: false,
                notTakenEmail: false,
                show: false,
                firstName:'',
                lastName: '',
                email: '',
                newPassword: '',
                confirmPassword: '',
                errors:'',
                errorSignup:'',
                rules: {
                    minuser: v => v.length >= 3 || 'Minimum 3 characters',
                    maxuser:  v => v.length <= 10 || 'Maximum 10 characters',
                    min: v => v.length >= 6 || 'Minimum 6 characters',
                    max: v => v.length <= 32 || 'Maximum 32 characters',
                    email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid",
                    charactersonly: v =>  /^(?:[a-zA-Z\s,\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,10}$/.test(v) || 'Only Alphabetical Letters'
                },
        startReg: false,
            }
        },
        computed:{
            passwordConfirmationRule() {
                return () => (this.newPassword === this.confirmPassword)
            },

            getSignUpFlag(){
                return this.$store.getters.getSignUpFlag;
            },
            getLocalTrans(){
                return this.$i18n.locale;
            }
        },
        watch:{
            getLocalTrans(trans){
                this.$router.replace({name: 'home'})

            },
            getSignUpFlag(flag){
                this.errorSignup = "";
                if(flag === true){
                    this.$router.replace({name: 'confrimEmail', params: {lang: this.$route.params.lang}});

                }else{
                    this.errorSignup = "Problem";
                    this.startReg = false;
                    this.signupLoadingBtn =false;
                }
            }
        },
        methods:{
            checkEmail(){
                this.errors = '';
                this.notTakenEmail = false;
                if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
                    axios.post('/checkEmailUser', {email: this.email}).then(valid => {

                        if (valid.data === false) {

                            this.errors = 'Email Already Exist'
                        } else {
                            this.errors = ''
                            this.notTakenEmail = true;
                        }
                    })
                }

            },
            register(){
                this.errorSignup = "";
                if (this.$refs.reg.validate()&& this.errors==='') {
                    this.signupLoadingBtn = true;
                    this.startReg = true;
                    this.$store.dispatch('RegisterUser', {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email:this.email,
                        password:this.confirmPassword,


                    });



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
    >>>.vl{
        display: block;
        border-left: 1px solid #e60000;
        height: 43%;

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
        padding: 0px !important;
        max-width: 100%;
        min-width: 0;
        width: 100%;

    }
    @media (max-width: 1263px) {
        .vl{
            display: none;
            border-left: 1px solid #e60000;
            height: 43%;
        }
    }
    >>>.v-btn{

    }
</style>
