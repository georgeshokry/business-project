<template>
    <v-card tile flat>
        <v-card-title class=" font-weight-bold justify-space-between">
            <div >{{$t('profile.services.Services')}} <span style="color: red" v-if="authFlagForEditServices">*</span></div>
            <v-btn icon color="#E60000" @click="editField = !editField" v-if="authFlagForEditServices">
                <v-icon color="#E60000">
                    edit
                </v-icon>
            </v-btn>
        </v-card-title>
        <div v-if="loadingServices" >
            <v-layout
                    fill-height
                    align-center
                    justify-center
                    ma-0
            >
                <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
            </v-layout>
        </div>

            <div v-if="noServices"  style="font-size: large;text-align: center;color: #cccccc;" >
                <h3 class="no-services">{{$t('profile.services.Does your business offer any services?')}}</h3>
                <h3 class="no-services">{{$t('profile.services.please list them here')}}</h3>
            </div>



        <v-card-text class="pt-0">

            <div v-if="editField" style="text-align: end;">
                <v-form ref="serviceForm" style="margin-bottom: 15px;">
                <v-autocomplete
                        :rules="[value => !!value || $t( 'registration.signup.required' )]"
                    v-model="selectedServices"
                    color="#E60000"
                    :items="items"
                    hide-selected
                    :label="$t('profile.services.select services')"
                    multiple
                    clearable
                    counter="10"
                    maxlength="10"
                    :menu-props="{ maxHeight: 150 }"

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
                <v-card-text class="pt-0">

                    <v-layout row wrap   style="align-items: center;  padding-top: 0px;  margin: 3px;">
                        {{$t('profile.services.Or write your own service')}}
                        <v-btn color="#E60000" icon @click="addInput()" v-if="userServices.length < 1">
                            <v-icon smaller color="#E60000">add_circle_outline</v-icon>
                        </v-btn>
                        <v-layout row wrap v-for="(input,k) in userServices" :key="k" style="align-items: center; padding-top: 0px;   margin: 3px;">
                       <!--  <v-text-field
                                v-model="input.service"
                                label="Write New Service"
                                color="red"
                                :rules="[rules.max]"
                                counter="25"
                        >

                        </v-text-field> -->

                        <v-combobox
                                :search-input.sync="searchOwn"
                                v-model="input.service"
                                :label="$t('profile.services.Write New Service')"
                                :items="items"
                                :menu-props="{ maxHeight: 150 }"

                        >
                            <template v-slot:no-data>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{$t('profile.services.No results matching')}} "<strong>{{ searchOwn }}</strong>". {{$t('profile.services.Press')}} <span style="color: #E60000">{{$t('profile.sliderProfile.Save')}}</span> {{$t('profile.services.to create a new one')}}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-combobox>


                            <v-btn icon color="#E60000" @click="removeInput(k)" >
                                <v-icon smaller color="#E60000">
                                    remove_circle_outline
                                </v-icon>
                            </v-btn>
                        </v-layout>
                    </v-layout>
                </v-card-text>
                <v-btn
                    style="margin-top: 10px"
                    small
                    text
                    color="#E60000"
                    @click="editField = !editField"
                >
                    {{$t('profile.sliderProfile.Cancel')}}
                </v-btn>
                <v-btn
                    style="margin-top: 10px"
                    small
                    dark
                    elevation="0"
                    color="#E60000"
                    @click="saveServiceEdit"
                >
                    {{$t('profile.sliderProfile.Save')}}
                </v-btn>
                </v-form>
            </div>

            <div v-if="showServices">
            <v-layout row v-if="startEditField" style="justify-content: center;" >
                <div v-for="(item,i) in servicesChips">
                <v-chip
                    class="ma-2"
                    Default
                    outlined
                    label
                    :key="i"
                >
                    <strong>{{item}}</strong>
                </v-chip>

                </div>
            </v-layout>
            </div>




        </v-card-text>


    </v-card>
</template>

<script>
    export default {
        name: "services",
        data:()=>{
            return{
                authFlagForEditServices: false,
                loadingServices: true,
                userServices:[],
                rules: {
                    required: value => !!value || 'Required.',
                    max: v => v.length <= 25 || 'Maximum 25 characters',
                    maxElements: v => v.length > 10 || 'Maximum 10 service',
                },
                selectedServices: [],
                search: null,
                searchOwn: null,
                chips: true,
                multiple: true,
                hideSelected: true,
                noData: true,
                clearable: false,

                noServices: false,
                showServices: true,

                startEditField: true,
                editField: false,
                servicesChips: [
              
                ],
                items: [],
                itemsWithIds:[],
                chipSelected: "",
            }
        },
        mounted() {

            this.$store.dispatch('Allservice', {id: this.$route.params.id, lang: this.$i18n.locale});
            this.$store.dispatch('selectedBusinesSservive', {id: this.$route.params.id, lang: this.$i18n.locale});
            this.$store.dispatch('ComboboxService', {id: this.$route.params.id, lang: this.$i18n.locale});
            this.$store.dispatch('OtherService', {id:this.$route.params.id, lang: this.$i18n.locale});

            // for(let i in this.servicesChips) {
            //     this.selectedServices.push(this.servicesChips[i]);
            // }
        },
        computed:{
            checkServicesData(){
              return this.servicesChips.length;
            },
            checkUserAuth(){
                return this.$store.getters.getAuthFlag;
            },
            getAllservice(){
                return this.$store.getters.getAllservice;
            },
            getSelectedBusinesSservive(){
                return this.$store.getters.getSelectedBusinesSservive;
            },
            getComoboboxService(){
                return this.$store.getters.getComoboboxService;
            },
            getOtherService(){
                return this.$store.getters.getOtherService;
            },
        
        },
        watch: {
            '$route'(from, to) {
                this.editField = false;
                this.$store.dispatch('Allservice', {id: this.$route.params.id, lang: from.params.lang});
                this.$store.dispatch('selectedBusinesSservive', {id: this.$route.params.id, lang: from.params.lang});
                this.$store.dispatch('ComboboxService', {id: this.$route.params.id, lang: from.params.lang});
                this.$store.dispatch('OtherService', {id:this.$route.params.id, lang: from.params.lang});


            },
            checkServicesData(len) {
                console.log('LEN', len);
                if (len === 0) {
                    this.loadingServices = false;
                    this.noServices = true;
                }
            },
            checkUserAuth(flag) {
                if (flag === true) {
                    this.authFlagForEditServices = true;
                } else if (flag === false) {
                    this.authFlagForEditServices = false;
                }
            },
            getAllservice(service) {
                this.loadingServices = true;
                this.noServices = false;


                if (service.length !== 0) {

                    this.servicesChips = [];
                    this.selectedServices = [];
                    for (let i in service) {
                        if('other' in service[i] === false) {
                            this.servicesChips.push(service[i].name);
                            this.selectedServices.push(service[i].name);
                        }else{
                            this.servicesChips.push(service[i].other);
                        }
                    }
                    this.loadingServices = false;
                    this.noServices = false;

                } else {

                    this.loadingServices = false;
                    this.noServices = true;
                }
            },

            getSelectedBusinesSservive(selectedservice) {


                // this.selectedServices = [];
                // if (selectedservice) {
                //     for (let i in selectedservice) {
                //         this.selectedServices.push(selectedservice[i].name);
                //     }
                // }
                // this.loading = false;
                // this.loading = false;

            },
            getComoboboxService(comboservice) {
                this.items = [];
                this.itemsWithIds = [];
                if (comboservice) {
                    for (let i in comboservice) {
                        this.items.push(comboservice[i].name);
                        this.itemsWithIds.push(comboservice[i])

                    }
                }
            },
            getOtherService(otherservice) {
                this.userServices = [];
                if (Object.keys(otherservice).length !== 0) {
                        this.userServices.push({service: otherservice.other});

                    // this.servicesChips.push(otherservice.other);
                }
                // this.loading = false;
            }

        },
        

        methods: {
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
                        if (a.indexOf(my_arr[i].service) === -1 && my_arr[i].service !== '')

                            a.push(this.titleCase(my_arr[i].service));

                    let itemarray = this.selectedServices.map(v => v.toLowerCase())
                    if (a.some(v => itemarray.includes(v))) {
                        return false;
                    }
                    if (my_arr.length == a.length) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            saveServiceEdit(event) {
                event.preventDefault();
                event.stopPropagation();
                let checkArray = this.checkArray(this.userServices);

                if (this.selectedServices.length !==0 && checkArray) {
                    this.$store.commit('setClearAppMsgs');
                    let services_ids = [];
                    for(let i in this.selectedServices){
                        services_ids.push(
                            this.itemsWithIds.find(id => id.name === this.selectedServices[i]).id
                        )
                    }
                    this.$store.dispatch('saveServiceData', {
                        slug: this.$route.params.id,
                        selectedServices: services_ids,
                        inputs: this.userServices,
                        lang: this.$i18n.locale,

                    });
                    this.editField = false;
                } else {
                    this.$store.commit('setAppMsgs', {
                        msg: 'profile.faqs.Please Fill all inputs!',
                        color: "info",
                        icon: "info"
                    })
                }
            },
            addInput() {
                this.userServices.push({service: ''});
                console.log(this.userServices,"33333333");
            },
            removeInput(index) {
                this.userServices.splice(index, 1);
                console.log(this.userServices,"33333333");
            }
        }
    }
</script>

<style scoped>
>>>.no-services{
    max-width: 100%;
    font-size: 1em !important;
    text-align: center;
}
</style>
