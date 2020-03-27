<template>
    <v-card tile flat>
        <v-card-title class="font-weight-bold justify-space-between">
            <div >{{$t('profile.reviews.Reviews')}}</div>

        </v-card-title>

        <v-skeleton-loader
                v-if="loadingReviews"
                type="list-item-avatar-three-line"
                tile
        ></v-skeleton-loader>
<!--        <div v-if="loadingReviews" >-->
<!--            <v-layout-->
<!--                fill-height-->
<!--                align-center-->
<!--                justify-center-->
<!--                ma-0-->
<!--            >-->
<!--                <v-progress-circular indeterminate color="red "></v-progress-circular>-->
<!--            </v-layout>-->
<!--        </div>-->
        <div v-else-if="loadingReviews ===false  && reviews.length ===0 " style="min-height:92px;padding-bottom: 15px; font-size: large;text-align: center;justify-content:center;color: #cccccc;">
            <v-img width="65" alt="reviews" style="filter: invert(80%);margin: auto" src="/images/reviews.png"></v-img>
            {{$t('profile.reviews.No reviews yet')}}
        </div>
        <v-card-text  v-else-if="loadingReviews ===false  && reviews.length !==0 ">





                <div v-for="(review,i,h) in reviews" :key="i">

                <v-card elevation="0" :class="[i === 0 ? 'review-box-first' : i < reviews.length-1 ? 'review-box-center': reviews.length-1 ? 'review-box-last': 'review-box-one' ]">
                    <v-card-title style="align-items: end;">
                        <v-card  color="white" elevation="1" width="50" height="50" class="company-image">
                            <v-img
                                height="100%"
                                aspect-ratio="1.7"
                                :src="'/images/med/' + review.reviwerlogo"
                                :lazy-src="'/images/med/' + review.reviwerlogo"

                            >
                                <template v-slot:placeholder>
                                    <v-layout
                                        fill-height
                                        align-center
                                        justify-center
                                        ma-0
                                    >
                                        <v-progress-circular size="17" width="2" indeterminate color="#E60000"></v-progress-circular>
                                    </v-layout>
                                </template>
                            </v-img>
                        </v-card>
                        <v-layout row wrap style="margin-left: 5px; justify-content: space-between; margin-right: 5px;">
                            <v-card-title class="pa-0" style="line-height: 20px;">
                                <span style="color:#E60000; cursor: pointer;    text-align: initial;" @click="goToProfile(review.reviewerslug, review.profile_type)"  >
                                    {{review.reviewer}}
                                    <div style="color: dimgrey; font-size: 12px;">
                                    {{review.date }}
                                    </div>
                                </span>

                            </v-card-title>

                            <div>
                        <v-btn small icon @click="markAsBookmark(review.date,review.reviewerslug)" color="#E60000" :key="i" v-if="authFlagForComment && review.testmonials===0 && testmonailscount < 3 && individual === true" :disabled="review.testmonials===0 ? false : review.testmonials===1 ? true : true" >
                            <v-icon small color="#E60000">bookmark</v-icon>
                        </v-btn>
                            <v-btn small icon @click="deleteReview(review.reviewerslug,review.review)" color="#E60000" :key="i" v-if="authFlagForComment">
                                <v-icon small color="#E60000">close</v-icon>
                            </v-btn>
                            <v-icon small color="grey" v-if="review.testmonials === 1 && authFlagForComment && individual === true">bookmark</v-icon>
                            </div>
                        </v-layout>
                        <v-card-text class="pa-0" style="margin-left: 55px;padding-top: 0;margin-right: 55px; text-align: initial">
                            {{review.review}}
                        </v-card-text>
                    </v-card-title>


                    <v-card-text style="text-align: end" v-if="review.comment.length ===0  &&authFlagForComment" class="ma-2">
                        <v-form :ref="'replyForm'+i">
                        <v-textarea
                        :key="h"
                        v-model="parnet.reply_id[i]"
                            class="msg-top"
                            flat
                            solo
                            auto-grow
                        rows="1"
                        counter="200"
                        maxlength="200"
                        :placeholder="$t('profile.reviews.Write your reply')"
                        :rules="[ value => !!value || $t( 'registration.signup.required' ) ]"
                        ></v-textarea>
                        <v-btn

                            @click="viewReplyField(review.date,parnet.reply_id[i],i)"
                            :key="h"
                            class="more-btn-menu"
                            small
                            color="#E60000"
                            style=" color: white;  border-radius: 10px 10px 10px 10px ;"
                            :disabled="postReplyLoading"
                        >
                            {{$t('profile.reviews.Add Reply')}} <v-icon color="white"  right>chat</v-icon>

                        </v-btn>
                        </v-form>
                    </v-card-text>
                    <v-card  elevation="3" style="text-align: initial;" :class="[ rtlFlag === true ? 'mr-8 reply' : 'ml-8 reply']" v-if="review.comment.length !== 0">
                        <v-card-title >
                            <v-layout row wrap :class="[ rtlFlag === true ? 'mr-5' : 'ml-5']">
                            <v-card  color="white" elevation="1" width="50" height="50" class="company-image">
                     <v-img height="100%" aspect-ratio="1.7" :src="'/images/med/'+review.comment.reviwerlogo">
                         <template v-slot:placeholder>
                             <v-layout
                                     fill-height
                                     align-center
                                     justify-center
                                     ma-0
                             >
                                 <v-progress-circular size="17" width="2" indeterminate color="#E60000"></v-progress-circular>
                             </v-layout>
                         </template>
                     </v-img>
                            </v-card>
                                <div class="">
                                <h4 style="margin: 0 15px 0 15px;">{{review.comment.replyer}}</h4>
                                <v-card-text  style="padding-top: 0;">
                                    {{review.comment.Comment}}
                                </v-card-text>
                                </div>
                            </v-layout>


                        </v-card-title>

                    </v-card>

                </v-card>

                    <v-divider dark ></v-divider>
                </div>
                <v-divider dark ></v-divider>


        </v-card-text>
        <v-card-text v-if="authFlagForReply">
        <v-card flat class="review-box-one" >
            <v-card-title class="  justify-space-between">
                <div>{{$t('profile.reviews.Add Your Review')}}</div>
            </v-card-title>

            <v-card-text style="text-align: end">
                <div style="text-align: initial;">{{profiletypesName}}</div>
                <v-form ref="reviewRef">
                    <v-textarea
                            v-model="review"
                            class="msg-top"
                            flat
                            solo
                            counter="200"
                            maxlength="200"
                            auto-grow
                            :rules="[ value => !!value || $t( 'registration.signup.required' ) ]"
                            :placeholder="$t('profile.reviews.Write a review!')"
                            rows="1"
                            :loading="profiletypes === '' || loadingPost"
                            :disabled="profiletypes === '' || loadingPost"
                    ></v-textarea>
                    <!--                        recommendation section VIEW ONLY FOR INDIVIDUAL PROFILE-->
                    <v-sheet
                            class="mx-auto"
                            max-width="fit-content"
                            style="background-color: whitesmoke;"
                    >
                        <v-slide-group
                                v-if="routerNameWatch === 'individualProfile'"
                                multiple
                                show-arrows
                                style="direction: ltr"

                        ><v-btn-toggle
                                style="background-color:whitesmoke;"
                                multiple
                                v-model="toggle_one"
                        >
                            <div v-for="(type,r, index) in allrecommandtype" :key="r">
                                <v-slide-item
                                        v-slot:default="{ active, toggle }"
                                        style="    justify-content: center;"

                                >

                                    <v-btn outlined small text  :color="active ? 'red' : 'grey lighten-1'" @click="toggle" :id="'typeBtn' + r" :value="type" >

                                        <img v-if="active === false" width="20" style="margin-right: 5px"  src="../resources/Recommended_Darker_Grey.svg" >
                                        <img v-else width="20" style="margin-right: 5px"  src="../resources/Recommended_Red.svg">
                                        {{type}}
                                    </v-btn>
                                </v-slide-item>
                            </div>



                            <v-spacer></v-spacer>
                        </v-btn-toggle>
                        </v-slide-group>
                    </v-sheet>
                    <v-divider dark class="ma-2"></v-divider>

                    <!--          <v-select-->
                    <!--            v-model="profiletypes"-->

                    <!--            :items="profiles"-->
                    <!--            item-text="name"-->
                    <!--            item-value="slug"-->
                    <!--            label="Select"-->
                    <!--            persistent-hint-->
                    <!--            return-object-->
                    <!--            single-line-->
                    <!--          ></v-select>-->

                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                    small
                                    outlined
                                    color="#E60000"
                                    dark
                                    v-on="on"
                                    :loading="profiles.length ===0"
                            >
                                {{$t('profile.reviews.post as')}} <v-icon right color="#E60000">arrow_drop_down</v-icon>
                            </v-btn>
                        </template>

                        <v-list-item-group mandatory color="#E60000" >

                            <v-list
                                    dense
                                    v-for="(item, index) in profiles"
                                    :key="index"
                            >

                                <v-list-item
                                        :ripple="{ class: 'red--text' }"
                                        @click="setUserAs(item.slug, item.name, item.pic)"


                                >
                                    <v-list-item-avatar>
                                        <v-img :src="'/images/med/' + item.pic"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content >
                                        <v-list-item-title >
                                            {{ item.name }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-list-item-group>

                    </v-menu>

                    <v-btn
                            elevation="0"
                            @click="postReview"
                            small
                            color="#E60000"
                            style=" color: white;"
                            :disabled="profiletypes === '' || loadingPost"
                            :loading="loadingPost"
                    >
                        {{$t('profile.reviews.POST')}}

                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
        </v-card-text>
        <v-dialog
                persistent
                scrollable
                v-model="deleteReviewConfirm"
                max-width="350"
        >
            <v-card>

                <v-card-title style="justify-content: center;text-align: center;word-break: normal;">
                    {{$t('profile.reviews.Are You sure you want delete this review?')}}
                    <v-list-item-subtitle style="text-decoration: line-through;text-decoration-color: red;">
                        "{{reviewToDelete}}"
                    </v-list-item-subtitle>
                </v-card-title>
                <v-card-actions style="justify-content: space-between">

                    <v-btn

                            color="#E60000"
                            text
                            @click="deleteReviewConfirm = false"
                    >
                        {{$t('profile.products.no')}}
                    </v-btn>

                    <v-btn

                            color="#E60000"
                            dark
                            elevation="0"
                            @click="deleteReviewNow()"
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
        name: "reviews",
        mixins: [userInfoMixin],
        data:()=> {
            return {
                deleteReviewConfirm: false,
                reviewToDelete: '',
                reviewSlugToDelete: '',

                individual: true,
                model: '',
                loadingReviews: true,
                replyInput: false,
                reviews: [],
                authFlagForReply: false,
                authFlagForComment: false,
                review: '',
                reply: '',
                profiletypes: '',
                profiletypesName: '',
                profilePic: '',
                loadingPost: false,
                rules: {
                    required: value => !!value || 'Required.',
                    max: v => v.length <= 200 || 'Maximum 200 characters',
                },
                profiles: [],

                parnet: {
                    reply_id: []
                },
                testmonailscount: 0,
                testmonialstotal: '',
                postReplyLoading: false,

                routerNameWatch: '',
                allrecommandtype: [],
                toggle_one: [],
                rtlFlag: null,
            }
        },
        filters:{
            dateFormat(date){
                let newFormate = new Date(date);
                return newFormate.toDateString();
            }
        },

           created(){
            if(this.$route.name === 'companyProfile'){
                this.individual = true;
            }else {
                this.individual = false;
            }
            this.rtlFlag = this.$vuetify.rtl;
             this.$store.dispatch('Allreviwes', this.$route.params.id);
             this.$store.dispatch('allProfileTypes', this.$route.params.id);


             this.routerNameWatch = this.$route.name;
         },
            computed:{
            checkUserAuth(){
                return this.$store.getters.getAuthFlag;
            },
            getAllreviwes(){
                return this.$store.getters.getAllreviwes;
            },
            getTestmonailsTotal()
            {
                return this.$store.getters.getTestmonailsTotal;
            },
            getAllProfileType(){
                return this.$store.getters.getAllProfileType;
            },
            getAllRecommendsTypes(){
                return this.$store.getters.getAllRecommendsTypes;
            },
            getAppMsgs(){
                return this.$store.getters.getAppMsgs;
            },
                getSaveReviewFlag(){
                return this.$store.getters.getSaveReviewFlag;
                },
                getRtlFlag(){
                return this.$vuetify.rtl;
                }
        },
        watch:{
            '$route' (from,to){
                this.$store.dispatch('Allreviwes', this.$route.params.id);
                this.$store.dispatch('allProfileTypes', this.$route.params.id);
            },
            getRtlFlag(flag){
              this.rtlFlag =  flag;
            },
            getSaveReviewFlag(flag){
                if(flag === true){
                    // for (let i in this.allrecommandtype) {
                    //     document.getElementById('typeBtn' + i).click();
                    // }
                    this.review = "";
                    this.toggle_one = [];
                    this.allrecommandtype = [];
                    this.$store.dispatch('AllRecommendsTypes', {id: this.$route.params.id, lang: this.$i18n.locale});
                    this.$refs.reviewRef.reset();

                }
            },
            getAppMsgs(flag){
                if(flag.appSnackbarMsgs !== null) {
                    this.postReplyLoading = false;
                    this.loadingPost = false;




                }
            },
            checkUserAuth(flag){

                if(flag === true) {
                    this.authFlagForReply = false;
                    this.authFlagForComment=true;

                }else if (flag === false){
                    this.authFlagForReply = true;
                     this.authFlagForComment=false;

                }
                 else if (flag === 'not_auth'){
                    this.authFlagForReply = false;
                    this.authFlagForComment=false;

                }
            },
            getAllreviwes(reviews){

                this.loadingReviews = true;
                this.reviews =[];

                if( reviews !== null && reviews.reviews.length !== 0 ) {

                this.reviews = reviews.reviews;

                this.loadingReviews = false;
                console.log(this.reviews);

            }else {
                    this.loadingReviews = false;
                    this.reviews =[];
                }

            },
             getAllProfileType(profile){

                if(profile) {

            for(let i in profile){

            this.profiles.push({name: profile[i].name, slug:profile[i].slug, pic:profile[i].pic});


            }
                    this.profiletypes = profile[0].slug;
            this.profiletypesName = profile[0].name;

            }
        },

         getTestmonailsTotal(testmonails)
            {

                if(testmonails !== null)
                {

                    this.testmonailscount=testmonails.testmonialscount;
                    this.testmonialstotal=testmonails.testmonialstotal;

                }

            },
              getAllRecommendsTypes(recommandtype) {
                console.log(recommandtype,'recommandtype');

                if(recommandtype){
                    this.allrecommandtype = [];
                    for(let i in recommandtype){
                        this.allrecommandtype.push(recommandtype[i].recommendsname);
                        // this.individual = false;
                    }
                }else{
                    // this.individual = true;
                }

            },

        },

        methods:{
            goToProfile(slugToGo, profileType){

                if(profileType === 'company') {
                    this.$router.push({
                        name: 'companyProfile',
                        params: {id: slugToGo, lang: this.$route.params.lang}
                    });
                }else if(profileType === 'individual'){
                    this.$router.push({
                        name: 'individualProfile',
                        params: {id: slugToGo, lang: this.$route.params.lang}
                    });
                }else if(profileType === 'personal'){
                    this.$router.push({
                        name: 'personalProfile',
                        params: {id: slugToGo, lang: this.$route.params.lang}
                    });
                }
            },
            setUserAs(slug, name, pic){
                this.profilePic = pic;
                this.profiletypes = slug;
                this.profiletypesName = name;
            },
            viewReplyField(date,reply, index){
                this.$store.commit('setClearAppMsgs');


                if(reply !== undefined && reply !== ''){
                    console.log(reply,"GEORGE");
                    this.postReplyLoading = true;
                    this.$store.commit('setClearAppMsgs');

                        this.$store.dispatch('saveReply', {
                            slug: this.$route.params.id,
                            reply: reply,
                            date: date,

                        });

                }else {
                    this.postReplyLoading = false;
                    this.$store.commit('setAppMsgs', {
                        msg: "profile.reviews.Please Fill Reply!",
                        color: "info",
                        icon: "info"
                    })
                }

            },

            postReview() {

                if (this.$refs.reviewRef.validate()) {

                    this.$store.commit('setClearAppMsgs');
                    this.loadingPost = true;

                        this.$store.dispatch('saveReview', {
                            slug: this.$route.params.id,
                            review: this.review,
                            reviwerslug: this.profiletypes,
                            recommandtype: this.toggle_one,
                            reviewerLogo: this.profilePic,
                            lang: this.$i18n.locale,
                        });

                }
                // }else {
                //     this.$store.commit('setAppMsgs', {
                //         msg: "Please Fill Review with no more 200 characters!",
                //         color: "info",
                //         icon: "info"
                //     });
                //     this.loadingPost = false;
                // }

            },

               markAsBookmark(id, reviewerslug) {
                   this.$store.commit('setClearAppMsgs');
                   this.$store.dispatch('markAsBookmark', {
                       slug: this.$route.params.id,
                       reviewerslug: reviewerslug,
                       id: id,
                   });
               },
            deleteReview(reviewerslug, content){
                this.reviewToDelete = content;
                this.reviewSlugToDelete = reviewerslug;
                this.deleteReviewConfirm = true;
            },
            deleteReviewNow(){
                this.$store.commit('setClearAppMsgs');
                this.$store.dispatch('deleteReview', {
                    reviewer_slug: this.reviewSlugToDelete,
                    review_content: this.reviewToDelete,
                    business_slug: this.$route.params.id,

                });
                this.deleteReviewConfirm = false;
            }
        }
    }
</script>

<style scoped>
>>>.review-box-first{
    background-color: whitesmoke !important;
    border-radius: 15px 15px 0px 0px;
}
    >>>.review-box-center{
        background-color: whitesmoke !important;
        border-radius: 0px;
    }
    >>>.review-box-last{
        background-color: whitesmoke !important;
        border-radius: 0px 0px 15px 15px;
    }
    >>>.review-box-one{
        background-color: whitesmoke !important;
        border-radius: 15px;
    }
    >>>.reply{
        background-color: #e0e0e0 !important;
        border-radius: 15px;
    }
    >>>.msg-top:before{
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-top: 20px solid #ffffff;
        border-left: 16px solid transparent;
        border-right: 16px solid transparent;
        /* top: 28px; */
        left: 7px;
    }
    >>>.reply-content{
        font-size: medium;
        color: #707070;
        margin-left: 70px!important;
    }
>>>.v-list {
    border-radius: 0px !important;
    display: block;
    padding: 8px 0;
    position: static;
    transition: box-shadow .28s cubic-bezier(.4,0,.2,1);
    will-change: box-shadow;
}
>>>.v-textarea.v-text-field--enclosed.v-text-field--single-line textarea {
    margin-top: 0px;
}

>>>.v-skeleton-loader__avatar {
    border-radius: 0 !important;
    height: 50px !important;
    width: 50px !important;
}

>>>.v-skeleton-loader__paragraph .v-skeleton-loader__text:first-child {
    max-width: 25%;
}

>>>.v-skeleton-loader__paragraph .v-skeleton-loader__text:nth-child(2) {
    max-width: 15%;
}
</style>
