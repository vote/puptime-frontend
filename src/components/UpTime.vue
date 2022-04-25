<template>
  <div class="overflow-auto">
    <b-table sticky-header :items="state_monthly_uptimes" head-variant="light">
                <template #head(0)="">
                    <span class="text-info">State</span>
                </template>
                <template #head(1)="">
                    <span class="text-info">Uptime in a month %</span>
                </template>
                <template #cell(1)="data">
                    <b-progress :value="data.value" :max="1" show-progress animated></b-progress>

                    <b-progress class="mt-2" :max="1" show-value>
                        <b-progress-bar :value="data.value" variant="success"></b-progress-bar>
                        <b-progress-bar :value="0.1" variant="warning"></b-progress-bar>
                        <b-progress-bar :value="0.2" variant="danger"></b-progress-bar>
                    </b-progress>
                </template>
            </b-table>
  </div>
</template>

<script>
  export default {
    name: "UpTime",
    data() {
        return {
            state_monthly_uptimes: []
        }
    },
    async mounted() {
        const response = await fetch("https://uptime.voteamerica.com/v1/uptime/sites/?limit=395")
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
  }
</script>