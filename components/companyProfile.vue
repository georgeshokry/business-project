<template>
    <v-container fluid grid-list-md class="full-width-mobile" style="padding: 0" >
        <v-layout row wrap justify-content-center>
            <v-flex xl8 lg12 offset-xs0>
    <v-card flat>
        <v-flex class="view-counter" style="text-align: center" v-show="userInfo !== ''">
            <v-icon style="margin: 0 2px 0 2px" size="20" color="white">visibility</v-icon><span>{{$t('profile.about.Views')}}</span> <span style="font-weight: bold;">{{userInfo.viewers > 90 ? '90+' : userInfo.viewers}}</span>
        </v-flex>
        <v-toolbar
            color="#943028"
            dark
            extended
            flat
            height="fit-content"
            width="100%"
            class="pt-10"

            extension-height="0"
        >

            <v-container fluid grid-list-md offset-xs2>
                <v-layout row wrap >

                    <v-flex d-flex lg1 xs12 sm2 md2 class="center-image-mobile" >



                <v-card  color="white" elevation="1" width="90" height="75" class="company-image" style="border: 2px solid white;">
                    <v-img
                        height="100%"
                        aspect-ratio="1.7"
                        :src="'/images/med/'+userInfo.business_logo"
                    >
                        <template v-slot:placeholder>
                            <v-layout

                                    fill-height
                                    align-center
                                    justify-center
                                    ma-auto
                            >
                                <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
                            </v-layout>
                        </template>
                    </v-img>
                </v-card>
                </v-flex>
                <v-flex d-flex lg5 sm7 xs12 sm12 class="company-data skelton-center">
                    <div style="margin-top: 5px"  v-if="userInfo === ''">
                    <v-skeleton-loader
                            dark
                            type="text"
                            style="width: 140px;height: 15px;margin-bottom: 10px;"
                            class="skelton-center"
                    ></v-skeleton-loader>
                    <v-skeleton-loader
                            dark
                            type="text"
                            style="width: 100px; height: 15px;margin-bottom: 10px;"
                            class="skelton-center"
                    ></v-skeleton-loader>
                    <v-skeleton-loader
                            dark
                            type="text"
                            style="width: 130px;height: 15px;margin-bottom: 10px;"
                            class="skelton-center"
                    ></v-skeleton-loader>
                    </div>
                    <div class="company-header" v-else-if="userInfo !== ''">

                        <h1 class="font-22 font-weight-bold" style="text-transform: capitalize;">{{userInfo.name}}</h1>
                        <h6 style="text-align: initial;">{{userInfo.business_category}}</h6>
                        <div class="company-rating">
                            <v-icon small color="#E60000">star</v-icon> {{userInfo.products_rating}} ({{userInfo.products_total}} {{$t('profile.about.product rating')}})
                        </div>
                        <div  class="company-rating pt-3 ">
                            <v-layout row wrap  justify-space-between>
                            <v-flex d-flex  lg12 xs12 sm6 md6 class="small-screen-rec"  v-if="userInfo.recommended !== 0 && userInfo !==''">


                                <div>{{$t('profile.about.Recommended By')}}&nbsp;<span style="font-weight: bold">({{userInfo.recommended}})</span>&nbsp;{{$t('profile.about.Business')}} </div>
                            </v-flex>
                                <v-flex d-flex lg12 xs12 sm12 md12 class="small-screen-rec">
                                <div>
<!--                                    <div @click="viewMyPublicProfile" v-if="authFlagForEdit" style="text-decoration-line: underline;cursor: pointer;">Preview your public profile</div>-->
                                    <v-btn small text  @click="openRecommendDialogNow" v-if="userLoggedin && !authFlagForEdit">
                                        <v-icon size="23" color="#ff0000" left>add_circle</v-icon>{{$t('profile.about.Recommend')}}
                                    </v-btn>
                                    <v-btn small text  @click="openEditReportDialogNow" v-if="userLoggedin && !authFlagForEdit">
                                        <img alt="report" class="report-btn" width="20" src="./resources/Report_White.svg">{{$t('profile.about.report')}}
                                    </v-btn>
                                    <v-btn small text dark @click="showBC = true" class="more-btns" style="    margin: auto;">
                                        {{$t('profile.about.business contacts')}}
                                    </v-btn>
                                </div>

                                </v-flex>
                                <v-flex d-flex lg12 xs12 sm12 md12 class="small-screen-rec">
                                <v-btn
                                        elevation="0"
                                        v-if="userLoggedin && !authFlagForEdit"
                                        class="more-btns"
                                        small
                                        color="#ff0000"
                                        style=" color: white; width: 100%"
                                        @click="openBookasDialogNow"
                                >
                                    {{$t('profile.about.Bookmark')}} <img style="margin-left:3px" width="20" src="./resources/Bookmark_White.svg">
                                </v-btn>
                                </v-flex>
                            </v-layout>
                        </div>
                    </div>
                </v-flex>
                    </v-layout>
            </v-container>

        </v-toolbar>

        <v-layout row wrap>
            <v-flex d-flex lg12 xs12 md12 sm12 >
                <v-card tile width="100%" class="card--flex-toolbar padding-nav" style="background-color: #ffffff; ">
                    <v-toolbar height="50" v-scroll="onScroll" :class="[headerDownUp ? 'down' : 'up']" absolute fixed style="position: sticky; background-color: #f1f1f1;z-index:2;" elevation="3" >
                            <v-tabs
                                    show-arrows
                                class="padding-nav"
                                style="width: 75%;"
                                color="grey"
                                background-color="#f1f1f1"
                                    hide-slider
                            >
                                <v-tabs-slider color="#f1f1f1"></v-tabs-slider>
                                <v-tab
                                    dark
                                    @click="$vuetify.goTo('#about')"
                                    style="color: #E60000;"
                                >
                                    {{$t('profile.about.about')}}
                                </v-tab>
                                <v-divider
                                    class="mx-0"
                                    vertical
                                ></v-divider>
                                <v-tab
                                    @click="$vuetify.goTo('#products')"
                                    style="color: #E60000;"
                                >
                                    {{$t('profile.about.Products')}}
                                </v-tab>
                                <v-divider
                                    class="mx-0"
                                    vertical
                                ></v-divider>
                                <v-tab
                                        @click="$vuetify.goTo('#serv')"
                                        style="color: #E60000;"
                                >
                                    {{$t('profile.about.services')}}
                                </v-tab>
                                <v-divider
                                    class="mx-0"
                                    vertical
                                ></v-divider>
                                <v-tab
                                        @click="$vuetify.goTo('#reviews')"
                                        style="color: #E60000;"
                                >
                                    {{$t('profile.about.Reviews')}}
                                </v-tab>
                                <v-divider
                                    class="mx-0"
                                    vertical
                                ></v-divider>
                                <v-tab
                                        @click="$vuetify.goTo('#faq')"
                                        style="color: #E60000;"
                                >
                                    {{$t('profile.about.FAQs')}}
                                </v-tab>
                                <v-divider
                                    class="mx-0"
                                    vertical
                                ></v-divider>
                            </v-tabs>
                        <v-spacer ></v-spacer>
                        <v-layout style="margin-right: 20px;margin-left: 20px;">


                        <v-btn
                                elevation="0"
                                v-if="userLoggedin && !authFlagForEdit"
                                class="more-btn-menu"
                                small
                                color="#E60000"
                                style=" color: white;  border-radius: 10px 10px 10px 10px ;"
                                @click="openBookasDialogNow"
                        >
                            {{$t('profile.about.Bookmark')}} <img style="margin-left:3px" width="20" src="./resources/Bookmark_White.svg">
                        </v-btn>

                        <v-btn
                                v-if="authFlagForEdit"
                            class="more-btn-menu"
                            small
                            color="#E60000"
                            style=" color: white;  border-radius: 10px 10px 10px 10px ;"
                                :to="{name: 'settings', params: { id: this.$route.params.id, lang: this.$route.params.lang}}"

                                elevation="0"
                        >
                            {{$t('profile.about.Settings')}} <img style="margin-right: 3px;margin-left:3px" width="20" src="./resources/Settings_White.svg">
                        </v-btn>

                            <v-menu
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :nudge-width="150"
                                    offset-y
                                    z-index="30"
                                    :nudge-left="150"

                            >
                                <template v-slot:activator="{ on }">
                        <v-btn

                                elevation="0"
                            class="more-btn-menu"
                            small
                            color="#E60000"
                            style=" color: white;  border-radius: 10px 10px 10px 10px ;    margin-right: 4px;margin-left: 4px;"
                                v-on="on"
                        >
                            {{$t('profile.about.share')}} <img style="margin-right: 3px;margin-left:3px"  width="20" src="./resources/Share_White.svg">
                        </v-btn>
                                </template>
                            <share-menu style="border-bottom: 2px solid rgb(230, 0, 0);"></share-menu>
                            </v-menu>
                        <v-spacer class="pr-1"></v-spacer>
<!--                        inbox component for all inbox msgs-->
                        <v-btn
                                v-if="userLoggedin"
                                elevation="0"
                            class="more-btn-menu"
                            small
                            color="#E60000"
                            style=" color: white;  border-radius: 10px 10px 10px 10px ;"
                            @click="routeToInbox"
                        >
                            {{$t('profile.about.Inbox')}} <img style="margin-right: 3px;margin-left:3px"  width="20" src="./resources/Inbox_White.svg">
                        </v-btn>
<!--                        the button in mobile view to view buttons-->
                        </v-layout>

                                <v-btn
                                    class="more-btns"
                                    icon
                                    @click="overlayRightColumn = true"
                                    color="#E60000"
                                >
                                    <v-icon color="#E60000">perm_contact_calendar</v-icon>
                                </v-btn>

                        <v-dialog width="330" v-model="overlayRightColumn">
                            <v-card flat tile>
                                <v-layout row wrap justify-center class="pa-2">
                                    <v-btn
                                            v-if="userLoggedin"
                                            fab
                                            dark
                                            x-small
                                            elevation="0"
                                            color="#E60000"
                                            @click="routeToInbox"
                                    >
                                        <img style="margin-left:3px"  width="20" src="./resources/Inbox_White.svg">
                                    </v-btn>
                                    <v-divider dark vertical class="ma-3"></v-divider>
                                    <v-btn

                                            elevation="0"
                                            v-if="userLoggedin && !authFlagForEdit"
                                            fab x-small
                                            color="#E60000"
                                            @click="openBookasDialogNow"
                                    >
                                         <img  width="20" src="./resources/Bookmark_White.svg">
                                    </v-btn>

                                    <v-btn
                                            elevation="0"
                                            v-if="authFlagForEdit"

                                            fab x-small
                                            color="#E60000"
                                            :to="{name: 'settings', params: { id: this.$route.params.id, lang: this.$route.params.lang}}"

                                    >
                                         <img  width="20" src="./resources/Settings_White.svg">
                                    </v-btn>
                                    <v-divider dark vertical class="ma-3"></v-divider>



                                    <v-btn
                                            elevation="0"
                                            fab x-small
                                            color="#E60000"
                                            @click="menuOnMobile = true"

                                    >
                                        <img  width="20" src="./resources/Share_White.svg">
                                    </v-btn>

                                        <v-dialog
                                                v-model="menuOnMobile"
                                        >
                                            <share-menu style="border-bottom: 2px solid rgb(230, 0, 0);"></share-menu>
                                        </v-dialog>


                                </v-layout>
                                <contact-column/>
                            </v-card>

                        </v-dialog>

                    </v-toolbar>

                    <v-layout row wrap class="ma-0">
                        <v-flex  d-flex xs12 lg8 sm12 md12 >
                            <v-card width="100%" elevation="0" style="height: fit-content;" >
                                <slider-profile  />
                                <v-divider dark  ></v-divider>
                                <about id="about"/>
                                <v-divider dark ></v-divider>
                                <our-products-and-services id="products"/>
                                <v-divider dark ></v-divider>
                                <featured-products></featured-products>
                                <v-divider dark ></v-divider>
                                <services id="serv"/>
                                <v-divider dark ></v-divider>
                                <products id="prod"/>
                                <v-divider dark ></v-divider>
                                <key-figures  id="keyF"/>
                                <v-divider dark ></v-divider>
                                <faqs id="faq"/>
                                <v-divider dark ></v-divider>
                                <testimonials />
                                <v-divider dark ></v-divider>
                                <section id="reviews">
                                <reviews />
                                </section>
                            </v-card>
                        </v-flex>

                        <v-flex  d-flex xs12 lg4 sm4 md4 >
                                <contact-column class="more-btn-menu" />

                        </v-flex>
                    </v-layout>


                </v-card>
            </v-flex>

        </v-layout>
    </v-card>
            </v-flex>
            <v-dialog
                    v-model="showBC"
                    width="330"
                    scrollable
            >
                <v-card flat>
                    <v-card-title style="color:#E60000; justify-content: center;">
                        {{$t('profile.about.business contacts')}}
                    </v-card-title>
                <v-card-text>
                    <v-layout row wrap justify-center>
                        <div>
                            <strong>{{$t('profile.contactColumn.Address')}}</strong>
                        </div>
                        <div style="width: 160px;">
                            <span>{{userInfo.street}}</span>
                        </div>
                        <v-chip :href="'tel:' + userInfo.business_tele" outlined class="ma-1" v-if=" userInfo.pivatenumber !==1 " style="direction: ltr;">
                            <v-icon left  color="#E60000" style="margin: 3px">phone</v-icon>
                            {{userInfo.business_tele}}
                        </v-chip>

                        <v-chip outlined :href="'mailto:'+ userInfo.business_email" class="ma-1" style="direction: ltr;">
                            <img width="20" style="margin-right: 8px;margin-left: 8px;" src="/images/Email_Red.svg" />
                            {{userInfo.business_email}}
                        </v-chip>

                        <v-chip outlined class="ma-1" v-if="userInfo.website !== ''" style="direction: ltr;" :href="'http://'+userInfo.website" target="_blank">
                            <img width="20" style="margin-right: 8px;margin-left: 8px;" src="/images/Website_Red.svg" />
                            {{userInfo.website}}
                        </v-chip>
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
                </v-card-text>
                    <v-card-title class="pt-0" style="color:#E60000; justify-content: center;">
                        <v-btn text color="#E60000" @click="showBC = false">
                            {{$t('profile.contactColumn.close')}}
                        </v-btn>
                    </v-card-title>
                </v-card>
            </v-dialog>
            <new-msg-dialog :newMsgDialog="newMsgDialog" @closeNewMsgDialog="closeNewMsgDialog"></new-msg-dialog>
            <bookmark-as-dialog :bookmarkAsDialog="openBookAs" @closeBookasDialogNow="closeBookasDialogNow" :title="dialogTitle"></bookmark-as-dialog>
            <report-ticket-dialog :editReportDialog="EditReportDialog" @closeEditReportDialog="closeEditReportDialog"></report-ticket-dialog>
        </v-layout>
    </v-container>
</template>

<script>
    import sliderProfile from "./profile/sliderProfile";
    import about from "./profile/about";
    import OurProductsAndServices from "./profile/ourProductsAndServices";
    import Services from "./profile/services";
    import Products from "./profile/products";
    import KeyFigures from "./profile/keyFigures";
    import Reviews from "./profile/reviews";
    import Testimonials from "./profile/testimonials";
    import Faqs from "./profile/faqs";
    import ContactColumn from "./profile/contactColumn";
    import userInfoMixin from "./userInfoMixin";
    import FeaturedProducts from "./profile/featuredProducts";
    import ReportTicketDialog from "./report-component/reportTicketDialog";
    import BookmarkAsDialog from "./bookmark-component/bookmarkAsDialog";
    import NewMsgDialog from "./inbox/newMsgDialog";
    export default {

        name: "companyProfile",
        mixins: [userInfoMixin],
        components: {
            shareMenu: ()=> import('./profile/shareMenu'),
            about,
            OurProductsAndServices,
            ReportTicketDialog,
            FeaturedProducts,
            ContactColumn,
            Faqs,
            Testimonials,
            Reviews,
            KeyFigures,
            Products,
            Services,
            sliderProfile,
            NewMsgDialog,
            BookmarkAsDialog,

        },
        data: () => {
            return {
                backToProfile:false,
                overlayRightColumn: false,
                userId: '',
                userLang: "en",
                userLoggedin: false,
                userOwnerProfile: false,
                EditReportDialog:false,
                openBookAs: false,
                dialogTitle: '',

                newMsgDialog: false,

                showBC: false,

                headerDownUp: false,
                valueNow: 0,

                shareMenu: false,

                menu: false,
                menuOnMobile: false,

            }
        },
        mounted(){
            this.$store.dispatch('userData', {id:this.$route.params.id, lang:this.$i18n.locale});
            this.$store.dispatch('checkUserAuth', this.$route.params.id);
            this.$store.commit('setLoadingSignOut', false);
        //     console.log(this.$route.params.id);
        //     this.$store.dispatch('userData', this.$route.params.id);
        //     this.$store.dispatch('checkUserAuth', this.$route.params.id);
        },
        computed:{
            checkUserAuth(){
                return this.$store.getters.getAuthFlag;
            },
            getUserData(){
                return this.$store.getters.getUserData;
            },
            getLocalLang(){
                return this.$i18n.locale;
            }
        },
        watch:{
            '$route' (from, to){

                this.$store.dispatch('userData', {id:from.params.id, lang: from.params.lang});
                this.$store.dispatch('checkUserAuth', from.params.id);
            },
            getLocalLang(lang){
                // this.$store.dispatch('userData', {id:this.$route.params.id, lang: lang});
            },
            checkUserAuth(flag){
                if(flag === true) {
                    this.userOwnerProfile = true;

                    this.userLoggedin=true;
                }else if (flag === false){

                    this.userLoggedin=true;
                }
                else if (flag === 'not_found'){
                    this.userLoggedin = false;
                    this.userOwnerProfile=false;

                }
            },
            getUserData(data){
                if(data) {
                    this.userInfo = data;
                    this.userId = data.slug;

                }
            }
        },
        methods:{
            onScroll (e) {
                if (typeof window === 'undefined') return;
                const top = window.pageYOffset ||   e.target.scrollTop || 5;

                 if(top < this.valueNow){
                     this.headerDownUp = true;
                 }else if(top > this.valueNow){
                     this.headerDownUp = false;
                 }
                this.valueNow = top;


            },
            routeToInbox(){
                // this.$store.commit('setLoadingSignOut', true);
                if(this.authFlagForEdit === true) {
                    this.$router.push({
                        name: 'inbox',
                        params: {id: this.$route.params.id, lang: this.$route.params.lang}
                    });
                }else if(this.userLoggedin === true && this.authFlagForEdit !== true){
                    this.openNewMsgDialog();
                }
            },
            // routeToSettings(){
            //     this.$router.push({name: 'settings', params: { id: this.$route.params.id, lang: this.$route.params.lang}});
            // },
            toIndividual(){
                this.$router.push({name: 'individualProfile', params: { id: this.$route.params.id, lang: this.$route.params.lang}});
            },
            openEditReportDialogNow() {
                this.EditReportDialog = true;
            },
            closeEditReportDialog() {
                this.EditReportDialog = false;
            },
            openRecommendDialogNow(){
                this.dialogTitle = 'Recommend';
                this.openBookAs= true;
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
            closeNewMsgDialog(){
                this.newMsgDialog= false;
            },
            openShareMenu(){
                this.shareMenu = !this.shareMenu;
            },
            closeShareProfileMenu(){
                this.shareMenu = false;
            },
            viewMyPublicProfile(){
                this.$store.commit('setAuthFlagForEdit', null);
                this.$store.commit('setAuthFlagForEdit', false);
                this.backToProfile = true;
            },
            backToEditView(){
                this.$store.commit('setAuthFlagForEdit', null);
                this.$store.commit('setAuthFlagForEdit', true);
                this.backToProfile = false;
            },
            AddBoomark(id,slug)
            {
                  this.$store.commit('setClearAppMsgs');
                 this.$store.dispatch('AddBoomarkbusiness', {
                slug: this.$route.params.id,
                id: id,
                bookmarkedbusiness:slug,


                    });
            }
        },
    }
</script>

<style scoped>
    .view-counter{
        background-color: #E60000;
        width: 130px;
        position: absolute;
        z-index: 10;
        right: 25px;
        color: white;
        padding: 8px;
        border-radius: 0 0 15px 15px;
    }
    @media (max-width: 600px){
        .view-counter{
            right: 33%;
        }
    }
    @media (max-width: 350px){
        .view-counter{
            right: 30%;
        }
    }
.padding-nav{
    top: 0;
    border-radius: 10px 10px 0 0 ;
}
    .company-header{
        width: 100%;
        text-align: initial;
    }
    .company-image{
        border-radius: 7px;
    }
    .company-data{
        height: 145px;
    }
    .company-rating{
        font-size: smaller !important;
    }
    .carousel {
        background: #EEE;
    }

    .carousel-cell {
        width: 66%;
        height: 200px;
        margin-right: 10px;
        border-radius: 5px;
        counter-increment: carousel-cell;
        background-size: cover !important;
    }

    /* cell number */
    .carousel-cell:before {
        display: block;
        text-align: center;

        line-height: 200px;
        font-size: 80px;
        color: white;
    }

    .more-btns {
        display: none;

    }
    .more-btn-menu{
        display: flex;
    }
    @media only screen and (max-width: 1200px) {
        .more-btns {
            display: flex;

        }
        .more-btn-menu{
            display: none;
        }
    }
    .v-application--is-ltr .v-tabs-bar.v-tabs-bar--is-mobile:not(.v-tabs-bar--show-arrows)>.v-slide-group__wrapper>.v-tabs-bar__content>.v-tabs-slider-wrapper+.v-tab {
        margin-left: 0px;
    }

    @media (max-width: 600px) {
        .company-data{
            height: 210px;
            text-align: center !important;
            padding-left: 0px;
            padding-right: 0px;
            margin-left: 0px;
            margin-right: 0px;
        }

    }
    @media (max-width: 1300px) {
        .company-data{
            height: 210px;
            text-align: center !important;
            padding-left: 0px;
            padding-right: 0px;
            margin-left: 0px;
            margin-right: 0px;
        }

    }
    @media (max-width: 600px) {
        h6 {
            text-align: center !important;
        }
    }
    .report-btn{
        background-color: red;
        border-radius: 50%;
        padding: 2px;
        margin-right: 5px;
        margin-left: 5px;
    }
    @media (max-width: 600px) {
        .small-screen-rec{
            justify-content: center;
        }
        .skelton-center{
            justify-content: center;
            margin: auto auto 10px auto;
        }
    }

    .full-width-mobile{
        width: 75%;
    }
    @media (max-width: 800px) {
        .full-width-mobile{
            width: 100%;
        }
    }
    .center-image-mobile{

    }
    @media (max-width: 600px) {
        .center-image-mobile{
            justify-content: center;
        }
        .company-header{
            width: 100%;
            text-align: center;
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

</style>
