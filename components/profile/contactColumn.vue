<template>
    <v-card tile width="550" flat>

        <v-card flat height="500" style="position: sticky;top: 50px;border: 2px solid #e2e2e2 !important; background-color: #e2e2e2;width:100%" v-if="loading">
            <v-layout

                    fill-height
                    align-center
                    justify-center
                    ma-auto
            >
                <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
            </v-layout>
        </v-card>
        <div v-if="loaded" style="position: sticky;top: 50px;">
    <v-card flat style="border: 2px solid #e2e2e2 !important;border-radius: 0px !important;" >

        <v-toolbar flat dense height="30" color="#e2e2e2" >
            <v-spacer></v-spacer>
            <v-toolbar-title style="font-size: medium;">
                <strong>{{$t('profile.contactColumn.Contact Info')}}</strong>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-layout row wrap justify-center>
            <div>
            <strong>{{$t('profile.contactColumn.Address')}}</strong>
            </div>
            <div style="width: 160px;">
            <span>{{userInfo.street}}</span>
            </div>
                <v-flex lg12 class="pa-0" style="text-align: center;direction: ltr;">


                <v-chip :href="'tel:' + userInfo.business_tele" outlined class="ma-1" v-if=" userInfo.pivatenumber !==1 ">
                    <v-icon left color="#E60000" style="margin: 3px">phone</v-icon>
                    {{userInfo.business_tele}}
                </v-chip>
                </v-flex>
                <v-flex lg12 class="pa-0"  style="text-align: center;direction: ltr;">
                <v-chip :href="'mailto:'+ userInfo.business_email" outlined class="ma-1">
                    <img width="20" style="margin-right: 8px;margin-left: 8px" src="../resources/Email_Red.svg" />
                    {{userInfo.business_email}}
                </v-chip>
                </v-flex>
                <v-flex lg12 class="pa-0"  style="text-align: center;direction: ltr;">
                <v-chip link outlined class="ma-1" v-if="userInfo.website !== ''" :href="'https://' + userInfo.website" target="_blank">
                    <img width="20" style="margin-right: 8px;margin-left: 8px" src="../resources/Website_Red.svg" />
                    {{userInfo.website}}
                </v-chip>
                </v-flex>
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
    </v-card>
        <v-card flat style="border: 2px solid #e2e2e2 !important;
    border-radius: 0px !important;">

            <v-toolbar flat dense height="30" color="#e2e2e2" >
                <v-spacer></v-spacer>
                <v-toolbar-title style="font-size: medium;">
                    <strong>{{$t('profile.contactColumn.Tags')}}</strong>
                    <v-btn small color="#E60000" icon v-if="authFlagForEdit" @click="editTags()" class="edit-btn">
                        <v-icon small color="#E60000">
                            edit
                        </v-icon>
                    </v-btn>
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text >
                <v-layout row wrap justify-center>
                   <div  v-for="(item,i) in keywords">
                    <v-chip small class="ma-1">
                        {{item}}
                    </v-chip>
                    </div>

                </v-layout>
            </v-card-text>
        </v-card>
        <v-card flat style="border: 2px solid #e2e2e2 !important;border-radius: 0px !important;" >

            <v-toolbar flat dense height="30" color="#e2e2e2" >
                <v-spacer></v-spacer>
                <v-toolbar-title style="font-size: medium;">
                    <strong>{{$t('profile.contactColumn.Business Staff')}}</strong>
                    <v-btn small color="#E60000" icon v-if="authFlagForEdit" @click="editStuff()" class="edit-btn">
                        <v-icon small color="#E60000">
                            edit
                        </v-icon>
                    </v-btn>
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text class="scroll-staff" style="padding-top: 5px;">
                <v-layout
                        v-if="loadingStuff"
                        fill-height
                        align-center
                        justify-center
                        ma-auto
                >
                    <v-progress-circular size="23" width="2" indeterminate color="#E60000"></v-progress-circular>
                </v-layout>
                <div v-if="noStuff" style="      padding-top: 5px;  font-size: small;text-align: center;color: #cccccc;" >
                    {{$t('profile.contactColumn.No Staff Members')}}
                </div>
                <v-layout row wrap justify-center v-else-if="memberstuff.length !==0" v-for="(item,i,j) in memberstuff" :key="i">

                    <v-card-text class="pb-0" >
                        <v-layout row wrap justify-space-between>
                            <v-layout column wrap>
                        <div style="color:#E60000;cursor: pointer;width: fit-content;" @click="goToProfile(item.slug, item.profile_type)">{{item.name}}</div>
                        <div style="text-align: initial;">{{item.job_title}}</div>
                            </v-layout>
                        <div>
                          <v-btn small color="#E60000" :key="j" v-if="authFlagForEdit" icon @click="deleteMember(item.stuff_id)" >
                              <v-icon color="#E60000">clear</v-icon>
                          </v-btn>
                        </div>
                        </v-layout>
                    </v-card-text>



                </v-layout>
            </v-card-text>
        </v-card>
        </div>
        <v-dialog
                persistant
                scrollable
                v-model="editTagsDialog"
                max-width="350"
        >
            <v-form ref="editkeywords">

            <v-card>


                <v-card-title class=" justify-space-between" >
                    {{$t('profile.contactColumn.Edit Tags')}}
                    <v-btn icon color="#E60000" @click="editTagsDialog= false">
                        <v-icon color="#E60000" small >close</v-icon>
                    </v-btn>
                </v-card-title>


                <v-card-text>
                    <v-autocomplete
                            :menu-props="{maxHeight: 150}"
                            color="#E60000"
                            v-model="comboboxTags"
                            :items="dropdownSelectTags"
                            :label="$t('profile.contactColumn.Select Tags')"
                            multiple
                            counter="5"
                            :rules="[v => v.length > 1 || $t('profile.contactColumn.Minimum 1 Tag'), v => v.length < 6 || $t('profile.contactColumn.Maximum 5 Tags')]"

                    >
                        <template v-slot:no-data>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{$t('registration.personalProfileRegisteration.No Data')}}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-autocomplete>
                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn
                            color="#E60000"
                            text
                            @click="editTagsDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn
                            color="#E60000"
                            dark
                            elevation="0"
                            @click="saveTagsData()"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
            </v-form>
        </v-dialog>
        <v-dialog
                persistant
                scrollable
                v-model="editStuffDialog"
                max-width="350"
        >
            <v-card>


                <v-card-title class="justify-space-between" >
                    {{$t('profile.contactColumn.Edit Staff Members')}}
                    <v-btn icon color="#E60000" @click="editStuffDialog= false">
                        <v-icon color="#E60000" small >close</v-icon>
                    </v-btn>
                </v-card-title>


                <v-card-text>
                    <v-layout>
                    <v-text-field
            v-model="memberstuffName"
            :label="$t('profile.contactColumn.Enter Member Email')"
            :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' ), value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || $t('registration.signup.emailvalid')]"
            color="#E60000"
            append-icon="search"
            :disabled="diabledsearch"
            @click:append="CheckEmailMember(memberstuffName)"
            @blur="CheckEmailMember(memberstuffName)"
          ></v-text-field>

<!--                    <v-btn style="margin: 10px;" color="#E60000" icon @click="CheckEmailMember(memberstuffName)" :disabled="diabledsearch">-->

<!--                        <v-icon  color="#E60000">search</v-icon>-->
<!--                    </v-btn>-->
                </v-layout>
               <v-text-field
            v-model="memberstuffJobtitle"
            :label="$t('profile.contactColumn.Job Title')"
            :disabled="diabledtext"
            :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
            color="#E60000"
          ></v-text-field>

                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn
                            color="#E60000"
                            text
                            @click="CancelStuff()"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn
                            color="#E60000"
                            dark
                            elevation="0"
                            @click="SaveStuffMemberData()"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
    import userInfoMixin from "../userInfoMixin";
    export default {
        name: "contactColumn",
        mixins: [userInfoMixin],
        data:()=> {
            return {
                emailRules: [
                    v => !!v || "E-mail is required",
                    v => /.+@.+/.test(v) || "E-mail must be valid"
                ],
                Rules: [v => !!v || "The input is required"],

                authFlagForEdit: false,
                editStuffDialog: false,
                editTagsDialog: false,
                dropdownSelectTags: [],
                comboboxTags: [],
                comboboxStuff: [],
                memberstuff: [],
                dropdownSelectStuff: [],
                keywords: [],
                memberstuffName: '',
                memberstuffJobtitle: '',
                diabledtext: true,
                diabledsearch: false,

                noStuff: false,
                loadingStuff: true,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length > 1 || 'Minimum 1 characters',

                    max: v => v.length <= 5 || 'Maximum 5 keywords',
                },
                dropdownSelectTagsWithIds:[],
            }
        },
         created() {
             this.$store.dispatch('userData', {id: this.$route.params.id, lang: this.$i18n.locale});
             this.$store.dispatch('checkUserAuth', this.$route.params.id);

             this.$store.dispatch('Allkeywords', {slug: this.$route.params.id, lang: this.$i18n.locale});
             this.$store.dispatch('SelectedKeywords', {slug: this.$route.params.id, lang: this.$i18n.locale});
             this.$store.dispatch('Memberstuff', this.$route.params.id);


         },
        computed:{
            checkUserAuth(){
                return this.$store.getters.getAuthFlag;
            },
            getAllKeywords(){
                return this.$store.getters.getAllKeywords;
            },
            getSelectedKeywords(){
                return this.$store.getters.getSelectedKeywords;
            },
            getMemberstuff(){
                return this.$store.getters.getMemberstuff;
            },
            getCheckEmailMemberResponse(){
                return this.$store.getters.getCheckEmailMemberResponse;
            },
        },
        watch:{
            '$route'(from, to){
                this.$store.dispatch('userData', {id: from.params.id, lang: from.params.lang});
                this.$store.dispatch('checkUserAuth', from.params.id);

                this.$store.dispatch('Allkeywords', {slug: from.params.id, lang: from.params.lang});
                this.$store.dispatch('SelectedKeywords', {slug: from.params.id, lang: from.params.lang});
                this.$store.dispatch('Memberstuff', from.params.id);
            },
            checkUserAuth(flag){
                if(flag === true) {
                    this.authFlagForEdit = true;

                }else if (flag === false){
                    this.authFlagForEdit = false;

                }
            },

            getAllKeywords(keywords) {

                this.dropdownSelectTags = [];
                this.dropdownSelectTagsWithIds = [];
                if(keywords) {
                    for (let i in keywords) {
                        this.dropdownSelectTags.push(keywords[i].name);
                        this.dropdownSelectTagsWithIds.push(keywords[i])
                    }

                }

            },
               getSelectedKeywords(keywords){

                   this.comboboxTags = [];
                   this.keywords = [];
                   if (keywords) {


                       for (let i in keywords) {

                           this.keywords.push(keywords[i]);
                           this.comboboxTags.push(keywords[i]);
                       }

                   }


            },
               getMemberstuff(member){
                   this.memberstuff=[];
                if(member.length !== 0) {
                    for(let i in member) {
                        this.memberstuff.push(member[i]);
                    }
                    this.loadingStuff = false;
                    this.noStuff = false;
                }else {
                    this.loadingStuff = false;
                    this.noStuff = true;
                }
            },
            getCheckEmailMemberResponse(res)
            {
            console.log(res);
            if(res !=null)
            {
               if(res==false)
                {
                  this.diabledtext=true;
                  this.diabledsearch=false;
                }
                else
                {
                    this.diabledtext=false;
                      this.diabledsearch=true;
                }
            }




            },
        },
        methods:{
           editTags()
           {
   this.editTagsDialog=true;
           },
              editStuff()
           {

   this.editStuffDialog=true;
           },
           CancelStuff()
           {
             this.memberstuffName=null;
            this.memberstuffJobtitle=null;
            this.editStuffDialog = false;
            this.diabledsearch = false;
           },


                 saveTagsData(){


                 this.$store.commit('setClearAppMsgs');
                if(this.$refs.editkeywords.validate() ) {
                    let tagesslected_ids = [];
                    for(let i in this.comboboxTags){
                        tagesslected_ids.push(
                            this.dropdownSelectTagsWithIds.find(id => id.name === this.comboboxTags[i]).id
                        )
                    }
                this.$store.dispatch('saveTagsData', {
                        slug: this.$route.params.id,
                        tags: tagesslected_ids,
                    lang: this.$i18n.locale,

                    });
               this.editTagsDialog=false;

                }

            },
            CheckEmailMember(email)
            {
                if(this.memberstuffName !== '' ) {
                    this.$store.commit('setClearAppMsgs');
                    this.$store.dispatch('CheckEmailMember', {
                        name: this.memberstuffName,
                    });
                }else {
                    this.$store.commit('setAppMsgs', {
                        msg: 'profile.faqs.Please Fill all inputs!',
                        color: "info",
                        icon: "info"
                    })
                }
            },
               SaveStuffMemberData(){


                   this.$store.commit('setClearAppMsgs');
                if(this.memberstuffName !== '' && this.memberstuffJobtitle!=='') {
                this.$store.dispatch('SaveStuffMemberData', {
                        slug: this.$route.params.id,
                        name: this.memberstuffName,
                       jobtitle: this.memberstuffJobtitle,


                    });
                    this.memberstuffName = '';
                    this.memberstuffJobtitle = '';
                this.editStuffDialog=false;
                this.diabledsearch = false;

                }else {
                    this.$store.commit('setAppMsgs', {
                        msg:'profile.faqs.Please Fill all inputs!',
                        color: "info",
                        icon: "info"
                    })
                }

            },
             deleteMember(stuffid){
                 this.$store.commit('setClearAppMsgs');
                 this.$store.dispatch('DeleteStuffMember', {
                     slug: this.$route.params.id,
                     stuffid:stuffid,
                 });

            },
            goToProfile(slugToGo, profileType){
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
                // this.$router.replace({name: "individualProfile", params: { id: slug, lang: this.$route.params.lang}});
            }
        }
    }
</script>

<style scoped>
    .scroll-staff {
        overflow-y: auto;
        max-height: 130px;
    }
    .edit-btn{
        right: 0;position: absolute;top: 0px;
    }
</style>
