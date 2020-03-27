<template>
    <v-footer class="pa-0">
        <div class="footer-app">
            <v-layout row wrap justify-content-center class=" pt-4" style="padding-right: 100px;padding-left: 100px;">
            <v-btn
                    tile
                    text
                    small
                    dark
                    :ripple="{ class: 'red--text' }"
                    to="/en/terms-privacy"
            >
                {{ $t('header-footer.footerBar.Terms & Policies')}}
            </v-btn>
            <v-divider vertical dark class="vert-divider"></v-divider>
            <v-btn
                    tile
                    text
                    small
                    dark
                    :ripple="{ class: 'red--text' }"
            >
                {{ $t('header-footer.footerBar.Contact us')}}
            </v-btn>
                <v-divider vertical dark class="vert-divider"></v-divider>
                <v-btn
                        tile
                        text
                        small
                        dark
                        :ripple="{ class: 'red--text' }"
                >
                    {{ $t('header-footer.footerBar.faqs')}}
                </v-btn>
            <v-divider vertical dark class="vert-divider"></v-divider>
            <v-btn
                    tile
                    text
                    small
                    dark
                    :ripple="{ class: 'red--text' }"
            >
                {{ $t('header-footer.footerBar.help and support') }}
            </v-btn>
        </v-layout>
        </div>
    <v-container class="container--fluid footer-app" >



                <v-layout row wrap justify-space-between>
                    <v-flex lg3 md3 xs12 class="ma-3" style="text-align: center;">
                        <div>
                            <img style="margin-right: 10px;" width="50" src="../resources/mastercard2.png" alt="master-card">
                            <img style="margin-right: 10px;" width="60" src="../resources/visa.png" alt="visa-card">
<!--                            <img style="margin-right: 10px;" width="60" src="../resources/pay-pal.png" alt="pay-pal">-->
                        </div>
                    </v-flex>

                    <v-flex lg3 md3 xs12 class="ma-3" style="text-align: center;">
                    <v-card-text style="color: white;font-size: small !important;    justify-content: center;" class="pa-0">
                        {{ $t('header-footer.footerBar.copyrights', {date: year}) }} &nbsp; <v-icon size="15" color="white">copyright</v-icon>
                    </v-card-text>
                    </v-flex>
                    <v-flex lg3 md3 xs12 class="ma-3" style="text-align: center;">
                        <div>
                            <v-btn
                                    :ripple="{ class: 'red--text' }"
                                    elevation="0"
                                    fab
                                    dark
                                    x-small
                                    text
                                    style="border-radius: 26px;border: #ffffff solid 1px;"
                                    :href="'https://www.facebook.com/'"
                                    target="_blank"
                            >
                                <v-icon>mdi-facebook</v-icon>
                            </v-btn>
                            <v-btn
                                    :ripple="{ class: 'red--text' }"
                                    elevation="0"
                                    fab
                                    dark
                                    x-small
                                    text
                                    style="border-radius: 26px;border: #ffffff solid 1px;"
                                    :href="'https://www.twitter.com/'"
                                    target="_blank"
                            >
                                <v-icon>mdi-twitter</v-icon>
                            </v-btn>
                            <v-btn
                                    :ripple="{ class: 'red--text' }"
                                    elevation="0"
                                    fab
                                    dark
                                    x-small
                                    text
                                    style="border-radius: 26px;border: #ffffff solid 1px;"
                                    :href="'https://www.twitter.com/'"
                                    target="_blank"
                            >
                                <v-icon>mdi-instagram</v-icon>
                            </v-btn>
                        </div>
                    </v-flex>
                </v-layout>

    </v-container>
    </v-footer>
</template>

<script>
    export default {
        name: "footerBar",
        data:()=>{
            return{
                year: new Date().getFullYear(),
            }
        }
    }
</script>

<style scoped>
    .footer-app{
        background-color: #333;
        width: 100%;
    }
    .vert-divider {
        display: inline-block;
        border-right: 1px solid #fff;
       margin: 0;
    }
    @media (max-width: 720px) {
        .vert-divider {
            display: none;
            border-right: 1px solid #fff;
            margin: 0;
        }
    }
</style>