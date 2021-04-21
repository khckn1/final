<template>
  <div>
    <div class='post' v-for="post in posts" :key="post._id">
      <div class='picture'>
        <img :src="post.images[1]" style='width: 100%'/>
      </div>
      <h2>{{post.title}}</h2>
      <p>{{post.text[0]}}...</p>
      <router-link :to="{ name: 'Post', params: { id: post._id }}">
        <p>read more...</p>
      </router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Preview',
    data() {
      return {
        posts: [],
      }
    },
    created() {
      this.getPosts();
    },
    methods:{
      async getPosts() {
        try {
          let response = await axios.get("/api/posts");
          this.posts = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
</script>

<style scoped>
  .post {
    width: 100%;
  }

  .picture {
    float: right;
    max-width: 40%;
    justify-content: center;
    padding-top: 25px;
    padding-left: 10px;
  }

  p {
    float: none;
  }
</style>
