<template>
    <v-card flat>
        <v-overlay
                absolute
                :value="loading"
        >
            <v-layout
                    fill-height
                    align-center
                    justify-center
                    ma-0
            >
                <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
            </v-layout>
        </v-overlay>
        <v-card-title >
            {{$t('personalProfile.settings-view.Basic Info')}}
        </v-card-title>
        <v-card-text style="    padding-bottom: 30px;">
            <v-form ref="form" >
                <v-layout row wrap>
                    <v-flex d-flex lg2 xs12 justify-center>
                        <!--                       ///////////div for image input-->
                        <div style="text-align: center;width: fit-content;margin: auto">
                            <header style="font-size: 16px;color: #979797;"> {{$t('registration.personalProfileRegisteration.Upload new Image')}}</header>

                            <v-hover>
                                <v-img
                                        slot-scope="{ hover }"
                                        class="img-selection"
                                        height="120" width="120"
                                        :src="imgSrc"
                                        @click="$refs.fileInput.click()"
                                >
                                    <v-fade-transition name="fade">

                                        <div

                                                v-if="hover"
                                                class="d-flex fade-transition v-card--reveal display-5 white--text hover-upload"
                                        >
                                            <v-layout row wrap justify-center align-center>
                                                <div>
                                                    <v-icon size="30" color="white">mdi-upload</v-icon>
                                                    <v-card-text class="pa-0" style="font-size: 12px !important;">
                                                        {{$t('registration.personalProfileRegisteration.Upload Image')}}
                                                    </v-card-text>
                                                    <input alt="image" style="display: none" ref="fileInput" type="file" accept="image/*" @change="onImageChange">
                                                </div>
                                            </v-layout>
                                        </div>
                                    </v-fade-transition>
                                </v-img>
                            </v-hover>
                            <span style="color: red;font-size: 16px;" v-if="reqImage">{{errorImageMsg === 'image size' ? $t('registration.personalProfileRegisteration.image size') : errorImageMsg === 'only types' ? $t('registration.personalProfileRegisteration.only types') : ''}}</span>

                        </div>


                    </v-flex>

                </v-layout>
                <v-divider dark></v-divider>
                <v-layout row wrap  >
                    <v-flex d-flex lg4 xs10  >

                        <v-combobox
                                v-model="userbusinessCountry"
                                :items="userbusinessCountryitems"
                                style="border-radius: 30px; margin-right:10px"
                                :label="$t('personalProfile.settings-view.Country')"
                                :menu-props="{maxHeight: 200}"
                                color="#E60000"
                                :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
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
                        </v-combobox>
                    </v-flex>


                </v-layout>
                <v-layout row wrap>
                    <v-flex d-flex lg4 xs10  >

                        <v-combobox
                                v-model="userJobField"
                                :items="jobFields"
                                :menu-props="{maxHeight: 200}"
                                style="border-radius: 30px; margin-right:10px"
                                :label="$t('registration.personalProfileRegisteration.job Field')"

                                color="#E60000"
                                :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                                @change="loadJobsTitles()"
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
                        </v-combobox>
                    </v-flex>
                    <v-flex d-flex lg4 xs10  >
                        <v-autocomplete
                                :menu-props="{maxHeight: 200}"
                                v-model="userJobtitle"
                                :items="jobtitles"
                                :label="$t('registration.personalProfileRegisteration.job title')"
                                color="#E60000"
                                :disabled="disableJobTitle"
                                :loading="disableJobTitle"
                                :return-object="true"
                                :rules="[value => !!value || $t( 'registration.signup.required' )]"

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
                    </v-flex>
                </v-layout>
                <v-divider dark></v-divider>

                <v-card-title class="pr-0 pl-0" style="color:black">
                    {{$t('personalProfile.settings-view.Contact Info')}}
                </v-card-title>



                <v-layout row wrap  >
                    <v-flex d-flex lg4 xs10 style="    margin-right: 10px;" >

                        <v-layout row wrap >
                            <div style="margin-bottom: 35px;width: 100%; direction: ltr">
                                <vue-tel-input
                                        :value="value"
                                        :valid-characters-only="true"
                                        :disabledFetchingCountry="false"
                                        @input="onInput"
                                        :placeholder="$t('registration.personalProfileRegisteration.phone number')"
                                ></vue-tel-input>
                            </div>
                        </v-layout>

                    </v-flex>
                    <v-flex d-flex lg4 xs10  >

                        <v-layout row wrap  >
                            <v-text-field
                                    v-model="memberemail"
                                    style="border-radius: 30px; margin-right:10px"
                                    :label="$t('personalProfile.settings-view.Email Address')"

                                    color="#E60000"
                                    :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' ), value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || $t('registration.signup.emailvalid')]"
                                    :error-messages="errors !== '' ? $t(errors) : ''"
                                    @blur="checkEmail()"

                                    disabled
                            ></v-text-field>


                        </v-layout>

                    </v-flex>
                </v-layout>
                <v-layout row wrap  >
                    <v-flex d-flex lg4 xs10  >

                        <v-layout row wrap >
                            <v-textarea
                                    v-model="address"
                                    style="border-radius: 30px; margin-right:10px"
                                    :label="$t('personalProfile.settings-view.Address')"
                                    no-resize
                                    color="#E60000"
                                    auto-grow
                                    row-height="26"
                                    rows="2"
                            ></v-textarea>
                        </v-layout>

                    </v-flex>


                </v-layout>
                <v-layout row wrap  style="justify-content: flex-end">
                    <v-btn
                            rounded
                            @click="SaveProfileData()"
                            small
                            color="#E60000"
                            elevation="0"
                            text
                    >
                        {{$t('personalProfile.settings-view.save changes')}}
                    </v-btn>
                </v-layout>

            </v-form>
            <v-divider class="mt-5 mb-0"></v-divider>
            <!--                   password section-->
            <v-card-title class="pr-0 pl-0" style="color:black">
                {{$t('personalProfile.settings-view.Account Settings')}}
            </v-card-title>
            <v-form
                    ref="ChangePasswordform" >
                <v-layout row wrap>

                    <v-flex d-flex lg4 xs10  >
                        <v-layout row wrap  >
                            <v-text-field
                                    v-model="oldPassword"
                                    :type="show ? 'text' : 'password'"
                                    :append-icon="show ? 'visibility' : 'visibility_off'"
                                    @click:append="show = !show"

                                    style="border-radius: 30px; margin-right:10px"
                                    :label="$t('personalProfile.settings-view.Old Password')"
                                    maxlength="16"
                                    color="#E60000"
                                    :rules="[value => !!value || $t('registration.signup.required'),value => value.length >= 6 || $t('registration.signup.Minimum 6 characters')]"
                            ></v-text-field>
                        </v-layout>
                    </v-flex>

                    <v-flex d-flex lg4 xs10 >
                        <v-layout row wrap  >
                            <v-text-field
                                    v-model="newPassword"
                                    :type="show ? 'text' : 'password'"
                                    :append-icon="show ? 'visibility' : 'visibility_off'"
                                    @click:append="show = !show"
                                    maxlength="16"

                                    style="border-radius: 30px; margin-right:10px"
                                    :label="$t('personalProfile.settings-view.New Password')"

                                    color="#E60000"
                                    :rules="[value => !!value || $t('registration.signup.required'),value => value.length >= 6 || $t('registration.signup.Minimum 6 characters')]"
                            ></v-text-field>
                        </v-layout>
                    </v-flex>


                    <v-flex d-flex lg4 xs10  >
                        <v-layout row wrap  >
                            <v-text-field
                                    v-model="confirmPassword"
                                    :type="show ? 'text' : 'password'"
                                    :append-icon="show ? 'visibility' : 'visibility_off'"
                                    @click:append="show = !show"

                                    style="border-radius: 30px; margin-right:10px"
                                    :label="$t('personalProfile.settings-view.Confirm Password')"

                                    color="#E60000"
                                    :rules="[value => !!value || $t('registration.signup.required'),newPassword === confirmPassword || $t('registration.signup.Password must match')]"
                            ></v-text-field>
                        </v-layout>
                    </v-flex>
                    <v-layout row wrap style="    justify-content: flex-end;">
                        <v-btn
                                @click="ChangePassword()"
                                small
                                color="#E60000"
                                elevation="0"
                                rounded
                                text
                        >
                            {{$t('personalProfile.settings-view.change password')}}
                        </v-btn>
                    </v-layout>
                </v-layout>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    import { VueTelInput } from 'vue-tel-input';
    import userInfoMixin from "../userInfoMixin"

    export default {
        mixins:[userInfoMixin],

        name: "settings-view",
        components:{
            VueTelInput
        },
        data:()=>{
            return {
                show: false,
                imageSelected: '',
                loading: true,
                phone: {
                    number: '',
                    valid: true,
                    country: undefined,
                },
                value: '',
                rules: {
                    imageSize: value => !value || value.size < 2000000 || 'Slider image size should be less than 2 MB!'
                },
                emailRules: [
                    (v) => !!v || 'E-mail is required',
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    (v) => !!v || 'Password is required',
                    (v) => v && v.length >= 6 || 'Password must be more than 6 characters'
                ],


                userbusinessCountry: "",
                userbusinessCountryitems: [],
                userJobtitleitems: [],
                errors: '',
                id: '',
                errorimage: '',
                memberemail: '',
                address: '',
                tele: '',
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',

                imgSrc: '',
                reqImage: false,
                errorImageMsg: '',
                file: '',

                allCountriesWithId: [],


                jobtitlesWithIds: [],
                jobFields:[],
                jobtitles: [],
                allJobFieldsWithIds:[],
                userJobField: '',
                disableJobTitle: true,
                userJobtitle: '',

                allData:null,

                userjobFieldBeforeLoad: '',
                userjobTitleBeforeLoad: '',
            }
        },
        created()
        {

            this.allData = this.$store.state.profiles.userData;
            // this.$store.dispatch('AllJobField', {lang: this.$route.params.lang});
            this.$store.dispatch('AllCountry', {lang: this.$route.params.lang});

            // this.$store.dispatch('userData', {id:this.$route.params.id, lang:this.$i18n.locale});

        },
        computed: {
            PasswordConfirmationRules() {
                return [
                    () => (this.newPassword === this.confirmPassword) || 'Password must match',
                    v => !!v || 'Confirmation Password is required',
                    v => v && v.length >= 6 || 'Password must be more than 6 characters'

                ];
            },

            getUserData() {

                return this.$store.state.userData;
            },
            getAllCountry() {
                return this.$store.getters.getAllCountry;
            },
            getAllJobTitle() {
                return this.$store.getters.getAllJobTitle;
            },
            getallJobField(){
                return this.$store.getters.getallJobField;
            },

            getAppMsgs(){
                return this.$store.getters.getAppMsgs;
            }

        },
        watch:{
            allData: function (data) {
                this.loading = true;

                if (data) {
                    this.$store.dispatch('AllJobField', {lang: this.$route.params.lang});
                    this.id=data.id;
                    this.imageSelected= data.profile_pic;
                    this.userJobField= data.jobfield;
                    this.userJobtitle = data.jobtitle;
                    this.userjobTitleBeforeLoad = data.jobtitle;
                    this.userbusinessCountry = data.country;
                    this.memberemail = data.email;
                    this.value= data.phone;
                    this.address= data.address;
                    this.imgSrc = '/images/med/'+data.profile_pic;
                    this.userjobFieldBeforeLoad = data.jobfield;

                    this.loading = false;

                }
            },
            '$route'(from, to){
                this.disableJobTitle = true;
                this.loading = true;
                this.userbusinessCountryitems=[];
                this.jobFields = [];
                this.allJobFieldsWithIds= [];
                this.jobtitles = [];
                this.jobtitlesWithIds = [];
                this.userJobField = '';
                this.userJobtitle = '';
                this.userbusinessCountry = '';

                this.$store.dispatch('AllCountry', {lang: this.$route.params.lang});
                // this.$store.dispatch('AllJobField', {lang: this.$route.params.lang});
                this.$store.dispatch('userData', {id:this.$route.params.id, lang: this.$route.params.lang}).then(()=>{

                }).finally(()=>{
                    this.allData = this.$store.state.profiles.userData;
                });

            },
            getallJobField(jobField){
                this.jobFields = [];
                this.allJobFieldsWithIds= [];
                if (jobField) {
                    for (let i in jobField) {
                        this.jobFields.push(jobField[i].name);
                        this.allJobFieldsWithIds.push(jobField[i]);
                    }
                    this.loadJobTitlesFirstTime(this.userjobFieldBeforeLoad);
                    this.loading = false;
                }
            },
            getUserData(data) {
                this.loading = true;
                console.log("LANG CALLED ", data)
                if (data) {
                    this.$store.dispatch('AllJobField', {lang: this.$route.params.lang});
                    this.id=data.id;
                    this.imageSelected= data.profile_pic;
                    this.userJobField= data.jobfield;
                    this.userJobtitle = data.jobtitle;
                    this.userjobTitleBeforeLoad = data.jobtitle;
                    this.userbusinessCountry = data.country;
                    this.memberemail = data.email;
                    this.value= data.phone;
                    this.address= data.address;
                    this.imgSrc = '/images/med/'+data.profile_pic;
                    this.userjobFieldBeforeLoad = data.jobfield;

                    this.loading = false;


                }

            },
            getAllCountry(country) {
                this.userbusinessCountryitems=[];
                this.allCountriesWithId = [];
                if (country) {
                    for (let i in country) {
                        this.userbusinessCountryitems.push(country[i].name);
                        this.allCountriesWithId.push(country[i]);
                    }
                    this.loading = false;
                }
            },
            getAllJobTitle(jobtitle) {
                this.jobtitles = [];
                this.jobtitlesWithIds = [];
                if (jobtitle) {
                    console.log("jobtitle",jobtitle);
                    for (let i in jobtitle) {
                        this.jobtitles.push(jobtitle[i].name);
                        this.jobtitlesWithIds.push(jobtitle[i]);
                    }
                    this.userJobtitle = this.userjobTitleBeforeLoad;

                    this.disableJobTitle = false;
                    this.loading = false;
                }
            },
            getAppMsgs(flagError){
                if(flagError.appSnackbarColor === 'error' ) {
                    this.loading = false;
                }
            }

        },
        methods:{
            perview(e){
                console.log(e);

///////////start grapping the photo and showing it to user
                let set = e.target.files;
                const fr = new FileReader();
                fr.readAsDataURL(set[0]);
                fr.addEventListener('load', () => {
                    this.imageSelected = fr.result;
                });
            },

            loadJobsTitles(){
                this.disableJobTitle = true;
                let jobfield_id = this.allJobFieldsWithIds.find(id => id.name === this.userJobField ).id;
                this.$store.dispatch('AllJobTitle', {lang: this.$route.params.lang, id: jobfield_id });
            },
            loadJobTitlesFirstTime(userjobFieldBeforeLoad){
                this.disableJobTitle = true;
                let jobfield_id = this.allJobFieldsWithIds.find( id => id.name === userjobFieldBeforeLoad ).id;
                this.$store.dispatch('AllJobTitle', {lang: this.$route.params.lang, id: jobfield_id });
            },
            onImageChange(e){
                this.reqImage =false;
                this.file = e.target.files[0];
                let FileSize = this.file.size / 1024 / 1024;
                let acceptedImageTypes = [ 'image/jpeg', 'image/png'];
                if (FileSize > 2) {
                    this.errorImageMsg = 'image size';
                    this.reqImage =true;
                    this.imgSrc = '/images/imagePlaceholder.png';
                }
                else  if(!acceptedImageTypes.includes(this.file.type))
                {
                    this.errorImageMsg = 'only types';
                    this.reqImage =true;
                    this.imgSrc = '/images/imagePlaceholder.png';
                } else {
                    this.errorImageMsg='';
                    this.imgSrc = URL.createObjectURL(this.file);
                }

            },
            checkEmail(){

                axios.post('/vue/checkmemberemailsetting',{id:this.id,email:this.memberemail}).then(valid => {

                    if(valid.data === false){

                        this.errors = 'registration.professionalRegisteration.this email already taken!'
                    }
                    else
                    {
                        this.errors = ''
                    }
                })

            },


            onInput(formattedNumber, { number, valid, country }) {
                this.phone.number = number.international;
                this.phone.valid = valid;
                this.phone.country = country && country.name;

            },
            SaveProfileData()
            {


                this.$store.commit('setClearAppMsgs');

                if(this.phone.number==='')
                {
                    this.tele=this.value
                }
                else
                {   this.tele=this.phone.number

                }

                if (this.$refs.form.validate() && this.errors==='' && this.errorImageMsg==='' && this.phone.valid) {
                    let country_id = this.allCountriesWithId.find(id => id.name === this.userbusinessCountry);
                    let jobField_id = this.allJobFieldsWithIds.find(id => id.name === this.userJobField);
                    let jobTitle_id = this.jobtitlesWithIds.find(id => id.name === this.userJobtitle);
                    this.$store.dispatch('saveMemberProfileEditData', {
                        slug: this.$route.params.id,
                        image: this.file,
                        country: country_id.country_id,
                        jobtitle: jobTitle_id.jobtitle_id,
                        jobfield: jobField_id.id,
                        address:this.address,
                        phone:this.tele,
                        lang: this.$route.params.lang,
                        // memberemail:this.memberemail,





                    });

                } else {
                    this.$store.commit('setAppMsgs', {
                        msg: "registration.professionalRegisteration.Please Check all inputs",
                        color: "info",
                        icon: "info"
                    })
                }

            },

            ChangePassword(){

                if (this.$refs.ChangePasswordform.validate() ) {

                    this.$store.dispatch('ChangePassword', {

                        slug: this.$route.params.id,
                        oldpassword: this.oldPassword,
                        newpassword:this.newPassword,
                        confirmpassword:this.confirmPassword,





                    });

                }

            },



        }
    }
</script>

<style scoped>
    >>>.v-text-field--filled.v-input__control>.v-input__slot, .v-text-field--full-width.v-input__control>.v-input__slot, .v-text-field--outlined.v-input__control.v-input__slot {
        align-items: stretch;
        min-height: 45px !important;
    }


    >>>.img-selection{
        border-radius: 50%;
        cursor: pointer;
        margin: auto;
        background-color: #f1f1f1;
    }
    >>>.hover-upload{
        height: 100%;
        text-align: center;
        border-radius: 50%;
        background-color: rgba(255, 0, 0, 0.3);
        border:2px #E60000 solid;
    }



    >>>.v-text-field {
        padding-top: 1px;
        margin-top: 4px !important;
    }
    /*/////////// styling for vue-tel-input//////////*/
    >>>.vue-value-number-input .select-country-container .input-country-selector input {
        border-radius: 30px 0 0 30px!important;
    }
    >>>.vue-value-number-input .input-value-number input {
        margin-left: 0 !important;
        border-radius: 0 30px 30px 0!important;
    }
    >>>.dropdown ul{
        display: block ;
    }
    >>>.dropdown-item:hover {
        background-color: #e2e2e2 !important;
        color: #000000 !important;
    }
    >>>.vue-tel-input[data-v-32fdfc12]:focus-within {
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 5px rgba(233, 102, 102, 0.6);
        border-color: #e60000;
    }
    >>>.vue-tel-input {
        display: flex;
        border: 1px solid #919191;
        text-align: left;
        border-radius: 0px !important;
        font-size: 11px !important;
        direction: ltr !important;
    }
    >>>div.vue-tel-input ul{
        z-index: 1;
        padding: 0;
        margin: 0;
        text-align: left;
        list-style: none;
        max-height: 200px;
        overflow-y: scroll;
        position: absolute;
        top: 33px;
        left: -1px;
        background-color: #fff;
        width: 272px !important;
        font-size: 13px;
        box-shadow: 0 2px 2px 2px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)
    }
    >>>.dropdown-item {
        background-color: #f9f9f9 !important;
        color: #535353 !important;
        border-bottom: 0px solid #61606057 !important;
        text-align: left !important;
        transition: 0.2s !important;
        cursor: pointer;
        padding: 7px 7px !important;
        width: 410px !important;
        font-weight: 100;
    }
    >>>.vue-tel-input {
        border-radius: 3px;
        display: flex;
        border: 1px solid #ffffff;
        text-align: left;
        height: 34px;
    }
    >>>.error-vue-tel-input{
        border: 1px solid red;
    }
    /*///////////end/////////*/

</style>
