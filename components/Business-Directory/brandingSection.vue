<template>
    <v-card flat min-height="fit-content" >
        <v-card-text class="headline" style="background-color: #fafafa;color: #e60000;">
            Branding
        </v-card-text>
        <v-container fluid style="    background-color: #fafafa;">
                <v-layout
                        style="min-height: 150px"
                        fill-height
                        align-center
                        justify-center
                        ma-0
                        v-if="loadingBranding"
                >
                    <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
                </v-layout>
<!--                <v-flex lg4 xs11>-->
<!--                    <v-boilerplate style="max-width: 170px;max-height: 170px;"   class="pa-3 ma-3" type="image"></v-boilerplate>-->
<!--                </v-flex>-->
<!--                <v-flex lg4 xs11>-->
<!--                    <v-boilerplate  style="max-width: 170px;max-height: 170px;"   class="pa-3 ma-3" type="image"></v-boilerplate>-->
<!--                </v-flex>-->
<!--                <v-flex lg4 xs11>-->
<!--                    <v-boilerplate  style="max-width: 170px;max-height: 170px;"   class="pa-3 ma-3" type="image"></v-boilerplate>-->
<!--                </v-flex>-->
            <flickity  ref="flickity" class="carousel" style="height: fit-content;background-color: #fafafa;" :options="flickityOptions" v-else-if="Object.keys(barnding).length > 0" >
                <div class="carousel-cell" v-for="(item,h) in barnding" :key="h" style="height: 260px; margin-right:20px;background-color: #fafafa;">
                    <div style="height: 250px;background-color: #fafafa;" >
                        <div class="" style="height: fit-content;background-color: #fafafa;">
                            <img alt="branding-photo" v-if="item.pic !== null" v-on:error="item.pic = null" style="border-radius: 10px 10px 0 0;object-fit: contain;background-color: #f1f1f1;border-top: 2px red solid;" width="180px" height="120px" :src=" item.pic">
                            <img
                                    alt="no-image"
                                    v-else-if="item.pic === null"
                                    style="border-radius: 10px 10px 0 0;object-fit: contain;background-color: #f1f1f1;border-top: 2px red solid;" width="180px" height="120px"
                                    src="/images/imagePlaceholder.png"
                            >
                            <v-card flat height="180px" width="180" style="background-color: #fafafa;cursor: auto" >
                                <v-card-title class="pt-0 pb-2" style="justify-content: center;background-color: #f1f1f1;font-size: large;" >
                                    {{item.business_name}}
                                </v-card-title>
                                <v-card-subtitle style="text-align: center;background-color: #f1f1f1;height: 43px" class="pa-0">
                                    {{item.category}}
                                </v-card-subtitle>
                                <v-card-subtitle style="text-align: center;background-color: #f1f1f1;" class="pa-0">

                                    <v-btn block text x-small color="#e60000" v-if="item.checkpromotedcom === true" @click="item.checkpromotedcom= false">
                                        show contacts
                                        <v-icon right x-small color="#e60000">keyboard_arrow_down</v-icon>
                                    </v-btn>

                                </v-card-subtitle>
                                <v-slide-y-transition>
                                    <v-card-title class="pa-0 justify-content-center" style="text-align: center;background-color: #f1f1f1;border-radius: 0 0 10px 10px;border-bottom: 2px red solid;"  v-if="item.checkpromotedcom === false">


                                            <v-card-text  class="pa-0" >
                                                <v-fade-transition>
                                                <v-layout row wrap justify-content-center>
                                                    <v-flex lg-5>
                                                        <v-btn
                                                                style="margin: 5px;width: 25px;height: 25px;"
                                                                elevation="0"
                                                                fab
                                                                dark
                                                                x-small
                                                                color="#e60000"
                                                                @click="item.showPhone = true, item.showEmail = false, item.showWebsite = false"
                                                        >
                                                            <v-icon>phone</v-icon>
                                                        </v-btn>

                                                        <v-btn
                                                                style="margin: 5px;width: 25px;height: 25px;"
                                                                elevation="0"
                                                                fab
                                                                dark
                                                                x-small
                                                                color="#e60000"
                                                                @click="item.showPhone = false, item.showEmail = true, item.showWebsite = false"
                                                        >
                                                            <img width="15"  src="../resources/Email_White.svg" />
                                                        </v-btn>
                                                        <v-btn
                                                                style="margin: 5px;width: 25px;height: 25px;"
                                                                elevation="0"
                                                                fab
                                                                dark
                                                                x-small
                                                                color="#e60000"
                                                                @click="item.showPhone = false, item.showEmail = false, item.showWebsite = true"
                                                        >
                                                            <img width="15"  src="../resources/Website_White.svg" />
                                                        </v-btn>

                                                    </v-flex>

                                                </v-layout>
                                                </v-fade-transition>
                                                <v-divider dark class="ma-0"></v-divider>

                                                <v-layout row wrap justify-content-center>
                                                    <v-slide-y-transition>
                                                        <v-chip small outlined class="ma-1"   v-if="(item.showPhone === true && item.phone !== '') || (item.showEmail && item.email !== '')=== true || (item.showWebsite === true && item.website !== '')">
                                                            {{item.showPhone === true ? item.phone : item.showEmail === true ? item.email : item.showWebsite === true ? item.website : ""}}
                                                        </v-chip>
                                                    </v-slide-y-transition>
                                                </v-layout>
                                            </v-card-text>


                                    </v-card-title>

                                </v-slide-y-transition>
                            </v-card>
                        </div>
                    </div>
                </div>
            </flickity>
        </v-container>
    </v-card>
</template>

<script>
    import Flickity from 'vue-flickity';
    export default {
        name: "brandingSection",
        inject: ['theme'],
        components: {
            Flickity,
            VBoilerplate: {
                functional: true,
                render (h, { data, props, children }) {
                    return h('v-skeleton-loader', {
                        ...data,
                        props: {
                            boilerplate: false,
                            elevation: 1,
                            ...props,
                        },
                    }, children)
                },
            },
        },
        data:()=>{
            return{
                flickityOptions: {
                    freeScroll: true,
                    contain: true,
                    prevNextButtons: false,
                    pageDots: false,
                    autoPlay: 1500,
                    pauseAutoPlayOnHover: true
                },
                barnding:[],
                loadingBranding: true,
            }
        },
        created(){


        },
        computed:{

            getPromotedCompines(){
                return this.$store.getters.getPromotedCompines;
            }

        },
        watch:{
            getPromotedCompines(searchResult){
                this.loadingBranding = true;


                if(searchResult !== "no-prm" && searchResult !== null){
                    this.barnding=[];
                    for(let i in searchResult){
                        this.barnding.push(searchResult[i]);
                    }
                    this.loadingBranding = false;
                }else if(searchResult === null){

                    this.loadingBranding = true;
                }else if(searchResult === "no-prm"){

                    this.loadingBranding = false;
                }
            },
        },
        methods:{
        }
    }
</script>

<style scoped>
    .carousel {
        background: white;
    }

    .carousel-cell {
        width: fit-content;
        height: fit-content;
        margin-right: 10px;

        border-radius: 5px;
    }

    /* cell number */
    .carousel-cell:before {
        display: block;
        text-align: center;
        line-height: 250px;
        font-size: 80px;
        color: white;
    }
</style>