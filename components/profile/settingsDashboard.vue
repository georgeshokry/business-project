<template>
   <v-app>
       <v-navigation-drawer
           v-model="drawerSettings"
           app
           style="height: 100%;"
           :right="rtlNav"
       >


           <v-btn
               text
               small
               color="#E60000"
               style=" width: 100%;"
               :to="{name: 'companyProfile',params: {id: $route.params.id, lang: $i18n.locale}}"
           >
            {{$t('profile.settingsDashboard.Back to profile')}}
           </v-btn>


           <v-divider class="ma-0"></v-divider>
               <v-list-item-group  color="#E60000" mandatory v-model="model">


                       <v-layout justify-center align-center style="height: 70px;">
                           <v-list-item
                                   :ripple="false"
                                   inactive
                                   style="padding-left: 15px;padding-right: 15px"
                           >

                               <div style="padding: 10px;" >
                                   <v-skeleton-loader
                                           v-if="!userInfo.business_logo"
                                           tile
                                           type="avatar "
                                           style="padding-bottom: 5px; padding-top: 5px;"
                                   ></v-skeleton-loader>
                                   <v-img
                                           v-else
                                           style="object-fit: cover;    border-radius: 10%;background-color: #cacaca;"
                                           height="60px"
                                           width="60px"
                                           :src="'/images/med/'+userInfo.business_logo"
                                   ></v-img>
                               </div>
                               <v-list-item-content class="pr-1 pl-1" style="    text-align: initial;">
                                   <v-skeleton-loader
                                           v-if="!userInfo.name"
                                           type="heading "
                                           tile
                                           style="padding-bottom: 5px; padding-top: 5px"
                                   ></v-skeleton-loader>
                                   <v-list-item-title style="color: black;font-weight: bold; text-transform: capitalize" v-else>{{userInfo.name}}</v-list-item-title>
                               </v-list-item-content>
                           </v-list-item>


                       </v-layout>
                   <v-divider class="ma-0"></v-divider>
<!--                       <v-card-title color="grey">-->
<!--                           <v-card  color="white" elevation="1" width="60" height="60" class="company-image">-->
<!--                               <img-->
<!--                                       style="object-fit: cover;"-->
<!--                                       height="60px"-->
<!--                                       width="60px"-->
<!--                                       :src="userInfo.business_logo"-->
<!--                               >-->

<!--                           </v-card>-->
<!--                           <v-card-texta class="ml-2">{{userInfo.name}}</v-card-texta>-->
<!--                       </v-card-title>-->



                   <v-list-item @click.stop="openBoverView">
                       <v-list-item-content class="pr-0 pl-0">
                           <v-card-title  class="justify-content-end pt-2 pr-0 pl-0 tabes" >{{$t('profile.settingsDashboard.Business Overview')}}</v-card-title>
                       </v-list-item-content>
                   </v-list-item>

                <!--    <v-list-item @click.stop="openActivities">
                       <v-list-item-content >
                           <v-card-title  class="justify-content-end pt-2 tabes" >Activities</v-card-title>
                       </v-list-item-content>
                   </v-list-item> -->

                   <v-list-item @click.stop="openTransaction">
                       <v-list-item-content class="pr-0 pl-0">
                           <v-card-title  class="justify-content-end pt-2 pr-0 pl-0 tabes" >{{$t('profile.settingsDashboard.Transaction History')}}</v-card-title>
                       </v-list-item-content>
                   </v-list-item>

                   <v-list-item @click.stop="openBookmarked">
                       <v-list-item-content class="pr-0 pl-0">
                           <v-card-title  class="justify-content-end pt-2 pr-0 pl-0 tabes" >{{$t('profile.settingsDashboard.Bookmarked')}}</v-card-title>
                       </v-list-item-content>
                   </v-list-item>

                   <v-divider class="ma-0" ></v-divider>
                   <v-list-item @click.stop="openProfileEdits">
                       <v-list-item-content class="pr-0 pl-0">
                           <v-card-title  class="justify-content-end pt-2 pr-0 pl-0 tabes" >{{$t('profile.settingsDashboard.Profile Edits')}}</v-card-title>
                       </v-list-item-content>
                   </v-list-item>

              <!--      <v-list-item @click.stop="">
                       <v-list-item-content >
                           <v-card-title  class="justify-content-end pt-2 tabes" >Help</v-card-title>
                       </v-list-item-content>
                   </v-list-item> -->
               </v-list-item-group>


       </v-navigation-drawer>

       <v-app-bar
               app
           color="#ffffff"
       >
           <v-app-bar-nav-icon @click.stop="drawerSettings = !drawerSettings" color="#E60000"></v-app-bar-nav-icon>
           <v-toolbar-title></v-toolbar-title>
           <div class="flex-grow-1"></div>
           <v-btn icon color="#E60000" @click="openEditHelpDialogNow">
               <v-icon color="#E60000">help</v-icon>
           </v-btn>
       </v-app-bar>
       <v-content class="pt-12">
           <v-container fluid  class="pr-0 pl-0">

               <v-layout justify-center align-center v-if="showIntro">
                   <v-card-title class=" text-align-center justify-center" style="word-break:normal;color:#c9c9c9;">
                       {{$t('profile.settingsDashboard.Choose tab to view more details')}}
                   </v-card-title>
               </v-layout>


<!--           business overview-->
           <v-card flat width="100%" height="500px" v-if="businessOverviewTab" color="white">
               <v-overlay
                       absolute
                       v-if="BusinessDataInFigures.length === 0"
               >
                   <v-layout
                           fill-height
                           align-center
                           justify-center
                           ma-0
                   >
                       <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
                   </v-layout>
               </v-overlay>
               <v-card-title >
                   {{$t('profile.settingsDashboard.Business in Figures')}}
               </v-card-title>
               <v-card-text >
                   <v-layout row wrap justify-center style="background-color: #ffffff"  >

                       <v-layout row wrap justify-center class="ma-1" v-for="(index,i) in BusinessDataInFigures" :key="i">
                       <v-card elevation="0" width="150px" color="white">
                       <v-card-text class=" counter-number">
                           {{index.number === null ? 0 : index.number}}
                       </v-card-text>
                       <v-card-text class="font-weight-bold text-center" style="padding: 10px;">
                           {{$t(index.title)}}
                       </v-card-text>
                       </v-card>
<!--                           <v-divider-->
<!--                                   color="red"-->
<!--                                   vertical-->
<!--                                   :key="i"-->
<!--                                   v-if="i < BusinessDataInFigures.length -1"-->
<!--                           ></v-divider>-->
                       </v-layout>

                   </v-layout>
               </v-card-text>
           </v-card>

<!--           Activities-->
<!--           <v-card flat v-else-if="activitiesTab">-->
<!--               Activities-->
<!--           </v-card>-->

<!--           Transaction history-->
           <v-card flat v-else-if="transactionTab" width="100%">
               <!--                   overlay for data loading-->
               <v-overlay
                   absolute
                   :value="loadingTransaction"
               >
                   <v-layout
                       fill-height
                       align-center
                       justify-center
                       ma-0
                   >
                       <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
                   </v-layout>
               </v-overlay>
               <!--                   /////////////////-->
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
                       <tr v-for="item in transaction" :key="item.name">
                           <td>{{ item.name}}</td>
                           <td>{{ item.created_at}}</td>
                           <td>{{ item.cost}}</td>

                       </tr>
                       <tr v-if="transaction.length ===0">
                           <td colspan="3" style="text-align: center;">
                               {{$t('registration.personalProfileRegisteration.No Data')}}
                           </td>
                       </tr>
                       </tbody>
                   </template>
               </v-simple-table>
           </v-card>
<!--           Bookmarked-->

               <v-card flat width="100%"    color="#f2f2f2" v-else-if="bookmarkedTab">
<!--                   overlay for data loading-->
                   <v-overlay
                       absolute
                       :value="loadingBookmarked"
                   >
                       <v-layout
                           fill-height
                           align-center
                           justify-center
                           ma-0
                       >
                           <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
                       </v-layout>
                   </v-overlay>
                   <!--                   /////////////////-->
                   <v-tabs

                           color="#E60000"
                           active-class="clicked-tab"
                           v-model="bookmarkedInTabs"
                           slider-color="transparent"
                           background-color="transparent"
                   >
                       <v-tab

                       >
                           {{$t('profile.settingsDashboard.Enterprises')}}
                       </v-tab>
                       <v-tab
                       >
                           {{$t('profile.settingsDashboard.Professionals')}}
                       </v-tab>





                       <v-tab-item

                       >
                           <v-card flat>
                               <v-simple-table fixed-header height="400px">
                                   <template v-slot:default>
                                       <thead>
                                       <tr>
                                           <th>{{$t('profile.settingsDashboard.Company name')}}</th>
                                           <th>{{$t('profile.settingsDashboard.Business Sector')}}</th>

                                       </tr>
                                       </thead>
                                       <tbody>
                                       <tr v-for="item in company" :key="item.name">
                                           <td>{{ item.name }}</td>
                                           <td>{{ item.businesscategory }}</td>
                                       </tr>

                                       <tr v-if="company.length ===0">
                                           <td colspan="3" style="text-align: center;">
                                               {{$t('registration.personalProfileRegisteration.No Data')}}
                                           </td>
                                       </tr>
                                       </tbody>
                                   </template>
                               </v-simple-table>
                           </v-card>
                       </v-tab-item>
                       <v-tab-item
                       >
                           <v-card flat>
                               <v-simple-table fixed-header height="400px">
                                   <template v-slot:default>
                                       <thead>
                                       <tr>
                                           <th>{{$t('profile.settingsDashboard.Company name')}}</th>
                                           <th>{{$t('profile.settingsDashboard.Business Sector')}}</th>

                                       </tr>
                                       </thead>
                                       <tbody>
                                       <tr v-for="item in  individual" :key="item.name">
                                           <td>{{ item.name }}</td>
                                           <td>{{ item.businesscategory }}</td>
                                       </tr>

                                       <tr v-if="individual.length ===0">
                                           <td colspan="3" style="text-align: center;">
                                               {{$t('registration.personalProfileRegisteration.No Data')}}
                                           </td>
                                       </tr>
                                       </tbody>
                                   </template>
                               </v-simple-table>
                           </v-card>
                       </v-tab-item>
                       <v-tab-item
                       >
                           <v-card flat>
                               <v-card-text>
                                   wallet
                               </v-card-text>
                           </v-card>
                       </v-tab-item>

                   </v-tabs>
               </v-card>

<!--           Profile edits-->
           <v-card flat v-else-if="profileEdits" width="100%" style="background-color: #ffffff">
 <v-form
        ref="form"


      >
               <v-card-title >
                   {{$t('personalProfile.settings-view.Basic Info')}}
               </v-card-title>


                   <v-container fluid grid-list-md>
               <v-layout row wrap  style="background-color: #ffffff">
                   <v-flex d-flex xl2 lg3 xs10  style="background-color: #ffffff; ">

                       <v-layout row wrap  style="background-color: #ffffff">
                           <v-text-field
                                   v-model="userbusinessName"

                               style="border-radius: 30px; margin-right:10px"
                                   :label="$t('registration.professionalRegisteration.Business Name')"
                                   counter="25"
                               color="#E60000"
                                   maxlength="25"
                                   :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' ),value => value.length <= 25 || $t('registration.signup.Maximum 25 characters'),value =>  /^(?:[a-zA-Z\s,\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,25}$/.test(value) || $t('registration.signup.Only Alphabetical Letters') ]"

                           ></v-text-field>

                           <v-autocomplete
                               v-model="userbusinessCountry"
                               :items="userbusinessCountryitems"
                               :menu-props="{maxHeight: 200}"


                               style="border-radius: 30px; margin-right:10px"
                               :label="$t('registration.personalProfileRegisteration.country')"
                               color="#E60000"
                               :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                               :return-object="true"
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
                           </v-autocomplete>



                       </v-layout>

                   </v-flex>
                   <v-flex d-flex xl2 lg3 xs10  style="background-color: #ffffff; ">
                       <v-layout row wrap  style="background-color: #ffffff">

                           <v-combobox
                               v-model="selectedSector"
                               :items="businessSectors"
                               style="border-radius: 30px; margin-right:10px"
                               :label="$t('registration.professionalRegisteration.Choose Your Business Category')"
                               :menu-props="{maxHeight: 200}"
                               color="#E60000"
                               :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
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


                       </v-layout>


                   </v-flex>




                   </v-layout>
                       <v-layout row wrap>
                           <v-flex xl2 lg3 xs12>
                           <v-textarea
                                   v-model="userLocation"
                                   style="border-radius: 30px; margin-right:10px"
                                   :label="$t('registration.professionalRegisteration.Location')"

                                   color="#E60000"
                                   auto-grow
                                   row="2"
                                   :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                           ></v-textarea>
                           </v-flex>

                           <v-flex xl2 lg3 xs12>
                               <v-textarea
                                       v-model="description"
                                       :rules="[value=>!!value || $t( 'registration.professionalRegisteration.required'), value => value.length > 25 || $t( 'registration.professionalRegisteration.Minimum 25 characters')]"
                                       :label="$t('registration.professionalRegisteration.Description')"
                                       color="#E60000"
                                       counter="200"
                                       auto-grow
                                       maxlength="200"
                               ></v-textarea>
                           </v-flex>
                       </v-layout>

                   </v-container>
               <v-divider dark></v-divider>
               <v-container fluid grid-list-md>
               <v-layout row wrap  style="background-color: #ffffff">


                   <v-flex d-flex xl4 lg6 xs12  style="background-color: #ffffff; ">
                       <v-layout row wrap  style="background-color: #ffffff">
                           <!--                       ///////////div for image input-->
                           <div style="text-align: center;width: fit-content;margin: auto">
                               <header style="font-size: 16px;color: #979797;"> {{$t('registration.personalProfileRegisteration.Upload new Image')}}</header>

                               <v-hover>
                                   <v-img
                                           slot-scope="{ hover }"
                                           class="img-selection"
                                           height="120" width="120"
                                           :src="imgSrc"
                                           @click="$refs.fileInput.click()"
                                   >
                                       <v-fade-transition name="fade">

                                           <div

                                                   v-if="hover"
                                                   class="d-flex fade-transition v-card--reveal display-5 white--text hover-upload"
                                           >
                                               <v-layout row wrap justify-center align-center>
                                                   <div>
                                                       <v-icon size="30" color="white">mdi-upload</v-icon>
                                                       <v-card-text class="pa-0" style="font-size: 12px !important;">
                                                           {{$t('registration.personalProfileRegisteration.Upload Image')}}
                                                       </v-card-text>
                                                       <input alt="image" style="display: none" ref="fileInput" type="file" accept="image/*" @change="onImageChange">
                                                   </div>
                                               </v-layout>
                                           </div>
                                       </v-fade-transition>
                                   </v-img>
                               </v-hover>
                               <span style="color: red;font-size: 16px;" v-if="reqImage">{{errorImageMsg === 'image size' ? $t('registration.personalProfileRegisteration.image size') : errorImageMsg === 'only types' ? $t('registration.personalProfileRegisteration.only types') : ''}}</span>

                           </div>
                       </v-layout>
                   </v-flex>


               </v-layout>
               </v-container>
               <v-divider dark class="ma-2"></v-divider>
               <v-card-title >
                   {{$t('personalProfile.settings-view.Contact Info')}}
               </v-card-title>
   <v-layout row wrap >


                        </v-layout>
               <v-container fluid grid-list-md>

                   <v-layout row wrap  style="background-color: #ffffff">


                       <v-flex d-flex xl2 lg3 xs10  style="background-color: #ffffff;margin-bottom:15px;height: 40px;">
                           <v-layout row wrap >
          <vue-tel-input
                  style="direction: ltr"
                  :value="value"
                  :valid-characters-only="true"
                  :disabledFetchingCountry="false"
                  :placeholder="$t('registration.personalProfileRegisteration.phone number')"
                  @input="onInput"
          >
          </vue-tel-input>
                               <span v-if="showErrorPhone" style="color: red;font-size: 13px;margin-left: 10px;">
                                                        {{phoneValidation === 'repeated phone' ? $t('registration.personalProfileRegisteration.repeated phone') : phoneValidation === 'notvalid phone' ? $t('registration.personalProfileRegisteration.notvalid phone') : ''}}
                                                    </span>
                           </v-layout>
                       </v-flex>


                       <v-flex d-flex xl2 lg3 xs10  style="background-color: #ffffff; ">

                           <v-layout row wrap  style="background-color: #ffffff">
                               <v-text-field
                                   v-model="busniessemail"
                                   :label="$t('personalProfile.settings-view.Email Address')"
                                   color="#E60000"
                                   :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' ), value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || $t('registration.signup.emailvalid')]"
                                   :error-messages="errors !== '' ? $t(errors) : ''"
                                    @blur="checkEmail()"
                               >
                               </v-text-field>


                           </v-layout>

                       </v-flex>
                   </v-layout>
               </v-container>
               <v-card-title style="font-size: larger; padding-bottom: 0">
               <div >
                   {{$t('profile.settingsDashboard.Social Media')}}
               </div>
               </v-card-title>
               <v-container fluid grid-list-md >
                   <v-layout row wrap  style="background-color: #ffffff">

                           <v-flex d-flex xl2 lg4>
                           <v-text-field
                           v-model="facebook"
                                   prefix="www.facebook.com/"
                                   style="border-radius: 30px; margin-right:10px; width:230px;direction: ltr"
                                   label=""
                                   color="#E60000"
                           ></v-text-field>
                           </v-flex>
                               <v-flex d-flex xl2 lg4>
                       <v-text-field
                       v-model="twitter"
                               prefix="www.twitter.com/"

                               style="border-radius: 30px; margin-right:10px; width:230px;direction: ltr"
                               label=""
                               color="#E60000"

                       ></v-text-field>
                           </v-flex>
                   </v-layout>
                       <v-layout row wrap  style="background-color: #ffffff">
<!--                       <v-divider dark vertical class="ma-2"></v-divider>-->
                       <v-flex d-flex xl2 lg4>
                           <v-text-field
                            v-model="instagram"
                                   prefix="www.instagram.com/"
                                   style="border-radius: 30px; margin-right:10px; width:230px;direction: ltr"
                                   label=""
                                   color="#E60000"

                           ></v-text-field>
                       </v-flex>
                       <v-flex d-flex xl2 lg4>
                           <v-text-field
                            v-model="linkedin"
                                   prefix="www.linkedin.com/"
                                   style="border-radius: 30px; margin-right:10px; width:230px;direction: ltr"
                                   label=""
                                   color="#E60000"

                           ></v-text-field>
                       </v-flex>
                       </v-layout>
                           <v-layout row wrap  style="background-color: #ffffff">
<!--                       <v-divider dark vertical class="ma-2"></v-divider>-->
                       <v-flex d-flex xl2 lg4>
                           <v-text-field
                            v-model="behance"
                                   prefix="www.behance.net/"
                                   style="border-radius: 30px; margin-right:10px; width:230px;direction: ltr"
                                   label=""
                                   color="#E60000"

                           ></v-text-field>
                       </v-flex>
                           <v-flex d-flex xl2 lg4>
                           <v-text-field
                                    v-model="website"
                                   prefix="www."
                                   style="border-radius: 30px; margin-right:10px; width:230px;direction: ltr"
                                   label=""
                                   color="#E60000"
                           ></v-text-field>
                       </v-flex>
<!--                       <v-divider dark vertical class="ma-2"></v-divider>-->
                   </v-layout>

<!--                   overlay for data loading-->
                   <v-overlay
                           absolute
                           :value="loading"
                           z-index="1"
                   >
                       <v-layout
                               fill-height

                               ma-10
                       >
                           <v-progress-circular size="40" indeterminate  color="#E60000"></v-progress-circular>
                       </v-layout>
                   </v-overlay>
<!--                   /////////////////-->
                   <v-layout row wrap  style="background-color: #ffffff; justify-content: flex-end">
                   <v-btn
                           rounded
                           @click="SaveProfileData()"
                           color="#E60000"
                           text
                           style="font-weight: 600;"
                   >
                       {{$t('profile.settingsDashboard.save changes')}}
                   </v-btn>
                   </v-layout>
               </v-container>
             </v-form>
           </v-card>
           </v-container>
       </v-content>
       <help-ticket-dialog :editHeplDialog="EditHelpDialog" @closeEditHelpDialog="closeEditHelpDialog"></help-ticket-dialog>
   </v-app>
</template>

<script>
    import userInfoMixin from "../userInfoMixin";
    import HelpTicketDialog from "../help-component/helpTicketDialog";
    import { VueTelInput } from 'vue-tel-input';

    export default {
        name: "settingsDashboard",
        components: {HelpTicketDialog,
                        VueTelInput,
},

        mixins: [userInfoMixin],
        data: () => {
            return {
                loading: true,
                phone: {
        number: '',
        valid: true,
        country: undefined,
      },
                showErrorPhone:false,
                hasErrorActive: false,
                tele:'',
                logoimage:'',
                value:'',
                viewNoData:false,
                loadingBookmarked:true,
                loadingTransaction:true,
                model: '',
                bookmarkedInTabs: 0,
                drawerSettings: null,
                showIntro: true,
                businessOverviewTab: false,
                activitiesTab: false,
                transactionTab: false,
                bookmarkedTab: false,
                profileEdits: false,
                businessSectors: [],
                busniessemail:'',
                facebook:'',
                instagram:'',
                twitter:'',
                behance:'',
                linkedin:'',
                website:'',
                description: '',
                rules:{
                    imageSize: value => !value || value.size < 2000000 || 'Slider image size should be less than 2 MB!',





                },
                                 emailRules: [
             (v) => !!v || 'E-mail is required',
             (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
                BusinessDataInFigures: [],
                individual: [],
                company: [],
                transaction: [],
                EditHelpDialog: false,


                userInfoForEdit: '',

                userbusinessName: "",
                userbusinessCountry:"",
                userLocation: "",
                selectedSector: "",
                userbusinessCountryitems:[],
                errors:'',
                id:'',
                errorimage:'',
                rtlNav: false,

                imgSrc: '',
                reqImage:false,
                errorImageMsg:'',
                file: '',

                phoneValidation: '',

                contriesWithIds: [],

                businessSectorsWithIds:[],
                userbusinessCountryitemsWithIds: [],
            }
        },

        mounted() {
            this.rtlNav = this.$vuetify.rtl;
            this.$store.dispatch('AllBookmark', this.$route.params.id);
            this.$store.dispatch('AllTransaction', this.$route.params.id);
            this.$store.dispatch('AllCountry', {lang: this.$i18n.locale});
            this.$store.dispatch('AllBusinessCategory', {lang: this.$i18n.locale});
            this.$store.dispatch('AllProducts', this.$route.params.id);
            this.$store.dispatch('Allservice', {id: this.$route.params.id, lang: this.$i18n.locale});
            this.$store.dispatch('Allreviwes', this.$route.params.id);

            this.$store.dispatch('userData', {id:this.$route.params.id, lang:this.$i18n.locale});
            // this.$store.dispatch('checkUserAuth', this.$route.params.id);





        },
        computed: {
            getUserData() {
                return this.$store.getters.getUserData;
            },
            checkUserAuth() {
                return this.$store.getters.getAuthFlag;
            },
            getAllBookmark() {
                return this.$store.getters.getAllBookmark;
            },
            getAllTransaction() {
                return this.$store.getters.getAllTransaction;
            },
            getAllCountry() {
                return this.$store.getters.getAllCountry;
            },
            getAllBusinessCategory() {
                return this.$store.getters.getAllBusinessCategory;
            },
              getAllservice(){
                return this.$store.getters.getAllservice;
            },
            getAllProducts(){
                return this.$store.getters.getAllProducts;
            },
             getAllreviwes(){
                return this.$store.getters.getAllreviwes;
            },

            getRtl(){
                return this.$vuetify.rtl;
            }

        },
        watch: {
            '$route' (from, to){
                this.$store.dispatch('AllCountry', {lang: from.params.lang});
                this.$store.dispatch('AllBusinessCategory', {lang: from.params.lang});
                this.$store.dispatch('userData', {id:from.params.id, lang: from.params.lang});
                this.$store.dispatch('checkUserAuth', from.params.id);
            },
            getRtl(flag){
                this.rtlNav = flag;
            },
                getUserData(data) {
                    this.loading = true;
                if (data) {
                  this.id=data.id;
                    this.userbusinessName = data.business_name;
                    this.userLocation = data.street;
                    this.selectedSector = data.business_category;
                    this.userbusinessCountry = data.primary_country;
                    this.busniessemail = data.business_email;

                    this.linkedin=data.linkdin;
                    this.instagram=data.instgram;
                    this.facebook=data.facebook;
                    this.behance=data.behance;
                    this.website=data.website;
                    this.twitter=data.twitter;
                   this.value= data.business_tele;
                   this.description = data.business_description;

                    this.imgSrc = '/images/med/'+data.business_logo;
                  if(data.business_size !== null){
                      this.BusinessDataInFigures.push({number:data.business_size,title:'profile.settingsDashboard.Company Size'});
                  }
                    if(data.recommended !== null) {
                        this.BusinessDataInFigures.push({number:data.recommended,title:'profile.settingsDashboard.Recommanded'});
                    }

                  this.BusinessDataInFigures.push({number:data.viewers,title:'profile.settingsDashboard.Total Tarffic(Views)'});
                  this.BusinessDataInFigures.push({number:data.bookmarked_total,title:'profile.settingsDashboard.Bookmarked'});
                     this.BusinessDataInFigures.push({number:data.reported_total,title:'profile.settingsDashboard.Reported'});

                    this.loading = false;
                }

            },

            getAllBookmark(bookmark) {


                if (bookmark) {



                    for (let i in bookmark.allbusinessbookmarkedindividual) {

                        this.individual.push(bookmark.allbusinessbookmarkedindividual[i]);
                    }
                    for (let i in bookmark.allbusinessbookmarkedcompany) {

                        this.company.push(bookmark.allbusinessbookmarkedcompany[i]);
                    }
                    this.loadingBookmarked=false;

                }
                if(bookmark){
                    this.viewNoData = true;
                }
            },


            getAllTransaction(transaction) {
                if (transaction) {
                    for (let i in transaction) {
                        this.transaction.push(transaction[i]);
                    }
                    this.loadingTransaction=false;
                }
            },

            getAllCountry(country) {

                if (country) {
                    for (let i in country) {
                        this.userbusinessCountryitems.push(country[i].name);
                        this.userbusinessCountryitemsWithIds.push(country[i]);
                    }
                    // this.userbusinessCountryitems.reverse();
                }
            },
            getAllBusinessCategory(business) {

                if (business) {
                    for (let i in business) {
                        this.businessSectors.push(business[i].name);
                        this.businessSectorsWithIds.push(business[i]);
                    }
                }
            },
       getAllservice(service){


      if(service.length !==0) {

      this.BusinessDataInFigures.push({number:service.length,title:'profile.settingsDashboard.Total Service'});

            }
        },

 getAllProducts(products) {
     if (products) {

         this.BusinessDataInFigures.push({
             number: products.products.length,
             title: 'profile.settingsDashboard.Total Products'
         });


     }
 },
           getAllreviwes(reviews){


                if(reviews.reviews.length !== 0) {
                    this.BusinessDataInFigures.push({
                        number: reviews.reviews.length,
                        title: 'profile.settingsDashboard.Reviews'
                    });


                }

            },
        },


            methods: {
                onImageChange(e){
                    this.reqImage =false;
                    this.file = e.target.files[0];
                    let FileSize = this.file.size / 1024 / 1024;
                    let acceptedImageTypes = [ 'image/jpeg', 'image/png'];
                    if (FileSize > 2) {
                        this.errorImageMsg = 'image size';
                        this.reqImage =true;
                        this.imgSrc = '/images/imagePlaceholder.png';
                    }
                    else  if(!acceptedImageTypes.includes(this.file.type))
                    {
                        this.errorImageMsg = 'only types';
                        this.reqImage =true;
                        this.imgSrc = '/images/imagePlaceholder.png';
                    } else {
                        this.errorImageMsg='';
                        this.imgSrc = URL.createObjectURL(this.file);
                    }

                },
         routeToProfile() {
                    this.$router.push({
                        name: 'companyProfile',
                        params: {id: this.$route.params.id, lang: this.$i18n.locale}
                    });
                },
                openBoverView() {
                    this.showIntro = false;
                    this.businessOverviewTab = true;
                    this.activitiesTab = false;
                    this.transactionTab = false;
                    this.bookmarkedTab = false;
                },
                openActivities() {
                    this.showIntro = false;
                    this.businessOverviewTab = false;
                    this.activitiesTab = true;
                    this.transactionTab = false;
                    this.bookmarkedTab = false;
                    this.profileEdits = false;
                },
                openTransaction() {
                    this.showIntro = false;
                    this.businessOverviewTab = false;
                    this.activitiesTab = false;
                    this.transactionTab = true;
                    this.bookmarkedTab = false;
                    this.profileEdits = false;
                },
                openBookmarked() {
                    this.showIntro = false;
                    this.businessOverviewTab = false;
                    this.activitiesTab = false;
                    this.transactionTab = false;
                    this.bookmarkedTab = true;
                    this.profileEdits = false;
                },
                openProfileEdits() {
                    this.showIntro = false;
                    this.businessOverviewTab = false;
                    this.activitiesTab = false;
                    this.transactionTab = false;
                    this.bookmarkedTab = false;
                    this.profileEdits = true;
                },

                openEditHelpDialogNow() {
                    this.EditHelpDialog = true;
                },
                closeEditHelpDialog() {
                    this.EditHelpDialog = false;
                },
                getCode(payload){

                this.countryCode=payload.countryCode;;

            },
            checkEmail(){

        axios.post('/vue/checkemailsetting',{id:this.id,email:this.busniessemail}).then(valid => {

          if(valid.data === false){
              this.errors = 'registration.professionalRegisteration.this email already taken!'

        }
        else
        {
            this.errors = ''

        }
        })

            },
            SaveProfileData()
            {

                this.BusinessDataInFigures = [];



                      this.$store.commit('setClearAppMsgs');

                      if(this.phone.number=='')
                      {
                         this.tele=this.value
                      }
                      else
                      {   this.tele=this.phone.number

                      }

                      if (this.$refs.form.validate() && this.errors=='' && this.errorimage=='' && this.phone.valid && this.showErrorPhone==false) {
                          let country_id = this.userbusinessCountryitemsWithIds.find(id => id.name === this.userbusinessCountry);
                          let businesscategoryselected_id = this.businessSectorsWithIds.find(id => id.name === this.selectedSector);
                          this.$store.dispatch('saveProfileEditData', {
                              slug: this.$route.params.id,
                              image: this.file,
                             name:this.userbusinessName,
                             country: country_id.country_id,
                             businesscategory: businesscategoryselected_id.id,
                             description: this.description,
                              userLocation:this.userLocation,
                              phone:this.tele,
                              busniessemail:this.busniessemail,
                              facebook:this.facebook,
                              instagram:this.instagram,
                              twitter:this.twitter,
                              behance:this.behance,
                              linkedin:this.linkedin,
                              website:this.website,
                              lang: this.$i18n.locale




                          });

                      } else {
                          this.$store.commit('setAppMsgs', {
                              msg: "Please Fill all inputs And Check Telephone!",
                              color: "info",
                              icon: ""
                          })
                      }

            },
            onInput(formattedNumber, { number, valid, country }) {
      this.phone.number = number.international;
      this.phone.valid = valid;
      this.phone.country = country && country.name;
      if(this.phone.valid)
      {
          axios.post('/vue/checknumbervalid',{phone:this.phone.number,id:this.id}).then(valid => {

              if(valid.data === false){

                  this.showErrorPhone=true;
              }
              else
              {
                  this.showErrorPhone=false;
              }
          });
      }
      else
      {
this.showErrorPhone=true;
      }




    }

            }
    }
</script>

<style scoped>
>>>.tabes{
    font-size: larger !important;
}
    >>>.list-title{
        justify-content: flex-end;
        height: 110px;
        color: #636363;
        padding-right: 16px;
    }

    >>>.counter-number{
        text-align: center;
        color:#E60000 !important;
        font-weight: 600;
        padding-bottom: 0;
        font-size: 20px !important;
    }
>>>tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
}
>>>.v-tabs-bar {
    z-index: 0 !important;
}

/*/////////// styling for vue-tel-input//////////*/
>>>.vue-value-number-input .select-country-container .input-country-selector input {
    border-radius: 30px 0 0 30px!important;
}
>>>.vue-value-number-input .input-value-number input {
    margin-left: 0 !important;
    border-radius: 0 30px 30px 0!important;
}
>>>.dropdown ul{
    display: block ;
}
>>>.dropdown-item:hover {
    background-color: #e2e2e2 !important;
    color: #000000 !important;
}
>>>.vue-tel-input[data-v-32fdfc12]:focus-within {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 5px rgba(233, 102, 102, 0.6);
    border-color: #e60000;
}
>>>.vue-tel-input {
    display: flex;
    border: 1px solid #919191 !important;
    text-align: left;
    border-radius: 0px !important;
    font-size: 11px !important;
    direction: ltr !important;
    width: 84%;
}
>>>div.vue-tel-input ul{
    z-index: 1;
    padding: 0;
    margin: 0;
    text-align: left;
    list-style: none;
    max-height: 200px;
    overflow-y: scroll;
    position: absolute;
    top: 33px;
    left: -1px;
    background-color: #fff;
    width: 226px !important;
    font-size: 13px;
    box-shadow: 0 2px 2px 2px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)
}
>>>.dropdown-item {
    background-color: #f9f9f9 !important;
    color: #535353 !important;
    border-bottom: 0px solid #61606057 !important;
    text-align: left !important;
    transition: 0.2s !important;
    cursor: pointer;
    padding: 7px 7px !important;
    width: 410px !important;
    font-weight: 100;
}
>>>.vue-tel-input {
    border-radius: 3px;
    display: flex;
    border: 1px solid #ffffff;
    text-align: left;
    height: 34px;
}
>>>.error-vue-tel-input{
    border: 1px solid red;
}
/*///////////end/////////*/
>>>.v-app-bar.v-app-bar--fixed {
    position: absolute !important;
    top: 0;
    z-index: 5;
}
>>>.v-navigation-drawer--fixed {
    position: absolute !important;
}
/*>>>.v-text-field input {*/
/*    flex: 1 1 auto;*/
/*    line-height: 20px;*/
/*    padding: 0px 0;*/
/*    max-width: 100%;*/
/*    min-width: 0px;*/
/*    width: 100%;*/
/*}*/
>>>.img-selection{
    border-radius: 50%;
    cursor: pointer;
    margin: auto;
    background-color: #f1f1f1;
}
>>>.hover-upload{
    height: 100%;
    text-align: center;
    border-radius: 50%;
    background-color: rgba(255, 0, 0, 0.3);
    border:2px #E60000 solid;
}
</style>

