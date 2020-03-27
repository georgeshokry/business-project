<template>
    <v-container fluid grid-list-md style="width: 75%;padding-top: 0px;padding-bottom: 0;" class="full-width-mobile">

        <v-layout row wrap style="justify-content: center">


            <v-flex d-flex xl2 lg4 xs12  style="background-color: #ffffff; padding: 0;">
                <v-layout column wrap>
                <v-card flat height="395"  width="97%" elevation="0" color="#b11616" style="border-radius: 0;    margin-left: auto;margin-right: auto;" >
                    <div class="view-counter-indv" v-if="userInfo !== ''">
                        <v-icon size="20" color="white" style="margin-right: 3px;margin-left: 3px;">visibility</v-icon><span>{{$t('profile.about.Views')}}</span> <span style="font-weight: bold;">{{userInfo.viewers > 90 ? '90+' : userInfo.viewers}}</span>
                    </div>
                    <v-card-title style=" justify-content: center;padding-bottom: 0;">

                        <div style="color: white;  font-size: smaller;" v-if="userInfo !== ''">{{userInfo.business_category}}</div>
                        <v-skeleton-loader
                                dark
                                v-else
                                type="text"
                                class="ma-2"
                                width="130"
                        ></v-skeleton-loader>
                    </v-card-title>
                    <v-card-title style=" justify-content: center; padding-top: 0">
                        <v-skeleton-loader
                                dark
                                v-if="!userInfo.business_logo"
                                type="avatar"

                        ></v-skeleton-loader>
                        <v-card  color="white" elevation="1" width="90" height="90" class="ind-image" v-else>

                        <v-img

                            height="100%"
                            aspect-ratio="1.7"
                            :src="'/images/med/' + userInfo.business_logo"
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
                    </v-card-title>
                    <v-card-title class="headline font-weight-bold" style="text-transform:capitalize;  padding-bottom:0; justify-content: center; padding-top: 0; color: white" v-if="userInfo !== ''">
                        {{userInfo.name}}
                    </v-card-title>
                    <v-card-title style=" justify-content: center;" class="pa-0" v-else>
                    <v-skeleton-loader
                            type="card-heading"
                            class="mb-3"
                            width="190"
                            dark
                            style="background: transparent !important;"
                    ></v-skeleton-loader>
                    </v-card-title>
<!--                    <v-card-title class="headline" style="justify-content: center;padding-top: 0px;color: white;font-weight: 100;padding-bottom: 0px;" v-if="userInfo !== ''">-->
<!--                        <div style="font-size: medium;font-weight: 400;">Trading, Importing, Exporting</div>-->
<!--                    </v-card-title>-->
<!--                    <v-card-title style=" justify-content: center;" class="pa-0" v-if="userInfo === ''">-->
<!--                    <v-skeleton-loader-->
<!--                            dark-->
<!--                            type="text"-->
<!--                            class="ma-2"-->
<!--                            width="100"-->
<!--                    ></v-skeleton-loader>-->
<!--                    </v-card-title>-->
                    <v-card-title  class="location-sec" v-if="userInfo !== ''">
                        <img width="16" src="./resources/Location_White.svg" style="margin-right: 5px;">  {{userInfo.primary_country}}
                    </v-card-title>
                        <v-card-title style=" justify-content: center;" class="pa-0" v-if="userInfo === ''">
                    <v-skeleton-loader
                            dark
                            type="text"
                            class="ma-2"
                            width="70"
                    ></v-skeleton-loader>
                        </v-card-title>
                    <v-card-title style=" justify-content: center;color: white;font-weight: 500;font-size: small;">
                        <v-layout row justify-center align-center>
                            <v-flex d-flex lg8 justify-center align-center v-if="userInfo.recommended !==null && userInfo !==''">
                                {{$t('profile.about.Recommended By')}} {{userInfo.recommended}} {{$t('profile.about.Business')}}
                            </v-flex>
<!--                            <v-flex d-flex lg8 justify-center align-center v-if="authFlagForEdit">-->
<!--                        <div @click="viewMyPublicProfile"  style="text-decoration-line: underline;cursor: pointer;">Preview your public profile</div>-->
<!--                            </v-flex>-->
                            <v-flex d-flex lg8 justify-center align-center v-if="userLoggedin && !authFlagForEdit">
                        <v-btn style="color:white" small text  @click="openEditReportDialogNow" >
                            <img class="report-btn" width="20" src="./resources/Report_White.svg">{{$t('profile.about.report')}}
                        </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
<!--                    <v-card-title style=" justify-content: center; padding-top: 0; color: white; font-weight: 100;">-->

<!--                    </v-card-title>-->
                    <hr style="border-top: 4px solid #b11616;">

                </v-card>
                <left-column style="position: sticky;top: 0;width: 100%" class="more-btn-menu"></left-column>
                </v-layout>
            </v-flex>
        <v-flex d-flex xl5 lg8 xs12 >
            <v-layout row wrap>
            <slider-profile style="width: 100%;"></slider-profile>

                <v-card width="100%" class="card--flex-toolbar padding-nav" style="background-color: #f1f1f1">
                    <v-toolbar absolute v-scroll="onScroll" :class="[headerDownUp ? 'down' : 'up']"  fixed height="90" style="position: sticky; background-color: #f1f1f1" elevation="1" >

                        <v-flex d-flex lg5 xs10 style="justify-content: center; text-align: center" >
                        <v-layout row wrap >
                            <v-chip outlined :href="'tel:' + userInfo.business_tele" small class="ma-1" v-if="userInfo.pivatenumber !== 1 && userInfo!==''" style="direction: ltr">
                                <v-icon style="margin-left: 3px;margin-right: 3px" color="#E60000">phone</v-icon>
                                {{userInfo.business_tele}}
                            </v-chip>
                            <v-chip outlined :href="'mailto:' + userInfo.business_email" small class="ma-1" style="direction: ltr">
                                <img width="15" style="margin-right: 8px; margin-left: 8px;" src="./resources/Email_Red.svg" />
                                {{userInfo.business_email}}
                            </v-chip>
                        </v-layout>
                        </v-flex>
                        <v-flex d-flex lg8 xs10 >
                            <v-layout row wrap>
                            <v-layout row wrap style="padding: 5px;width:100%">
                                <v-btn
                                        elevation="0"
                                        v-if="userLoggedin && !authFlagForEdit"
                                        class="more-btn-menu"
                                        small
                                        color="#E60000"

                                        style=" color: white;border-radius: 10px 10px 10px 10px ; "
                                        @click="openBookasDialogNow"
                                >
                                    {{$t('profile.about.Bookmark')}} <img style="margin-left:3px;margin-right:3px;" width="20" src="./resources/Bookmark_White.svg">
                                </v-btn>
                                <v-btn
                                        elevation="0"
                                        v-if="authFlagForEdit"
                                        style="color:white;border-radius: 10px 10px 10px 10px ;"
                                        class="more-btn-menu"
                                        small
                                        color="#E60000"

                                        @click="routeToSettings"
                                >
                                    {{$t('profile.about.Settings')}} <img style="margin-left:3px;margin-right:3px;"  width="20" src="./resources/Settings_White.svg">
                                </v-btn>
                            <v-spacer ></v-spacer>
                            <v-btn
                                    v-if="userLoggedin"
                                class="more-btn-menu"
                                small
                                color="#E60000"
                                style=" color: white; border-radius: 10px 10px 10px 10px ; "
                                elevation="0"
                                @click="routeToInbox"
                            >
                                {{$t('profile.about.Inbox')}} <img style="margin-left:3px;margin-right:3px;"  width="20" src="./resources/Inbox_White.svg">
                            </v-btn>
                            <v-spacer ></v-spacer>
                                <v-menu

                                        :close-on-content-click="false"
                                        :nudge-width="150"
                                        offset-y
                                        z-index="30"
                                        :nudge-left="150"
                                >
                                    <template v-slot:activator="{ on }">
                            <v-btn
                                class="more-btn-menu"
                                small
                                elevation="0"
                                color="#E60000"
                                style=" color: white; border-radius: 10px 10px 10px 10px ; "
                                v-on="on"
                            >
                                {{$t('profile.about.share')}} <v-icon color="white">share</v-icon>
                            </v-btn>
                                    </template>
                                    <share-menu style="border-bottom: 2px solid rgb(230, 0, 0);"></share-menu>
                                </v-menu>
                            </v-layout>
                            <v-layout class="more-btn-menu" row wrap justify-space-between v-if="userInfo !==''">
                                <v-btn
                                        v-if="userInfo.facebook !== ''"
                                        style="margin: 5px"
                                        elevation="0"
                                        fab
                                        dark
                                        x-small
                                        color="#E60000"

                                        :href="'https://www.facebook.com/'+ userInfo.facebook"
                                        target="_blank"
                                >
                                    <v-icon>mdi-facebook</v-icon>
                                </v-btn>
                                <v-btn
                                        v-if="userInfo.twitter !== ''"
                                        style="margin: 5px"
                                        elevation="0"
                                        fab
                                        dark
                                        x-small
                                        color="#E60000"
                                        :href="'https://www.twitter.com/'+ userInfo.twitter"
                                        target="_blank"
                                >
                                    <v-icon>mdi-twitter</v-icon>
                                </v-btn>
                                <v-btn
                                        v-if="userInfo.behance !== ''"
                                        style="margin: 5px"
                                        elevation="0"
                                        fab
                                        dark
                                        x-small
                                        color="#E60000"
                                        :href="'https://www.behance.net/'+ userInfo.behance"
                                        target="_blank"
                                >
                                    <v-icon>mdi-behance</v-icon>
                                </v-btn>
                                <v-btn
                                        v-if="userInfo.instgram !== ''"
                                        style="margin: 5px"
                                        elevation="0"
                                        fab
                                        dark
                                        x-small
                                        color="#E60000"
                                        :href="'https://www.instagram.com/'+ userInfo.instgram"
                                        target="_blank"
                                >
                                    <v-icon>mdi-instagram</v-icon>
                                </v-btn>
                                <v-btn
                                        v-if="userInfo.linkdin !== ''"
                                        style="margin: 5px"
                                        elevation="0"
                                        fab
                                        dark
                                        x-small
                                        color="#E60000"
                                        :href="'https://www.linkedin.com/'+ userInfo.linkdin"
                                        target="_blank"
                                >
                                    <v-icon>mdi-linkedin-box</v-icon>
                                </v-btn>
                            </v-layout>
                            </v-layout>
                            <v-btn
                                    color="#E60000"
                                    class="more-btns"
                                    icon
                                    @click="overlayRightColumn = true"
                            >
                                <v-icon color="#E60000">perm_contact_calendar</v-icon>
                            </v-btn>

                            <v-dialog v-model="overlayRightColumn">
                                <v-card flat >
                                    <v-layout row wrap justify-center class="pa-2">
                                        <v-btn
                                                v-if="userLoggedin && !authFlagForEdit"
                                                fab
                                                dark
                                                x-small
                                                elevation="0"
                                                color="#E60000"
                                                @click="openBookasDialogNow"
                                        >
                                             <img style="margin-left:3px" width="20" src="./resources/Bookmark_White.svg">
                                        </v-btn>
                                        <v-btn
                                                elevation="0"
                                                v-if="authFlagForEdit"
                                                style="color:white"
                                                dark
                                                fab
                                                x-small
                                                color="#E60000"

                                                @click="routeToSettings"
                                        >
                                             <img  width="20" src="./resources/Settings_White.svg">
                                        </v-btn>
                                        <v-divider dark vertical class="ma-3"></v-divider>
                                        <v-btn
                                                v-if="userLoggedin"
                                                fab
                                                dark
                                                x-small
                                                color="#E60000"
                                                elevation="0"
                                                @click="routeToInbox"
                                        >
                                            <img style="margin-left:3px"  width="20" src="./resources/Inbox_White.svg">
                                        </v-btn>
                                        <v-divider dark vertical class="ma-3"></v-divider>
                                        <v-btn
                                                elevation="0"
                                                fab
                                                x-small
                                                color="#E60000"
                                                @click="menuShare = true"

                                        >
                                            <img  width="20" src="./resources/Share_White.svg">
                                        </v-btn>

                                        <v-dialog
                                                v-model="menuShare"
                                        >
                                            <share-menu style="border-bottom: 2px solid rgb(230, 0, 0);"></share-menu>
                                        </v-dialog>
                                    </v-layout>
                                    <v-layout row wrap justify-center>
                                        <v-btn
                                                v-if="userInfo.facebook !== ''"
                                                style="margin: 5px"
                                                elevation="0"
                                                fab
                                                dark
                                                x-small
                                                color="#E60000"

                                                :href="'https://www.facebook.com/'+ userInfo.facebook"
                                                target="_blank"
                                        >
                                            <v-icon>mdi-facebook</v-icon>
                                        </v-btn>
                                        <v-btn
                                                v-if="userInfo.twitter !== ''"
                                                style="margin: 5px"
                                                elevation="0"
                                                fab
                                                dark
                                                x-small
                                                color="#E60000"
                                                :href="'https://www.twitter.com/'+ userInfo.twitter"
                                                target="_blank"
                                        >
                                            <v-icon>mdi-twitter</v-icon>
                                        </v-btn>
                                        <v-btn
                                                v-if="userInfo.behance !== ''"
                                                style="margin: 5px"
                                                elevation="0"
                                                fab
                                                dark
                                                x-small
                                                color="#E60000"
                                                :href="'https://www.behance.net/'+ userInfo.behance"
                                                target="_blank"
                                        >
                                            <v-icon>mdi-behance</v-icon>
                                        </v-btn>
                                        <v-btn
                                                v-if="userInfo.instgram !== ''"
                                                style="margin: 5px"
                                                elevation="0"
                                                fab
                                                dark
                                                x-small
                                                color="#E60000"
                                                :href="'https://www.instagram.com/'+ userInfo.instgram"
                                                target="_blank"
                                        >
                                            <v-icon>mdi-instagram</v-icon>
                                        </v-btn>
                                        <v-btn
                                                v-if="userInfo.linkdin !== ''"
                                                style="margin: 5px"
                                                elevation="0"
                                                fab
                                                dark
                                                x-small
                                                color="#E60000"
                                                :href="'https://www.linkedin.com/'+ userInfo.linkdin"
                                                target="_blank"
                                        >
                                            <v-icon>mdi-linkedin-box</v-icon>
                                        </v-btn>
                                    </v-layout>
                                    <left-column style="width: 100%"></left-column>
                                </v-card>
                            </v-dialog>

                        </v-flex>

                    </v-toolbar>

                    <v-card flat width="100%">
                        <bio ></bio>
                        <most-notable-work></most-notable-work>
                        <education></education>
                        <faqs></faqs>
                        <reviews id="reviews"></reviews>
                    </v-card>
                </v-card>



            </v-layout>
        </v-flex>
        </v-layout>
        <new-msg-dialog :newMsgDialog="newMsgDialog" @closeNewMsgDialog="closeNewMsgDialog"></new-msg-dialog>
        <bookmark-as-dialog :bookmarkAsDialog="openBookAs" @closeBookasDialogNow="closeBookasDialogNow" :title="dialogTitle"></bookmark-as-dialog>
        <report-ticket-dialog :editReportDialog="EditReportDialog" @closeEditReportDialog="closeEditReportDialog"></report-ticket-dialog>
    </v-container>

</template>

<script>
    import sliderProfile from "./profile/sliderProfile";
    import Bio from "./individualProfile/bio";
    import Faqs from "./profile/faqs";
    import MostNotableWork from "./individualProfile/mostNotableWork";
    import Education from "./individualProfile/education";
    import Reviews from "./profile/reviews";
    import LeftColumn from "./individualProfile/leftColumn";
    import userInfoMixin from "./userInfoMixin";
    import newMsgDialog from "../components/inbox/newMsgDialog";
    import bookmarkAsDialog from "../components/bookmark-component/bookmarkAsDialog";
    import reportTicketDialog from "../components/report-component/reportTicketDialog";
    import ShareMenu from "./profile/shareMenu";
    export default {
        name: "IndividualProfile",
        components:{
            ShareMenu,
            LeftColumn,
            Reviews,
            Education,
            MostNotableWork,
            Faqs,
            Bio,
            sliderProfile,
            newMsgDialog,
            bookmarkAsDialog,
            reportTicketDialog

        },
        mixins:[userInfoMixin],
        data:()=>{
            return{
                overlayRightColumn: false,
                userLoggedin: false,

                EditReportDialog:false,
                openBookAs: false,
                dialogTitle: '',
                newMsgDialog: false,
                menuShare: false,

                valueNowInd: 0,
                headerDownUp: false,
            }
    },
        // beforeRouteUpdate (to, from, next) {
        //     let slug = localStorage.getItem('s');
        //     console.log(slug ,"SLUGGGGG")
        //     axios.post('/vue/checkcompleteprofile', slug)
        //         .then(function (response) {
        //             if(response.data === true) {
        //                 next(true);
        //             }else {
        //                 next({
        //                     name: 'personalRegisteration',
        //                     params: {
        //                         lang: to.params.lang,
        //                     }
        //                 });
        //             }
        //         })
        //         .catch(function (error) {
        //
        //         });
        // },
        created(){
            this.$store.dispatch('userData', {id:this.$route.params.id, lang:this.$i18n.locale});
            this.$store.dispatch('checkUserAuth', this.$route.params.id);
            this.$store.commit('setLoadingSignOut', false);
        },
        computed:{
            checkUserAuth(){
                return this.$store.getters.getAuthFlag;
            },
        },
        watch: {
            '$route'(from, to) {
                this.$store.dispatch('userData', {id:from.params.id, lang: from.params.lang});
                this.$store.dispatch('checkUserAuth', from.params.id);
            },
            checkUserAuth(flag){
                if(flag === true) {
                    this.userLoggedin=true;
                }else if (flag === false){
                    this.userLoggedin=true;
                }
                else if (flag === 'not_found'){
                    this.userLoggedin = false;
                }
            },
        },
        methods:{
            onScroll (e) {
                if (typeof window === 'undefined') return;
                const top = window.pageYOffset ||   e.target.scrollTop || 5;

                if(top < this.valueNowInd){
                    this.headerDownUp = true;
                }else if(top > this.valueNowInd){
                    this.headerDownUp = false;
                }
                this.valueNowInd = top;


            },
            routeToInbox(){
                if(this.authFlagForEdit === true) {
                    this.$router.push({
                        name: 'inbox',
                        params: {id: this.$route.params.id, lang: this.$route.params.lang}
                    });
                }else if(this.userLoggedin === true && this.authFlagForEdit !== true){
                    this.openNewMsgDialog();
                }
            },
            routeToSettings(){
                this.$router.push({name: 'settings', params: { id: this.$route.params.id, lang: this.$route.params.lang}});
            },
            viewMyPublicProfile(){
                this.$store.commit('setAuthFlagForEdit', null);
                this.$store.commit('setAuthFlagForEdit', false);
                this.backToProfile = true;
            },
            openRecommendDialogNow(){
                this.dialogTitle = 'Recommend';
                this.openBookAs= true;
            },
            closeNewMsgDialog(){
                this.newMsgDialog= false;
            },
            openBookasDialogNow(){
                this.dialogTitle = 'Bookmark';
                this.openBookAs= true;
            },
            closeBookasDialogNow(){
                this.openBookAs= false;
            },
            openNewMsgDialog(){
                this.newMsgDialog= true;
            },
            openEditReportDialogNow() {
                this.EditReportDialog = true;
            },
            closeEditReportDialog() {
                this.EditReportDialog = false;
            },
        }
    }
</script>

<style scoped>
    .view-counter-indv{
        background-color: red;
        width: 140px;
        z-index: 10;
        right: 220px;
        color: white;
        padding: 8px;
        border-radius: 0 0 15px 15px;
        margin: auto;
        text-align: center;
    }
    .ind-image{
        border-radius: 50% !important;
        border: 3px white solid;
    }
    .location-sec{
        justify-content: center;
        padding-top: 0;
        color: white;
        font-weight: 100;
        font-size: medium;
        padding-bottom: 0;
        text-align: initial;
        direction: ltr;
    }
    @media (max-width: 680px)  {
        .full-width-mobile {
            width:100% !important;
        }
    }
    .more-btns {
        display: none;

    }
    .more-btn-menu{
        display: inline-flex;
    }
    @media only screen and (max-width: 1200px) {
        .more-btns {
            display: block;

        }
        .more-btn-menu{
            display: none;
        }
    }


    .down{

        /*transform: translateY(55px);*/
        top: 55px;
    }
    .up{

        /*transform: translateY(0px);*/
        top: 0px;
    }
    >>>.v-skeleton-loader__avatar {
        border-radius: 50%;
        height: 90px;
        width: 90px;
    }
    >>>.theme--dark.v-skeleton-loader .v-skeleton-loader__card-heading{
        background: transparent !important;
    }
    >>>.v-skeleton-loader__heading {
        border-radius: 12px;
        height: 24px;
        width: 90%;
    }
    >>>.v-skeleton-loader__card-heading .v-skeleton-loader__heading {
        margin: auto;
    }
</style>
