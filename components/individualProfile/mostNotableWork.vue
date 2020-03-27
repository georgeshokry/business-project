<template>
    <div>
        <v-card-title tile class="font-weight-bold justify-space-between">
            <div style="letter-spacing: 0;">{{userInfo.providertype === 'service' ? $t('individualProfile.mostNotableWork.Most Notable Work') : userInfo.providertype === 'product' ? $t('individualProfile.mostNotableWork.Products') : ''}}<span style="color: red" v-if="authFlagForEdit">*</span></div>
            <v-btn  @click="addProductDialog = true"
                    elevation="0"
                    small
                    color="#E60000"
                    style=" color: white; "
                    rounded
                    v-if="productsData.length < 5 && authFlagForEdit"

            >
                {{$t('individualProfile.mostNotableWork.Add New Item')}} <v-icon color="white" right>add_circle_outline</v-icon>

            </v-btn>
        </v-card-title>
        <div v-if="loading" >
            <v-layout
                    fill-height
                    align-center
                    justify-center
                    ma-0
            >
                <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
            </v-layout>
        </div>
        <div v-if="noData && authFlagForEdit" style="font-size: large;text-align: center;color: #cccccc;">
            {{$t('individualProfile.mostNotableWork.Show your most unique products here')}}
        </div>
        <v-card flat v-if="productsData.length !== 0">
            <flickity  v-if="Object.keys(productsData).length > 0" ref="flickity"  :options="flickityOptions" >
                <div class="carousel-cell " style="background-color: white; width: 100%;min-height:230px !important;" v-for="(product,p) in productsData" >

                    <v-layout row wrap justify-center align-center>
                    <v-flex lg5 xs10>
                            <v-img
                                style="border-radius: 10px"
                                alt="product"
                                width="100%"
                                height="200px"
                                :src=" product.image !== null ? '/images/med/' + product.image  : '' "
                                :lazy-src=" product.image !== null ? '/images/med/' + product.image : ''"
                            >
                                <template v-slot:placeholder>
                                    <v-layout
                                            fill-height
                                            align-center
                                            justify-center
                                            ma-0

                                    >
                                        <v-progress-circular size="20" width="3" indeterminate color="#E60000"></v-progress-circular>
                                    </v-layout>
                                </template>
                            </v-img>
                        </v-flex>
                    <v-flex lg5 xs10 style="min-height: 150px;">
                            <div class="rev-title" >
                                <v-layout row wrap justify-space-between>
                                <div>
                                <h5>
                                {{product.title}}
                                </h5>
                                </div>
                                <div>
                                <v-btn icon @click="editProductButton(product.pro_id,product.title,product.description)" v-if="authFlagForEdit">
                                    <v-icon color="#E60000">
                                        edit
                                    </v-icon>
                                </v-btn>
                                </div>
                                </v-layout>
                            </div>
                            <div class="rev-content">
                               {{product.description}}
                            </div>

                    </v-flex>
                    </v-layout>
                    </div>

            </flickity>
        </v-card>
        <v-dialog
            persistent
            scrollable
            v-model="addProductDialog"
            max-width="300"
        >
            <v-card>
                <v-layout column wrap style="width: 100%;">
                    <v-card-title class="justify-space-between" >
                        {{$t('individualProfile.mostNotableWork.Add New')}} {{userInfo.providertype === 'service' ? $t('individualProfile.mostNotableWork.Work') : userInfo.providertype === 'product' ? $t('individualProfile.mostNotableWork.Product') : ''}}
                        <v-btn icon color="#E60000" @click="addProductDialog = false">
                            <v-icon color="#E60000" small >close</v-icon>
                        </v-btn>
                    </v-card-title>

                </v-layout>
                <v-form
                        ref="addNew"
                >
                <v-card-text>

                    <v-text-field
                        v-model="productTitle"
                        :label="$t('individualProfile.education.Title')"
                        color="#E60000"
                        :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                        counter="25"
                        maxlength="25"
                    ></v-text-field>
                    <v-textarea
                        v-model="productContent"
                        :label="$t('individualProfile.education.Content')"
                        color="#E60000"
                        :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                        counter="100"
                        maxlength="100"
                        rows="1"
                        auto-grow
                    ></v-textarea>
<!--                    <v-file-input-->
<!--                        ref="file"-->
<!--                        @change="onImageChange($event)"-->
<!--                        prepend-icon=""-->
<!--                        color="red"-->
<!--                        label="Image"-->
<!--                        accept="image/*"-->
<!--                        placeholder="Browse Images"-->
<!--                        :rules="imageSize"-->
<!--                        show-size-->

<!--                    >-->
<!--                    </v-file-input>-->
                    <!--                       ///////////div for image input-->
                    <div style="text-align: center;width: 100%;margin: auto">
                        <!--                        <header style="font-size: 16px;color: #979797;">{{$t('registration.professionalRegisteration.Upload Business Photo')}}</header>-->

                        <v-hover>
                            <v-img
                                    slot-scope="{ hover }"
                                    :class="[reqImage? 'img-selection error-image': 'img-selection']"
                                    height="150" width="200"
                                    :src="image"
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
                                                <input alt="image" style="display: none" ref="fileInput" type="file" accept="image/*"  @change="onImageChange">
                                            </div>
                                        </v-layout>
                                    </div>
                                </v-fade-transition>
                            </v-img>
                        </v-hover>
                        <div style="color: red;font-size: 14px;" v-if="reqImage">{{errorImageMsg === 'image size' ? $t('registration.personalProfileRegisteration.image size') : errorImageMsg === 'only types' ? $t('registration.personalProfileRegisteration.only types') : ''}}</div>
                    </div>
<!--                    ///////////////////////////////////////////-->
                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn
                        color="#E60000"
                        text
                        @click="addProductDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn
                        color="#E60000"
                        dark
                        elevation="0"
                        @click="SaveProductNow"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>

        <v-dialog
            presistent
            scrollable
            v-model="editProductDialog"
            max-width="300"
        >
            <v-card>
                <v-layout column wrap style="width: 100%;">
                    <v-card-title class=" justify-space-between" >
                        {{$t('individualProfile.mostNotableWork.Edit')}} {{userInfo.providertype === 'service' ? $t('individualProfile.mostNotableWork.Work') : userInfo.providertype === 'product' ? $t('individualProfile.mostNotableWork.Product') : ''}}
                        <v-btn icon color="#E60000" @click="editProductDialog= false">
                            <v-icon color="#E60000" small >close</v-icon>
                        </v-btn>
                    </v-card-title>

                </v-layout>
                <v-form ref="editF">


                <v-card-text>
                    <v-text-field
                        v-model="editProductTitle"
                        :label="$t('individualProfile.education.Title')"
                        counter="25"
                        maxlength="25"
                        :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                        color="#E60000"
                    ></v-text-field>
                    <v-textarea
                        v-model="editProductContent"
                        :label="$t('individualProfile.education.Content')"
                        counter="100"
                        maxlength="100"
                        :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                        color="#E60000"
                        rows="1"
                        auto-grow
                    ></v-textarea>
<!--                    <v-file-input-->
<!--                        ref="file"-->
<!--                        @change="onImageChange($event)"-->
<!--                        prepend-icon=""-->
<!--                        color="red"-->
<!--                        label="Image"-->
<!--                        accept="image/*"-->
<!--                        placeholder="Browse Images"-->
<!--                        show-size-->

<!--                    >-->
<!--                    </v-file-input>-->
                    <!--                       ///////////div for image input-->
                    <div style="text-align: center;width: 100%;margin: auto">
                        <!--                        <header style="font-size: 16px;color: #979797;">{{$t('registration.professionalRegisteration.Upload Business Photo')}}</header>-->

                        <v-hover>
                            <v-img
                                    slot-scope="{ hover }"
                                    :class="[reqImage? 'img-selection error-image': 'img-selection']"
                                    height="150" width="200"
                                    :src="image"
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
                                                <input alt="image" style="display: none" ref="fileInput" type="file" accept="image/*"  @change="onImageChange">
                                            </div>
                                        </v-layout>
                                    </div>
                                </v-fade-transition>
                            </v-img>
                        </v-hover>
                        <div style="color: red;font-size: 14px;" v-if="reqImage">{{errorImageMsg === 'image size' ? $t('registration.personalProfileRegisteration.image size') : errorImageMsg === 'only types' ? $t('registration.personalProfileRegisteration.only types') : ''}}</div>
                    </div>
                    <!--                    ///////////////////////////////////////////-->
                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn
                        color="#E60000"
                        text
                        @click="editProductDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn
                        color="#E60000"
                        dark
                        elevation="0"
                        @click="EditProduct"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import Flickity from 'vue-flickity';
    import userInfoMixin from "../userInfoMixin";
    export default {
        name: "mostNotableWork",
        components: {
            Flickity
        },
        mixins: [userInfoMixin],
        data:()=>{
            return{
                loading: true,
                noData: false,
                dbData: true,
                valid: true,
                titleRules: [
                        v => !!v || 'required',
                        v => (v && v.length <= 25) || 'Title must be less than 25 characters',
                ],
                contentRules:[
                    v => !!v || 'required',
                    v => (v && v.length <= 100) || 'Content must be less than 100 characters',
                ],
                imageSize:[
                    v => !!v || 'required',
                    v => !v || v.size < 2000000 || 'Slider image size should be less than 2 MB!'
                ],
                flickityOptions: {
                    autoPlay: true ,
                    pageDots: false,
                    adaptiveHeight: true,
                },
                productsData:[],

                addProductDialog: false,
                productTitle:"",
                productContent:"",

                editProductDialog:false,
                editProductTitle: "",
                editProductContent: "",
                // productimage: '',

                productSelectedId: '',


                reqImage: false,
                errorImageMsg: "",
                image: '/images/imagePlaceholder.png',
                file: "",
            }
        },
        created(){
            this.$store.dispatch('AllProducts', this.$route.params.id);
        },
        computed:{
            getAllProducts(){
                return this.$store.getters.getAllProducts;
            },
        },
        watch:{
            '$route'(from, to){
                this.$store.dispatch('AllProducts', this.$route.params.id);
            },
            getAllProducts(products){
                this.loading =true;
                this.productsData = [];
                if(products !== null) {
                    this.loading =true;
                    this.productsData = [];
                    if (products.products.length !== 0) {

                        this.productsData = products.products;
                        this.loading =false;
                        this.noData= false;

                    }else {
                        this.loading =false;
                        this.noData= true;
                    }
                }


            },
        },
        methods:{
            onImageChange(e){
                this.reqImage =false;
                this.file = e.target.files[0];

                let FileSize = this.file.size / 1024 / 1024;
                let acceptedImageTypes = [ 'image/jpeg', 'image/png'];
                if (FileSize > 2) {
                    this.errorImageMsg = 'image size';
                    this.reqImage =true;
                    this.image = '/images/imagePlaceholder.png';
                }
                else  if(!acceptedImageTypes.includes(this.file.type)) {
                    this.errorImageMsg = 'only types';
                    this.reqImage =true;
                    this.image= '/images/imagePlaceholder.png';
                    this.file= "";
                } else {
                    this.errorImageMsg='';
                    this.image = URL.createObjectURL(this.file);
                }
            },
            editProductButton(id, title, content){
                this.productSelectedId = id;
                this.editProductTitle = title;
                this.editProductContent = content;
                this.editProductDialog = true;
            },
            SaveProductNow() {

                if (this.$refs.addNew.validate()) {
                    // let checkArray = this.checkArray(this.products, this.addproductTitle);


                    this.$store.commit('setClearAppMsgs');

                    if (this.file !== '' && this.productTitle !== '' && this.productContent !== '') {

                        this.$store.dispatch('saveProductData', {
                            slug: this.$route.params.id,
                            image: this.file,
                            title: this.productTitle,
                            content: this.productContent,
                        });
                        this.addProductDialog =false;
                        this.productContent = '';
                        this.productTitle = '';
                        this.image= '/images/imagePlaceholder.png';
                        this.file= "";

                    } else {
                        this.$store.commit('setAppMsgs', {
                            msg: "Please Fill all inputs and check product name!",
                            color: "info",
                            icon: ""
                        })
                    }
                }

            },
            EditProduct() {
                if (this.$refs.editF.validate()) {



                    this.$store.commit('setClearAppMsgs');



                    if (this.editProductTitle !== '' && this.editProductContent !== '' && this.file !== '') {
                        this.$store.dispatch('editProductData', {
                            slug: this.$route.params.id,
                            id: this.productSelectedId,
                            image: this.file,
                            title: this.editProductTitle,
                            content: this.editProductContent,
                        });
                        // this.viewDetails(this.productId,this.productTitle,this.productContent,this.productimage,0,0,0);
                        this.editProductDialog = false;
                        this.image= '/images/imagePlaceholder.png';
                        this.file= "";
                    } else {
                        this.$store.commit('setAppMsgs', {
                            msg: "Please Fill all inputs and check product name!",
                            color: "info",
                            icon: ""
                        })
                    }
                }else {
                    this.$store.commit('setAppMsgs', {
                        msg: "Please Fill all inputs and check product name!",
                        color: "info",
                        icon: ""
                    })
                }

            },
        }
    }
</script>

<style scoped>
    /*.carousel-cell {*/
    /*    width: 66%;*/
    /*    height: -webkit-fit-content;*/
    /*    height: -moz-fit-content;*/
    /*    height: fit-content;*/
    /*    margin-right: 10px;*/
    /*    background: white !important;*/
    /*    border-radius: 5px;*/
    /*}*/
    >>>.rev-title{
        text-align:left;
        margin: 5px;
        /*padding-right: 20px;*/
        justify-content: space-between;
    }
    >>>.rev-content{
        text-align:initial;
        margin: 5px;
    }
    /* Create two equal columns that floats next to each other */
    >>>.column {
        float: left;
        width: 50%;
        padding: 5px;

    }

    >>>.flickity-prev-next-button {
        top: 50%;
        width: 30px !important;
        height: 30px !important;
        border-radius: 50%;
        transform: translateY(-50%);
    }
    >>>.hover-upload{
        z-index: 99;
        height: 100%;
        text-align: center;
        border-radius: 2px;
        background-color: rgba(255, 0, 0, 0.3);
        border:2px #E60000 solid;
    }
    >>>.img-selection{
        z-index: 99;
        border-radius: 2px;
        cursor: pointer;
        margin: auto;
        background-color: #f1f1f1;
    }

    >>>.flickity-button {
        position: absolute !important;
        background: red !important;
        border: none !important;
        color: #fff !important;
    }

</style>
