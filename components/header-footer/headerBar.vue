<template>

    <v-app-bar
            style="direction: ltr !important;    z-index: 11;   "
            color="white"
            app
            hide-on-scroll
            class="stickyAppbar"
            max-height="64px"

    >
        <router-link :to="{name: 'home', params:{lang: $i18n.locale}}">
            <v-toolbar-title >


                <v-img
                        :width="window.width > 390 ? 142 :  50"
                        class="logo-header"
                        alt="My Business logo"
                        :src="window.width > 390 ? '/images/headerLogo.png' : '/images/logoIcon.png'"
                >
                </v-img>


            </v-toolbar-title>
        </router-link>
        <v-divider
                class="mr-4 ml-4"
                vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <!--        ////the navigation buttons in desktop view-->
        <v-toolbar-items
                class="wide-screen-view"
                v-for="(item, h) in items"
                :key="h"
        >
            <v-btn text color="#e60000" style="font-weight: bold;" :to="{name: item.link, params:{lang: $i18n.locale}}">{{ $t('header-footer.headerBar.' + item.title) }}</v-btn>
        </v-toolbar-items>


        <v-btn small rounded style="    " elevation="0" width="70px" color="#e60000" class="ma-1" dark @click="loginPage('re')" v-if="headerProfile === '' && loadingAppBar === true">
            {{ $t('header-footer.headerBar.signup') }}
        </v-btn>
        <v-divider
                class="mt-2 mr-2 ml-2 wide-screen-view"
                vertical
                inset
                v-if="headerProfile === '' && loadingAppBar === true"
        ></v-divider>
        <!--        ////login routing button-->
        <v-btn small outlined style="    " rounded elevation="0" width="70px" class="ma-1" color="#e60000" dark @click="loginPage('lo')" v-if="headerProfile === '' && loadingAppBar === true">
            {{ $t('header-footer.headerBar.login') }}
        </v-btn>



        <v-card  flat style="background-color: #ffffff;height: 55px;" v-else-if="headerProfile !== '' && loadingAppBar === true" >
            <!--    /////notifications menu-->
            <v-layout style="max-height: 50px;">
                <v-divider
                        class="mt-5 mr-2 ml-2 wide-screen-view"
                        vertical
                        inset

                ></v-divider>
                <v-menu    eager offset-y nudge-left="290" max-height="300"  min-width="350"  style="z-index: 30;" >

                    <template v-slot:activator="{ on }" >
                        <v-toolbar-items  style="cursor: pointer;background-color: white" v-on="on" @click="reMoment()">
                            <v-list-item  class="ma-1 pa-0 " style="background-color: rgb(255,255,255);" >
                                <v-list-item size="35" color=" mr-0 ml-0 " >
                                    <v-badge
                                            v-model="showNotBadge"
                                            color="#7e2922"
                                            overlap
                                            class="align-self-center"
                                            style="z-index: 20;"
                                    >
                                        <template v-slot:badge>
                                            <span v-if="numberNotifUnread > 0" style="font-weight: bold;">{{numberNotifUnread}}</span>
                                        </template>
                                        <v-icon
                                                color="#E60000"
                                        >
                                            notifications
                                        </v-icon>
                                    </v-badge>
                                </v-list-item>
                                <!--                        <v-icon color="#E60000">arrow_drop_down</v-icon>-->
                            </v-list-item>

                        </v-toolbar-items>
                    </template>

                    <v-sheet color="white"  height="300px" width="350px" >
                        <!--                <v-subheader-->
                        <!--                        style="height: 25px;color:#E60000"-->
                        <!--                >-->
                        <!--                    <img  style="margin-right: 5px" width="15" src="/images/Inbox_Red.svg"> Inbox-->
                        <!--                </v-subheader>-->
                        <!--                <v-divider class="ma-0" light></v-divider>-->



                        <v-subheader
                                class="notif-header "
                        >
                            <div>
                                <v-icon style="margin-right: 5px" size="15" color="#E60000">notifications</v-icon>
                                <span style="color: #E60000;">{{$t('header-footer.headerBar.Notifications')}}</span>
                            </div>
                            <div v-if="numberNotifUnread > 0">
                                <span style="color: #E60000;"></span>
                            </div>
                        </v-subheader>
                        <v-divider class="ma-0" light></v-divider>


                        <!--                section for msgs only-->
                        <div>
                            <v-list-item
                                    v-for="(item, l) in notMsgStandred"
                                    ripple
                                    @click="openReadInbox(item.receiver_slug, item.type)"
                                    style="padding-left: 5px;"
                                    :class="[counterMsgStandred > 0 ? 'not-opened' : counterMsgStandred === 0 ? 'opened' : '']"
                                    :key="l"
                            >

                                <v-list-item-avatar size="35" style="margin-right: 15px;margin-left: 7px;"    >
                                    <v-icon size="30" color="#E60000">chat</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title style="color: #E60000;font-weight: bold">{{counterMsgStandred}} New Message</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action style="margin-left: 5px">
                                    <img width="40" height="40" :src="'/images/med/'+item.logo">
                                </v-list-item-action>
                            </v-list-item>
                        </div>
                        <div>
                            <v-list-item
                                    v-for="(item, o) in notMsgBusiness"
                                    ripple
                                    @click="openReadInbox(item.receiver_slug, item.type)"
                                    style="padding-left: 5px;"
                                    :class="[counterMsgBusiness > 0 ? 'not-opened' : counterMsgBusiness === 0 ? 'opened' : '']"
                                    :key="o"
                            >

                                <v-list-item-avatar size="35" style="margin-right: 15px;margin-left: 7px;"      >
                                    <v-icon size="30" color="#E60000">chat</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content style="text-align: initial;">
                                    <v-list-item-title style="color: #E60000;font-weight: bold">{{counterMsgBusiness}} &nbsp; {{$t("header-footer.headerBar.New Message")}}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action style="margin-left: 5px">
                                    <img width="40" height="40" :src="'/images/med/'+item.logo">
                                </v-list-item-action>
                            </v-list-item>
                        </div>
                        <v-divider class="ma-0" light color="#E60000"></v-divider>
                        <!--                //////////////////////////////////////////////////////-->




                        <!--                section for reset of notif-->

                        <!--                <img width="50" height="50" :src="item.notifier_logo">-->
                        <v-list-item
                                v-for="(item, index) in notif.slice().reverse()"
                                :key="index"
                                ripple
                                @click="goToNotif(item.notify_id, item.business_slug, item.NotificationId, item.opened)"
                                style="background-color: white;padding-left: 5px;padding-right: 5px;height: 90px;"
                                :class="[item.opened === 0 ? 'not-opened' : item.opened === 1 ? 'opened' : '']"
                        >

                            <v-list-item-avatar size="50" style="margin-right: 5px;margin-left: 7px;" >
                                <!--                        <v-badge-->
                                <!--                                color="#E60000"-->
                                <!--                                overlap-->
                                <!--                                bottom-->
                                <!--                                class="align-self-center"-->
                                <!--                        >-->
                                <!--                            <template v-slot:badge>-->
                                <!--                                <v-icon-->
                                <!--                                        color="white"-->
                                <!--                                        v-if="item.notify_id === 1"-->
                                <!--                                        size="20"-->
                                <!--                                >-->
                                <!--                                    add_circle-->
                                <!--                                </v-icon>-->
                                <!--                                <v-icon-->
                                <!--                                        color="white"-->
                                <!--                                        v-else-if="item.notify_id === 2"-->
                                <!--                                        size="20"-->
                                <!--                                >-->
                                <!--                                    rate_review-->
                                <!--                                </v-icon>-->
                                <!--                                <v-icon-->
                                <!--                                        color="white"-->
                                <!--                                        v-else-if="item.notify_id === 3"-->
                                <!--                                        size="20"-->
                                <!--                                >-->
                                <!--                                    star-->
                                <!--                                </v-icon>-->
                                <!--                            </template>-->

                                <v-img eager  style="border-radius: 50%;border: 2px solid #E60000;" width="50" height="50" :src="'/images/med/'+item.notifier_logo"></v-img>
                                <!--                        </v-badge>-->
                            </v-list-item-avatar>
                            <v-list-item-content style="padding-left: 3px;text-align: initial;">
                                <v-list-item-title style="color: #E60000;font-weight: bold" v-if="item.notifier_name">{{item.notifier_name}}</v-list-item-title>
                                <v-list-item-title>
                                    <v-icon
                                            color="#E60000"
                                            v-if="item.notify_id === 1"
                                            size="20"
                                    >
                                        add_circle
                                    </v-icon>
                                    <v-icon
                                            color="#E60000"
                                            v-else-if="item.notify_id === 2"
                                            size="20"
                                    >
                                        rate_review
                                    </v-icon>
                                    <v-icon
                                            color="#E60000"
                                            v-else-if="item.notify_id === 3"
                                            size="20"
                                    >
                                        star
                                    </v-icon>
                                    {{item.notify_id === 1 ? $t("header-footer.headerBar.Recommended you") : item.notify_id === 2 ? $t("header-footer.headerBar.Add New Review") : item.notify_id === 3 ? $t("header-footer.headerBar.Rate Product") : '' }}</v-list-item-title>
                                <v-list-item-subtitle style="color: #E60000;" v-if="item.content">"{{item.content}}"</v-list-item-subtitle>
                                <v-list-item-subtitle><v-icon  size="21">access_time</v-icon>{{ item.created_at | momentFilter }}</v-list-item-subtitle>


                            </v-list-item-content>
                            <v-list-item-action style="margin-left: 5px">
                                <img width="40" height="40" style="object-fit: cover;" :src="'/images/med/'+item.business_logo">
                            </v-list-item-action>

                        </v-list-item>

                        <v-divider class="ma-0" color="white" v-intersect="onIntersect"></v-divider>
                        <v-subheader class="pa-0" v-if="loadingNotfi === true">
                            <v-layout
                                    style="background-color: white"
                                    fill-height
                                    align-center
                                    justify-center

                            >
                                <v-progress-circular :width="3" :size="18"  indeterminate color="#E60000"></v-progress-circular>
                            </v-layout>
                        </v-subheader>
                        <v-subheader class="pa-0" v-else-if="noMore === true" style="background-color: white">
                            <v-list-item-subtitle  color="grey" style="text-align: center;">
                                {{$t('header-footer.headerBar.No More Notifications')}}
                            </v-list-item-subtitle>
                        </v-subheader>
                        <v-layout
                                v-else-if="noFirstTime"
                                column
                                align-center
                                justify-center
                                style="color: grey;background-color: white"
                                mt-3

                        >
                            <v-img width="50" height="100" alt="notifications-bell" style="filter: invert(70%);" src="/images/noti_bell.png"></v-img>
                            <v-list-item-subtitle  color="grey" style="text-align: center;">
                                {{ $t('header-footer.headerBar.No First Notifications') }}
                            </v-list-item-subtitle>
                        </v-layout>

                    </v-sheet>
                </v-menu>

                <!--        /////starting of profiles menu-->
                <v-menu min-width="200" offset-y style="z-index: 30;" v-if="headerProfile !==''">
                    <template v-slot:activator="{ on }">
                        <v-toolbar-items color="#E60000" style="cursor: pointer;background-color: white" v-on="on">

                            <v-list-item
                                    color="#E60000"
                                    class="ma-1 pa-0 mr-3"
                                    style="background-color: rgb(255,255,255);"
                            >
                                <v-list-item-avatar size="35" color="mr-0 ml-0 " >
                                    <v-img
                                            style="border: 1px solid rgba(230, 0, 0, 0.48)"
                                            v-if="headerProfile.pic !== null"
                                            class="elevation-0"
                                            :src="'/images/med/' + headerProfile.pic"
                                    ></v-img>
                                    <v-img
                                            style="border: 1px solid rgba(230, 0, 0, 0.48)"
                                            v-else
                                            class="elevation-0"
                                            src="/images/imagePlaceholder.png"
                                    >
                                    </v-img>
                                    <!--                        <v-list-item-content>-->
                                    <!--                            <v-list-item-title>{{headerProfile.name | capitalize}}</v-list-item-title>-->
                                    <!--                        </v-list-item-content>-->
                                </v-list-item-avatar>
                                <!--                        <v-icon color="#E60000">arrow_drop_down</v-icon>-->
                            </v-list-item>

                        </v-toolbar-items>
                    </template>
                    <v-sheet style="max-height: 200px;">
                        <v-list
                                class="pa-0"
                                v-for="(item, index) in profiles"
                                :key="index"
                        >
                            <v-list-item
                                    style="text-align: start;"
                                    :ripple="{ class: 'red--text' }"
                                    :to="{name:  item.profile_type === 'company' ? 'companyProfile' : item.profile_type === 'individual' ? 'individualProfile' : '', params:{lang: $i18n.locale, id: item.slug}}"
                            >

                                <v-list-item-avatar size="25" color=" mr-2">
                                    <v-img
                                            v-if="item.pic"
                                            class="elevation-3"
                                            :src="'/images/med/' + item.pic"
                                    ></v-img>
                                    <v-img
                                            v-else
                                            class="elevation-3"
                                            src="/images/imagePlaceholder.png"
                                    >
                                    </v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title style="text-transform: capitalize;">{{item.name}}</v-list-item-title>
                                </v-list-item-content>

                            </v-list-item>
                        </v-list>
                        <v-divider class="ma-0"></v-divider>
                        <v-list style="background-color: #ffffff;border-bottom: 2px #E60000 solid;padding: 0;">
                            <v-list-item
                                    :ripple="{ class: 'red--text' }"
                                    style="text-align: center;"
                                    v-if="disableMyProfile"
                                    :to="{name: 'personalProfile', params:{lang: $i18n.locale, id: headerProfile.slug}}"
                            >

                                <v-list-item-title style="color: #E60000">
                                    <v-list-item-avatar size="30" color=" mr-2" style="margin-left: 0px;">
                                        <v-img
                                                v-if="headerProfile.pic !== null"
                                                class="elevation-3"
                                                :src="'/images/med/'+headerProfile.pic"
                                        ></v-img>
                                        <v-img
                                                v-else
                                                class="elevation-3"
                                                src="/images/imagePlaceholder.png"
                                        >
                                        </v-img>
                                    </v-list-item-avatar> {{ $t('header-footer.headerBar.MyProfile') }}
                                </v-list-item-title>
                            </v-list-item>
                            <v-divider class="ma-0"></v-divider>
                            <v-list-item
                                    style="text-align: center;"
                                    @click="logOutUser"
                            >
                                <v-list-item-title style="font-weight: bold;">
                                    {{ $t('header-footer.headerBar.logout') }}
                                    <v-icon size="20" color="#e60000">
                                        exit_to_app
                                    </v-icon>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>

                    </v-sheet>
                </v-menu>
            </v-layout>
        </v-card>


        <!--        menu for translations-->
        <v-menu offset-y style="z-index: 30" >

            <template v-slot:activator="{ on }">
                <v-btn
                        small
                        icon
                        v-on="on"
                        color="#e60000"
                        style="margin-left: 10px;"
                >
                    <v-icon>public</v-icon>
                </v-btn>
            </template>

            <v-list style="text-align: center;border-bottom: 2px #E60000 solid">
                <v-list-item
                        :ripple="{ class: 'red--text' }"
                        color="#e60000"
                        v-for="(item, i) in locales"
                        :key="i"
                        @click="changeAppLang(item.type)"
                        :to="{params:{lang: item.type}}"
                >
                    <v-list-item-title>
                        {{item.title}}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <!--        //////menu in mobile view only-->
        <v-menu offset-y style="z-index: 30;" >
            <template v-slot:activator="{ on }">
                <v-btn
                        style="    margin: 1px;"
                        small
                        class="mobile-view"
                        icon
                        v-on="on"
                        color="#e60000"
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list >
                <v-list-item
                        color="#e60000"
                        v-for="(li, i) in items"
                        :key="i"
                        :to="{name: li.link, params:{lang: $i18n.locale}}"
                >
                    <v-list-item-title color="#e60000" style="text-align: initial;">{{ $t('header-footer.headerBar.' + li.title) }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>


</template>
<script>
    // import { isIOS } from 'mobile-device-detect';
    import moment from 'moment';
    const sound =  new Audio('/images/notif_sound.mp3');
    export default {
        name: "headerBar",
        data:()=>{
            return{
                loadingAppBar: false,
                items: [
                    { title: 'pricinglink' , link: 'pricing'},
                    // { title: 'ourserviceslink', link: 'no'},
                    { title: 'businessbooklink' , link: 'businessDirectory' },
                    { title: 'helpLink' , link: 'helpCenter' },
                ],
                locales:[
                    { title: 'العربية' , type: 'ar'},
                    { title: 'English', type: 'en'},
                    // { title: 'Le français' , type: 'fr' },
                    // { title: 'Türkçe' , type: 'tr' },
                ],
                profiles:[],
                headerProfile:'',
                window: {
                    width: 0,
                    height: 0
                },
                notif:[

                ],
                showNotBadge:false,
                numberNotifUnread:0,

                bottom: false,
                nextPageNot:1,
                lastPage:'',
                loadingNotfi:true,
                noMore: false,

                newMsgNotif:0,

                notMsgBusiness:[],
                notMsgStandred:[],
                counterMsgBusiness: 0,
                counterMsgStandred: 0,
                to: "",
                total: "",
                noFirstTime: false,
                disableMyProfile: true,

                hideOnScroll: false,
            }
        },
        filters: {

            capitalize(value) {
                if (!value) return '';
                value = value.split(" ", 1).toString();
                return value.toUpperCase()
            },
            reverseNotf(array){
                return array.slice().reverse();
            },
            momentFilter(date) {
                return moment(new Date(date)).fromNow();
            },
            desc(not_id){
                if(not_id===1){
                    return  this.$i18n.t("header-footer.headerBar.Recommended you");
                }else if(not_id===2){
                    return this.$i18n.t("header-footer.headerBar.Add New Review");
                }else {
                    return this.$i18n.t("header-footer.headerBar.Rate Product");
                }
            }

        },
        mounted(){
            // this.scroll();
            let local;
            let storage= localStorage.getItem('localLang');
            if(storage){
                console.log("G1",storage);
                local =  storage
            }else {
                console.log("G2",storage);
                local = 'en';
                localStorage.setItem('localLang', local);
            }

            this.$i18n.locale = local;
            moment.locale(local);
            this.$vuetify.lang.current = local;

            this.$store.dispatch('userProflies');
            window.addEventListener('resize', this.handleResize);
            this.handleResize();

            //
            // document.getElementById("infiniteLoading").addEventListener('scroll', () => {
            //     this.bottom = this.bottomVisible()
            // })

        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        },
        computed:{
            getUserProfiles(){
                return this.$store.getters.getUserProfiles;
            },
            getLogoutStatus(){
                return this.$store.getters.getLogoutStatus;
            },
            getNotification(){
                return this.$store.getters.getNotification;
            },
            getDatabaseNotifications(){
                return this.$store.getters.getDatabaseNotifications;
            },
            getMsgNotifications(){
                return this.$store.getters.getMsgNotifications;
            },
            getReadNotificationFlag(){
                return this.$store.getters.getReadNotificationFlag;
            },
            getDisableMyProfileBtn(){
                return this.$store.getters.getDisableMyProfileBtn;
            }
        },
        watch:{
            getDisableMyProfileBtn(flag){
                this.disableMyProfile = flag;
            },
            getReadNotificationFlag(flag){
                if(flag.flag === "success"){
                    for (var i in this.notif) {
                        if (this.notif[i].NotificationId === flag.NotificationId) {
                            this.notif[i].opened = 1;
                            break;
                        }
                    }
                }
            },
            getMsgNotifications(flag){
                if(flag !== null && this.$router.currentRoute.name !== 'inbox'){
                    this.numberNotifUnread = this.numberNotifUnread + 1;

                    this.newMsgNotif =this.newMsgNotif + 1;




                    if(flag.user.type === 'business'){
                        this.notMsgBusiness = [];
                        this.notMsgBusiness.push({
                            receiver_slug: flag.user.receiver_slug,
                            type: flag.user.type,
                            logo: flag.user.logo,

                        });
                        this.counterMsgBusiness = this.counterMsgBusiness+1;
                    }else {
                        this.notMsgStandred = [];
                        this.notMsgStandred.push({
                            receiver_slug: flag.user.receiver_slug,
                            type: flag.user.type,
                            logo: flag.user.logo,

                        });
                        this.counterMsgStandred = this.counterMsgStandred+1;
                    }


                    this.showNotBadge = true;
                    sound.play();
                }
            },
            getUserProfiles(profiles){
                console.log(profiles,"appheader profiles")
                this.profiles = [];
                if(profiles !== false ){
                    this.headerProfile=profiles[0];
                    localStorage.setItem('s', profiles[0].slug);
                    localStorage.setItem('id', profiles[0].id);

                    for (let i=1 ; i< profiles.length ;i++) {
                        this.profiles.push(profiles[i])
                    }
                    this.loadingAppBar = true;
                    this.startPusher()
                }else if(profiles === false){
                    this.loadingAppBar = true;
                }
                console.log(this.loadingAppBar);
            },
            getLogoutStatus(status){
                if(status === true){
                    this.$store.commit('setLoading', true);
                    this.profiles=[];
                    this.headerProfile='';
                    // this.$router.replace({name: 'home', params: { lang: this.$route.params.lang}});
                    window.location = '/'+ this.$i18n.locale;
                }
            },
            getNotification(notfi){
                if (notfi !== null){
                    this.pushNotif(notfi);
                }
            },
            getDatabaseNotifications(dbNotif){
                if (dbNotif){
                    for(let i in dbNotif.data.OwnNotifications.data){
                        this.notif.unshift(dbNotif.data.OwnNotifications.data[i])
                    }
                    console.log(this.notif, "notif");
                    let nexPageNow;
                    if(dbNotif.data.OwnNotifications.next_page_url !== null) {
                        nexPageNow = dbNotif.data.OwnNotifications.next_page_url.split('=');
                        this.nextPageNot  = nexPageNow[1];
                    }
                    this.lastPage = dbNotif.data.OwnNotifications.last_page;
                    this.to = dbNotif.data.OwnNotifications.to;
                    this.total = dbNotif.data.OwnNotifications.total;
                    this.loadingNotfi = false;


                    console.log(this.to,"to",this.total, "total");
                }
            },
            // bottom(bottom) {
            //     if (bottom) {
            //       console.log("BOTTOM")
            //     }
            // }
        },
        methods:{
            scroll () {
                // if(isIOS) {
                    window.onscroll = () => {


                        if(window.pageYOffset < 5) {
                            this.hideOnScroll = false;
                        }else {
                            this.hideOnScroll = true;
                        }
                        // console.log( window.pageYOffset,this.hideOnScroll , "pageYOffset");
                    }
                // }
            },
            changeAppLang(type){
                this.$vuetify.lang.current = type;
                localStorage.setItem('localLang', type);
                this.$i18n.locale = type;
                this.$route.params.lang = type;

                moment.locale(type);
                if(type === 'ar') {
                    this.$vuetify.rtl = true;
                }else {
                    this.$vuetify.rtl = false;
                }


            },
            // bottomVisible() {
            //     const scrollY = window.scrollY
            //     const visible = document.documentElement.clientHeight
            //     const pageHeight = document.documentElement.scrollHeight
            //     const bottomOfPage = visible + scrollY >= pageHeight
            //     return bottomOfPage || pageHeight < visible
            // },
            goToNotif(notify_id, business_slug, NotificationId, opened){
                console.log(notify_id);
                if(notify_id === 1 || 2 || 3){
                    if(this.$router.currentRoute.params.id !== business_slug) {
                        let str = business_slug;

                        this.$router.push({
                            name: str.includes("professional") ? 'individualProfile' : 'companyProfile',
                            params: {id: business_slug, lang: this.$route.params.lang}
                        });
                    }else if(this.$router.currentRoute.params.id === business_slug){
                        if(notify_id ===2) {
                            this.$store.dispatch('Allreviwes', this.$route.params.id);
                            this.$vuetify.goTo('#reviews')
                        }else if(notify_id ===3){
                            this.$vuetify.goTo('#prod')
                        }
                    }
                }
                if(opened === 0){
                    this.$store.dispatch('ReadNotification',{
                        NotificationId: NotificationId
                    });
                }

            },
            onIntersect (entries, observer) {

                if(entries[0].isIntersecting === true){
                    if(this.to !== this.total && this.to !== null ) {
                        if(this.loadingNotfi !== true) {
                            this.loadingNotfi = true;
                            this.$store.dispatch('allDbNotifications', {lang_id: 1, page: this.nextPageNot});
                        }
                    }else if(this.to === null){
                        this.loadingNotfi = false;
                        this.noMore = false;
                        this.noFirstTime = true;
                    }else {
                        this.loadingNotfi = false;
                        this.noMore = true;
                    }
                }
            },
            reMoment(){
                let remoment = this.notif;
                this.notif = [];
                this.notif = remoment;
                this.numberNotifUnread=0;
                this.showNotBadge = false;
                document.title = ' ' + '' + ' ' + document.title.replace(/ *\([^)]*\) */g, "");
            },
            startPusher(){
                this.$store.dispatch('allDbNotifications',{lang_id:1, page:1});
                let store = this.$store;
                this.$store.commit('setNotification', null);
                let id = localStorage.getItem('id');
                let own_notifications = this.$pusher.subscribe('own_notifications_'+id);
                own_notifications.bind('own_notifications_'+id, function(data) {
                    console.log('Private notification', data);
                    store.commit('setNotification', data);
                });




                var  msg_notifications = this.$pusher.subscribe('notifymessage.'+id);
                msg_notifications.bind('message-sent-notify', function(data) {
                    console.log(data, "new msg")
                    store.commit('setMsgNotifications', null);
                    store.commit('setMsgNotifications', data);
                });
                console.log(msg_notifications);

            },
            pushNotif(notfi) {
                sound.play();
                this.notif.push({
                    business_slug: notfi.notification.business_slug,
                    NotificationId: notfi.notification.NotificationId,
                    business_logo: notfi.notification.business_logo,
                    description: notfi.notification.description,
                    link: notfi.notification.link,
                    notifier_slug: notfi.notification.notifier_slug,
                    notifier_logo: notfi.notification.notifier_logo,
                    notify_id: notfi.notification.notify_id,
                    notifier_type: notfi.notification.notifier_type,
                    notifier_name: notfi.notification.notifier_name,
                    opened: notfi.notification.opened,
                    own_id: notfi.notification.own_id,
                    content: notfi.notification.content ? notfi.notification.content : "" ,
                    created_at: notfi.notification.created_at,
                });
                this.numberNotifUnread +=1;
                document.title = ' ' + this.numberNotifUnread + ' ' + document.title.replace(/ *\([^)]*\) */g, "");
                this.showNotBadge = true;
            },
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },
            navigateHome(){
                this.$router.push('/en');
            },
            loginPage(type){
                if(this.$router.currentRoute.name !== 'authPage') {
                    if (type === 'lo') {
                        this.$router.push({
                            name: 'authPage',
                            params: {lang: this.$route.params.lang},
                            query: {type: 'login'}
                        });
                    } else if (type === 're') {
                        this.$router.push({
                            name: 'authPage',
                            params: {lang: this.$route.params.lang},
                            query: {type: 'register'}
                        });
                    }
                }
            },
            logOutUser(){
                this.$store.commit('setLoadingSignOut', true);
                localStorage.setItem('token', '');
                localStorage.setItem('s', '');
                localStorage.setItem('id', '');
                document.title = ' ' + '' + ' ' + document.title.replace(/ *\([^)]*\) */g, "");
                this.$store.dispatch('logOutUser')
            },
            routeToPage(profileType, slugToGo){
                if(profileType === 'company') {
                    this.$router.push({
                        name: 'companyProfile',
                        params: {id: slugToGo, lang: this.$route.params.lang}
                    });
                }else if(profileType === 'individual'){
                    this.$router.push({
                        name: 'individualProfile',
                        params: {id: slugToGo, lang: this.$route.params.lang}
                    });
                }else if(profileType === 'personal'){
                    this.$router.push({
                        name: 'personalProfile',
                        params: {id: slugToGo, lang: this.$route.params.lang}
                    });
                }
            },
            openReadInbox(slug, type){
                if(type === 'standard'){
                    this.counterMsgStandred = 0;
                    this.notMsgStandred = [];
                }else {
                    this.counterMsgBusiness = 0;
                    this.notMsgBusiness = [];
                }
                this.$router.push({
                    name: 'inbox',
                    params: {id: slug, lang: this.$route.params.lang}
                });
            }
        }
    }
</script>

<style scoped>
    .logo-header{
        height: auto;
        cursor: pointer;
    }
    .mobile-view{
        display: none;
    }
    .wide-screen-view{
        display: block;
    }
    @media (max-width: 766px) {
        .mobile-view{
            display: block;
        }
        .wide-screen-view{
            display: none;
        }
    }
    >>>.msg-top:before{
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-bottom: 10px solid #E60000;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        bottom: -15px;
        left: 7px;
        z-index: 999;
    }
    >>>.not-opened{
        background-color: rgb(255, 220, 220) !important;
    }
    >>>.opened{
        background-color: rgb(249, 249, 249);
    }
    >>>.notif-header{
        height: 25px;
        color:#E60000;
        padding-left: 5px;
        justify-content: space-between;
        padding-right: 5px;
    }
    >>>.v-badge--overlap.v-badge--bottom .v-badge__badge {
        bottom: 3px;
        top: auto;
    }
    >>>.v-application--is-ltr .v-badge--overlap .v-badge__badge {
        right: -5px;
    }
    >>>.paperNub::after{
        background: transparent;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 15px solid #E60000;
        margin-right: 16px;
    }

    >>>#notifications:before {
        content: '';
        display: block;
        width: 0;
        height: 0;
        color: transparent;
        border: 10px solid #CCC;
        border-color: transparent transparent #FFF;
        margin-top: -20px;
        margin-left: 10px;
    }
    >>>.v-list .v-list-item--active, .v-list .v-list-item--active .v-icon {
        color: #E60000;
    }
    .stickyAppbar{
        position: sticky !important;
    }
</style>

