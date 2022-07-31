<template>
    <section class="content">
    <div class="container">
      <div class="tabs is-boxed is-centered">
        <ul>
          <li class="investor-tab is-active" data-target="investor-details">
            <a class="title is-4"> Investors </a>
          </li>
          <li class="homeowner-tab" data-target="homeowner-details">
            <a class="title is-4"> Homeowners </a>
          </li>
        </ul>
      </div>
      <div class="px-2" id="tab-content">
        <div id="investor-details">
          <InvestorDetails />
        </div>
        <div id="homeowner-details" class="is-hidden">
          <HomeownerDetails />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">

export default {
  name: "Tabs",
  data() {},
  mounted() {
    // tabs
    const tabs = document.querySelectorAll(".tabs li"); //getting the tabs headings
    const tabContentBoxes = document.querySelectorAll("#tab-content > div"); //Getting the content of each tab headings

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((item) => item.classList.remove("is-active")); //removes is-active for all tabs
        tab.classList.add("is-active"); //apply is-active to the one clicked
        const val = tab.getAttribute('data-target');
        tabContentBoxes.forEach(box => {
            if (box.getAttribute('id') == val) {
                box.classList.remove('is-hidden');
            } else {
                box.classList.add('is-hidden');
            }
        });
      });
    });
  },
};
</script>

<script lang="ts" setup>
import InvestorDetails from "../components/InvestorDetails.vue";
import HomeownerDetails from "../components/HomeownerDetails.vue";


</script>