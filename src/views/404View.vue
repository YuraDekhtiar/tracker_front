<template>
  <div class="container">
    <div class="col-md-12 col-sm-12">
      <div class="card shadow-lg border-0 rounded-lg mt-5 mx-auto" style="width: 30rem;">
        <h3 class="card-header display-1 text-muted text-center">
          404
        </h3>
        <span class="card-subtitle mb-2 text-muted text-center">
                Page Could Not Be Found
        </span>
        <div class="card-body mx-auto">
          <router-link to="/" class="btn btn-outline-secondary">
            Back To Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: "Error 404",
    }
  },

  async beforeMount() {
    document.title = this.title;
  }
}


</script>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: .25rem;
}

.card .card-header {
  background-color: #fff;
  border-bottom: none;
}
</style>
