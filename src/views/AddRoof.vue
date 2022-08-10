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
              <div v-for="(img, i) in roof.imageUrl" :key="i" class="d-flex">
                <img :src="img" />
              </div>
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
              placeholder="e.g. 700 (in m²)"
              name="roofsize"
              v-model="roof.size"
            />
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
                <option selected>Bungalow</option>
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
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="" class="label">Quotation for solar panels: </label>
          </div>
          <p class="control">
            <input
              class="input"
              type="text"
              placeholder="e.g. 10000"
              name="investment"
              v-model="roof.investment"
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
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

export default defineComponent({
  name: "AddRoof",
  data() {
    return {
      roof: {
        imageUrl: [""],
        location: "",
        buildingtype: "",
        energy: "",
        size: "",
        fund: 0,
        investment: null, 
      },
    };
  },
  components: {},
  methods: {
    async submitRoof() {
      // Create a root reference
      try {
        const docRef = await addDoc(collection(db, "roofs"), this.roof);
        console.log("Document written with ID: ", docRef.id);
        this.reset();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    reset() {
      this.roof.location = "";
      this.roof.buildingtype = "";
      this.roof.energy = "";
      this.roof.size = "";
      this.roof.investment = "";
      this.roof.imageUrl.length = 0; //clears the array
    },
    onFilePicked(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please upload a file with valid extension!");
      }

      const storage = getStorage();
      const storageRef = ref(storage, "roof/" + filename);

      const uploadTask = uploadBytesResumable(storageRef, files[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.roof.imageUrl.push(downloadURL);
          });
        }
      );
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