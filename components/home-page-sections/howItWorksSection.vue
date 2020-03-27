<template>
    <v-card flat min-height="300">
        <v-container fluid >
        <v-container fluid fill-height>

            <v-layout row justify-center align-center>
                <v-flex lg3>
                    <v-card-title class="font-weight-bold" style="color:red;padding-left: 0;">
                        HOW IT WORKS
                    </v-card-title>
                </v-flex>
                <v-flex lg3>
                    <v-card-title class="font-weight-bold" style="color:red">
                    </v-card-title>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fluid fill-height>
            <v-layout row justify-center align-center>

                <img class="resp-hiw-img" src="../resources/Asset4.png">

            </v-layout>
        </v-container>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "howItWorksSection"
    }
</script>

<style scoped>
.resp-hiw-img{
    width: 60%
}
@media only screen and (max-width: 600px) {
    .resp-hiw-img {
        width: 95%
    }
}
</style>