<template>
    <v-card tile flat v-if="testmonialstotal.length !== 0 || authFlagForClear">
        <v-card-title class=" font-weight-bold justify-space-between">
            <div>{{$t('profile.testimonials.Testimonials')}}</div>
        </v-card-title>
        <div v-if="loading" >
            <v-layout
                    fill-height
                    align-center
                    justify-center
                    ma-0
            >
                <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
            </v-layout>
        </div>

        <div v-if="testmonialstotal.length ===0 && loading=== false && authFlagForClear" style="      padding-top: 25px;  font-size: large;text-align: center;color: #cccccc;" >
            {{$t('profile.testimonials.No testimonials yet, Choose from reviews!')}}
        </div>
        <flickity v-if="Object.keys(testmonialstotal).length > 0"  ref="flickity" class="carousel"  :options="flickityOptions" style="direction: ltr">
            <div class="carousel-cell" v-for="(item,h) in testmonialstotal" :key="h" >
                <div >
                    <div class="justify-space-between">
                    <img src="../resources/Qoutations_Coma_66_Darker_Grey.svg" class="quot-up">
                    <v-btn color="#E60000" v-if="authFlagForClear" icon @click="deleTestmonial(item.date)" style="    right: 0;position: absolute;top: 0;">
                        <v-icon color="#E60000">clear</v-icon>
                    </v-btn>
                    </div>
                    <div class="rev-content-testi">
                        <h4 style="text-align: center;">{{item.review}}</h4>

                    </div>
                    <div class="rev-title-testi">


                    <v-layout row wrap>

                        <v-card-text class="pa-0">
                            <v-card  color="white" elevation="1" width="40" height="40" style="margin: auto">
                                <v-img
                                        height="100%"
                                        aspect-ratio="1.7"
                                        :src="'/images/med/'+item.reviewlogo"
                                        :lazy-src="'/images/med/'+item.reviewlogo"

                                >
                                    <template v-slot:placeholder>
                                        <v-layout
                                                fill-height
                                                align-center
                                                justify-center
                                                ma-0
                                        >
                                            <v-progress-circular size="17" width="2" indeterminate color="#E60000"></v-progress-circular>
                                        </v-layout>
                                    </template>
                                </v-img>
                            </v-card>
                            {{item.reviewer}}
                        </v-card-text>
                    </v-layout>
                    </div>
                    <img src="../resources/Qoutations_Coma_99_Darker_Grey.svg" class="quot-down">
                </div>
            </div>
          
           
        </flickity>


    </v-card>
</template>

<script>
    import Flickity from 'vue-flickity';
    export default {
        name: "testimonials",
        components: {
            Flickity
        },
        data:()=>{
            return{
                testmonialstotal:[],
                authFlagForClear: false,
                loading: true,
                flickityOptions: {
                    initialIndex: 1,
                    autoPlay: true ,
                    pageDots: false,
                    adaptiveHeight: true,
                },
            }
         
        },
            created(){

         

             
         },

              computed:{
                  checkUserAuth(){
                      return this.$store.getters.getAuthFlag;
                  },
          getAllreviwes(){
                return this.$store.getters.getAllreviwes;
            },
           
        },
          watch:{

              checkUserAuth(flag){

                  if(flag === true) {
                      this.authFlagForClear = true;

                  }else if (flag === false){
                      this.authFlagForClear = false;

                  }
                  else if (flag === 'not_auth'){
                      this.authFlagForClear = false;

                  }
              },

          getAllreviwes(reviews){
              this.loading = true;
              this.testmonialstotal =[];
              console.log(reviews, "TESTmo");
              if(reviews !== null) {

                this.testmonialstotal=reviews.testmonialstotal;
                this.loading = false;
            }else {
                    this.loading = true;
                    this.testmonialstotal =[];
                }

            },
                
            },
        methods:{
            deleTestmonial(id){
          this.$store.commit('setClearAppMsgs');
                 this.$store.dispatch('markAsBookmark', {
                slug: this.$route.params.id,
                id: id.date,
                    

                    });
            },
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
    width: 66%;
    height: fit-content;
    margin-right: 10px;
    background: #f3f3f3;
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
>>>.flickity-button {
    position: absolute !important;
    background: red !important;
    border: none !important;
    color: #fff !important;
}
>>>.rev-title-testi{
    text-align: center;
    margin: 5px;
    padding: 10px
}
    >>>.rev-content-testi{
        text-align: center;
        margin: 15px;
        padding-right: 45px;
        padding-left: 45px;
    }
>>>.quot-up{
    width: 30px;
    margin: 10px;
    position: absolute;
    top: -10px;
}
    >>>.quot-down{
        width: 30px;
        margin: 10px;
        position: absolute;
        bottom: -10px;
        right: 0;
    }

>>>.flickity-prev-next-button {
     top: 50%;
     width: 35px;
     height: 35px;
     border-radius: 50%;
     transform: translateY(-50%);
 }
</style>
