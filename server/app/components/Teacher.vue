<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6">
        <h5>Личная страница</h5>
        <h3 class="name">{{ user.username }}</h3>
      </div>
      <div class="col-lg-3">
        <router-link to="/profile/settings">
          <button class="btn"><i class="fa fa-cogs" aria-hidden="true"></i> Настройки</button>
        </router-link>
      </div>
      <div class="col-lg-3">
        <router-link to="/profile/newgroup">
          <button class="btn"><i class="fa fa-pencil" aria-hidden="true"></i> Создать группу</button>
        </router-link>
      </div>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
}
</script>

<style lang="css">
  .row {
    vertical-align: center;
  }
  .col-lg-3:first-of-type {
    text-align: center;
  } .col-lg-3:first-of-type h5:first-of-type,
   .col-lg-3:first-of-type h3 {
    margin: 5px;
  }
  .col-lg-4 {
    text-align: center;
  } a {
    margin-right: 25px;
  }

  .btn {
    transition: 0.3s;
  } .btn:hover {
    background: #FCA311;
  }
</style>
