<template>


        <v-card>
            <v-layout style="justify-content: center">
                <v-spacer></v-spacer>
                <v-card-text style="color: #E60000;padding: 13px;width: fit-content;">
                    {{$t('shareMenu.Share On')}}
                </v-card-text>
                <div v-for="(item,i) in socialMediaShare" :key="i">
                    <v-btn
                            style="margin: 5px"
                            elevation="0"
                            dark
                            color="#E60000"
                            icon
                            @click="openShare(item.link, item.name)"

                    >
                        <v-icon>{{item.logo}}</v-icon>
                    </v-btn>
                </div>
                <v-spacer></v-spacer>
            </v-layout>

            <v-divider class="mb-1"></v-divider>

            <v-layout style="padding: 6px">
                <v-text-field
                        v-model="linkToCopy"
                        outlined
                        dense
                        readonly
                        elevation="0"
                        hide-details="auto"
                        id="link"

                >

                </v-text-field>
               <v-btn
                   color="#E60000"
                   dark
                   smaller
                   elevation="0"
                   text
                   @click="copyToClipboard"
               >
                   {{$t('shareMenu.copy')}}
               </v-btn>
            </v-layout>

            <v-scroll-y-transition>
            <v-layout style="padding: 6px; justify-content: center;text-align: center" >
                <v-alert  transition="slide-y-transition" max-width="250" :value="success" outlined dense type="success" style="text-align: center;color: green;font-size: 14px">
                    {{$t('shareMenu.link coped')}}
                </v-alert>
            </v-layout>
            </v-scroll-y-transition>
        </v-card>

</template>

<script>
    import { isMobile } from 'mobile-device-detect';
    export default {
        name: "shareMenu",
        data:()=>{
            return{
                fav: true,
                menu: false,
                message: false,
                hints: true,
                showMenu: false,
                linkToCopy: '',
                success: false,
                socialMediaShare:[
                    {
                        name: "linkedin",
                        link: "https://www.linkedin.com/sharing/share-offsite/?url=" + window.location,
                        logo: "mdi-linkedin-box",
                    },
                    {
                        name: "facebook",
                        link: "https://www.facebook.com/sharer/sharer.php?u=" + window.location,
                        logo: "mdi-facebook",
                    },
                    {
                        name: "twitter",
                        link: "https://twitter.com/intent/tweet?text=" + window.location,
                        logo: "mdi-twitter",
                    },

                ]
            }
        },
        mounted() {
            if(isMobile){
                this.socialMediaShare.push({
                    name: "whatsapp",
                    link: "whatsapp://send?text=" + window.location,
                    logo: "mdi-whatsapp",
                })
            }else {
                this.socialMediaShare.push({
                    name: "whatsapp",
                    link: "https://web.whatsapp.com/send?text=" + window.location,
                    logo: "mdi-whatsapp",
                })
            }
           this.linkToCopy = window.location;
        },
        computed:{

        },
        watch:{

        },
        methods:{
            copyToClipboard() {
                let range = document.createRange();
                range.selectNode(document.getElementById('link'));
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand("copy");

                this.success = true;
                setTimeout(()=>{
                    this.success = false;
                }, 3000)

            },
            openShare(url, name){
                if(name === 'whatsapp'){
                    window.open(url,'_blank');
                }else {
                    window.open(url,'popUpWindow','height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
                }

            }
        }
    }
</script>

<style scoped>
    >>>.v-text-field--outlined.v-input--dense.v-text-field--outlined>.v-input__control>.v-input__slot{
        min-height: 36px !important;
    }
    >>>.v-text-field .v-input__control, .v-text-field .v-input__slot, .v-text-field fieldset {
        border-color: inherit;
        border-radius: 0 !important;
    }
</style>