<template>
    <v-container fluid class="pa-0">


            <v-flex xl10 lg12 v-if="viewFirstStep" style="margin: auto">
                <v-card-title class="pr-0 pl-0  pt-0" style="height: fit-content;color:#E60000">
                    {{$t('registration.personalProfileRegisteration.Personal Info')}}
                </v-card-title>

<!--                <v-card-title class="headline pt-0" style="height: fit-content;color:#E60000">-->
<!--                  //  Personal Info-->
<!--                </v-card-title>-->
                <v-card>
                <v-card-title class="pt-0" style="justify-content: center;">
                    <v-flex xl5 lg6 md7>
                        <v-form ref="basicInfoForm">
                            <v-layout row wrap style="justify-content: center">

                                <v-flex xl5 lg5 md5 sm5 style="margin: 5px">

                                    <v-menu
                                            ref="menu"
                                            v-model="bdMenu"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"

                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field

                                                    v-model="date"
                                                    :label="$t('registration.personalProfileRegisteration.Date Of Birth')+'*'"
                                                    readonly
                                                    v-on="on"
                                                    color="#E60000"
                                                    :rules="[ value => !!value || $t( 'registration.signup.required' ) ]"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                                ref="bdPicker"
                                                show-current="false"
                                                :min="new Date('1960').toISOString().substr(0, 10)"
                                                :max="new Date('2010').toISOString().substr(0, 10)"
                                                color="#E60000"
                                                v-model="date"
                                                @input="bdMenu = false"
                                                :locale="loclization"
                                        ></v-date-picker>
                                    </v-menu>
                                    <v-card-title class="pa-0" style="font-size: 16px;color: #979797;">{{$t('registration.personalProfileRegisteration.Gender')+'*'}}</v-card-title>
                                    <v-radio-group

                                        v-model="gender"
                                        style="margin-top: 0"
                                        row
                                        color="#E60000"
                                        :rules="[ value => !!value || $t( 'registration.signup.required' ) ]"

                                    >
                                        <v-radio value="1" color="#E60000" :label="$t('registration.personalProfileRegisteration.Male')"></v-radio>
                                        <v-radio value="2" color="#E60000" :label="$t('registration.personalProfileRegisteration.Female')"></v-radio>
                                    </v-radio-group>
                                    <!--                       ///////////div for image input-->
                                    <div style="text-align: center;width: fit-content;margin: auto">
                                        <header style="font-size: 16px;color: #979797;"> {{$t('registration.personalProfileRegisteration.Upload new Image')}}</header>

                                        <v-hover>
                                            <v-img
                                                    slot-scope="{ hover }"
                                                    class="img-selection"
                                                    height="150" width="150"
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
                                                                <v-icon size="35" color="white">mdi-upload</v-icon>
                                                                <v-card-text class="pa-0">
                                                                    {{$t('registration.personalProfileRegisteration.Upload Image')}}
                                                                </v-card-text>
                                                                <input alt="image" style="display: none" ref="fileInput" type="file" accept="image/*" @change="onFileChange">
                                                            </div>
                                                        </v-layout>
                                                    </div>
                                                </v-fade-transition>
                                            </v-img>
                                        </v-hover>
                                        <span style="color: red;font-size: 16px;word-break: normal" v-if="reqImage">{{errorImageMsg === 'image size' ? $t('registration.personalProfileRegisteration.image size') : errorImageMsg === 'only types' ? $t('registration.personalProfileRegisteration.only types') : ''}}</span>

                                    </div>

                                </v-flex>
                                <v-flex xl5 lg5 md5 sm5 style="margin: 5px">
                                    <v-autocomplete
                                            :menu-props="{maxHeight: 200}"
                                        v-model="usercountry"
                                        :items="countries"
                                        :label="$t('registration.personalProfileRegisteration.country')+'*'"
                                        color="#E60000"
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
                                    <v-autocomplete
                                            :menu-props="{maxHeight: 200}"
                                        v-model="userJobField"
                                        :items="jobFields"
                                        :label="$t('registration.personalProfileRegisteration.job Field')+'*'"
                                        color="#E60000"


                                            :return-object="true"
                                            :rules="[value => !!value || $t( 'registration.signup.required' )]"

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
                                    </v-autocomplete>
                                    <v-autocomplete
                                            :menu-props="{maxHeight: 200}"
                                            v-model="userjobtitle"
                                            :items="jobtitles"
                                            :label="$t('registration.personalProfileRegisteration.job title')+'*'"
                                            color="#E60000"
                                            :disabled="disableJobTitle"
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
                                    <div>
                                    <vue-tel-input
                                            :class="[showErrorPhone ? 'error-vue-tel-input' : '']"
                                            style="margin: 10px 10px 0 10px ;"
                                            :value="phoneNumber"
                                            :valid-characters-only="true"
                                            @input="onInput"
                                            :placeholder="$t('registration.personalProfileRegisteration.phone number')"
                                    ></vue-tel-input>
                                        <span v-if="showErrorPhone" style="color: red;font-size: 13px;margin-left: 10px;">
                                            {{phoneValidation === 'repeated phone' ? $t('registration.personalProfileRegisteration.repeated phone') : phoneValidation === 'notvalid phone' ? $t('registration.personalProfileRegisteration.notvalid phone') : ''}}
                                        </span>
                                    </div>

                                </v-flex>

                            </v-layout>
                        </v-form>
                    </v-flex>


                    <v-flex xl5 lg5 md5 sm8 xs12 style="padding-top: 45px;">
                        <GmapAutocomplete
                                style="width: 100%;border: 1px solid #E60000;border-radius: 10px 10px 0 0;padding-left: 3px;padding-right: 3px;"
                            :placeholder="$t('registration.personalProfileRegisteration.Search location')"
                            @place_changed="usePlace"
                            @change="usePlace"
                                id="autoCompMap"

                        />
                        <GmapMap
                            ref="mapRef"
                            :center="{lat:latCo, lng:lngCo}"
                            :zoom="zoom"
                            map-type-id="terrain"
                            style="height: 300px;border: 1px #E60000 solid;"
                            :options="{

                       zoomControl: true,
                       mapTypeControl: false,
                       scaleControl: false,
                       streetViewControl: false,
                       rotateControl: false,
                       fullscreenControl: true,
                       disableDefaultUi: false,
                       ControlPosition: true,
                     }"
                        >

                            <GmapMarker

                                :position="google && new google.maps.LatLng(latCo, lngCo) "
                                :clickable="true"
                                :draggable="false"
                                @click="center=google && new google.maps.LatLng(latCo, lngCo)"

                            />

                        </GmapMap>
                        <v-text-field
                                v-model="mapAddress"
                            id="address"
                            style="width:100%;padding-top: 0"
                                :placeholder="$t('registration.personalProfileRegisteration.Address')"
                            color="#e60000"
                            :disabled="editAddress"

                        ></v-text-field>
                    </v-flex>
                    <v-flex xl10 lg11 sm11 style="text-align: end;">
                        <v-btn :loading="loadingNext" rounded elevation="0" dark color="#E60000" @click="submitAndRedirect">
                            {{$t('registration.personalProfileRegisteration.next')}}
                        </v-btn>
                    </v-flex>
                </v-card-title>
                </v-card>

            </v-flex>
            <first-question-confirmation v-if="viewNextStep"></first-question-confirmation>



    </v-container>


</template>

<script>
    import axios from 'axios';
    import {gmapApi} from 'vue2-google-maps';
    import { VueTelInput } from 'vue-tel-input';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // import Geocoder from "@pderas/vue2-geocoder";
    import userInfoMixin from "../userInfoMixin";
    import Store from '../../store/store'


    import firstQuestionConfirmation from "./stepping-msgs/firstQuestionConfirmation";


    export default {
        name: "personalProfileRegisteration",
        components: {
            VueTelInput,
            firstQuestionConfirmation
        },
        mixins: [userInfoMixin],
        data: () => {
            return {
                overlayForAllowLoc: false,
                editAddress: true,
                viewFirstStep: true,
                viewNextStep: false,
                phone: {
                    number: '',
                    valid: true,
                    country: undefined,
                },
                showErrorPhone:false,
                phoneValidation: '',
                usercountry:'',
                userjobtitle:'',
                gender:'',
                loadingNext: false,
                reqImage:false,
                errorImageMsg:'',
                phoneNumber: '',
                date: '',
                loclization: 'en-se',
                menu: false,
                modal: false,
                bdMenu: false,
                rules: {
                    required: value => !!value || 'Required.',
                    minuser: v => v.length >= 3 || 'Minimum 3 characters',
                    maxuser: v => v.length <= 10 || 'Maximum 10 characters',
                    min: v => v.length >= 6 || 'Minimum 6 characters',
                    max: v => v.length <= 32 || 'Maximum 32 characters',
                    email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid",

                },
                countries: [],
                jobtitles: [],

                imgSrc: '/images/imagePlaceholder.png',
                latCo: 31.268205,
                lngCo: 29.9953,
                zoom: 4,
                contriesWithIds:[],

                jobtitlesWithIds: [],
                jobFields:[],
                allJobFieldsWithIds:[],
                userJobField: '',
                mapAddress:'',

                disableJobTitle: true,

                submitDoneFlag: false,
            }
        },

        beforeMount() {
            window.addEventListener("beforeunload", this.preventNav)
        },
        beforeRouteEnter (to, from, next) {
            let slug = localStorage.getItem('s');
            const auth = axios.post('/vue/isUserAuth', {slug: slug});
            const complete = axios.post('/vue/checkcompleteprofile', {slug: slug});
            axios.all([auth, complete]).then(axios.spread((...response) => {

                    if(response[0].data === true && response[1].data === false) {
                        next(true);
                        Store.commit('setDisableMyProfileBtn', false);
                    }else if(response[0].data === "not_auth") {
                        next({
                            name: 'home',
                            params: {
                                lang: to.params.lang,
                            }
                        });
                    }else if(response[1].data === true){
                        next({
                            name: 'personalProfile',
                                params: {
                                lang: to.params.lang,
                                    id: slug
                                }
                        })
                    }
                }));
        },
        beforeRouteLeave(from, to, next){
            if(this.submitDoneFlag === false) {
                if (!window.confirm("Changes that you made may not be saved.")) {
                    return;
                }
                window.removeEventListener("beforeunload", this.preventNav);
                next();
            }else {
                window.removeEventListener("beforeunload", this.preventNav);
                next();
            }


        },
        mounted(){
            this.$nextTick(() => {
                this.$refs.mapRef.$gmapApiPromiseLazy().then(this.loadControls);
            });
        },
        created() {
            this.loclization = this.$i18n.locale + '-se';
            this.$store.dispatch('AllCountry', {lang: this.$i18n.locale});

            this.$store.dispatch('AllJobField', {lang: this.$i18n.locale});
        },
        computed: {
            google: gmapApi,
            getAllCountry() {
                return this.$store.getters.getAllCountry;
            },
            getAllJobTitle() {
                return this.$store.getters.getAllJobTitle;
            },
            getLocaliztion(){
                return this.$i18n.locale;
            },
            getPersonalRegFlag(){
                return this.$store.getters.getPersonalRegFlag;
            },
            getallJobField(){
                return this.$store.getters.getallJobField;
            }
        },
        watch: {
            getallJobField(jobField){
                this.jobFields = [];
                this.allJobFieldsWithIds= [];
                if (jobField) {
                    for (let i in jobField) {
                        this.jobFields.push(jobField[i].name);
                        this.allJobFieldsWithIds.push(jobField[i]);
                    }
                }
            },
            bdMenu (val) {
                val && setTimeout(() => (this.$refs.bdPicker.activePicker = 'YEAR'));
            },
            getPersonalRegFlag(flag){
                if(flag === true){
                    this.submitDoneFlag =true;
                    this.viewFirstStep = false;
                    this.viewNextStep = true;
                    this.$store.commit('setAppMsgs', {
                        msg:"registration.personalProfileRegisteration.Personal data saved",
                        color: "success",
                        icon: "check"
                    });
                }else if(flag ===false){
                    this.loadingNext = false;
                    this.$store.commit('setAppMsgs', {
                        msg:"registration.personalProfileRegisteration.Personal data saved",
                        color: "success",
                        icon: "check"
                    });
                }
            },
            getLocaliztion(lang){
                if(this.$refs.basicInfoForm) {
                    this.$refs.basicInfoForm.reset();
                    this.loclization = lang + '-se';
                }
            },


            getAllCountry(country) {
                this.countries = [];
                this.contriesWithIds = [];
                if (country) {
                    for (let i in country) {
                        this.countries.push(country[i].name);
                        this.contriesWithIds.push(country[i]);
                    }
                    this.geolocation();


                }
            },
            getAllJobTitle(jobtitle) {
                this.jobtitles = [];
                this.jobtitlesWithIds = [];
                if (jobtitle) {
                    for (let i in jobtitle) {
                        this.jobtitles.push(jobtitle[i].name);
                        this.jobtitlesWithIds.push(jobtitle[i]);
                    }
                    this.disableJobTitle = false;
                }
            },

        },


        methods: {
            preventNav(event) {
                event.preventDefault();
                event.returnValue = "";
            },
            loadControls(mapRef) {
                var controlDiv = document.createElement('div')
                var firstChild = document.createElement('button')
                firstChild.style.backgroundColor = '#fff'
                firstChild.style.border = 'none'
                firstChild.style.outline = 'none'
                firstChild.style.width = '28px'
                firstChild.style.height = '28px'
                firstChild.style.borderRadius = '2px'
                firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)'
                firstChild.style.cursor = 'pointer'
                firstChild.style.marginRight = '10px'
                firstChild.style.padding = '0px'
                firstChild.title = 'Your Location'
                controlDiv.appendChild(firstChild)
                var secondChild = document.createElement('div')
                secondChild.style.margin = '5px'
                secondChild.style.width = '18px'
                secondChild.style.height = '18px'
                secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)'
                secondChild.style.backgroundSize = '180px 18px'
                secondChild.style.backgroundPosition = '0px 0px'
                secondChild.style.backgroundRepeat = 'no-repeat'
                secondChild.id = 'you_location_img'
                firstChild.appendChild(secondChild)
                window.google.maps.event.addListener(this.$refs.mapRef.$mapObject, 'center_changed', function () {
                    secondChild.style['background-position'] = '0 0'
                });
                let ref = this;
                firstChild.addEventListener('click', function () {
                    document.getElementById('autoCompMap').value = '';
                    ref.geolocation();
                });
                controlDiv.index = 1
                this.$refs.mapRef.$mapObject.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv)
            },
            geolocation() {
                this.overlayForAllowLoc = true;
                navigator.geolocation.getCurrentPosition(this.buildUrl, this.errorLoc);
                this.zoom = 14;
            },
            errorLoc(err) {
                Vue.$geocoder.setDefaultMode('address');      // this is default
                var addressObj = {
                    country: 'Egypt',
                };
                Vue.$geocoder.send(addressObj, response => {
                    this.latCo = response.results[0].geometry.location.lat;
                    this.lngCo = response.results[0].geometry.location.lng
                });
                this.zoom = 4;
                this.mapAddress = 'Egypt';


            },

            getAddress(address, callback) {
                this.$gmapApiPromiseLazy().then(() => {
                    let geocoder = new google.maps.Geocoder();
                    let latlng = {lat: this.latCo, lng: this.lngCo};
                    geocoder.geocode({'location': latlng}, function (results, status) {
                        if (status === 'OK') {
                            if (results) {

                                callback(results[0].formatted_address);
                            }
                        }
                    });
                });
            },
            buildUrl(position) {
                this.latCo = position.coords.latitude;
                this.lngCo = position.coords.longitude;
                let ref = this;
                this.getAddress("address", function (location) {
                    ref.mapAddress = location;
                });

            },


            usePlace(place) {

                if (place.adr_address !== undefined) {
                    this.latCo = place.geometry.location.lat();
                    this.lngCo = place.geometry.location.lng();
                    let ref = this;
                    this.getAddress("address", function (location) {
                        ref.mapAddress = location;
                    });
                    this.editAddress = true;
                } else if (place.adr_address === undefined) {
                    this.editAddress = false;
                }
            },
            onFileChange(e) {

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
            browseImage() {

            },
            onInput(formattedNumber, {number, valid, country}) {
                console.log(valid,"PHONEEE")
                this.phone.number = number.international;
                this.phone.valid = valid;
                this.phone.country = country && country.name;
                if(this.phone.valid){
                    this.phoneValidation = "";
                    axios.post('/vue/checknumberpersonalvalid',{phone:this.phone.number}).then(res => {

                        if(res.data === false){

                            this.phoneValidation = "repeated phone";
                            this.showErrorPhone=true;
                        }
                        else
                        {
                            this.phoneValidation = "";
                            this.showErrorPhone=false;
                        }
                    });
                } else {
                    this.phoneValidation = "notvalid phone";
                    this.showErrorPhone=true;
                }

            },
            loadJobsTitles(){
                this.disableJobTitle = true;
                let jobfield_id = this.allJobFieldsWithIds.find(id => id.name === this.userJobField ).id;
                this.$store.dispatch('AllJobTitle', {lang: this.$i18n.locale, id: jobfield_id });
            },
            submitAndRedirect() {

                this.$store.commit('setClearAppMsgs');
                if (this.$refs.basicInfoForm.validate() && this.reqImage===false && this.showErrorPhone===false) {
                    this.loadingNext = true;
                    let country_id = this.contriesWithIds.find(id => id.name === this.usercountry);
                    let jobField_id = this.allJobFieldsWithIds.find(id => id.name === this.userJobField);
                    let jobTitle_id = this.jobtitlesWithIds.find(id => id.name === this.userjobtitle);
                    console.log(country_id, jobTitle_id, "OBJCT");
                    this.$store.dispatch('savePersonalProfileData', {
                        logo: this.file,
                        gender: this.gender,
                        date: this.date,
                        country: country_id.country_id,
                        jobtitle: jobTitle_id.jobtitle_id,
                        jobfield: jobField_id.id,
                        phone: this.phone.number,
                        address: this.mapAddress,
                        lat: this.latCo,
                        lng: this.lngCo,
                        lang: this.$i18n.locale,
                        slug: localStorage.getItem('s'),
                    });
                    this.file = '';
                    window.removeEventListener("beforeunload", this.preventNav);
                }
                else {
                    this.$store.commit('setAppMsgs', {
                        msg: "registration.personalProfileRegisteration.Please Fill all inputs And Check Telephone!",
                        color: "info",
                        icon: "info"
                    })
                }

            }
        }
    }
</script>

<style scoped>
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
        width: 226px !important;
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
    >>>label {
        display: inline-block;
        margin-bottom: 0 !important;
    }

    >>>.v-responsive__sizer~.v-responsive__content {
         margin-left: 0;
    }
</style>
