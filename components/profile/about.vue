<template>
    <v-card tile flat>



        <v-card-title class="font-weight-bold justify-space-between">
            <div >{{$t('profile.about.about')}} <span style="color: red" v-if="authFlagForEditAboutSec">*</span></div>
            <v-btn icon color="#E60000" @click="editAbout" v-if="authFlagForEditAboutSec">
                <v-icon color="#E60000">
                    edit
                </v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text  style="text-align: initial;">
            <v-skeleton-loader
                    v-if="userInfo === ''"
                    type="sentences"
                    tile
            ></v-skeleton-loader>
            <div v-if="startEditField" v-html="userInfo.about_company" style="text-align: initial">

            </div>
            <div v-if="userInfo.about_company === null && userInfo !== '' " style="  font-size: large;text-align: center;color: #cccccc;" >
                {{$t('profile.about.what is your business?')}}
            </div>
            <div v-if="editField" style="    text-align: end;">
                <vue-editor v-model="newAboutData" @text-change="getTextLength()" ref="editorFocus" :editor-toolbar="customToolbar"/>
                <div  :class="[charCounter > 500  ? 'warning-counter-color' : '',]">
                    <span>{{$t(maxCharMsg)}}&nbsp;</span>{{charCounter}}/500
                </div>
<!--            <v-textarea-->
<!--                color="red"-->
<!--                filled-->
<!--                label="Edit About"-->
<!--                :value="aboutData"-->
<!--                v-model="newAboutData"-->
<!--                row="5"-->
<!--                counter-->
<!--                :rules="[rules.required, rules.max]"-->
<!--            >-->
<!--            </v-textarea>-->

                <v-btn
                    style="margin-top: 10px"
                    small
                    text
                    color="#E60000"
                    @click="canceleAboutEdit"
                >
                    {{$t('profile.sliderProfile.Cancel')}}
                </v-btn>
                <v-btn
                    style="margin-top: 10px"
                    small
                    color="#E60000"
                    dark
                    elevation="0"
                    @click="saveAboutEdit"
                >
                    {{$t('profile.sliderProfile.Save')}}
                </v-btn>
            </div>
        </v-card-text>


    </v-card>
</template>

<script>
    import userInfoMixin from "../userInfoMixin";
    import { VueEditor } from "vue2-editor";
    export default {
        name: "about",
        components:{
            VueEditor
        },
        mixins: [userInfoMixin],
        data:()=>{
            return{
                authFlagForEditAboutSec: false,
                startEditField: true,
                editField: false,
                newAboutData: "",
                charCounterAbout: "",
                maxCharMsg:"",
                customToolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }, { direction: "rtl" }]
                ],
                aboutData: "",
                rules: {
                    required: value => !!value || 'Required.',
                    max: v => v.length <= 400 || 'Maximum 400 characters',
                },
                charCounter: 0
            }
        },
        computed:{
            checkrtl(){
                return this.$vuetify.rtl;
            },
          countChar(){
              return this.$refs.editorFocus.quill.getLength();
          },
            checkUserAuth(){
                return this.$store.getters.getAuthFlag;
            }
        },
        watch:{
            checkrtl(flag){

            },
            checkUserAuth(flag){
                if(flag === true) {
                    this.authFlagForEditAboutSec = true;
                }else if (flag === false){
                    this.authFlagForEditAboutSec = false;
                }
            },
            countChar(len){
                console.log(len);
               // this.charCounterAbout = len;
               //  if(len >= 500){
               //      this.maxCharMsg = " - Maximum 500 characters";
               //  }else{
               //      this.maxCharMsg = "";
               //  }
            }
        },
        methods:{
            editAbout(){
                this.newAboutData = this.userInfo.about_company;
                this.startEditField =false;
                this.editField = true;

            },
            getTextLength(){

                this.charCounter = this.$refs.editorFocus.quill.getLength() -1;
                if(this.charCounter >= 500){
                    this.maxCharMsg = "profile.about.cant save more than 500 characters";
                }else{
                    this.maxCharMsg = "";
                }
            },
            saveAboutEdit(){
                if(this.newAboutData !== "") {
                    if(this.newAboutData.length > 500){
                        this.$store.dispatch('appMsgs', {
                            msg: "profile.about.cant save more than 500 characters",
                            color: "red",
                            icon: "error"
                        })
                    } else {
                        if(this.newAboutData.length !== 0) {
                            this.$store.dispatch('saveAboutCompany', {
                                slug: this.$route.params.id,
                                content: this.newAboutData,
                                lang: this.$i18n.locale,
                            });
                            this.editField = false;
                            this.startEditField = true;
                        } else {
                            this.$store.dispatch('appMsgs', {
                                msg: "profile.ourProductsAndServices.please fill input",
                                color: "info",
                                icon: "info"
                            })
                        }
                    }
                }
            },
            canceleAboutEdit(){
                this.editField = false;
                this.startEditField =true;
            }
        }
    }
</script>

<style scoped>

    >>>.warning-counter-color{
        color: red;
    }
    >>>p{
        margin-bottom: 0 !important;
    }
</style>
