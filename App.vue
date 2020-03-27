<template>
    <v-app id="app" style="background-color: white;">
        <v-progress-linear
                :active="$store.state.auth.loadingLinear"
                :indeterminate="$store.state.auth.loadingLinear"
                color="#E60000"
                indeterminate
                fixed
                style="z-index: 999"
        ></v-progress-linear>
        <header-bar></header-bar>


        <v-scroll-y-transition mode="out-in">
        <v-snackbar
            v-model="snackbar"
            :color="color"
            top
            style="z-index: 250"
        >
            <v-icon smaller color="white">{{icon}}</v-icon><span style="font-size: larger;color: white;">{{ $t(text) }}</span>
            <v-btn
                dark
                text
                icon
                @click="snackbar = false"

            >
                <v-icon small color="white">close</v-icon>
            </v-btn>
        </v-snackbar>
        </v-scroll-y-transition>

        <v-scroll-y-reverse-transition mode="out-in">
        <v-snackbar
                v-model="errorFetchData"
               bottom
               style="z-index: 202"
                color="error"
                :timeout="0"
        >
           <v-icon smaller color="white" class="animated infinite pulse slower">cloud_circle</v-icon>
            <span style="font-size: larger;color: white;">
                {{$t('header-footer.headerBar.problem in fetching data')}}
            </span>
            <v-btn
                    dark
                    text
                    icon
                    @click="errorFetchData = false"

            >
                <v-icon small color="white">close</v-icon>
            </v-btn>
        </v-snackbar>
        </v-scroll-y-reverse-transition>

        <v-container fluid fill-height style="min-height: 100vh; justify-content: center"  v-if="loading">
            <v-toolbar-title >
            <v-img eager class="animated infinite flash slower" width="75px" :src="src" alt="MyBusiness-logo">
            </v-img>
            </v-toolbar-title>
        </v-container>

                <v-overlay :value="signOutOverlay" opacity="0.80" style="text-align: center;" z-index="300">
                    <v-progress-circular color="#e60000" indeterminate size="64"></v-progress-circular>
                    <v-card-text style="font-size: 25px !important;">
                        {{$t('header-footer.headerBar.logging out')}}
                    </v-card-text>
                </v-overlay>

            <router-view v-if="loaded"></router-view>


<!--        <notification-toast></notification-toast>-->
        <footer-bar></footer-bar>
    </v-app>
</template>
<script>
    // import LoadingSpinner from "./components/loadingSpinner";
    import HeaderBar from "./components/header-footer/headerBar";
    import FooterBar from "./components/header-footer/footerBar";
    import src from "./components/resources/logoIcon.png"
    // import NotificationToast from "./components/notification/notification-toast";
    export default {
        name: "App",
        components: {
            // NotificationToast,
            HeaderBar,
            FooterBar,
            // LoadingSpinner,
        },
        data:()=>{
            return{
                src: src,
                signOutOverlay: false,
                snackbar: false,
                errorFetchData: false,
                color: "",
                text: "",
                icon: "",
                loading: true,
                loaded: false
            }
        },
        mounted(){
            if(this.$i18n.locale === 'ar'){
                this.$vuetify.rtl = true;
            }else {
                this.$vuetify.rtl = false;
            }
        },
        created(){
            this.src = src;
            this.loading = true;
            this.loaded = false;



        },
        computed:{
            getAppMsgs(){
                return  this.$store.getters.getAppMsgs;
            },
            getUserData(){
                return this.$store.getters.getUserData;
            },
            getLoadingSignOut(){
                return this.$store.getters.getLoadingSignOut;
            },
            getLoading(){
                return this.$store.getters.getLoading;
            },
            getErrorLoadingData(){
                return this.$store.getters.getErrorLoadingData;
            },
        },
        watch: {
            '$route' (from, to){

            },
            getErrorLoadingData(flag){
                if(flag === true){
                    this.errorFetchData = true;
                }else {
                    this.errorFetchData = false;
                }
            },
            getLoadingSignOut(flag){
                this.signOutOverlay = flag;
            },
            getAppMsgs(data) {
                if(data.appSnackbarMsgs !== null) {
                    this.text = data.appSnackbarMsgs;
                    this.color = data.appSnackbarColor;
                    this.icon = data.appSnackbarIcon;
                    this.snackbar = true;
                }
            },
            getLoading(flag){
                if(flag === true){
                    this.loading = true;
                    this.loaded = false;
                }else {
                        this.loading = false;
                        this.loaded = true;


                }
            }

        }
    }
</script>
<style >
    @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css';
    @import url('https://fonts.googleapis.com/css?family=Cairo:600,700&display=swap&subset=arabic,latin-ext');
    .loading-circle-center {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        position: relative;
    }
    .v-application {
        font-family: 'Cairo', sans-serif !important;
        letter-spacing: -.02em !important;
    }
    .v-application .headline, .v-application .title {
        line-height: 1rem;
        font-family: 'Cairo', sans-serif !important;
        letter-spacing: -.02em !important;

    }
    .v-card__subtitle, .v-card__text {
        font-size: 0.979rem !important;
        font-weight: 400;
        line-height: 1.375rem;
        letter-spacing: -.02em !important;
    }
    .v-card__title {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        font-size: 1.25rem;
        font-weight: 500;
        letter-spacing: -.02em !important;
        line-height: 2rem;
        word-break: break-all;
    }
    .v-chip__content {
        align-items: center;
        display: inline-flex;
        height: 100%;
        max-width: 100%;
        font-size: 0.979rem;
    }
    .v-btn__content {
        letter-spacing: -.02em !important;
    }
    .v-tab {
        letter-spacing: -.02em !important;
    }
/*/////////// problem in v-responsive , it make alot of padding on any div*/
    .v-responsive__sizer {
        transition: none !important;
        flex: 0 !important;
    }
    a:hover{
        text-decoration: none !important;
    }

    .v-application--is-rtl .v-responsive__sizer~.v-responsive__content {
        margin-right: 0 !important;
    }
    .v-responsive__sizer~.v-responsive__content {
        margin-left: 0 !important;
    }

    .v-list-item__content {
        text-align: initial;
    }

    button:focus {
        outline: none !important;
    }
</style>
