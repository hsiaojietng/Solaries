<template>
  <div class="container">
    <div class="item-container">
      <h1 class="title is-3">Sign up</h1>
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
      <label class="name">Name: </label>
      <input
        type="text"
        id="username"
        v-model="username"
        placeholder="Enter name..."
      />
    </div>
    <div class="form-input">
      <label class="email">Email: </label>
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder="Enter email..."
      />
    </div>
    <div class="form-input">
      <label class="password">Password: </label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="Enter password..."
      />
    </div>
    <div
      v-if="password.length > 1 && password.length < 6"
      class="has-text-danger form-input"
    >
      Password length should be greater than 6
    </div>
    <div class="form-input">
      <label class="password">Confirm password: </label>
      <input
        type="password"
        id="confirmpassword"
        v-model="confirmPassword"
        placeholder="Confirm password..."
      />
    </div>
    <div v-if="password != confirmPassword" class="has-text-danger form-input">
      Password does not match!
    </div>
    <div class="item-container">
      <button
        @click="signup"
        class="button is-success is-responsive is-rounded is-fullwidth"
        type="submit"
      >
        Sign up
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import queryString from "query-string";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default defineComponent({
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async signup() {
      //Posts request
      const data = queryString.stringify({
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });

      //sign in with firebase
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.$router.push("/login"); //navigates user to login page
        })
        .catch((error) => {
          const errorCode = error.code;
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
  width: auto;
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