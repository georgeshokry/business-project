<template>
    <v-container fluid grid-list-md  class="full-width-mobile" style=" padding: 0;">
        <v-layout row wrap justify-center>
            <div class="list-business-now" v-if="authFlagForEdit" >
                <router-link
                        style="color: white;"
                        :to="{name: 'chooseBusinessType', params:{lang: $i18n.locale}}"
                >
                    {{$t('personalProfile.header-data.List Your Business Now!')}}
                </router-link>
            </div>
            <v-card flat width="100%" >

                <v-card-title class=" font-weight-bold" style="padding-bottom:0; justify-content: center;">
                    <v-skeleton-loader
                            v-if="loadingUserData"
                            type="avatar elevation-3"
                            style="padding: 3px;"
                    ></v-skeleton-loader>
                    <div class="image-circle elevation-3" v-else>
                        <v-card  color="white" elevation="1" width="115" height="115" style="border-radius: 50%;" class="company-image">

                            <v-img

                                    style="object-fit: cover;border-radius: 50%;"
                                    height="115"
                                    width="115"
                                    :src="'/images/med/' + userInfo.profile_pic"
                            >
                                <template v-slot:placeholder>
                                    <v-layout
                                            fill-height
                                            align-center
                                            justify-center
                                            ma-0
                                    >
                                        <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
                                    </v-layout>
                                </template>
                            </v-img>
                        </v-card>
                    </div>
                </v-card-title>

                <v-card-title class="" style="justify-content: center;font-weight: 100;">

                    <div style="text-transform:capitalize;font-size: xx-large;">{{userInfo.name}}</div>
                </v-card-title>
                <v-skeleton-loader
                        v-if="loadingUserData"
                        type="card-heading"
                        style=" width: 300px; margin: auto;padding: 10px;"
                ></v-skeleton-loader>
                <v-skeleton-loader
                        v-if="loadingUserData"
                        type="text"
                        class="mx-auto"
                        style=" width: 160px; margin: auto;padding: 10px;"
                ></v-skeleton-loader>
                <v-skeleton-loader
                        v-if="loadingUserData"
                        type="text"
                        class="mx-auto"
                        style=" width: 140px; margin: auto;padding: 10px;"
                ></v-skeleton-loader>
                <v-card-title  style="padding-bottom:0; justify-content: center; padding-top: 0;font-size: larger;direction: ltr">
                    <img width="16" src="../resources/Location_Red.svg" style="margin-right: 5px;"> {{userInfo.country}}
                </v-card-title>

                <v-card-title class="" style="padding-bottom:0; justify-content: center; padding-top: 0;">

                    <div style="font-size: medium;font-weight: 400;">{{userInfo.jobtitle}}</div>
                </v-card-title>

                <v-card-title class=" status-content" >

                    <div v-if="!showStatusField && !loadingUserData" style="text-align: center">{{userInfo.status === null ? $t('personalProfile.header-data.what is your status?') : userInfo.status }}</div>

                    <v-btn icon color="#E60000" @click="changeStauts" v-if="!showStatusField && authFlagForEdit && !loadingUserData" >
                        <v-icon  color="#E60000">edit</v-icon>
                    </v-btn>

                    <div style="width: 300px;"  v-if="!(!showStatusField)">
                        <v-text-field
                                v-model="status"
                                :label="$t('personalProfile.header-data.Type your status')"
                                :rules="[v => v.length <= 25 || $t('personalProfile.header-data.Maximum 50 characters')]"
                                counter="25"
                                maxlength="25"
                                clearable
                                color="#E60000"
                        ></v-text-field>
                        <v-layout row wrap justify-space-between>
                            <v-btn small color="#E60000" text @click="showStatusField = false" style="font-weight: bold;    ">{{$t('profile.sliderProfile.Cancel')}}</v-btn>
                            <v-btn small color="#E60000" dark elevation="0" @click="saveStatus" style="font-weight: bold;    ">{{$t('profile.sliderProfile.Save')}}</v-btn>
                        </v-layout>
                    </div>
                </v-card-title>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    import userInfoMixin from "../userInfoMixin"
    export default {
        name: "header-data",
        mixins:[userInfoMixin],
        data:()=>{
            return{
                loadingUserData: true,
                status:"",
                showStatusField: false,
                statusEdit: '',
            }
        },
        computed:{
            getUserData(){
                this.loadingUserData = true;
                return this.$store.getters.getUserData;
            },
        },
        watch:{
            getUserData(data){
                this.loadingUserData = true;
                if(data) {
                    this.loadingUserData = false;
                    this.status = data.status
                }
            }
        },
        methods:{
            changeStauts(){
                this.statusEdit = this.status;
                this.showStatusField = true
            },
            saveStatus(){

                this.$store.commit('setClearAppMsgs');
                if(this.status !=='') {
                    this.$store.dispatch('saveStatus', {
                        slug: this.$route.params.id,
                        status: this.status,
                        lang: this.$i18n.locale

                    });
                    this.showStatusField = false

                }else {
                    // this.$store.commit('setAppMsgs', {
                    //     msg:"Please Fill all inputs!",
                    //     color: "info",
                    //     icon: "info"
                    // })
                }
            }
        }
    }
</script>

<style scoped>
    >>>.image-circle{
        border: 10px solid #E60000;
        border-radius: 50%;
    }
    >>>.company-image{
        border-radius: 50%;
    }
    >>>.list-business-now{
        color: white;
        background-color: #E60000;
        padding: 5px;
        border-radius: 0 0 10px 10px;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 2;

    }
    >>>.status-content{
        padding-bottom:0;
        justify-content: center;
        padding-top: 0;
        margin-top: 10px;
    }
    >>>.v-skeleton-loader__card-heading .v-skeleton-loader__heading {
        margin: auto;
    }
    >>>.v-skeleton-loader__heading {
        border-radius: 12px;
        height: 24px;
        width: 80%;
    }
    >>>.v-skeleton-loader__avatar {
        border-radius: 50%;
        height: 130px;
        width: 130px;
    }
</style>

