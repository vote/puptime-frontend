<template>
<div>
    <NavBar />
    <div>
        <router-link to="/sites" class="links2"><u>Sites</u></router-link>
        <router-link to="/" class="links1"><u>Home</u></router-link>
    </div>

    <h3 style="margin-top: 90px;">Facts</h3>

    <div class="texts1">
        <h3> texts</h3>
    </div>

    <div class="texts2">
        <h3> texts</h3>
    </div>

    <Footer />
</div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
export default {
    name: "Facts",
    components: {
        NavBar,
        Footer
    },
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

.texts1 {
    display: inline-block;
    position: absolute;
    bottom: 10%;
    width: 40%;
    height: 60%;
    left: 5%;
    border: 2px solid black;
}

.texts2 {
    display: inline-block;
    position: absolute;
    bottom: 10%;
    width: 40%;
    height: 60%;
    left: 55%;
    border: 2px solid black;
}
</style>
