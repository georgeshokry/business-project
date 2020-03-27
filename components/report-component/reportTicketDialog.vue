<template>
    <v-dialog
            persistent
            v-model="editReportDialog"
            width="490"
            scrollable
    >
        <v-card>
            <v-layout column wrap style="align-items: flex-end;width: 100%;position: absolute;">
                <v-btn icon color="#E60000" @click="closeEditReportDialog" style="margin: 5px">
                    <v-icon  color="#E60000">
                        close
                    </v-icon>
                </v-btn>
            </v-layout>
            <v-card-title class=" justify-center" >
                <img width="60" src="../resources/Report_Red.svg">
            </v-card-title>
            <v-card-title class=" justify-center" style="color:#E60000;padding-top: 0;">

                {{$t('report-component.report.report')}}
            </v-card-title>
            <v-card-text>
                <v-form
                        ref="reportForm"
                >
                    <v-card-text>
                        <v-card-title class="" style="color:black;padding-left: 0;">
                            {{$t('report-component.report.What is your complain about?')}}
                        </v-card-title>
                        <v-radio-group style=" margin-top: 0;margin-right: 20px;margin-left: 20px;"  column v-model="reportChoice" :rules="[value => !!value || $t('report-component.reportTicketDialog.Required')]">
                            <div v-for="(item,i) in reportRadio">
                        <v-radio color="#E60000" :label="item.title" :value="item.report_id" ></v-radio>

                    </div>

                        </v-radio-group>

                        <v-card-title class="" style="color:black;padding-left: 0;">
                            {{$t('report-component.report.Please describe what happened:')}}
                        </v-card-title>
                        <v-textarea
                                v-model="summaryData"
                                filled

                                color="#E60000"
                                auto-grow
                                counter="200"
                                :rules="[value => !!value || $t('report-component.reportTicketDialog.Required')]"
                        >
                        </v-textarea>

                        <header style="text-align: initial;">
                            {{$t('report-component.report.Attach Images (optional)')}}
                        </header>
                        <v-file-input
                                ref="file"
                                clearable
                                prepend-icon=""
                                color="#E60000"
                                @change="onImageChange($event)"
                                show-size
                                counter
                                multiple
                                accept="image/*"
                                placeholder="Browse Images"

                                :rules="[value =>  value.length <= 4 || $t('report-component.reportTicketDialog.Cant upload more than 4 images'), value => !value.length || value.reduce((size, file) => size + file.size, 0) < 2000000 ||  $t('report-component.reportTicketDialog.Slider image size should be less than 2 MB!')]"



                        >
                        </v-file-input>
                        <v-divider class="mt-2"></v-divider>
                        <v-layout >
                        <div style="text-align: left;font-weight: 800;">{{$t('report-component.report.report owner')}}: {{profiletypesName}}</div>
                            <v-spacer></v-spacer>
                        <v-menu offset-y close-on-click>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        small
                                        outlined
                                        color="#FF0000"
                                        dark
                                        v-on="on"
                                        :loading="profiles.length ===0"
                                >
                                    {{$t('report-component.report.report as')}} <v-icon right color="#E60000">arrow_drop_down</v-icon>
                                </v-btn>
                            </template>

                            <v-list-item-group mandatory color="#E60000" >

                                <v-list
                                        dense
                                        v-for="(item, index) in profiles"
                                        :key="index"
                                >

                                    <v-list-item
                                            @click.stop="setUserAs(item.slug,item.name,item.profile_type)"


                                    >
                                        <v-list-item-avatar>
                                            <v-img :src="'/images/med/'+item.pic"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content >
                                            <v-list-item-title >
                                                {{ item.name }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-list-item-group>

                        </v-menu>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions style="justify-content: center;">

                        <v-btn
                                @click="sendTicket"
                                smaller
                                color="#E60000"
                                style=" color: white; "
                        >
                            {{$t('report-component.report.submit')}}
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "reportTicketDialog",
        data:()=>{
            return{
                reportChoice:'',
                rules: {
                    required: value => !!value || 'Required.',
                    maxSummary: v => (v && v.length <= 200) || 'Maximum 200 characters',
                    imageslimit: value => (value && value.length <= 4) || 'Can\'t upload more than 4 images',
                    imageSize: [ value => !value || value.size < 2000000 || 'Slider image size should be less than 2 MB!'],
                },
                summaryData:'',
                profiles:[],
                profiletypesName: '',
                profiletypes:'',
                profiletypesslug:'',
                reportRadio:[],
                reportimage:[],
            }
        },
        props: {
            editReportDialog: {
                default: false,
                type: Boolean,
            },
        },
            created(){

             this.$store.dispatch('AllReport', {lang: this.$i18n.locale});

        },
        computed:{
            getAllProfileType(){
                return this.$store.getters.getAllProfileType;
            },
            getAllReport(){
                return this.$store.getters.getAllReport;
            },
            getLocalLang(){
                return this.$i18n.locale;
            }
        },
        watch:{
            '$route'(from, to){
                this.reportRadio = [];
                this.$store.dispatch('AllReport', {lang: from.params.lang});
            },
            getLocalLang(lang){
                this.$vuetify.lang.current = lang;
            },
            getAllProfileType(profile){
                this.profiles = [];
                if(profile) {
                    for(let i in profile){
                        this.profiles.push({name: profile[i].name, slug:profile[i].slug, pic:profile[i].pic,profile_type:profile[i].profile_type});
                    }

                    this.profiletypesName = profile[0].name;
                    this.profiletypesslug=profile[0].slug;
                      this.profiletypes=profile[0].profile_type;

                }
            },
                  getAllReport(report){
                      this.reportRadio = [];
                if(report) {
                          for(let i in report){
                this.reportRadio.push(report[i]);
            }
        }
    },
        },
        methods:{
             onImageChange(e){

               this.reportimage=e;
            },
            closeEditReportDialog(){
                this.$emit('closeEditReportDialog');
            },
            
                sendTicket(){
                
                         this.$store.commit('setClearAppMsgs');
                if(this.$refs.reportForm.validate()) {
                    this.$store.dispatch('sendTicketReport', {
                        slug: this.$route.params.id,
                        summarydata:this.summaryData,
                        reportchoice:this.reportChoice,
                        reportimage:this.reportimage,
                        reportersslug:this.profiletypesslug,
                        reportertype:this.profiletypes,
                   
        
                       

                    });
                    this.$emit('closeEditReportDialog');
                  
                        this.$refs.reportForm.reset()


                }
                // else {
                //     this.$store.commit('setAppMsgs', {
                //         msg:"Please Fill all inputs!",
                //         color: "info",
                //         icon: ""
                //     })
                // }

                
            },
            setUserAs(slug, name,type){

               this.profiletypesslug = slug;
               this.profiletypesName = name;
               this.profiletypes= type;
           }
       
}
}
</script>

<style scoped>

</style>