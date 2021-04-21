<template>
  <div>
    <div v-if="user" class='create'>
      <h1>Upload New Post</h1>
      <div class="add">
        <div class="form">
          <input class='title' v-model="title" placeholder="Title">
          <p></p>
          <p>Background photo for the title</p>
          <input type="file" name="titlePhoto" @change="titlePhoto">
          <p>Photo for preview on home page</p>
          <input type="file" name="previewPhoto" @change="previewPhoto">
          <textarea rows="4" cols="50" v-model="para1">Type the first paragraph.</textarea>
          <p>First picture in post</p>
          <input type="file" name="photo1" @change="photo1">
          <textarea rows="4" cols="50" v-model="para2">Type the second paragraph.</textarea>
          <p>Second picture in post</p>
          <input type="file" name="photo2" @change="photo2">
          <textarea rows="4" cols="50" v-model="para3">Type the third paragraph.</textarea>
          <p>Third picture in post</p>
          <input type="file" name="photo3" @change="photo3">
          <button style="width: 75px; align-self: center;" @click="upload">Upload</button>
        </div>
        <div class="upload" v-if="addItem">
          <h2>{{addItem.title}}</h2>
          <img :src="addItem.path" />
        </div>
      </div>

      <div v-if="reloaded" class="edit">
        <h1>Edit Posts</h1>
        <div class="form">
          <input class='search' v-model="findTitle" placeholder="Search">
          <div class="suggestions" v-if="suggestions.length > 0">
            <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
            </div>
          </div>
        </div>
        <div class="upload" v-if="findItem">
          <img :src="findItem.path" />
          <div class="form">
            <input class='title' v-model="findItem.title" :placeholder="findItem.title">
            <p></p>
            <p>Background photo for the title</p>
            <img :src="findItem.images[0]" />
            <p>Photo for preview on home page</p>
            <img :src="findItem.images[1]" />
            <textarea v-model="para1Edit">Type the first paragraph.</textarea>
            <p>First picture in post</p>
            <img :src="findItem.images[2]" />
            <textarea v-model="para2Edit">Type the second paragraph.</textarea>
            <p>Second picture in post</p>
            <img :src="findItem.images[3]" />
            <textarea v-model="para3Edit">Type the third paragraph.</textarea>
            <p>Third picture in post</p>
            <img :src="findItem.images[4]" />
          </div>
        </div>
        <div class="actions" v-if="findItem">
          <button @click="deletePost(findItem)">Delete</button>
          <button @click="editPost(findItem)">Edit</button>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Please log in to create, edit, and delete post</h2>
      <Login />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Login from '@/components/Login.vue';
  export default {
    name: 'Create',
    components: {
      Login,
    },
    data() {
      return {
        title: "",
        images: [],
        addItem: null,
        para1: "",
        para2: "",
        para3: "",
        para1Edit: "",
        para2Edit: "",
        para3Edit: "",
        posts: [],
        findTitle: "",
        findItem: null,
      }
    },
    async created() {
      try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
        this.getPosts();
      } catch (error) {
        console.log(error);
        this.$root.$data.user = null;
      }
    },
    computed: {
      user() {
        return this.$root.$data.user;
      },
      suggestions() {
        let posts = this.posts.filter(post => post.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
        return posts.sort((a, b) => a.title > b.title);
      },
      reloaded() {
        this.getPosts();
        return true;
      }
    },
    methods: {
      async getPosts() {
        try {
          let response = await axios.get('/api/posts/user/' + this.$root.$data.user._id);
          this.posts = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      titlePhoto(event) {
        this.images[0] = event.target.files[0]
      },
      photo1(event) {
        this.images[2] = event.target.files[0]
      },
      photo2(event) {
        this.images[3] = event.target.files[0]
      },
      photo3(event) {
        this.images[4] = event.target.files[0]
      },
      previewPhoto(event) {
        this.images[1] = event.target.files[0]
      },
      async upload() {
        try {
          let text = [this.para1, this.para2, this.para3];
          const formData0 = new FormData();
          formData0.append('photo', this.images[0], this.images[0].name)
          let r0 = await axios.post('/api/photos', formData0);
          const formData1 = new FormData();
          formData1.append('photo', this.images[1], this.images[1].name)
          let r1 = await axios.post('/api/photos', formData1);
          const formData2 = new FormData();
          formData2.append('photo', this.images[2], this.images[2].name)
          let r2 = await axios.post('/api/photos', formData2);
          const formData3 = new FormData();
          formData3.append('photo', this.images[3], this.images[3].name)
          let r3 = await axios.post('/api/photos', formData3);
          const formData4 = new FormData();
          formData4.append('photo', this.images[4], this.images[4].name)
          let r4 = await axios.post('/api/photos', formData4);
          let paths = [r0.data.path,r1.data.path,r2.data.path,r3.data.path,r4.data.path];
          let rF = await axios.post('/api/posts/', {
            title: this.title,
            images: paths,
            text: text,
            date: new Date().toLocaleString(),
          });
          this.addItem = rF.data;
        } catch (error) {
          console.log(error);
        }
      },
      selectItem(post) {
        this.findTitle = "";
        this.findItem = post;
        this.para1Edit = post.text[0];
        this.para2Edit = post.text[1];
        this.para3Edit = post.text[2];
      },
      async deletePost(post) {
        try {
          await axios.delete("/api/posts/" + post._id);
          this.findItem = null;
          this.getPosts();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async editPost(post) {
        try {
          console.log(this.findItem);
          let text = [this.para1Edit, this.para2Edit, this.para3Edit];

          await axios.put("/api/posts/" + post._id, {
            title: this.findItem.title,
            text: text,
          });
          this.findItem = null;
          this.getPosts();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
    },
  }
</script>

<style scoped>
  h2 {
    color: #efe6dd;
  }

  p {
    text-align: left;
    font-size: 1em;
  }

  .create {
    background-color: #efe6dd;
    border: 15px;
  }

  textarea {
    height: 200px;
  }

  input {
    margin-bottom: 15px;
  }

  .form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .title {
    width: 200px;
  }

  .edit {
    margin: 30px;
    display: flex;
    flex-direction: column;
  }

  .add {
    margin: 30px;
    display: flex;
    flex-direction: column;
  }

  .search {
    width: 200px;
  }

  /* Suggestions */
  .suggestions {
    width: 200px;
    border: 1px solid #ccc;
    background-color: #fff;
  }

  .suggestion {
    min-height: 20px;
  }

  .suggestion:hover {
    background-color: #5BDEFF;
    color: #fff;
  }

  img {
    max-width: 500px;
    max-height: 500px;
  }

  button {
    margin: 15px;
  }
</style>
