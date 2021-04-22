<template>
  <div class="review">
    <div class='header'>
      <img src='/images/airplane.jpeg' style='width: 100%'/>
      <div class='page-title'>
        <h1>Assignment</h1>
      </div>
    </div>
    <div class='content'>
      <div class='post introduction'>
        <div class='text'>
          <h2>Final Project</h2>
          <p>I have many more that two router pages, and it increases with adding
            more posts. My back-end is all Monge, Node, and Express, and the data
            persists with a page reload. You can create comments and posts, you can edit
            and delete posts. Users are authenticated with a username and password, and without
            being logged in, you can't make, edit, or delete posts, and you can't see or add comments.
            I have four models which are linked together. My REST API uses authentication. I don't really have
            responsive design.</p>
          </div>
          <div class='text'>
            <h2>Creative Project 4</h2>
            <p>I have many more that two router pages, and it increases with adding
              more posts. My back-end is all Monge, Node, and Express, and the data
              persists with a page reload. You can create comments and posts, you can edit
              and delete posts. I don't really have responsive design.</p>
            </div>
            <div class='text'>
              <h2>Creative Project 3</h2>
              <p>I have many more that two router pages, and it increases with adding
                more posts. You can create comments and posts, you can edit
                and delete posts. I didn't include mock data in this, but the original
                CP3 that I submitted has a fair amount of mock data.</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <script>
        export default {
          name: "Review",
          components: {
          },
          computed: {
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
