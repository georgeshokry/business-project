<template>
    <v-card tile flat width="100%">
        <v-card-title class=" font-weight-bold justify-space-between">
            <div>{{$t('individualProfile.bio.Bio')}}<span style="color: red" v-if="authFlagForEdit">*</span></div>
            <v-btn icon color="#E60000" @click="editAbout" v-if="authFlagForEdit">
                <v-icon color="#E60000">
                    edit
                </v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text style="justify-content: center">




            <div v-if="startEditField" v-html="userInfo.about_company" style="text-align: initial">

            </div>
            <div v-if="userInfo.about_company === null && authFlagForEdit" style="font-size: large;text-align: center;color: #cccccc;">
                {{$t('individualProfile.bio.Tell us about your work')}}
            </div>
            <div v-if="editField" style="    text-align: end;">
                <vue-editor v-model="newBioData" @text-change="getTextLengthBio()" ref="editorFocusBio" :editor-toolbar="customToolbar" />
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
                    dark
                    elevation="0"
                    color="#E60000"
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
        name: "bio",
        components:{
            VueEditor
        },
        mixins: [userInfoMixin],
        data:()=>{
            return{
                authFlagForEdit: false,
                startEditField: true,
                editField: false,
                newBioData: "",
                charCounter: "",
                maxCharMsg:"",
                customToolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }, { direction: "rtl" }]
                ],
                bioData: "",
                rules: {
                    required: value => !!value || 'Required.',
                    max: v => v.length <= 400 || 'Maximum 400 characters',
                },
            }
        },
        computed:{
            countChar(){
                return this.newBioData.length
            },
            checkUserAuth(){
                return this.$store.getters.getAuthFlag;
            }
        },
        watch:{
            checkUserAuth(flag){
                if(flag === true) {
                    this.authFlagForEdit = true;
                }else if (flag === false){
                    this.authFlagForEdit = false;
                }
            },
            // countChar(len){
            //     this.charCounter = len;
            //     if(len >= 500){
            //         this.maxCharMsg = " - Maximum 500 characters";
            //     }else{
            //         this.maxCharMsg = "";
            //     }
            // }
        },
        methods:{
            getTextLengthBio(){
                this.charCounter = this.$refs.editorFocusBio.quill.getLength() - 1;
                if(this.charCounter >= 500){
                    this.maxCharMsg = "profile.about.cant save more than 500 characters";
                }else{
                    this.maxCharMsg = "";
                }
            },
            editAbout(){
                this.newBioData = this.userInfo.about_company;
                this.startEditField =false;
                this.editField = true;
                this.charCounter = this.newBioData.length;
            },
            saveAboutEdit(){

                if(this.newBioData !== "") {
                    if(this.newBioData.length > 500){
                        this.$store.dispatch('appMsgs', {
                            msg: "profile.about.cant save more than 500 characters",
                            color: "error",
                            icon: "error"
                        })
                    } else {
                        this.$store.dispatch('saveAboutCompany', {
                            slug: this.$route.params.id,
                            content: this.newBioData,
                            lang: this.$i18n.locale,
                        });
                        this.editField = false;
                        this.startEditField = true;
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
