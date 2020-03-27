<template>
    <v-card flat min-height="300">
        <v-container fluid fill-height>
            <v-layout row justify-center align-center>
                <v-flex lg9>
                    <v-lazy
                            :options="{
                            threshold: 0.99
                            }"
                            min-height="150"
                            transition="slide-x-transition"
                    >
            <v-flex lg12 style="height: fit-content">
                <v-card-title class="font-weight-bold pb-0" style="color:#E60000">
                    {{$t('home-page-sections.whatAndWhoSection.WHO CAN JOIN?')}}
                </v-card-title>
                <v-card-title class="pt-0" style="text-align: initial;word-break: normal !important;  " v-html="$t('home-page-sections.whatAndWhoSection.-Whoever aims to start')">
                </v-card-title>
            </v-flex>
                    </v-lazy>
                <v-divider style="border: 1px solid #E60000;max-width: 50%;margin: auto;" ></v-divider>
<!--                <v-divider inset vertical color="red"></v-divider>-->
                    <v-lazy
                            :options="{
                            threshold: 0.99
                            }"
                            min-height="150"
                            transition="slide-x-reverse-transition"
                    >
                <v-flex lg12 style="height: fit-content">
                    <v-card-title class="font-weight-bold pb-0" style="color:#E60000">
                        {{$t('home-page-sections.whatAndWhoSection.HOW IT WORKS?')}}
                    </v-card-title>
                    <v-card-title class="pt-0" style="word-break: normal !important;   text-align: initial;" v-html="$t('home-page-sections.whatAndWhoSection.1- Register Standard Account')">

                    </v-card-title>
                </v-flex>
                    </v-lazy>
                </v-flex>
        </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "whatAndWhoSection",
        data:()=>{
            return{
                firstShow: false,
            }
        }
    }
</script>

<style scoped>
.sec-div-display{
display: block;
}
@media only screen and (max-width: 959px) {
    .sec-div-display{
        display: none !important;
    }
}
</style>