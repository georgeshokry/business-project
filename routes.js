import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import Vuex from 'vuex';
import Store from './store/store.js';
import { i18n } from './plugins/i18n.js'



Vue.prototype.$http = axios;
const token = localStorage.getItem('token');
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}


Vue.use(VueRouter);
Vue.use(Vuex);
const router = new VueRouter({
   mode: 'history',
   routes:[
       {
           path: '/:lang(en|ar|fr|tr)?/pricing',
           name: 'pricing',
           component: ()=> import('./components/PricingAndPayment/pricing'),
           meta:{
               auth: false,
           }
       },
       {
           path: '/:lang(en|ar|fr|tr)?/profile/:id',
           name: 'companyProfile',
           component: ()=> import('./components/companyProfile'),
           beforeEnter: checkUserTypeCompany,
           meta:{
               auth: false,
           }
       },

       {
           path: '/:lang(en|ar|fr|tr)?/profile/:id',
           name: 'individualProfile',
           component: ()=> import("./components/IndividualProfile"),
           beforeEnter: checkUserTypeIndividual,
           meta:{
               auth: false,
           }
       },
       {
           path: '/:lang/profile/:id',
           name: 'personalProfile',
           component: ()=> import("./components/personalProfile"),
           beforeEnter: checkUserTypePersonal,
           meta:{
               auth: false,
           }
       },
       {
           path: '/:lang(en|ar|fr|tr)?/settings/:id',
           name: 'settings',
           component: ()=> import("./components/profile/settingsDashboard"),
           meta:{
               auth: true,
           }
       },
       {
           path: '/:lang(en|ar|fr|tr)?/inbox/:id',
           name: 'inbox',
           component: ()=>import("./components/inbox/inbox"),
           meta:{
               auth: true,
           }
       },
       {
           path: '/:lang(en|ar|fr|tr)?/payment',
           name: 'payment',
           component: ()=>import("./components/PricingAndPayment/payment"),
           meta:{
               auth: true,
           }
       },
       {
           path: '/:lang(en|ar|fr|tr)?/business-directory',
           name: 'businessDirectory',
           component: ()=> import("./components/businessDirectory"),
           meta:{
               auth: false,
           }
       },
       {
           path: '/:lang(en|ar|fr|tr)?/help-center',
           name: 'helpCenter',
           component: ()=> import("./components/help-center/help-center"),
           meta:{
               auth: false,
           }
       },
       {
           path: '/:lang(en|ar|fr|tr)?/terms-privacy',
           name: 'termsAndPrivacy',
           component: ()=> import("./components/terms-and-privacy/termsAndPrivacy"),
           meta:{
               auth: false,
           }
       },
       {
           path: '/:lang(en|ar|fr|tr)?/login',
           name: 'authPage',
           component: ()=> import("./components/registeration/authPage"),
           beforeEnter: checkUserAuth,
           meta:{
               auth: false,
           }
       },
       {
           path: '/:lang(en|ar|fr|tr)?/confirm',
           name: 'confrimEmail',
           component: ()=> import("./components/registeration/stepping-msgs/confirmEmail"),
           meta:{
               auth: false,
           }
       },
       {
           path: '/:lang(en|ar|fr|tr)?/forget-password',
           name: 'forgetPassword',
           component: ()=> import("./components/registeration/forgetPassword"),
           meta:{
               auth: false,
           }
       },
       {
           path: '/:lang(en|ar|fr|tr)?/reset-password/:resetpasswordtoken',
           name: 'resetPassword',
           component: ()=>import("./components/registeration/resetPassword"),
           meta:{
               auth: false,
           }
       },

       {
           path: '/:lang(en|ar|fr|tr)?/',
           name: 'home',
           component: ()=>import("./components/homePage"),
           meta:{
               auth: false,
           }
       },
       {
           path: '/:lang/profile/not-found',
           name: 'notFound',
           component: ()=>import("./components/not-found/notFound"),
           meta:{
               auth: false,
           }
       },

       {
           path: '/:lang/registration',
           component: ()=>import('./components/registration'),
           meta:{
               auth: true,
           },
           children:[
               {
                   path: 'standard-profile',
                   name: 'personalProfileRegisteration',
                   component: ()=>import("./components/registeration/personalProfileRegisteration"),
                   meta:{
                       auth: true,
                   }
               },
               {
                   path: 'choose-type',
                   name: 'chooseBusinessType',
                   component: ()=>import('./components/registeration/stepping-msgs/chooseBusinessType'),
                   beforeEnter: checkCompletePersonal,
                   meta:{
                       auth: true,
                   }
               },
               {
                   path: 'professional-reg',
                   name: 'professionalRegistration',
                   component: ()=>import('./components/registeration/professionalRegistration'),
                   beforeEnter: checkCompletePersonal,
                   meta:{
                       auth: true,
                   }
               },
               {
                   path: 'enterprise-reg',
                   name: 'enterpriseRegistration',
                   component: ()=>import('./components/registeration/enterpriseRegistration'),
                   beforeEnter: checkCompletePersonal,
                   meta:{
                       auth: true,
                   }
               },

           ],

       },


   ]
});
router.beforeEach((to, from, next) => {
    const slug = localStorage.getItem('s');
    const lang = !localStorage.getItem('localLang') ? 'en' : localStorage.getItem('localLang');
    Store.commit('setLoading', true);
    Store.commit('setErrorLoadingData', null);
    i18n.locale = lang;
    if(to.meta.auth === true) {

        if(slug === ''){
            next({
                name: 'authPage',
                params: {
                    lang: lang,
                },
                query: {type: 'login'}
            });
        }else if(slug !== ''){
            axios.post('/vue/isUserAuth', {slug: to.params.id ? to.params.id : slug})
                .then(function (response) {

                    if (response.data === true) {
                        next(
                            {
                                params: {
                                    lang: lang,
                                }
                            }
                        );
                    } else if (response.data === 'not_auth' || response.data === 'not_found') {
                        next({
                            name: 'authPage',
                            params: {
                                lang: lang,
                            },
                            query: {type: 'login'}
                        });
                    }
                     else if (response.data === false) {
                        next({
                            name: 'notFound',
                            params: {
                                lang: lang,
                            }
                        })
                    }
                })
                .catch(function (error) {

                });
        }
    }else {
        next(
            {
                params: {
                    lang: lang,
                }
            }
        );
    }
});
function checkUserAuth(from, to, next) {
    const slug = localStorage.getItem('s');
    const lang = !localStorage.getItem('localLang') ? 'en' : localStorage.getItem('localLang');
    axios.post('/vue/isUserAuth', {slug: slug})
        .then(function (response) {
            if (response.data === true) {
                next({
                    name: 'individualProfile',
                    params: {
                        lang: lang,
                    }
                })
            } else if (response.data === 'not_auth' || response.data === 'not_found') {
                next(true);
            } else if (response.data === false) {
                next(true);
            }
        })
        .catch(function (error) {

        });
}
function checkCompletePersonal(from, to, next) {
    const lang = !localStorage.getItem('localLang') ? 'en' : localStorage.getItem('localLang');
    axios.post('/vue/checkcompleteprofile', {slug: localStorage.getItem('s')}).then((response) => {

            if(response.data === true) {
                next(true)

            }else if(response.data === "not_verified"){
                next({
                    name: 'confrimEmail',
                    params: {
                        lang: lang,
                    }
                })
            }else {
                next({
                    name: 'personalProfileRegisteration',
                    params: {
                        lang: lang,
                    }
                })
            }

    });
}
function checkUserTypeCompany(to, from, next) {
    console.log("id now",to.params.id);
    const lang = !localStorage.getItem('localLang') ? 'en' : localStorage.getItem('localLang');
    axios.post('/vue/usertype', {slug: to.params.id}).then(function (response) {
        console.log("routing store",response.data);
        if (response.data === 'company') {
            next(true)
        } else if(response.data === 'individual'){
            next({
                name: 'individualProfile',
                params: {
                    id: to.params.id,
                    lang: lang,
                }
            })
        } else if(response.data === 'personal'){
            next({
                name: 'personalProfile',
                params: {
                    id: to.params.id,
                    lang: lang,
                }
            })
        }else if(response.data === 'slug-not-found'){
            next({
                name: 'notFound',
                params: {
                    id: to.params.id,
                    lang: lang,
                }
            })
        }
    });
}

function checkUserTypeIndividual(to, from, next){
    console.log("id now",to.params.id);
    const lang = !localStorage.getItem('localLang') ? 'en' : localStorage.getItem('localLang');
    axios.post('/vue/usertype', {slug: to.params.id}).then(function (response) {
        console.log("routing store",response.data);
        if (response.data === 'company') {
            next({
                name: 'companyProfile',
                params: {
                    id: to.params.id,
                    lang: lang,
                }
            })
        } else if(response.data === 'individual'){
            next(true)
        } else if(response.data === 'personal'){
            next({
                name: 'personalProfile',
                params: {
                    id: to.params.id,
                    lang: lang,
                }
            })
        }else if(response.data === 'slug-not-found'){
            next({
                name: 'notFound',
                params: {
                    id: to.params.id,
                    lang: lang,
                }
            })
        }
    });
}

function checkUserTypePersonal(to, from, next){
    console.log("id now",to.params.id);
    const lang = !localStorage.getItem('localLang') ? 'en' : localStorage.getItem('localLang');

    const type = axios.post('/vue/usertype', {slug: to.params.id});
    const complete = axios.post('/vue/checkcompleteprofile', {slug: to.params.id});
    axios.all([type, complete]).then(axios.spread((...response) => {
        console.log(response,"ALLLLL")


        if (response[0].data === 'company') {
            next({
                name: 'companyProfile',
                params: {
                    id: to.params.id,
                    lang: lang,
                }
            })
        } else if(response[0].data === 'individual'){
            next({
                name: 'individualProfile',
                params: {
                    id: to.params.id,
                    lang: lang,
                }
            })
        } else if(response[0].data === 'personal'){
            if(response[1].data === true) {
                next(true)

            }else if(response[1].data === "not_verified"){
                next({
                    name: 'confrimEmail',
                    params: {
                        lang: lang,
                    }
                })
            }else {
                next({
                    name: 'personalProfileRegisteration',
                    params: {
                        lang: lang,
                    }
                })
            }
        }else if(response[0].data === 'slug-not-found'){
            next({
                name: 'notFound',
                params: {
                    id: to.params.id,
                    lang: lang,
                }
            })
        }
    }));
}

// router.beforeEach((to, from, next) => {
//     console.log("id now",to.params.id);
//     axios.post('/vue/userdata', {slug: to.params.id}).then(function (response) {
//         console.log("routing store",response.data);
//         if (response.data === 'company'){
//             next({
//                 name: 'companyProfile',
//                 params: {
//                     id: to.params.id,
//                     lang: to.params.lang
//                 }
//             });
//         }else if( response.data === 'individual'){
//             next({
//                 name: 'individualProfile',
//                 params: {
//                     id: to.params.id,
//                     lang: to.params.lang
//                 }
//             });
//         }else if( response.data === 'personal') {
//             next({
//                 name: 'personalProfile',
//                 params: {
//                     id: to.params.id,
//                     lang: to.params.lang,
//                 }
//             })
//         }
//     });
//
//
//
//
// });

// router.beforeEach((to, from, next) => {
//
//
//         if ( to.params.type === 'company'){
//              next({
//                 name: 'companyProfile',
//                  params: {type: to.params.type,id: to.params.id, lang: to.params.lang}
//             });
//         }else if( to.params.type === 'individual'){
//             next({
//                 name: 'individualProfile',
//                 params: {type: to.params.type, id: to.params.id, lang: to.params.lang}
//             });
//         }
//
//
// });
router.afterEach((to, from)=>{
    Store.commit('setLoading', false);
    console.log("STORE LOADING", Store.state.auth.loadingLinear)
});
export default router;
