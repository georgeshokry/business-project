<template>
    <v-container fluid fill-height style="justify-content: center;   background-color: white;">

        <v-layout row wrap>


<!--        <v-card-text class="headline pb-0 pt-0" style="height: fit-content;justify-content: center;text-align: center">-->
<!--            Create Professional Business Page-->
<!--        </v-card-text>-->


                <v-container fluid  justify-center>

                <v-layout   row wrap justify-center style="align-items: center">
                    <v-flex xl12 lg12 md12 xs12>
                    <v-card-text class=" pt-0" style="    color:#E60000;justify-content: center;text-align: center; font-weight: bold; font-size: 25px!important;">
                        {{$t('registration.stepping-msgs.chooseBusinessType.What Describe your Business the best?')}}
                    </v-card-text>
                    </v-flex>
                    <v-flex lg4 xl3 class="mb-3">
                        <v-hover
                                v-slot:default="{ hover }"
                        >
                            <v-card  :elevation="hover ? 9 : 2" :ripple="{ class: 'red--text' }"  class="choise-card" @click="routeToChoise('pro')">
                            <v-card-title class="pb-0">
                            <img
                                    alt="Professional"
                                    height="80px"
                                    width="60px"
                                    style=" margin: auto;"
                                    src="/images/Professional_Red.svg"
                            >
                            </v-card-title>
                            <div class=" pa-0 choise-card-title" >
                                {{$t('registration.stepping-msgs.chooseBusinessType.Professional')}}
                            </div>
                            <v-card-text class="pa-2 pb-0" style="text-align: center;font-size: 18px!important;color: #202020;    height: 140px;">
                                {{$t('registration.stepping-msgs.chooseBusinessType.Freelancers, Amateurs')}}<br>
                                <span>{{$t('registration.stepping-msgs.chooseBusinessType.For Example Pro')}}</span>
                            </v-card-text>
                                <v-card-text class="pa-2 pt-0" style="text-align: center;font-size: 18px!important;color: #E60000;font-weight: bold">
                                    {{$t('registration.stepping-msgs.chooseBusinessType.Showcase your expertise')}}
                                </v-card-text>
                            <v-card-actions class="pt-0" style="text-align: center; ">
                                 <v-btn elevation="0" dark color="#E60000" style="width: 100%">
                                     {{$t('registration.stepping-msgs.chooseBusinessType.Create Professional Page')}}
                                 </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-hover>
                    </v-flex>
                    <v-flex lg4 xl3 class="mb-3">
                        <v-hover
                                v-slot:default="{ hover }"
                        >
                            <v-card  :elevation="hover ? 9 : 2" :ripple="{ class: 'red--text' }"  class="choise-card" @click="routeToChoise('enter')">
                                <v-card-title class="pb-0">
                                    <img
                                            alt="Professional"
                                            height="80px"
                                            width="60px"
                                            style=" margin: auto;"
                                            src="/images/Enterprise_Red.svg"
                                    >
                                </v-card-title>
                                <div class=" pa-0 choise-card-title" >
                                    {{$t('registration.stepping-msgs.chooseBusinessType.Company')}}
                                </div>
                                <v-card-text class="pa-2 pb-0" style="text-align: center;font-size: 18px!important;color: #202020;    height: 140px;">
                                    {{$t('registration.stepping-msgs.chooseBusinessType.Subcontractors, Distributers')}}<br>
                                    <span>{{$t('registration.stepping-msgs.chooseBusinessType.For Example Companies')}}</span>
                                </v-card-text>
                                <v-card-text class="pa-2 pt-0" style="text-align: center;font-size: 18px!important;color: #E60000;font-weight: bold">
                                    {{$t('registration.stepping-msgs.chooseBusinessType.Be visible, get reached')}}
                                </v-card-text>
                                <v-card-actions class="pt-0" style="text-align: center; ">
                                    <v-btn elevation="0" dark color="#E60000" style="width: 100%">
                                        {{$t('registration.stepping-msgs.chooseBusinessType.Create Company Page')}}
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-flex>

                </v-layout>
                </v-container>


        </v-layout>


    </v-container>
</template>

<script>
    export default {
        name: "chooseBusinessType",
        data:()=>{
            return{

            }
        },
        methods:{
            routeToChoise(type){
                if(type==='pro'){
                    this.$router.push({name: 'professionalRegistration', params:{lang:'en'}})
                }else if(type ==='enter'){
                    this.$router.push({name: 'enterpriseRegistration', params:{lang:'en'}})
                }
            }
        }
    }
</script>

<style scoped>
>>>.choise-card{
    justify-content: center;
    text-align: center;
    width: 325px;
    height: 380px;
    margin: auto;

}
    >>>.choise-card-title{
        justify-content: center;
        font-size: x-large;
        color:#E60000;
        font-weight: bold
    }
</style>
