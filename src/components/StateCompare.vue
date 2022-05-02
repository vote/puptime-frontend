<template>
<div class="table-display">
    <table>
        <tr>
            <th>States</th>
            <th>Uptime</th>
            <th>Uptime(Past 24 Hours)</th>
            <th>Uptime(Past Week)</th>
            <th>Uptime(Past Month)</th>
        </tr>
        <tr>
            <td>
                <select v-model="selected">
                    <option disabled value="">Please select one</option>
                    <option v-for="option in options" :key="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </td>
            <td id="select1">
            </td>
            <td id="daydt1">
            </td>
            <td id="weekdt1">
            </td>
            <td id="monthdt1">
            </td>
        </tr>
        <tr>
            <td>
                <select v-model="selected2">
                    <option disabled value="">Please select one</option>
                    <option v-for="option in options" :key="option.value" :value="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </td>
            <td id="select2">
            </td>
            <td id="daydt2">
            </td>
            <td id="weekdt2">
            </td>
            <td id="monthdt2">
            </td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
    name: "StateCompare",
    data() {
        return {
            selected: "AL",
            selected2: "AL",
            services: [{}, ],
            styleTable: {
                display: 'inline-block',
                position: 'absolute',
                top: '0',
                bottom: '5%',
                width: '45%',
                right: '5%',
            },
            options: [{
                    text: "AL",
                    value: "AL"
                },
                {
                    text: "AK",
                    value: "AK"
                },
                {
                    text: "AZ",
                    value: "AZ"
                },
                {
                    text: "AR",
                    value: "AR"
                },
                {
                    text: "CA",
                    value: "CA"
                },
                {
                    text: "CO",
                    value: "CO"
                },
                {
                    text: "CT",
                    value: "CT"
                },
                {
                    text: "DE",
                    value: "DE"
                },
                {
                    text: "FL",
                    value: "FL"
                },
                {
                    text: "GA",
                    value: "GA"
                },
                {
                    text: "HI",
                    value: "HI"
                },
                {
                    text: "ID",
                    value: "ID"
                },
                {
                    text: "IL",
                    value: "IL"
                },
                {
                    text: "IN",
                    value: "IN"
                },
                {
                    text: "IA",
                    value: "IA"
                },
                {
                    text: "KS",
                    value: "KS"
                },
                {
                    text: "KY",
                    value: "KY"
                },
                {
                    text: "LA",
                    value: "LA"
                },
                {
                    text: "ME",
                    value: "ME"
                },
                {
                    text: "MD",
                    value: "MD"
                },
                {
                    text: "MA",
                    value: "MA"
                },
                {
                    text: "MI",
                    value: "MI"
                },
                {
                    text: "MN",
                    value: "MN"
                },
                {
                    text: "MS",
                    value: "MS"
                },
                {
                    text: "MO",
                    value: "MO"
                },
                {
                    text: "MT",
                    value: "MT"
                },
                {
                    text: "NE",
                    value: "NE"
                },
                {
                    text: "NV",
                    value: "NV"
                },
                {
                    text: "NH",
                    value: "NH"
                },
                {
                    text: "NJ",
                    value: "NJ"
                },
                {
                    text: "NM",
                    value: "NM"
                },
                {
                    text: "NY",
                    value: "NY"
                },
                {
                    text: "NC",
                    value: "NC"
                },
                {
                    text: "ND",
                    value: "ND"
                },
                {
                    text: "OH",
                    value: "OH"
                },
                {
                    text: "OK",
                    value: "OK"
                },
                {
                    text: "OR",
                    value: "OR"
                },
                {
                    text: "PA",
                    value: "PA"
                },
                {
                    text: "RI",
                    value: "RI"
                },
                {
                    text: "SC",
                    value: "SC"
                },
                {
                    text: "SD",
                    value: "SD"
                },
                {
                    text: "TN",
                    value: "TN"
                },
                {
                    text: "TX",
                    value: "TX"
                },
                {
                    text: "UT",
                    value: "UT"
                },
                {
                    text: "VT",
                    value: "VT"
                },
                {
                    text: "VI",
                    value: "VI"
                },
                {
                    text: "WA",
                    value: "WA"
                },
                {
                    text: "WV",
                    value: "WV"
                },
                {
                    text: "WI",
                    value: "WI"
                },
                {
                    text: "WY",
                    value: "WY"
                },
            ]
        };
    },
    watch: {
        selected(oldselect, newselect) {
            this.getStateUptime(newselect, 1)
        },
        selected2(oldselect, newselect) {
            this.getStateUptime(newselect, 2)
        }
    },
    methods: {
        async getStateUptime(state, selected) {
            const response = await fetch("https://uptime.voteamerica.com/v1/uptime/sites/?limit=395")
                .then(results => {
                    return results.json()
                });
            this.services = response.results;
            var states = {};
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

            const sites = states[state];
            var uptime = {
                'uptime_day': 0,
                'uptime_month': 0,
                'uptime_quarter': 0,
                'uptime_week': 0
            };
            for (const site_index in sites) {
                const site = sites[site_index];
                uptime['uptime_day'] += site.uptime_day;
                uptime['uptime_month'] += site.uptime_month;
                uptime['uptime_quarter'] += site.uptime_quarter;
                uptime['uptime_week'] += site.uptime_week;
            }
            uptime['uptime_day'] /= sites.length;
            uptime['uptime_month'] /= sites.length;
            uptime['uptime_quarter'] /= sites.length;
            uptime['uptime_week'] /= sites.length;
            if (selected == 1) {
                document.getElementById("select1").innerHTML = (Math.floor(uptime['uptime_month'] * 100)) + "%"
                document.getElementById("daydt1").innerHTML = (Math.floor(uptime['uptime_day'] * 100)) + "%"
                document.getElementById("weekdt1").innerHTML = (Math.floor(uptime['uptime_week'] * 100)) + "%"
                document.getElementById("monthdt1").innerHTML = (Math.floor(uptime['uptime_month'] * 100)) + "%"
            } else {
                document.getElementById("select2").innerHTML = (Math.floor(uptime['uptime_month'] * 100)) + "%"
                document.getElementById("daydt2").innerHTML = (Math.floor(uptime['uptime_day'] * 100)) + "%"
                document.getElementById("weekdt2").innerHTML = (Math.floor(uptime['uptime_week'] * 100)) + "%"
                document.getElementById("monthdt2").innerHTML = (Math.floor(uptime['uptime_month'] * 100)) + "%"
            }
        }
    },
    async mounted() {
        const response = await fetch("https://uptime.voteamerica.com/v1/uptime/sites/?limit=395")
            .then(results => {
                return results.json()
            });
        this.services = response.results;
        console.log(this.services);
    },
};
</script>

<style>
.table-display {
    width: 90%;
    margin-top: 2vh;
    margin-left: auto;
    margin-right: auto;
}

.table-description {
    text-align: left;
}

.md-card {
    box-shadow: none !important;
}

.md-table {
    height: 85vh !important;
}
</style>
