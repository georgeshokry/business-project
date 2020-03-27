<template>


    <div>
        <v-skeleton-loader
                v-if="dataLoading"
                type="image"
                class="ma-2"
                height="280px"
        ></v-skeleton-loader>
<!--        <div >-->
<!--            <v-layout-->
<!--                align-center-->
<!--                justify-center-->
<!--                style="height:300px"-->
<!--            >-->
<!--                <v-progress-circular indeterminate color="red "></v-progress-circular>-->
<!--            </v-layout>-->
<!--        </div>-->
        <div v-if="dataLoaded">
        <div>
        <v-card v-if="noData && authFlagForEdit" class="no-data-slider">
            <v-card-text  class="no-data-content">
                <v-layout align-center justify-center column fill-height     style="width: 100%;">
                <h3 class="no-slides">{{$t('profile.sliderProfile.Introduce your company with a photo slider')}}</h3>

                    <v-btn icon large color="#E60000" @click="editSliderDialog = true">
                    <v-icon large color="#E60000">control_point</v-icon>
                    </v-btn>
                </v-layout>
            </v-card-text>

        </v-card>
        </div>
    <v-carousel
        v-if="sliderData"
        :show-arrows="false"
        color="#E60000"
        height="300"
        :style="rtl ? {'border-radius': '0 0 10px 0'} : {'border-radius': '0 0px 0px 10px'}"
        hide-delimiter-background
        delimiter-icon="radio_button_checked"
        active-class="active-slide-btn"
        :cycle="cycleFlag"
        :interval="3000"

    >

        <v-carousel-item
            v-for="(item,i) in slides"
            :key="i"
            :src="'/images/med/'+item.slider_image"
            :lazy-src="'/images/med/'+item.slider_image"
            @mouseover="cycleFlag = false"
            @mouseout="cycleFlag = true"
        >

            <v-row no-gutters>
                <v-col
                    cols="8"
                    style="margin-left: 50%;"
                >
<!--                <h1  class="slide-title">{{item.title}}</h1>-->

<!--                <h3  class="slide-content">-->
<!--                    {{item.description}}-->
<!--                </h3>-->
                </v-col>
            </v-row>
            <div class="slide-edit-btn" v-if="authFlagForEdit">
                <v-btn x-small fab color="#E60000" @click="editSlider(item.id, item.slider_image)">
                    <v-icon  color="white">create</v-icon>
                </v-btn>
                <v-btn x-small fab color="#E60000"   @click="addNewSlide()" v-if="slides.length < 3">
                    <v-icon  color="white">control_point</v-icon>
                </v-btn>
            </div>
        </v-carousel-item>
    </v-carousel>
        </div>

        <v-dialog
            scrollable
            persistent
            v-model="editSliderDialog"
            max-width="350"
        >

            <v-card>
                <v-layout column wrap style="width: 100%;">
                    <v-card-title class=" justify-space-between" style="text-align: initial;">
                        {{$t('profile.sliderProfile.Add New Slide')}}
                        <v-btn icon @click="editSliderDialog= false">
                            <v-icon color="#E60000" small >close</v-icon>
                        </v-btn>
                    </v-card-title>

                </v-layout>
                <v-form ref="NewSliderFrom">
                <v-card-text>
<!--                    <v-text-field-->
<!--                        v-model="slideTitle"-->
<!--                        label="Slide Title"-->
<!--                        color="red"-->
<!--                        :rules="[rules.required, rules.max]"-->
<!--                        counter="25"-->
<!--                    ></v-text-field>-->
<!--                    <v-text-field-->
<!--                        v-model="slideContent"-->
<!--                        label="Slide Content"-->
<!--                        color="red"-->
<!--                        :rules="[rules.required, rules.max]"-->
<!--                        counter="25"-->
<!--                    ></v-text-field>-->
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
                        @click="editSliderDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn
                            color="#E60000"
                            dark
                            elevation="0"
                        @click="saveSlide()"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
                  </v-form>
            </v-card>
        </v-dialog>


        <v-dialog
            scrollable
            persistent
            v-model="editSlide"
            max-width="350"
        >
            <v-card>
                <v-layout column wrap style="width: 100%;">
                    <v-card-title class="justify-space-between" style="text-align: initial;">
                        {{$t('profile.sliderProfile.Edit Slide')}}
                        <v-btn icon @click="editSlide= false">
                            <v-icon color="#E60000" small >close</v-icon>
                        </v-btn>
                    </v-card-title>

                </v-layout>
                <v-card-text>
<!--                    <v-text-field-->
<!--                        v-model="selectedTitle"-->
<!--                        label="Slide Title"-->
<!--                        color="red"-->
<!--                        :rules="[rules.required, rules.max]"-->
<!--                        counter="25"-->
<!--                    ></v-text-field>-->
<!--                    <v-text-field-->
<!--                        v-model="selectedContent"-->
<!--                        label="Slide Content"-->
<!--                        color="red"-->
<!--                        :rules="[rules.required, rules.max]"-->
<!--                        counter="25"-->
<!--                    ></v-text-field>-->
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
                        @click="editSlide = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn
                            color="#E60000"
                            dark
                            elevation="0"
                        @click="saveSlideEdit"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "sliderProfile",
        data:()=>{
            return{
                dataLoading: true,
                dataLoaded: false,
                baseURL: '',
                authFlagForEdit: false,


                slideTitle: "",
                slideContent: "",
                slideImage: "",

                image: '/images/imagePlaceholder.png',
                errorImageMsg: "",
                reqImage: false,

                editSlide:false,
                selectedTitle:'',
                selectedContent:'',
                selectedSlideId: '',
                file:'',

                sliderData: true,
                noData: false,
                slides: [],
                editSliderDialog: false,
                cycleFlag: true,
                rules: {
                    required: value => !!value || 'Required.',
                    max: v => v.length <= 25 || 'Maximum 25 characters',
                    imageSize: [ value => !value || value.size < 2000000 || 'Slider image size should be less than 2 MB!'],
                },

                rtl: false,

            }
    },
        mounted(){
            this.baseURL = window.location.hostname;
            this.$store.dispatch('imageSlider', this.$route.params.id);

            this.rtl = this.$vuetify.rtl;

        },
        computed:{
            checkUserAuth(){
                return this.$store.getters.getAuthFlag;
            },
            getImageSlider(){
                return this.$store.getters.getImageSlider;
            },
            getAppMsgs(){
                return this.$store.getters.getAppMsgs;
            },
            getRtl(){
                return this.$vuetify.rtl;
            }
        },
        watch:{

            '$route'(from, to) {
                this.$store.dispatch('imageSlider', this.$route.params.id);
            },
            getRtl(flag){
                this.rtl = flag;
            },
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
            getImageSlider(slides){

                this.dataLoading = true;
                this.dataLoaded = false;

                if(slides !== null){
                    this.slides = [];
                    for(let i in slides) {
                        this.slides.push({
                            business_indv_id: slides[i].business_indv_id,
                            created_at: slides[i].created_at,
                            description: slides[i].description,
                            id: slides[i].id,
                            slider_image: slides[i].slider_image,
                            title: slides[i].title
                        });
                    }
                   
                    this.sliderData = true;
                    this.noData = false;
                    this.dataLoading = false;
                    this.dataLoaded= true;
                }
                // else {
                //     this.sliderData = false;
                //     this.noData = true;
                //     this.dataLoading = false;
                //     this.dataLoaded= true;
                // }
                            if(this.slides.length === 0){
                this.sliderData = false;
                this.noData = true;
            }else{
                this.sliderData = true;
                this.noData = false;
            }
            }
        },
        methods:{
            addNewSlide(){
                this.image = '/images/imagePlaceholder.png';
                this.editSliderDialog = true
            },
            setImage(e) {
                let set = e.target.files;
                this.slideImage = e.target.files[0].name;
                
            },
            onFileChange(e) {
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
                    this.image = '/images/imagePlaceholder.png';
                } else {
                    this.errorImageMsg='';
                    this.image = URL.createObjectURL(this.file);
                }

            },
            editSlider(id, image){
                this.image = '/images/med/' + image;
                this.selectedSlideId =id;
                // this.selectedTitle = title;
                // this.selectedContent = content;
                this.editSlide = true;
            },
            saveSlide() {
                this.$store.commit('setClearAppMsgs');
                if(this.image !== '/images/imagePlaceholder.png') {
                    this.$store.dispatch('saveImageSlideData', {
                        slug: this.$route.params.id,
                        image: this.file,
                        // title: this.slideTitle,
                        // content: this.slideContent,
                    });

                    this.editSliderDialog = false;
                    this.$refs.NewSliderFrom.reset();
                    this.image = '/images/imagePlaceholder.png';
                }else {
                    this.$store.commit('setAppMsgs', {
                        msg:"profile.sliderProfile.Please Add Photo",
                        color: "info",
                        icon: "info"
                    })
                }

            },
            saveSlideEdit()
            {
                if(this.image !== '/images/imagePlaceholder.png') {
                    this.$store.dispatch('editImageSlideData', {
                        slug: this.$route.params.id,
                        image: this.file,
                        title: this.selectedTitle,
                        content: this.selectedContent,
                         imageid:this.selectedSlideId,
                    });
                    this.editSlide = false;
                    this.image = '/images/imagePlaceholder.png';
                }else {
                    this.$store.commit('setAppMsgs', {
                        msg:"profile.sliderProfile.Please Add Photo",
                        color: "info",
                        icon: "info"
                    })
                }
            }
        }
    }
</script>

                

<style scoped>
    >>>.slide-title{
        position: absolute;
        text-shadow: 0px 2px 8px #000000;
        top: 90px;
        color: white;
        margin-bottom: 0;
        font-size: xx-large !important;
    }
>>>.slide-content{
    position: absolute;
    text-shadow: 0px 2px 8px #000000;
    top: 138px;
    font-weight: bold;
    color: white;
    max-width: 190px;
    font-size: x-large;
    margin-bottom: 0;
}
    >>>.slide-edit-btn{
        font-size: 20px;
        right: 0px;
        position: absolute;
        top: 0;
        /*background: linear-gradient(225deg, rgba(230,0,0,1) 0%, rgba(230,0,0,0) 50%);*/
        padding: 10px;
        /*height: 90px;*/
        /*width: 95px;*/
    }
    >>>.active-slide-btn i{
        color: red;
    }
    /*.v-carousel__controls{*/
    /*    background-color: rgba(255, 255, 255, 0);*/
    /*}*/
>>>.no-data-slider{
    height: 300px;
    width: 100%;
    border: 2px solid red !important;
}
    >>>.no-data-content{
        text-align: center;
        height: 100%;
        padding: 13%;
    }
    >>>.no-slides{
        max-width: 120px;
        font-size: 1em !important;
        text-align: center;
        color: #cccccc;
    }
    >>>.v-skeleton-loader__image {
        height: 280px !important;
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

</style>
