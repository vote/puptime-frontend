<template>
<div>
    <NavBar />
    <div >
        <router-link to="/facts" class="links2"><u>Facts</u></router-link>
        <router-link to="/" class="links1"><u>Home</u></router-link>
    </div>
    <HomeTable />
    <Footer />
</div>
</template>

<script>
// @ is an alias to /src
import HomeTable from "@/components/HomeTable.vue";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
export default {
    name: "Sites",
    components: {
        HomeTable,
        NavBar,
        Footer
    }
};
</script>
<style>
.links2 {
        text-align: center;
        float: right; 
        margin-right: 60px; 
        margin: 30px; 
        color: rgb(0, 0, 0);
    }

    .links1 {
        text-align: center;
        float: right; 
        margin: 30px; 
        color: rgb(0, 0, 0);
    }
</style>