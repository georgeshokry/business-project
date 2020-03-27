<template>
    <v-app>

        <v-navigation-drawer
                v-model="drawer"
                app
                style="height: 100%;"
                :right="rtlNav"
        >


            <v-list-item-group mandatory color="#E60000" v-if="secondDrawer" >
                <v-layout justify-center align-center style="height: 65px;">
                    <v-list-item
                            :ripple="{ class: 'red--text' }"
                            :to="{name: 'companyProfile', params:{id: slugOwner}}"
                            style="padding-left: 15px;"
                    >

                        <v-list-item-avatar >
                            <v-img style="border-radius: 50%;border: 2px solid #E60000;" :src="'/images/med/' + picOwner"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content style="    text-align: initial;">
                            <v-list-item-title style="color: black;font-weight: bold" >{{nameOwner}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>


                </v-layout>
                <v-divider class="ma-0"></v-divider>
                <v-layout
                        v-if="loadingMsg"
                        fill-height
                        align-center
                        justify-center
                        ma-1
                >
                    <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
                </v-layout>
                <div v-if="!loadingMsg && allsenders.length ===0" style="      padding-top: 25px;  font-size: large;text-align: center;color: #cccccc;" >
                    {{$t('inbox-component.inbox.No Messages!')}}
                </div>




                <v-list two-line style="padding: 0">
                    <v-list-item-group color="#E60000">
                        <v-list-item
                                :disabled="disableClick"
                                v-for="(item,i) in allsenders"
                                :key="i"
                                @click="GetMessagesOfSender(item.slug,item.you,item.sendername)"
                        >

                            <v-list-item-avatar>
                                <v-img
                                        height="100%"
                                        aspect-ratio="1.7"
                                        :src="'/images/med/' + item.logo"
                                        :lazy-src="'/images/med/' + item.logo"
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
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title style="color: #E60000;font-weight: bold; text-align: initial" >{{item.sendername}}</v-list-item-title>
                                <v-list-item-subtitle>
<!--                                    <div style="    font-size: smaller;" v-if="item.you">-->
<!--                                        <v-icon small color="grey">star</v-icon>Started By You-->
<!--                                    </div>-->
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    "{{item.lastmessage}}"
                                </v-list-item-subtitle>

                            </v-list-item-content>

                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-list-item-group>




            <!--        </v-layout>-->

        </v-navigation-drawer>

        <v-app-bar
                app
                color="#ffffff"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="#E60000"></v-app-bar-nav-icon>
            <v-toolbar-title class="pa-0" @click="gotoProfile()" style="cursor: pointer; color: #E60000">{{nameSelected}}</v-toolbar-title>
        </v-app-bar>

        <v-content class="pt-12" style="height: 100px;overflow: auto;">
            <v-container >

                <v-layout
                        v-if="loadingMsgConv"
                        fill-height
                        align-center
                        justify-center
                        ma-5
                >
                    <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
                </v-layout>
                <v-layout justify-center align-center v-else-if="showIntro && allsenders.length !== 0">
                    <v-card-title class=" text-align-center justify-center" style="color:#c9c9c9;">
                        {{$t('inbox-component.inbox.Choose Sender To View Messages!')}}
                    </v-card-title>
                </v-layout>


                <div v-for="(allmessage,i) in allmessages" :key="i" v-else-if="viewSelectedSender"  >

                    <v-col class="ml-1 pb-0">

                        <div class="separator">
                            <span style="    margin: 0 5px 0 5px;font-weight: bold">{{$t('inbox-component.inbox.Subject')}} &nbsp; </span> {{allmessage.subject}}
                            <v-btn small text rounded color="#E60000" @click="showReplyDialog(allmessage.subject,allmessage.id,allmessage.sender_slug,allmessage.receiver_slug,allmessage.name)">
                                {{$t('inbox-component.inbox.reply')}}
                            </v-btn>
                        </div>

                    </v-col>


                    <div v-if="allmessage.sender_slug !== slug">
                        <div class="pa-0" style="margin-right: 15px;text-align: start;margin-left: 15px;font-weight: bold">

                            {{allmessage.sender_slug === slug ? $t('inbox-component.inbox.You') :allmessage.name  }}

                        </div>

                        <div class="d-flex justify-content-start ">
                            <div class="msg_cotainer">
                                <truncate action-class="customClass" :clamp="$t('inbox-component.inbox.Show More')" :less="$t('inbox-component.inbox.Show Less')"  :length="50" type="text" :text="allmessage.message"></truncate>

                            </div>

                        </div>
                        <div class="d-flex justify-content-start mb-1">
                        <div  class="msg_time pa-0 justify-content-start" style="direction: ltr;"> {{allmessage.date}}</div>
                        </div>
                    </div>

                    <div v-else-if="allmessage.sender_slug === slug">
                        <div class="pa-0" style="margin-left: 15px;text-align: end;margin-right: 15px;font-weight: bold">

                            {{allmessage.sender_slug === slug ? $t('inbox-component.inbox.You') : allmessage.name}}
                        </div>

                        <div class="d-flex justify-content-end ">
                            <div class="msg_cotainer_send">
                                <truncate action-class="customClass" :clamp="$t('inbox-component.inbox.Show More')"  :less="$t('inbox-component.inbox.Show Less')" :length="50" type="text" :text="allmessage.message"></truncate>

                            </div>

                        </div>
                        <div class="d-flex justify-content-end mb-1">
                        <div class="msg_time_send pa-0 justify-content-end" style="direction: ltr;">{{allmessage.date}}</div>
                        </div>
                    </div>


                    <div v-if="allmessage.replies.length !== 0" >
                        <div  v-for="(reply,j) in allmessage.replies" :key="j">

                            <div v-if="reply.sender_slug !== slug">
                                <div style="margin-right: 15px;text-align: start;margin-left: 15px;font-weight: bold">
                                    {{reply.sender_slug === slug ? $t('inbox-component.inbox.You') :reply.name  }}
                                </div>
                                <div class="d-flex justify-content-start ">
                                    <div class="msg_cotainer">
                                        <truncate action-class="customClass" :clamp="$t('inbox-component.inbox.Show More')" :less="$t('inbox-component.inbox.Show Less')" :length="50" type="text" :text="reply.message"></truncate>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-start mb-1">
                                <div class="msg_time pa-0 justify-content-start" style="direction: ltr;">{{reply.date}}</div>
                                </div>
                            </div>



                            <div v-else-if="reply.sender_slug === slug">
                                <div style="margin-left: 15px;text-align: end;margin-right: 15px;font-weight: bold">
                                     {{reply.sender_slug === slug ? $t('inbox-component.inbox.You') : reply.name}}
                                </div>
                                <div class="d-flex justify-content-end ">
                                    <div class="msg_cotainer_send">

                                        <truncate action-class="customClass" :clamp="$t('inbox-component.inbox.Show More')" :less="$t('inbox-component.inbox.Show Less')" :length="50" type="text" :text="reply.message"></truncate>
                                    </div>

                                </div>
                                <div class="d-flex justify-content-end mb-1">
                                <div class="msg_time_send pa-0 justify-content-end" style="direction: ltr;">{{reply.date}}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <v-dialog
                        persistent
                        v-model="newReplyDialog"
                        width="490"
                        scrollable
                >
                    <v-card>

<!--                        <v-btn style="right:0;position: absolute; margin: 12px;" icon @click="newReplyDialog = false">-->
<!--                            <v-icon  color="red">-->
<!--                                close-->
<!--                            </v-icon>-->
<!--                        </v-btn>-->
                        <v-card-title style="font-weight: 300;">
                            {{$t('inbox-component.inbox.New Reply on')}} &nbsp;<span style="font-weight: bold;">{{subjectNameToreply}}</span>
                        </v-card-title>
<!--                        <v-card-text>-->
                            <v-form
                                    ref="newReplyForm"
                            >
                                <v-card-text>

                                    <v-textarea


                                            filled
                                            v-model="replycontent"
                                            shaped
                                            :label="$t('inbox-component.inbox.Reply Content')"
                                            color="#E60000"
                                            auto-grow
                                            counter="250"
                                            maxlength="250"
                                            :rules="[value=>!!value || $t( 'registration.professionalRegisteration.required')]"
                                    >
                                    </v-textarea>
                                    <v-card-actions class="justify-space-between">
                                        <v-btn
                                                text
                                                elevation="0"
                                                @click="newReplyDialog = false"
                                                small
                                                color="#E60000"
                                                dark
                                        >
                                            {{$t('profile.sliderProfile.Cancel')}}
                                        </v-btn>
                                        <v-btn

                                                elevation="0"
                                                @click="sendNewReply()"
                                                small
                                                color="#E60000"
                                                dark
                                        >
                                            <img style="margin: 0 5px 0 5px;" width="20" src="../resources/Send_White.svg" > {{$t('inbox-component.inbox.Send')}}
                                        </v-btn>
                                    </v-card-actions>
                                </v-card-text>
                            </v-form>
<!--                        </v-card-text>-->
                    </v-card>
                </v-dialog>

                <!--            <v-dialog-->
                <!--                    persistent-->
                <!--                    scrollable-->
                <!--                    v-model="deleteConfirmation"-->
                <!--                    max-width="350"-->
                <!--            >-->
                <!--                <v-card>-->
                <!--                <v-layout column wrap justify-content-center style="width:100%">-->
                <!--                    <v-card-title class="headline text-align-center" >-->
                <!--                        Confirm Delete-->
                <!--                    </v-card-title>-->
                <!--                </v-layout>-->
                <!--                <v-card-text  class="font-weight-bold text-align-center">-->
                <!--                    Are you sure to delete this subject?-->
                <!--                </v-card-text>-->
                <!--                <v-card-actions >-->
                <!--                    <div class="flex-grow-1"></div>-->

                <!--                    <v-btn-->
                <!--                            rounded-->
                <!--                            color="red"-->
                <!--                            text-->
                <!--                            @click="deleteConfirmation = false"-->
                <!--                    >-->
                <!--                        no-->
                <!--                    </v-btn>-->

                <!--                    <v-btn-->
                <!--                            rounded-->
                <!--                            color="red"-->
                <!--                            text-->
                <!--                            @click="deleteMessage()"-->
                <!--                    >-->
                <!--                        yes-->
                <!--                    </v-btn>-->
                <!--                </v-card-actions>-->
                <!--                </v-card>-->
                <!--            </v-dialog>-->




            </v-container>

        </v-content>
    </v-app>
</template>

<script>
    import moment from 'moment';
    import truncate from 'vue-truncate-collapsed';
    export default {
        name: "inbox",
        props: {
            source: String,
        },
        components: {
            truncate
        },
        data: () => ({
            disabled: false,
            timeout: null,
            viewSelectedSender: true,
            deleteConfirmation: false,
            switch1: false,
            loadingMsg:false,
            drawer: null,
            drawer2: null,
            secondDrawer: true,
            items: [
                {
                    name: 'Business',
                },
            ],
            allsenders:[],
            allmessages:[],
            messagid:'',
            messagIndex:'',
            rules: {
                required: value => !!value || 'Required.',
                subject: v => (v && v.length <= 25) || 'Maximum 25 characters',
                msg: v => (v && v.length <= 250) || 'Maximum 250 characters',
            },
            newReplyDialog: false,
            subjectNameToreply: '',
            idMessageToreply: '',

            showIntro: true,
            replycontent:'',
            replyto:'',
            repliername:'',
            slug:'',


            slugOwner:'',
            nameOwner: '',
            picOwner: '',

            nameSelected: '',
            slugSelected: '',

            disableClick: false,

            rtlNav: false,

            loadingMsgConv: false,

        }),
        filters:{
            turncate(content){
                return content.length > 30 ? content.substring(0, (30 - 3)) + '...' : content;
            }
        },
        created(){
            this.drawer = true;
           this.rtlNav = this.$vuetify.rtl;
            this.$pusher.logToConsole = true;

            this.slug = this.$route.params.id;
            var slugname=this.slug;

            var store = this.$store;
            var  newmessage = this.$pusher.subscribe('chat.'+slugname);
            newmessage.bind('message-sent', function(data,) {

                store.dispatch('AllSenders', {id:slugname,you:false});
                // store.commit('setMessageofSender', data.message);

            });

            var  newmessagesender = this.$pusher.subscribe('chatsender.'+slugname);
            newmessagesender.bind('message-sent-sender', function(data) {
                store.dispatch('AllSenders', {id:slugname,you:true});
                // store.commit('setMessageofSender', data.message);
            });
            var  newreply = this.$pusher.subscribe('reply.'+slugname);
            newreply.bind('reply-sent', function(data) {
                store.dispatch('AllSenders', {id:slugname,you:false});


                store.commit('setRepliesMessage', data.reply);
            });
            var  newreplysender = this.$pusher.subscribe('replysender.'+slugname);
            newreplysender.bind('reply-sent-sender', function(data) {

                store.dispatch('AllSenders', {id:slugname,you:true});

                store.commit('setRepliesMessage', data.reply);
            });



            this.$store.dispatch('AllSenders', {id:this.$route.params.id,you:false});
            this.$store.commit('setLoadingSignOut', false);
            // this.$store.dispatch('userProflies');

            this.getUserProfilesMeth(this.$store.getters.getUserProfiles);
        },
        computed:{

            retunSwithValue()
            {
                this.loadingMsg=true;
                return this.switch1;
            },
            getAllSenders(){
                return this.$store.getters.getAllSenders;
            },
            getMessageofSender(){
                return this.$store.getters.getMessageofSender;
            },
            getAppMsgs(){
                return this.$store.getters.getAppMsgs;
            },
            getRepliesMessage(){
                return this.$store.getters.getRepliesMessage;
            },
            getUserProfiles(){
                return this.$store.getters.getUserProfiles;
            },

            getRtl(){
                return this.$vuetify.rtl;
            }
        },
        watch:{
            getRtl(flag){
              this.rtlNav = flag;
            },
            getAppMsgs(msg){
                if(msg !== null) {
                    if (msg.appSnackbarColor === 'success') {
                        // this.viewSelectedSender = false;
                        // this.showIntro = true;
                        //this.startReloadAllMsg();
                    }
                }
            },
            retunSwithValue(switch1)
            {
                this.StartedByYou(switch1)

            },

            getAllSenders(senders)
            {
                if(senders){
                    this.allsenders=[];
                    for(let i in senders){
                        this.allsenders.push(senders[i]);
                    }
                    console.log(this.allsenders, "ALL SENDERS");
                    this.loadingMsg=false;


                }
            },

            getMessageofSender(allmessages){

                if(allmessages)
                {

                    for(let i in allmessages){
                        this.allmessages.push(allmessages[i]);
                    }

                    this.showIntro = false;
                    this.disableClick = false;
                    this.loadingMsgConv = false;
                    console.log(this.allmessages, "ALLLLLLLL");


                }

            },

            getRepliesMessage(allreplies){
                if(allreplies)
                {
                    var newdate=moment().format("D MMM Y H:m A");
                    allreplies[0]['date']= newdate;

                    console.log(allreplies[0]);
                    if(this.allmessages.length !==0) {
                        var foundarray = this.allmessages.map(function (msg) {
                            if (msg.id == allreplies[0].reply_id) {
                                return msg.replies.push(allreplies[0]);
                            }

                        });
                    }
                }
            },
            getUserProfiles(profiles){
                if(profiles)
                {
                    var name;
                    let pic;
                    let nameslug=this.slug;
                    profiles.map(function (profile) {
                        if (profile.slug === nameslug) {
                            name=profile.name;
                            pic = profile.pic;

                        }


                    });
                    this.repliername=name;

                    this.slugOwner = this.slug;
                    this.nameOwner = name;
                    this.picOwner = pic;
                }

            },
        },
        methods:{
            getUserProfilesMeth(profiles){
                if(profiles)
                {
                    console.log(profiles, "GETTER>>>>>>>>")
                    var name;
                    let pic;
                    let nameslug=this.slug;
                    profiles.map(function (profile) {
                        if (profile.slug === nameslug) {
                            name=profile.name;
                            pic = profile.pic;
                        }
                    });
                    this.repliername=name;
                    this.slugOwner = this.slug;
                    this.nameOwner = name;
                    this.picOwner = pic;
                }

            },
            gotoProfile(){
                this.$router.push({name: 'companyProfile', params:{id: this.slugSelected, lang: this.$route.params.lang}});
            },
            delayReload() {
                this.disabled = false;

                this.timeout = setTimeout(() => {
                    this.disabled = true;
                }, 60000);

                this.startReloadAllMsg()
            },
            routeToProfile(){
                this.$store.commit('setLoadingSignOut', true);
                this.$router.push({name: 'companyProfile', params: { id: this.$route.params.id, lang: this.$route.params.lang}});
            },
            activeRecordBtn(){


            },
            activeFolderBtn(){

            },
            StartedByYou(you)
            {

                this.$store.commit('setClearAppMsgs');

                this.$store.dispatch('AllSenders', {
                    id: this.$route.params.id,
                    you: you,

                });

            },
            GetMessagesOfSender(senderslug,you,sendername)
            {
                if(senderslug !== this.slugSelected) {
                    this.loadingMsgConv = true;
                    this.disableClick = true;
                    console.log(senderslug, you, sendername, "HEADER")
                    this.nameSelected = sendername;
                    this.slugSelected = senderslug;

                    this.allmessages = [];
                    this.$store.commit('setClearAppMsgs');
                    this.$store.dispatch('GetMessageofSender', {
                        slug: this.$route.params.id,
                        senderslug: senderslug,
                        you: you,

                    });
                    this.viewSelectedSender = true;
                }
            },
            openDeleteConfirmation(id, key)
            {
                this.messagid=id;
                this.messagIndex=key;
                this.deleteConfirmation=true;
            },
            deleteMessage(){
                this.$store.commit('setClearAppMsgs');
                this.$store.dispatch('deleteMessage', {
                    slug: this.$route.params.id,
                    messageid:  this.messagid
                });
                this.deleteConfirmation=false;




            },
            startReloadAllMsg(){

                this.$store.dispatch('AllSenders', {id:this.$route.params.id,you:false});
            },
            showReplyDialog(subject,id,replyto,receiver,name){


                this.idMessageToreply=id;
                this.subjectNameToreply = subject;

                if(name==='you')
                {

                    this.replyto=receiver;
                }
                else
                {
                    this.replyto=replyto;
                }
                this.newReplyDialog = true;
            },

            sendNewReply()
            {
                this.$store.commit('setClearAppMsgs');
                if(this.$refs.newReplyForm.validate()) {


                    this.$store.dispatch('sendNewReply', {
                        slug: this.$route.params.id,
                        messageid: this.idMessageToreply,
                        subject: this.subjectNameToreply,
                        replyto: this.replyto,

                        replycontent: this.replycontent,
                    });
                    this.replycontent = '';
                    this.$refs.newReplyForm.reset()
                    this.newReplyDialog = false;
                }
            }
        },
        beforeDestroy () {
            clearTimeout(this.timeout)
        }
    }
</script>

<style scoped>
    >>>.v-navigation-drawer--fixed {
        position: absolute !important;
    }
    >>>.v-app-bar.v-app-bar--fixed {
        position: absolute !important;
        top: 0;
        z-index: 5;
    }
    >>>.msging-section{
        bottom: 0px;
        background-color: rgb(243, 243, 243);
        width: 100%;
        height: fit-content;
        padding: 10px;
        box-shadow: 0px 0px 13px #888888;

    }

    >>>::-webkit-scrollbar {
        width: 10px;
    }

    >>>::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
    }

    >>>::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }


    /*/////////////////////*/
    >>>body,html{
        height: 100%;
        margin: 0;
        background: #7F7FD5;
        background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
        background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
    }

    >>>.chat{
        margin-top: auto;
        margin-bottom: auto;
    }
    >>>.card{
        height: 500px;
        border-radius: 15px !important;
        background-color: rgba(0,0,0,0.4) !important;
    }
    >>>.contacts_body{
        padding:  0.75rem 0 !important;
        overflow-y: auto;
        white-space: nowrap;
    }
    >>>.msg_card_body{
        overflow-y: auto;
    }
    >>>.card-header{
        border-radius: 15px 15px 0 0 !important;
        border-bottom: 0 !important;
    }
    >>>.card-footer{
        border-radius: 0 0 15px 15px !important;
        border-top: 0 !important;
    }
    >>>.container{
        align-content: center;
    }
    >>>.search{
        border-radius: 15px 0 0 15px !important;
        background-color: rgba(0,0,0,0.3) !important;
        border:0 !important;
        color:white !important;
    }
    >>>.search:focus{
        box-shadow:none !important;
        outline:0px !important;
    }
    >>>.type_msg{
        background-color: rgba(0,0,0,0.3) !important;
        border:0 !important;
        color:white !important;
        height: 60px !important;
        overflow-y: auto;
    }
    >>>.type_msg:focus{
        box-shadow:none !important;
        outline:0px !important;
    }
    >>>.attach_btn{
        border-radius: 15px 0 0 15px !important;
        background-color: rgba(0,0,0,0.3) !important;
        border:0 !important;
        color: white !important;
        cursor: pointer;
    }
    >>>.send_btn{
        border-radius: 0 15px 15px 0 !important;
        background-color: rgba(0,0,0,0.3) !important;
        border:0 !important;
        color: white !important;
        cursor: pointer;
    }
    >>>.search_btn{
        border-radius: 0 15px 15px 0 !important;
        background-color: rgba(0,0,0,0.3) !important;
        border:0 !important;
        color: white !important;
        cursor: pointer;
    }
    >>>.contacts{
        list-style: none;
        padding: 0;
    }
    >>>.contacts li{
        width: 100% !important;
        padding: 5px 10px;
        margin-bottom: 15px !important;
    }
    >>>.active{
        background-color: rgba(0,0,0,0.3);
    }
    >>>.user_img{
        height: 70px;
        width: 70px;
        border:1.5px solid #f5f6fa;

    }
    >>>.user_img_msg{
        height: 40px;
        width: 40px;
        border:1.5px solid #f5f6fa;

    }
    >>>.img_cont{
        position: relative;
        height: 70px;
        width: 70px;
    }
    >>>.img_cont_msg{
        height: 40px;
        width: 40px;
    }
    >>>.online_icon{
        position: absolute;
        height: 15px;
        width:15px;
        background-color: #4cd137;
        border-radius: 50%;
        bottom: 0.2em;
        right: 0.4em;
        border:1.5px solid white;
    }
    >>>.offline{
        background-color: #c23616 !important;
    }
    >>>.user_info{
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 15px;
    }
    >>>.user_info span{
        font-size: 20px;
        color: white;
    }
    >>>.user_info p{
        font-size: 10px;
        color: rgba(255,255,255,0.6);
    }
    >>>.video_cam{
        margin-left: 50px;
        margin-top: 5px;
    }
    >>>.video_cam span{
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-right: 20px;
    }
    >>>.msg_cotainer{
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 10px;
        border-radius: 25px;
        background-color: #dedede;
        padding: 10px;
        position: relative;
        margin-right: 10px;
    }
    >>>.msg_cotainer_send{
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 10px;
        border-radius: 25px;
        background-color: #e600001a;
        padding: 10px;
        position: relative;
        margin-left: 10px;
    }
    >>>.msg_time{
        margin-left: 15px;
        margin-right: 15px;
        color: rgba(0, 0, 0, 0.5);
        font-size: 12px;
    }
    .msg_time_send{
        margin-left: 15px;
        margin-right: 15px;
        color: rgba(0, 0, 0, 0.5);
        font-size: 12px;

    }
    >>>.msg_head{
        position: relative;
    }
    >>>#action_menu_btn{
        position: absolute;
        right: 10px;
        top: 10px;
        color: white;
        cursor: pointer;
        font-size: 20px;
    }
    >>>.action_menu{
        z-index: 1;
        position: absolute;
        padding: 15px 0;
        background-color: rgba(0,0,0,0.5);
        color: white;
        border-radius: 15px;
        top: 30px;
        right: 15px;
        display: none;
    }
    >>>.action_menu ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    >>>.action_menu ul li{
        width: 100%;
        padding: 10px 15px;
        margin-bottom: 5px;
    }
    >>>.action_menu ul li i{
        padding-right: 10px;

    }
    >>>.action_menu ul li:hover{
        cursor: pointer;
        background-color: rgba(0,0,0,0.2);
    }
    >>>@media(max-width: 576px){
        .contacts_card{
            margin-bottom: 15px !important;
        }
    }
    >>>.separator {
        display: flex;
        align-items: center;
        text-align: center;
    }
    >>>.separator::before, .separator::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #e60000;
        border-bottom: 3px solid #e60000;
    }
    >>>.separator::before {
        margin-right: 1em;
        border-radius: 100%;
    }
    >>>.separator::after {
        margin-left: .25em;
        border-radius: 100%;
    }
    >>>.customClass{
        color:#E60000 !important;
        font-weight: bold;
        text-decoration: underline;
    }
    >>>.customClass:hover{
        color:#E60000;
        font-weight: bold;
        text-decoration: underline;
    }
</style>
