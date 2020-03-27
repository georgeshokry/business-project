import axios from 'axios';

export default{
    state: {
        searchFlag: null,
    	searchResult:[],
        searchKeyword: '',
        searchFilters: {},
        promotedCompinesResult:null,

    },
    mutations: {
    	 setSearchResult(state, data) {
            state.searchResult = data;
        },
        setSearchFlag(state, data) {
            state.searchFlag = data;
        },
        setSearchKeyword(state, data) {
            state.searchKeyword = data;
        },
        setSearchFilters(state, data){
    	     state.searchFilters = data;
        },
        setPromotedCompines(state, data){
             state.promotedCompinesResult = data;
        }

    },
    actions: {
    	 searchKeyword({commit, dispatch}, payload){
    	
            commit('setSearchResult', []);
               commit('setPromotedCompines',null);
            
             axios.post(payload.url, {searchKeyword:
             payload.searchKeyword,filterparamters:payload.filterparamters, lang: payload.lang})
                .then(function (response) {

                    if(response.data.searchall.data.length !== 0){
                        commit('setSearchResult', response.data.searchall);

                    }else {
                        console.log("no data");
                        commit('setSearchResult', "No-Result");
                    }
                    if(response.data.promotedbusiness.length !== 0) {
                        commit('setPromotedCompines', response.data.promotedbusiness);
                    }else {
                        commit('setPromotedCompines', "no-prm");
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        },

    },
    getters: {
        getSearchResult:state => {
            return state.searchResult;
        },
        getSearchFlag: state =>{
            return state.searchFlag;
        },
        getSearchKeyword: state =>{
            return state.searchKeyword;
        },
        getSearchFilters: state =>{
            return state.searchFilters;
        },
        getPromotedCompines: state =>{
            return state.promotedCompinesResult;
        }


        
      

    }
}