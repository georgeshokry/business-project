
import axios from 'axios/index';


export default {
    state: {
        loadingSpinner:null,
        dbResposne: null,
        authFlag: null,
        appSnackbarMsgs: null,
        appSnackbarColor: null,
        appSnackbarIcon: null,
        posts:null,
        userData: null,
        imageSlider: null,
        faqs: null,
        selectedFaqs:[],
        comoboboxFaqs:[],
       profileType: null,
        otherFaqs:[],
        allreviews:null,
        testmonailsTotal:null,
        allprofiles:[],
        allproducts:null,
        allservice:[],
        allselectedservice:[],
        allfeaturedproducts:null,
        comoboboxservice:[],
        otherservice:[],
         allkeywords:[],
         selectedkeywords:[],
         memberstuff:[],
         checkemailmemberresponse:null,
        allbookmark:[],
        alltransaction:[],
        allcountry:[],
        allbusinesscategory:[],
       authFlagForEdit:null,
       allhelp:[],
       allreprot:[],
       allsenders:[],
     allmessagesofsenders:[],
     allrecommendstypes:[],
     allcertifications:[],
     allmembertransacation:[],
     alljobtitle:[],
     allfeaturedproductservice:[],
     allproservcertifications:null,
     allserviceskills:[],
     allempolymenthistory:[],
     allmemberhobbies:[],
     allmemberinterest:[],
     allmemberowninterest:[],
    allmemberownhobbies:[],
    latestjoiners:[],
        repliesmessage:'',


        errorLoadingData: null,

        allJobField: [],
        saveReviewFlag: null,


    },
    mutations: {
        setErrorLoadingData(state, flag){
          state.errorLoadingData = flag;
        },
        setLoadingSpinner(state, flag){
          state.loadingSpinner = flag;
        },
        setAuthFlagForEdit(state, flag){
            state.authFlagForEdit = flag;
        },
        setProfileType(state, type){
            state.profileType = type;
        },
        setdbResposne(state, res){
            state.dbResposne = res;
        },
        setAuthFlag(state, payload){
            state.authFlag= payload;
        },
        setAppMsgs(state, payload){
            state.appSnackbarMsgs= payload.msg;
            state.appSnackbarColor= payload.color;
            state.appSnackbarIcon= payload.icon;
        },
        setClearAppMsgs(state){
            state.appSnackbarMsgs= null;
            state.appSnackbarColor= null;
            state.appSnackbarIcon= null;
        },
        UpdateuserAuth(state, posts) {
            state.posts = posts
        },
        setUserData(state, data){
            state.userData = data;
        },
        setImageSlider(state, slides){
            state.imageSlider = slides;
        },
        setGetFaqs(state, faqs){
            state.faqs = faqs;
        },
        setSelectedFaqs(state, data)
        {

       state.selectedFaqs = data;

        },

        setComoboboxFaqs(state, data)
        {

       state.comoboboxFaqs = data;

        },

        setOtherFaqs(state, data)
        {

       state.otherFaqs = data;

        },
        setAllReviews(state, data)
        {

       state.allreviews = data;

        },
         setAllProfileType(state, data)
        {

       state.allprofiles = data;

        },
         setAllProducts(state, data)
        {

       state.allproducts = data;

        },
          setTestmonailsTotal(state, data)
        {

       state.testmonailsTotal = data;

        },
        setAllService(state, data)
        {

       state.allservice = data;

        },
        setSelectedBusinesSservive(state, data)
        {

       state.allselectedservice = data;

        },

        setAllFeaturedProducts(state, data)
        {

       state.allfeaturedproducts = data;

        },
        setComoboboxService(state, data)
        {

       state.comoboboxservice = data;

        },
          setOtherService(state, data)
        {

       state.otherservice = data;

        },
          setAllKeywords(state, data)
        {

       state.allkeywords = data;

        },
             setSelectedKeywords(state, data)
        {

       state.selectedkeywords = data;

        },
              setMemberstuff(state, data)
        {

       state.memberstuff = data;

        },

     setCheckEmailMemberResponse(state, data)
        {

       state.checkemailmemberresponse = data;

        },
        setAllBookmark(state, data)
        {

            state.allbookmark = data;

        },
        setAllTransaction(state, data)
        {

            state.alltransaction = data;

        },
        setAllCountry(state, data)
        {

            state.allcountry = data;

        },
        setAllBusinessCategory(state, data)
        {

            state.allbusinesscategory = data;

        },
           setAllHelp(state, data)
        {
            state.allhelp = data;
        },
         setAllReport(state, data)
        {
            state.allreprot = data;
        },
        setAllSenders(state, data)
        {
            state.allsenders = data;
        },

 setMessageofSender(state, data)
        {
            state.allmessagesofsenders = data;
        },

        setAllRecommendsTypes(state, data)
        {

       state.allrecommendstypes = data;

        },
        setAllCertifications (state, data)
        {

       state.allcertifications = data;

        },
        setAllMemberTransacation  (state, data)
        {

       state.allmembertransacation = data;

        },
         setAllJobTitle  (state, data)
        {

       state.alljobtitle = data;

        },
           setAllFeaturedProductService  (state, data)
        {

       state.allfeaturedproductservice = data;

        },
        setAllProServCertifications (state, data)
        {

       state.allproservcertifications = data;

        },
        setAllServiceSkills(state, data)
        {

       state.allserviceskills = data;

        },
        setAllEmploymentHistory(state, data) {


       state.allempolymenthistory=data;

        },
        setAllMemberInterest(state, data)
        {

       state.allmemberinterest = data;

        },
         setAllMemberHobbies(state, data)
        {

       state.allmemberhobbies = data;

        },
          setAllMemberOwnInterest(state, data)
        {

       state.allmemberowninterest = data;

        },
         setAllMemberOwnHobbies(state, data)
        {

       state.allmemberownhobbies = data;

        },
        setLatestJoiners(state, data)
        {

       state.latestjoiners = data;

        },
        setRepliesMessage(state, data){
            state.repliesmessage = data;
        },

        setAllJobField(state, data){
            state.allJobField = data;
        },
        setSaveReviewFlag(state, data){
            state.saveReviewFlag = data;
        },

    },
    actions: {
        checkUserAuth({commit}, id){
           commit('setAuthFlag', null);

             axios.post('/vue/isUserAuth', {slug: id})
                .then(function (response) {

                    commit('setAuthFlag', response.data);
                })
                .catch(function (error) {

                });
        },
        appMsgs({commit}, payload){
            commit('setAppMsgs', payload);
        },
        clearAppMsgs({commit}){
            commit('setClearAppMsgs');
        },
         userUth({commit}) {
             axios.get('api/users').then((response) => {

                commit('UpdateuserAuth', response.data)

            })
        },
        async userData({commit}, payload) {
            // commit('setUserData', null);
            // commit('setProfileType', null)
            commit('setErrorLoadingData', null);
           await axios.post('/vue/userdata', {slug: payload.id, lang: payload.lang},)
                .then(function (response) {
                   commit('setUserData', response.data);

                   commit('setProfileType', response.data.profile_type);

                })
                .catch(function (error) {
                    error.response.status <= 500 ?
                        commit('setErrorLoadingData',
                            true
                    ) : '';
                });
        },
        async imageSlider({commit}, id){
            await axios.post('/vue/imageslider', {slug: id})
                .then(function (response) {

                    commit('setImageSlider', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        saveImageSlideData({commit}, payload){
            commit('setClearAppMsgs');
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            let fd= new FormData();
            fd.append('image', payload.image);
            fd.append('title', payload.title);
            fd.append('content', payload.content);
            fd.append('slug', payload.slug);
            axios.post('/vue/uploadimageslider', fd,config).then(resp => {

                    if(resp.data === true){

                         axios.post('/vue/imageslider', {slug: payload.slug})
                            .then(function (response) {

                                commit('setImageSlider', response.data);
                                commit('setAppMsgs', {
                                    msg:"profile.sliderProfile.Slide Saved Successfully",
                                    color: "success",
                                    icon: "check"
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"Problem in saving slide, Try again!",
                            color: "error",
                            icon: "check"
                        });
                    }
                })
        },
             editImageSlideData({commit}, payload){

            commit('setClearAppMsgs');
                 commit('setImageSlider', null);
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            let fd= new FormData();
            fd.append('image', payload.image);
            // fd.append('title', payload.title);
            // fd.append('content', payload.content);
            fd.append('slug', payload.slug);
            fd.append('imageid', payload.imageid);
            axios.post('/vue/edituploadimageslider', fd,config).then(resp => {

                    if(resp.data === true){

                         axios.post('/vue/imageslider', {slug: payload.slug})
                            .then(function (response) {

                                commit('setImageSlider', response.data);
                                commit('setAppMsgs', {
                                    msg:"profile.sliderProfile.Slide Saved Successfully",
                                    color: "success",
                                    icon: "check"
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },
        saveAboutCompany({commit}, payload){
            commit('setClearAppMsgs');
            axios.post('/vue/updatcompanyservice', {slug: payload.slug, companycontent: payload.content}).then(resp => {

                if (resp.data === true) {
                    axios.post('/vue/userdata', {slug: payload.slug, lang: payload.lang})
                        .then(function (response) {

                            commit('setUserData', response.data);
                            commit('setAppMsgs', {
                                msg:"profile.about.Content Saved Successfully",
                                color: "success",
                                icon: "check"
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }else {
                    commit('setAppMsgs', {
                        msg:"profile.faqs.problem",
                        color: "error",
                        icon: "error"
                    });
                }
            });
        },
        saveOurProducts({commit}, payload){
            commit('setClearAppMsgs');
            axios.post('/vue/updatcompanyservice', {slug: payload.slug, servicecontent: payload.content}).then(resp => {

                if (resp.data === true) {
                    axios.post('/vue/userdata', {slug: payload.slug, lang: payload.lang})
                        .then(function (response) {

                            commit('setUserData', response.data);
                            commit('setAppMsgs', {
                                msg:"profile.about.Content Saved Successfully",
                                color: "success",
                                icon: "check"
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }else {
                    commit('setAppMsgs', {
                        msg:"Problem in saving content, Try again!",
                        color: "error",
                        icon: "error"
                    });
                }
            });
        },
            async Faqs({commit}, payload){
                commit('setGetFaqs', null);
            await axios.post('/vue/getbusinessfaqs', {slug: payload.id, lang: payload.lang})
                .then(function (response) {

                    commit('setGetFaqs', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

                async selectedFaqs({commit}, payload){
            await axios.post('/vue/getselectedfaqs', {slug: payload.id, lang: payload.lang})
                .then(function (response) {


                    commit('setSelectedFaqs', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

                        async ComboboxFaqs({commit}, payload){
            await axios.post('/vue/getcomboboxfaqs', {slug: payload.id, lang: payload.lang})
                .then(function (response) {


                    commit('setComoboboxFaqs', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

                        async OtherFaqs({commit}, payload){
            await axios.post('/vue/getselectedotherfaqs', {slug: payload.id, lang: payload.lang})
                .then(function (response) {


                    commit('setOtherFaqs', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        sendFaqsMessage({commit}, payload){
            commit('setClearAppMsgs');


            axios.post('/vue/sendfaqsmessage', {slug: payload.slug, message: payload.faqname}).then(resp => {

                if(resp.data === true) {


                    commit('setAppMsgs', {
                        msg: "profile.faqs.FAQs Sent Successfully",
                        color: "success",
                        icon: "check"
                    });
                } else if(resp.data === 'Already sent'){
                    commit('setAppMsgs', {
                        msg: "profile.faqs.This FAQ Sent Before, Check profile inbox!",
                        color: "info",
                        icon: "info"
                    });
                } else{

                    commit('setAppMsgs', {
                        msg:"profile.faqs.Problem in sending Faqs, Try again!",
                        color: "error",
                        icon: "check"
                    });
                }
            })
        },
        saveFAQsData({commit}, payload){
            commit('setClearAppMsgs');


            axios.post('/vue/saveselectedfaqs', {lang: payload.lang, slug: payload.slug, faqs: payload.faqsselected,other:payload.inputs}).then(resp => {

                    if(resp.data === true){

                         axios.post('/vue/getbusinessfaqs', {lang: payload.lang, slug: payload.slug})
                            .then(function (response) {

                                commit('setGetFaqs', response.data);

                                commit('setAppMsgs', {
                                    msg:"profile.faqs.FAQs Saved Successfully",
                                    color: "success",
                                    icon: "check"
                                });
                            })
                            .catch(function (error) {
                                commit('setAppMsgs', {
                                    msg:"profile.faqs.problem",
                                    color: "error",
                                    icon: "error"
                                });
                            });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },
        async Allreviwes({commit}, id){
            commit('setAllReviews', null);
            await axios.post('/vue/getreviewscomments', {slug: id})
                .then(function (response) {


                    commit('setAllReviews', response.data);
                    commit('setTestmonailsTotal', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
  async allProfileTypes({commit}, id){
            await axios.get('/vue/getprofileuser')
                .then(function (response) {


                    commit('setAllProfileType', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
            saveReview({commit, dispatch}, payload){
            commit('setClearAppMsgs');
            commit('setSaveReviewFlag', null);
            axios.post('/vue/savereviewdata', {slug: payload.slug, review: payload.review,reviwerslug: payload.reviwerslug,recommandtype:payload.recommandtype, ReviewerLogo: payload.reviewerLogo}).then(resp => {

                if (resp.data === true) {
                    commit('setSaveReviewFlag', true);
                    axios.post('/vue/getreviewscomments', {slug: payload.slug})
                        .then(function (response) {

                            commit('setAllReviews', response.data);
                            dispatch('AllRecommendsTypes', {id: payload.slug, lang: payload.lang});

                            commit('setAppMsgs', {
                                msg:"profile.reviews.Review Saved Successfully",
                                color: "success",
                                icon: "check"
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }else {
                    commit('setAppMsgs', {
                        msg:"profile.faqs.problem",
                        color: "error",
                        icon: "error"
                    });
                }
            });
        },
        deleteReview({commit, dispatch}, payload){
            commit('setClearAppMsgs');
            axios.post('/vue/deleteReply', {reviewer_slug: payload.reviewer_slug, review_content: payload.review_content,business_slug: payload.business_slug}).then(resp => {
                if (resp.data === true) {
                    dispatch('Allreviwes', {id: payload.business_slug});

                    commit('setAppMsgs', {
                        msg:"profile.reviews.Review Saved Successfully",
                        color: "success",
                        icon: "check"
                    });
                }
            }).catch((error)=>{

            });

        },
         saveReply({commit}, payload){
            commit('setClearAppMsgs');
            axios.post('/vue/savereplydata', {slug: payload.slug, reply: payload.reply,date: payload.date}).then(resp => {

                if (resp.data === true) {
                    axios.post('/vue/getreviewscomments', {slug: payload.slug})
                        .then(function (response) {

                            commit('setAllReviews', response.data);
                            commit('setAppMsgs', {
                                msg:"profile.reviews.Reply Saved Successfully",
                                color: "success",
                                icon: "check"
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }else {
                    commit('setAppMsgs', {
                        msg:"profile.faqs.problem",
                        color: "error",
                        icon: "error"
                    });
                }
            });
        },
           async  AllProducts({commit}, id) {
            commit('setAllProducts', null);
            commit('setAllFeaturedProducts', null)

           await axios.post('/vue/userproduct', {slug: id})
                .then(function (response) {

                    commit('setAllProducts', response.data);
                     commit('setAllFeaturedProducts', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


          saveProductData({commit}, payload){
            commit('setClearAppMsgs');
              commit('setAllProducts', null);

            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            let fd= new FormData();
            fd.append('image', payload.image);
            fd.append('title', payload.title);
            fd.append('content', payload.content);
            fd.append('slug', payload.slug);
            axios.post('/vue/uploadproduct', fd,config).then(resp => {

                    if(resp.data === true){
                      // console.log("resp true", resp.data);
                         axios.post('/vue/userproduct', {slug: payload.slug})
                            .then(function (response) {

                                commit('setAllProducts', response.data);
                                commit('setAppMsgs', {
                                    msg:"individualProfile.mostNotableWork.Product Saved Successfully",
                                    color: "success",
                                    icon: "check"
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },

            editProductData({commit}, payload){
            commit('setClearAppMsgs');
                commit('setAllProducts', null);
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            let fd= new FormData();
            fd.append('image', payload.image);
            fd.append('title', payload.title);
            fd.append('content', payload.content);
            fd.append('id', payload.id);
            fd.append('slug', payload.slug);

            axios.post('/vue/editproduct', fd,config).then(resp => {

                    if(resp.data === true){
                      // console.log("resp true", resp.data);
                         axios.post('/vue/userproduct', {slug: payload.slug})
                            .then(function (response) {
                                console.log("store", response)
                                commit('setAllProducts', response.data);
                                commit('setAppMsgs', {
                                    msg:"individualProfile.mostNotableWork.Product Saved Successfully",
                                    color: "success",
                                    icon: "check"
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },

                   rateProduct({commit}, payload){
            commit('setClearAppMsgs');


            axios.post('/vue/rateproduct', {lang: payload.lang, rater_slug: payload.rater_slug, slug: payload.slug,id:payload.id,rate:payload.rate}).then(resp => {

                    if(resp.data === true){
                      // console.log("resp true", resp.data);
                        commit('setAllProducts', null);
                         axios.post('/vue/userproduct', {slug: payload.slug})
                            .then(function (response) {
                                //console.log("store", response)
                                commit('setAllProducts', response.data);
                                commit('setAppMsgs', {
                                    msg:"profile.products.Product Rated Successfully",
                                    color: "success",
                                    icon: "check"
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },

          markFeaturedProduct({commit}, payload){
            commit('setClearAppMsgs');

             commit('setAllProducts', null);
            axios.post('/vue/markfeaturedproduct', {slug: payload.slug,id:payload.id}).then(resp => {

                    if(resp.data.sucess === true){
                      // console.log("resp true", resp.data);
                        //commit('setTestmonailsTotal',resp.data)
                         axios.post('/vue/userproduct', {slug: payload.slug})
                            .then(function (response) {

                                commit('setAllProducts', response.data);
                                commit('setAppMsgs', {
                                    msg:"profile.products.Product Featured Successfully",
                                    color: "success",
                                    icon: "check"
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },

         markAsBookmark({commit}, payload){
            commit('setClearAppMsgs');

             commit('setAllReviews', null);
            axios.post('/vue/markasbookmark', {slug: payload.slug,id:payload.id, targetSlug: payload.reviewerslug}).then(resp => {

                    if(resp.data.sucess === true){
                      // console.log("resp true", resp.data);
                        commit('setTestmonailsTotal',resp.data);
                         axios.post('/vue/getreviewscomments', {slug: payload.slug})
                            .then(function (response) {

                                commit('setAllReviews', response.data);
                                commit('setAppMsgs', {
                                    msg:"profile.reviews.Review Marked Successfully",
                                    color: "success",
                                    icon: "check"
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },
             async Allservice({commit}, payload){
            await axios.post('/vue/getuserbusinessservive', {slug: payload.id, lang: payload.lang})
                .then(function (response) {


                    commit('setAllService', response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },

                   async selectedBusinesSservive({commit}, payload){
            await axios.post('/vue/getallbusinessservive', {slug: payload.id, lang: payload.lang})
                .then(function (response) {


                    commit('setSelectedBusinesSservive', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
               async ComboboxService({commit}, payload){
            await axios.post('/vue/getcomboboxservice', {slug: payload.id, lang: payload.lang})
                .then(function (response) {


                    commit('setComoboboxService', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
                         async OtherService({commit}, payload){
                             commit('setOtherService', null);
            await axios.post('/vue/getotherservice', {slug: payload.id, lang: payload.lang})
                .then(function (response) {


                    commit('setOtherService', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
         saveServiceData({commit,dispatch}, payload){
            commit('setClearAppMsgs');
             commit('setAllService', null);

            axios.post('/vue/saveservicedata', {slug: payload.slug, selectedServices: payload.selectedServices,other:payload.inputs}).then(resp => {

                    if(resp.data === true){
                        dispatch('OtherService', {lang: payload.lang, slug: payload.slug})
                         axios.post('/vue/getuserbusinessservive', {lang: payload.lang, slug: payload.slug})
                            .then(function (response) {

                            commit('setAllService', response.data);


                                commit('setAppMsgs', {
                                    msg:"profile.services.Service Saved Successfully",
                                    color: "success",
                                    icon: "check"
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },

             async  Allkeywords({commit}, payload) {
            commit('setAllKeywords', null);


           await axios.post('/vue/getkeywords', {slug: payload.slug, lang: payload.lang})
                .then(function (response) {

                    commit('setAllKeywords', response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },

                     async SelectedKeywords({commit}, payload){
            await axios.post('/vue/getuserkeywords', {slug: payload.slug, lang: payload.lang})
                .then(function (response) {


                    commit('setSelectedKeywords', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
               saveTagsData({commit, dispatch}, payload){
            commit('setClearAppMsgs');


            axios.post('/vue/savetagsedata', {slug: payload.slug, tags: payload.tags, lang: payload.lang}).then(resp => {

                    if(resp.data === true){

                        dispatch('SelectedKeywords', {lang: payload.lang, slug: payload.slug});
                        commit('setAppMsgs', {
                            msg:"profile.contactColumn.Tags Saved Successfully",
                            color: "success",
                            icon: "check"
                        });
                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },
                 async Memberstuff({commit}, id){
            await axios.post('/vue/getusermemberstuff', {slug: id})
                .then(function (response) {


                    commit('setMemberstuff', response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
               CheckEmailMember({commit}, payload){
            commit('setClearAppMsgs');
          commit('setCheckEmailMemberResponse',null);

            axios.post('/vue/checkemailmember', { name: payload.name}).then(resp => {

                 commit('setCheckEmailMemberResponse', resp.data);
                    if(resp.data === true){
                        //console.log(resp,'kresp');


                                commit('setAppMsgs', {
                                    msg:"profile.contactColumn.Email Existed",
                                    color: "success",
                                    icon: "check"
                                });


                    }

                    else{

                        commit('setAppMsgs', {
                            msg:"profile.contactColumn.Email Doesnt Existed Or Already Stuff Member, Try again!",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },
               SaveStuffMemberData({commit}, payload){
            commit('setClearAppMsgs');


            axios.post('/vue/savememberstuffdata', {slug: payload.slug, name: payload.name,jobtitle: payload.jobtitle}).then(resp => {

                    if(resp.data === true){

                         axios.post('/vue/getusermemberstuff', {slug: payload.slug})
                            .then(function (response) {

                            commit('setMemberstuff', response.data);


                                commit('setAppMsgs', {
                                    msg:"profile.contactColumn.Member stuff Saved Successfully",
                                    color: "success",
                                    icon: "check"
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    }
                    else{
                        console.log("resp false",resp);
                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },
               DeleteStuffMember({commit}, payload){
            commit('setClearAppMsgs');
            commit('setMemberstuff', []);

            axios.post('/vue/deleteusermemberstuff',
                {slug: payload.slug,
                    stuffid: payload.stuffid}).then(resp => {
                console.log("full",resp);
                    if(resp.data === true){
                        console.log("resp true", resp.data);
                         axios.post('/vue/getusermemberstuff',
                            {slug: payload.slug})
                            .then(function (response) {

                            commit('setMemberstuff', response.data);


                                commit('setAppMsgs', {
                                    msg:"profile.contactColumn.Member stuff Deleted Successfully",
                                    color: "success",
                                    icon: "check"
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    }
                    else{
                        console.log("resp false",resp);
                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "check"
                        });
                    }
                })
        },
        async AllBookmark({commit}, id){
            commit('setAllBookmark', null);
            await axios.post('/vue/getuserbookmarked', {slug: id})
                .then(function (response) {


                    commit('setAllBookmark', response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async AllTransaction({commit}, id){
            commit('setAllTransaction', null);
            await axios.post('/vue/getusertransactions', {slug: id})
                .then(function (response) {


                    commit('setAllTransaction', response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async AllCountry({commit}, payload){
            await axios.post('/vue/getcountry', {lang: payload.lang})
                .then(function (response) {


                    commit('setAllCountry', response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async AllBusinessCategory({commit}, id){
            await axios.post('/vue/getbusinesscategory',{lang: id.lang})
                .then(function (response) {


                    commit('setAllBusinessCategory', response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async AllJobField({commit}, payload){
            await axios.post('/vue/getjobfield', {lang: payload.lang})
                .then(function (response) {


                    commit('setAllJobField', response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
         async AllJobTitle({commit}, payload){
            await axios.post('/vue/getjobtitle', {lang: payload.lang, id: payload.id})
                .then(function (response) {


                    commit('setAllJobTitle', response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
             saveProfileEditData({commit}, payload){
                 commit('setUserData', null);
            commit('setClearAppMsgs');
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            let fd= new FormData();
             fd.append('slug', payload.slug);
            fd.append('image', payload.image);
            fd.append('name', payload.name);
            fd.append('businesscategory', payload.businesscategory);
            fd.append('userLocation', payload.userLocation);
            fd.append('country', payload.country);
            fd.append('phone', payload.phone);
            fd.append('busniessemail', payload.busniessemail);
            fd.append('facebook', payload.facebook);
            fd.append('instagram', payload.instagram);
            fd.append('twitter', payload.twitter);
            fd.append('behance', payload.behance);
            fd.append('linkedin', payload.linkedin);
            fd.append('website', payload.website);
                 fd.append('description', payload.description);
            axios.post('/vue/saveprofileeditdata', fd,config).then(resp => {

                   if(resp.data === true){
                      axios.post('/vue/userdata', {slug: payload.slug, lang: payload.lang})
                        .then(function (response) {

                            commit('setUserData', response.data);
                            commit('setAppMsgs', {
                                msg:"Changes Saved Successfully",
                                color: "success",
                                icon: "check"
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });



                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "check"
                        });
                    }
                })
        },

              AddBoomarkbusiness({commit}, payload){
            commit('setClearAppMsgs');

             commit('setAllBookmark', null);
            axios.post('/vue/addboomarkbusiness', {slug: payload.slug,id:payload.id,bookmarkedbusiness:payload.bookmarkedbusiness}).then(resp => {

                    if(resp.data.sucess === true){

                         axios.post('/vue/getuserbookmarked', {slug: payload.slug})
                            .then(function (response) {

                                commit('setAllBookmark', response.data);
                                commit('setAppMsgs', {
                                    msg:"bookmark-component.bookmarkAsDialog.Added To Bookmark Successfully",
                                    color: "success",
                                    icon: "check"
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "check"
                        });
                    }
                })
        },
          async HelpOpetions({commit}, payload){
            commit('setAllHelp', null);

            await axios.post('/vue/getallheplpoptions', {lang: payload.lang})
                .then(function (response) {

                    commit('setAllHelp', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        sendTicketHelp({commit}, payload){
            commit('setClearAppMsgs');

              axios.post('/vue/sendtickethelp', {slug: payload.slug,helpChoice:payload.helpChoice,otherData:payload.otherData,summaryData:payload.summaryData})
              .then(resp => {


                      if(resp.data===true){


                                commit('setAppMsgs', {
                                    msg:"help-center.helpCenter.Message Sent Successfully",
                                    color: "success",
                                    icon: "check"
                                });

                        }

                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "check"
                        });
                    }
                })
        },
                  saveBookmarkReport({commit}, payload){
                    // commit('setUserData', null);
            commit('setClearAppMsgs');
              axios.post('/vue/savebookmarkreport', {slug: payload.slug, usertype: payload.usertype,
                userslug: payload.userslug,title: payload.title}).then(resp => {

                if (resp.data === true) {
                   axios.post('/vue/userdata', {slug: payload.slug, lang: payload.lang})
                        .then(function (response) {

                            commit('setUserData', response.data);
                            commit('setAppMsgs', {
                                msg:  "bookmark-component.bookmarkAsDialog.Saved Successfully",
                                color: "success",
                                icon: "check"
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }
                 else if (resp.data === false) {
                  commit('setAppMsgs', {
                                msg:  "bookmark-component.bookmarkAsDialog.Already Added",
                                color: "info",
                                icon: "info"
                            });

                }else {
                    commit('setAppMsgs', {
                        msg:"profile.faqs.problem",
                        color: "error",
                        icon: "error"
                    });
                }
            });
        },
          async AllReport({commit}, payload){
            commit('setAllReport', null);

            await axios.post('/vue/getallreportoptions', {lang: payload.lang})
                .then(function (response) {

                    commit('setAllReport', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
             sendTicketReport({commit}, payload){

            commit('setClearAppMsgs');
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
         let fd= new FormData();
             fd.append('slug', payload.slug);
            fd.append('reportersslug', payload.reportersslug);
            fd.append('reportertype', payload.reportertype);
            fd.append('summarydata', payload.summarydata);
            fd.append('reportchoice', payload.reportchoice);

                        Array.from(payload.reportimage).forEach((f) => {
    fd.append('image[]', f)
})


            axios.post('/vue/sendtickreport', fd,config).then(resp => {

                   if(resp.data === true){

                            commit('setAppMsgs', {
                                msg:"report-component.reportTicketDialog.Report Sent Successfully",
                                color: "success",
                                icon: "check"
                            });
                                              }

                      else if (resp.data === false) {
                  commit('setAppMsgs', {
                                msg:  "report-component.reportTicketDialog.You Already Reported This Account",
                                color: "error",
                                icon: "error"
                            });
              }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "check"
                        });
                    }
                })
        },
                        sendNewMessage({commit}, payload){

            commit('setClearAppMsgs');
              axios.post('/vue/sendnewmessage', {slug: payload.slug, subject: payload.subject,
                msg: payload.msg,sendslug: payload.sendslug,sendtype:payload.sendtype}).then(resp => {

                if (resp.data === true) {

                            commit('setAppMsgs', {
                                msg:  "inbox-component.newMsgDialog.Message Sent Successfully!",
                                color: "success",
                                icon: "check"
                            });
                }
                else {
                    commit('setAppMsgs', {
                        msg:"profile.faqs.problem",
                        color: "error",
                        icon: "error"
                    });
                }
            });
        },
             async AllSenders({commit},payload){
            commit('setAllSenders', null);


            await axios.post('/vue/getallsenders', {slug:payload.id,you:payload.you})
                .then(function (response) {


                    commit('setAllSenders', response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
            async GetMessageofSender({commit},payload){

                     commit('setMessageofSender',null);

   await axios.post('/vue/getmessageofsender', {slug:payload.slug,
    senderslug:payload.senderslug,you:payload.you})
                .then(function (response) {
                    commit('setMessageofSender', response.data);
                }).catch(function (error) {
                    console.log(error);
                });
        },

            deleteMessage({commit}, payload){
            commit('setClearAppMsgs');

            axios.post('/vue/deletemessage', {slug: payload.slug,messageid:payload.messageid}).then(resp => {

                    if(resp.data === true){

                         commit('setAppMsgs', {
                                    msg:"Message Deleted Successfully",
                                    color: "success",
                                    icon: "check"
                                });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },

            async AllRecommendsTypes({commit}, payload){

        commit('setAllRecommendsTypes',null);

            await axios.post('/vue/getallrecommendstypes', {slug: payload.id, lang: payload.lang})
                .then(function (response) {

                    commit('setAllRecommendsTypes', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
              sendNewReply({commit}, payload){
            commit('setClearAppMsgs');

            axios.post('/vue/sendreply', {slug: payload.slug,
                messageid:payload.messageid,
                replyto:payload.replyto,subject:payload.subject,
                replycontent:payload.replycontent}).then(resp => {

                    if(resp.data === true){

                         commit('setAppMsgs', {
                                    msg:"inbox-component.inbox.Reply Sent Successfully",
                                    color: "success",
                                    icon: "check"
                                });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },
        saveStatus({commit, dispatch}, payload){
            commit('setClearAppMsgs');
            axios.post('/vue/savepersonalstatus', {slug: payload.slug, status: payload.status}).then(resp => {

                if (resp.data === true) {
                         dispatch('userData', {id:payload.slug, lang: payload.lang});
                          commit('setAppMsgs', {
                                msg:"personalProfile.header-data.Status Saved Successfully",
                                color: "success",
                                icon: "check"
                            });

                }else {
                    commit('setAppMsgs', {
                        msg:"profile.faqs.problem",
                        color: "error",
                        icon: "check"
                    });
                }
            });
        },

          async AllCertifications({commit}, id){
             commit('setAllCertifications', null);

            await axios.post('/vue/getmembercertifications', {slug: id})
                .then(function (response) {

                    commit('setAllCertifications', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
            async AllMemberTransacation({commit}, payload){
             commit('setAllMemberTransacation', null);

            await axios.post('/vue/getmembertransactions', {slug: payload.slug, lang: payload.lang})
                .then(function (response) {

                    commit('setAllMemberTransacation', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
            AddCerticate({commit, dispatch}, payload){
            commit('setClearAppMsgs');
            axios.post('/vue/addnewcertifications', {slug: payload.slug, title: payload.title,field: payload.field,toyear: payload.toyear,fromyear: payload.fromyear,descraption: payload.descraption}).then(resp => {

                if (resp.data === true) {
                         dispatch('AllCertifications', payload.slug);
                          commit('setAppMsgs', {
                                msg:"personalProfile.profile-view.Certification Adding Successfully",
                                color: "success",
                                icon: "check"
                            });

                }else {
                    commit('setAppMsgs', {
                        msg:"Problem in Adding Certifications, Try again!",
                        color: "error",
                        icon: "check"
                    });
                }
            });
        },
                editCerticate({commit, dispatch}, payload){
            commit('setClearAppMsgs');
            axios.post('/vue/editcertifications', {slug: payload.slug,
             title: payload.title,field: payload.field,toyear: payload.toyear,
             fromyear: payload.fromyear,descraption: payload.descraption,
             certifcatid:payload.certifcatid}).then(resp => {

                if (resp.data === true) {
                         dispatch('AllCertifications', payload.slug);
                          commit('setAppMsgs', {
                                msg:"personalProfile.profile-view.Certification Editing Successfully",
                                color: "success",
                                icon: "check"
                            });

                }else {
                    commit('setAppMsgs', {
                        msg:"profile.faqs.problem",
                        color: "error",
                        icon: "check"
                    });
                }
            });
        },
   deleteCert({commit, dispatch}, payload){
            commit('setClearAppMsgs');

            axios.post('/vue/deletecertification', {slug: payload.slug,certid:payload.certid}).then(resp => {

                    if(resp.data === true){
                dispatch('AllCertifications', payload.slug);


                         commit('setAppMsgs', {
                                    msg:"personalProfile.profile-view.Certification Deleted Successfully",
                                    color: "success",
                                    icon: "check"
                                });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },
        saveMemberProfileEditData({commit}, payload){
            commit('setUserData', null);
            commit('setClearAppMsgs');
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            let fd= new FormData();
            fd.append('slug', payload.slug);
            fd.append('image', payload.image);
            fd.append('country', payload.country);
            fd.append('jobtitle', payload.jobtitle);
            fd.append('address', payload.address);
            fd.append('phone', payload.phone);
            fd.append('jobfield', payload.jobfield);
            // fd.append('memberemail', payload.memberemail);

            axios.post('/vue/savememberprofileeditdata', fd,config)
            .then(resp => {

                if(resp.data === true){
                    axios.post('/vue/userdata', {slug: payload.slug, lang: payload.lang})
                        .then(function (response) {

                            commit('setUserData', response.data);

                            commit('setAppMsgs', {
                                msg:"Changes Saved Successfully",
                                color: "success",
                                icon: "check"
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });



                }
                else{

                    commit('setAppMsgs', {
                        msg:"profile.faqs.problem",
                        color: "error",
                        icon: "error"
                    });
                }
            })
        },
         ChangePassword({commit}, payload){
            commit('setClearAppMsgs');

            axios.post('/vue/changepassword', {slug: payload.slug,oldpassword:payload.oldpassword,newpassword:payload.newpassword,confirmpassword:payload.confirmpassword}).then(resp => {

                    if(resp.data === true){


                         commit('setAppMsgs', {
                                    msg:"personalProfile.profile-view.Password Updated Successfully",
                                    color: "success",
                                    icon: "check"
                                });


                    }
                      else if(resp.data === false){
                          commit('setAppMsgs', {
                                    msg:"personalProfile.profile-view.Old Password dont match",
                                    color: "error",
                                    icon: "error"           });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },

              async AllFeaturedProductService({commit}, id){
             commit('setAllFeaturedProductService', null);

            await axios.post('/vue/getallfaturedproductservice', {slug: id})
                .then(function (response) {

                    commit('setAllFeaturedProductService', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


          saveFeaturedProServ({commit,dispatch}, payload){
            commit('setClearAppMsgs');


            axios.post('/vue/savefeaturedproserv', {slug: payload.slug,features:payload.inputs}).then(resp => {

                    if(resp.data === true){



            dispatch('AllFeaturedProductService', payload.slug);


                                commit('setAppMsgs', {
                                    msg:"profile.contactColumn.Feature Saved Successfully",
                                    color: "success",
                                    icon: "check"
                                });



                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "check"
                        });
                    }
                })
        },

               async AllProServCertifications({commit}, id){
             commit('setAllProServCertifications', null);

            await axios.post('/vue/getallproservcertifications', {slug: id})
                .then(function (response) {

                    commit('setAllProServCertifications', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
            saveProductCert({commit, dispatch}, payload){
            commit('setClearAppMsgs');
            axios.post('/vue/addnewproductservicecert', {slug: payload.slug,
             title: payload.title,toyear: payload.toyear,fromyear: payload.fromyear,descraption: payload.descraption}).then(resp => {

                if (resp.data === true) {
                         dispatch('AllProServCertifications', payload.slug);
                          commit('setAppMsgs', {
                                msg:"individualProfile.education.Education Added Successfully",
                                color: "success",
                                icon: "check"
                            });

                }else {
                    commit('setAppMsgs', {
                        msg:"profile.faqs.problem",
                        color: "error",
                        icon: "error"
                    });
                }
            });
        },
            editProductCert({commit, dispatch}, payload){
            commit('setClearAppMsgs');
            axios.post('/vue/editnewproductservicecert', {slug: payload.slug,id:payload.id,
             title: payload.title,toyear: payload.toyear,fromyear: payload.fromyear,descraption: payload.descraption}).then(resp => {

                if (resp.data === true) {
                         dispatch('AllProServCertifications', payload.slug);
                          commit('setAppMsgs', {
                              msg:"individualProfile.education.Education Added Successfully",
                                color: "success",
                                icon: "check"
                            });

                }else {
                    commit('setAppMsgs', {
                        msg:"profile.faqs.problem",
                        color: "error",
                        icon: "check"
                    });
                }
            });
        },
         deleteProductCert({commit, dispatch}, payload){
            commit('setClearAppMsgs');

            axios.post('/vue/deleteproductcertification', {slug: payload.slug,certid:payload.certid}).then(resp => {

                    if(resp.data === true){
                dispatch('AllProServCertifications', payload.slug);


                         commit('setAppMsgs', {
                                    msg:"individualProfile.education.Deleted Successfully",
                                    color: "success",
                                    icon: "check"
                                });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },
                 async AllServiceSkills({commit}, id){
             commit('setAllServiceSkills', null);

            await axios.post('/vue/getallserviceskills', {slug: id})
                .then(function (response) {

                    commit('setAllServiceSkills', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
          saveSkill({commit,dispatch}, payload){
            commit('setClearAppMsgs');


            axios.post('/vue/saveserviceskills', {slug: payload.slug,skills:payload.skills}).then(resp => {

                    if(resp.data === true){

            dispatch('AllServiceSkills', payload.slug);

                          commit('setAppMsgs', {
                                    msg:"individualProfile.leftColumn.Skills Saved Successfully",
                                    color: "success",
                                    icon: "check"
                                });

                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "check"
                        });
                    }
                })
        },

          async AllEmploymentHistory({commit}, id){
             commit('setAllEmploymentHistory', null);

            await axios.post('/vue/getmemberemploymenthistory', {slug: id})
                .then(function (response) {

                    commit('setAllEmploymentHistory', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        AddNewEmp({commit, dispatch}, payload){
            commit('setClearAppMsgs');
            axios.post('/vue/addnewempolymenthistory', {slug: payload.slug,
             position: payload.position,company: payload.company,toyear: payload.toyear
             ,fromyear: payload.fromyear}).then(resp => {

                if (resp.data === true) {
                         dispatch('AllEmploymentHistory', payload.slug);
                          commit('setAppMsgs', {
                                msg:"personalProfile.profile-view.Job Title Adding Successfully",
                                color: "success",
                                icon: "check"
                            });

                }else {
                    commit('setAppMsgs', {
                        msg:"profile.faqs.problem",
                        color: "error",
                        icon: "check"
                    });
                }
            });
        },
        editEmp({commit, dispatch}, payload){
            commit('setClearAppMsgs');
            axios.post('/vue/editempolymenthistory', {slug: payload.slug,
             position: payload.position,company: payload.company,toyear: payload.toyear
             ,fromyear: payload.fromyear,empid:payload.empid}).then(resp => {

                if (resp.data === true) {
                         dispatch('AllEmploymentHistory', payload.slug);
                          commit('setAppMsgs', {
                                msg:"Job Title Edited Successfully",
                                color: "success",
                                icon: "check"
                            });

                }else {
                    commit('setAppMsgs', {
                        msg:"profile.faqs.problem",
                        color: "error",
                        icon: "check"
                    });
                }
            });
        },
        deleteEmp({commit, dispatch}, payload){
            commit('setClearAppMsgs');

            axios.post('/vue/deleteemploumenthistory', {slug: payload.slug,empid:payload.empid}).then(resp => {

                    if(resp.data === true){

                         dispatch('AllEmploymentHistory', payload.slug);


                         commit('setAppMsgs', {
                                    msg:"Jobtitle Deleted Successfully",
                                    color: "success",
                                    icon: "check"
                                });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },
             async AllMemberInterest({commit}, payload){
             commit('setAllMemberInterest', null);

            await axios.post('/vue/getallmemberinterest', {lang: payload.lang})
                .then(function (response) {

                    commit('setAllMemberInterest', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
            async AllMemberHobbies({commit}, payload){
             commit('setAllMemberHobbies', null);

            await axios.post('/vue/getallmemberhobbies', {lang: payload.lang})
                .then(function (response) {

                    commit('setAllMemberHobbies', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

    async  MemberOwnInterest({commit}, payload){
             commit('setAllMemberOwnInterest', null);

            await axios.post('/vue/getusermemberinterest',{slug: payload.id, lang: payload.lang})
                .then(function (response) {

                    commit('setAllMemberOwnInterest', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
            async  MemberOwnHobbies({commit}, payload){
             commit('setAllMemberOwnHobbies', null);

            await axios.post('/vue/getusermemberhobbies',{slug: payload.id, lang: payload.lang})
                .then(function (response) {

                    commit('setAllMemberOwnHobbies', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

         async LatestJoiners({commit}, id){
             commit('setLatestJoiners', null);

            await axios.get('/vue/getlatestjoiners')
                .then(function (response) {

                    commit('setLatestJoiners', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
          SaveInterst({commit, dispatch}, payload){
            commit('setClearAppMsgs');

            axios.post('/vue/addnewinterest', {slug: payload.id,interest:payload.interest}).then(resp => {

                    if(resp.data === true){

                         dispatch('MemberOwnInterest', {id: payload.id, lang: payload.lang});


                         commit('setAppMsgs', {
                                    msg:"personalProfile.profile-view.Interests Added Successfully",
                                    color: "success",
                                    icon: "check"
                                });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },

         SaveHobbies({commit, dispatch}, payload){
            commit('setClearAppMsgs');

            axios.post('/vue/addnewhobbies', {slug: payload.id,hobbies:payload.hobbies}).then(resp => {

                    if(resp.data === true){

                         dispatch('MemberOwnHobbies', {id: payload.id, lang: payload.lang});


                         commit('setAppMsgs', {
                                    msg:"personalProfile.profile-view.Hobbies Added Successfully",
                                    color: "success",
                                    icon: "check"
                                });


                    }
                    else{

                        commit('setAppMsgs', {
                            msg:"profile.faqs.problem",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },


    },
    getters: {
        getErrorLoadingData: state =>{
            return state.errorLoadingData;
        },
        getLoadingSpinner: state =>{
            return state.loadingSpinner;
        },
        getAuthFlagForEdit: state =>{
            return state.authFlagForEdit
        },
        getdbResposne: state =>{
            return state.dbResposne;
        },
        getAuthFlag: state => {
            return state.authFlag;
        },
        getterAuth: state => {
            return state.posts
        },
        getUserData: state =>{
            return state.userData;
        },
        getAppMsgs: state => {
            return {
                "appSnackbarMsgs": state.appSnackbarMsgs,
                "appSnackbarColor": state.appSnackbarColor,
                "appSnackbarIcon":state.appSnackbarIcon
            }
        },
        getImageSlider: state => {
            return state.imageSlider;
        },

        getFaqs: state => {
            return state.faqs;
        },
         getSelectedFaqs: state => {
            return state.selectedFaqs;
        },
         getComboboxFaqs: state => {
            return state.comoboboxFaqs;
        },

        getProfileType: state =>{
            return state.profileType;
        },

        getOtherFaqs: state => {
            return state.otherFaqs;
        },
        getAllreviwes: state => {
            return state.allreviews;
        },
        getAllProfileType: state => {
            return state.allprofiles;
        },
         getAllProducts: state => {
            return state.allproducts;
        },
         getTestmonailsTotal: state => {


       return state.testmonailsTotal ;

        },
      getAllservice: state => {


       return state.allservice;

        },
          getSelectedBusinesSservive: state => {


       return state.allselectedservice;

        },
          getAllFeaturedProducts: state => {


       return state.allfeaturedproducts;

        },

          getComoboboxService: state => {


       return state.comoboboxservice;

        },
          getOtherService: state => {


       return state.otherservice;

        },
           getAllKeywords: state => {


       return state.allkeywords;

        },

        getSelectedKeywords: state => {


       return state.selectedkeywords;

        },
          getMemberstuff: state => {


       return state.memberstuff;

        },

       getCheckEmailMemberResponse:state => {


      return state.checkemailmemberresponse;

        },
        getAllBookmark:state => {


            return state.allbookmark;

        },
        getAllTransaction:state => {


            return state.alltransaction;

        },
        getAllCountry:state => {


            return state.allcountry;

        },
        getAllBusinessCategory:state => {


            return state.allbusinesscategory;

        },
       getAllHelp:state => {


            return state.allhelp;

        },
         getAllReport:state => {


            return state.allreprot;

        },
         getAllSenders:state => {


            return state.allsenders;

        },

          getMessageofSender:state => {


            return state.allmessagesofsenders;

        },
           getAllRecommendsTypes:state => {


            return state.allrecommendstypes;

        },
        getAllCertifications:state => {


            return state.allcertifications;

        },
        getAllMemberTransacation:state => {


            return state.allmembertransacation;

        },
      getAllJobTitle:state => {


            return state.alljobtitle;

        },
          getAllFeaturedProductService:state => {


            return state.allfeaturedproductservice;

        },

          getAllProServCertifications:state => {


       return state.allproservcertifications;

        },
         getAllServiceSkills:state => {


       return state.allserviceskills;

        },
        getAllEmploymentHistory:state => {


       return state.allempolymenthistory;

        },
         getAllMemberInterest:state => {


       return state.allmemberinterest;

        },
          getAllMemberHobbies:state => {


       return state.allmemberhobbies;

        },
        getAllMemberOwnInterest:state => {


       return state.allmemberowninterest;

        },
          getAllMemberOwnHobbies:state => {


       return state.allmemberownhobbies;

        },
         getLatestJoiners:state => {


 return state.latestjoiners;

        },
        getRepliesMessage:state => {
            return  state.repliesmessage ;
        },
        getallJobField: state =>{
            return state.allJobField;
        },
        getSaveReviewFlag: state =>{
            return state.saveReviewFlag;
        }






    }
}
