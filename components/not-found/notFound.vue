<template>
    <v-card flat >
        <v-container fluid style="height: 100%">

            <v-layout justify-center align-center>

                <v-flex d-flex lg4 >
                    <v-card-title class="not-found-text">
                        <v-layout row wrap style="justify-content: center;">
                            <h1 style="text-align: center;">
                                {{$t('not-found.notFound.No Business Over Here Mate')}}
                            </h1>
                        <v-btn
                                rounded
                                elevation="0"
                                small
                                color="#E60000"
                                dark
                                style="min-width: 210px;"
                                :to="{name: 'businessDirectory', params: {lang: $i18n.locale}}"
                        >
                            {{$t('not-found.notFound.Back Home')}}
                        </v-btn>
                        </v-layout>
                    </v-card-title>

                </v-flex>

            <v-flex d-flex lg3 style="justify-content: flex-end;height:100%;">
                <v-img class="dis-in-mobile"
                     width="200"
                     src="/images/searching-character.svg">
                </v-img>
            </v-flex>

            </v-layout>
            <v-layout justify-center align-center style="background-color: #e60000;">
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "notfound",
        data:()=>{
            return{

            }
        }
    }
</script>

<style scoped>
.not-found-text{
    padding-bottom: 30px;
    color:#E60000;
    font-weight: 600;
    justify-content: center;
    word-break: normal;
}
.dis-in-mobile{
    display: block;
}
@media only screen and (max-width: 600px) {
    .dis-in-mobile{
        display: none !important;
    }
}
</style>