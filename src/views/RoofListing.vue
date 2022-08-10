<template>
  <div class="columns">
    <div class="column is-8">
      <p class="title is-3 m-6">Current Projects</p>
    </div>
  </div>
  <Carousel>
    <Slide>
      
    </Slide>
  </Carousel>
  <div class="columns is-centered">
    <div class="column is-4 slider">
      <div class="card">
        <div class="card-image">
          <img :src="roof.imageUrl" alt="" />
        </div>
      </div>
    </div>
    <div class="column is-4 m-6">
      <p class="title is-4">{{ roof.location }}</p>
      <div class="columns">
        <div class="column is-2">
          <p>Roof size:</p>
        </div>
        <div class="column is-2">
          <p>{{ roof.size }}</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-2">
          <p>Average daily energy usage:</p>
        </div>
        <div class="column is-2">
          <p>{{ roof.energy }}</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-2">
          <p>Building type:</p>
        </div>
        <div class="column is-2">
          <p>{{ roof.buildingtype }}</p>
        </div>
      </div>
      <div class="progress-wrapper">
        <progress
          class="progress is-success is-large"
          :value= roof.fund
          :max= roof.investment
        ></progress>
        <p class="progress-value has-text-black">
          Funding: ${{ roof.fund }} / ${{ roof.investment }}
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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../main";

export default defineComponent({
  name: "RoofListing",
  components: { Carousel, Slide },
  data() {
    return {
      roofs: [],
      roof: {
        imageUrl: [""],
        location: "",
        buildingtype: "",
        energy: "",
        size: "",
        fund: null,
        investment: null,
      },
    };
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, "roofs"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      this.roofs.push(doc.data());
      this.roof.location = this.roofs[0].location;
      this.roof.buildingtype = this.roofs[0].buildingtype;
      this.roof.energy = this.roofs[0].energy;
      this.roof.size = this.roofs[0].size;
      this.roof.imageUrl = this.roofs[0].imageUrl[1];
      this.roof.fund = this.roofs[0].fund;
      this.roof.investment = this.roofs[0].investment;
    });
  },
  props: {
    i: Number, //index of the roof
  },
});
</script>

<script lang="ts" setup>
import { defineComponent } from "vue";
import Carousel from '../components/Carousel.vue';
import Slide from '../components/Slide.vue';
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