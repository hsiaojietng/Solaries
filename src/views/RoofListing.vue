<template>
  <div class="columns">
    <div class="column is-8">
      <p class="title is-3 m-6">Current Projects</p>
    </div>
  </div>
  <div class="columns is-centered">
    <div class="column is-4 slider">
      <div class="card">
        <div class="card-image">
        </div>
      </div>
    </div>
    <div class="column is-4 m-6">
      <p class="title is-4">50 Jalan Rangit 58, Johor Bahru, 81256</p>
      <div class="columns">
        <div class="column is-2">
          <p>Roof size:</p>
        </div>
        <div class="column is-2">
          <p>50 m</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-2">
          <p>Average daily energy usage:</p>
        </div>
        <div class="column is-2">
          <p>750 kWh/day</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-2">
          <p>Building type:</p>
        </div>
        <div class="column is-2">
          <p>Bungalow</p>
        </div>
      </div>
      <div class="progress-wrapper">
        <progress
          class="progress is-success is-large"
          value="50"
          max="100"
        ></progress>
        <p class="progress-value has-text-black">
          Funding: $50, 000 / $100, 000
        </p>
      </div>
      <div class="container">
        <div class="columns is-centered">
          <router-link
            to="/invest"
            class="button is-rounded is-medium is-info"
            id="callToAction"
            is-centered
          >
            Invest Now
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
    name: "RoofListing",
    data() {
        return {

        }
    },
    props: {
      i: Number, //index of the roof
      roof: Object,
    }
})
</script>

<script lang="ts" setup>
import { defineComponent } from "vue";

</script>

<style scoped>
.progress-wrapper {
  position: relative;
}

.progress-value {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: calc(1rem / 1.5);
  line-height: 1rem;
  font-weight: bold;
  color: black;
}

.progress.is-small + .progress-value {
  font-size: calc(0.75rem / 1.5);
  line-height: 0.75rem;
}

.progress.is-medium + .progress-value {
  font-size: calc(1.25rem / 1.5);
  line-height: 1.25rem;
}

.progress.is-large + .progress-value {
  font-size: calc(1.5rem / 1.5);
  line-height: 1.5rem;
}

#slider {
    overflow: hidden;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -50px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  -webkit-user-select: none;
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}
</style>