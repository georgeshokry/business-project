import axios from 'axios';

export default{
    state: {
        sectionChoosen: null,

    },
    mutations: {
        setSectionChoosen(state, payload){
            state.sectionChoosen = payload;
        }

    },
    actions: {
        SendHelpMessage({commit}, payload){
            commit('setClearAppMsgs');
            axios.post('/vue/sendhelpmessage',
                {name: payload.name, email: payload.email,subject: payload.subject,
                    message:payload.message}).then(resp => {

                if (resp.data === true) {
                    commit('setAppMsgs', {
                        msg:"'help-center.helpCenter.Message Sent Successfully'",
                        color: "success",
                        icon: "check"
                    });
                }else {
                    commit('setAppMsgs', {
                        msg:"Problem in sending message, Try again!",
                        color: "error",
                        icon: "check"
                    });
                }
            });
        },


    },
    getters: {

        getSectionChoosen:state => {
            return state.sectionChoosen;
        }


    }
}
