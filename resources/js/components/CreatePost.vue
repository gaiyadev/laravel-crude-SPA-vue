<template>
  <div>
    <br />
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary btn-lg" @click="newModal">ADD</button>
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
            <button class="btn btn-danger" @click="deletePost(post.id)">Delete</button>
            <button @click="editModal(post)" class="btn btn-info">Edit</button>
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
            <h5 v-show="editMode" class="modal-title" id="exampleModalLabel">Update Post</h5>
            <h5 v-show="!editMode" class="modal-title" id="exampleModalLabel">Add Post</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- body -->
            <form @submit.prevent="editMode ? updatePost() : createPost() ">
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

              <button v-show="editMode" type="submit" class="btn btn-primary">Update</button>
              <button v-show="!editMode" type="submit" class="btn btn-success">ADD</button>
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
      editMode: false,
      posts: {},
      form: new Form({
        id: "",
        title: "",
        body: ""
      })
    };
  },

  methods: {
    updatePost() {
      this.$Progress.start();
      this.form
        .put("api/post/" + this.form.id)
        .then(() => {
          this.$Progress.finish();
          Fire.$emit("AfterUpdated");
        })
        .catch(() => {
          //error
        });
    },
    editModal(post) {
      this.editMode = true;
      this.form.reset();
      $("#exampleModal").modal("show");
      this.form.fill(post);
    },
    //add modal
    newModal() {
      this.editMode = false;
      this.form.reset();
      $("#exampleModal").modal("show");
    },
    createPost() {
      this.$Progress.start();
      this.form
        .post("api/post")
        .then(this.$Progress.finish())
        .catch(err => {
          console.log(err);
        });
      // $("#exampleModal").modal("hide");
      this.form.reset();
      Fire.$emit("AfterCreated");
    },
    loadPost() {
      axios
        .get("api/post")
        .then(({ data }) => (this.posts = data))
        .catch(err => {
          this.$Progress.fail();
          console.log(err);
        });
    },
    deletePost(id) {
      this.$Progress.start();
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        //send ajax delete request
        this.form
          .delete("api/post/" + id)
          .then(() => {
            if (result.value) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.$Progress.finish();
              Fire.$emit("AfterDeleted");
            }
          })
          .catch(() => {
            Swal.fire("failed!", "Someting went wrong.", "warning");
          });
      });
    }
  },

  mounted() {
    this.loadPost();
    Fire.$on("AfterCreated", () => {
      this.loadPost();
    });
    Fire.$on("AfterDeleted", () => {
      this.loadPost();
    });
    Fire.$on("AfterUpdated", () => {
      this.loadPost();
    });
  }
};
</script>