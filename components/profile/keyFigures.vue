<template>

    <v-card tile flat >
        <v-card-title class=" font-weight-bold ">
            <div >{{$t('profile.keyFigures.Key Figures')}}</div>


        <v-card-text class="ma-5">
    <v-layout column wrap style=" width: 100%;">
        <v-layout row wrap justify-center>
            <div style="width: 135px">
            <v-card width="110" height="110" color="#E60000" class="figure-back" style="margin: auto">
                <div style="padding: 20px;" class="headline justify-space-between">
                <img class="center-figure" alt="size"  width="40" src="../resources/EmployeesWhite.svg">
                <h4 class="center-figure" style="font-size: 15px;color: white;">
                    {{businessSize[0]}}
                </h4>
                </div>
            </v-card>
            <v-card-text class="font-weight-bold text-center" style="font-size: large;padding: 10px;direction: ltr;">
                {{$t('profile.keyFigures.Company Size')}}
            </v-card-text>
            </div>
            <div style="width: 135px">
                <v-card  width="110" height="110"  color="#E60000" class="figure-back" style="margin: auto">
                    <div style="padding: 20px;" class="headline justify-space-between">
                        <img class="center-figure" alt="size"  width="40" src="../resources/ProductWhite.svg">
                        <h4 class="center-figure" style="color: white;">{{producrcount}}</h4>
                    </div>
                </v-card>
                <v-card-text class="font-weight-bold text-center" style="padding: 10px;">
                    {{$t('profile.keyFigures.Products')}}
                </v-card-text>
            </div>
            <div style="width: 135px">
                <v-card  width="110" height="110" color="#E60000" class="figure-back" style="margin: auto">
                    <div style="padding: 20px;" class="headline justify-space-between">
                        <img class="center-figure" alt="size"  width="40" src="../resources/ServicesWhite.svg">
                        <h4 class="center-figure" style="color: white;"> {{servicecount}}</h4>
                    </div>
                </v-card>
                <v-card-text class="font-weight-bold text-center" style="padding: 10px;">
                    {{$t('profile.keyFigures.Services')}}
                </v-card-text>
            </div>
        </v-layout>
    </v-layout>
        </v-card-text>
        </v-card-title>
    </v-card>

</template>

<script>
    import userInfoMixin from "../userInfoMixin";
    export default {
        name: "keyFigures",
        mixins: [userInfoMixin],
        data:()=>{
            return{
                companysize: null,
                servicecount: null,
                producrcount: null,

            }

        },
               computed:{
            checkServicesData(){
              return this.servicesChips.length;
            },
            checkUserAuth(){
                return this.$store.getters.getAuthFlag;
            },
            getAllservice(){
                return this.$store.getters.getAllservice;
            },
            getAllProducts(){
                return this.$store.getters.getAllProducts;
            },
           
        
        },
        watch:{
                           getAllservice(service){


                if(service) {



                this.servicecount = service.length;

        

            }
        },

                          getAllProducts(products){
if(products) {



                this.producrcount = products.products.length;

        

            }
        },
        },
    }
</script>

<style scoped>
.figure-back{
    border-radius: 50% !important;
    background-color: red;
    width: 130px;
    height: 130px;
}
    .center-figure{
        margin-left: auto;
        margin-right: auto;
        display: block;
        text-align: center;

    }
</style>
