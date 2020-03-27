<template>
    <v-card flat v-if="Object.keys(feturedProducts).length > 0">
        <v-card-title class=" font-weight-bold justify-space-between">
            <div >{{$t('profile.featuredProducts.Featured Products')}} </div>

        </v-card-title>
        <div v-if="loadingFea" >
            <v-layout
                    fill-height
                    align-center
                    justify-center
                    ma-0
            >
                <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
            </v-layout>
        </div>
        <flickity v-if="Object.keys(feturedProducts).length > 0"  ref="flickity" class="carousel"  :options="flickityOptions" >
            <div class="carousel-cell" v-for="(item,h) in feturedProducts" :key="h" >
                <v-card flat elevation="0" height="fit-content" width="94%" class="ma-5">

                        <v-flex xs12>
                                <v-img

                                        class="round-products"

                                        height="190"
                                        :lazy-src="'/images/med/'+item.image"
                                        :src="'/images/med/'+item.image"
                                >
                                    <template v-slot:placeholder>
                                        <v-layout
                                                fill-height
                                                align-center
                                                justify-center

                                        >
                                            <v-progress-circular size="20" width="3" indeterminate color="#E60000"></v-progress-circular>
                                        </v-layout>
                                    </template>

                                    <div class="radting-badge">
                                        <v-icon size="10" style="margin-right: 3px;" color="white">star</v-icon>{{item.rate}}
                                    </div>
                                    <v-btn v-if="authFlagForEdit" icon @click="deleteFeatured(item.pro_id)" style="    right: 0;position: absolute;bottom: 0;">
                                        <v-icon color="#E60000">clear</v-icon>
                                    </v-btn>
                                </v-img>

                            <v-card-title class="font-weight-bold justify-content-center pt-0" style="font-size: medium;">

                                {{item.title}}
                            </v-card-title>
                        </v-flex>
                </v-card>
            </div>


        </flickity>
    </v-card>
</template>

<script>
    import Flickity from 'vue-flickity';
    import userInfoMixin from "../userInfoMixin";
    export default {
        name: "featuredProducts",
        mixins: [userInfoMixin],
        components: {
            Flickity
        },
        data:()=>{
            return{
                authFlagForEdit:false,
                loadingFea:true,
                feturedProducts:[],
                flickityOptions: {
                    initialIndex: 1,
                    autoPlay: true ,
                    pageDots: false,
                    adaptiveHeight: true,
                },
            }
        },
         
           
        computed:{
            checkUserAuth(){
                return this.$store.getters.getAuthFlag;
            },
            getAllProducts(){
                return this.$store.getters.getAllProducts;
            },
        },
        watch: {
            checkUserAuth(flag) {
                if (flag === true) {
                    this.authFlagForEdit = true;
                } else if (flag === false) {
                    this.authFlagForEdit = false;
                }
            },
            getAllProducts(products){
            
                this.loadingFea = true;
                this.feturedProducts =[];
                if(products.userfeaturedproduct!==null) {

                    this.feturedProducts = products.userfeaturedproduct;
                    this.loadingFea =false;
                    this.noData= false;
                    this.dbData = true;

                }else {
                    this.loadingFea = false;
                    this.feturedProducts =[];
                }


            },
        },
        methods:{
            deleteFeatured(id){
                this.loadingFea=true;
                 this.$store.commit('setClearAppMsgs');
                 this.$store.dispatch('markFeaturedProduct', {
                slug: this.$route.params.id,
                id: id,
                    

                    });

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

        background: #fff;
    }

    >>>.carousel-cell {
        width: 70%;
        height: fit-content;
        margin-right: 10px;
        background: #fff;
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
    >>>.radting-badge{
        position: absolute;
        right: 0;
        background-color: #E60000;
        border-radius: 50%;
        padding: 6px;
        margin: 10px;
        color: white;
        height: 35px;
        font-size: 15px;
        width: 35px;
    }
    >>>.round-products{
        border-radius: 10px
    }
    >>>.flickity-button {
        position: absolute !important;
        background: red !important;
        border: none !important;
        color: #fff !important;
    }
</style>