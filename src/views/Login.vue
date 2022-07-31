<template>
  <div class="container">
    <div class="item-container">
      <h1 class="title is-3">Login</h1>
    </div>
    <div class="item-container">
      <button class="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="24"
          height="24"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="#1e293b"
            d="M21.456 10.154c.123.659.19 1.348.19 2.067c0 5.624-3.764 9.623-9.449 9.623A9.841 9.841 0 0 1 2.353 12a9.841 9.841 0 0 1 9.844-9.844c2.658 0 4.879.978 6.583 2.566l-2.775 2.775V7.49c-1.033-.984-2.344-1.489-3.808-1.489c-3.248 0-5.888 2.744-5.888 5.993c0 3.248 2.64 5.998 5.888 5.998c2.947 0 4.953-1.685 5.365-3.999h-5.365v-3.839h9.26Z"
          />
        </svg>
      </button>
    </div>
    <div class="form-input">
      <label class="email">Email: </label>
      <input
        type="text"
        id="email"
        v-model="email"
        placeholder="Enter email..."
        required
      />
    </div>
    <div class="form-input">
      <label class="password">Password: </label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="Enter password..."
        required
      />
    </div>
    <div class="item-container">
      <button
        @click="login"
        type="submit"
        class="button is-success is-responsive is-rounded is-fullwidth"
        value="Login"
      >Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default defineComponent({
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Correct credentials!");
          this.$router.replace("dashboard");
          // ... 
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
  },
});
</script>

<style scoped>
.container {
  width: 30%;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #353636;
  background: #fff;
  margin-top: 5%;
}

h1 {
  margin-bottom: 20px;
}

.item-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.form-input {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 5px;
}

label {
  padding: 8px;
}

input {
  padding: 5px;
}
</style>