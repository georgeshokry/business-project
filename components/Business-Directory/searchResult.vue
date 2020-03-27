<template>
       <v-container style="">

        <v-layout row wrap justify-center align-start>

        <v-flex d-flex lg4 md4 xl3 xs11 v-for="(result,i) in dataWithFeatured" :key="i">
            <v-layout justify-center align-center>
                <v-hover
                        v-slot:default="{ hover }"
                >
                <v-card :elevation="hover ? 12 : 2" v-if="result.type === 1 || result.type === 2" outlined  width="350" min-height="315px" class="ma-2" style="border-radius: 10px;     cursor: auto;" >
            <v-card-title style="font-size: smaller; padding:5px 10px 5px 10px;" class="justify-space-between" :class="[result.featured === true ? 'featured-card' : '']">
                <v-card-subtitle class="pa-0">
                    <v-icon v-if="result.type === 1" color="#e60000" size="20">people</v-icon>
                    <v-icon v-else-if="result.type === 2" color="#e60000" size="20">person</v-icon>
                    {{result.type === 1 ? $t('businessDirectoryView.Enterprise') : result.type === 2 ? $t('businessDirectoryView.Professional') : ''}}
                </v-card-subtitle>
                <v-card-subtitle class="pa-0" style="color:#e60000">
                    <v-icon size="20" color="#e60000" style="margin-right:5px; margin-left: 5px;">visibility</v-icon>
                    {{result.views}}
                </v-card-subtitle>
            </v-card-title>
            <v-divider class="ma-0"></v-divider>
            <v-container fluid grid-list-md class="pt-0">
                <v-layout row wrap  style="justify-content: flex-end;height: 25px;">
                    <v-card-subtitle class="pa-0" v-if="result.type === 1 && result.recommended !== ''">
                        {{$t('businessDirectoryView.Recommended By')}} {{result.recommended}} {{$t('businessDirectoryView.Company')}}
                    </v-card-subtitle>
                    <v-card-subtitle class="pa-0" v-else-if="result.type === 2 && result.recommended !== ''">
                        {{$t('businessDirectoryView.Most known For')}} <img  width="20" height="20"   src="../resources/Recommended_Red.svg">   {{result.recommended}}
                    </v-card-subtitle>
                    <v-spacer></v-spacer>
                    <v-card-subtitle class="pa-0" v-if="result.featured === true ">
                       {{$t('businessDirectoryView.Featured')}}
                    </v-card-subtitle>
                </v-layout>
            <v-layout row wrap>
                <v-flex d-flex lg4 md4 xl4 xs4>
                <v-img
                        v-if="result.pic !== null"
                        style="border-radius: 10px"
                        width="100"
                        height="100"
                        :src="result.pic"
                        :lazy-src="result.pic"
                        v-on:error="result.pic = null"
                >
                    <template v-slot:placeholder>
                        <v-layout
                                fill-height
                                align-center
                                justify-center
                                ma-0
                        >
                            <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
                        </v-layout>
                    </template>
                </v-img>
                    <v-img
                            v-else
                            style="border-radius: 10px"
                            width="100"
                            height="100"
                            src="/images/imagePlaceholder.png"
                    >
                    </v-img>
                </v-flex>
                <v-flex d-flex lg8>
                    <v-layout column wrap justify-content-center>
                    <v-card-subtitle class="pa-0" style="font-size: medium;max-height: 40px;text-align: initial">
                        {{result.category}}
                    </v-card-subtitle>
                        <v-card-title class="pa-0" style="height: 24px;text-align: initial">
                        {{result.business_name}}
                    </v-card-title>
                        <v-divider dark class="ma-0"></v-divider>
                        <v-card-subtitle class="pa-0" style="text-align: initial">
                        {{result.country}}
                            <v-spacer></v-spacer>
                            <v-card-title  class="justify-end ver-sec" >

                                <v-card-subtitle class="pa-0"  v-if="result.checked === true">
                                    <v-tooltip top  color="#E60000">
                                        <template v-slot:activator="{ on }">
                                            <div v-on="on" class="checked-icon">
                                                <v-icon size="15" color="white" >done</v-icon>
                                            </div>
                                        </template>
                                        <span>{{$t('businessDirectoryView.Verified')}}</span>
                                    </v-tooltip>
                                </v-card-subtitle>
                            </v-card-title>
                    </v-card-subtitle>
                    </v-layout>
                </v-flex>
                </v-layout>
                <v-divider class="ma-0"></v-divider>
                <v-card-subtitle style="padding:5px;height: 55px;" class="article">
                    <div style="color: black;letter-spacing: 1px !important;height: 100%;">

                        {{result.business_description}}
                    </div>
                </v-card-subtitle>
                <v-divider class="ma-0" style="padding-bottom: 5px;"></v-divider>
                <v-card-title style="padding:0;justify-content: center;min-height: 70px;"  >

                    <div style="width: 100%;text-align: center">
                    <v-btn text small style="font-weight: 700;font-size: small;" color="#e60000" v-if="!result.showContact " @click="result.showContact = true">
                        {{$t('businessDirectoryView.Show Contacts')}}
                        <v-icon right small color="#e60000">keyboard_arrow_down</v-icon>
                    </v-btn>
                    </div>
                    <v-slide-y-transition>

                        <v-card-text class="pa-0" v-if="result.showContact">
                            <v-layout row wrap>
                                <v-flex lg-5 style="text-align: initial;">
                                    <v-btn
                                            style="margin: 5px;width: 25px;height: 25px;"
                                            elevation="0"
                                            fab
                                            dark
                                            x-small
                                            color="#e60000"
                                            @click="result.showPhone = true, result.showEmail = false, result.showWebsite = false"
                                    >
                                        <v-icon>phone</v-icon>
                                    </v-btn>

                                    <v-btn
                                            style="margin: 5px;width: 25px;height: 25px;"
                                            elevation="0"
                                            fab
                                            dark
                                            x-small
                                            color="#e60000"
                                            @click="result.showPhone = false, result.showEmail = true, result.showWebsite = false"
                                    >
                                        <img width="15"  src="../resources/Email_White.svg" />
                                    </v-btn>
                                    <v-btn
                                            style="margin: 5px;width: 25px;height: 25px;"
                                            elevation="0"
                                            fab
                                            dark
                                            x-small
                                            color="#e60000"
                                            @click="result.showPhone = false, result.showEmail = false, result.showWebsite = true"
                                    >
                                        <img width="15"  src="../resources/Website_White.svg" />
                                    </v-btn>

                                </v-flex>

                            </v-layout>
                            <v-divider dark class="ma-0"></v-divider>
                            <v-layout row wrap >
                                <v-fade-transition>
                                    <v-chip small outlined class="ma-1" style="direction: ltr;"  v-if="(result.showPhone === true && result.phone !== '') || (result.showEmail && result.email !== '')=== true || (result.showWebsite === true && result.website !== '')">
                                        {{result.showPhone === true ? result.phone : result.showEmail === true ? result.email : result.showWebsite === true ? result.website : ""}}
                                    </v-chip>
                                </v-fade-transition>

                            </v-layout>
                        </v-card-text>
                    </v-slide-y-transition>


                </v-card-title>
                <v-divider dark class="mt-1 mb-1"></v-divider>
                <v-btn small block dark elevation="0"  color="#e60000" :to="'/profile/'+result.slug" target="_blank"  v-if="result.checked === true">
                    {{$t('businessDirectoryView.Visit')}} <v-icon size="15" style="margin: 0 5px 0 5px" color="white">open_in_new</v-icon>
                </v-btn>
            </v-container>
        </v-card>

<!--                ////////////////card for product or service-->
                <v-card :elevation="hover ? 12 : 2" v-else-if="result.type === 4 || result.type === 3"  outlined  width="350" min-height="315px" class="ma-2" style="border-radius: 10px;    cursor: auto;">
                    <v-container fluid grid-list-md class="pt-1">
                        <v-card-title style="font-size: x-small; padding: 0px 5px 5px 0px;" class="justify-space-between">
                                            <v-card-subtitle class="pa-0">
                                                <img v-if="result.type === 3" alt="Product"  width="20" src="../resources/Products_Red.svg">
                                                <img  v-else-if="result.type === 4"  alt="Service"  width="20" src="../resources/Services_Red.svg">
                                                {{ result.type === 3 ? $t('businessDirectoryView.Product') : $t('businessDirectoryView.Service')}}
                                            </v-card-subtitle>
                        </v-card-title>
                        <v-divider class="ma-0"></v-divider>
<!--                        if product-->
                        <v-layout row wrap v-if="result.type === 3">
                            <v-flex d-flex lg12 xs12>
                                <v-img
                                        v-if="result.pic !== null"
                                        style="border-radius: 10px"
                                        width="100"
                                        height="100"
                                        :src="result.pic"
                                        :lazy-src="result.pic"
                                        v-on:error="result.pic = null"
                                >
                                    <div class="radting-badge">
                                        <v-icon size="10" style="margin-right: 3px;" color="white">star</v-icon>{{result.rate}}
                                    </div>
                                    <template v-slot:placeholder>
                                        <v-layout
                                                fill-height
                                                align-center
                                                justify-center
                                                ma-0
                                        >
                                            <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
                                        </v-layout>
                                    </template>

                                </v-img>
                                <v-img
                                        v-else-if="result.pic === null"
                                        style="border-radius: 10px"
                                        width="100"
                                        height="100"
                                        src="/images/imagePlaceholder.png"
                                >
                                    <div class="radting-badge">
                                        <v-icon size="10" style="margin-right: 3px;" color="white">star</v-icon>{{result.rate}}
                                    </div>
                                </v-img>
                            </v-flex>
                            <v-flex d-flex lg12>
                                <v-layout column wrap justify-content-center class="pa-0">
                                    <v-card-title class="pa-0">
                                        <v-layout column wrap>

                                            <v-card-text class="pt-0 pb-0" style="text-align: initial;font-weight: bold">
                                                {{result.title}}
                                            </v-card-text>

                                        </v-layout>
                                    </v-card-title>
                                </v-layout>
                            </v-flex>
                        </v-layout>
<!--                        if service-->
                        <v-layout row wrap v-else-if="result.type === 4">
                            <v-flex d-flex lg5 xs5>
                                <v-img
                                        v-if="result.pic !== null"
                                        style="border-radius: 10px"
                                        width="100"
                                        height="100"
                                        :src="result.pic"
                                        :lazy-src="result.pic"
                                        v-on:error="result.pic = null"
                                >
                                    <template v-slot:placeholder>
                                        <v-layout
                                                fill-height
                                                align-center
                                                justify-center
                                                ma-0
                                        >
                                            <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
                                        </v-layout>
                                    </template>
                                </v-img>

                                <v-img
                                        v-else-if="result.pic === null"
                                        style="border-radius: 10px"
                                        width="100"
                                        height="100"
                                        src="/images/imagePlaceholder.png"
                                >
                                </v-img>
                            </v-flex>
                            <v-flex d-flex lg7>
                                <v-layout column wrap justify-content-center class="pa-0">

                                    <v-card-title class="pa-1">
                                        <v-layout column wrap>
                                            <v-card-title class="pa-0" style="min-height: 40px;">
                                                {{result.title}}
                                            </v-card-title>
                                        </v-layout>
                                    </v-card-title>
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-card-title style="font-size: x-small; padding:3px;" class="justify-space-between" >
                            <v-layout column wrap justify-content-center class="pa-0">

                                <v-card-title class="pa-0" style="font-size: x-large;">
                                    {{result.business_name}}
                                </v-card-title>
                            </v-layout>
                        </v-card-title>
                        <v-card-title style="font-size: x-small; padding:0;justify-content: flex-end;"  >
                            <v-card-subtitle class="pa-0" style="text-align: initial">
                                {{result.country}}
                            </v-card-subtitle>
                        </v-card-title>
                        <v-divider class="ma-0" style="padding-bottom: 5px;"></v-divider>
                        <v-card-title style="padding:0;justify-content: center;    min-height: 68px;"  >

                            <div style="width: 100%;text-align: center">
                                <v-btn text small style="font-weight: 700;font-size: small;" color="#e60000" v-if="!result.showContact " @click="result.showContact = true">
                                    {{$t('businessDirectoryView.Show Contacts')}}
                                    <v-icon right small color="#e60000">keyboard_arrow_down</v-icon>
                                </v-btn>
                            </div>
                            <v-slide-y-transition>

                                <v-card-text class="pa-0" v-if="result.showContact">
                                    <v-layout row wrap>
                                        <v-flex lg-5 style="text-align: initial">
                                            <v-btn
                                                    style="margin: 5px;width: 25px;height: 25px;"
                                                    elevation="0"
                                                    fab
                                                    dark
                                                    x-small
                                                    color="#e60000"
                                                    @click="result.showPhone = true, result.showEmail = false, result.showWebsite = false"
                                            >
                                                <v-icon>phone</v-icon>
                                            </v-btn>

                                            <v-btn
                                                    style="margin: 5px;width: 25px;height: 25px;"
                                                    elevation="0"
                                                    fab
                                                    dark
                                                    x-small
                                                    color="#e60000"
                                                    @click="result.showPhone = false, result.showEmail = true, result.showWebsite = false"
                                            >
                                                <img width="15"  src="../resources/Email_White.svg" />
                                            </v-btn>
                                            <v-btn
                                                    style="margin: 5px;width: 25px;height: 25px;"
                                                    elevation="0"
                                                    fab
                                                    dark
                                                    x-small
                                                    color="#e60000"
                                                    @click="result.showPhone = false, result.showEmail = false, result.showWebsite = true"
                                            >
                                                <img width="15"  src="../resources/Website_White.svg" />
                                            </v-btn>

                                        </v-flex>

                                    </v-layout>
                                    <v-divider dark class="ma-0"></v-divider>
                                    <v-layout row wrap >
                                        <v-fade-transition>
                                            <v-chip small outlined class="ma-1" style="direction: ltr;"  v-if="(result.showPhone === true && result.phone !== '') || (result.showEmail && result.email !== '')=== true || (result.showWebsite === true && result.website !== '')">
                                                {{result.showPhone === true ? result.phone : result.showEmail === true ? result.email : result.showWebsite === true ? result.website : ""}}
                                            </v-chip>
                                        </v-fade-transition>

                                    </v-layout>

                                </v-card-text>
                            </v-slide-y-transition>

                        </v-card-title>
                        <v-divider dark class="mt-1 mb-1"></v-divider>
                        <v-btn small block dark elevation="0"  color="#e60000" :to="'/profile/'+result.slug" target="_blank"  v-if="result.checked === true">
                            {{$t('businessDirectoryView.Visit')}} <v-icon size="15" style="margin: 0 5px 0 5px" color="white">open_in_new</v-icon>
                        </v-btn>
                    </v-container>
                </v-card>
                </v-hover>
            </v-layout>

        </v-flex>

        </v-layout>
<!--           <v-divider dark></v-divider>-->
           <div style="justify-content: right;" >
               <v-flex xl1 lg2 md2 xs12>
               <v-btn  outlined block dark color="#e60000" @click.prevent="paginatesearch()" v-if="nextPage !== null && loadingMore === false" :loading="loadingMore">
                <v-icon small left color="#E60000">arrow_downward</v-icon> {{$t('businessDirectoryView.load more')}}
               </v-btn>
               </v-flex>
           </div>
           <v-layout row wrap justify-center align-center v-if="loadingMore">
               <v-layout justify-center align-center>
               <v-flex lg4 md4 xl3 xs11>
                   <v-boilerplate style="background-color: white;" tile  class="pa-3 ma-4" type="text, divider, list-item-avatar, article"></v-boilerplate>
               </v-flex>
               <v-flex lg4 md4 xl3 xs11>
                   <v-boilerplate style="background-color: white;" tile  class="pa-3 ma-4" type="text, divider, list-item-avatar, article"></v-boilerplate>
               </v-flex>
               <v-flex lg4 md4 xl3 xs11>
                   <v-boilerplate style="background-color: white;"  tile class="pa-3 ma-4" type="text, divider, list-item-avatar, article"></v-boilerplate>
               </v-flex>
               </v-layout>
           </v-layout>

           <v-layout row wrap justify-center align-center v-if="noSearchResult"  >
               <v-card-text class="no-results-msg">
                  {{$t('businessDirectoryView.No Results')}}
               </v-card-text>
           </v-layout>

   </v-container>

</template>

<script>




    export default {
        name: "searchResult",
        inject: ['theme'],
        components: {
            VBoilerplate: {
                functional: true,
                render (h, { data, props, children }) {
                    return h('v-skeleton-loader', {
                        ...data,
                        props: {
                            boilerplate: false,
                            elevation: 3,
                            ...props,
                        },
                    }, children)
                },
            },
        },
        data:()=>{
            return{
                Rtl: false,
                data:[],
                featuredData:[],
                featuredDataToView:[],

                dataWithFeatured:[],

                nextPage: null,
                loadingMore: true,
                searchKeyword: '',
                noSearchResult: false,
                filterparamters:{},


                start: '',
                end: 0,

                contactView:[],

            }
        },
        mounted(){
            this.Rtl = this.$vuetify.rtl;
            // this.$store.dispatch('searchKeyword', {
            //     url:'/vue/searchkeyword',
            //     searchKeyword: this.searchKeyword,
            //
            // });
        },
        computed:{
            getSearchResult(){
                return this.$store.getters.getSearchResult;
            },
            getSearchFlag(){
                return this.$store.getters.getSearchFlag;
            },
            getSearchKeyword(){
                return this.$store.getters.getSearchKeyword;
            },
            getSearchFilters(){
                return this.$store.getters.getSearchFilters;
            },
            getRtl(){
                return this.$vuetify.rtl;
            }
        },
        watch:{
            getRtl(flag){
                this.Rtl = flag;
            },
            getSearchResult(searchResult){
                this.loadingMore = true;
                this.noSearchResult = false;
                this.nextPage = '';
                this.featuredDataToView=[];
                this.data = [];

                if(searchResult.length !== 0){
                    for(let i in searchResult.data){
                        if(searchResult.data[i].featured === true){
                            this.featuredData.push(searchResult.data[i]);

                        }
                        this.data.push(searchResult.data[i]);
                    }

                    this.nextPage=searchResult.next_page_url;
                    this.loadingMore = false;

                    /////structre for featured data array
                    this.start =  this.end;
                    this.end = this.start + 6;
                    this.featuredData.slice(this.start, this.end);
                    for(let i=this.start; i<this.end; i++){
                        if(this.featuredData[i] !== undefined) {
                            this.featuredDataToView.push(this.featuredData[i]);
                        }
                    }

                    for (let j in this.featuredDataToView){
                        this.dataWithFeatured.push(this.featuredDataToView[j]);
                    }
                    for(let i in this.data) {
                        if(this.data[i].featured !== true) {
                            this.dataWithFeatured.push(this.data[i]);
                        }
                    }

                }
                if(searchResult === "No-Result") {
                    this.noSearchResult = true;
                    this.loadingMore = false;
                    this.nextPage = null;
                }
            },
            getSearchFlag(flag){

                if(flag !== null) {
                    if (flag === true) {
                        this.featuredDataToView=[];
                        this.featuredData=[];
                        this.dataWithFeatured = [];
                        this.start= '';
                        this.end= 0;
                        this.$store.commit('setSearchFlag', false);
                    }
                }
            },
            getSearchKeyword(keyword){
                this.searchKeyword = keyword;
            },
            getSearchFilters(filters){
                this.filterparamters = filters;
            }
        },
          methods:{
            paginatesearch(){
                this.loadingMore = true;
                 this.$store.dispatch('searchKeyword', {
                     url:this.nextPage,
                     searchKeyword: this.searchKeyword,
                    filterparamters:this.filterparamters,

                    });
            }

        }

    }
</script>

<style scoped>
>>>.featured-card{
    border-top: 3px solid #e60000;
}
    .checked-icon{
        background-color: #e60000;
        padding: 0px;
        width: 25px;
        border-radius: 50%;
        text-align: center;
        height: 25px;
    }
>>>.article {
    display: block;
    overflow: hidden;
    position: relative;
    background: #fff;
    padding: 20px;
    text-align: center;
}
>>>.article:after {
    position: absolute;
    bottom: 0;
    height: 100%;
    width: 100%;
    right: 0;
    content: "";
    background: linear-gradient(to top, rgba(255,255,255, 1) 20%, rgba(255,255,255, 0) 100% );
    pointer-events: none; /* so the text is still selectable */
}
    >>>.ver-sec{
        font-size: x-small;
        padding: 5px !important;
        bottom: 145px;
    }
>>>.radting-badge-product{
    position: absolute;
     right: 0;
    bottom: 5px;
    /*left: 280px;*/
    background-color: #e60000;
    border-radius: 50%;
    padding: 6px;
    margin: 3px;
    color: white;
    height: 35px;
    font-size: smaller;
    width: 35px;
}
    >>>.no-results-msg{
        padding-top: 25px;
        font-size: 23px !important;
        text-align: center;
        color: #cccccc;
    }
>>>.radting-badge{
    position: absolute;
    /*right: 10px;*/
    /*left: 230px;*/
    background-color: #E60000;
    border-radius: 50%;
    padding: 7px;
    margin: 5px;
    color: white;
    height: 35px;
    font-size: smaller;
    width: 35px;
}
</style>
