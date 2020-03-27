<template>
    <v-card flat>

        <v-card flat height="400" style="position: sticky;top: 50px;border: 2px solid #e2e2e2 !important; background-color: #e2e2e2;width: 100%" v-if="allrecommandtype.length === 0">
            <v-layout

                    fill-height
                    align-center
                    justify-center
                    ma-auto
            >
                <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
            </v-layout>
        </v-card>

        <div v-else style="width: 97%;margin-left: auto;margin-right: auto;">
            <v-card flat style="border: 2px solid #e2e2e2 !important;border-radius: 0px !important;">

                <v-toolbar flat dense height="30" color="#e2e2e2" width="100%">
                    <v-spacer></v-spacer>
                    <v-toolbar-title style="font-size: medium;">

                        <strong v-if="userInfo !== ''">{{userInfo.providertype === 'service' ? $t('profile.contactColumn.Services') : $t('profile.contactColumn.Products')}}</strong>
                        <v-btn small color="#E60000" icon v-if="authFlagForEdit" @click="openFeatureDialog()" class="edit-btn">
                            <v-icon small color="#E60000">
                                edit
                            </v-icon>
                        </v-btn>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <div style="margin: 15px;">
                    <v-layout row wrap v-for="(item,i) in inputsForView" :key="i">

                        <v-card-text class="pa-0" style="text-align: initial">
                            {{item.Feature}}
                        </v-card-text>

                    </v-layout>

                </div>
            </v-card>
            <v-card flat style="border: 2px solid #e2e2e2 !important;
    border-radius: 0px !important;" v-if="userInfo.providertype === 'service'">

                <v-toolbar flat dense height="30" color="#e2e2e2" width="100%">
                    <v-spacer></v-spacer>
                    <v-toolbar-title style="font-size: medium;">

                        <strong>{{$t('individualProfile.leftColumn.Skills Set')}}</strong>
                        <v-btn small color="#E60000" icon v-if="authFlagForEdit" @click="editSkillDialog=true" class="edit-btn">
                            <v-icon small color="#E60000">
                                edit
                            </v-icon>
                        </v-btn>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <div style="margin: 15px;">
                    <v-layout row wrap  v-for="(skill,s) in skills" :key="s">
                        <v-card-text class="pa-0" style="text-align: initial">
                           {{skill.name}}
                        </v-card-text>
                    </v-layout>
                </div>
            </v-card>
            <v-card flat style="border: 2px solid #e2e2e2 !important;border-radius: 0px !important;">
                <v-toolbar flat dense height="30" color="#e2e2e2" width="100%">
                    <v-spacer></v-spacer>
                    <v-toolbar-title style="font-size: medium;">
                        <strong>{{$t('profile.contactColumn.Tags')}}</strong>
                        <v-btn small icon color="#E60000" v-if="authFlagForEdit" @click="editTags()" class="edit-btn">
                            <v-icon small color="#E60000">
                                edit
                            </v-icon>
                        </v-btn>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text >
                    <v-layout row wrap justify-center>
                        <div  v-for="(item,i) in keywords">
                            <v-chip small class="ma-1">
                                {{item}}
                            </v-chip>
                        </div>

                    </v-layout>
                </v-card-text>
            </v-card>
            <v-card flat width="100%" style="border: 2px solid #e2e2e2 !important;border-radius: 0px !important;" v-if="allrecommandtype.length > 0">

                <v-toolbar flat dense height="30" color="#e2e2e2" width="100%">
                    <v-spacer></v-spacer>
                    <v-toolbar-title style="font-size: medium;">
                        <strong>{{$t('individualProfile.leftColumn.Ratings')}}</strong>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text class="scroll-staff" >


                    <v-layout column wrap justify-center v-for="(type,r) in allrecommandtype" :key="r">

                        <v-card flat elevation="0">
                            <v-layout row wrap style="min-width: 160px;">
                                <div class="container row">
                                    <div class="column" style="width: 20px;">
                                        <img  width="35" style=""  src="../resources/Recommended_Red.svg">
                                        <div class="centered">{{type.count}}</div>
                                    </div>
                                    <div class="column" style="color: red;margin: auto;width: 100px">
                                        <h6 style="font-size:small !important;margin-bottom: 0;">{{type.name}}</h6>
                                    </div>
                                </div>
                            </v-layout>
                        </v-card>


                    </v-layout>

                </v-card-text>
            </v-card>
        </div>
        <v-dialog
                persistent
                scrollable
                v-model="editTagsDialog"
                max-width="350"
        >
            <v-form ref="editkeywords">
            <v-card>


                <v-card-title class="justify-space-between" >
                    {{$t('profile.contactColumn.Edit Tags')}}
                    <v-btn icon color="#E60000" @click="editTagsDialog= false">
                        <v-icon color="#E60000" small >close</v-icon>
                    </v-btn>
                </v-card-title>


                <v-card-text>
                    <v-combobox
                            :menu-props="{maxHeight: 150}"
                            color="#E60000"
                            v-model="comboboxTags"
                            :items="dropdownSelectTags"
                            :label="$t('profile.contactColumn.Select Tags')"
                            multiple
                            counter="5"
                            :rules="[v => v.length >= 1 || $t('profile.contactColumn.Minimum 1 Tag'), v => v.length < 6 || $t('profile.contactColumn.Maximum 5 Tags')]"
                    >
                        <template v-slot:no-data>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{$t('registration.personalProfileRegisteration.No Data')}}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-combobox>



                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn
                            color="#E60000"
                            text
                            @click="editTagsDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}

                    </v-btn>

                    <v-btn
                            color="#E60000"
                            dark
                            elevation="0"
                            @click="saveTagsData()"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
            </v-form>
        </v-dialog>

          <v-dialog
            persistent
            scrollable
            v-model="editFeatureDialog"
            max-width="350"
        >
  <v-form ref="form">
            <v-card>


                    <v-card-title class="justify-space-between" >
                        {{$t('profile.contactColumn.Edit Features')}}
                        <v-btn icon color="#E60000" @click="editFeatureDialog= false">
                            <v-icon color="#E60000" small >close</v-icon>
                        </v-btn>
                    </v-card-title>


                <v-card-text>

                    <v-card-text style="text-align: initial;">
                        {{$t('profile.contactColumn.Add New')}}
                    <v-btn icon color="#E60000" @click="add()" v-if="inputs.length < 5">
                        <v-icon smaller color="#E60000">add_circle_outline</v-icon>
                    </v-btn>
                    </v-card-text>
                    <v-layout row wrap v-for="(input,k) in inputs" :key="k" style="align-items: center;    margin: 3px;">

                    <v-text-field
                        v-model="input.Feature"
                        label=""
                        color="#E60000"
                        :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' ) ]"
                        counter="25"
                        maxlength="25"
                    >

                    </v-text-field>
                            <v-btn icon color="#E60000" @click="remove(k)" >
                                <v-icon smaller color="#E60000">remove_circle_outline</v-icon>
                            </v-btn>
                        </v-layout>

                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn
                        color="#E60000"
                        text
                        @click="editFeatureDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn
                        color="#E60000"
                        dark
                        elevation="0"
                        @click="saveFeaturedProServ()"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        </v-dialog>

               <v-dialog
            persistent
            scrollable
            v-model="editSkillDialog"
            max-width="350"
        >
  <v-form ref="Skillform">
            <v-card>


                    <v-card-title class=" justify-space-between" >
                        {{$t('profile.contactColumn.Edit Skills')}}
                        <v-btn icon color="#E60000" @click="editSkillDialog = false">
                            <v-icon color="#E60000" small >close</v-icon>
                        </v-btn>
                    </v-card-title>


                <v-card-text>
                    <v-card-text>
                        {{$t('profile.contactColumn.Add New')}}
                    <v-btn icon @click="addskill()" v-if="skills.length < 5">
                        <v-icon smaller color="#E60000">add_circle_outline</v-icon>
                    </v-btn>
                    </v-card-text>

                    <v-layout row wrap v-for="(input,k) in skills" :key="k" style="align-items: center;    margin: 3px;">

                        <v-text-field
                        v-model="input.name"
                        :label="$t('profile.contactColumn.Write New Skill')"
                        color="#E60000"
                        :rules="[rules.max, rules.required]"
                        counter="25"
                        maxlength="25"
                        >

                        </v-text-field>
                            <v-btn icon @click="removeskill(k)" >
                                <v-icon smaller color="#E60000">remove_circle_outline
                                </v-icon>
                            </v-btn>
                    </v-layout>
                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn
                        color="#E60000"
                        text
                        @click="editSkillDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn
                        color="#E60000"
                        dark
                        elevation="0"
                        @click="saveSkill()"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        </v-dialog>
    </v-card>
</template>

<script>
    import userInfoMixin from "../userInfoMixin";
    export default {
        name: "leftColumn",
        mixins: [userInfoMixin],
        data:()=>{
                    return{
                         rules: {
                    required: value => !!value || 'Required.',
                    max: v => v.length <= 25 || 'Maximum 25 characters',
                             minrecord: v => v.length > 1 || 'Minimum 1 characters',

                             maxrecord: v => v.length <= 5 || 'Maximum 5 keywords',
                },

                        editTagsDialog:false,
                        dropdownSelectTags:[],
                        comboboxTags:[],

                        keywords:[],
                        allrecommandtype:[],
                        editFeatureDialog:false,
                        inputs:[],
                        skills:[],
                        editSkillDialog:false,

                        inputsForView:[],

                        dropdownSelectTagsWithIds: [],
                    }
                },
                mounted() {
                    this.$store.dispatch('userData', {id: this.$route.params.id, lang: this.$i18n.locale});
                    this.$store.dispatch('checkUserAuth', this.$route.params.id);
                    this.$store.dispatch('Allkeywords', {slug: this.$route.params.id, lang: this.$i18n.locale});
                    this.$store.dispatch('SelectedKeywords', {slug: this.$route.params.id, lang: this.$i18n.locale});
                    this.$store.dispatch('AllRecommendsTypes', {id: this.$route.params.id, lang: this.$i18n.locale});
                    this.$store.dispatch('AllFeaturedProductService', this.$route.params.id);
                    this.$store.dispatch('AllServiceSkills', this.$route.params.id);


                },
                computed:{

                    getAllKeywords(){
                        return this.$store.getters.getAllKeywords;
                    },
                    getSelectedKeywords(){
                        return this.$store.getters.getSelectedKeywords;
                    },
                    getAllRecommendsTypes(){
                return this.$store.getters.getAllRecommendsTypes;
            },
                    getAllFeaturedProductService(){
                return this.$store.getters.getAllFeaturedProductService;
            },
                   getAllServiceSkills(){
                return this.$store.getters.getAllServiceSkills;
            },
                },
                watch: {
                    '$route'(from, to) {
                        this.allrecommandtype = [];
                        this.$store.dispatch('Allkeywords', {slug: from.params.id, lang: from.params.lang});
                        this.$store.dispatch('SelectedKeywords', {slug: from.params.id, lang: from.params.lang});
                        this.$store.dispatch('AllRecommendsTypes', {id: from.params.id, lang: from.params.lang});
                        this.$store.dispatch('AllFeaturedProductService', from.params.id);
                        this.$store.dispatch('AllServiceSkills', from.params.id);
                    },
                    getAllKeywords(keywords) {

                        this.dropdownSelectTags = [];
                        this.dropdownSelectTagsWithIds= [];
                        if (keywords) {
                            for (let i in keywords) {
                                this.dropdownSelectTags.push(keywords[i].name);
                                this.dropdownSelectTagsWithIds.push(keywords[i]);
                            }
                        }
                    },
                    getSelectedKeywords(keywords) {
                        this.comboboxTags = [];
                        this.keywords = [];
                        if (keywords) {
                            for (let i in keywords) {
                                this.keywords.push(keywords[i]);
                                this.comboboxTags.push(keywords[i]);
                            }
                        }
                    },
                    getAllRecommendsTypes(recommandtype) {

                        if (recommandtype) {
                            this.allrecommandtype = [];
                            for (let i in recommandtype) {

                                this.allrecommandtype.push({
                                    name: recommandtype[i].recommendsname,
                                    count: recommandtype[i].count
                                });


                            }
                        }


                    },
                    getAllFeaturedProductService(featured) {


                        if (featured) {
                            this.inputs = [];
                            this.inputsForView = [];
                            for (let i in featured) {

                                this.inputs.push({Feature: featured[i].title});
                                this.inputsForView.push({Feature: featured[i].title});


                            }
                        }


                    },
                    getAllServiceSkills(skill) {


                        if (skill) {
                            this.skills = [];
                            for (let i in skill) {

                                this.skills.push({name: skill[i].title});


                            }
                        }


                    },
                },
                methods:{
            openFeatureDialog(){
                this.inputs=[];
                for (let i in this.inputsForView) {
                    this.inputs.push({Feature: this.inputsForView[i].Feature});
                }
                this.editFeatureDialog=true
            },
                    editTags() {
                        this.editTagsDialog=true;
                    },
                    saveTagsData() {
                        this.$store.commit('setClearAppMsgs');
                        if (this.$refs.editkeywords.validate()) {

                            let tagesslected_ids = [];
                            for(let i in this.comboboxTags){
                                tagesslected_ids.push(
                                    this.dropdownSelectTagsWithIds.find(id => id.name === this.comboboxTags[i]).id
                                )
                            }
                            this.$store.dispatch('saveTagsData', {
                                slug: this.$route.params.id,
                                tags: tagesslected_ids,
                                lang: this.$i18n.locale,
                            });
                            this.editTagsDialog = false;

                        }

                    },
                               add() {
                                   this.inputs.push({Feature: ''});
                               },
            remove(index) {
                this.inputs.splice(index, 1);
            },
             titleCase(str) {
                 var splitStr = str.toLowerCase().split(' ');
                 for (var i = 0; i < splitStr.length; i++) {
                     // You do not need to check if i is larger than splitStr length, as your for does that for you
                     // Assign it back to the array
                     splitStr[i] = splitStr[i].charAt(0).toLowerCase() + splitStr[i].substring(1);
                 }
                 // Directly return the joined string
                 return splitStr.join(' ');
             },
                checkArray(my_arr) {


                    if (my_arr.length == 0) {
                        return true;
                    } else {
                        var a = [];

                        for (var i = 0, l = my_arr.length; i < l; i++)
                            if (a.indexOf(my_arr[i].Feature) === -1 && my_arr[i].Feature !== '')
                                a.push(this.titleCase(my_arr[i].Feature));

                        return (new Set(a)).size !== a.length;


                    }


                },
                checkArrayskills(my_arr) {


                    if (my_arr.length == 0) {
                        return true;
                    } else {
                        var a = [];

                        for (var i = 0, l = my_arr.length; i < l; i++)
                            if (a.indexOf(my_arr[i].name) === -1 && my_arr[i].name !== '')
                                a.push(this.titleCase(my_arr[i].name));

                        return (new Set(a)).size !== a.length;


                    }


                },

       saveFeaturedProServ() {
           let checkArray = this.checkArray(this.inputs);

           this.$store.commit('setClearAppMsgs');
           if (this.$refs.form.validate() && checkArray === false) {
               this.$store.dispatch('saveFeaturedProServ', {
                   slug: this.$route.params.id,

                   inputs: this.inputs,

               });
               this.editFeatureDialog = false;

           } else {
               this.$store.commit('setAppMsgs', {
                   msg: "individualProfile.leftColumn.Please Fill all inputs And Check Duplicate!",
                   color: "info",
                   icon: "info"
               })
           }
       },

                              addskill() {
                this.skills.push({ name: '' });
            },
            removeskill(index) {
                this.skills.splice(index, 1);
            },

           saveSkill() {
               let checkArray = this.checkArrayskills(this.skills);

               this.$store.commit('setClearAppMsgs');
               if (this.$refs.Skillform.validate() && checkArray === false) {
                   this.$store.dispatch('saveSkill', {
                       slug: this.$route.params.id,
                       skills: this.skills,
                   });
                   this.editSkillDialog = false;

               } else {
                   this.$store.commit('setAppMsgs', {
                       msg: "individualProfile.leftColumn.Please Fill all inputs And Check Duplicats!",
                       color: "info",
                       icon: "info"
                   })
               }
           },

    }

    }
</script>

<style scoped>
    >>>.edit-btn{
        right: 0;position: absolute;top: 0px;
    }
    >>>.container {
        position: relative;
        text-align: left;
        color: white;
    }
    >>>.centered {
        position: absolute;
        top: 60%;
        left: 20%;
        transform: translate(-50%, -50%);
    }
    >>>.scroll-staff {
        direction: ltr;
        min-height: 185px;
    }
    >>>.rev-title{
        text-align:left;
        margin: 5px;
        /*padding-right: 20px;*/
        justify-content: space-between;
    }
    >>>.rev-content{
        text-align:left;
        margin: 5px;
        /*padding-right: 45px;*/
    }
    /* Create two equal columns that floats next to each other */
    >>>.column {
        float: left;
        width: 50%;
        padding: 5px;

    }

    >>>.flickity-prev-next-button {
        top: 50%;
        width: 30px !important;
        height: 30px !important;
        border-radius: 50%;
        transform: translateY(-50%);
    }
</style>
