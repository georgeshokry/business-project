<template>
    <v-container>
        <v-card elevation="6" style="    border-radius: 15px 15px 0px 0px;">
        <v-img
                style="    border-radius: 15px 15px 0px 0px;"
                alt="singapore-river"
                width="100%"
                height="150px"
                src="/images/singapore-river-255116_1920.jpg"
        >

            <v-scroll-y-transition>
            <v-card-title class="header-bd">
               {{$t('businessDirectoryView.My Business Book Directory')}}
            </v-card-title>
            </v-scroll-y-transition>
        </v-img>
        </v-card>
        <v-card flat min-height="100vh" style="background-color: #ffffff;">
            <v-card flat>


                <search-bar-b-d></search-bar-b-d>
            </v-card>

            <v-divider dark></v-divider>
            <v-fab-transition>
            <v-btn
                    v-scroll="onScroll"
                    v-show="fab"
                    outlined
                    fab
                    dark
                    fixed
                    bottom
                    right
                    x-small
                    color="#e60000"
                    @click="toTop"
            >
                <v-icon size="25">keyboard_arrow_up</v-icon>
            </v-btn>
            </v-fab-transition>
            <search-result></search-result>
            <v-divider dark class="ma-0"></v-divider>
<!--            <branding-section></branding-section>-->
        </v-card>

    </v-container>
</template>

<script>

    import SearchBarBD from "./Business-Directory/searchBar";
    import SearchResult from "./Business-Directory/searchResult";
    import BrandingSection from "./Business-Directory/brandingSection";
    export default {
        name: "businessDirectory",
        components: {BrandingSection, SearchResult, SearchBarBD},
        data:()=>{
            return{
                fab: false
            }
        },

        methods: {
            onScroll (e) {
                if (typeof window === 'undefined') return;
                const top = window.pageYOffset ||   e.target.scrollTop || 20
                this.fab = top > 300
            },
            toTop () {
                this.$vuetify.goTo(0)
            }
        }
    }
</script>

<style scoped>

    >>>.header-bd{
        color: #ffffff;
        height: 100%;
        justify-content: center;
        font-size: 25px;
        font-weight: bolder;

        word-break: normal;
        text-align: center;
        background: linear-gradient(to bottom, rgba(108, 0, 0, 0.5) 100%,rgb(220, 66, 37) 100%);
    }
    >>>.v-responsive__sizer~.v-responsive__content {
         margin-left: 0;
    }
    >>>.v-btn--fixed.v-btn--bottom {
        bottom: 60px !important;
    }
</style>