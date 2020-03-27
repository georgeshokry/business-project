<template>
    <v-card flat>
        <v-card-title>
           {{$t('personalProfile.wallet-view.Your Current Balance')}}&nbsp;<span style="color: green;font-family: monospace;"> ${{cash}}</span>
        </v-card-title>
        <v-simple-table fixed-header height="400px">
            <template v-slot:default>
                <thead>
                <tr>
                    <th >{{$t('personalProfile.wallet-view.Transaction Type')}}</th>
                    <th >{{$t('personalProfile.wallet-view.Date')}}</th>
                    <th >{{$t('personalProfile.wallet-view.Amount')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for=" (wallet,w) in data" :key="w" v-if="data.length > 0">
                    <td>{{ wallet.name }}</td>
                    <td>{{ wallet.created_at }}</td>
                    <td>{{ wallet.cost }}</td>
          
                </tr>
                <tr v-if="data.length ===0">
                    <td colspan="3" style="text-align: center;">
                    {{$t('registration.personalProfileRegisteration.No Data')}}
                    </td>
                </tr>
                </tbody>
            </template>

        </v-simple-table>
    </v-card>
</template>

<script>
    import userInfoMixin from "../userInfoMixin"
    export default {
        name: "wallet-view",
        mixins:[userInfoMixin],
        data:()=> {
            return {
                data:[],
                cash: '',
                userData:'',
            }

        },
               created() {
                   this.userData = this.$store.state.profiles.userData;
                   // this.$store.dispatch('checkUserAuth', this.$route.params.id);
                   this.$store.dispatch('AllMemberTransacation', {lang: this.$i18n.locale,slug:this.$route.params.id});


               },
          computed:{
            getAllMemberTransacation(){
                return this.$store.getters.getAllMemberTransacation;
            },
              getUserData() {
                  this.cash = this.$store.getters.getUserData.wallet;
                  return this.$store.getters.getUserData;
              },
        },
        watch:{
            userData:function(data) {
                this.cash = '';
                if (data) {
                    this.cash = data.wallet;
                }
            },
            getAllMemberTransacation(transaction){
                
                if(transaction) {
              
            for(let i in transaction){

            this.data.push(transaction[i]);

                }
            }
        }
        } ,

    }
</script>

<style scoped>

</style>