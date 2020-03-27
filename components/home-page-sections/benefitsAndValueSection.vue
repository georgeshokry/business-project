<template>
    <v-card flat min-height="300" style="background-color: #f1f1f1;">

        <v-container fluid fill-height>

            <v-layout row justify-center align-center>
                <v-flex lg9>
                <v-flex lg12>
                    <v-card-title class="font-weight-bold" style="color:#e60000;">
                        {{$t('home-page-sections.benefitsAndValueSection.BENEFITS & VALUE')}}
                    </v-card-title>
                </v-flex>

                </v-flex>
                <v-flex lg9>

                    <v-layout row wrap style="padding: 0 30px 0 30px;">
                <v-flex lg4 style="height: 220px;padding: 1px;">

                    <v-layout  wrap>
                        <v-flex xl1 lg2 xs3 md1 style="    max-width: fit-content;">
                            <img src="../resources/Business page.svg">
                        </v-flex>
                        <v-flex lg9 xs10>
                            <v-card-title class="pa-0" style="color:#000000;font-size: 15px; font-weight: bold;    line-height: 17px;text-align: initial;margin: 1px;word-break: normal">{{$t('home-page-sections.benefitsAndValueSection.1- Free Business Listing')}}</v-card-title>
                        </v-flex>
                    </v-layout>
                    <v-card-text class="pb-0" style="padding-top:5px; padding-left: 0; padding-right: 0;text-align: initial;word-break: normal !important;font-size: 18px !important;min-width: 310px;">
                        {{$t('home-page-sections.benefitsAndValueSection.Free Business Listing inside')}}
                    </v-card-text>
                </v-flex>
                        <v-flex lg4 style="height: 220px;padding: 1px;">

                            <v-layout  wrap>
                                <v-flex xl1 lg2 xs3 md1 style="    max-width: fit-content;">
                                    <img src="../resources/Products.svg">
                                </v-flex>
                                <v-flex lg9 xs10>
                                    <v-card-title class="pa-0" style="color:#000000;font-size: 15px; font-weight: bold;    line-height: 17px;text-align: initial;margin: 1px;word-break: normal">{{$t('home-page-sections.benefitsAndValueSection.2- Business Page with Full Content Control')}}</v-card-title>
                                </v-flex>
                            </v-layout>
                            <v-card-text class="pb-0" style="padding-top:5px; padding-left: 0; padding-right: 0;text-align: initial;word-break: normal !important;font-size: 18px !important;min-width: 310px;">
                                {{$t('home-page-sections.benefitsAndValueSection.Set your business (Mission & Vision)')}}
                            </v-card-text>
                        </v-flex>
                        <v-flex lg4 style="height: 220px;padding: 1px;">

                            <v-layout  wrap>
                                <v-flex xl1 lg2 xs3 md1 style="    max-width: fit-content;">
                                    <img src="../resources/Sales.svg">
                                </v-flex>
                                <v-flex lg9 xs10>
                                    <v-card-title class="pa-0" style="color:#000000;font-size: 15px; font-weight: bold;    line-height: 17px;text-align: initial;margin: 1px;word-break: normal">{{$t('home-page-sections.benefitsAndValueSection.3- Products & Services Showcasing')}}</v-card-title>
                                </v-flex>
                            </v-layout>
                            <v-card-text class="pb-0" style="padding-top:5px; padding-left: 0; padding-right: 0;text-align: initial;word-break: normal !important;font-size: 18px !important;min-width: 310px;">
                                {{$t('home-page-sections.benefitsAndValueSection.List your products & services')}}
                            </v-card-text>
                        </v-flex>
                    </v-layout>
                </v-flex>
<!--          /////////////////////////the next three columns///////////////////-->
                <v-flex lg9>

                    <v-layout row wrap style="padding: 0 30px 0 30px;">
                        <v-flex lg4 style="height: 220px;padding: 1px;">

                            <v-layout  wrap>
                                <v-flex xl1 lg2 xs3 md1 style="    max-width: fit-content;">
                                    <img src="../resources/Messaging.svg">
                                </v-flex>
                                <v-flex lg9 xs10>
                                    <v-card-title class="pa-0" style="color:#000000;font-size: 15px; font-weight: bold;    line-height: 17px;text-align: initial;margin: 1px;word-break: normal">{{$t('home-page-sections.benefitsAndValueSection.4- Online Services')}}</v-card-title>
                                </v-flex>
                            </v-layout>
                            <v-card-text class="pb-0" style="padding-top:5px; padding-left: 0; padding-right: 0;text-align: initial;word-break: normal !important;font-size: 18px !important;min-width: 310px;">
                                {{$t('home-page-sections.benefitsAndValueSection.Innovative marketing and sales online services')}}
                            </v-card-text>
                        </v-flex>
                        <v-flex lg4 style="height: 220px;padding: 1px;">

                            <v-layout  wrap>
                                <v-flex xl1 lg2 xs3 md1 style="    max-width: fit-content;">
                                    <img src="../resources/Content.svg">
                                </v-flex>
                                <v-flex lg9 xs10>
                                    <v-card-title class="pa-0" style="color:#000000;font-size: 15px; font-weight: bold;    line-height: 17px;text-align: initial;margin: 1px;word-break: normal"> {{$t('home-page-sections.benefitsAndValueSection.5- Communicating & Interacting')}}</v-card-title>
                                </v-flex>
                            </v-layout>
                            <v-card-text class="pb-0" style="padding-top:5px; padding-left: 0; padding-right: 0;text-align: initial;word-break: normal !important;font-size: 18px !important;min-width: 310px;">
                                {{$t('home-page-sections.benefitsAndValueSection.Build a global business network with other businesses')}}
                            </v-card-text>
                        </v-flex>
                        <v-flex lg4 style="height: 220px;padding: 1px;">

                            <v-layout  wrap>
                                <v-flex xl1 lg2 xs3 md1 style="    max-width: fit-content;">
                                    <img src="../resources/Reviews.svg">
                                </v-flex>
                                <v-flex lg9 xs10>
                                    <v-card-title class="pa-0" style="color:#000000;font-size: 15px; font-weight: bold;    line-height: 17px;text-align: initial;margin: 1px;word-break: normal">{{$t('home-page-sections.benefitsAndValueSection.6- Personal Profile')}}</v-card-title>
                                </v-flex>
                            </v-layout>
                            <v-card-text class="pb-0" style="padding-top:5px; padding-left: 0; padding-right: 0;text-align: initial;word-break: normal !important;font-size: 18px !important;min-width: 310px;">
                                {{$t('home-page-sections.benefitsAndValueSection.If youre looking to build up personal')}}
                                <span v-bind:v-html="$t('home-page-sections.benefitsAndValueSection.join now')"></span>
                            </v-card-text>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "benefitsAndValueSection",
        data:()=>{
            return{

            }
        }
    }
</script>

<style scoped>

</style>