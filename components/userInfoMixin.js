export default {
    data: () => {

        return{
           userInfo: '',
            authFlagForEdit: false,
            loading: true,
            loaded: false,
            businessSize:''

        }
    },
     mounted(){
        // this.$store.dispatch('userData', this.$route.params.id);
        // this.$store.dispatch('checkUserAuth', this.$route.params.id);
    },
    computed:{

        getUserData(){
            return this.$store.getters.getUserData;
        },
        checkUserAuth(){
            return this.$store.getters.getAuthFlag;
        },
        // getAuthFlagForEdit(){
        //     return this.$store.getters.getAuthFlagForEdit;
        // }

    },
    watch:{
        // getAuthFlagForEdit(flag){
        //
        //     if(flag !== null){
        //         this.authFlagForEdit = flag;
        //     }
        // },
        checkUserAuth(flag){
            if(flag !== null) {
                console.log("flag for personal profile edit", flag);
                if (flag === true) {
                    this.authFlagForEdit = true;
                } else if (flag === false) {
                    this.authFlagForEdit = false;
                } else if (flag === 'not_found') {
                    this.authFlagForEdit = false;
                }
            }
        },
        getUserData(data){
            this.userInfo = '';
            if(data) {
                this.userInfo = data;
                if(data.business_size) {
                    let bs = data.business_size;
                    this.businessSize = bs.split(' ', 1);
                }
                this.loading = false;
                this.loaded = true;

            }
        }
    },
};
