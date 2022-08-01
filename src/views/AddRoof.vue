<template>
  <div class="columns">
    <div class="column is-8">
      <p class="title is-3 m-6">Add Roof</p>
    </div>
  </div>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-3">
        <div class="field">
          <div class="file has-name is-boxed">
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                v-on:change="onFilePicked"
              />
              <span class="file-cta">
                <span class="file-icon"></span>
                <span class="file-label"> Choose an image... </span>
              </span>
              <img :src="roof.imageUrl"  alt="" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="Location" class="label">Location: </label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input
                  class="input"
                  type="text"
                  placeholder="Where is your roof located?"
                  name="location"
                  v-model="roof.location"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="field is-horizontal has-addons">
          <div class="field-label is-normal">
            <label for="" class="label">Roof size: </label>
          </div>
          <p class="control">
            <input
              class="input"
              type="text"
              placeholder="e.g. 700"
              name="roofsize"
              v-model="roof.size"
            />
          </p>
          <p class="control">
            <span class="select">
              <select>
                <option>m²</option>
                <option>feet²</option>
              </select>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="" class="label">Building Type: </label>
          </div>
          <p class="control">
            <span class="select">
              <select name="buildingtype" v-model="roof.buildingtype">
                <option>Bungalow</option>
                <option>Terrace</option>
                <option>Semi-D</option>
                <option>Condominium</option>
              </select>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="" class="label">Average daily energy usage: </label>
          </div>
          <p class="control">
            <input
              class="input"
              type="text"
              placeholder="in kWh/day"
              name="energy"
              v-model="roof.energy"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="columns is-centered">
    <div class="column is-4">
      <button
        class="button is-success is-rounded is-fullwidth"
        @click="submitRoof"
      >
        List Roof
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { app, db } from "../main";
import { addDoc, collection } from "firebase/firestore";
//import { getStorage, ref, uploadBytes } from "firebase/storage";

export default defineComponent({
  name: "AddRoof",
  data() {
    return {
      roof: {
        imageUrl: "",
        location: "",
        buildingtype: "",
        energy: "",
        size: "",
        image: null,
      },
    };
  },
  components: {},
  methods: {
    async submitRoof() {
      // Create a root reference
      //const storage = getStorage();
      try {
        if (!this.roof.image) {
          alert("Please provide images of the house/roof!");
          return;
        }
        // const imageRef = ref(storage, "images/" + this.roof.imageUrl);
        // uploadBytes(imageRef, this.roof.image).then((snapshot) => {
        //   console.log("Uploaded the file!");
        // });
        const docRef = await addDoc(collection(db, "roofs"), this.roof);
        console.log("Document written with ID: ", docRef.id);
        this.reset();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please upload a file with valid extension!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.roof.imageUrl = fileReader.result as string;
      });
      fileReader.readAsDataURL(files[0]);
      this.roof.image = files[0];
    },
  },
});
</script>

<style scoped>
.file-cta {
  background-color: #84acc5;
  color: white;
}
</style>