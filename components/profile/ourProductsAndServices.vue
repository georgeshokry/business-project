<template>
    <v-card tile flat>
        <v-card-title class="font-weight-bold justify-space-between">
            <div >{{$t('profile.ourProductsAndServices.Our Products And Services')}} <span style="color: red" v-if="authFlagForOurProd">*</span></div>
            <v-btn icon color="#E60000" @click="editProducts" v-if="authFlagForOurProd">
                <v-icon color="#E60000">
                    edit
                </v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text style="text-align: initial">
            <v-skeleton-loader
                    v-if="userInfo === ''"
                    type="paragraph"
                    tile
            ></v-skeleton-loader>
            <div v-if="startEditField" v-html="userInfo.about_services_products" style="text-align: initial">

            </div>
            <div v-if="userInfo.about_services_products == null && authFlagForOurProd" style="      padding-top: 25px;  font-size: large;text-align: center;color: #cccccc;">
                {{$t('profile.ourProductsAndServices.what are you offering for your customers?')}}
            </div>
            <div v-if="editField" style="    text-align: end;">
                <vue-editor v-model="newProducts" @text-change="getTextLengthPro()" ref="editorFocusPro" :editor-toolbar="customToolbar" />
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
                    @click="canceleProductEdit"
                >
                    {{ $t( 'profile.sliderProfile.Cancel' ) }}
                </v-btn>
                <v-btn
                    style="margin-top: 10px"
                    small
                    dark
                    elevation="0"
                    color="#E60000"
                    @click="saveProductsEdit"
                >
                    {{ $t( 'profile.sliderProfile.Save' ) }}
                </v-btn>
            </div>
        </v-card-text>


    </v-card>
</template>

<script>
    import userInfoMixin from "../userInfoMixin";
    import { VueEditor } from "vue2-editor";
    export default {
        name: "ourProductsAndServices",
        components:{
            VueEditor
        },
        mixins: [userInfoMixin],
        data:()=>{
            return{
                authFlagForOurProd: false,

                startEditField: true,
                editField: false,
                products:"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
                charCounter: 0,
                newProducts: "",
                maxCharMsg:"",
                customToolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }, { direction: "rtl" }]
                ],
            }
        },
        computed:{
            countChar(){
                return this.$refs.editorFocusPro.quill.getLength();
            },
            checkUserAuth(){
                return this.$store.getters.getAuthFlag;
            }
        },
        watch:{
            countChar(len){
                this.charCounter = len;
                if(len >= 500){
                    this.maxCharMsg = " - Maximum 500 characters";
                }else{
                    this.maxCharMsg = "";
                }
            },
            checkUserAuth(flag){
                if(flag === true) {
                    this.authFlagForOurProd = true;
                }else if (flag === false){
                    this.authFlagForOurProd = false;
                }else if (flag === 'not_auth'){
                    this.authFlagForOurProd = false;
                }
            }
        },
        methods:{
            getTextLengthPro(){
                this.charCounter = this.$refs.editorFocusPro.quill.getLength() - 1;
                if(this.charCounter >= 500){
                    this.maxCharMsg = "profile.about.cant save more than 500 characters";
                }else{
                    this.maxCharMsg = "";
                }
            },
            editProducts(){

                this.startEditField =false;
                this.editField = true;
                if(this.userInfo.about_services_products !==null) {
                    this.newProducts= this.userInfo.about_services_products;
                    this.charCounter = this.newProducts.length;
                }else {
                    this.charCounter = 0;
                }
            },
            saveProductsEdit(){
                this.$store.dispatch('clearAppMsgs');
                if(this.newProducts.length > 500){
                    this.$store.dispatch('appMsgs', {
                        msg: "profile.ourProductsAndServices.can't save more than 500 characters",
                        color: "red",
                        icon: "error"
                    })
                } else {
                    if(this.newProducts.length !== 0){
                        this.$store.dispatch('saveOurProducts', {
                            slug: this.$route.params.id,
                            content: this.newProducts,
                            lang: this.$i18n.locale,
                        });
                        this.products = this.newProducts;
                        this.editField = false;
                        this.startEditField = true;
                        this.charCounter = this.newProducts.length;
                    }else {
                        this.$store.dispatch('appMsgs', {
                            msg: "profile.ourProductsAndServices.please fill input",
                            color: "info",
                            icon: "info"
                        })
                    }

                }
            },
            canceleProductEdit(){
                this.newProducts = "";
                this.editField = false;
                this.startEditField =true;
            }
        }
    }
</script>

<style scoped>
    .warning-counter-color{
        color: red;
    }
    >>>p{
        margin-bottom: 0 !important;
    }
</style>
