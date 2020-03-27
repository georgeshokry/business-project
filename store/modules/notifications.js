import axios from 'axios';

export default{
    state: {
        notification:null,
        databaseNotifications: null,
        msgNotifications: null,
        readNotificationFlag: null,
    },
    mutations: {
        setNotification(state, payload){
            state.notification = payload;
        },
        setDatabaseNotifications(state, payload){
            state.databaseNotifications = payload;
        },
        setMsgNotifications(state, payload){
            state.msgNotifications = payload;
        },
        setReadNotificationFlag(state, payload){
            state.readNotificationFlag = payload;
        }
    },
    actions: {
        allDbNotifications({commit}, payload){
            commit('setClearAppMsgs');
            axios.post('/vue/ListOwnNotifications', {lang_id: payload.lang_id,page:payload.page}).then(resp => {
                console.log(resp, "nofications");
                commit('setDatabaseNotifications', resp)
            });
        },
        ReadNotification({commit}, payload){
            commit('setReadNotificationFlag', null);
            axios.post('/vue/ReadNotification', {
                NotificationId: payload.NotificationId,
            }).then(resp => {
                commit('setReadNotificationFlag', {flag:resp.data.status, NotificationId: payload.NotificationId});
            });
        }
    },
    getters: {
        getNotification:state => {
            return state.notification;
        },
        getDatabaseNotifications: state=>{
            return state.databaseNotifications;
        },
        getMsgNotifications: state=>{
            return state.msgNotifications;
        },
        getReadNotificationFlag: state=>{
            return state.readNotificationFlag
        }
    }
}
