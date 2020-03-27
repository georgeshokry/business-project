<template>
    <v-container height="fit-content">
        <v-layout row wrap style="justify-content: center;">
            <v-card flat width="100%" min-height="60vh" style="background-color: #ffffff;background-image: url(https://ssl.gstatic.com/support/content/images/static/homepage_header_background.svg); background-position: 50%;">
            <v-card-title class="help-center-title font-weight-bold ">
               {{$t('help-center.helpCenter.Help Center')}}
            </v-card-title>


            <v-layout row wrap justify-content-center>
                <v-hover
                        v-slot:default="{ hover }"
                        v-for="(item,i) in faqsCards" :key="i"
                >
                    <v-card :ripple="{ class: 'red--text' }" :elevation="hover ? 5 : 2" min-width="230" height="70" @click="chooseSection(item.title)" class="ma-2" style="border-radius:10px;">
                        <v-card-title style="padding: 10px" >
                            <img width="50px" height="50px" class="img-help" :src="item.img" :style="[ checkRtlFlag === true ? {'transform': 'rotateY(180deg)'} : '' ]">
                            {{item.title}}
                        </v-card-title>
                </v-card>
                </v-hover>
            </v-layout>

        </v-card>
            <question-answers></question-answers>
        </v-layout>

            <v-card flat  style="background-color: #ffffff;">

                <v-card-title class="help-center-title font-weight-bold pa-0"  >
                    <div @click="showHelpForm()" class="contact-title">
                        {{$t('help-center.helpCenter.Still Need Help? Contact Us')}}
                    </div>
                </v-card-title>
                <v-expand-transition>
                    <div>
                    <v-form ref="formHelp" >
                <v-layout row wrap style="justify-content: center;"  v-if="guestContactUsFlag">
                <v-flex d-flex xl2 lg7 xs10 >
                <v-layout row wrap style="justify-content: center;" >
                    <v-flex d-flex xl2 lg3 xs10 >
                        <v-text-field
                            v-model="nameofsender"
                                class="ma-1"
                                color="#e60000"
                                dense
                                :placeholder="$t('help-center.helpCenter.Name')"
                                solo
                            :rules="[value => !!value || $t( 'registration.signup.required' )]"
                        ></v-text-field>
                    </v-flex>
                    <v-flex d-flex xl2 lg3 xs10 >
                        <v-text-field
                            v-model="email"
                                class="ma-1"
                                color="#e60000"
                                dense
                            :placeholder="$t('help-center.helpCenter.Email')"
                                solo
                            :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' ), value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || $t('registration.signup.emailvalid')]"
                        ></v-text-field>
                    </v-flex>
                    <v-flex d-flex xl2 lg3 xs10 >
                        <v-text-field
                            v-model="subject"
                                class="ma-1"
                                color="#e60000"
                                dense
                            :placeholder="$t('help-center.helpCenter.Subject')"
                                solo
                            :rules="[value => !!value || $t( 'registration.signup.required' )]"
                        ></v-text-field >
                    </v-flex>
                    <v-flex d-flex xl3 lg9 xs10 >
                        <v-layout column wrap style="justify-content: start;" >
                            <v-flex lg5 style="text-align: end;">
                                <v-textarea
                                    v-model="message"
                                        color="#e60000"
                                        no-resize
                                        dense
                                    :placeholder="$t('help-center.helpCenter.Message')"
                                        solo
                                    :rules="[value => !!value || $t( 'registration.signup.required' )]"
                                ></v-textarea>
                                <v-btn
                                        elevation="2"
                                        rounded
                                        small
                                        color="#e60000"
                                        dark
                                        @click="SendHelpMessage()"
                                >
                                    {{$t('registration.professionalRegisteration.submit')}}
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
                </v-flex>

                </v-layout>
                    </v-form>
                    </div>
                </v-expand-transition>
                <help-ticket-dialog :editHeplDialog="EditHelpDialog" @closeEditHelpDialog="closeEditHelpDialog"></help-ticket-dialog>
            </v-card>
    </v-container>
</template>

<script>
    import QuestionAnswers from "./questionAnswers";
    import HelpTicketDialog from "../help-component/helpTicketDialog";
    export default {
        name: "help-center",
        components: {HelpTicketDialog, QuestionAnswers},
        data:()=>{
            return{
                checkRtlFlag: null,
                guestContactUsFlag: false,
                EditHelpDialog: false,
                nameofsender:"",
                email:"",
                subject:"",
                message:"",
                emailRules: [
                    (v) => !!v || 'E-mail is required',
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],


                faqsCards:[
                    {
                        title: "Professionals",
                        img: "/images/Help_Professional_rotated_Red.svg"
                    },
                    {
                        title: "Enterprises",
                        img: "/images/Help_Enterprises_rotated_Red.svg"
                    },
                    // {
                    //     title: "Auctions",
                    //     img: "/images/Help_Auctions_rotated_Red.svg"
                    // },
                    // {
                    //     title: "Exhibitions",
                    //     img: "/images/Help_Exhibitions_rotated_Red.svg"
                    // },
                    {
                        title: "Billing & Payment",
                        img: "/images/Help_Payment_rotated_Red.svg"
                    }
                ]
            }
        },
        created(){
            this.$vuetify.rtl === true ? this.checkRtlFlag = true : "";
        },
        computed: {
            checkRtl() {
                return this.$vuetify.rtl;
            },
        },
        watch:{
            checkRtl(flag){
                flag === true ? this.checkRtlFlag = true : this.checkRtlFlag = false;
            }
        },
        methods:{
            chooseSection(title){
                this.$store.commit('setSectionChoosen', title)
            },
            showHelpForm(){
                let userProfile = this.$store.getters.getUserProfiles;
                if(userProfile === null){
                    userProfile = false;
                }
                console.log(userProfile, "HELPPPP")
                if(userProfile !== false ){
                    this.openEditHelpDialogNow();
                }else if(userProfile === false){
                    this.guestContactUsFlag = !this.guestContactUsFlag;
                }
            },
            openEditHelpDialogNow() {
                this.EditHelpDialog = true;
            },
            closeEditHelpDialog() {
                this.EditHelpDialog = false;
            },
            SendHelpMessage()
            {

                this.$store.commit('setClearAppMsgs');
                if (this.$refs.formHelp.validate()) {

                    this.$store.dispatch('SendHelpMessage', {
                        name: this.nameofsender,
                        email: this.email,
                        subject: this.subject,
                        message: this.message,
                    });
                    this.$refs.form.reset();
                    this.nameofsender = "";
                    this.subject = "";
                    this.message = "";
                }

            },
        }
    }
</script>

<style scoped>
>>>.help-center-title{
    color: rgb(230, 0, 0);
    height: 100px;
    justify-content: center;
    font-size: xx-large;

}
    >>>.smaller-font-card{
        font-size: smaller;
    }
    >>>.contact-title{
        font-size: 25px;
        text-align: center;
        cursor: pointer;
        word-break: normal;
    }
>>>.v-text-field.v-text-field--enclosed .v-text-field__details {
     margin-bottom: 0px;
}

    >>>.img-help{
        padding: 5px;
    }
</style>
