import Vue from 'vue'
import Vuex from 'vuex'
import profiles from "./modules/profiles";
import businessDirectory from "./modules/businessDirectory";
import auth from "./modules/auth";
import content from "./modules/content";
import helpCenter from "./modules/helpCenter"
import registration  from "./modules/registration";
import notifications from "./modules/notifications";
import payment from "./modules/payment";

Vue.use(Vuex);


export default new Vuex.Store({
    strict: false,
    modules: {
        profiles,
        businessDirectory,
        helpCenter,
        auth,
        registration,
        notifications,
        content,
        payment
    }
});
