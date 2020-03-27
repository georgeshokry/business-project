import axios from 'axios';
const token = localStorage.getItem('token');
const config = {
    'Accept' : 'application/json',
    'Authorization' : `Bearer ` + token
}
export default{
    state: {
        authFlagLoginPage: null,
        userProfiles: null,
        logoutStatus: null,
        loadingSignOut: false,

        resetPasswordMsg: null,

        tokenResetMsg: null,

        signUpFlag: null,


        loadingLinear: false,
        resendEmailFlag: null,
    },
    mutations: {
        setLoading(state, payload){
          state.loadingLinear = payload;
        },
        setAuthFlag(state, payload){
            state.authFlagLoginPage = payload;
        },
        setLoadingSignOut(state, payload){
            state.loadingSignOut = payload;
        },
        setUserProfiles(state, payload){
            state.userProfiles = payload;
        },
        setLogoutStatus(state, payload){
            state.logoutStatus = payload;
            state.authFlagLoginPage= null;
            state.userProfiles= null;
        },
        setResetPasswordMsg(state, payload){
            state.resetPasswordMsg = payload;
        },
        setTokenResetMsg(state, payload){
            state.tokenResetMsg = payload;
        },
        setSignUpFlag(state, payload){
            state.signUpFlag = payload;
        },
        setResendEmailFlag(state, payload){
            state.resendEmailFlag = payload;
        }
    },
    actions: {
        loginUser({commit,dispatch}, payload) {
            axios.post('/vue/loginformodal', {remember:payload.rememberme, emaillogin: payload.email, passwordlogin: payload.password })

                .then(function (response) {
                    console.log(response, "alert porblem");

                    if(response.data.status === 'success'){
                        axios.defaults.headers.common['Authorization'] = token

                        localStorage.setItem('token', response.data.token);
                        //<<<<THIS LINE WILL ADD IN TOKEN REQUEST>>>>>
                        // commit('setUserProfiles', response.data.userdata);
                        dispatch('userProflies');
                        commit('setAuthFlag', {flag:response.data.flag , personal_slug: response.data.personal_slug});
                    }else {
                        commit('setAuthFlag', {flag:response.data.flag});
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
   userProflies({commit}) {
            axios.get('/vue/getprofileuser')
                .then(function (response) {
                    console.log(response);
                    commit('setUserProfiles', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        logOutUser({commit}){
            axios.get('/vue/logout' ,{
                    'Accept':'application/json',
                    'Authorization':'Bearer ' + window.localStorage.getItem('token'),
                    'cache-control':'no-cache'
                }).then(function (response) {

                    if(response.data === true){
                        localStorage.setItem('token', '');
                        localStorage.setItem('s', '');
                        localStorage.setItem('id', '');


                        commit('setLogoutStatus', true);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        ,
        SendResetEmailLink({commit}, payload){
            axios.post('/vue/auth/reset-password',{ email: payload.email})
                .then(function (response) {
                    console.log(response, "reset");
                    commit('setResetPasswordMsg', response.data.message);
                })
                .catch(function (error) {
                    console.log(error, "reset");
                });
        },
        ResetPassword({commit}, payload){
            commit('setResetPasswordMsg', null);
            axios.post('/vue/auth/reset',{
                email: payload.email,password:payload.password,token:payload.token})
                .then(function (response) {

                    if(response.data === true) {
                        commit('setResetPasswordMsg', true);
                    }
                })
                .catch(function (error) {
                    console.log(error.response.data.message, "RESSSSSS")
                    commit('setResetPasswordMsg', error.response.data.message);
                });
        },
        RegisterUser({commit, dispatch}, payload) {
            axios.post('/vue/auth/register', {
                email: payload.email,
                password: payload.password,
                firstName: payload.firstName, lastName: payload.lastName
            }).then(function (response) {
                    localStorage.setItem('token', response.data.success.token);
                    commit('setSignUpFlag', response.data.success.success);
                    localStorage.setItem('s', response.data.success.slug);
                dispatch('userProflies');
                }).catch(function (error) {
                    console.log(error,"regist");
                    commit('setSignUpFlag', error.response.data);
                });
        },
        checkToken({commit}, payload) {
            axios.post('/vue/auth/checkreset', {token: payload.token})
                .then(function (response) {
                    console.log(response, "MSGGGGG")
                    if(response.data === true){
                        commit('setTokenResetMsg', true);
                    }
                }).catch(function (error) {
                    commit('setTokenResetMsg', error.response.data.message);

            });
        },
        reSendConfirmEmail({commit}){
            commit('setResendEmailFlag', null)
            axios.post('/vue/auth/resendemail',{id: localStorage.getItem('id')})
                .then(function (res) {
                commit('setResendEmailFlag', res.data)
            })
        }
    },
    getters: {
        getAuthFlagLoginPage:state => {
            return state.authFlagLoginPage;
        },
        getUserProfiles: state =>{
            return state.userProfiles;
        },
        getLogoutStatus: state =>{
            return state.logoutStatus;
        },
        getLoadingSignOut: state =>{
            return state.loadingSignOut;
        },
        getResetPasswordMsg: state =>{
            return state.resetPasswordMsg;
        },
        getTokenResetMsg: state =>{
            return state.tokenResetMsg;
        },
        getSignUpFlag: state =>{
            return state.signUpFlag;
        },
        getResendEmailFlag: state =>{
            return state.resendEmailFlag;
        },
        getLoading: state =>{
            return state.loadingLinear;
        }
    }
}
