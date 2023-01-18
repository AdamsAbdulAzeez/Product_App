<template>
  <div>
    <h1>Product List</h1>
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td><button @click="editProduct(product)">Edit</button></td>
          <td><button @click="deleteProduct(product)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    axios
      .get("https://localhost:5001/api/products")
      .then((response) => {
        console.log(response.data);
        this.products = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.clear();
  },
  methods: {
    editProduct(product) {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      this.$router.push("/product_details");
    },
    async deleteProduct(product) {
      try {
        await axios.delete(`https://localhost:5001/api/Products/${product.id}`);
        this.getProducts();
      } catch (error) {
        console.error(error);
      }
    },
    getProducts() {
      axios
        .get("https://localhost:5001/api/products")
        .then((response) => {
          console.log(response.data);
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 50%;
  margin: 0 auto;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
