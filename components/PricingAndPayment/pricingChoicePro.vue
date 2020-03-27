<template>
    <div>
    <v-container class="pa-0">
        <header style="text-align: center; font-weight: bold;color:#E60000">{{$t('pricing.pricePlane.Our Pricing Plan')}}</header>
        <v-layout row wrap style="margin: auto; justify-content: center;padding-top: 5px;padding-bottom: 15px;">
            <v-item-group mandatory v-model="radioGroupPro" style="width: 100%">
                <v-container class="pa-0">

                    <v-layout row wrap style="margin: auto;justify-content: space-around;">

                        <v-flex lg5 xs5
                                v-for="(item,n) in pricingPro"
                                :key="n"
                                style="margin-bottom: 20px"
                        >

                            <v-item v-slot:default="{ active, toggle }">

                                <v-card
                                        :ripple="{ class: 'red--text' }"
                                        :style="[active ? {'background-color': 'rgba(255, 37, 37, 0.18)', 'border': '2px solid #E60000'} : '']"
                                        :elevation="active ? '7' : '2'"
                                        class="d-flex choice-card"
                                        height="180"
                                        @click="toggle"
                                >
                                    <v-layout column wrap   @click="choice(item.id)" >
                                        <div>
                                            <div style="text-align: right;    height: 30px;" >

                                                <div class="ribbon-content" v-if="item.save > 0">
                                                    <div class="ribbon base"><span>{{$t('pricing.pricePlane.SAVE')}}  {{item.save}} {{$t('pricing.pricePlane.dollar')}}</span></div>
                                                </div>
                                                <!--                                                                        <span style="color: green;font-weight: bold;"></span>-->
                                            </div>
                                            <div style="text-align: center;padding-right: 5px; padding-left: 5px;font-weight: 700;" :class="active ? 'red-amount': 'black-amount'">
                                                {{$t('pricing.pricePlane.' + item.type)}}
                                            </div>
                                            <div style="direction: ltr;text-align: center;    line-height: 40px;" >
                                                $<span style="font-size: 45px; font-weight: 800;">{{item.amount}}</span>/{{$t('pricing.pricePlane.month')}}
                                            </div>
                                            <div style="font-size: 13px; text-align: center">
                                                {{$t('pricing.pricePlane.Billed every', {amount: item.price, every: item.months})}}
                                            </div>

                                        </div>
                                        <v-spacer></v-spacer>
                                        <div style="text-align: center;justify-content: center">
                                            <!--                                                            <v-radio color="#E60000" on-icon="check_circle_outline" :value="item.id" @change="choice(n)" >-->
                                            <v-scale-transition>
                                                <v-icon v-if="active === true" size="30"  color="#E60000">check_circle_outline</v-icon>
                                            </v-scale-transition>
                                            <!--                                                                    <v-icon v-else width="20"  > </v-icon>-->
                                            <!--                                                            </v-radio>-->
                                        </div>
                                    </v-layout>
                                </v-card>


                            </v-item>

                        </v-flex>

                    </v-layout>
                </v-container>

            </v-item-group>
        </v-layout>
    </v-container>
    <v-card flat class="ma-1">

        <v-btn

                block
                color="primary"
                elevation="0"
                @click="goToPaymentPro()"

        >
            {{$t('pricing.pricePlane.STARTUP NOW +')}}  {{priceFreeEnt}}  {{$t('pricing.pricePlane.days FREE')}}
        </v-btn>
        <div style="text-align: center">{{$t('pricing.pricePlane.Or')}}</div>
        <v-btn
                block
                color="primary"
                @click="goToPaymentPro()"
                outlined
        >
            {{$t('pricing.pricePlane.Proceed to 30')}}
        </v-btn>
    </v-card>
        <!--        <v-dialog-->
        <!--                persistent-->
        <!--                v-model="offerDialog"-->
        <!--                width="450px"-->
        <!--        >-->
        <!--            <v-card flat>-->
        <!--                <v-card-title style="color:#E60000;justify-content: center" v-html="$t('pricing.pricePlane.Congratulations')">-->

        <!--                </v-card-title>-->
        <!--                <v-card-title class="pt-0 pb-0" style="color:grey;justify-content: center; text-align: center;word-break: normal">-->
        <!--                    <div style="text-align: center">-->
        <!--                        {{$t('pricing.pricePlane.SUBSCRIBE NOW')}}-->
        <!--                    </div>-->
        <!--                    <div style="text-align: center">-->
        <!--                        {{$t('pricing.pricePlane.Get')}}-->
        <!--                    </div>-->
        <!--                </v-card-title>-->
        <!--                <v-card-title class="pt-0" style="color:#E60000;justify-content: center;font-weight: bold">-->
        <!--                    {{$t('pricing.pricePlane.Months')}}-->
        <!--                </v-card-title>-->
        <!--                <v-card-text style="text-align: center">-->
        <!--                    <v-btn-->

        <!--                            block-->
        <!--                            color="primary"-->
        <!--                            elevation="0"-->
        <!--                            style="letter-spacing: normal;"-->
        <!--                    >-->
        <!--                        {{$t('pricing.pricePlane2.STARTUP NOW +')}}-->
        <!--                    </v-btn>-->
        <!--                    <div>Or</div>-->
        <!--                    <v-btn-->
        <!--                            block-->
        <!--                            color="primary"-->
        <!--                            style="letter-spacing: normal;"-->
        <!--                            outlined-->
        <!--                    >-->
        <!--                        {{$t('pricing.pricePlane2.Proceed to 30')}}-->
        <!--                    </v-btn>-->
        <!--                </v-card-text>-->
        <!--            </v-card>-->
        <!--        </v-dialog>-->
    </div>
</template>

<script>
    let choiceId = "";
    export default {
        name: "pricingChoicePro",
        data:()=>{
            return {
                offerDialog: false,
                radioGroupPro: "",
                rtl: false,
                pricingPro: [
                ],
                priceFreeEnt: "30",
                priceChoice: undefined,
                userSelect: true,
            }
            },
                mounted(){
                this.rtl = this.$vuetify.rtl;
            },
            computed:{
                rtlChange(){
                    return this.$vuetify.rtl;
                },
                choiceUser(){
                    return this.radioGroupPro;
                },
                getPricingPlans(){
                    return this.$store.getters.getPricingPlans;
                }
            },
            watch:{
                choiceUser(choice){
                    choice === 1 ? this.priceFreeEnt = '30' : this.priceFreeEnt =  '60';
                },
                rtlChange(flag){
                    this.rtl = flag;
                },
                getPricingPlans(plans){
                    this.pricingPro = [];
                    for(let i in plans.plans){
                        if(plans.plans[i].type === 1 && plans.plans[i].active === 1){
                          this.pricingPro.push({
                                id: plans.plans[i].id,
                                save: plans.plans[i].save > 0 ? plans.plans[i].save : "",
                                amount: plans.plans[i].monthly,
                                type: plans.plans[i].days_balance === 180 ? "Annually": "Simi Annually",
                                plan: "Billed every 12",
                                price: plans.plans[i].price,
                                months: Math.ceil(plans.plans[i].days_balance / 30)

                            })
                        }
                    }
                    this.radioGroupPro = this.pricingPro[0].id;
                    this.pricingPro.reverse();
                }
            },
            methods:{
                choice(id){

                    choiceId = id;
                    console.log(choiceId );

                },
                goToPaymentPro(){
                    if(choiceId !== "") {
                        let priceToPay = this.pricingPro.find(id => id.id === choiceId).amount;
                        sessionStorage.setItem("choiceId", choiceId);
                        sessionStorage.setItem("choicePrice", priceToPay);
                        window.location.replace("/Payment/signeddatafields")
                    }
                }
            }
    }
</script>

<style scoped>

    >>>.v-tabs--icons-and-text>.v-tabs-bar .v-tab>:first-child {
        margin-bottom: 0px;
    }
    >>>.v-tabs-slider-wrapper {
        bottom: 0;
        margin: 0!important;
        position: absolute;
        transition: .3s cubic-bezier(.25,.8,.5,1);
        z-index: 1;
        height: 0px !important;
    }
    >>>.clicked-tab{
        background-color: #e600001f;
    }
    >>>.v-slide-group__wrapper {
        contain: content;
        display: flex;
        flex: 1 1 auto;
        overflow: hidden;
        border-radius: 8px 8px 0 0;
    }
    >>>.theme--light.v-icon--disabled {
        color: rgba(230, 0, 0, 0.38) !important;
    }
    >>>.theme--light.v-icon {
        color: rgba(230, 0, 0, 0.54) !important;
    }
    >>>.v-application ol, .v-application ul {
        padding-left: 0px;
        padding-right: 0px;


    }
    >>>ul {
        margin: 5px 0 15px;
        padding: 0;
    }
    >>>li {
        list-style: none;
        position: relative;
        margin-bottom: 8px;
        padding: 0 20px 0 20px;
    }
    >>>li:nth-child(2n+2){
        background-color: #f8f8f869;
    }
    >>>li.checkmark:before {
        left: 2px;
        content: "";
        position: absolute;
        top: 3px;
        width: 6px;
        height: 11px;
        border: solid #E60000;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    >>>li.checkmarkRtl:before{
        right: 2px;
        content: "";
        position: absolute;
        top: 3px;
        width: 6px;
        height: 11px;
        border: solid #E60000;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    >>>div.sticky {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
    }
    >>>.v-input--selection-controls {
        margin-top: 0px;
        padding-top: 0px;
    }
    >>>.choice-card{
        border-radius: 15px !important;
    }
    >>>.v-radio {
        align-items: center;
        display: block;
        height: auto;
        margin-right: 0;
        outline: none;
    }
    >>>.theme--light.v-icon {
        color: rgb(230, 0, 0) !important;
    }

    >>>.ribbon {
        position: absolute;
        top: -7px;
        right: -5px;
        padding: 5px;
        box-shadow: 0 3px 4px 2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    }
    >>>.ribbon-content{
        position: relative;
        width: 100%;
        height: 15px;
    }
    >>>.ribbon.base {
        background: green;
        color: #fff;
        border-right: 5px solid #6dff66;
    }

    >>>.ribbon:before, .ribbon:after {
        content: '';
        position: absolute;
        left: -9px;
        border-left: 10px solid transparent;
    }
    >>>.ribbon:before {
        top: 0;
    }
    >>>.ribbon:after {
        bottom: 0;
    }
    >>>.ribbon.base:before {
        border-top: 27px solid green;
    }
    >>>.ribbon.base:after {
        border-bottom: 27px solid green;
    }
    >>>.ribbon span {
        display: block;
        font-size: 16px;
        font-weight: 600;
    }

    >>>.black-amount{
        color: black;
    }
    >>>.red-amount{
        color: #E60000;
    }
    >>>.v-tabs--icons-and-text>.v-tabs-bar {
        height: 72px !important;
    }
</style>