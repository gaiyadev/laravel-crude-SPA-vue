<template>
  <div>
    <br />
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary btn-lg"
      data-toggle="modal"
      data-target="#exampleModal"
    >ADD</button>
    <alert-success :form="form" message="Your changes have been saved!"></alert-success>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Body</th>
          <th scope="col">Date</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <th scope="row">1</th>
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
          <td>
            <a href class="btn btn-danger">Delete</a>
            <a href class="btn btn-info">Update</a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Post</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- body -->
            <form @submit.prevent="createPost">
              <div class="form-group">
                <label>Title</label>
                <input
                  v-model="form.title"
                  type="text"
                  name="title"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('title') }"
                />
                <has-error :form="form" field="title"></has-error>
              </div>

              <div class="form-group">
                <label>Body</label>
                <textarea
                  v-model="form.body"
                  name="body"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('body') }"
                ></textarea>
                <has-error :form="form" field="body"></has-error>
              </div>

              <button type="submit" class="btn btn-primary">ADD</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: {},
      form: new Form({
        title: "",
        body: ""
      })
    };
  },

  methods: {
    createPost() {
      this.form.post("api/post");
    },
    loadPost() {
      axios.get("api/post").then(({ data }) => (this.posts = data));
    }
  },

  created() {
    this.loadPost();
  }
};
</script>