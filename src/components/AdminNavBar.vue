
<template>
  <nav class="navbar  navbar-expand-lg navbar-light bg-light ">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="container-fluid mx-auto">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">


        </ul>

      </div>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'adminNavBar',
  props: {
    logoutHandler: Function,
    userName: String,
  }
}
</script>

<style>
.dropdown-menu {
  width: 10px;
}
.media {
  display: flex;
  align-items: flex-start;
}

.media-body {
  flex: 1 1;
}

.avatar {
  font-size: 1rem;
  display: inline-flex;
  width: 48px;
  height: 48px;
  color: #fff;
  border-radius: 50%;
  background-color: #adb5bd;
  align-items: center;
  justify-content: center;
}
.avatar img {
  width: 100%;
  border-radius: 50%;
}

.avatar-sm {
  font-size: .875rem;
  width: 36px;
  height: 36px;
}
</style>
