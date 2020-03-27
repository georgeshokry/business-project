<template>
    <v-container fill-height justify-content-center style="min-height:85vh">

        <v-layout row wrap>

        <v-flex xl7 lg5 style="margin-right: auto; margin-left: auto">
        <v-card
                :disabled="disableFirstForm"
        >
            <v-overlay absolute :value="loadingFirstFormFlag" opacity="0.80" style="text-align: center;">
                <v-progress-circular color="#e60000" indeterminate size="50"></v-progress-circular>
                <v-card-text style="font-size: 20px !important;">
                    {{$t('pricing.payment.loading')}}
                </v-card-text>
            </v-overlay>
            <v-overlay absolute :value="firstFormSubmitted" opacity="0.80" style="text-align: center;">

                <v-card-text style="font-size: 25px !important;">
                    {{$t('pricing.payment.Data Accepted')}}
                </v-card-text>
            </v-overlay>
            <v-container >
                <v-card-title style="font-weight: bold" class="pa-0">
                    {{$t('pricing.payment.Billing Info')}}
                </v-card-title>
                <v-divider color="#E60000"></v-divider>
                <v-form ref="basicInfoPaymentForm">
                <v-layout row wrap  justify-space-around>
                <v-flex  lg5 xs10>
                <v-text-field
                        v-model="billToForename"
                        :rules="[value => !!value || $t( 'registration.signup.required' )]"
                        :label="$t('pricing.payment.firstName')+'*'"
                        required
                        :disabled="disableFirstForm"
                        autofocus
                ></v-text-field>
                </v-flex>
                <v-flex lg5 xs10>
                <v-text-field
                        v-model="billToSurname"
                        :rules="[value => !!value || $t( 'registration.signup.required' )]"

                        :label="$t('pricing.payment.lastName')+'*'"
                        required
                        :disabled="disableFirstForm"
                ></v-text-field>
                </v-flex>
                </v-layout>
                <v-layout row wrap  justify-space-around>

                        <v-flex  lg5 xs10>
                <v-text-field
                        v-model="billToEmail"
                        :rules="[value => !!value || $t( 'registration.signup.required' ), value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || $t('registration.signup.emailvalid')]"

                        :label="$t('pricing.payment.Email')+'*'"
                        required
                        :disabled="disableFirstForm"
                ></v-text-field>
                        </v-flex>
                        <v-flex  lg5 xs10>
                <div>
                <vue-tel-input
                        :class="[showErrorPhonePayment ? 'error-vue-tel-input' : '']"
                        style="margin: 10px 10px 0 10px ;"
                        :value="billToPhone"
                        :valid-characters-only="true"
                        @input="onInput"
                        :placeholder="$t('registration.personalProfileRegisteration.phone number')+'*'"
                        :disabled="disableFirstForm"
                ></vue-tel-input>
                <span v-if="showErrorPhonePayment" style="color: red;font-size: 13px;margin-left: 10px;">
                    {{phoneValidation === 'notvalid phone' ? $t('registration.personalProfileRegisteration.notvalid phone') : phoneValidation === 'required' ? $t( 'registration.signup.required' ) : ''}}
                </span>
                </div>
                        </v-flex>

                    <v-flex  lg11 xs10>
                        <v-text-field
                                v-model="billToAddressLine1"
                                :rules="[value => !!value || $t( 'registration.signup.required' )]"

                                :label="$t('pricing.payment.AddressLine1')+'*'"
                                required
                                :disabled="disableFirstForm"
                        ></v-text-field>
                    </v-flex>
                    <v-flex  lg5 xs10>
                        <v-text-field
                                v-model="billToAddressState"
                                :rules="[value => !!value || $t( 'registration.signup.required' )]"

                                :label="$t('pricing.payment.State')+'*'"
                                required
                                :disabled="disableFirstForm"
                        ></v-text-field>
                    </v-flex>
                    <v-flex  lg5 xs10>
                        <v-text-field
                                v-model="billToAddressCountry"
                                :rules="[value => !!value || $t( 'registration.signup.required' )]"

                                :label="$t('pricing.payment.Country')+'*'"
                                required
                                :disabled="disableFirstForm"
                        ></v-text-field>
                    </v-flex>
                    <v-flex  lg5 xs10>
                        <v-text-field
                                v-model="billToAddressCity"
                                :rules="[value => !!value || $t( 'registration.signup.required' )]"

                                :label="$t('pricing.payment.City')+'*'"
                                required
                                :disabled="disableFirstForm"
                        ></v-text-field>
                    </v-flex>
                    <v-flex  lg5 xs10>
                        <v-text-field
                                v-model="billToAddressPostalCode"
                                :rules="[value => !!value || $t( 'registration.signup.required' )]"
                                maxlength="10"
                                :label="$t('pricing.payment.Postal Code')+'*'"
                                required
                                :disabled="disableFirstForm"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="primary"
                                light
                                @click="submitFirstForm"
                                :disabled="disableFirstForm"
                                :loading="submitingFirstFormLoading"


                        >
                            {{$t('pricing.payment.next')}}
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-container>
        </v-card>
        </v-flex>
            <v-flex xl7 lg4 style="margin-right: auto; margin-left: auto">
                <v-card
                        :disabled="disableSecondForm"
                >
                    <v-form
                            ref="secondPaymentForm"
                    >


                    <v-overlay absolute :value="loadingFirstFormFlag" opacity="0.80" style="text-align: center;">
                        <v-progress-circular color="#e60000" indeterminate size="50"></v-progress-circular>
                        <v-card-text style="font-size: 20px !important;">
                            {{$t('pricing.payment.loading')}}
                        </v-card-text>
                    </v-overlay>
                    <v-container >
                        <v-card-title style="font-weight: bold" class="pa-0">
                          {{$t('pricing.payment.Payment Method')}}
                        </v-card-title>
                        <v-divider color="#E60000"></v-divider>
                        <v-card-text style="text-align: initial">
                            {{$t('pricing.payment.Choose Payment Method:')}}
                        </v-card-text>
                        <v-btn-toggle

                                style="width: 100%"
                                v-model="card_type"
                                borderless
                                ligth
                                color="primary"
                                active-class="active-method"
                                group

                        >
                            <v-btn :disabled="disableSecondForm" x-large value="001">

                                <img width="80" src="../resources/visa.png" alt="visa-card">
                            </v-btn>

                            <v-btn :disabled="disableSecondForm" x-large value="002">
                                <img  width="80" src="../resources/mastercard2.png" alt="master-card">
                            </v-btn>

                        </v-btn-toggle>

                        <v-layout row wrap justify-space-around>

                            <v-flex  lg11 xs10>
                                <v-text-field
                                        class="inputNumber"
                                        v-model="card_number"
                                        :rules="[value => value.length === 19 || $t('pricing.payment.should contain')]"
                                        :label="$t('pricing.payment.Card Number')+'*'"
                                        required
                                        :hint="$t('pricing.payment.example')"
                                        persistent-hint
                                        type="tel"
                                        v-mask="'####-####-####-####'"
                                        :disabled="disableSecondForm"
                                        maxlength="19"
                                ></v-text-field>
                            </v-flex>
                            <v-flex  lg11 xs10>
                                <v-menu
                                        ref="menu"
                                        v-model="expMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"

                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field

                                                v-model="card_expiry_date"
                                                :label="$t('pricing.payment.Card Expiration Date')+'*'"
                                                readonly
                                                v-on="on"
                                                color="#E60000"
                                                :rules="[ value => !!value || $t( 'registration.signup.required' ) ]"
                                                :disabled="disableSecondForm"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                            ref="bdPicker"
                                            show-current="false"
                                            :min="new Date().toISOString().substr(0, 10)"
                                            color="#E60000"
                                            v-model="card_expiry_date"
                                            @input="expMenu = false"
                                            :locale="loclization"
                                            type="month"
                                    ></v-date-picker>
                                </v-menu>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card-actions>
                        <v-spacer ></v-spacer>
<!--                        <v-btn-->
<!--                                color="primary"-->
<!--                                v-if="!disableSecondForm"-->
<!--                                text-->
<!--                                @click="backToFirst"-->
<!--                        >-->
<!--                            {{$t('pricing.payment.back to')}}-->
<!--                        </v-btn>-->
<!--                        <v-spacer v-if="!disableSecondForm"></v-spacer>-->
                        <v-btn
                                color="primary"
                                light
                                @click="proTopayment"
                                :disabled="disableSecondForm"


                        >
                            {{$t('pricing.payment.checkout')}}
                        </v-btn>
                    </v-card-actions>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    import {mask} from 'vue-the-mask'
    import { VueTelInput } from 'vue-tel-input';
    export default {
        name: "payment",
        directives: {
            mask
        },
        components: {
            VueTelInput,
        },
        data: () => {
            return {
                expMenu: false,
                card_number: "",
                card_type: "",
                card_expiry_date: "",
                loclization: 'en-se',

                billToForename: "",
                billToSurname: "",
                billToEmail: "",
                billToPhone: "",
                billToAddressLine1: "",
                billToAddressCity: "",
                billToAddressState: "",
                billToAddressCountry: "",
                billToAddressPostalCode: "",
                phone: {
                    number: '',
                    valid: true,
                    country: undefined,
                },

                showErrorPhonePayment:false,
                phoneValidation: '',
                disableSecondForm: true,

                loadingFirstFormFlag: true,

                disableFirstForm: false,

                dbFirstDataForm: null,
                dbSecondDataForm: null,

                submitingFirstFormLoading: false,

                submitDoneFlag: false,
                firstFormSubmitted: false,
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
        created(){
            this.$store.dispatch('dbFormData');
            this.loclization = this.$i18n.locale + '-se';

        },
        computed:{
            getDbFormData(){
                return this.$store.getters.getDbFormData;
            },
            getFirstFormFlag(){
                return this.$store.getters.getFirstFormFlag;
            },
            getSecondFormFlag(){
                return this.$store.getters.getSecondFormFlag;
            },
            getcheckOutPaymentFlag(){
                return this.$store.getters.getcheckOutPaymentFlag;
            }
        },
        watch:{
            expMenu (val) {
                val && setTimeout(() => (this.$refs.bdPicker.activePicker = 'YEAR'));
            },
            getDbFormData(data){
                if(data !== null){
                    this.dbFirstDataForm = data;

                    console.log(this.dbFirstDataForm, "FORM")
                }
            },
            getFirstFormFlag(flag){
                if(flag === "success"){

                    this.loadingFirstFormFlag =false;

                }else {

                }
            },
            getSecondFormFlag(flag){
                if(flag === "ERROR"){
                    this.$store.dispatch('appMsgs', {
                        msg: "pricing.payment.ERROR",
                        color: "red",
                        icon: "error"
                    });
                    this.submitingFirstFormLoading = false;

                }else if(flag.data.status === "success"){
                    this.dbSecondDataForm = flag.data.params;
                    this.submitingFirstFormLoading = false;
                    this.disableFirstForm = true;
                    this.disableSecondForm = false;
                    this.firstFormSubmitted = true;
                }

            },
            getcheckOutPaymentFlag(flag){
                this.submitingFirstFormLoading = false;
            }
        },
        methods:{
            preventNav(event) {
                event.preventDefault()
                event.returnValue = ""
            },
            onInput(formattedNumber, {number, valid, country}) {
                this.phone.number = number.international;
                this.phone.valid = valid;
                this.phone.country = country && country.name;
                if(this.phone.valid){
                    this.phoneValidation = "";
                    this.showErrorPhonePayment=false;
                    // this.billToPhone = this.phone.number;
                } else {
                    this.phoneValidation = "notvalid phone";
                    this.showErrorPhonePayment=true;
                }

            },
            submitFirstForm(){
                if(this.$refs.basicInfoPaymentForm.validate() && this.phone.number !== ''){
                    this.submitingFirstFormLoading = true;
                    this.dbFirstDataForm.bill_to_forename= this.billToForename;
                    this.dbFirstDataForm.bill_to_surname= this.billToSurname;
                    this.dbFirstDataForm.bill_to_email= this.billToEmail;
                    this.dbFirstDataForm.bill_to_phone= this.billToPhone;
                    this.dbFirstDataForm.bill_to_address_line1= this.billToAddressLine1;
                    this.dbFirstDataForm.bill_to_address_city= this.billToAddressCity;
                    this.dbFirstDataForm.bill_to_address_state= this.billToAddressState;
                    this.dbFirstDataForm.bill_to_address_country= this.billToAddressCountry;
                    this.dbFirstDataForm.bill_to_address_postal_code= this.billToAddressPostalCode;
                    this.dbFirstDataForm.bill_to_phone = this.phone.number;

                    this.$store.dispatch('submitFirstPaymentForm', {firstDataForm: this.dbFirstDataForm});


                    console.log(this.dbFirstDataForm);
                    // this.submitingFirstFormLoading = true
                }else if(this.phoneValidation !== ''){
                    this.phoneValidation = "required";
                    this.showErrorPhonePayment=true;
                }
                if(this.phone.number === ""){
                    this.phoneValidation = "required";
                    this.showErrorPhonePayment=true;
                }
            },
            // backToFirst(){
            //     this.disableFirstForm = false;
            //     this.disableSecondForm = true;
            // },
            proTopayment(){
                if(this.$refs.secondPaymentForm.validate() && this.card_type !== ""){
                    this.submitingFirstFormLoading = true;
                    this.dbSecondDataForm.bill_to_forename= this.billToForename;
                    this.dbSecondDataForm.bill_to_surname= this.billToSurname;
                    this.dbSecondDataForm.bill_to_email= this.billToEmail;
                    this.dbSecondDataForm.bill_to_phone= this.billToPhone;
                    this.dbSecondDataForm.bill_to_address_line1= this.billToAddressLine1;
                    this.dbSecondDataForm.bill_to_address_city= this.billToAddressCity;
                    this.dbSecondDataForm.bill_to_address_state= this.billToAddressState;
                    this.dbSecondDataForm.bill_to_address_country= this.billToAddressCountry;
                    this.dbSecondDataForm.bill_to_address_postal_code= this.billToAddressPostalCode;
                    this.dbSecondDataForm.bill_to_phone = this.phone.number;

                    this.dbSecondDataForm.card_type = this.card_type;
                    this.dbSecondDataForm.card_number = this.card_number;
                    this.dbSecondDataForm.card_expiry_date = this.card_expiry_date;

                    console.log(this.dbSecondDataForm , "SECOND FORM befor submit");

                    this.$store.dispatch('checkOutPayment', {checkout: this.dbSecondDataForm})

                }else if(this.card_type === ""){
                    this.$store.dispatch('appMsgs', {
                        msg: "pricing.payment.Choose Payment Method:",
                        color: "info",
                        icon: "info"
                    });
                }
            },
        }
    }
</script>

<style scoped>
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
        border: 1px solid red !important;
    }
    /*///////////end/////////*/
    /*.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {*/
    /*    background-color: hsl(0, 0%, 83%)!important;*/
    /*}*/
    >>>.active-method{
        background-color: #E60000;
        border: 2px solid #E60000 !important;
    }

    >>>.inputNumber input[type='number'] {
        -moz-appearance:textfield;
    }
    >>>.inputNumber input::-webkit-outer-spin-button,
    >>>.inputNumber input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    >>>.v-card--disabled {
         pointer-events: inherit;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: not-allowed !important;
    }
</style>