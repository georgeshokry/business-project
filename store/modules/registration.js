
import axios from 'axios';
export default {
    state: {
        verifyCodeRequest:'',

        checkSendCodeFlag:null,

        allregkeywords:'',

        freeRegFlag: null,

        personalRegFlag: null,
        companysize:'',
        bussinesstype:'',
        disableMyProfileBtn: null,


    },
    mutations: {
        setVerifyCodeRequest(state, type){
            state.verifyCodeRequest = type;
        },

        setCheckSendCodeFlag(state, flag){
            state.checkSendCodeFlag = flag;
        },
        setAllRegkeywords(state, type){
            state.allregkeywords = type;
        },
        setFreeRegFlag(state, flag){
            state.freeRegFlag = flag;
        },
        setPersonalRegFlag(state, flag){
            state.personalRegFlag = flag;
        },
        setAllCompanySize(state, size){
            state.companysize = size;
        },
        setAllBusinessType(state, type){
            state.bussinesstype = type;
        },
        setDisableMyProfileBtn(state, flag){
            state.disableMyProfileBtn = flag;
        }

    },
    actions:{
        savePersonalProfileData({commit}, payload){
            commit('setUserData', null);
            commit('setClearAppMsgs');
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            let fd= new FormData();
            fd.append('date', payload.date);
            fd.append('logo', payload.logo);
            fd.append('country', payload.country);
            fd.append('jobtitle', payload.jobtitle);
            fd.append('jobfield', payload.jobfield);
            fd.append('address', payload.address);
            fd.append('phone', payload.phone);
            fd.append('gender', payload.gender);
            fd.append('lat', payload.lat);
            fd.append('lng', payload.lat);
            fd.append('lang', payload.lang);

            axios.post('/vue/registerpersonalperofile', fd,config).then(resp => {

                if(resp.data === true){
                    axios.post('/vue/userdata', {slug: payload.slug, lang: payload.lang})
                        .then(function (response) {

                            commit('setUserData', response.data);

                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    commit('setPersonalRegFlag', true);

                }
                else{

                    commit('setPersonalRegFlag', false);
                }
            })
        },
        VerifyCode({commit, dispatch}, payload){
            commit('setClearAppMsgs');
            commit('setCheckSendCodeFlag', null);
            axios.post('/vue/sendverifycode', {phone: payload.phone}).then(response => {
                console.log(response, "VERFYCODE");
                if(response.data.success.success === true){
                    commit('setCheckSendCodeFlag', true);
                    commit('setVerifyCodeRequest',response.data.success.requestId);
                    commit('setAppMsgs', {
                        msg:"registration.professionalRegisteration.Code Sent Successfully!",
                        color: "success",
                        icon: "check"
                    });
                }
                else{
                }
            }).catch((error)=>{
                console.log(error, "error");
                commit('setAppMsgs', {
                    msg:"registration.professionalRegisteration.Problem in sending code, Try again!",
                    color: "error",
                    icon: "error"
                });
            })
        },
        reSendCode({commit, state}, payload){
            commit('setClearAppMsgs');
            commit('setCheckSendCodeFlag', null);
            axios.post('/vue/resendverifycode', {phone: payload.phone,requestId:state.verifyCodeRequest}).then(response => {
                if(response.data.success.success === true){
                    commit('setCheckSendCodeFlag', 'resent');
                    commit('setVerifyCodeRequest',response.data.success.requestId);
                    commit('setAppMsgs', {
                        msg:"registration.professionalRegisteration.Code Sent Successfully!",
                        color: "success",
                        icon: "check"
                    });
                }
            }).catch((error)=>{
                commit('setAppMsgs', {
                    msg:"registration.professionalRegisteration.Problem in sending code, Try again!",
                    color: "error",
                    icon: "error"
                });
            })
        },
        sendCode({commit, state}, payload){
            commit('setClearAppMsgs');

            axios.post('/vue/sendcode', {code: payload.code,requestId:state.verifyCodeRequest}).then(response => {

                if(response.data.success.success === true){
                    commit('setCheckSendCodeFlag', 'verify');



                    commit('setAppMsgs', {
                        msg:"registration.professionalRegisteration.Your Code verified Successfully",
                        color: "success",
                        icon: "check"
                    });


                }
            }).catch((error)=>{

                commit('setAppMsgs', {
                    msg:"registration.professionalRegisteration.Wrong Code, Try again!",
                    color: "error",
                    icon: "error"
                });
            })
        },
        async  AllRegkeywords({commit}, payload) {
            commit('setAllRegkeywords', null);


            await axios.post('/vue/getallkeywords', {lang: payload.lang})
                .then(function (response) {

                    commit('setAllRegkeywords', response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        freeRegister({commit,dispatch}, payload){
            commit('setClearAppMsgs');
            commit('setFreeRegFlag', null);
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            let fd= new FormData();
            fd.append('type', payload.type);
            fd.append('bussinessname', payload.bussinessname);
            fd.append('companysize', payload.companysize);
            fd.append('bussinesstype', payload.bussinesstype);
            fd.append('image', payload.image);
            fd.append('imagecheck', payload.imagecheck);
            fd.append('phone', payload.phone);
            fd.append('email', payload.email);
            fd.append('address', payload.address);
            fd.append('facebook', payload.facebook);
            fd.append('twitter', payload.twitter);
            fd.append('instagram', payload.instagram);
            fd.append('linkdin', payload.linkdin);
            fd.append('behance', payload.behance);
            fd.append('online', payload.online);
            fd.append('country', payload.country);
            fd.append('city', payload.city);
            fd.append('businesscategory', payload.businesscategory);
            fd.append('website', payload.website);
            fd.append('description', payload.description);
            fd.append('lat', payload.lat);
            fd.append('lng', payload.lng);
            fd.append('lang', payload.lang);

            Array.from(payload.keywords).forEach((f) => {
                fd.append('keyword[]', f)
            });
            axios.post('/vue/registrationpro', fd,config)
                .then(resp => {

                    if(resp.data === true){
                        dispatch('userProflies');


                        commit('setFreeRegFlag', true);
                        // commit('setAppMsgs', {
                        //     msg:"Changes Saved Successfully",
                        //     color: "success",
                        //     icon: "check"
                        // });

                    }
                    else{
                        commit('setFreeRegFlag', false);
                        commit('setAppMsgs', {
                            msg:"Problem in saving, Try again!",
                            color: "error",
                            icon: "check"
                        });
                    }
                })
        },
        async  AllCompanySize({commit}, payload) {
            commit('setAllCompanySize', null);


            await axios.post('/vue/getcompanysize', {lang: payload.lang})
                .then(function (response) {

                    commit('setAllCompanySize', response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async  AllBusinessType({commit}, payload) {
            commit('setAllBusinessType', null);


            await axios.post('/vue/getbussinesstype', {lang: payload.lang})
                .then(function (response) {

                    commit('setAllBusinessType', response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },


    },
    getters: {
        getVerifyCodeRequest:state => {
            return state.verifyCodeRequest;

        },
        getCheckSendCodeFlag:state =>{
            return state.checkSendCodeFlag;
        },
        getAllRegkeywords:state => {
            return state.allregkeywords;

        },
        getFreeRegFlag: state =>{
            return state.freeRegFlag;
        },
        getPersonalRegFlag: state =>{
            return state.personalRegFlag;
        },
        getAllCompanySize: state =>{
            return state.companysize;
        },
        getAllBusinessType: state =>{
            return state.bussinesstype;
        },
        getDisableMyProfileBtn: state=>{
            return state.disableMyProfileBtn;
        }

    }

}
