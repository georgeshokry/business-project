<template>
    <v-card flat>
        <div>
        <div class=" pa-3 headline-certificat" style="text-align: initial;border-radius: 0;top: 0;position: sticky;z-index:10">
            <div style="margin-bottom: 0;">{{$t('personalProfile.profile-view.Certification')}}</div>
        </div>
        <v-skeleton-loader
                v-if="loadingProfileCert"
                type="article"
                class="ma-2"
        ></v-skeleton-loader>
        <v-layout row wrap v-for="(item,i,h) in cert"  :key="h" >
        <v-card-title class="cert-title">
            <div :key="h" v-if="!editTitle" >{{item.title}}</div>
            <div v-if="authFlagForEdit">
                <v-btn :key="h" color="#E60000" icon  @click="deleteCert(item.id)">
                    <v-icon color="#E60000">
                        clear
                    </v-icon>
                </v-btn>
                <v-btn icon color="#E60000" :key="h"  @click="openEditCert(item.id, item.title, item.field, item.fromyear, item.toyear,item.desc)">
                    <v-icon color="#E60000">
                        edit
                    </v-icon>
                </v-btn>

            </div>
        </v-card-title>
        <v-card-text>
            <v-layout row wrap class="pa-3">
                <v-flex lg2 md2 xs4 >
                    <v-layout row wrap class="mb-1">
                    <div>
                        <strong>{{$t('personalProfile.profile-view.Field of study')}}</strong>
                    </div>
                    </v-layout>
                    <v-layout row wrap class="mb-1">
                        <div>
                        <strong>{{$t('personalProfile.profile-view.Time Period')}}</strong>
                    </div>
                    </v-layout>
                    <v-layout row wrap class="mb-1" >
                        <div>
                            <strong>{{$t('personalProfile.profile-view.Description')}}</strong>
                        </div>
                    </v-layout>
                </v-flex>
                <v-flex lg6 xs5>
                    <v-layout row wrap class="mb-1">
                        <div>
                            <span  >{{item.field}}</span>

                        </div>
                    </v-layout>
                    <v-layout row wrap class="mb-1">
                        <div>
                            <span  >{{item.fromyear}}-</span>
                        </div>
                        <div>
                            <span  >{{item.toyear}}</span>
                        </div>
                    </v-layout>
                    <v-layout row wrap class="mb-1" style="text-align: initial;">
                        <div>
                            <span  >{{item.desc}}</span>

                        </div>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-divider  v-if="i !== cert.length-1" class="ma-0"></v-divider>
        </v-card-text>

        </v-layout>
        </div>



        <v-btn depressed style="width: 100%;border-radius: 0" @click="newCertDialog=true" v-if=" authFlagForEdit && cert.length< 3 ">{{$t('personalProfile.profile-view.Add new Certificate')}}</v-btn>
<!--        Employment History-->

        <div >
        <div class=" pa-3 headline-certificat" style="text-align: initial;top: 0;position: sticky;z-index:10">
            <div style="margin-bottom: 0;">{{$t('personalProfile.profile-view.Employment History')}}</div>
        </div>
            <v-skeleton-loader
                    v-if="loadingProfileEmp"
                    type="article"
                    class="ma-2"
            ></v-skeleton-loader>
        <v-layout row wrap   v-for="(emp,e) in employmenthistory"  :key="e">
            <v-card-title class="cert-title" >
                <div>{{emp.position}}</div>

                <div v-if="authFlagForEdit">
                    <v-btn icon>
                        <v-icon color="#E60000" @click="deleteEmp(emp.id)">
                            clear
                        </v-icon>
                    </v-btn>
                    <v-btn icon :key="e"  @click="openEditEmployment(emp.id, emp.position, emp.company, emp.fromyear, emp.toyear)">
                        <v-icon color="#E60000">
                            edit
                        </v-icon>
                    </v-btn>
                </div>
            </v-card-title>
            <v-card-text>
                <v-layout row wrap class="pa-3">
                    <v-flex lg2 md2 xs4 >
                        <v-layout row wrap class="mb-1">
                            <div>
                                <strong>{{$t('personalProfile.profile-view.Position')}}</strong>
                            </div>
                        </v-layout>
                        <v-layout row wrap class="mb-1">
                            <div>
                                <strong>{{$t('personalProfile.profile-view.Company')}}</strong>
                            </div>
                        </v-layout>
                        <v-layout row wrap class="mb-1" >
                            <div>
                                <strong>{{$t('personalProfile.profile-view.Duration')}}</strong>
                            </div>
                        </v-layout>
                    </v-flex>
                    <v-flex lg6 xs5>
                        <v-layout row wrap class="mb-1">
                            <div>
                                <span>{{emp.position}}</span>
                            </div>
                        </v-layout>
                        <v-layout row wrap class="mb-1">
                            <div>
                                <span>{{emp.company}}</span>
                            </div>
                        </v-layout>
                        <v-layout row wrap class="mb-1" >
                            <div>
                                <span>{{emp.fromyear}}-{{emp.toyear}}</span>
                            </div>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-divider   v-if="e !== employmenthistory.length-1" class="ma-0"></v-divider>
            </v-card-text>



        </v-layout>
        </div>
        <v-btn depressed style="width: 100%;border-radius: 0px;"
         @click="newEmpDialog=true" v-if="authFlagForEdit && employmenthistory.length < 3">{{$t('personalProfile.profile-view.Add new Job Title')}}</v-btn>
<!--        Business Interests-->
        <div class=" pa-3 headline-certificat ">
            <v-layout row wrap justify-space-between>
                <div class="headline-certificat" style="text-align: initial">
                    <div style="margin-bottom: 0;">{{$t('personalProfile.profile-view.Business Interests')}}</div>
                </div>
            <v-btn icon small color="#E60000"  v-if="authFlagForEdit && !loadingProfileInt" @click="newInterestDialog=true">
                <v-icon color="#E60000">
                    edit
                </v-icon>
            </v-btn>
            </v-layout>
        </div>

        <v-layout
                v-if="loadingProfileInt"
                fill-height
                align-center
                justify-center
                ma-3
        >
            <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
        </v-layout>
            <v-sheet
                    elevation="0"
            >



                <v-slide-group
                        v-model="model"
                        show-arrows
                        prev-icon="arrow_left"
                        next-icon="arrow_right"
                >


                    <v-slide-item
                            v-for="(inter, q) in memberInterest"
                            :key="q"
                    >

                        <v-card
                                elevation="0"
                                active-class="active-product"
                                class="ma-2 round-products"
                                max-height="110"
                                max-width="110"
                                style="text-align: center;"
                        >
                            <v-responsive>
                                <img
                                        height="65"
                                        width="65"
                                        :src="inter.icon"

                                >
                            </v-responsive>
                            <v-card-text class="pa-0 ma-0 " style="color:#E60000;">
                                {{inter.title}}
                            </v-card-text>
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>

        <!--        Hobbies-->
        <div class=" pa-3 headline-certificat ">
            <v-layout row wrap justify-space-between>
                <div class="headline-certificat" style="text-align: initial">
                    <div style="margin-bottom: 0;">{{$t('personalProfile.profile-view.Hobbies')}}</div>
                </div>
                <v-btn icon color="#E60000" small  v-if="authFlagForEdit && !loadingProfileHob" @click="newHobbiesDialog = true">
                    <v-icon color="#E60000">
                        edit
                    </v-icon>
                </v-btn>
            </v-layout>
        </div>
        <v-layout
                v-if="loadingProfileHob"
                fill-height
                align-center
                justify-center
                ma-3
        >
            <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
        </v-layout>
            <v-sheet
                    elevation="0"
            >



                <v-slide-group
                        v-model="model"
                        show-arrows
                        prev-icon="arrow_left"
                        next-icon="arrow_right"
                >


                    <v-slide-item
                            v-for="(hobbi, j) in memberHobbies"
                            :key="j"

                    >

                        <v-card
                                elevation="0"
                                active-class="active-product"
                                class="ma-2 round-products"
                                max-height="110"
                                max-width="110"
                                style="text-align: center;"
                        >
                            <v-responsive>
                                <img
                                        height="65"
                                        width="65"
                                        :src="hobbi.icon"

                                >
                            </v-responsive>
                            <v-card-text class="pa-0 ma-0 " style="color: red;">
                                {{hobbi.title}}
                            </v-card-text>
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
<!--        //////////////////////////////////////////////////////////////////-->
            <!-------  dalog for add new interest-->
            <v-dialog
                persistent
                v-model="newInterestDialog"
                scrollable
                max-width="350"
            >
            <v-card height="fit-content">
                <v-card-title class=" justify-space-between" >

                    {{$t('personalProfile.profile-view.Add new Interest')}}
                    <v-btn icon color="#E60000" @click="newInterestDialog= false">
                        <v-icon color="#E60000" small >close</v-icon>
                    </v-btn>
                </v-card-title>

        <v-form ref="interestForm" >
            <v-card-text >
            <v-autocomplete
                    :menu-props="{maxHeight: 200}"
                    v-model="InterestSelected"
                    color="#E60000"
                    :items="selectInterest"
                    :label="$t('personalProfile.profile-view.Select Hobbies')"
                    multiple
                    :rules="[ value => !!value || $t('registration.professionalRegisteration.required'), value => value.length < 11 || $t('personalProfile.profile-view.Maximum 10 Interests') ]"
                    counter="10"


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
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>

                <v-btn
                        color="#E60000"
                        text
                        @click="newInterestDialog = false"
                >
                    {{$t('profile.sliderProfile.Cancel')}}
                </v-btn>

                <v-btn
                        color="#E60000"
                        dark
                        elevation="0"
                        @click="SaveInterst()"
                >
                    {{$t('profile.sliderProfile.Save')}}
                </v-btn>
            </v-card-actions>
        </v-form>
            </v-card>
        </v-dialog>

        <!--        dialogs for all adding new hobby-->

        <v-dialog
                persistent
                v-model="newHobbiesDialog"
                scrollable
                max-width="350"
        >
            <v-card height="fit-content">
                <v-card-title class=" justify-space-between" >
                    {{$t('personalProfile.profile-view.Edit Hobbies')}}
                    <v-btn icon color="#E60000" @click="newHobbiesDialog= false">
                        <v-icon color="#E60000" small >close</v-icon>
                    </v-btn>
                </v-card-title>

        <v-form ref="hobbiesForm">
            <v-card-text >
            <v-autocomplete
                    v-model="hobbiesSelected"
                    color="#E60000"
                    :items="selectHobbies"
                    :label="$t('personalProfile.profile-view.Select Hobbies')"
                    multiple
                    :rules="[ value => !!value || $t('registration.professionalRegisteration.required'), value => value.length < 11 || $t('personalProfile.profile-view.Maximum 10 Hobbies') ]"
                    counter="10"
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
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>

                <v-btn
                        color="#E60000"
                        text
                        @click="newHobbiesDialog = false"
                >
                    {{$t('profile.sliderProfile.Cancel')}}
                </v-btn>

                <v-btn
                        color="#E60000"
                        dark
                        elevation="0"
                        @click="SaveHobbies()"
                >
                    {{$t('profile.sliderProfile.Save')}}
                </v-btn>
            </v-card-actions>
        </v-form>
            </v-card>
        </v-dialog>
        <v-dialog
                persistent
                v-model="newCertDialog"
                scrollable
                max-width="350"
        >
            <v-card     height="fit-content">

                <v-card-title class=" justify-space-between" >
                   {{$t('personalProfile.profile-view.New Certificate')}}
                    <v-btn icon color="#E60000" @click="newCertDialog= false">
                        <v-icon color="#E60000" small >close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-form ref="form">
                <v-card-text >

                        <v-text-field
                                v-model="newCertTitle"
                                :label="$t('personalProfile.profile-view.Write New Title')"
                                color="#E60000"
                                counter="25"
                                maxlength="25"
                                :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                        >
                        </v-text-field>
                    <v-text-field
                            v-model="newFieldTitle"
                            :label="$t('personalProfile.profile-view.Field Of Study')"
                            color="#E60000"
                            counter="25"
                            maxlength="25"
                            :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                    >
                    </v-text-field>


                     <v-combobox
                               v-model="fromyear"
                               :items="yearsselect"
                               :label="$t('personalProfile.profile-view.From')"
                               color="#E60000"
                               :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                               :return-object="true"
                           >

                     </v-combobox>

                    <v-combobox
                               v-model="toyear"
                               :items="yearsselect"
                               :label="$t('personalProfile.profile-view.To')"
                               color="#E60000"
                               :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                               :return-object="true"
                    >

                    </v-combobox>

                    <v-textarea
                            v-model="newCertDesc"
                            :label="$t('personalProfile.profile-view.Description')"
                            color="#E60000"
                            counter="200"
                            maxlength="200"
                            :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                            row-height="2"
                            auto-grow
                    >

                    </v-textarea>
                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn
                            color="#E60000"
                            text
                            @click="newCertDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn
                            color="#E60000"
                            dark
                            elevation="0"
                            @click="AddCerticate()"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
            </v-form>
            </v-card>
        </v-dialog>
<!--        dialog for editing cert-->
        <v-dialog
                persistent
                v-model="editCertDialog"
                scrollable
                max-width="350"
        >
            <v-card height="fit-content">

                <v-card-title class=" justify-space-between" >
                   {{$t('personalProfile.profile-view.Edit Certificate')}}
                    <v-btn icon @click="editCertDialog= false">
                        <v-icon color="#E60000" small >close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-form ref="EditCertform">
                    <v-card-text>

                        <v-text-field
                                v-model="editCertTitle"
                                :label="$t('personalProfile.profile-view.Write New Title')"
                                color="#E60000"
                                counter="25"
                                maxlength="25"
                                :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' )]"

                        >


                        </v-text-field>
                        <v-text-field
                                v-model="editFieldTitle"
                                :label="$t('personalProfile.profile-view.Field Of Study')"
                                color="#E60000"
                                counter="25"
                                maxlength="25"
                                :rules="[ value=>!!value || $t( 'registration.professionalRegisteration.required' )]"

                        >

                        </v-text-field>


                        <v-combobox
                                v-model="editfromyear"
                                :items="yearsselect"


                                :label="$t('personalProfile.profile-view.From')"

                                color="#E60000"
                                :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                                :return-object="true"
                        ></v-combobox>

                        <v-combobox
                                v-model="edittoyear"
                                :items="yearsselect"
                                :label="$t('personalProfile.profile-view.To')"
                                color="#E60000"
                                :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                                :return-object="true"
                        ></v-combobox>

                        <v-textarea
                                v-model="editCertDesc"
                                :label="$t('personalProfile.profile-view.Description')"
                                color="#E60000"
                                counter="200"
                                maxlength="200"
                                :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                                row-height="2"
                                auto-grow

                        >

                        </v-textarea>
                    </v-card-text>

                    <v-card-actions>
                        <div class="flex-grow-1"></div>

                        <v-btn
                                color="#E60000"
                                text
                                @click="editCertDialog = false"
                        >
                            {{$t('profile.sliderProfile.Cancel')}}
                        </v-btn>

                        <v-btn
                                color="#E60000"
                                dark
                                elevation="0"
                                @click="editCerticate"
                        >
                            {{$t('profile.sliderProfile.Save')}}
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
<!--        <v-dialog-->
<!--                persistent-->
<!--                v-model="newJobDialog"-->
<!--        >-->
<!--        </v-dialog>-->
<!--        <v-dialog-->
<!--                persistent-->
<!--                v-model="newInterDialog"-->
<!--        >-->
<!--        </v-dialog>-->

        <!--        dialog for edditing employment history-->
        <v-dialog
                persistent
                v-model="editEmpDialog"
                scrollable
                max-width="350"
        >
            <v-card height="fit-content">

                <v-card-title class=" justify-space-between" >
                    {{$t('personalProfile.profile-view.Edit Employment History')}}
                    <v-btn icon color="#E60000" @click="editEmpDialog= false">
                        <v-icon color="#E60000" small >close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-form ref="EditEmpform">
                    <v-card-text>

                        <v-text-field
                                v-model="editEmpPosition"
                                :label="$t('personalProfile.profile-view.Write New position')"
                                color="#E60000"
                                counter="25"
                                maxlength="25"
                                :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"

                        >


                        </v-text-field>
                        <v-text-field
                                v-model="editEmpCompany"
                                :label="$t('personalProfile.profile-view.Name Of Company')"
                                color="#E60000"
                                counter="25"
                                maxlength="25"
                                :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"

                        >

                        </v-text-field>


                        <v-combobox
                                v-model="editEmpfromyear"
                                :items="yearsselect"


                                :label="$t('personalProfile.profile-view.From')"

                                color="#E60000"
                                :rules="[ value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                                :return-object="true"
                        ></v-combobox>

                        <v-combobox
                                v-model="editEmptoyear"
                                :items="yearsselect"
                                :label="$t('personalProfile.profile-view.To')"
                                color="#E60000"
                                :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                                :return-object="true"
                        ></v-combobox>


                    </v-card-text>

                    <v-card-actions>
                        <div class="flex-grow-1"></div>

                        <v-btn
                                color="#E60000"
                                text
                                @click="editEmpDialog = false"
                        >
                            {{$t('profile.sliderProfile.Cancel')}}
                        </v-btn>

                        <v-btn
                                color="#E60000"
                                dark
                                elevation="0"
                                @click="editEmp()"
                        >
                            {{$t('profile.sliderProfile.Save')}}
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>

          <!--        dialogs for all adding Employment History -->
        <v-dialog
                persistent
                v-model="newEmpDialog"
                scrollable
                max-width="400"
        >
            <v-card   height="fit-content">

                <v-card-title class=" justify-space-between" >
                    {{$t('personalProfile.profile-view.New Employment History')}}
                    <v-btn icon color="#E60000" @click="newEmpDialog= false">
                        <v-icon color="#E60000" small >close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-form ref="NewEmpform">
                <v-card-text >





                        <v-text-field
                                v-model="EmpPosition"
                                :label="$t('personalProfile.profile-view.Write New position')"
                                color="#E60000"
                                counter="25"
                                maxlength="25"
                                :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"

                        >


                        </v-text-field>
                    <v-text-field
                            v-model="EmpCompany"
                            :label="$t('personalProfile.profile-view.Name Of Company')"
                            color="#E60000"
                            counter="25"
                            maxlength="25"
                            :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"

                    >

                    </v-text-field>


                     <v-combobox
                               v-model="Empfromyear"
                               :items="yearsselect"


                               :label="$t('personalProfile.profile-view.From')"

                               color="#E60000"
                               counter="25"
                               maxlength="25"
                               :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                               :return-object="true"
                           >

                     </v-combobox>

                    <v-combobox
                               v-model=" Emptoyear"
                               :items="yearsselect"


                               :label="$t('personalProfile.profile-view.To')"

                               color="#E60000"
                               :rules="[value=>!!value||$t( 'registration.professionalRegisteration.required' )]"
                               :return-object="true"
                    >

                    </v-combobox>


                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn
                            color="#E60000"
                            text
                            @click="newEmpDialog = false"
                    >
                        {{$t('profile.sliderProfile.Cancel')}}
                    </v-btn>

                    <v-btn
                            color="#E60000"
                            dark
                            elevation="0"
                            @click="AddNewEmp()"
                    >
                        {{$t('profile.sliderProfile.Save')}}
                    </v-btn>
                </v-card-actions>
            </v-form>
            </v-card>
        </v-dialog>
<!--        <v-dialog-->
<!--                persistent-->
<!--                v-model="newJobDialog"-->
<!--        >-->
<!--        </v-dialog>-->
<!--        <v-dialog-->
<!--                persistent-->
<!--                v-model="newInterDialog"-->
<!--        >-->
<!--        </v-dialog>-->
    </v-card>
</template>

<script>
    import userInfoMixin from "../userInfoMixin"
    export default {
        name: "profile-view",
        mixins:[userInfoMixin],
        data:()=>{
            return{
                model:null,
                loadingProfileCert: true,
                loadingProfileEmp: true,
                loadingProfileInt: true,
                loadingProfileHob: true,
                editTitle:false,
                newCertDialog:false,
                newJobDialog:false,

                newInterDialog:false,
                newCertTitle:'',
                newFieldTitle:'',
                newCertPeriod: '',
                newCertDesc: '',
                fromyear:'',
                toyear:'',

                editCertDialog: false,
                editFieldTitle: '',
                editCertTitle: '',
                editCertDesc: '',
                editfromyear: '',
                edittoyear: '',
                certifcatid: '',

                rules: {
                    req: v => !!v || 'Required',
                    maxTitle: v => v.length <= 25 || 'Maximum 25 characters',
                    maxContent: v => v.length <= 200 || 'Maximum 200 characters',
                    maxItems: v => v.length < 10 || 'Maximum 10 items'
                },


                yearsselect:[],

                cert:[ ],
                employmenthistory:[],
                editEmpDialog:false,

                editEmpPosition: '',
                editEmpCompany: '',
                editEmpfromyear:'',
                editEmptoyear: '',
                editEmpid: '',
                newEmpDialog:false,
                EmpPosition: '',
                EmpCompany: '',
                Empfromyear:'',
                Emptoyear: '',

                newHobbiesDialog: false,


                memberInterest:[],
                selectHobbies:[

                ],
                hobbiesSelected:[],
                memberHobbies:[],

                searchHobbies: null,
                noData: true,
                newInterestDialog:false,
                searchInterest: null,
                InterestSelected:[],
                selectInterest:[],

                memberInterestWithIds:[],
                memberHobbiesWithIds:[],


            }
        },
        created() {
            for (let i = new Date().getFullYear(); i > 1970; i--) {
                this.yearsselect.push(i);

            }

            this.$store.dispatch('AllCertifications', this.$route.params.id);
            this.$store.dispatch('AllEmploymentHistory', this.$route.params.id);

            this.$store.dispatch('AllMemberInterest', {id: this.$route.params.id, lang: this.$i18n.locale});
            this.$store.dispatch('AllMemberHobbies', {id: this.$route.params.id, lang: this.$i18n.locale});
            this.$store.dispatch('MemberOwnInterest', {id: this.$route.params.id, lang: this.$i18n.locale});
            this.$store.dispatch('MemberOwnHobbies', {id: this.$route.params.id, lang: this.$i18n.locale});


        },
        computed:{
            getAllCertifications(){
                return this.$store.getters.getAllCertifications;
            },
            getAllEmploymentHistory(){
                return this.$store.getters.getAllEmploymentHistory;
            },
             getAllMemberInterest(){
                return this.$store.getters.getAllMemberInterest;
            },
             getAllMemberOwnInterest(){
                return this.$store.getters.getAllMemberOwnInterest;
            },
              getAllMemberHobbies(){
                return this.$store.getters.getAllMemberHobbies;
            },
             getAllMemberOwnHobbies(){
                return this.$store.getters.getAllMemberOwnHobbies;
            },
            getLocalLang(){
                return this.$i18n.locale;
            }

        },
        watch:{
            '$route'(from, to){

                this.selectHobbies = [];
                this.memberInterestWithIds = [];
                this.selectHobbies = [];
                this.memberHobbiesWithIds = [];
                this.hobbiesSelected = [];
                this.memberHobbies = [];
                this.hobbiesSelected=[];
                this.memberInterest = [];
                this.InterestSelected=[];

            },
            getLocalLang(lang){

                this.$store.dispatch('AllMemberInterest', {id: this.$route.params.id, lang: lang});
                this.$store.dispatch('AllMemberHobbies', {id: this.$route.params.id, lang: lang});
                this.$store.dispatch('MemberOwnInterest', {id: this.$route.params.id, lang: lang});
                this.$store.dispatch('MemberOwnHobbies', {id: this.$route.params.id, lang: lang});
            },
            getAllCertifications(certifications) {
                this.loadingProfileCert = true;
                this.cert = [];
                if (certifications) {

                    for (let i in certifications) {
                        this.cert.push({
                            title: certifications[i].certificate,
                            field: certifications[i].crtificat_from,
                            fromyear: certifications[i].from_year,
                            toyear: certifications[i].to_year,
                            desc: certifications[i].description,
                            id: certifications[i].id,
                        });
                    }
                    this.loadingProfileCert = false;
                }
            },
                getAllEmploymentHistory(employment) {
                    this.loadingProfileEmp = true;


                this.employmenthistory = [];
                if (employment) {
                    for (let i in employment) {
                        this.employmenthistory.push({
                            position: employment[i].position,
                            company: employment[i].company,
                            fromyear: employment[i].from_year,
                            toyear: employment[i].to_year,
                            id: employment[i].id,
                        });
                    }
                    this.loadingProfileEmp = false;
                }
            },
                 getAllMemberOwnInterest(interest) {
                     this.loadingProfileInt = true;
                this.memberInterest = [];
                this.InterestSelected=[];
                if (interest) {

                    for (let i in interest) {
                        this.memberInterest.push({
                            title: interest[i].title,
                            icon: interest[i].icon,
                        });
                        this.InterestSelected.push(interest[i].title);
                    }
                    this.loadingProfileInt = false;
                }
            },
              getAllMemberOwnHobbies(hobbies) {
                  this.loadingProfileHob = true;
                this.hobbiesSelected = [];
                this.memberHobbies = [];
                if (hobbies) {

                    for (let i in hobbies) {
                        this.memberHobbies.push({
                            title: hobbies[i].title,
                            icon: hobbies[i].icon,
                        });
                this.hobbiesSelected.push(hobbies[i].title);

                    }
                    this.loadingProfileHob = false;
                }
            },
              getAllMemberHobbies(allhobbies) {
                  console.log(allhobbies, "HOBB");
                this.selectHobbies = [];
                  this.memberHobbiesWithIds = [];
                if (allhobbies) {

                    for (let i in allhobbies) {
                        this.selectHobbies.push(
                        allhobbies[i].title,
                        );

                            this.memberHobbiesWithIds.push(allhobbies[i]);
                    }

                }


            },

                 getAllMemberInterest(allinterest) {

                this.selectInterest = [];
                this.memberInterestWithIds = [];
                if (allinterest) {

                    for (let i in allinterest) {
                        this.selectInterest.push(allinterest[i].title);
                        this.memberInterestWithIds.push(allinterest[i]);

                    }

                }


            },





        },
        methods:{
            deleteItem(index){
                this.cert.splice(index);
            },
            openEditCert(id, title, field, fromyear,toyear,desc){

                    this.editFieldTitle = field;
                    this.editCertTitle= title;
                    this.editCertDesc= desc;
                    this.editfromyear= fromyear;
                    this.edittoyear= toyear;
                    this.certifcatid = id;
                    this.editCertDialog= true;
            },



             AddCerticate(){
                 this.$store.commit('setClearAppMsgs');
                if (this.$refs.form.validate() && this.toyear > this.fromyear) {


                        this.$store.dispatch('AddCerticate', {
                            slug: this.$route.params.id,
                            title: this.newCertTitle,
                            field: this.newFieldTitle,
                            toyear:this.toyear,
                            fromyear:this.fromyear,
                            descraption:this.newCertDesc,


                        });
                         this.newCertTitle='';
                             this.newFieldTitle='';
                           this.toyear='';
                            this.fromyear='';
                            this.newCertDesc='';

                        this.newCertDialog = false;
                    this.$refs.form.reset();
                }else if( this.toyear <= this.fromyear ){
                    this.$store.commit('setAppMsgs', {
                        msg: "personalProfile.profile-view.Check From/To Dates!",
                        color: "info",
                        icon: "info"
                    });
                }
            },
            editCerticate() {
                this.$store.commit('setClearAppMsgs');
                if (this.$refs.EditCertform.validate() && this.edittoyear > this.editfromyear) {
                    this.$store.dispatch('editCerticate', {
                        slug: this.$route.params.id,
                        title: this.editCertTitle,
                        field: this.editFieldTitle,
                        toyear: this.edittoyear,
                        fromyear: this.editfromyear,
                        descraption: this.editCertDesc,
                        certifcatid:this.certifcatid,
                    });
                    this.editCertTitle = '';
                    this.editFieldTitle = '';
                    this.edittoyear = '';
                    this.editfromyear = '';
                    this.editCertDesc = '';

                    this.editCertDialog = false;
                    this.$refs.EditCertform.reset();
                }else if( this.edittoyear <= this.editfromyear ){
                    this.$store.commit('setAppMsgs', {
                        msg: "personalProfile.profile-view.Check From/To Dates!",
                        color: "info",
                        icon: "info"
                    });
                }
            },
               deleteCert(id){
                 this.$store.commit('setClearAppMsgs');
                 this.$store.dispatch('deleteCert', {
                slug: this.$route.params.id,
                certid: id
                    });
            },
                openEditEmployment(id, position, company, fromyear,toyear){

                    this.editEmpPosition = position;
                    this.editEmpCompany= company;
                    this.editEmpfromyear= fromyear;
                    this.editEmptoyear= toyear;
                    this.editEmpid = id;
                    this.editEmpDialog= true;
            },

            AddNewEmp(){
                                this.$store.commit('setClearAppMsgs');

                    if (this.$refs.NewEmpform.validate() && this.Emptoyear > this.Empfromyear) {
                    this.$store.dispatch('AddNewEmp', {
                            slug: this.$route.params.id,
                            position: this.EmpPosition,
                            company: this.EmpCompany,
                            toyear:this.Emptoyear,
                            fromyear:this.Empfromyear,



                        })
                         this.newCertTitle='';
                             this.EmpPosition='';
                           this.EmpCompany='';
                            this.Emptoyear='';
                            this.Empfromyear='';

                        this.newEmpDialog = false;
                        this.$refs.NewEmpform.reset();
                }else if(this.Emptoyear <= this.Empfromyear){
                    this.$store.commit('setAppMsgs', {
                        msg: "personalProfile.profile-view.Check From/To Dates!",
                        color: "info",
                        icon: "info"
                    });
                }

            },
               editEmp() {


                this.$store.commit('setClearAppMsgs');
                if (this.$refs.EditEmpform.validate() && this.editEmptoyear > this.editEmpfromyear) {
                    this.$store.dispatch('editEmp', {
                        slug: this.$route.params.id,
                        position: this.editEmpPosition,
                        company: this.editEmpCompany,
                        toyear: this.editEmptoyear,
                        fromyear: this.editEmpfromyear,
                        empid:this.editEmpid,
                    });
                    this.editEmpPosition = '';
                    this.editFieldTitle = '';
                    this.editEmptoyear = '';
                    this.editEmpfromyear = '';

                    this.editEmpDialog = false;
                    this.$refs.EditEmpform.reset();
                } else if(this.editEmptoyear <= this.editEmpfromyear){
                    this.$store.commit('setAppMsgs', {
                        msg: "personalProfile.profile-view.Check From/To Dates!",
                        color: "info",
                        icon: "info"
                    });
                }
            },
              deleteEmp(id){
                 this.$store.commit('setClearAppMsgs');
                 this.$store.dispatch('deleteEmp', {
                slug: this.$route.params.id,
                empid: id
                    });
            },
            SaveInterst(){
                 this.$store.commit('setClearAppMsgs');

                if (this.$refs.interestForm.validate() && this.InterestSelected.length <= 10 ) {

// console.log(this.InterestSelected,this.memberInterestWithIds,"george")
                    let InterestSelected_ids = [];
                    for(let i in this.InterestSelected){
                       let id = this.memberInterestWithIds.find(id => id.title === this.InterestSelected[i])
                        InterestSelected_ids.push(
                            id.interest_id
                        )
                    }
                    this.$store.dispatch('SaveInterst', {
                        id: this.$route.params.id,
                        interest: InterestSelected_ids,
                        lang: this.$i18n.locale,

                    });


                    this.newInterestDialog = false;
                    this.$refs.interestForm.reset();
                } else {
                    this.$store.commit('setAppMsgs', {
                        msg: "personalProfile.profile-view.Maximum 10 Interests",
                        color: "info",
                        icon: "info"
                    });
                }

            },
             SaveHobbies(){
                 this.$store.commit('setClearAppMsgs');
                if (this.$refs.hobbiesForm.validate()&& this.hobbiesSelected.length <= 10 ) {
                    let hobbiesSelected_ids = [];
                    for(let i in this.hobbiesSelected){
                        let id= this.memberHobbiesWithIds.find(id => id.title === this.hobbiesSelected[i]).interest_id
                        hobbiesSelected_ids.push(
                            id
                        )
                    }
                    this.$store.dispatch('SaveHobbies', {
                        id: this.$route.params.id,
                        hobbies: hobbiesSelected_ids,
                        lang: this.$i18n.locale,
                    });

                    this.newHobbiesDialog = false;
                    this.$refs.hobbiesForm.reset();
                } else {
                    this.$store.commit('setAppMsgs', {
                        msg: "personalProfile.profile-view.Maximum 10 Hobbies",
                        color: "info",
                        icon: "info"
                    });
                }

            },


        },


    }
</script>

<style scoped>
>>>.headline-certificat{
    background-color: #e0e0e0;
}
    >>>.cert-title{
        font-size: larger;
        width: 100%;
        justify-content: space-between;
    }

>>>.v-icon.v-icon {
    align-items: center;
    display: inline-flex;
    font-feature-settings: "liga";
    font-size: 24px;
    justify-content: center;

    line-height: 1;
    text-indent: 0;
    transition: .3s cubic-bezier(.25,.8,.5,1),visibility 0s;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #E60000 !important;
}
</style>
