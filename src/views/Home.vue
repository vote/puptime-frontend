<template>
<div>
    <NavBar />
    <div>
        <router-link to="/facts" class="links2"><u>Facts</u></router-link>
        <router-link to="/sites" class="links1"><u>Sites</u></router-link>
    </div>

    <h3 style="margin-top:90px;">We have a problem ______ </h3>
    <h3>(facts that change every 10 seconds)</h3>
    <div class="tables-top">
        <div class="map">
            <BaseMap />
        </div>
        <div class="uptime-table">
            <UpTime />
        </div>
    </div>

    <div class="tables-bottom">
        <div class="linechart">
            <LineChart />
        </div>
        <div class="state-compare-table">
            <StateCompare />
        </div>
    </div>

    <Footer />
</div>
</template>

<script>
// @ is an alias to /src
import BaseMap from "@/components/BaseMap.vue";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import StateCompare from "@/components/StateCompare.vue";
import UpTime from "@/components/UpTime.vue";
import LineChart from "@/components/LineChart.vue";
export default {
    name: "Home",
    components: {
        BaseMap,
        NavBar,
        Footer,
        StateCompare,
        UpTime,
        LineChart
    },
};
</script>

<style>
.tables-top {
    display: flex;
    margin-top: 5vh;
    margin-left: 5vw;
}

.tables-bottom {
    display: flex;
    margin-top: 5vh;
    margin-left: 5vw;
    margin-bottom: 55vh;
}

.uptime-table,
.state-compare-table,
.linechart,
.map {
    width: 40vw;
    height: 30vh;
    border-color: black;
    border-style: solid;
    border-width: thin;
}

.linechart,
.map {
    margin-right: 10vw;
}

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
