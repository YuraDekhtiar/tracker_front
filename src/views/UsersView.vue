<template>
    <div class="container">
      {{data}}
    </div>

</template>

<script>
import api from "@/api/api";

export default {
  data() {
    return {
      loading: false,
      data: Object,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  async created() {
    if (!this.loggedIn) {
      await this.$router.push("/login");
    }

    this.data = await api.get('/profile').then(r => r.data);
  },
}
</script>
