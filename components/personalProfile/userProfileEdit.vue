<template>
    <v-container fluid grid-list-md  class="full-width-mobile" style="width: 75%; padding: 0;">
        <v-flex xl6 lg10 md8 style="margin: auto">


    <v-card      color="#f2f2f2">



                <v-tabs
                        v-model="model"
                        height="10"
                        show-arrows
                        color="#E60000"
                        active-class="clicked-tab"
                        centered
                        slider-color="transparent"
                        background-color="#f2f2f2"
                >
                    <v-divider  vertical></v-divider>

                    <v-tab
                            transition="scroll-y-transition"
                    >
                       {{$t('personalProfile.userProfileEdit.my profile')}}
                    </v-tab>
                    <v-divider  vertical class="ma-0" v-if="authFlagForEdit"></v-divider>
                    <v-tab
                            v-if="authFlagForEdit"
                            transition="scroll-y-transition"
                    >
                        {{$t('personalProfile.userProfileEdit.settings')}}
                    </v-tab>
                    <v-divider  vertical class="ma-0" v-if="authFlagForEdit"></v-divider>
                    <v-tab
                            eager
                            v-if="authFlagForEdit"
                            transition="scroll-y-transition"
                    >
                        {{$t('personalProfile.userProfileEdit.wallet')}}
                    </v-tab>
                    <v-divider  vertical ></v-divider>
                    <v-tab

                            v-if="authFlagForEdit"
                            style="background-color: #E60000;color:white;"
                            @click="routeToInbox"
                    >
                        {{$t('personalProfile.userProfileEdit.INBOX')}}
                    </v-tab>




            <v-tab-item

            >
                <v-card flat>

                  <profile-view></profile-view>

                </v-card>
            </v-tab-item>
            <v-tab-item
                    eager
                    v-if="authFlagForEdit"
            >
                <v-card flat>

                    <settings-view></settings-view>

                </v-card>
            </v-tab-item>
            <v-tab-item

                    v-if="authFlagForEdit"
            >
                <v-card flat>

                    <wallet-view></wallet-view>

                </v-card>
            </v-tab-item>

                </v-tabs>

    </v-card>
        </v-flex>
    </v-container>
</template>

<script>
    import ProfileView from "./profile-view";
    import SettingsView from "./settings-view";
    import WalletView from "./wallet-view";
    import userInfoMixin from "../userInfoMixin"
    export default {
        name: "userProfileEdit",
        components: {WalletView, SettingsView, ProfileView},
        mixins:[userInfoMixin],
        data:()=>{
            return {
                tabs:['my profile', 'settings', 'wallet'],
                model: 0,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            }
        },
        methods:{
            routeToInbox(){
                this.$router.push({
                    name: 'inbox',
                    params: {id: this.$route.params.id, lang: this.$route.params.lang}
                });

            },
        }
    }
</script>

<style >
.clicked-tab{
    background-color: white;
    color: #e60000;
}
.basil {
    background-color: #e60000 !important;
}
@media (max-width: 680px)  {
    .full-width-mobile {
        width:100% !important;
    }
}
.v-tabs-bar {
    z-index: 4!important;
    height: 48px !important;
}
</style>