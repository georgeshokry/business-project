<template>
    <v-card flat>
        <v-card-title class="font-weight-bold justify-space-between">
            <div >{{$t('profile.faqs.FAQs')}}</div>
            <v-btn icon color="#E60000" @click="editFAQs" v-if="authFlagForEditFaqs ">
                <v-icon color="#E60000">
                    edit
                </v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <v-layout row v-if="loadingFaqs" justify-center >
            <v-skeleton-loader
                    type="chip"
                    style="margin: 0 10px 0 10px;"
            ></v-skeleton-loader>
                <v-skeleton-loader
                        type="chip"
                        style="margin: 0 10px 0 10px;"
                ></v-skeleton-loader>
                <v-skeleton-loader
                        type="chip"
                        style="margin: 0 10px 0 10px;"
                ></v-skeleton-loader>
            </v-layout>
            <div v-else-if="noData && authFlagForEditFaqs" class="no-data">
                {{$t('profile.faqs.Add new questions')}}
            </div>
            <div v-else>
                <v-layout row v-if="startEditField"  justify-center>
                    <div v-for="(item,i) in faqs">
                        <v-chip
                                :disabled="userLogged !== false"
                                color="#f3f3f3"
                                class="ma-2"
                                @click="sendFaqsMessage(item.title)"
                        >
                            {{item.title}}
                        </v-chip>

                    </div>
                </v-layout>
            </div>

        </v-card-text>

        <v-dialog
                persistant
                scrollable
                v-model="editFAQsDialog"
                max-width="350"
        >
            <v-card>


                <v-card-title class=" justify-space-between" >
                    {{$t('profile.faqs.Edit questions')}}
                    <v-btn icon color="#E60000" @click="editFAQsDialog= false">
                        <v-icon color="#E60000" small >close</v-icon>
                    </v-btn>
                </v-card-title>


                <v-card-text>
                    <v-autocomplete
                            color="#E60000"
                            v-model="dropdownSelect"
                            :items="comboboxFAQs"
                            :label="$t('profile.faqs.Select FAQs')"
                            multiple
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
                    <v-card-text class="pr-0 pl-0" style="text-align: initial">
                        {{$t('profile.faqs.Or write new')}}
                        <v-btn icon color="#E60000" @click="add()" v-if="inputs.length < 4">
                            <v-icon smaller color="#E60000">add_circle_outline</v-icon>
                        </v-btn>
                    </v-card-text>
                    <v-layout row wrap v-for="(input,k) in inputs" :key="k" style="align-items: center;    margin: 3px;">
                        <v-text-field
                                v-model="input.newQuestion"
                                :label="$t('profile.faqs.Write New Question')"
                                color="#E60000"
                                :rules="[v => v.length <= 25 || $t('registration.signup.Maximum 25 characters')]"
                                counter="25"
                                maxlength="25"
                        >

                        </v-text-field>
                        <v-btn icon @click="remove(k)" >
                            <v-icon smaller color="#E60000">remove_circle_outline
                            </v-icon>
                        </v-btn>
                    </v-layout>

                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn
                            color="#E60000"
                            text
                            @click="editFAQsDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn
                            color="#E60000"
                            dark
                            elevation="0"
                            @click="saveFAQs"
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
        name: "faqs",
        mixins: [userInfoMixin],
        data:()=> {
            return {
                loadingFaqs: true,
                rules: {
                    required: value => !!value || 'Required.',
                    max: v => v.length <= 25 || 'Maximum 25 characters',
                },
                inputs: [],
                authFlagForEditFaqs: false,
                selectedFAQs: null,
                selectedtitle: null,
                selectFlag: false,
                editFAQsDialog: false,

                selectedServices: [],
                search: null,
                chips: true,
                multiple: true,
                hideSelected: true,
                noData: true,
                dbData: false,
                clearable: false,

                startEditField: true,
                editField: false,
                userLogged: null,

                dropdownSelect: [],
                comboboxFAQs: [],
                chipSelected: "",
                faqs: [],
                faqsselected: [],

                comboboxFAQsWithIds: [],
            }
        },
        created() {

            this.$store.dispatch('Faqs', {id: this.$route.params.id, lang: this.$i18n.locale});
            //get selected fqs
            this.$store.dispatch('selectedFaqs', {id: this.$route.params.id, lang: this.$i18n.locale});

            this.$store.dispatch('ComboboxFaqs', {id: this.$route.params.id, lang: this.$i18n.locale});

            this.$store.dispatch('OtherFaqs', {id: this.$route.params.id, lang: this.$i18n.locale});


        },

        computed: {
            checkUserAuth() {
                return this.$store.getters.getAuthFlag;
            },
            getFaqs() {
                return this.$store.getters.getFaqs;
            },
            getSelectedFaqs() {

                return this.$store.getters.getSelectedFaqs;
            },

            getComboboxFaqs() {

                return this.$store.getters.getComboboxFaqs;
            },
            getOtherFaqs() {

                return this.$store.getters.getOtherFaqs;
            },
            getAppMsgs() {
                return this.$store.getters.getAppMsgs;
            },
            getLocalLang(){
                return this.$i18n.locale;
            }
        },
        watch: {
            getLocalLang(lang){
                this.$store.dispatch('Faqs', {id: this.$route.params.id, lang: lang});
                this.$store.dispatch('selectedFaqs', {id: this.$route.params.id, lang: lang});
                this.$store.dispatch('ComboboxFaqs', {id: this.$route.params.id, lang: lang});
                // this.$store.dispatch('OtherFaqs', {id: this.$route.params.id, lang: lang});
            },
            getAppMsgs(flag) {
                if (flag.appSnackbarMsgs === null) {
                    this.editSliderDialog = false;
                }
            },
            checkUserAuth(flag) {
                console.log(flag, "loggedddddd");
                if (flag === true) {

                    this.authFlagForEditFaqs = true;
                    this.userLogged = true;
                } else if (flag === false) {
                    this.authFlagForEditFaqs = false;
                    this.userLogged = false;
                }else {
                    this.userLogged = 'not_auth';
                }
            },
            ///all faqs (written + selected) for viewing in component
            getFaqs(faqs) {

                this.faqs = [];
                this.inputs = [];
                this.loadingFaqs = true;

                if(faqs !== null) {


                    if(faqs.allFaqs.length !== 0){

                       for (let i in faqs.allFaqs) {
                           this.faqs.push({title: faqs.allFaqs[i].title});
                       }
                        if (faqs.allOthersFaqs.length !== 0 ) {
                            for (let j in faqs.allOthersFaqs) {
                                this.faqs.push({title: faqs.allOthersFaqs[j].title});
                                this.inputs.push({newQuestion: faqs.allOthersFaqs[j].title})
                            }
                        }
                        this.noData = false;
                        this.dbData = true;
                        this.loadingFaqs = false;

                   }else {
                        this.noData = true;
                        this.dbData = false;
                        this.loadingFaqs = false;

                    }


                }else {
                    this.loadingFaqs = false;
                }
            },
            /// the user selected before to add in v-model
            getSelectedFaqs(selectedfaqs) {
                if (selectedfaqs) {
                    this.dropdownSelect = [];
                    for (let i in selectedfaqs) {
                        this.dropdownSelect.push(selectedfaqs[i].title);
                    }
                }
            },
            /// the combobox (dropdown) the user will select from
            getComboboxFaqs(comboboxFaqs) {
                this.comboboxFAQs = [];
                this.comboboxFAQsWithIds = [];
                if (comboboxFaqs) {
                    this.comboboxFAQs = [];
                    this.comboboxFAQsWithIds = [];
                    for (let i in comboboxFaqs) {
                        this.comboboxFAQs.push(comboboxFaqs[i].title);
                        this.comboboxFAQsWithIds.push(comboboxFaqs[i]);
                    }


                }


            },
            /// the faqs the user written before in text fields
            // getOtherFaqs(OtherFaqs) {
            //     if (OtherFaqs.length !== 0) {
            //         this.inputs = [];
            //         for (let i in OtherFaqs) {

            //             this.inputs.push({newQuestion: OtherFaqs[i].faq});
            //         }
            //     }
            // },

        },
        methods: {
            viewFAQSDetails(id) {
                this.selectFlag = false;
                this.selectedFAQs = null;
                this.selectedtitle = null;
                // inventory.find( ({ name }) => name === 'cherries' );
                let result = this.fagsChips.find(det => det.id === id);
                this.selectedFAQs = result.details;
                this.selectedtitle = result.question;
                this.selectFlag = true;
            },
            editFAQs() {
                this.editFAQsDialog = true;
            },
            checkArray(my_arr) {


                if (my_arr.length === 0) {
                    return true;
                } else {

                    let a = [];

                    for (let i = 0, l = my_arr.length; i < l; i++)
                        if (a.indexOf(my_arr[i].newQuestion) === -1 && my_arr[i].newQuestion !== '')

                            a.push(my_arr[i].newQuestion);
                    //console.log(this.comboboxFAQs.some(v =>a.includes(v)),'kkkl',this.comboboxFAQs,a)
                    if (a.some(v => this.comboboxFAQs.includes(v))) {
                        return false;
                    }
                    if (my_arr.length === a.length) {
                        return true;
                    } else {
                        return false;

                    }


                }


            },
            sendFaqsMessage(faq) {
                if (this.userLogged === false) {
                    console.log("faq send")
                    this.$store.dispatch('sendFaqsMessage', {
                        slug: this.$route.params.id,
                        faqname: faq,


                    });
                }

            },

            saveFAQs() {
                let checkArray = this.checkArray(this.inputs);

                this.$store.commit('setClearAppMsgs');
                if (this.dropdownSelect.length !== 0 && checkArray) {
                    let comboboxFAQs_ids = [];
                    for(let i in this.dropdownSelect){
                        comboboxFAQs_ids.push(
                            this.comboboxFAQsWithIds.find(id => id.title === this.dropdownSelect[i]).faq_id
                        )
                    }
                    this.$store.dispatch('saveFAQsData', {
                        slug: this.$route.params.id,
                        faqsselected: comboboxFAQs_ids,
                        inputs: this.inputs,
                        lang: this.$i18n.locale,

                    });
                    this.editFAQsDialog = false;

                } else {
                    this.$store.commit('setAppMsgs', {
                        msg: 'profile.faqs.Please Fill all inputs!',
                        color: "info",
                        icon: "info"
                    })
                }

            },
            add() {
                this.inputs.push({newQuestion: ''});
            },
            remove(index) {
                this.inputs.splice(index, 1);
            },

        }
    }
</script>

<style >
    .v-application .primary--text {
        color: red !important;
        caret-color: red !important;
    }
    .v-list-item.primary--text.v-list-item--active.v-list-item--link.theme--light {
        color: red !important;
        caret-color: red !important;
    }
    .primary--text .mdi-checkbox-marked{
        color: red !important;
        caret-color: red !important;
    }
    .no-data{
        font-size: large;
        text-align: center;
        color: #cccccc;
    }
</style>
