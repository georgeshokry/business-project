<template>
    <v-card flat min-height="300" style="background-color: #ffffff;">

            <v-container fluid fill-height>
                <v-flex lg12>
                    <v-flex lg9 style="margin: auto">
                        <v-card-title class="font-weight-bold pa-0" style="color:#e60000;">
                            {{$t('home-page-sections.latestJoinersSection.LATEST JOINERS')}}
                        </v-card-title>
                    </v-flex>
                </v-flex>
            </v-container>
        <v-container fluid style="min-height: 230px;">
            <flickity v-if="Object.keys(latest).length > 0"  ref="flickity" class="carousel" style="height: 230px; background-color: white" :options="flickityOptions" >
                <div class="carousel-cell" v-for="(item,h) in latest" :key="h" style="height: 230px">
                    <router-link :to="{name: 'companyProfile',params: {id: item.slug, lang: $i18n.locale}}">
                    <div style="height: 110px" >
                        <div class="justify-space-between" style="cursor:pointer;height: 230px" >
                            <v-img  style="margin:auto; border: 5px solid #E60000;    border-radius: 50%;    object-fit: contain;background-color: white;" width="140px" height="140px" :src="'/images/med/'+item.business_logo">
                                <template v-slot:placeholder>
                                    <v-layout
                                            fill-height
                                            align-center
                                            justify-center
                                            ma-0
                                    >
                                        <v-progress-circular indeterminate color="#E60000 "></v-progress-circular>
                                    </v-layout>
                                </template>
                            </v-img>
                            <v-card-title class="pa-0" style="line-height: 20px;font-size: 20px;color:#E60000;justify-content: center;font-weight: bold;">
                                {{item.business_name}}
                            </v-card-title>
                            <v-card-title class="pa-0" style="font-size: initial;color:#E60000;justify-content: center;">
                                {{item.business_category}}
                            </v-card-title>
                            <v-card-title class="pa-0" style="font-size: initial;color:#E60000;justify-content: center">
                                <img width="16" src="../resources/Location_Red.svg" style="margin-right: 5px;margin-left: 5px;">{{item.primary_country}}
                            </v-card-title>
                        </div>
                    </div>
                    </router-link>
                </div>


            </flickity>
        </v-container>
        <v-layout row wrap justify-center align-center class="join-now-div" style="background-color:#e60000 ">
            <v-flex lg9 style="text-align: center">


            <v-card-title style="text-align: center;margin-bottom:0; color:white;    justify-content: center;word-break: normal " >
                <span class="dis-in-mobile">{{$t('home-page-sections.latestJoinersSection.Join those successful businesses and build up your business global presence')}}</span>
                <v-divider color="#ff0000;" dark vertical class="ma-3"></v-divider>
                <v-btn
                        rounded
                        elevation="0"
                        small
                        color="white"
                        style=" color: #ff0000;    font-weight: bold;letter-spacing: inherit;"
                        :to="{name: 'chooseBusinessType', params:{lang: $i18n.locale}}"
                >
                    {{$t('home-page-sections.latestJoinersSection.Make Your Business VISIBLE')}}
                </v-btn>
            </v-card-title>


            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
    import Flickity from 'vue-flickity';
    export default {
        name: "latestJoinersSection",
        components: {
            Flickity
        },
        data:()=>{
            return{
                flickityOptions: {
                    freeScroll: true,
                    contain: true,
                    prevNextButtons: false,
                    pageDots: false,
                    autoPlay: false,
                },
                latest:[]
            }
        },
             created(){

                 this.$store.dispatch('LatestJoiners', this.$route.params.id);
                 },
        computed:{
            getLatestJoiners(){
                return this.$store.getters.getLatestJoiners;
            },
            },
             watch:{
            getLatestJoiners(joiners) {
                    if (joiners) {
                        console.log(joiners,"JOINERS")
                    this.latest = [];
                    for (let i in joiners) {
                        this.latest.push(joiners[i]);
                    }
                   
                }
            }
            },
        methods:{
            gotToJoiunerProfile(slug,profileType){
                if(profileType === 2) {
                    this.$router.push({
                        name: 'companyProfile',
                        params: {id: slug, lang: this.$route.params.lang}
                    });
                }else if(profileType === 1){
                    this.$router.push({
                        name: 'individualProfile',
                        params: {id: slug, lang: this.$route.params.lang}
                    });
                }else if(profileType === 0){
                    this.$router.push({
                        name: 'personalProfile',
                        params: {id: slug, lang: this.$route.params.lang}
                    });
                }
            }
        }
    }
</script>

<style scoped>
    >>>.round-cards{
        border-radius: 10px;

    }
    /*.theme--light.v-icon {*/
    /*    color: #ffffff !important;*/
    /*    background-color: red !important;*/
    /*    border-radius: 50%;*/
    /*}*/

    >>>.carousel {

        background: #f1f1f1;
    }

    >>>.carousel-cell {
        width: 200px;
        height: fit-content;
        margin-right: 20px;
        background: #ffffff;
        border-radius: 5px;

    }

    /* cell number */
    >>>.carousel-cell:before {
        display: block;
        text-align: center;

        line-height: 200px;
        font-size: 80px;
        color: white;
    }

   >>>.join-now-div{
        background-color: #f1f1f1;
        min-height: 70px;
    }
    >>>.dis-in-mobile{
        display: block;
    }
    @media only screen and (max-width: 600px) {
       >>>.dis-in-mobile{
            display: none !important;
        }
    }

</style>