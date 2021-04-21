<template>
  <div class='comments'>
    <h3>Add a Comment</h3>
    <form v-on:submit.prevent='addComment'>
      <br/>
      <textarea v-model="addedComment"></textarea>
      <br />
      <button type="submit">Comment</button>
    </form>
    <br>
    <h3>Comments</h3>
    <div class='list' v-for="comment in this.comments" :key="comment.id">
      <hr>
      <p>{{comment.text}}</p>
      <p><i>-- {{comment.firstName}} {{comment.lastName}}</i></p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data(){
      return{
        post: null,
        addedComment: '',
        comments: Array,
      }
    },
    created() {
      this.getComments();
      this.getPost();
    },
    methods:{
      async addComment() {
        try {
          console.log(this.post);
          let res = await axios.post('/api/comments/', {
            firstName: this.$root.$data.user.firstName,
            lastName: this.$root.$data.user.lastName,
            text: this.addedComment,
            post: this.post._id,
          });
          console.log(res.data);
          this.getComments();
        } catch (error) {
          console.log(error);
        }
      },
      async getComments() {
        try {
          let response = await axios.get('/api/comments/post/' + this.$route.params.id);
          // let response = await axios.get('/api/comments/');
          this.comments = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async getPost() {
        try {
          let route = "/api/posts/" + this.$route.params.id;
          this.response = await axios.get(route);
          this.post = this.response.data;
        } catch (error) {
          this.error = error.response.data.message;
        }
      },
    },
  };
</script>

<style scoped>
  textarea {
    width: 100%;
    max-width: 500px;
    height: 100px;
  }

  .comments {
    border: solid 2px #454545;
    margin-left: 15%;
    padding: 5px;
    width: 70%;
    background-color: #efe6dd;
    text-align: left;
  }

  .list {
    display: flex;
    flex-direction: column;
  }
</style>
