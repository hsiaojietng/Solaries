<template>
  <div class="columns">
    <div class="column is-8">
      <p class="title is-3 m-6">Add Roof</p>
    </div>
  </div>
  <div class="columns is-centered">
    <div class="column is-3 is-offset-2">
      <div class="field">
        <div class="file has-name is-boxed">
          <label class="file-label">
            <input class="file-input" type="file" name="resume" />
            <span class="file-cta">
              <span class="file-icon">
                
              </span>
              <span class="file-label"> Choose an image... </span>
            </span>
            <span class="file-name">
              Screen Shot 2017-07-29 at 15.54.25.png
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "AddRoof",
    data() {
        return {

        }
    },
    props: {
    },
    components: {
    }
})
</script>