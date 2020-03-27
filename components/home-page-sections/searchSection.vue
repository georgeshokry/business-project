<template>
    <v-card flat min-height="350" style="border-radius: 0;" >
        <v-container fluid style="background-color: #333333;">

                <v-layout row justify-center align-center>
                    <v-flex lg12 xs11>
                        <v-card-text class="pb-1" style="color:white;padding: 0;text-align: center;">
                            {{$t('home-page-sections.searchSection.Its the most advanced online')}}
                        </v-card-text>
                    </v-flex>
                </v-layout>


                <v-layout row justify-center align-center>
                    <v-flex lg6 style="margin-right: 10px;margin-left: 10px;">
                    <v-text-field
                            v-model="searchKeyWord"
                            class="pb-0"
                            :placeholder="$t('home-page-sections.searchSection.MyBusiness directory search')"
                            rounded
                            solo
                            dense
                            color="#E60000"
                            append-icon="search"
                            @click:append="routeToBD()"
                    ></v-text-field>
                        <v-card-text style="color: white;padding: 0;font-size: 25px !important;text-align: center;">
                            {{$t('home-page-sections.headerSection.or')}}
                        </v-card-text>
                    </v-flex>

                </v-layout>

        </v-container>
        <v-container fluid class="pt-0">
            <v-card flat>
                <v-layout row justify-center align-center>
                    <v-flex lg6>
                        <v-card-title class="font-weight-bold search-title">
                            {{$t('home-page-sections.searchSection.EXPLORE OUR BUSINESS COLLECTIVE')}}
                        </v-card-title>

                    </v-flex>

                </v-layout>
                <v-layout row justify-start align-center style="width: 85%;margin: auto;">
                    <v-layout row wrap justify-center align-center v-if="sectors.length === 0">
                        <v-flex lg3 xs11>
                            <v-boilerplate  style="text-align: -webkit-center;"  class="pa-3 ma-1" type="chip"></v-boilerplate>
                        </v-flex>
                        <v-flex lg3 xs11>
                            <v-boilerplate  style="text-align: -webkit-center;"  class="pa-3 ma-1" type="chip"></v-boilerplate>
                        </v-flex>
                        <v-flex lg3 xs11>
                            <v-boilerplate  style="text-align: -webkit-center;"  class="pa-3 ma-1" type="chip"></v-boilerplate>
                        </v-flex>
                        <v-flex lg3 xs11>
                            <v-boilerplate  style="text-align: -webkit-center;"  class="pa-3 ma-1" type="chip"></v-boilerplate>
                        </v-flex>
                    </v-layout>
                            <v-chip-group
                                    style=" justify-content: center;"
                                    column
                                    active-class="red--text"


                            >
                                <v-flex xl6 lg3 xs12 style="text-align: center" v-for="(item,i) in sectors" :key="i">

                            <v-chip small @click="setFilter(item)">
                                {{item}}
                            </v-chip>

                                </v-flex>
                            </v-chip-group>

                </v-layout>
            </v-card>
            <v-divider dark class="pa-3"></v-divider>
            <v-card flat>
                <v-layout row justify-center align-center>
                    <v-flex lg4 style="height: 190px;">
                        <div >
                            <div>
                                <img src="../resources/Qoutations_Coma_66_Darker_Grey.svg" class="quot-up-home">
                            </div>
                            <h5 class="rev-content-home">
                                {{$t('home-page-sections.searchSection.If you have business Or Looking to start one')}}
                            </h5>
                            <div class="quot-down-home">
                                <img width="40px" src="../resources/Qoutations_Coma_99_Darker_Grey.svg" >
                            </div>
                        </div>
                    </v-flex>
                    <v-flex lg2 style="height: 123px;padding-top: 30px;">
                        <v-card-title style="font-size: medium;font-weight: 500;justify-content: center;padding: 0px !important;">
                            {{$t('home-page-sections.searchSection.Freelancer or Company')}}

                        </v-card-title>
                        <div style="margin: auto;width:fit-content;">
                        <v-btn
                                rounded
                                elevation="0"
                                small
                                color="#ff0000"
                                style=" color: white; font-weight: bold"
                                :to="{name: 'authPage'}"
                        >
                            {{$t('home-page-sections.searchSection.Establish Your Business NOW')}}
                        </v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "searchSection",
        inject: ['theme'],
        components: {
            VBoilerplate: {
                functional: true,
                render(h, {data, props, children}) {
                    return h('v-skeleton-loader', {
                        ...data,
                        props: {
                            boilerplate: false,
                            elevation: 0,
                            ...props,
                        },
                    }, children)
                },
            },
        },
        data:()=>{
            return{
                sectors:[],
                name:'',
                searchKeyWord:'',

                counter:0,
                sectorsWithIds:[],

            }
        },
        mounted() {
            this.$store.dispatch('AllBusinessCategory', {lang: this.$i18n.locale});
        },
        computed: {

            getAllBusinessCategory() {
                return this.$store.getters.getAllBusinessCategory;
            },
            getLang(){
                return this.$i18n.locale;
            }
        },
        watch: {
            getLang(lang){
                this.sectors = [];
                this.$store.dispatch('AllBusinessCategory', {lang: lang});
            },
            getAllBusinessCategory(business) {
                if (business) {

                    for (let i in business) {
                        this.sectors.push(business[i].name);
                        this.sectorsWithIds.push(business[i])
                    }
                    this.sectors.sort(() => Math.random() - 0.5);
                    this.sectors = this.sectors.slice(0,16)
                }
            },

        },
        methods:{
            routeToBD(){
                // if(this.name !=='' || this.searchKeyWord !=='') {
                    this.$router.push({name: 'businessDirectory', query: {word: this.searchKeyWord, filter: this.name}})
                // }
            },
            setFilter(name){
                this.name = name;
                this.routeToBD();

            }
        }

    }
</script>

<style scoped>
    >>>.quot-up-home{
        width: 40px;
        margin: 0 0 0 10px;
        /*position: absolute;*/
        top: -25px;
    }
    >>>.quot-down-home{
        float: right;
        margin-right: 10px;
    }
    >>>.rev-content-home{
        text-align: initial;
        padding-right: 10px;
        padding-left: 10px;
        margin-bottom: 0;
    }
    >>>.search-title{
        word-break:normal;
        line-height: 42px;
        letter-spacing: inherit;
        color:red;
        font-size: 35px !important;
        justify-content: center;
        text-align: center;
    }
    >>>.v-chip-group--column .v-slide-group__content {
        white-space: normal;
        flex-wrap: wrap;
        max-width: 100%;
        justify-content: center;
    }
</style>