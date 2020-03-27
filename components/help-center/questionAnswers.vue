<template>
    <v-card flat height="fit-content"   class="faqs-card" >

<!--        for prof-->
        <v-expand-transition>
    <v-expansion-panels
            focusable
            v-if="choosen === 'Professionals'"
            style="    background-color: #fafafa;"
    >
        <v-expansion-panel
                v-for="(item,i) in Professionals"
                :key="i"

        >
            <v-expansion-panel-header>
                <v-card-title style="color: #e60000" class="font-weight-bold pa-0">
                    {{item.question}}
                </v-card-title>
                <template v-slot:actions>
                    <v-icon color="#e60000">$expand</v-icon>
                </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content >
                <div v-html="item.answer">

                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
        </v-expand-transition>

        <v-expand-transition>
<!--        for enterprises-->
        <v-expansion-panels
                focusable
                v-if="choosen === 'Enterprises'"
                style="    background-color: #fafafa;"
        >
            <v-expansion-panel
                    v-for="(item,i) in Enterprises"
                    :key="i"
            >
                <v-expansion-panel-header>
                    <v-card-title style="color: #e60000" class="font-weight-bold pa-0">
                        {{item.question}}
                    </v-card-title>
                    <template v-slot:actions>
                        <v-icon color="#e60000">$expand</v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content >
                    <div v-html="item.answer">

                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        </v-expand-transition>


    </v-card>
</template>

<script>
    export default {
        name: "questionAnswers",
        data:()=>{
            return{
                choosen: "",
                Professionals:[
                    {
                        question: "What is Professionals?",
                        answer: "<p class='ma-3'>I don't know, ask another one</p>"
                    },
                    {
                        question: "What is going on?",
                        answer: "<p class='ma-3'>Again i don't know</p>"
                    }
                ],
                Enterprises:[
                    {
                        question: "What is Enterprises?",
                        answer: "<p class='ma-3'>I don't know, ask another one</p>"
                    },
                    {
                        question: "What are you doing?",
                        answer: "<p class='ma-3'>Nothing</p>"
                    }
                ]
            }
        },
        computed:{
            getSectionChoosen(){
                return this.$store.getters.getSectionChoosen;
            }
        },
        watch:{
            getSectionChoosen(choosen){
                this.choosen = choosen;
            }
        }
    }
</script>

<style>
.faqs-card{
    width: 85%; margin: auto;
}
</style>