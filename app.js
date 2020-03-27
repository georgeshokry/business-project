require('./bootstrap');

window.Vue = require('vue');
import App from "./App.vue"
import Vuex from 'vuex';
import store from "./store/store";
import router from './routes'
import Vuetify from 'vuetify'
import VueSocialauth from 'vue-social-auth'

import ar from 'vuetify/es5/locale/ar';
import en from 'vuetify/es5/locale/en';
import fr from 'vuetify/es5/locale/fr';
import tr from 'vuetify/es5/locale/tr';

import 'vuetify/dist/vuetify.min.css';

import { i18n } from './plugins/i18n.js'

Vue.use(require('vue-moment'));


import VueScrollTo from 'vue-scrollto';
import * as VueGoogleMaps from 'vue2-google-maps'
import Geocoder from "@pderas/vue2-geocoder";

import BootstrapVue from 'bootstrap-vue'
Vue.config.performance = true;
Vue.config.devtools = true;

Vue.use(BootstrapVue);

const token = localStorage.getItem('token');
Vue.use(require('vue-pusher'), {
    api_key: '2619af75dd4bb9452bbf',
    options: {
        encrypted: true,
        cluster: 'mt1',
        forceTLS: true,

        authEndpoint: '/broadcasting/auth',


        logToConsole: true,

        auth: {
            headers: {
                'X-CSRF-Token': token
            }
        }
    }
});
Vue.use(Geocoder, {
    defaultCountryCode: null, // e.g. 'CA'
    defaultLanguage:    'en', // e.g. 'en'
    defaultMode:        'address', // or 'lat-lng'
    googleMapsApiKey:   'XXX'
});

Vue.use(VueGoogleMaps, {
    load: {
        key: 'XXX',
        libraries: 'places', // This is required if you use the Autocomplete plugin
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
        // (as you require)

        //// If you want to set the version, you can do so:
        // v: '3.26',
    },

    //// If you intend to programmatically custom event listener code
    //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    //// you might need to turn this on.
    // autobindAllEvents: false,

    //// If you want to manually install components, e.g.
    //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    //// Vue.component('GmapMarker', GmapMarker)
    //// then disable the following:
    // installComponents: true,
});
Vue.use(VueScrollTo);




const vuetify = new Vuetify({
    lang: {
        locales: { ar, en, fr, tr },
    },
    theme: {
        themes: {
            light: {
                primary: '#E60000',

            },
        },
    },

});
Vue.use(Vuetify);
Vue.use(Vuex);

Vue.use(VueSocialauth, {

    providers: {
        facebook: {
            clientId: 'XXX',
            redirectUri:'https://ver4.mybusinessme.com/callback/facebook' // Your client app URL
        },
        google: {
            clientId: 'XXX',
            redirectUri:'https://ver4.mybusinessme.com/callback/google' // Your client app URL
        }
    }
});




new Vue({
    el: '#app',
    vuetify,
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
