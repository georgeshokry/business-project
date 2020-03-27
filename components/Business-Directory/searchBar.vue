<template>


        <v-app-bar  height="fit-content"  style="position: sticky;  background-color: #f1f1f1;" >
            <v-layout row wrap>
            <v-layout row wrap style="    justify-content: center;">

        <v-flex lg2 xs4 style=" max-height: 60px;">
            <v-combobox
                    class="ma-1"
                    style="max-height: 47px;z-index: 20;"
                    v-model="countrySelected"
                    :items="country"
                    :label="$t('businessDirectoryView.Location')"
                    color="#e60000"
                    dense
                    filled
                    rounded
                    @change="searchButton()"
                    :menu-props="{maxHeight: 200}"
            >
            </v-combobox>
        </v-flex>

                <v-flex lg4 xs7 style=" max-height: 60px;">
                    <v-text-field
                            class="ma-1"
                            v-model.lazy="searchKeyword"
                            style="max-height: 47px;"
                            label=""
                            :placeholder="$t('businessDirectoryView.My Business Directory Search')"
                            color="#e60000"
                            dense
                            filled
                            rounded
                            @keyup.enter.native="searchButton()"
                            append-icon="search"
                            @click:append="searchButton()"
                    ></v-text-field>
                </v-flex>

<!--                <v-flex lg2 xs8 style="max-width: 45px;" >-->
<!--                    <v-btn-->
<!--                            class="ma-1"-->
<!--                            style="margin: 5px;"-->
<!--                            elevation="0"-->
<!--                            fab-->
<!--                            small-->
<!--                            icon-->
<!--                            color="#e60000"-->
<!--                            @click="searchButton()"-->
<!--                    >-->
<!--                        <v-icon color="#e60000">search</v-icon>-->
<!--                    </v-btn>-->
<!--                </v-flex>-->



            <v-flex lg3 xs5 style=" max-height: 60px;">
            <v-combobox
                    style="max-height: 47px;z-index: 20;"
                    class="ma-1"
                    v-model="sectorSelected"
                    :items="sectors"
                    :label="$t('businessDirectoryView.Business Sector')"
                    filled
                    rounded
                    color="#e60000"

                    dense
                    @change="searchButton()"
                    :menu-props="{maxHeight: 200}"
            >
            </v-combobox>
            </v-flex>


<!--            <v-flex lg5 xs10 style=" max-height: 60px;">-->
<!--            <v-combobox-->
<!--                    style="max-height: 47px;z-index: 20;"-->
<!--                    class="ma-1"-->
<!--                    v-model="subSectorSelected"-->
<!--                    :items="allSubSectors"-->
<!--                    label="Sub-Sector"-->
<!--                    filled-->
<!--                    rounded-->
<!--                    color="#e60000"-->
<!--                    hide-selected-->
<!--                    dense-->
<!--                    cache-items-->

<!--                    :disabled="disabled"-->
<!--            >-->
<!--            </v-combobox>-->
<!--            </v-flex>-->

                <v-flex lg2 xs5 style="max-height: 75px;">
                <v-combobox
                        style="max-height: 47px;z-index: 20;"
                        class="ma-1"
                         v-model="typeSelected"
                          :items="typeFliter"

                        :label="$t('businessDirectoryView.Filter By')"
                        filled
                        rounded
                        color="#e60000"

                        dense
                        cache-items
                        @change="searchButton()"
                        :menu-props="{maxHeight: 200}"

                >
                </v-combobox>
            </v-flex>




            </v-layout>
            </v-layout>
        </v-app-bar>



</template>

<script>
    import { i18n } from '../../plugins/i18n.js'
    export default {
        name: "searchBarBD",
        data: () => {
            return {
                sectorSelected: i18n.t('Business-Directory.searchBar.All'),
                subSectorSelected:'',
                sectors:[i18n.t('Business-Directory.searchBar.All')],
                allSubSectors: [i18n.t('Business-Directory.searchBar.All')],
                hideSelected: true,
                selectedFilter: '',
                searchKeyword:'',
                country:[],
                countrySelected: i18n.t('Business-Directory.searchBar.All'),
                disabled:true,
                typeFliter:[],
                typeSelected: i18n.t('Business-Directory.searchBar.All'),
                filterparamters:'',

                countryWithIds:[],
                sectorsWithIds:[],
                typeFilterWithIds:[],



            }
        },
        created(){

        },
          mounted() {
              this.$store.dispatch('AllCountry', {lang: this.$i18n.locale});
              this.$store.dispatch('AllBusinessCategory', {lang: this.$i18n.locale});
              this.typeFliter.push(this.$i18n.t('Business-Directory.searchBar.All'),this.$i18n.t('Business-Directory.searchBar.Enterprise'),this.$i18n.t('Business-Directory.searchBar.Professional'),this.$i18n.t('Business-Directory.searchBar.Product'),this.$i18n.t('Business-Directory.searchBar.Service'))
              this.typeFilterWithIds.push(
                  {name: this.$i18n.t('Business-Directory.searchBar.All'), id: 0},
                  {name: this.$i18n.t('Business-Directory.searchBar.Enterprise'), id: 1},
                  {name: this.$i18n.t('Business-Directory.searchBar.Professional'), id:2},
                  {name: this.$i18n.t('Business-Directory.searchBar.Product'), id:3},
                  {name: this.$i18n.t('Business-Directory.searchBar.Service'), id:4}
              );





        },
         computed: {
            getAllCountry() {
                return this.$store.getters.getAllCountry;
            },
            getAllBusinessCategory() {
                return this.$store.getters.getAllBusinessCategory;
            },
             getLocalLang(){
                return this.$i18n.locale;
             }
        },
        watch: {
            // '$route'(from, to){
            //
            //     this.$store.dispatch('AllCountry', {lang: from.params.lang});
            //     this.$store.dispatch('AllBusinessCategory', {lang: from.params.lang});
            // },
            getLocalLang(lang){
                this.$router.replace({name: 'home', params:{lang: lang}});
                // this.typeFliter.push(this.$i18n.t('Business-Directory.searchBar.All'),this.$i18n.t('Business-Directory.searchBar.Enterprise'),this.$i18n.t('Business-Directory.searchBar.Professional'),this.$i18n.t('Business-Directory.searchBar.Product'),this.$i18n.t('Business-Directory.searchBar.Service'))

            },
              getAllCountry(country) {
                  this.country = [];
                  this.countryWithIds = [];
                if (country) {
                    for (let i in country) {
                        this.country.push(country[i].name);
                        this.countryWithIds.push(country[i])
                    }
                    this.country.unshift(this.$i18n.t('Business-Directory.searchBar.All'));

                }
            },
            getAllBusinessCategory(business) {
                this.sectors= [];
                this.sectorsWithIds =[];
                if (business) {
                    for (let i in business) {
                        this.sectors.push(business[i].name);
                        this.sectorsWithIds.push(business[i]);
                    }

                    if(!this.$route.query.filter){
                        this.sectorSelected = this.$i18n.t('Business-Directory.searchBar.All');
                    }else{
                        this.sectorSelected = this.$route.query.filter
                    }
                    this.searchKeyword = this.$route.query.word;
                    this.searchButton();
                    this.sectors.unshift(this.$i18n.t('Business-Directory.searchBar.All'));
                }
            },

        },
         methods:{
            searchButton()
            {
                this.filterparamters={
                    'type':'',
                    'country': '',
                    'category': '',
                   ' subcategory':'',

                };

                if(this.typeSelected !== this.$i18n.t('Business-Directory.searchBar.All')) {
                    let filterby_id = this.typeFilterWithIds.find(id => id.name === this.typeSelected ).id;
                    this.filterparamters['type']= filterby_id;
                }
                if(this.countrySelected !== this.$i18n.t('Business-Directory.searchBar.All')) {

                    let country_id = this.countryWithIds.find(id => id.name === this.countrySelected ).country_id;
                    this.filterparamters['country']=country_id;
                }
                if(this.sectorSelected !== this.$i18n.t('Business-Directory.searchBar.All')) {
                    console.log(this.sectorSelected);
                    console.log(this.sectorsWithIds, "IDSSSS");
                    let sector_id = this.sectorsWithIds.find(id => id.name === this.sectorSelected ).id;
                    this.filterparamters['category']= sector_id;

                }
                //  if(this.subSectorSelected !=='All') {
                //      this.filterparamters['subcategory']=this.subSectorSelected;
                // }



                this.$store.commit('setSearchFlag', true);
                this.$store.commit('setSearchKeyword', this.searchKeyword);
                this.$store.commit('setSearchFilters',
                    this.filterparamters
                    // 'type':this.typeSelected,
                    // 'country': this.countrySelected,
                    // 'category': this.sectorSelected,
                   // 'subcategory': this.subSectorSelected,
                );
                 this.$store.dispatch('searchKeyword', {
                     url: '/vue/searchkeyword',
                     searchKeyword: this.searchKeyword,
                     filterparamters: this.filterparamters,
                     lang: this.$i18n.locale
                 });
            },
            // loadData:function() {
            //     this.allSubSectors=[];
            //
            //     axios.post('/vue/getsubsector',{selected:this.sectorSelected})
            //         .then(res => {
            //
            //             if(res.data=='All') {
            //                 this.disabled=true;
            //                 this.subSectorSelected='All';
            //             } else if(res.data.length==0)
            //             {
            //                 this.disabled=true;
            //
            //             } else {
            //                 this.disabled=false;
            //                 // "fix" the data to set a label for all types
            //                 this.allSubSectors = res.data.map((item) =>{
            //                     return item;
            //                 });
            //             }
            //
            //         });
            // }
        }
    }
</script>

<style scoped>

    .mobile-search-bar{
        display: none !important;
    }
    .wide-search-bar{
        display: block !important;
    }
    @media (max-width: 1270px) {
        .mobile-search-bar{
            display: block !important;
        }
        .wide-search-bar{
            display: none !important;
        }
    }
    .v-text-field.v-input--dense:not(.v-text-field--outlined):not(.v-text-field--solo) input {
        padding: 4px 0 8px;
        margin-top: 10px;
    }
    .v-text-field.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo) .v-input__append-inner, .v-text-field.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo) .v-input__append-outer, .v-text-field.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo) .v-input__prepend-inner, .v-text-field.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo) .v-input__prepend-outer {
        margin-top: 14px !important;
    }
    .v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined).v-input--dense .v-select__slot>input {
        margin-top: 10px;
    }
    >>>.v-text-field--filled.v-input--dense>.v-input__control>.v-input__slot, .v-text-field--full-width.v-input--dense>.v-input__control>.v-input__slot, .v-text-field--outlined.v-input--dense>.v-input__control>.v-input__slot {
        min-height: 45px;
    }
    >>>.v-text-field--rounded>.v-input__control>.v-input__slot {
        padding: 0 16px;
    }
    >>>.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo) .v-input__append-inner, .v-text-field--enclosed.v-input--dense:not(.v-text-field--solo) .v-input__append-outer, .v-text-field--enclosed.v-input--dense:not(.v-text-field--solo) .v-input__prepend-inner, .v-text-field--enclosed.v-input--dense:not(.v-text-field--solo) .v-input__prepend-outer, .v-text-field--full-width.v-input--dense:not(.v-text-field--solo) .v-input__append-inner, .v-text-field--full-width.v-input--dense:not(.v-text-field--solo) .v-input__append-outer, .v-text-field--full-width.v-input--dense:not(.v-text-field--solo) .v-input__prepend-inner, .v-text-field--full-width.v-input--dense:not(.v-text-field--solo) .v-input__prepend-outer {
        margin-top: 10px;
    }
</style>
