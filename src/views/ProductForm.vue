<template>
  <div>
    <form>
      <label for="name">Name:</label>
      <input type="text" v-model="product.name" id="name" required />

      <label for="price">Price:</label>
      <input type="number" v-model="product.price" id="price" required />

      <label for="quantity">Quantity:</label>
      <input type="number" v-model="product.quantity" id="quantity" required />

      <button
        @click="createProduct"
        type="button"
        :class="isUpdating ? 'disable' : 'enable'"
        :disabled="isUpdating"
      >
        Save
      </button>
      <button
        @click="updateProduct"
        type="button"
        :class="!isUpdating ? 'disable' : 'enable'"
        :disabled="!isUpdating"
      >
        Update
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: {
        name: "",
        price: 0,
        quantity: 0,
      },
      isUpdating: false,
    };
  },
  methods: {
    async createProduct(e) {
      e.preventDefault();
      try {
        await axios.post("https://localhost:5001/api/Products", this.product);
        this.$router.push("/");
        // Clear the form and show a success message
        this.product = { name: "", price: 0, quantity: 0 };
        alert("Product created successfully!");
      } catch (error) {
        console.error(error);
        alert("Error creating product");
      }
    },
    async updateProduct() {
      console.log("hello");
      try {
        await axios.put(`https://localhost:5001/api/Products`, this.product);
        this.$router.push("/");
        this.$emit("update");
        this.isUpdating = false;
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (product !== null) {
      this.product = product;
      this.isUpdating = true;
    }
  },
};
</script>

<style scoped>
form {
  width: 50%;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fbfbfb;
}

label {
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.disable {
  background: gray;
}

.disable:hover {
  background: gray;
}

.enable {
  background: #4caf50;
}
</style>
