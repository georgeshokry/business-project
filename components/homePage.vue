<template>
    <div>
    <header-section/>
    <what-and-who-section/>
        <benefits-and-value-section/>
<!--        <how-it-works-section/>-->
        <latest-joiners-section/>
        <search-section/>
    </div>
</template>

<script>
    import HeaderSection from "./home-page-sections/headerSection";
    import WhatAndWhoSection from "./home-page-sections/whatAndWhoSection";
    import BenefitsAndValueSection from "./home-page-sections/benefitsAndValueSection";
    // import HowItWorksSection from "./home-page-sections/howItWorksSection";
    import LatestJoinersSection from "./home-page-sections/latestJoinersSection";
    import SearchSection from "./home-page-sections/searchSection";
    export default {
        name: "homePage",
        components: {
            SearchSection,
            LatestJoinersSection,
            // HowItWorksSection,
            BenefitsAndValueSection,
            WhatAndWhoSection,
            HeaderSection
        },
        data:()=>{
            return{

            }
        }
    }
</script>

<style scoped>

</style>