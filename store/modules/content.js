import axios from 'axios';

export default{
    state: {
        termsandcondtion: null,
        privacypolicy: null,

    },
    mutations: {
        setTermsandcondtion(state, payload){
            state.termsandcondtion = payload;
        },
        setPrivacyPolicy(state, payload){
            state.privacypolicy = payload;
        }

    },
    actions: {
        getAllTermsandcondtion({commit}, payload){
            commit('setClearAppMsgs');
            commit('setTermsandcondtion', null);
            axios.post('/vue/gettermsandcondtion',
                {lang: payload.lang}).then(resp => {
                commit('setTermsandcondtion', resp.data);
            });
        },
        getAllPrivacyPolicy({commit}, payload){
            commit('setClearAppMsgs');
            commit('setPrivacyPolicy', null);
            axios.post('/vue/getprivacypolicy',
                {lang: payload.lang}).then(resp => {
                commit('setPrivacyPolicy', resp.data);
            });
        },


    },
    getters: {

        getTermsandcondtion:state => {
            return state.termsandcondtion;
        },
        getPrivacyPolicy:state => {
            return state.privacypolicy;
        }


    }
}
