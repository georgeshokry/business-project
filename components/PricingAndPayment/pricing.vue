<template>
    <v-container style="min-height:85vh">
        <v-layout row wrap justify-content-center>
                        <v-card-title class="pa-5" style="text-align: center;    word-break: normal;width: 100%">
                            <div style="width: 100%">{{$t('pricing.pricePlane.Your BUSINESS is Visible')}}</div>
                            <div style="width: 100%; color: #E60000">{{$t('pricing.pricePlane.Showcase your Expertise, Services, Products and Attract TARGETED clients')}}</div>
                        </v-card-title>
        </v-layout>

        <v-flex xl7 lg12 style="margin: auto">
        <v-tabs
                show-arrows
                icons-and-text
                background-color="white"
                light
        >
            <v-tab
                    active-class="clicked-tab"
                    style="font-weight: 700;"
            >
                {{$t('pricing.pricePlane.Professional')}}

                <v-img
                        contain
                        alt="Professional"
                        width="35"
                        src="/images/Professional_Red.svg"
                ></v-img>
            </v-tab>
            <v-tab
                    active-class="clicked-tab"
                    style="font-weight: 700;"
            >
                {{$t('pricing.pricePlane.Enterprise')}}
                <v-img
                        contain
                        alt="Enterprise"
                        width="35"
                        src="/images/Enterprise_Red.svg"
                ></v-img>
            </v-tab>

            <v-tab-item
            >
                <v-card
                        style="border:1px solid #E60000"


                >
                    <v-container style="padding: 14px 0 14px 0;">
                        <v-layout row wrap style=" justify-content: space-evenly;   margin: auto;">
                            <v-flex lg7 md5 sm6 class="ma-1">
                                <v-card min-height="510px">
                                    <v-card-text style="text-align: initial;color: #E60000;background-color: #8080801a;font-weight: 700">{{$t('pricing.pricePlane.Extremely Efficient Features & Benefits')}}</v-card-text>
                                    <v-card-text style="text-align: initial;color: black;">
                                        <ul style="margin-top: 5px" >
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane.Business Page with Full Content Control Improve Local')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane.Priority Business Listing in our advanced')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane.Interact with all MyBusiness Members')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.24/7 Business Global Business Presence')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Business Engagement')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Promote Word of Mouth')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Promote Word of Mouth')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Improve SEO')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Responsive Landing Page')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Dashboard')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.MyBusiness Targeted ADS')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Featured Ads Capability')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Targeted Email Campaign')">

                                            </li>

                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Sending Business Emails Notifications')">

                                            </li>

                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Receiving Business Notifications')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Using MyBusiness Online')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Being Mentioned in MyBusiness')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Web Page Notifications')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane.Monthly Report')">

                                            </li>
                                        </ul>
                                    </v-card-text>
                                    <v-card-text style="text-align: initial;color: #E60000;background-color: #8080801a;font-weight: 700">{{$t('pricing.pricePlane.Additional Customized Features')}}</v-card-text>
                                    <v-card-text style="text-align: initial;color: black">
                                        <ul style="margin-top: 5px" >
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane.PROFESSIONALS CAN CHOOSE FROM 2')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"   v-html="$t('pricing.pricePlane.PROFESSIONALS CAN ADD UP TO 30')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane.PRODUCT TYPE ACCOUNT')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane.SERVICE TYPE ACCOUNT1')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane.SERVICE TYPE ACCOUNT2')">

                                            </li>

                                        </ul>
                                    </v-card-text>



                                </v-card>
                            </v-flex>
                            <v-flex lg4 md5 sm6 style="display: flex;align-items: flex-start;">
                                <v-layout column wrap class="sticky">
                                    <v-card class="ma-1">
                                        <v-card-text style="text-align: initial;color: #E60000;background-color: #8080801a;font-weight: 700">{{$t('pricing.pricePlane.Best Solution For')}}</v-card-text>
                                        <v-card-text style="font-weight: 700;text-align: initial;color: black;padding-bottom: 0">
                                            {{$t('pricing.pricePlane.All Individuals Such as')}}
                                        </v-card-text>
                                        <v-card-text style="color: black; padding-top: 0">
                                            <ul style="text-align: initial" v-html="$t('pricing.pricePlane.for following')">

                                            </ul>

                                        </v-card-text>
                                    </v-card>
<!--                               pricing chocies goes here >>>>>-->
                                    <pricing-choice-pro></pricing-choice-pro>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-card>
            </v-tab-item>
<!--            ////////////////////-->
            <v-tab-item
            >
                <v-card
                        style="border:1px solid #E60000"


                >
                    <v-container style="padding: 14px 0 14px 0;">
                        <v-layout row wrap style=" justify-content: space-evenly;   margin: auto;">
                            <v-flex lg7 md5 sm6 class="ma-1">
                                <v-card min-height="510px">
                                    <v-card-text style="text-align: initial;color: #E60000;background-color: #8080801a;font-weight: 700">{{$t('pricing.pricePlane2.Extremely Efficient Features & Benefits')}}</v-card-text>
                                    <v-card-text style="text-align: initial;color: black;">
                                        <ul style="margin-top: 5px" >
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.Business Page with Full Content Control Improve Local')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.Priority Business Listing in our advanced')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.Interact with all MyBusiness Members')">

                                            </li>


                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.Featured Products Slider Section')">
                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.Business Staff (Business Team Work Environment)')">
                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.Testimonials (Present your Valued Reviews)')">
                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.Company Key Figures Section')">
                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.Verified Badge')">
                                            </li>




                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.24/7 Business Global Business Presence')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Business Engagement')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Promote Word of Mouth')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Promote Word of Mouth')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Improve SEO')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Responsive Landing Page')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Dashboard')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.MyBusiness Targeted ADS')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Featured Ads Capability')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Targeted Email Campaign')">

                                            </li>

                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Sending Business Emails Notifications')">

                                            </li>

                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Receiving Business Notifications')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Using MyBusiness Online')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Being Mentioned in MyBusiness')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Web Page Notifications')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']" v-html="$t('pricing.pricePlane2.Monthly Report')">

                                            </li>
                                        </ul>
                                    </v-card-text>
                                    <v-card-text style="text-align: initial;color: #E60000;background-color: #8080801a;font-weight: 700">{{$t('pricing.pricePlane.Additional Customized Features')}}</v-card-text>
                                    <v-card-text style="text-align: initial;color: black">
                                        <ul style="margin-top: 5px" >
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.PROFESSIONALS CAN CHOOSE FROM 2')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"   v-html="$t('pricing.pricePlane2.PROFESSIONALS CAN ADD UP TO 30')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.PRODUCT TYPE ACCOUNT')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.SERVICE TYPE ACCOUNT1')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.SERVICE TYPE ACCOUNT2')">

                                            </li>
<!--//////////////////////////////////////////////////////////////////-->
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.Testimonials Section')">

                                            </li>
                                            <li :class="[rtl === false ? 'checkmark' : 'checkmarkRtl']"  v-html="$t('pricing.pricePlane2.Company Key')">

                                            </li>

                                        </ul>
                                    </v-card-text>



                                </v-card>
                            </v-flex>
                            <v-flex lg4 md5 sm6 style="display: flex;align-items: flex-start;">
                                <v-layout column wrap class="sticky">
                                    <v-card class="ma-1">
                                        <v-card-text style="text-align: initial;color: #E60000;background-color: #8080801a;font-weight: 700">{{$t('pricing.pricePlane2.Best Solution For')}}</v-card-text>
                                        <v-card-text style="font-weight: 700;text-align: initial;color: black;padding-bottom: 0">
                                            {{$t('pricing.pricePlane2.All Individuals Such as')}}
                                        </v-card-text>
                                        <v-card-text style="color: black; padding-top: 0">
                                            <ul style="text-align: initial" v-html="$t('pricing.pricePlane2.for following')">

                                            </ul>

                                        </v-card-text>
                                    </v-card>
                                    <pricing-choice-ent></pricing-choice-ent>

                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-tab-item>
        </v-tabs>
        </v-flex>

    </v-container>
</template>

<script>
    import PricingChoicePro from "./pricingChoicePro";
    import PricingChoiceEnt from "./pricingChoiceEnt";
    export default {
        name: "pricing",
        components: {PricingChoiceEnt, PricingChoicePro},
        data: () =>{
            return{

                rtl: false,

            }
        },
        mounted(){
            this.rtl = this.$vuetify.rtl;
            this.$store.dispatch('allPricingPlan');
        },
        computed:{
            rtlChange(){
                return this.$vuetify.rtl;
            },

        },
        watch:{
            rtlChange(flag){
                this.rtl = flag;
            }
        },
        methods:{

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