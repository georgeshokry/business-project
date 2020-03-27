<template>
    <v-dialog
            persistent
            v-model="editHeplDialog"
            width="490"
            scrollable
    >
        <v-card>
            <v-layout column wrap style="align-items: flex-end;width: 100%;    height: 0;">
        <v-btn icon small fab style="margin: 5px;" color="#E60000" @click="closeEditHelpDialog">
            <v-icon  color="#E60000">
                close
            </v-icon>
        </v-btn>
            </v-layout>
            <v-card-title class="pb-0 justify-center">
                <img width="45" src="../resources/Help_Ticket_Red.svg">
            </v-card-title>
        <v-card-title class="justify-center pt-0" style="color:#E60000;">
            {{$t('report-component.reportTicketDialog.What do you need help with?')}}

        </v-card-title>
            <v-card-text>
            <v-form
                    ref="ticketForm"
            >
            <v-card-text>

                <v-radio-group mandatory column v-model="helpChoice" :rules="[value => !!value || $t( 'registration.signup.required' )]">
                    

                     <div v-for="(item,i) in helpRadio">
                        <v-radio color="#E60000" :label="item" :value="item" ></v-radio>

                    </div>
                </v-radio-group>
              
                <v-text-field
                        v-if="helpChoice === 'other'"
                        v-model="otherData"
                        :disabled="helpChoice !== 'other'"
                        label="Other"
                        color="#E60000"
                        filled
                        counter="25"
                        maxlength="25"
                        :rules=" helpChoice === 'other' ? [ value => !!value || $t( 'registration.signup.required' ), v => (v && v.length <= 10) || $t( 'registration.professionalRegisteration.Minimum 25 characters' )] : []"
                >

                </v-text-field>
                <div style="text-align: initial">
                    {{$t('report-component.reportTicketDialog.Please send us a summary of the issue you are facing')}}

                </div>
                <v-textarea
                        v-model="summaryData"
                        filled
                        color="#E60000"
                        auto-grow
                        counter="200"
                        maxlength="200"
                        :rules="[value => !!value || $t( 'registration.signup.required' )]"
                >
                </v-textarea>
            </v-card-text>
                <v-card-actions style="justify-content: center;">
                    <v-btn
                            @click="sendTicket()"
                            small
                            color="#E60000"
                            style="border-radius: 10px 10px 10px 10px ;"
                            dark
                    >
                        {{$t('report-component.reportTicketDialog.Submit')}}
                    </v-btn>
                </v-card-actions>
            </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "helpTicketDialog",
        data:()=>{
            return{
                otherData: '',
                summaryData: '',
                rules: {
                    required: value => !!value || 'Required.',
                    maxOther: v => (v && v.length <= 10) || 'Maximum 25 characters',
                    maxSummary: v => (v && v.length <= 200) || 'Maximum 200 characters',
                },
                helpChoice:'',
                helpRadio:[],
            }
        },
        props: {
            editHeplDialog: {
                default: false,
                type: Boolean,
            },
        },
           created(){

             this.$store.dispatch('HelpOpetions', {lang: this.$i18n.locale});

        },
         computed:{
            checkUserAuth(){
                return this.$store.getters.getAuthFlag;
            },

            getAppMsgs(){
                return this.$store.getters.getAppMsgs;
            },

             getAllHelp(){
                return this.$store.getters.getAllHelp;
            },
        },
           watch:{
            getAppMsgs(flag){
                if(flag.appSnackbarMsgs === null) {
                    this.editSliderDialog = false;
                }
            },
            checkUserAuth(flag){
                if(flag === true) {
                    this.authFlagForEdit = true;
                }else if (flag === false){
                    this.authFlagForEdit = false;
                }
            },
            getAllHelp(help){
                this.helpRadio =[];
                if(help) {
                          for(let i in help){
                this.helpRadio.push(help[i].help_option);
            }
                 



            }
        }
    },


        methods:{
            closeEditHelpDialog(){
                this.$emit('closeEditHelpDialog');
            },
            sendTicket(){

                let userSlug = this.$store.getters.getUserProfiles;
                console.log(this.$route.params.id, userSlug[0].slug,"HELP TICKET DDDD");
                         this.$store.commit('setClearAppMsgs');
                if(this.$refs.ticketForm.validate()) {
                    this.$store.dispatch('sendTicketHelp', {
                        slug: this.$route.params.id !== undefined ? this.$route.params.id : userSlug[0].slug,
                        helpChoice: this.helpChoice,
                        otherData: this.otherData,
                        summaryData: this.summaryData,

                    });
                    this.$emit('closeEditHelpDialog');
                  
                        this.helpChoice='';
                        this.otherData='';
                       this.summaryData='';
                    this.$refs.ticketForm.reset();

                }else {
                    this.$store.commit('setAppMsgs', {
                        msg:"Please Fill all inputs!",
                        color: "info",
                        icon: ""
                    })
                }

                
            }
        }
    }
</script>

<style scoped>

</style>