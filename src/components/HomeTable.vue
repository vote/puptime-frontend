<template>
<div class="overflow-auto">
    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>

    <b-table striped hover bordered fixed id="my-table" :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage" small>
        <template #cell(description)="data">
            <a :href=data.item.url>{{ data.value }}</a>
        </template>
        <template #cell(status_changed_at)="data">
            {{ data.value | moment("MM/DD/YYYY h:mm:ss a") }}
        </template>
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
        <template #cell(uptime_day)="data">
            <div>
                {{ parseInt(data.value *100) }}%
            </div>
        </template>
        <template #cell(uptime_week)="data">
            {{ parseInt(data.value *100) }}%
        </template>
        <template #cell(uptime_month)="data">
            {{ parseInt(data.value *100) }}%
        </template>
        <template #cell(uptime_quarter)="data">
            {{ parseInt(data.value *100) }}%
        </template>
    </b-table>
</div>
</template>

<script>
export default {
    name: "HomeTable",
    data() {
        return {
            perPage: 15,
            currentPage: 1,
            items: [{}, ],
            fields: [{
                    key: 'description',
                    label: 'website',
                    sortable: true
                },
                {
                    key: 'metadata.state_id',
                    label: 'state',
                    sortable: true
                },
                {
                    key: 'status',
                    sortable: true
                },
                {
                    key: 'status_changed_at',
                    label: 'status last changed',
                    sortable: true
                },
                {
                    key: 'last_downtime',
                    label: 'down time',
                    sortable: true
                },
                {
                    key: 'uptime_day',
                    label: 'uptime by day',
                    sortable: true
                },
                {
                    key: 'uptime_week',
                    label: 'uptime by week',
                    sortable: true
                },
                {
                    key: 'uptime_month',
                    label: 'uptime by month',
                    sortable: true
                },
                {
                    key: 'uptime_quarter',
                    label: 'uptime by quarter',
                    sortable: true
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
            this.items = await fetch("https://uptime.voteamerica.com/v1/uptime/sites/?limit=395")
                .then(res => {
                    return res.json()
                })
                .then(items => items.results)
            console.log(this.items);
        }
    },
    computed: {
        rows() {
            return this.items.length
        }
    }
}
</script>
