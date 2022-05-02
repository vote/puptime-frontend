<template>
<div class="overflow-auto">
    <b-table sticky-header="30vh" responsive bordered :items="itemsuptime" :fields="fieldsuptime" head-variant="light" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
        <template #cell(status)="data">
            <div v-if="data.value === 'up'" style="background-color: green; color: white;width: 50%;margin:0 auto;">
                {{ data.value }}
            </div>
            <div v-if="data.value === 'down'" style="background-color: red; color: white;width: 50%;margin:0 auto;">
                {{ data.value }}
            </div>
            <div v-if="data.value === 'blocked'" style="background-color: grey; color: white;width: 50%;margin:0 auto;">
                {{ data.value }}
            </div>
        </template>

        <template #cell(uptime_month)="data">
            <b-progress :value="data.value" :max="1" show-progress animated></b-progress>
        </template>
    </b-table>
</div>
</template>

<script>
export default {
    name: "UpTime",
    data() {
        return {
            itemsuptime: [{}, ],
            sortBy: 'uptime_month',
            sortDesc: true,
            fieldsuptime: [{
                    key: 'metadata.state_id',
                    label: 'state'
                },
                {
                    key: 'status',
                    label: 'current status'
                },
                {
                    key: 'uptime_month',
                    label: 'uptime by month'
                },
            ],
        }
    },
    mounted() {
        this.fetchData().catch(error => {
            console.error(error)
        })
    },
    methods: {
        async fetchData() {
            this.itemsuptime = await fetch("https://uptime.voteamerica.com/v1/uptime/sites/?limit=395")
                .then(res => {
                    return res.json()
                })
                .then(itemsuptime => itemsuptime.results)
            console.log(this.itemsuptime);
        }
    },
}
</script>
