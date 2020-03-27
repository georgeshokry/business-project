<template>
    <v-container class="pa-0" style="background-color: white;">

    <v-flex lg7 xl5 style="margin: auto">
        <v-layout class="mr-2 ml-2" justify-space-between style="height: 40px; ">
            <v-btn icon color="#E60000" to="choose-type" v-if="e1 !== 4">
                <v-icon size="25" color="#E60000">{{vuetifyRtl}}</v-icon>
            </v-btn>
            <div>
                <v-layout>
                <img
                        alt="Professional"
                        height="50px"
                        width="30px"
                        style="margin: auto;"
                        src="/images/Professional_Red.svg"
                >
                </v-layout>
            </div>
        </v-layout>
    <v-stepper v-model="e1" alt-labels :vertical="false" >
        <v-stepper-header>
            <v-stepper-step color="#E60000" :complete="e1 > 1" :class="[ e1 === 1 ? 'v-stepper__step-activenow': 'v-stepper__step-not']" step="1" style="font-size: 15px;">{{$t('registration.professionalRegisteration.Business Info')}}</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step color="#E60000" :complete="e1 > 2" :class="[ e1 === 2 ? 'v-stepper__step-activenow': 'v-stepper__step-not']" step="2" style="font-size: 15px;">{{$t('registration.professionalRegisteration.Business Contacts')}}</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step color="#E60000" :complete="e1 > 3" :class="[ e1 === 3 ? 'v-stepper__step-activenow': 'v-stepper__step-not']"  step="3" style="font-size: 15px;">{{$t('registration.professionalRegisteration.Products & Services')}}</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
<!--            ////////////////////////{{{{{{{{{FIRST STEP}}}}}}}}/////////////////-->
            <v-stepper-content step="1">
                <v-form
                        ref="step1Form"
                >
                <v-card
                        flat
                        class="mb-5"
                        height="fit-content"
                >
                    <v-container >
                        <v-layout row wrap justify-space-between style="padding-right: 10px;padding-left: 10px;">
                    <v-flex lg5>
                    <v-text-field
                            v-model="step1Fields.businessName"
                            :label="$t('registration.professionalRegisteration.Business Name')"
                            color="#E60000"
                            :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' ),value => value.length <= 25 || $t('registration.signup.Maximum 25 characters'),value =>  /^(?:[a-zA-Z\s,\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,25}$/.test(value) || $t('registration.signup.Only Alphabetical Letters') ]"
                            counter="25"
                            :disabled="step1Fields.usePersonalProfile"
                            maxlength="25"
                    ></v-text-field>
                        <v-checkbox
                                style="height: 40px;"
                                color="#e60000"
                                id="step1Fields.usePersonalProfile"
                                v-model="step1Fields.usePersonalProfile"
                                :label="$t('registration.professionalRegisteration.Or use your personal name')"
                                @change="choosePersName()"
                        ></v-checkbox>
                    </v-flex>
                        <v-flex lg4>
                            <!--                       ///////////div for image input-->
                            <div style="text-align: center;width: fit-content;margin: auto;padding-top: 20px">
                                <header style="font-size: 16px;color: #979797;">{{$t('registration.professionalRegisteration.Upload Business Photo')}}</header>

                                <v-hover>
                                    <v-img
                                            slot-scope="{ hover }"
                                            :class="[reqImage? 'img-selection error-image': 'img-selection']"
                                            height="150" width="150"
                                            :src="imgSrc"
                                            @click="step1Fields.usePersonalPic === false ? $refs.fileInput.click(): ''"
                                    >
                                        <v-fade-transition name="fade">

                                            <div

                                                    v-if="hover && step1Fields.usePersonalPic === false"
                                                    class="d-flex fade-transition v-card--reveal display-5 white--text hover-upload"
                                            >
                                                <v-layout row wrap justify-center align-center>
                                                    <div>
                                                        <v-icon size="35" color="white">mdi-upload</v-icon>
                                                        <v-card-text class="pa-0">
                                                            {{$t('registration.personalProfileRegisteration.Upload Image')}}
                                                        </v-card-text>
                                                        <input alt="image" style="display: none" ref="fileInput" type="file" accept="image/*"  @change="onFileChange">
                                                    </div>
                                                </v-layout>
                                            </div>
                                            <div

                                                    v-if="hover && step1Fields.usePersonalPic === true"
                                                    class="d-flex fade-transition v-card--reveal display-5 white--text hover-upload"
                                            >
                                                <v-layout row wrap justify-center align-center>
                                                    <v-flex lg5>
                                                        {{$t('registration.professionalRegisteration.Personal Photo')}}
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                        </v-fade-transition>
                                    </v-img>
                                </v-hover>
                                <div style="color: red;font-size: 14px;" v-if="reqImage">{{errorImageMsg === 'image size' ? $t('registration.personalProfileRegisteration.image size') : errorImageMsg === 'only types' ? $t('registration.personalProfileRegisteration.only types') : ''}}</div>
                                <v-checkbox
                                        style="height: 40px;"
                                        color="#e60000"
                                        v-model="step1Fields.usePersonalPic"
                                        id="step1Fields.usePersonalPic"
                                        :label="$t('registration.professionalRegisteration.Use your personal picture')"
                                        @change="choosePersonalPic()"
                                        v-if="userInfo.pic !== null"
                                ></v-checkbox>
                            </div>
                        </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>

                <v-layout style="justify-content: flex-end;padding: 10px;">
                <v-btn rounded dark color="#E60000" @click="toSecond()">
                    {{$t('registration.personalProfileRegisteration.next')}}
                </v-btn>
                </v-layout>
                </v-form>
            </v-stepper-content>
            <v-stepper-content step="2">
                <v-card
                        flat
                        class="mb-5"
                        min-height="300px"
                >
                    <v-form
                            ref="step2Form"
                    >
                        <v-card
                                flat
                                class="mb-5"
                                height="fit-content"
                        >
                            <v-container >
                                <v-layout row wrap justify-space-between style="padding-right: 10px;padding-left: 10px;">
                                    <v-flex lg5 xs12 sm12>
                                        <v-layout style="direction: ltr">
                                        <vue-tel-input
                                                style="margin: -1px;width: 100%;"
                                                :value="phoneNumber"
                                                :valid-characters-only="true"
                                                :disabled="disableAndVerfy"
                                                @input="onInput"
                                                :placeholder="$t('registration.personalProfileRegisteration.phone number')"
                                        ></vue-tel-input>
                                        <v-btn small text color="#E60000"  @click="sendVerifyCode()" v-if="!disableAndVerfy">
                                            {{$t('registration.professionalRegisteration.verify')}}
                                        </v-btn>
                                            <v-icon size="30" text color="green" v-if="disableAndVerfy">
                                                check
                                            </v-icon>
                                        </v-layout>
                                        <span v-if="showErrorPhone" style="color: red;font-size: 13px;margin-left: 10px;">
                                            {{phoneValidation === 'repeated phone' ? $t('registration.personalProfileRegisteration.repeated phone') : phoneValidation === 'notvalid phone' ? $t('registration.personalProfileRegisteration.notvalid phone') : ''}}
                                        </span>
                                        <v-text-field
                                            v-model="email"
                                            :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' ), value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || $t('registration.signup.emailvalid')]"
                                            :label="$t('registration.professionalRegisteration.Business Email')"
                                            color="#E60000"
                                            :error-messages="errors !== '' ? $t(errors) : ''"
                                            @blur="checkEmail()"
                                        ></v-text-field>
                                        <v-autocomplete
                                                eager
                                                :menu-props="{maxHeight: 200}"
                                                v-model="countrySelected"
                                                :items="countries"
                                                :label="$t('registration.professionalRegisteration.Location')"
                                                color="#E60000"
                                                :return-object="true"
                                                :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' ),]"
                                                @change="loadData()"
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
<!--                                        <v-autocomplete-->
<!--                                                :menu-props="{maxHeight: 200}"-->
<!--                                                v-model="citySelected"-->
<!--                                                :items="cities"-->
<!--                                                :label="$t('registration.professionalRegisteration.City')"-->
<!--                                                color="#E60000"-->
<!--                                                :return-object="true"-->
<!--                                                :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' ),]"-->
<!--                                                :disabled="disabled"-->

<!--                                        >-->
<!--                                            <template v-slot:no-data>-->
<!--                                                <v-list-item>-->
<!--                                                    <v-list-item-content>-->
<!--                                                        <v-list-item-title>-->
<!--                                                            {{$t('registration.personalProfileRegisteration.No Data')}}-->
<!--                                                        </v-list-item-title>-->
<!--                                                    </v-list-item-content>-->
<!--                                                </v-list-item>-->
<!--                                            </template>-->
<!--                                        </v-autocomplete>-->
                                        <v-text-field
                                            v-model="address"

                                            :label="$t('registration.professionalRegisteration.Address')"
                                                color="red"
                                        ></v-text-field>

                                    </v-flex>

                                    <v-flex lg5 sm12 style="padding-top: 30px;">
<!--                                        facebook-->
                                        <v-layout style="height: 50px; direction: ltr">
                                        <v-btn icon color="#E60000" @click="socialBtns.facebookText = !socialBtns.facebookText">
                                            <v-icon>mdi-facebook</v-icon>
                                        </v-btn>

                                        <v-slide-x-transition>
                                        <v-text-field
                                            v-model="facebook"
                                                prefix="www.facebook.com/"
                                                style="width: 50%;padding: 0;margin:0"
                                            placeholder="facebook"
                                                color="red"
                                                v-if="socialBtns.facebookText"
                                        ></v-text-field>
                                        </v-slide-x-transition>
                                        </v-layout>
<!--                                        twitter-->
                                        <v-layout style="height: 50px; direction: ltr">
                                            <v-btn icon color="#E60000" @click="socialBtns.twitterText = !socialBtns.twitterText">
                                                <v-icon>mdi-twitter</v-icon>
                                            </v-btn>

                                            <v-slide-x-transition>
                                                <v-text-field
                                                    v-model="twitter"
                                                        prefix="www.twitter.com/"
                                                        style="width: 50%;padding: 0;margin:0"

                                                    placeholder="twitter"
                                                        color="red"
                                                        v-if="socialBtns.twitterText"
                                                ></v-text-field>
                                            </v-slide-x-transition>
                                        </v-layout>
<!--                                        behance-->
                                        <v-layout style="height: 50px; direction: ltr">
                                            <v-btn icon color="#E60000" @click="socialBtns.behanceText = !socialBtns.behanceText">
                                                <v-icon>mdi-behance</v-icon>
                                            </v-btn>

                                            <v-slide-x-transition>
                                                <v-text-field
                                                    v-model="behance"
                                                        prefix="www.behance.net/"
                                                        style="width: 50%;padding: 0;margin:0"

                                                    placeholder="behance"
                                                        color="red"
                                                        v-if="socialBtns.behanceText"
                                                ></v-text-field>
                                            </v-slide-x-transition>
                                        </v-layout>
<!--                                        instagram-->
                                        <v-layout style="height: 50px; direction: ltr">
                                            <v-btn icon color="#E60000" @click="socialBtns.instagramText = !socialBtns.instagramText">
                                                <v-icon>mdi-instagram</v-icon>
                                            </v-btn>

                                            <v-slide-x-transition>
                                                <v-text-field
                                                    v-model="instagram"
                                                        prefix="www.instagram.com/"
                                                        style="width: 50%;padding: 0;margin:0"

                                                    placeholder="instagram"
                                                        color="red"
                                                        v-if="socialBtns.instagramText"
                                                ></v-text-field>
                                            </v-slide-x-transition>
                                        </v-layout>
<!--                                        linkedin-->
                                        <v-layout style="height: 50px; direction: ltr">
                                        <v-btn icon color="#E60000" @click="socialBtns.linkdinText = !socialBtns.linkdinText">
                                            <v-icon>mdi-linkedin-box</v-icon>
                                        </v-btn>

                                        <v-slide-x-transition>
                                            <v-text-field
                                                v-model="linkdin"
                                                    prefix="www.linkedin.com/"
                                                    style="width: 50%;padding: 0;margin:0"

                                                placeholder="linkedin"
                                                    color="red"
                                                    v-if="socialBtns.linkdinText"
                                            ></v-text-field>
                                        </v-slide-x-transition>
                                    </v-layout>
                                        <!--                                        website-->
                                        <v-layout style="height: 50px; direction: ltr">
                                            <v-btn icon color="#E60000" @click="socialBtns.websiteText = !socialBtns.websiteText">
                                                <v-icon>mdi-earth</v-icon>
                                            </v-btn>

                                            <v-slide-x-transition>
                                                <v-text-field
                                                        v-model="website"
                                                        prefix=""
                                                        style="width: 50%;padding: 0;margin:0"

                                                        placeholder="website"
                                                        color="red"
                                                        v-if="socialBtns.websiteText"
                                                ></v-text-field>
                                            </v-slide-x-transition>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex lg8>
                                        <v-checkbox
                                                style="height: 40px;"
                                                color="#e60000"
                                                v-model="onlineOnly"
                                                :label="$t('registration.professionalRegisteration.Hide my Phone Number & Address, Im online only')"
                                        ></v-checkbox>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>

                        <v-layout style="justify-content: flex-end;padding: 10px;">
                            <v-btn rounded dark color="#E60000" @click="toThird()">
                                {{$t('registration.personalProfileRegisteration.next')}}
                            </v-btn>
                        </v-layout>
                    </v-form>
                </v-card>

            </v-stepper-content>
            <v-stepper-content step="3">
                <v-card
                        flat
                        class="mb-5"
                        min-height="300px"
                >
                    <v-form
                            ref="step3Form"
                    >
                        <v-card
                                flat
                                class="mb-5"
                                height="fit-content"
                        >
                            <v-container >
                                <v-layout row wrap justify-space-between style="padding-right: 10px;padding-left: 10px;">
                                    <v-flex  lg5 sm6>

                                        <v-layout row wrap style="padding: 10px">
                                        <v-card-title class="pa-0" style="font-size: 18px;width: 100%">
                                            {{$t('registration.professionalRegisteration.What do you offer')}}
                                        </v-card-title>
                                            <v-radio-group
                                                    v-model="userOfferChoice"
                                                    style="margin-top: 0"
                                                    row
                                                    color="#E60000"
                                                    @change="loadBusinessData()"
                                            >
                                                <v-radio value="Product" color="#E60000" :label="$t('registration.professionalRegisteration.Product')"></v-radio>
                                                <v-radio value="Service" color="#E60000" :label="$t('registration.professionalRegisteration.Service')"></v-radio>
                                            </v-radio-group>
                                            <v-autocomplete
                                                    :menu-props="{maxHeight: 200}"
                                                    style="padding: 0;"
                                                    v-model="busniesscategorySelected"
                                                    :items="busniesscategory"
                                                    :label="$t('registration.professionalRegisteration.Choose Your Business Category')"
                                                    color="#E60000"
                                                    :return-object="true"
                                                    :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                                                    :disabled="disabledcategory"
                                                    @change="loadKeywordsData()"
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
                                                v-model="keywordSelected"
                                                    :items="keywords"
                                                :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required'), value => value.length < 9 || $t( 'registration.professionalRegisteration.not more than 8')]"
                                                :label="$t('registration.professionalRegisteration.SubSector')"
                                                    color="#E60000"
                                                multiple
                                                small-chips
                                                    :return-object="true"
                                                :disabled="disabledkeywords"
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
                                        </v-layout>
                                    </v-flex>

                                    <v-flex lg9 xs12>
                                        <v-textarea
                                            v-model="description"
                                            :rules="[value=>!!value || $t( 'registration.professionalRegisteration.required'), value => value.length > 25 || $t( 'registration.professionalRegisteration.Minimum 25 characters')]"
                                                :label="$t('registration.professionalRegisteration.Description')"
                                                color="#E60000"
                                                counter="200"
                                                auto-grow
                                                rows="1"
                                                maxlength="200"
                                        ></v-textarea>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>

                        <v-layout style="justify-content: flex-end;padding: 10px;">
                            <v-btn :loading="loadingSubmit" rounded dark color="#E60000" @click="freeRegister()">
                                {{$t('registration.professionalRegisteration.submit')}}
                            </v-btn>
                        </v-layout>
                    </v-form>
                </v-card>
            </v-stepper-content>
            <v-stepper-content step="4">
                <v-card
                        flat
                        class="mb-5"
                        min-height="350px"
                >
                    <v-container>
                    <v-layout row wrap justify-content-center>
                        <v-card-title style="color:#E60000;text-align: center;font-weight: bold;letter-spacing: inherit; font-size: 35px;">{{$t('registration.personalProfileRegisteration.Cong')}}</v-card-title>
<!--                        <v-card-text style="text-align: center;font-weight: bold;font-size: medium;">-->
<!--                            {{$t('registration.professionalRegisteration.you successfully completed your first step')}}-->
<!--                        </v-card-text>-->
<!--                        <v-card-text class="pb-0" style="color:#E60000;text-align: center;font-weight: bold;font-size: large;">-->
<!--                            {{$t('registration.professionalRegisteration.now')}}-->
<!--                        </v-card-text>-->
                        <v-card-text class="pt-0" style="text-align: center;font-weight: bold;font-size: medium;">
                            {{$t('registration.professionalRegisteration.present your')}}
                        </v-card-text>
                        <pricing-choice-pro></pricing-choice-pro>
                        <v-btn rounded :to="{name: 'pricing', params:{lang: $i18n.locale}}" dark color="#E60000">
                            {{$t('registration.professionalRegisteration.create business page')}}
                        </v-btn>
                        <v-card-text class="pt-0 pb-0" style="color:#E60000;text-align: center;font-size: medium;">{{$t('registration.professionalRegisteration.30 days free trial')}}</v-card-text>
                        <v-card-text class="pt-0" style="color:#E60000;text-align: center;font-size: medium;">{{$t('registration.professionalRegisteration.We dont charge you')}}</v-card-text>
                    </v-layout>
                    </v-container>
                </v-card>
            </v-stepper-content>

        </v-stepper-items>
    </v-stepper>
        <v-dialog
                persistent
                v-model="verfPhoneCode"
                max-width="300"
                min-height="400"
        >
            <v-card width="100%" height="100%">
                <v-card-text class="pt-5">
                    <v-container>

                            <v-layout row wrap justify-center align-center>
                                <v-card-title style="font-size: 16px;color: #e60000;">{{$t('registration.professionalRegisteration.Enter Verification Code')}}</v-card-title>

                    <v-text-field
                            v-model="nexoCode"
                            color="#e60000"
                            no-resize
                            dense
                            solo
                            :rules="[value => !!value || $t( 'registration.signup.required' )]"
                            maxlength="4"
                            hide-details
                    ></v-text-field>


                            </v-layout>
                        <v-layout justify-center align-center>

                            <v-btn text color="#E60000" v-if="viewResend" @click="reSendCode()">
                                {{$t('registration.professionalRegisteration.Resend Code')}}
                            </v-btn>
                            <div v-if="m!== -1" style="padding-top: 10px;font-size: 20px;padding-bottom: 10px;">
                                0{{m}}:{{s}}
                            </div>
                        </v-layout>
                        <v-layout justify-center align-center>
                            <v-btn dark rounded small color="#E60000" @click="sendCode()" v-if="nexoCode.length===4">
                                {{$t('registration.professionalRegisteration.verify')}}
                            </v-btn>


                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-flex>
    </v-container>
</template>

<script>
    import { VueTelInput } from 'vue-tel-input';
    import userInfoMixin from "../userInfoMixin";
    import PricingChoicePro from "../PricingAndPayment/pricingChoicePro";
    export default {
        name: "professionalRegistration",
        components: {
            PricingChoicePro,
            VueTelInput,
        },
        mixins:[userInfoMixin],
        data:()=>{
            return{
                phone: {
                    number: '',
                    valid: true,
                    country: undefined,
                },
                phoneMask: '#-#-#-#',
                disableAndVerfy: false,
                e1:4,
                verfPhoneCode: false,
                nexoCode: '',
                userOfferChoice: '',
                phoneNumber:'',
                codeTimerMinuts:0,
                codeTimerSeconds:0,
                step1Fields:{

                    businessName:'',
                    usePersonalProfile: false,
                    usePersonalPic: false
                },
                phoneValidation: '',
                rules: {
                    required: value => !!value || 'Required.',
                    minuser: v => v.length >= 3 || 'Minimum 3 characters',
                    maxuser:  v => v.length <= 10 || 'Maximum 10 characters',
                    min: v => v.length >= 6 || 'Minimum 6 characters',
                    max: v => v.length <= 25 || 'Maximum 25 characters',
                    minDesc: v => v.length >= 50 || 'Minimum 50 characters',
                    maxDesc: v => v.length <= 200 || 'Maximum 200 characters',
                    email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid",
                    charactersonly: v =>  /^(?:[a-zA-Z0-9\s,\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,25}$/.test(v) || 'Characters Only'

                },
                showErrorPhone:false,
                imgSrc:'/images/imagePlaceholder.png',
                file:'',
                personalname:'',
                reqImage: false,
                flagpiccheck:false,
                countries: [],
                cities:[],
                busniesscategory:[],
                busniesscategorySelected:'',
                countrySelected:'',
                citySelected:'',
                disabled:true,
                disabledcategory:true,
                disabledkeywords:true,
                onlineOnly: false,
                errorImageMsg: '',
                socialBtns:{
                    facebookText: false,
                    twitterText: false,
                    behanceText: false,
                    instagramText: false,
                    linkdinText: false,
                    websiteText: false
                },
                keywords:[
                ],
                keywordSelected:'',
                email:'',
                errors:'',
                address:'',
                facebook:'',
                twitter:'',
                behance:'',
                instagram:'',
                linkdin:'',
                website:'',
                description:'',



                m: 0,
                s: 59,
                phoneFinalVerfied: false,
                viewResend: false,
                resendCounter:0,
                usedPhone:[],
                vuetifyRtl:'',
                loadingSubmit: false,

                contriesWithIds: [],
                keywordsWithIds: [],
                busniesscategoryWithIds:[],

                submitDoneFlag: false,
            }
        },
        beforeMount() {
            window.addEventListener("beforeunload", this.preventNav)

        },

        beforeRouteLeave(to, from, next) {
            if(this.submitDoneFlag === false ) {
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
            if(this.$vuetify.rtl === true){
                this.vuetifyRtl = 'arrow_forward';
            }else {
                this.vuetifyRtl = 'arrow_back';
            }

            const slug = localStorage.getItem('s');
            this.$store.dispatch('userData', {id:slug, lang:this.$i18n.locale});
            this.$store.dispatch('AllCountry', {lang: this.$i18n.locale});
            this.$store.dispatch('AllRegkeywords', {lang: this.$i18n.locale});
            this.$store.dispatch('allPricingPlan');
        },
        computed: {
            getCheckSendCodeFlag(){
                return this.$store.getters.getCheckSendCodeFlag;
            },
            getAllRegkeywords(){
                return this.$store.getters.getAllRegkeywords;
            },

            getAllCountry() {
                return this.$store.getters.getAllCountry;
            },
            getFreeRegFlag(){
                return this.$store.getters.getFreeRegFlag;
            },
            checkrtl(){
                return this.$vuetify.rtl;
            }
        },
        watch: {
            checkrtl(flag){
                this.$router.go(-1);
                // this.e1 === 1 ? this.$refs.step1Form.reset() : '';
                // this.e1 === 2 ? this.$refs.step2Form.reset() : '';
                // this.e1 === 3 ? this.$refs.step3Form.reset() : '';
                // if(flag === true){
                //
                //     this.vuetifyRtl = 'arrow_forward';
                // }else {
                //     this.vuetifyRtl = 'arrow_back';
                // }
            },
            getFreeRegFlag(flag){
                if(flag === true){
                    this.submitDoneFlag =true;
                    this.e1=4;

                }else {
                    this.loadingSubmit = false;
                }
            },
            getCheckSendCodeFlag(flag){
                this.$store.commit('setClearAppMsgs');
                if(flag === true){
                    this.verfPhoneCode = true;

                    this.verfyCodeTimer();
                }else if(flag ==='verify'){
                    this.disableAndVerfy = true;
                    this.verfPhoneCode = false;
                    this.phoneFinalVerfied = true;
                }else if(flag === 'resent'){
                    if(this.resendCounter > 1){
                        this.usedPhone.push(this.phone.number);
                        this.verfPhoneCode = false;
                        this.$store.commit('setAppMsgs', {
                            msg: "registration.professionalRegisteration.Too Many Attempting, Try different Phone Number!",
                            color: "error",
                            icon: "error"
                        })
                    }else {
                        this.m = 0;
                        this.s = 59;
                        this.resendCounter = this.resendCounter + 1;
                        this.viewResend = false;
                        this.verfyCodeTimer();
                    }
                }
            },
            getAllRegkeywords(keywords){

                this.keywords=[];
                if(keywords) {
                    for(let i in keywords) {
                        this.keywords.push(keywords[i].keyword);
                        this.keywordsWithIds.push(keywords[i]);
                    }
                }
            },
            getAllCountry(country) {
                this.countries = [];
                if (country) {
                    for (let i in country) {
                        this.countries.push(country[i].name);
                        this.contriesWithIds.push(country[i]);
                    }
                }
            },

        },
        methods:{
            preventNav(event) {
                event.preventDefault()
                event.returnValue = ""
            },
            sendCode(){
                this.$store.commit('setClearAppMsgs');
                if(this.nexoCode !=='') {
                    this.$store.dispatch('sendCode', {
                        code: this.nexoCode,

                    });
                }
                else {
                    this.$store.commit('setAppMsgs', {
                        msg: "registration.professionalRegisteration.Please Enter Code!",
                        color: "info",
                        icon: "info"
                    })
                }

            },
            reSendCode(){

                this.$store.commit('setClearAppMsgs');
                    this.$store.dispatch('reSendCode', {
                        phone: this.phone.number,
                    });
            },
            sendVerifyCode()
            {

                this.$store.commit('setClearAppMsgs');
                if(this.phone.number !=='' &&this.phone.valid && this.showErrorPhone===false) {
                    if(this.usedPhone.includes(this.phone.number)){
                        this.$store.commit('setAppMsgs', {
                            msg: "registration.professionalRegisteration.Please use another phone number!",
                            color: "info",
                            icon: "info"
                        })
                    }else {
                        this.$store.dispatch('VerifyCode', {
                            phone: this.phone.number,
                        });
                    }
                }
                else {
                    this.$store.commit('setAppMsgs', {
                        msg: "registration.professionalRegisteration.Please Check Telephone & Country!",
                        color: "info",
                        icon: "info"
                    })
                }

            },

            verfyCodeTimer() {
                if (this.m !== -1) {
                    setTimeout(() => {

                        this.s = this.s - 1;
                        if (this.s === 0) {
                            this.s = 59;
                            this.m = this.m - 1;
                        }
                        if (this.s < 10) {
                            this.s = '0' + this.s;
                        }
                        this.verfyCodeTimer();
                    }, 1000)


                }else {
                    this.viewResend = true;
                }
            }
            ,
                onFileChange(e)
                {
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

                }
            ,
                toSecond()
                {

                    this.reqImage = false;
                    if (this.$refs.step1Form.validate() === true && this.step1Fields.usePersonalPic === false && this.file !== '') {

                        this.e1 = 2;
                    } else if (this.$refs.step1Form.validate() === true && this.step1Fields.usePersonalPic === true && this.file === '') {
                        this.e1 = 2;
                    } else if (this.$refs.step1Form.validate() === true && this.step1Fields.usePersonalPic === false && this.file === '') {
                        this.errorImageMsg = 'Required';
                        this.reqImage = true;
                    }

                }
            ,
                onInput(formattedNumber, {number, valid, country})
                {

                    this.phone.number = number.international;
                    this.phone.valid = valid;
                    this.phone.country = country && country.name;
                    if(this.phone.valid)
                    {
                        this.phoneValidation = "";
                        axios.post('/vue/checknumberprofessionalvalid',{phone:this.phone.number}).then(res => {

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
                    }
                    else
                    {
                        this.phoneValidation = "notvalid phone";
                        this.showErrorPhone=true;
                    }


                }
            ,
                toThird()
                {
                    this.$store.commit('setClearAppMsgs');
///////////////////////////////////////////////// this.phoneFinalVerfied === true ////////////////////////////////////////////
                    if (this.$refs.step2Form.validate() === true && this.phoneFinalVerfied === false && this.errors === '' && this.showErrorPhone===false) {

                        this.e1 = 3;
                    }
                    else
                    {
                        this.$store.commit('setAppMsgs', {
                            msg: "registration.professionalRegisteration.Please Check all inputs",
                            color: "info",
                            icon: ""
                        })

                    }

                }
            ,
                ////need to add personal name in text field if choose checkbox as field is Required
                choosePersName()
                {
                    this.step1Fields.usePersonalProfile === true ? this.step1Fields.businessName = this.userInfo.name : this.step1Fields.businessName = '';
                },
                choosePersonalPic()
                {

                    if (this.step1Fields.usePersonalPic === true) {
                        /////add peronal pic in the field of this.file
                        this.imgSrc = '/images/med/'+this.userInfo.profile_pic;
                    } else if (this.step1Fields.usePersonalPic === false) {
                        this.file = '';
                        this.imgSrc = '/images/imagePlaceholder.png';
                    }

            },
            loadData:function() {
                this.cities=[];
                this.citySelected='';
                this.disabled=true;
                if(this.countrySelected !== ''){
                    axios.post('/vue/getcity',{selected:this.countrySelected, lang: this.$i18n.locale})
                        .then(res => {

                            if(res.data.length===0)
                            {
                                this.cities=[];
                                this.disabled=true;

                            } else {
                                this.disabled=false;

                                this.cities = res.data.map((item) =>{
                                    return item;
                                });
                            }

                        });
                }

            },
            loadBusinessData()
            {
                if(this.userOfferChoice==='Product')
                {

                    this.busniesscategory=[];
                    this.busniesscategoryWithIds = [];
                    this.busniesscategorySelected='';
                    this.keywords=[];
                    this.keywordSelected='';


                    axios.post('/vue/gettypebusinesscategory',{type:0, lang: this.$i18n.locale})
                        .then(res => {

                            if(res.data.length===0)
                            {
                                this.busniesscategory=[];
                                this.busniesscategoryWithIds = [];
                                this.busniesscategorySelected='';
                                this.keywords=[];
                                this.keywordSelected='';
                                this.disabledkeywords=true;

                                this.disabledcategory=true;

                            } else {
                                this.disabledcategory=false;
                                this.busniesscategory = res.data.map((item) =>{
                                    return item.name;
                                });
                                this.busniesscategoryWithIds = res.data.map((item) =>{
                                    return item;
                                });
                            }

                        })

                }
                else if(this.userOfferChoice === 'Service')
                {
                    this.busniesscategory=[];
                    this.busniesscategoryWithIds = [];
                    this.busniesscategorySelected='';

                    this.keywords=[];
                    this.keywordSelected='';
                    axios.post('/vue/gettypebusinesscategory',{type:1, lang: this.$i18n.locale})
                        .then(res => {

                            if(res.data.length === 0)
                            {
                                this.busniesscategory=[];
                                this.busniesscategoryWithIds = [];
                                this.busniesscategorySelected='';
                                this.keywords=[];
                                this.keywordSelected='';
                                this.disabledkeywords=true;
                                this.disabledcategory=true;


                            } else {
                                this.disabledcategory=false;
                                this.busniesscategory = res.data.map((item) =>{
                                    return item.name;
                                });
                                this.busniesscategoryWithIds = res.data.map((item) =>{
                                    return item;
                                });
                            }

                        })

                }
                else {
                    this.busniesscategory=[];
                    this.busniesscategoryWithIds = [];
                    this.disabledcategory=false;

                }




            },
            loadKeywordsData:function() {
                //sectors not keyword
                this.keywords=[];
                this.keywordsWithIds=[];
                this.keywordSelected='';
                let businesscategoryselected_id = this.busniesscategoryWithIds.find(id => id.name === this.busniesscategorySelected);
                console.log(businesscategoryselected_id);
                axios.post('/vue/getbusinesssectors',{selected: businesscategoryselected_id.business_cat_id, lang: this.$i18n.locale})
                    .then(res => {

                        if(res.data.length === 0)
                        {

                            this.keywords=[];
                            this.keywordsWithIds=[];
                            this.keywordSelected='';

                            this.disabledkeywords=true;

                        } else {
                            this.disabledkeywords=false;
                            this.keywords = res.data.map((item) =>{
                                return item.name;
                            });
                            this.keywordsWithIds=res.data.map((item) =>{
                                return item;
                            });
                        }

                    });
            },
            checkEmail(){

                axios.post('/vue/checkemailprofessional',{email:this.email}).then(valid => {

                    if(valid.data === false){

                        this.errors = 'registration.professionalRegisteration.this email already taken!'
                    }
                    else
                    {
                        this.errors = ''
                    }
                });

            },

            freeRegister() {
                if (this.$refs.step3Form.validate() === true) {
                    this.loadingSubmit = true;
                    let country_id = this.contriesWithIds.find(id => id.name === this.countrySelected);
                    let businesscategory_id = this.busniesscategoryWithIds.find(id => id.name === this.busniesscategorySelected);
                    console.log(country_id.id,businesscategory_id.business_cat_id);
                    let keywordsslected_ids = [];
                    for(let i in this.keywordSelected){
                        keywordsslected_ids.push(
                            this.keywordsWithIds.find(id => id.name === this.keywordSelected[i]).id
                        )
                    }
                    this.$store.dispatch('freeRegister', {
                        type:1,
                        bussinessname: this.step1Fields.businessName,
                        image: this.file,
                        imagecheck: this.step1Fields.usePersonalPic,
                        companysize: '',
                        bussinesstype: '',
                        phone: this.phone.number,
                        email: this.email,
                        address: this.address,
                        facebook: this.facebook,
                        twitter: this.twitter,
                        behance: this.behance,
                        instagram: this.instagram,
                        linkdin: this.linkdin,
                        website:this.website,
                        online: this.onlineOnly,
                        country: country_id.country_id,
                        city: null,
                        businesscategory: businesscategory_id.business_cat_id,
                        keywords: keywordsslected_ids,
                        description: this.description,
                        lat:'',
                        lng:'',
                        lang: this.$i18n.locale,


                    });
                    window.removeEventListener("beforeunload", this.preventNav);
                }
            }
        }
    }
</script>

<style scoped>
    >>>.v-stepper__header .v-divider {
        align-self: center !important;
        margin: 0 -16px !important;
    }
    >>>.theme--light.v-stepper .v-stepper__step--active .v-stepper__label {
        text-shadow: 0 0 0 #e60000;
    }
    >>>.v-stepper__step__step {

        border-radius: 15% !important;
        display: inline-flex;
        font-size: 12px;
        justify-content: center;
        height: 24px;
        margin-right: 8px;
        min-width: 24px;
        width: 24px;
        transition: .3s cubic-bezier(.25,.8,.25,1);
    }
    >>>.v-stepper__step {
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 10px !important;
        position: relative;
    }
    >>>.v-input--selection-controls {
        margin-top: 0px;
        padding-top: 4px;
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

    @media (max-width: 630px) {
        >>>.v-stepper--alt-labels .v-stepper__step {
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            flex-basis: 90px;
        }
    }
    @media (max-width: 680px) {
        >>>.v-stepper--alt-labels .v-stepper__step {
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            flex-basis: 110px;
        }
    }
    >>>.error-image{
        border: 1px red solid;
    }
    >>>.vue-value-number-input .select-country-container .input-country-selector input {
        border-radius: 30px 0 0 30px!important;
    }
    >>>.vue-value-number-input .input-value-number input {
        margin-left: 0 !important;
        border-radius: 0 30px 30px 0!important;
    }
    >>>.vue-tel-input {
        display: flex;
        border: 1px solid #919191;
        text-align: left;
        border-radius: 0px !important;
        font-size: 11px !important;
    }
    >>>ul {
        z-index: 1;
        padding: 0;
        margin: 0;
        text-align: left;
        list-style: none;
        max-height: 200px;
        overflow-y: scroll;
        position: absolute;
        top: 33px;

        background-color: #fff;
        border: 1px solid #ccc;
        width: 230px !important;
        overflow-x: hidden !important;
        font-size: 13px;
        box-shadow: 0 2px 2px 2px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)
    }
    >>>.dropdown-item {
        background-color: #f9f9f9 !important;
        color: #535353 !important;
        border-bottom: 1px solid #61606057 !important;
        text-align: left !important;
        transition: 0.7s;
        padding: 4px 8px !important;
    }
    >>>label {
        display: inline-block;
        margin-bottom: 0 !important;
    }
    >>>.v-input__slot {
        align-items: center;
        color: inherit;
        display: flex;
        min-height: inherit;
        position: relative;
        transition: .3s cubic-bezier(.25,.8,.5,1);
        width: 100%;
    }
    >>>.v-text-field .v-counter {
        margin-top: 0px;
    }
    >>>input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0 !important;
    }
    >>>.dropdown-item:hover {
        background-color: #e60000 !important;
        color: #f9f9f9 !important;
    }
    >>>.vue-tel-input[data-v-32fdfc12]:focus-within {
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 5px rgba(233, 102, 102, 0.6);
        border-color: #e60000;
    }
    >>>input[type="number"] {
        -moz-appearance: textfield !important;
    }
    /*>>>.theme--light.v-input:not(.v-input--is-disabled) input, .theme--light.v-input:not(.v-input--is-disabled) textarea {*/
    /*    color: rgba(0,0,0,.87);*/
    /*    text-align: center;*/
    /*    font-size: 30px;*/
    /*}*/

    /*>>>.theme--light.v-input:not(.v-input--is-disabled) input, .theme--light.v-input:not(.v-input--is-disabled) textarea {*/
    /*    color: rgba(0,0,0,.87);*/
    /*    text-align: center;*/
    /*    font-size: 30px;*/
    /*}*/
    >>>.v-application .primary--text {
        color: #E60000 !important;
        caret-color: #1976d2 !important;
    }

    >>>.vue-tel-input:focus-within {
        box-shadow: inset 0 0px 0px #e60000  !important;
        border-color: #e60000 !important;
    }
    >>>.v-input {
        align-items: flex-start;
        display: flex;
        flex: 1 1 auto;
        font-size: 16px;

        max-width: 100%;
        text-align: center;
    }

    >>>.v-stepper__step-activenow {
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 10px !important;
        position: relative;
        background-color: #f1f1f1;
        /*border-radius: 15px;*/
    }
    >>>.v-stepper__step-not{
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 10px !important;
        position: relative;
    }
</style>
