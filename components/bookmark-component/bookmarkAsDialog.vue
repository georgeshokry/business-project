<template>
    <v-dialog
            v-model="bookmarkAsDialog"
            width="350"
            scrollable
            persistent
    >
        <v-card>
            <v-layout column wrap style="align-items: flex-end;width: 100%;position: absolute">
                <v-btn icon color="#E60000" class="ma-2" @click="closeBookasDialogNow">
                    <v-icon  color="#E60000">
                        close
                    </v-icon>
                </v-btn>
            </v-layout>
            <v-card-title class=" justify-center" style="color:#E60000;">

                {{$t('profile.about.' + title)}}
            </v-card-title>
            <v-card-text class="justify-center">


                <v-layout row wrap style="justify-content: center;"

                >
                    <v-layout
                            v-if="profiles.length < 0"
                            fill-height
                            align-center
                            justify-center
                            ma-0
                    >
                        <v-progress-circular indeterminate color="#E60000"></v-progress-circular>
                    </v-layout>
                    <div v-if="profiles.length ===0" style="      padding-top: 10px;  font-size: large;text-align: center;color: #cccccc;" >
                        {{$t('profile.about.You have no business accounts!')}}
                        <v-divider dark></v-divider>
                        <v-btn
                                block
                                elevation="0"
                                small
                                color="#E60000"
                                style="font-weight: bold;"
                                outlined
                                dark
                                :to="{name: 'chooseBusinessType', params:{lang: $i18n.locale}}"
                        >
                            {{$t('home-page-sections.headerSection.create your business now')}}
                        </v-btn>
                    </div>



                        <v-list
                                style="width:100%"
                                v-for="(item, index) in profiles"
                                :key="index"
                        >

                            <v-list-item
                                @click="BookmarkReport(item.slug,item.profile_type)"
                                :ripple="{ class: 'red--text' }"

                            >
                                <v-list-item-avatar tile>
                                    <v-img :src="'/images/med/' + item.pic"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content >
                                    <v-list-item-title >
                                        {{ item.name }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider
                                    class="ma-0"
                                    :key="index"
                                    v-if="profiles.length > 1"
                            ></v-divider>
                        </v-list>
                </v-layout>



            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "bookmarkAsDialog",
        data:()=>{
            return{
                profiles: [],
                profilesRecommend:[],
                profilesPersonal:[],


            }
        },
        computed:{
            getAllProfileType(){
                return this.$store.getters.getAllProfileType;
            },
             getAllProfileTypeTitle(){
                return this.title;
            },


        },
        watch:{
            getAllProfileType(profile){
                this.profilesPersonal =[];
                this.profilesRecommend =[];
                if(profile) {
                    for(let i in profile){
                        if( profile[i].profile_type!=='personal')
                        {
                             this.profilesPersonal.push({name: profile[i].name, slug:profile[i].slug, pic:profile[i].pic,profile_type: profile[i].profile_type});
                        }
                            this.profilesRecommend.push({name: profile[i].name, slug:profile[i].slug, pic:profile[i].pic,profile_type: profile[i].profile_type});
                       
                    }
                }
            },
            getAllProfileTypeTitle(title)
            {
                if(title==='Bookmark')
                {
                    this.profiles=this.profilesPersonal

                }

                else
                {
                    this.profiles=[];
                    this.profiles=this.profilesRecommend
                }
            }
        },
        props: {
            bookmarkAsDialog: {
                default: false,
                type: Boolean,
            },
            title:{
                default: '',
                type: String,
            }
        },
        methods: {
            closeBookasDialogNow() {
                this.$emit('closeBookasDialogNow');
            },
            BookmarkReport(slug,type) {
           this.$store.dispatch('saveBookmarkReport', {
                        slug: this.$route.params.id,
                        usertype: type,
                        userslug:slug ,
                        title:this.title,
               lang: this.$i18n.locale,

                    });
           this.$emit('closeBookasDialogNow');

               
            },

        }
    }
</script>

<style scoped>

</style>