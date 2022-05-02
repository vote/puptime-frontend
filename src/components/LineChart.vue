<template>
  <div>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
    :key="componentKey"
  />
  <h1>
    {{ cData }}
  </h1>
  <select v-model="selected" @change="getStateDowntime($event)">
    <option disabled value="">Please select one</option>
      <option v-for="option in options" :key="option.value">
          {{ option.text }}
      </option>
  </select>
  </div>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  name: 'LineChart',
  components: {
    LineChartGenerator
  },
  props: {
/*    chartData: {
      type: {},
      default: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      } 
    },*/
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 200
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      cData: "",
      selected: "MA",
      /*chartData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      },*/
      componentKey: 0,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
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
    }
  },
  methods: {
    // Find uptime data for each state site, match uuid to downtime api, and add downtimes for that site
    async getStateDowntime(event) {
      const state = event.target.value
      const response = await fetch("https://uptime.voteamerica.com/v1/uptime/sites/?limit=395")
        .then(results => {
          return results.json()
        });
      this.services = response.results;
      var states = {};
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
      const downtimeResponse = await fetch("https://uptime.voteamerica.com/v1/uptime/downtimes/")
        .then(results => {
          return results.json()
        });
      var dtimeResults = downtimeResponse.results
      var state_sites = states[state]
      var downtimes = []

      // get the downtime data for the state
      for (var site in state_sites) {
        var uuid = state_sites[site].uuid
        console.log("UUID: "+uuid)
        for (var dtime in dtimeResults) {
          console.log("dowtime uuid: "+dtimeResults[dtime].site)
          if (dtimeResults[dtime].site == uuid) {
            downtimes.push(dtimeResults[dtime])
          }
        }
      }
      console.log(downtimes)
      var checks = []
      for (var dt in downtimes) {
        const dtResponse = await fetch("https://uptime.voteamerica.com/v1/uptime/checks/" + downtimes[dt]['first_down_check'])
        .then(results => {
          return results.json()
        });
        var time = dtResponse.created_at;
        var duration = downtimes[dt].duration;
        checks.push({time: time, duration: duration})
      }
      console.log(checks)
      var data = {}
      for (var check in checks) {
        var checksDate = new Date(checks[check].time)
        var dateKey = checksDate.getFullYear().toString()+checksDate.getMonth().toString()+checksDate.getDate().toString()
        if (Object.prototype.hasOwnProperty.call(data,dateKey)){
          data[dateKey] += checks[check].duration
        }
        else {
          data[dateKey] = checks[check].duration
        }
      }
      var days = []
      var vals = []
      for (var property in data) {
        if (!Object.prototype.hasOwnProperty.call(data,property)) {
          continue;
        }
        days.push(property)
        vals.push(data[property])
      }
      console.log(data)
      this.cData = data
      this.chartData.labels = days
      this.chartData.datasets = [{label: "downtime", backgroundColor: '#f87979', data: vals}]
      this.componentKey += 1
      return data
    }
  },
  computed: {
    chartData() {
      return {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      }
    }
  }
}
</script>