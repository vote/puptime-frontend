<template>
<div>
    <NavBar />
    <h3 style="margin-top: 90px;">We have a problem ______ (facts that change every 10 seconds)</h3>
    <div class="tables">
        <div class="map">
            <BaseMap />
        </div> 
        <div class="uptime-table">
            <md-table v-model="state_monthly_uptimes" md-sort="name" md-sort-order="asc" md-card>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="State">{{
                        item[0]
                    }}</md-table-cell>
                    <md-table-cell md-label="Monthly Uptime" md-sort-by="">{{
                        item[1] 
                    }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</div>


</template>

<script>
// @ is an alias to /src
import BaseMap from "@/components/BaseMap.vue";
import NavBar from "@/components/NavBar.vue";
export default {
    name: "Home",
    data() {
        return {
            state_monthly_uptimes: []
        }
    },
    components: {
        BaseMap,
        NavBar
    },
    async mounted() {
        const response = await fetch("http://vapre.us.to:9901/v1/uptime/sites/?limit=395")
        .then(results => { return results.json()});
        this.services = response.results;
        var states = {};
        var uptimes = {};
        // assign all sites to states 
        // added states instead of just downtimes to allow further implementations
        for (const index in this.services) {
            const site = this.services[index];
            if (site.metadata != null) {
                const state_id = site.metadata.state_id;
                if (state_id in states) {
                    states[state_id].push(site);
                } else {
                    states[state_id] = [site];
                }
            }
        }
        // average downtimes for each state 
        for (const state in states) {
            const sites = states[state];
            var uptime = {'uptime_day': 0, 'uptime_month': 0, 'uptime_quarter': 0, 'uptime_week': 0};
            for (const site_index in sites) {
                const site = sites[site_index];
                uptime['uptime_day'] += site.uptime_day;
                uptime['uptime_month'] += site.uptime_month;
                uptime['uptime_quarter'] += site.uptime_quarter;
                uptime['uptime_week'] += site.uptime_week;
            }
            uptime['uptime_day']/=sites.length;
            uptime['uptime_month']/=sites.length;
            uptime['uptime_quarter']/=sites.length;
            uptime['uptime_week']/=sites.length;
            uptimes[state] = uptime;
        }
        // sort states by monthly uptime
        var state_monthly_uptimes = Object.keys(uptimes).map(function(key) {
            return [key, uptimes[key]['uptime_month']];
        });

        state_monthly_uptimes.sort(function(first, second) {
            return first[1]-second[1];
        });
        this.state_monthly_uptimes = state_monthly_uptimes;
    },
};

</script>

<style>
    .tables {
        display: flex;
        margin-top: 5vh;
    }

    .uptime-table, .map {
        width: 40vw;
        height: 50vh;
    }

    .map {
        margin-left: 5vw;
        margin-right: 10vw;
    }

    .md-card{
        width: 80% !important;
        height: 60vh;
    }
    
    .md-table-head-container {
        text-align: center;
    }
</style>