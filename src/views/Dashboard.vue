<template>
  <section class="hero is-fullheight-with-navbar bg-img">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title hero-title">The Greener Investment Choice For Anyone</p>
        <button
          class="button is-info is-rounded is-medium is-outlined"
          @click="scrollDown()"
        >
          Learn More
        </button>
      </div>
    </div>
  </section>
  <Tabs id="userDetails" />
  <div class="divider" data-content="Benefits"></div>
  <section>
    <p class="title is-3 has-text-centered">In Collaboration With</p>
    <div class="columns">
      <div class="column is-offset-one-fifth">
        <figure class="image is-128x128">
          <img class="is-rounded" src="..\assets\SPgroupLogo.png" alt="" />
        </figure>
      </div>
      <div class="column">
        <figure class="image is-128x128">
          <img class="is-rounded" src="..\assets\sedaLogo.png" alt="" />
        </figure>
      </div>
      <div class="column">
        <figure class="image is-128x128">
          <img class="is-rounded" src="..\assets\tnbxLogo.png" alt="" />
        </figure>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-offset-one-fifth is-one-fifth">
        <p class="title is-4 has-text-centered">
          Start your investment journey with us now!
        </p>
        <router-link
          to="/invest"
          class="button is-rounded is-medium is-info is-outlined"
          id="callToAction"
        >
          Invest Now
        </router-link>
      </div>
      <div class="column is-one-fifth">

      </div>
      <div class="column is-one-fifth">
        <p class="title is-4">
          List your roof with us now!
        </p>
        <router-link
          to="/invest"
          class="button is-rounded is-medium is-info is-outlined"
          id="callToAction"
        >
          List Roof Now
        </router-link>
      </div>
      <div class="column">

      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "Dashboard",
  methods: {
    scrollDown() {
      var details = document.querySelector("#userDetails") as HTMLElement;
      var detailsTop = details.offsetTop;
      window.scrollTo(100, detailsTop);
    },
  },
};
</script>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { defineComponent, onBeforeUnmount } from "vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import Tabs from "../components/Tabs.vue";

const auth = getAuth();

const router = useRouter();
const authListener = onAuthStateChanged(auth, (user) => {
  if (!user) {
    // not logged in
    router.push("/"); //user will be redirected back to homepage
  }
});
onBeforeUnmount(() => {
  // clear up listener
  authListener();
});
</script>

<style>
.bg-img {
  background-image: url(..\assets\Roof.jpg);
  background-size: cover;
  background-blend-mode: soft-light;
}

.hero-title {
  color: white;
}
</style>