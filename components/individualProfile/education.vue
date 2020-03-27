<template>
    <div >
        <v-card-title tile class="font-weight-bold justify-space-between">
            <div>{{userInfo.providertype === 'service' ? $t('individualProfile.education.Education') : $t('individualProfile.education.Product Certificate') }}</div>

        </v-card-title>

        <div v-if="loadingEdu === true" >
            <v-layout
                    fill-height
                    align-center
                    justify-center
                    ma-0
            >
                <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
            </v-layout>
        </div>
        <v-card-text style="justify-content: center"  v-if="loadingEdu === false">
                    <div v-for="(item,i) in cert">

            <v-card flat style="background-color:#f3f3f3; border-radius: 10px;">
                <v-card-title style="padding-bottom: 20px; justify-content: space-between;">
                    {{item.title}}
                    <div v-if="authFlagForEdit">
                    <v-btn icon color="#E60000"  @click="deleteProductCert(item.id)" >
                        <v-icon color="#E60000">
                            clear
                        </v-icon>
                    </v-btn>
                    <v-btn icon color="#E60000" @click="openEditNewCertDialog(item.id,item.title,item.content,item.from_year,item.to_year)"  >
                        <v-icon color="#E60000">
                            edit
                        </v-icon>
                    </v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-layout row wrap style="margin-left: 45px;margin-right: 45px;">
                        <v-layout row wrap style="width: 100%">
                        <div>
                            <strong>{{$t('individualProfile.education.Description')}}</strong>
                        </div>
                        <div style="margin-left: 10px;text-align: initial;margin-right: 10px;">
                            <span>{{item.content}}</span>
                            <v-divider dark class="ma-1"></v-divider>
                        </div>
                        </v-layout>
                            <v-layout row wrap >
                        <div>
                            <strong>{{$t('individualProfile.education.Period')}}:</strong>
                        </div>
                        <div style="width: 60%;margin-left: 10px; text-align: initial;margin-right: 10px;">
                             {{item.from_year}} <span v-if="item.to_year !== null">  -  </span>  {{item.to_year}}
                        </div>
                            </v-layout>
                    </v-layout>
                </v-card-text>

            </v-card>
                        <v-divider dark  v-if="i !== cert.length-1" class="ma-1"></v-divider>
             </div>
            <v-btn
                    depressed
                    style="width: 100%;margin-top: 10px;"
                    @click="addNewBtn"
                    v-if="cert.length < 3 && authFlagForEdit"
            >
                {{$t('individualProfile.mostNotableWork.Add New')}} +
            </v-btn>
        </v-card-text>
       

        <v-dialog
                scrollable
                persistent
                v-model="addNewEduicationDialog"
                max-width="350"
        >       
         <v-form ref="Educationform">

            <v-card>
                <v-layout column wrap style="width: 100%;">
                    <v-card-title class="justify-space-between" >
                        {{$t('individualProfile.education.Add New Education')}}
                        <v-btn icon @click="addNewEduicationDialog = false">
                            <v-icon color="#E60000" small >close</v-icon>
                        </v-btn>
                    </v-card-title>

                </v-layout>
                <v-card-text>
                    <v-text-field
                            v-model="newEducationTitle"
                            :label="$t('individualProfile.education.Title')"
                            color="#E60000"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            counter="25"
                            maxlength="25"
                    ></v-text-field>
                    <v-textarea
                            v-model="newEducationContent"
                            :label="$t('individualProfile.education.Content')"
                            color="#E60000"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            counter="200"
                            maxlength="200"
                            rows="1"
                            auto-grow
                    ></v-textarea>
                       <v-combobox
                            v-model="newEducationFromPeriod"
                            :items="yearsselect"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            :label="$t('individualProfile.education.From')"
                            color="#E60000"
                            auto-grow
                            rows="1"
                       >

                       </v-combobox>

                        <v-combobox
                            v-model="newEducationToPeriod"
                            :items="yearsselect"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            :label="$t('individualProfile.education.To')"
                            color="#E60000"
                    > </v-combobox>
                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn

                            color="#E60000"
                            text
                            @click="addNewEduicationDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn

                            color="#E60000"
                            dark
                            elevation="0"
                            @click="saveServiceEducation()"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        </v-dialog>
        <v-dialog
                scrollable
                persistent
                v-model="addNewCertDialog"
                max-width="400"
        >
        <v-form ref="Certform">
            <v-card>
                <v-layout column wrap style="width: 100%;">
                    <v-card-title class=" justify-space-between" >
                        {{$t('individualProfile.education.Add New Product Certificate')}}
                        <v-btn icon @click="addNewCertDialog= false">
                            <v-icon color="#E60000" small >close</v-icon>
                        </v-btn>
                    </v-card-title>

                </v-layout>
                <v-card-text>
                    <v-text-field
                            v-model="newCertTitle"
                            :label="$t('individualProfile.education.Title')"
                            color="#E60000"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            counter="25"
                            maxlength="25"
                    ></v-text-field>
                    <v-textarea
                            v-model="newCertContent"
                            :label="$t('individualProfile.education.Content')"
                            color="#E60000"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            counter="200"
                            maxlength="200"
                            auto-grow
                            rows="1"
                    ></v-textarea>

                  <v-combobox
                            v-model="newPeriod"
                            :items="yearsselect"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            :label="$t('individualProfile.education.Period')"
                            color="#E60000"
                    > </v-combobox>

                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn

                            color="#E60000"
                            text
                            @click="addNewCertDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn

                            color="#E60000"
                            dark
                            elevation="0"
                            @click="saveProductCert()"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        </v-dialog>

         <v-dialog
                scrollable
                persistent
                v-model="editNewCertDialog"
                max-width="350"
        >
        <v-form ref="EditCertform">
            <v-card>
                <v-layout column wrap style="width: 100%;">
                    <v-card-title class="headline justify-space-between" >
                         {{$t('individualProfile.education.Edit Product Certificate')}}
                        <v-btn icon @click="editNewCertDialog= false">
                            <v-icon color="#E60000" small >close</v-icon>
                        </v-btn>
                    </v-card-title>

                </v-layout>
                <v-card-text>
                    <v-text-field
                            v-model="editCertTitle"
                            :label="$t('individualProfile.education.Title')"
                            color="#E60000"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            counter="25"
                            maxlength="25"
                    ></v-text-field>
                    <v-textarea
                            v-model="editCertContent"
                            :label="$t('individualProfile.education.Content')"
                            color="#E60000"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            counter="200"
                            maxlength="200"
                            auto-grow
                            rows="1"
                    ></v-textarea>

                  <v-combobox
                            v-model="editPeriod"
                            :items="yearsselect"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            :label="$t('individualProfile.education.Period')"
                            color="#E60000"
                    > </v-combobox>

                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn

                            color="#E60000"
                            text
                            @click="editNewCertDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn

                            color="#E60000"
                            dark
                            elevation="0"
                            @click="editProductCert()"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        </v-dialog>
          <v-dialog
                scrollable
                persistent
                v-model="editEducationServiceDialog"
                max-width="350"
        >
        <v-form ref="EditEducationform">
            <v-card>
                <v-layout column wrap style="width: 100%;">
                    <v-card-title class=" justify-space-between" >
                        {{$t('individualProfile.education.Edit Education')}}
                        <v-btn icon color="#E60000" @click="editEducationServiceDialog= false">
                            <v-icon color="#E60000" small >close</v-icon>
                        </v-btn>
                    </v-card-title>

                </v-layout>
                <v-card-text>
                    <v-text-field
                            v-model="editEducationTitle"
                            :label="$t('individualProfile.education.Title')"
                            color="#E60000"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            counter="25"
                            maxlength="25"
                    ></v-text-field>
                    <v-textarea
                            v-model="editEducationContent"
                            :label="$t('individualProfile.education.Content')"
                            color="#E60000"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            counter="200"
                            maxlength="200"
                            auto-grow
                            rows="1"
                    ></v-textarea>

                  <v-combobox
                            v-model="editEducationFromPeriod"
                            :items="yearsselect"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            :label="$t('individualProfile.education.From')"
                            color="#E60000"
                    > </v-combobox>

                    <v-combobox
                            v-model="editEducationToPeriod"
                            :items="yearsselect"
                            :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                            :label="$t('individualProfile.education.To')"
                            color="#E60000"
                    > </v-combobox>

                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn

                            color="#E60000"
                            text
                            @click="editEducationServiceDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn

                            color="#E60000"
                            dark
                            elevation="0"
                            @click="editServiceEducation()"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        </v-dialog>
    </div>
</template>

<script>
    import userInfoMixin from "../userInfoMixin";
    export default {
        name: "education",
        mixins:[userInfoMixin],
        data:()=>{
            return{
                loadingEdu:true,
                addNewCertDialog: false,
                newCertTitle: '',
                newCertContent: '',
                addNewEduicationDialog: false,
                newTitle: '',
                newContent: '',
                newPeriod: '',
                cert: null,
                yearsselect:[],
                editNewCertDialog:false,
                editCertTitle:'',
                editCertContent:'',
                editPeriod:'',
                editid:'',
                newEducationTitle:'',
                newEducationContent:'',
                newEducationToPeriod:'',
                newEducationFromPeriod:'',
                editEducationServiceDialog:false,
                editEducationTitle:'',
                editEducationContent:'',
                editEducationFromPeriod:'',
                editEducationToPeriod:'',
                editEducaionid:'',

                rules: {
                    required: value => !!value || 'Required.',
                    maxTitle: v => v.length <= 25 || 'Maximum 25 characters',
                    maxContent: v => v.length <= 200 || 'Maximum 200 characters',
                },
            }
        },
         created(){
            for (let i = new Date().getFullYear(); i > 1970; i--)
                {
                                         this.yearsselect.push(i);

                }
        this.$store.dispatch('AllProServCertifications', this.$route.params.id);
        


                },
                computed:{

                    getAllProServCertifications(){
                        return this.$store.getters.getAllProServCertifications;
                    },
                },

                watch:{
            '$route'(from, to){
                this.$store.dispatch('AllProServCertifications', this.$route.params.id);
            },
                    getAllProServCertifications(cert){
                        this.cert=null;
                        this.loadingEdu = true;
                        if(cert !== null) {
                            this.cert=[];
                            for(let i in cert) {
                                this.cert.push(cert[i]);

                            }
                            this.loadingEdu = false;
                        }
                    },
                },
        methods:{
            addNewBtn(){
                if(this.userInfo.providertype === 'service' ){
                    this.addNewEduicationDialog = true;
                }else {
                    this.addNewCertDialog = true;
                }
            },
            saveProductCert()
            {
                  this.$store.commit('setClearAppMsgs');
                if (this.$refs.Certform.validate() ) {

                 
                        this.$store.dispatch('saveProductCert', {
                            slug: this.$route.params.id,
                            title: this.newCertTitle,
                            descraption: this.newCertContent,
                            fromyear:this.newPeriod,
                            toyear:'',

                        })
                         this.newCertTitle='';
                             this.newCertContent='';
                           this.newPeriod='';
                            
                        this.addNewCertDialog = false;
                }
                // else {
                //     this.$store.commit('setAppMsgs', {
                //         msg: "Please Fill Input",
                //         color: "info",
                //         icon: "info"
                //     });
                // }
            },
            openEditNewCertDialog(id,title,des,formyear,toyear)
            {
                  if(this.userInfo.providertype === 'service' ){
                    this.editEducaionid=id;
                    this.editEducationTitle=title;
                    this.editEducationContent=des;
                    this.editEducationFromPeriod=formyear;
                    this.editEducationToPeriod=toyear
                    this.editEducationServiceDialog = true;
                }else {
                       this.editid=id;
                this.editCertTitle=title;
                this.editCertContent=des;
                this.editPeriod=formyear;
                this.editNewCertDialog=true;
                }
             
            },
            editProductCert()
            {
                  this.$store.commit('setClearAppMsgs');
                if (this.$refs.EditCertform.validate() ) {

                 
                        this.$store.dispatch('editProductCert', {
                            slug: this.$route.params.id,
                            id:this.editid,
                            title: this.editCertTitle,
                            descraption: this.editCertContent,
                            fromyear:this.editPeriod,
                            toyear:'',

                        })
                           this.editCertTitle='';
                this.editCertContent='';
                this.editPeriod='';
                this.editNewCertDialog=false;
                            
                        
                }
                // else {
                //     this.$store.commit('setAppMsgs', {
                //         msg: "Please Fill Input",
                //         color: "info",
                //         icon: "info"
                //     });
                // }
            },
                    deleteProductCert(id){
                 this.$store.commit('setClearAppMsgs');
                 this.$store.dispatch('deleteProductCert', {
                slug: this.$route.params.id,
                certid: id
                    });

            },

               saveServiceEducation()
            {
                  this.$store.commit('setClearAppMsgs');
                if (this.$refs.Educationform.validate() && this.newEducationToPeriod >= this.newEducationFromPeriod ) {

                 
                        this.$store.dispatch('saveProductCert', {
                            slug: this.$route.params.id,
                            title: this.newEducationTitle,
                            descraption: this.newEducationContent,
                            fromyear:this.newEducationFromPeriod,
                            toyear:this.newEducationToPeriod,

                        })
                         this.newEducationTitle='';
                             this.newEducationContent='';
                           this.newEducationFromPeriod='';
                           this.newEducationToPeriod='';
                            
                        this.addNewEduicationDialog = false;
                }else {
                    this.$store.commit('setAppMsgs', {
                        msg: "individualProfile.education.Please Fill Input And Check Dates",
                        color: "info",
                        icon: "info"
                    });
                }
            },

                           editServiceEducation()
            {
                  this.$store.commit('setClearAppMsgs');
                if (this.$refs.EditEducationform.validate() && this.editEducationToPeriod >= this.editEducationFromPeriod ) {

                 
                        this.$store.dispatch('editProductCert', {
                            slug: this.$route.params.id,
                            id:this.editEducaionid,
                            title: this.editEducationTitle,
                            descraption: this.editEducationContent,
                            fromyear:this.editEducationFromPeriod,
                            toyear:this.editEducationToPeriod,

                        })
                         this.editEducationTitle='';
                             this.editEducationContent='';
                           this.editEducationFromPeriod='';
                           this.editEducationToPeriod='';
                            
                        this.editEducationServiceDialog = false;
                }else {
                    this.$store.commit('setAppMsgs', {
                        msg: "Please Fill Input And Check Dates",
                        color: "info",
                        icon: "info"
                    });
                }
            },
        }
    }
</script>

<style scoped>

</style>
