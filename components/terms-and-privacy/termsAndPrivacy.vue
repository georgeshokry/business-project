<template>
    <v-container>
        <v-card flat min-height="100vh" style="background-color: #ffffff;">
            <v-card-text style="    text-align: center;">

                    <v-btn-toggle mandatory v-model="choosen">
                        <v-layout row wrap justify-content-center>
                            <v-btn :ripple="{ class: 'red--text' }" text x-large  height="120px" width="260px" @click="chooseTab(0)" style="font-weight: 900;">
                                {{$t('terms-and-privacy.termsAndPrivacy.Terms & Conditions')}}
                            </v-btn>
                            <v-btn :ripple="{ class: 'red--text' }" text x-large  height="120px" width="260px" @click="chooseTab(1)" style="font-weight: 900;">
                                {{$t('terms-and-privacy.termsAndPrivacy.Privacy Policies')}}
                            </v-btn>
                        </v-layout>
                    </v-btn-toggle>

            </v-card-text>

            <v-expand-transition>
            <v-card elevation="2" style="margin: 20px;border-radius: 10px;" v-if="choosen ===0">
                <v-card-title class="" style="color:#e60000;background-color: #e5e5e5;">
                    {{$t('terms-and-privacy.termsAndPrivacy.Terms & Conditions')}}
                </v-card-title>
                <v-card-subtitle style="background-color: #e5e5e5;text-align: initial">
                    {{$t('terms-and-privacy.termsAndPrivacy.last update')}} 05 Nov 2019
                </v-card-subtitle>
                <div style="padding: 40px;">
<!--                    <v-treeview dense :items="terms" ></v-treeview>-->

                    <ul  v-for="(term,k) in allTerms" :key="k">
                        <li>{{term}}</li>

                    </ul>

                </div>
            </v-card>
            <v-card elevation="2" style="margin: 20px;border-radius: 10px;" v-if="choosen === 1">
                <v-card-title class="" style="color:#e60000;background-color: #e5e5e5;">
                    {{$t('terms-and-privacy.termsAndPrivacy.Privacy Policies')}}
                </v-card-title>
                <v-card-subtitle style="background-color: #e5e5e5;text-align: initial">
                    {{$t('terms-and-privacy.termsAndPrivacy.last update')}} 10 May 2019
                </v-card-subtitle>
                <div style="padding: 40px;">

<!--                    <v-treeview dense :items="privacy" ></v-treeview>-->
                    <div v-html="privacycontent"></div>
                </div>
            </v-card>
            </v-expand-transition>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "termsAndPrivacy",
        data:()=>{
            return{
                choosen: 0,
                allTerms:[],
                privacycontent:'',
                terms: [
                    {
                        name: '1 :',
                        children: [
                            {  name: 'SOME CONDITIONS' },
                        ],
                    },
                    {
                        name: 'Docum :',
                        children: [
                            {  name: 'SOME CONDITIONS' },
                        ],
                    },
                ],
                privacy: [

                    {

                    },
                ],
            }
        },
        created()
        {
            this.$store.dispatch('getAllTermsandcondtion', {lang: this.$i18n.locale});
            this.$store.dispatch('getAllPrivacyPolicy', {lang: this.$i18n.locale});


        },
        computed: {
            getTermsandcondtion() {
                return this.$store.getters.getTermsandcondtion;
            },
            getPrivacyPolicy() {
                return this.$store.getters.getPrivacyPolicy;
            },
        },
        watch: {
            '$route'(from,to){
                this.$store.dispatch('getAllTermsandcondtion', {lang: this.$i18n.locale});
                this.$store.dispatch('getAllPrivacyPolicy', {lang: this.$i18n.locale});
            },
            getTermsandcondtion(terms) {
                this.allTerms = [];
                if (terms) {

                    for(let i in terms){
                        this.allTerms.push(terms[i].content);
                    }
                }
            },
            getPrivacyPolicy(privacy) {
                this.privacycontent = '';
                if (privacy) {


                      this.privacycontent=privacy[0].content


                }
            },
        },
        methods:{
            chooseTab(type){
                this.choosen = type;
            }
        }
    }
</script>

<style scoped>
    >>>.v-application ol, .v-application ul {
        padding-left: 0;
    }
</style>
