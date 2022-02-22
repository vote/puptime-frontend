<template>
<div>
    <NavBar />
    <HomeTable />
</div>
</template>

<script>
// @ is an alias to /src
import HomeTable from "@/components/HomeTable.vue";
import NavBar from "@/components/NavBar.vue";
export default {
    name: "Home",
    components: {
        HomeTable,
        NavBar
    }
};
</script>