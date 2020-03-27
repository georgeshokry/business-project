<template>
    <v-card tile flat>
        <v-card-title class=" font-weight-bold justify-space-between">
            <div >{{$t('profile.products.Products')}} <span style="color: red" v-if="authFlagForeditProduct">*</span></div>
            <v-btn
                @click="addProductDialog = !addProductDialog"
            class="more-btn-menu"
            small
            color="#E60000"
                rounded
                elevation="0"
                    dark
           v-if="authFlagForeditProduct && products.length<50" >
                {{$t('profile.products.Add New product')}} <v-icon color="white" right>add_circle_outline</v-icon>

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
        <div v-if="noData && authFlagForeditProduct" style="font-size: large;text-align: center;color: #cccccc;">
            {{$t('profile.products.Add your products here')}}
        </div>

        <v-card flat elevation="0" height="fit-content"  class="ma-3" v-if="dbData">
            <v-layout row wrap >
                <v-flex lg6 xs12  style="padding: 0 5px 0 5px;">
                <div style="height:100%" >

                    <v-img
                            style="object-fit: cover;"
                        class="round-products"
                        width="100%"
                        height="190"
                        :src="'/images/med/'+detailImage"
                    >
                        <div class="radting-badge">
                            <v-icon size="10" style="margin-right: 3px;" color="white">star</v-icon>{{detailRateStar}}
                        </div>
                        <template v-slot:placeholder>
                            <v-layout
                                    fill-height
                                    align-center
                                    justify-center

                            >
                                <v-progress-circular size="20" indeterminate color="#E60000"></v-progress-circular>
                            </v-layout>
                        </template>
                    </v-img>
                </div>
                </v-flex>
                <v-flex lg6 xs11 offset-xs1 offset-md1 offset-lg0 class="pt-1 pl-1" style="margin-right: auto;margin-left: auto;">

                    <v-card-title height="100%" class="pl-0 pt-0 font-weight-bold justify-space-between" style="text-align: initial;">

                      {{detailTitle}}
                        <div>
                        <v-btn icon color="#E60000" @click="featuredProductButton(detailId)"   v-if="authFlagForeditProduct && userfeaturedproductcount < 3" :disabled="detailFeatured===1">
                            <v-icon color="#E60000" >
                                collections_bookmark
                            </v-icon>
                        </v-btn>

                        <v-btn icon color="#E60000" @click="editProductButton(detailId,detailTitle,detailDescription)"  v-if="authFlagForeditProduct">
                            <v-icon color="#E60000" >
                                edit
                            </v-icon>
                        </v-btn>
                        </div>
                    </v-card-title>
                        <div  v-if="authFlagForrate === true">
                            <v-rating
                                v-model="detailRate"
                                color="white"
                                background-color="white"
                                size="15"
                                :readonly="authrate"
                                :half-increments="false"
                                hover
                                class="rating-div"
                                @input="confirmRatingProduct(detailId,detailRate,detailTitle)"

                            ></v-rating>
                        </div>



                    <v-card-text style="text-align: initial">
                       {{detailDescription}}
                    </v-card-text>
                </v-flex>
            </v-layout>
        </v-card>


    <v-sheet
        class="mx-auto"
        elevation="0"
        max-width="800"

    >



        <v-slide-group
            v-model="model"
            class="pb-4 pr-4 pl-4 pt-0"
            active-class="active-product round-products"
            show-arrows
            prev-icon="arrow_left"
            next-icon="arrow_right"
            center-active
            mandatory

        >


            <v-slide-item
                v-for="(product, j) in products"
                :key="j"
                v-slot:default="{ active, toggle }"
                :ripple="{ class: 'red--text' }"
            >

                <v-card
                    elevation="0"
                    active-class="active-product"
                    class="ma-2 round-products"
                    height="110"
                    width="110"
                    :ripple="{ class: 'red--text' }"
                    @click="toggle(), viewDetails(product.pro_id,product.title,product.description,product.image,product.rate,product.userrate,product.authrate,product.featured)"
                >

                                <v-responsive>
                                <v-img
                                        style="object-fit: cover;"
                                    height="70"
                                    width="100%"
                                    :src="'/images/med/'+product.image"

                                >
                                    <template v-slot:placeholder>
                                        <v-layout
                                                fill-height
                                                align-center
                                                justify-center
                                                ma-0

                                        >
                                            <v-progress-circular size="20" indeterminate color="#E60000"></v-progress-circular>
                                        </v-layout>
                                    </template>
                                </v-img>

                                </v-responsive>


                    <v-card-text style="text-align: initial;padding: 0; font-size: smaller !important;margin: 3px;font-weight: 600;">
                        {{product.title}}
                    </v-card-text>
                </v-card>



            </v-slide-item>
        </v-slide-group>
    </v-sheet>
       <v-dialog
            persistent
            scrollable
            v-model="addProductDialog"
            max-width="350"
        >
            <v-card>

                <v-layout column wrap style="width:100%">
                    <v-card-title class="justify-space-between" >
                        {{$t('profile.products.Add Products')}}
                        <v-btn color="#E60000" icon @click="addProductDialog= false">
                            <v-icon color="#E60000" small >close</v-icon>
                        </v-btn>
                    </v-card-title>

                </v-layout>
                <v-form
                        ref="addForm"
                >
                <v-card-text>

                    <v-text-field
                        v-model="addproductTitle"
                        :label="$t('profile.products.Product Title')"
                        color="#E60000"
                        :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                        counter="15"
                        maxlength="15"
                    ></v-text-field>
                    <v-textarea
                        v-model="addproductContent"
                        :label="$t('profile.products.Product Content')"
                        color="#E60000"
                        :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                        counter="125"
                        maxlength="125"
                        rows="1"
                        auto-grow
                    ></v-textarea>
                        <!--                       ///////////div for image input-->
                        <div style="text-align: center;width: fit-content;margin: auto">
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
                                                    <input alt="image" style="display: none" ref="fileInput" type="file" accept="image/*"  @change="onFileChange">
                                                </div>
                                            </v-layout>
                                        </div>
                                    </v-fade-transition>
                                </v-img>
                            </v-hover>
                            <div style="color: red;font-size: 14px;" v-if="reqImage">{{errorImageMsg === 'image size' ? $t('registration.personalProfileRegisteration.image size') : errorImageMsg === 'only types' ? $t('registration.personalProfileRegisteration.only types') : ''}}</div>
                        </div>





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
                            @click="SaveProduct"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-dialog
            persistent
            scrollable
            v-model="editProductDialog"
            max-width="350"
        >
            <v-card>

                <v-layout column wrap style="width:100%">
                    <v-card-title class="justify-space-between" >
                        {{$t('profile.products.Edit Products')}}
                        <v-btn icon @click="editProductDialog= false">
                            <v-icon color="#E60000" small >close</v-icon>
                        </v-btn>
                    </v-card-title>
                </v-layout>
                <v-form
                        ref="editForm"
                >
                    <v-card-text>

                    <v-text-field
                        v-model="productTitle"
                        label="Product Title"
                        color="#E60000"
                        :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                        counter="15"
                        maxlength="15"
                    ></v-text-field>
                    <v-textarea
                        v-model="productContent"
                        label="Product Content"
                        color="#E60000"
                        :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                        counter="125"
                        maxlength="125"
                        rows="1"
                        auto-grow
                    ></v-textarea>
                        <!--                       ///////////div for image input-->
                        <div style="text-align: center;width: fit-content;margin: auto">
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
                                                    <input alt="image" style="display: none" ref="fileInput" type="file" accept="image/*"  @change="onFileChange">
                                                </div>
                                            </v-layout>
                                        </div>
                                    </v-fade-transition>
                                </v-img>
                            </v-hover>
                            <div style="color: red;font-size: 14px;" v-if="reqImage">{{errorImageMsg === 'image size' ? $t('registration.personalProfileRegisteration.image size') : errorImageMsg === 'only types' ? $t('registration.personalProfileRegisteration.only types') : ''}}</div>
                        </div>




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

        <v-dialog
                persistent
                scrollable
                v-model="ratingConfrimDialog"
                max-width="350"
        >
            <v-card>

                <v-layout column wrap style="width:100%; justify-content: center;font-size: x-large;">
                    <v-card-title style="justify-content: center;text-align: center" >
                        {{$t('profile.products.Confirm Rating')}}
                    </v-card-title>
                </v-layout>
                <v-card-text  class="font-weight-bold text-align-center pb-1">
                    {{$t('profile.products.rate')}} "<span style="color: #E60000;">{{productTitleRate}}</span>"
                </v-card-text>
                <v-card-text  class="font-weight-bold text-align-center pa-1">
                    {{$t('profile.products.with')}}
                </v-card-text>
                <v-card-text class="text-align-center pb-0">
                <v-rating readonly color="#E60000" background-color="grey lighten-1" v-model="ratingFinal"></v-rating>
                </v-card-text >
                <v-card-actions style="justify-content: space-between">


                    <v-btn

                            color="#E60000"
                            text
                            @click="cancelRating()"
                    >
                       {{$t('profile.products.no')}}
                    </v-btn>

                    <v-btn

                            color="#E60000"
                            dark
                            elevation="0"
                            @click="rateButton(idOFConfirmRate,ratingFinal)"
                    >
                        {{$t('profile.products.yes')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
    import userInfoMixin from "../userInfoMixin";

    export default {
        name: "products",
        mixins: [userInfoMixin],
        data:()=>{
            return{
                authFlagForeditProduct: false,
                loading: true,
                model: null,
                rating: 0,
                editProductDialog: false,
                addProductDialog: false,
                productId:"",
                productTitle: "",
                productContent: "",
                productImage: "",
                products: "",
                productimage:"",
                addproductTitle:"",
                addproductContent:"",

                noData: false,
                dbData: false,

                authFlagForrate:"",

                rules: {
                    required: value => !!value || 'Required.',
                    max: v => v.length <= 125 || 'Maximum 125 characters',
                    maxTitle: v => v.length <= 15 || 'Maximum 15 characters',
                    imageSize:  value => !value || value.size < 2000000 || 'Slider image size should be less than 2 MB!'
                },
                detailId: "",
                detailTitle: "",
                detailDescription: "",
                detailImage: "",
                detailRate: 0,
                detailRateStar:0,
                authrate:"",

                ratingConfrimDialog: false,
                productTitleRate:'',
                ratingFinal: 0,
                idOFConfirmRate: '',
                detailFeatured:'',
                userfeaturedproductcount:null,
                counter: 0,

                reqImage: false,
                errorImageMsg: "",
                image: '/images/imagePlaceholder.png',
                file: "",

            }
        },
           mounted(){
               this.counter=0;
             this.$store.dispatch('AllProducts', this.$route.params.id);

         },
              computed:{
            // checkUserAuth(){
            //     return this.$store.getters.getAuthFlag;
            // },
            getAllProducts(){
                return this.$store.getters.getAllProducts;
            },


            getAppMsgs(){
                return this.$store.getters.getAppMsgs;
            }
        },
          watch:{
              '$route' (from, to) {
                  this.$store.dispatch('AllProducts', this.$route.params.id);
              },
            getAppMsgs(flag){
                if(flag.appSnackbarMsgs === null) {
                    this.addProductDialog = false;
                      this.editProductDialog = false;
                    this.ratingConfrimDialog = false;
                }
            },
            checkUserAuth(flag){
                if(flag === true) {
                    this.authFlagForeditProduct=true;
                    this.authFlagForrate=false;
                }else if (flag === false){
                    this.authFlagForeditProduct=false;
                    this.authFlagForrate=true;
                }
                 else if (flag === 'not_auth'){
                    this.authFlagForeditProduct=false;
                    this.authFlagForrate=false;

                }
            },
            getAllProducts(products){
                this.loading =true;
                this.dbData= false;
                // this.noData= true;
                this.products = [];
                if(products.products.length!==0) {
            if(this.counter===0){

                this.detailId=products.products[0].pro_id;
                this.detailTitle=products.products[0].title;
                this.detailDescription=products.products[0].description;
                this.detailImage=products.products[0].image;
                this.authrate=products.products[0].authrate;
                this.detailRateStar=products.products[0].rate;
                this.detailRate=products.products[0].userrate;
                this.detailFeatured=products.products[0].featured;
                this.userfeaturedproductcount=products.userfeaturedproductcount;
                this.counter++;
            }
                this.products = products.products;
                this.userfeaturedproductcount=products.userfeaturedproductcount;
                    this.loading =false;
                    this.noData= false;
                this.dbData = true;
            }
                else {
                    this.loading =false;
                    this.dbData= false;
                    this.noData= true;
                }
            },
        },
       methods: {
               onFileChange(e) {
                   this.reqImage = false;
                   this.file = e.target.files[0];
                   let FileSize = this.file.size / 1024 / 1024;
                   let acceptedImageTypes = ['image/jpeg', 'image/png'];
                   if (FileSize > 2) {
                       this.errorImageMsg = 'image size';
                       this.reqImage = true;
                       this.image = '/images/imagePlaceholder.png';
                   } else if (!acceptedImageTypes.includes(this.file.type)) {
                       this.errorImageMsg = 'only types';
                       this.reqImage = true;
                       this.image = '/images/imagePlaceholder.png';
                   } else {
                       this.errorImageMsg = '';
                       this.image = URL.createObjectURL(this.file);
                   }
               },
               editProductButton(id, title, content) {
                   this.productId = id;
                   this.productTitle = title;
                   this.productContent = content;
                   this.editProductDialog = true;
               },
               viewDetails(id, title, description, image, rate, userrate, authrate, featured) {
                   this.detailImage = '';
                   this.detailId = id;
                   this.detailTitle = title;
                   this.detailDescription = description;
                   this.detailImage = image;
                   this.detailRateStar = rate;
                   this.detailRate = userrate;
                   this.detailFeatured = featured;
                   this.authrate = authrate;
               },
               checkArray(my_arr, value) {
                   var a = [];
                   for (var i = 0, l = my_arr.length; i < l; i++) {
                       if (a.indexOf(my_arr[i].title) === -1) {
                           a.push(my_arr[i].title);
                       }
                   }
                   if (value === "") {
                       return false;

                   }
                   if (a.includes(value)) {

                       return false;
                   } else {
                       return true;
                   }
               },
               checkArrayedit(my_arr, value, id) {

                   var a = [];


                   for (var i = 0, l = my_arr.length; i < l; i++) {


                       a.push({id: my_arr[i].pro_id, title: my_arr[i].title});


                   }


                   let getproduct = a.find(pro => pro.id === id);

                   if (value === "") {
                       return false;

                   }
                   if (getproduct.title === value) {
                       return true;
                   }

                   if (a.some(function (el) {
                       return el.title === value
                   })) {
                       return false;
                   } else {
                       return true;
                   }


               },
               SaveProduct() {

                   if (this.$refs.addForm.validate()) {
                       let checkArray = this.checkArray(this.products, this.addproductTitle);


                       this.$store.commit('setClearAppMsgs');

                       if (this.file !== '' && this.addproductTitle !== '' && this.addproductContent !== '' && checkArray) {

                           this.$store.dispatch('saveProductData', {
                               slug: this.$route.params.id,
                               image: this.file,
                               title: this.addproductTitle,
                               content: this.addproductContent,
                           });

                           this.addProductDialog = false;
                           this.addproductTitle = '';
                           this.addproductContent = '';
                           this.file = '';
                           this.image = '/images/imagePlaceholder.png';
                           this.$refs.addForm.reset();
                       } else {
                           this.$store.commit('setAppMsgs', {
                               msg: "profile.products.Please Fill all inputs and check product name!",
                               color: "info",
                               icon: "info"
                           })
                       }
                   }

               },

               EditProduct() {
                   if (this.$refs.editForm.validate()) {
                       let checkArrayedit = this.checkArrayedit(this.products, this.productTitle, this.productId);


                       this.$store.commit('setClearAppMsgs');
                       this.counter = 0;


                       if (this.productTitle !== '' && this.productContent !== '' && this.file !== '' && checkArrayedit) {
                           this.$store.dispatch('editProductData', {
                               slug: this.$route.params.id,
                               id: this.productId,
                               image: this.file,
                               title: this.productTitle,
                               content: this.productContent,
                           });
                           // this.viewDetails(this.productId,this.productTitle,this.productContent,this.productimage,0,0,0);
                           this.editProductDialog = false;
                       } else {
                           this.$store.commit('setAppMsgs', {
                               msg: "Please Fill all inputs and check product name!",
                               color: "info",
                               icon: "info"
                           })
                       }
                   } else {
                       this.$store.commit('setAppMsgs', {
                           msg: "Please Fill all inputs and check product name!",
                           color: "info",
                           icon: "info"
                       })
                   }

               },

               featuredProductButton(id) {

                   this.$store.commit('setClearAppMsgs');
                   this.$store.dispatch('markFeaturedProduct', {
                       slug: this.$route.params.id,
                       id: id,


                   }).finally(() => {
                       this.detailFeatured = 1;
                   });


               },


               confirmRatingProduct(id, rate, detailTitle) {
                   console.log(rate);
                   this.$store.commit('setClearAppMsgs');
                   if (this.authrate === true) {
                       this.$store.commit('setAppMsgs', {
                           msg: "profile.products.You have already rated this product before!",
                           color: "info",
                           icon: "info"
                       });
                       this.productTitleRate = detailTitle;
                       this.idOFConfirmRate = id;
                       this.ratingFinal = rate;
                       this.ratingConfrimDialog = false;
                   } else {
                       this.productTitleRate = detailTitle;
                       this.idOFConfirmRate = id;
                       this.ratingFinal = rate;
                       this.ratingConfrimDialog = true;
                   }
               },
               cancelRating() {
                   this.ratingConfrimDialog = false;
                   this.detailRate = 0;

               },
               rateButton(id, rate) {

                   this.$store.commit('setClearAppMsgs');

                   if (this.rate !== '') {
                       this.$store.dispatch('rateProduct', {
                           slug: this.$route.params.id,
                           id: id,
                           rate: rate,
                           rater_slug: localStorage.getItem('s'),
                           lang: this.$i18n.locale,


                       });
                       this.ratingConfrimDialog = false;

                   } else {
                       this.$store.commit('setAppMsgs', {
                           msg: "profile.products.Product Rated Successfully",
                           color: "info",
                           icon: "info"
                       })
                   }
               },
       },
}


</script>

<style scoped>
>>>.active-product{
    border: 2px solid #E60000 !important;
}
>>>.active-title{
    color: #E60000;
}
    >>>.round-products{
        border-radius: 10px
    }
    >>>.v-slide-group__prev i{
        color: #E60000 !important;
    }
    >>>.v-slide-group__next i{
        color: #E60000 !important;
    }
    >>>.radting-badge{
        position: absolute;
         right: 10px;
        /*left: 230px;*/
        background-color: #E60000;
        border-radius: 50%;
        padding: 6px;
        margin: 10px;
        color: white;
        height: 35px;
        font-size: smaller;
        width: 35px;
    }
    >>>.rating-div{
        background-color: #E60000;
        border-radius: 30px;
        width: fit-content;


    }

>>>.hover-upload{
    height: 100%;
    text-align: center;
    border-radius: 2px;
    background-color: rgba(255, 0, 0, 0.3);
    border:2px #E60000 solid;
}
>>>.img-selection{
    border-radius: 2px;
    cursor: pointer;
    margin: auto;
    background-color: #f1f1f1;
}
>>>.v-application--is-ltr .v-responsive__sizer~.v-responsive__content {
     margin-left: 0;
}
</style>
