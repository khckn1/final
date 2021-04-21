<template>
  <div class="home">
    <div class='header'>
      <img src='/images/airplane.jpeg' style='width: 100%'/>
      <div class='page-title'>
        <h1>Traveling</h1>
      </div>
    </div>
    <div class='content'>
      <div class='post introduction'>
        <div class='text'>
          <h2>Introduction</h2>
          <p>At some point, just about everyone figures out that traveling isn’t
            difficult. You book a flight, hotel, and look up some things to do.
            Maybe you buy a package and everything is planned for you. You go,
            see the top sights, then leave. It’s instagramable and you see some
            pretty cool things. But, this never seemed enough to me. For some
            reason, my parents didn’t like the feeling of being a tourist. So,
            growing up, I never really got the chance. The first time we left
            the country was for 5 months. The second time I left was 2 years.
            The next time was 5 months again. The point was really seeing the
            country, experiencing the culture, speaking some of the language,
            and eating the food. This blog is to talk about the experiences
            trying to experience the culture during traveling, instead of just
            the beaches or restaurants or “top 10 destinations”. </p>
          </div>
        </div>
        <div class='post preview'>
          <Preview :posts='posts'/>
        </div>
      </div>
    </div>
  </template>

  <script>
    import Preview from "../components/Preview.vue";
    export default {
      name: "Home",
      components: {
        Preview,
      },
      computed: {
        posts() {
          return this.$root.$data.posts;
        },
      }
    };
  </script>

  <style>
    .header {
      max-height: 500px;
      position: relative;
      text-align: center;
    }

    .header img {
      max-height: inherit;
      object-fit: cover;
      border-bottom: solid 15px #77966d;
    }
    .page-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .header h1 {
      font-family: 'Satisfy', cursive;
      color: #77966d;
      text-shadow: 2px 2px #454545;
      font-size: 8em;

    }
    h2 {
      font-family: 'Anton', sans-serif;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      text-align: left;
      width: 100%
    }

    .post {
      border: solid 5px #454545;
      padding: 5px;
      width: 70%;
      background-color: #efe6dd;
    }

    p {
      font-family: 'Noto Sans JP', sans-serif;
      font-size: 1.2em;
      float: left;
    }

    .text {
      float: left;
      width: auto;
    }
  </style>
