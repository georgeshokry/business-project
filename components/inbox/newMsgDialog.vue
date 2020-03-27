<template>
    <v-dialog

            v-model="newMsgDialog"
            width="420"
            scrollable
            persistent
    >
        <v-card>



            <v-card-title>
                <v-layout>
                    <v-card-title style="font-weight: 300;text-align: initial">
                    {{$t('inbox-component.newMsgDialog.New Message to')}} &nbsp; <span style="font-weight: bold;">{{userInfo.name}}</span>
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn color="#E60000" icon @click="closeNewMsgDialog">
                        <v-icon  color="#E60000">
                            close
                        </v-icon>
                    </v-btn>
                </v-layout>

            </v-card-title>





            <v-card-text>
                <v-form
                        ref="newMsgForm"
                >

                        <v-text-field
                                v-model="subjectText"
                                shaped
                                :label="$t('inbox-component.newMsgDialog.Subject')"
                                color="#E60000"
                                filled
                                :rules="[value => !!value || $t( 'registration.signup.required' )]"
                                counter="25"
                        ></v-text-field>
                        <v-textarea
                                v-model="msgText"
                                filled
                                shaped
                                :label="$t('inbox-component.newMsgDialog.Message Content')"
                                color="#E60000"
                                auto-grow
                                counter="250"
                                :rules="[value => !!value || $t( 'registration.signup.required' )]"
                        >
                        </v-textarea>
                        <v-card-actions class="justify-space-between">

                        <v-menu offset-y close-on-click>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        small
                                        outlined
                                        color="#FF0000"
                                        dark
                                        v-on="on"
                                        :loading="allProfiles.length ===0"
                                >
                                    {{$t('inbox-component.newMsgDialog.send as')}} <v-icon right color="#E60000">arrow_drop_down</v-icon>
                                </v-btn>
                            </template>

                            <v-list-item-group mandatory color="#E60000" >
                        <v-list
                                style="width:100%"
                                v-for="(item, index) in allProfiles"
                                :key="index"
                        >

                            <v-list-item
                                    @click="selectProfile(item.slug,item.profile_type)"
                                    :ripple="{ class: 'red--text' }"

                            >
                                <v-list-item-avatar >
                                    <v-img width="100%" :src="'/images/med/' + item.pic"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content >
                                    <v-list-item-title >
                                        {{ item.name }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider
                                    class="ma-0"
                                    :key="index"
                            ></v-divider>
                        </v-list>
                            </v-list-item-group>
                        </v-menu>
                            <v-btn

                                    :disabled="allProfiles.length===0"
                                    elevation="0"
                                    @click="sendMsg"
                                    color="#ff0000"
                                    dark
                                    small
                            >
                                <img width="20" style="margin: 0 3px 0 3px" src="../resources/Send_White.svg" >  {{$t('inbox-component.newMsgDialog.send')}}
                            </v-btn>
                        </v-card-actions>

                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import userInfoMixin from "../userInfoMixin";
    export default {
        name: "newMsgDialog",
        mixins: [userInfoMixin],
        data:()=>{
            return{
                rules: {
                    required: value => !!value || 'Required.',
                    subject: v => (v && v.length <= 25) || 'Maximum 25 characters',
                    msg: v => (v && v.length <= 250) || 'Maximum 250 characters',
                },
                subjectText:'',
                msgText:'',
                allProfiles:[],
                slugSelected: '',
                typeSlected: '',
            }
        },
        props:{
            newMsgDialog:{
                default: false,
                type: Boolean,
            }
        },

        computed: {
            getAllProfileType() {
                return this.$store.getters.getAllProfileType;
            },
        },
        watch: {
            getAllProfileType(profile) {
                this.allProfiles = [];
                if (profile) {
                    this.allProfiles = [];
                    for (let i in profile) {
                        this.allProfiles.push({
                            name: profile[i].name,
                            slug: profile[i].slug,
                            pic: profile[i].pic,
                            profile_type: profile[i].profile_type
                        });
                    }
                    this.slugSelected = profile[0].slug;
                    this.typeSlected = profile[0].profile_type
                }
            },
        },
        methods: {
            selectProfile(slug,type){
                this.slugSelected = slug;
                this.typeSlected = type;
            },
            closeNewMsgDialog() {
                this.$emit('closeNewMsgDialog');
            },
            sendMsg(){
                this.$store.commit('setClearAppMsgs');
                 if(this.$refs.newMsgForm.validate()) {
                    this.$store.dispatch('sendNewMessage', {
                        slug: this.$route.params.id,
                        subject: this.subjectText,
                        msg: this.msgText,
                        sendslug: this.slugSelected,
                         sendtype: this.typeSlected,

                    });
                    this.$emit('closeNewMsgDialog');

                        this.subjectText='';
                        this.msgText='';



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
