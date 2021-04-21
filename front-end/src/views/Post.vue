<template>
  <div>
    <div class='loading' v-if="isFetching">
      <p>Loading...</p>
    </div>
    <div v-else>
      <title>{{post.title}}</title>

      <div class='header'>
        <img id='headPic' :src="post.images[0]" style='width: 100%'/>
        <div class='page-title'>
          <h1>{{post.title}}</h1>
        </div>
      </div>
      <div class='content'>
        <div class='post' v-for="(item,index) in post.text" :key="index">
          <img :src="post.images[index+2]"/>
          <p>{{post.text[index]}}</p>
        </div>
      </div>

      <Comments v-if="user" />
      <Login v-else />

    </div>
  </div>
</template>

<script>
  import Login from '@/components/Login.vue';
  import Comments from '@/components/Comments.vue';
  import axios from 'axios';
  export default {
    name: "Post",
    mounted () {
    },
    data(){
      return{
        post: null,
        isFetching: true,
      }
    },
    components: {
      Comments,
      Login,
    },
    async created(){
      this.getPost();
      try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    computed: {
      user() {
        return this.$root.$data.user;
      }
    },
    methods: {
      async getPost() {
        try {
          let route = "/api/posts/" + this.$route.params.id;
          this.response = await axios.get(route);
          this.post = this.response.data;
        } catch (error) {
          this.error = error.response.data.message;
        }
        this.isFetching = false;
      },
    },
  };
</script>

<style scoped>
  .content {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    border: solid 5px #454545; /*onyx*/
    padding: 5px;
  }

  .post {
    border: none;
  }

  .post img {
    float: right;
    width: 50%;
    border: solid 2px #454545;
    vertical-align: middle;
  }

  p {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 1.2em;
    float: none;
  }

  .loading {
    color: #efe6dd;
  }
</style>
