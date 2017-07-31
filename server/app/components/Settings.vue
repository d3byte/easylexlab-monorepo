<template>
  <div class="box">
    <center>
      <div class="row">
        <div class="col-lg-12">
          <h2>Пользовательские настройки</h2>
          <br>
        </div>
      </div>
      <div class="row pad">
        <div class="col-lg-4">
          <h3>Изменение пароля</h3>
          <br>
          <form>
            <div class="old_pass">
            <input type="text" placeholder="Старый пароль">
          </div>
            <br>
            <div class="new_pass">
            <input type="text" placeholder="Новый пароль">
          </div>
            <br>
            <div class="new_pass_conf">
            <input type="text" placeholder="Подтвердите пароль">
          </div>
          <br>
          <button @click="check" class="btn btn-primary">Сменить пароль</button>
          </form>
        </div>
        <div class="col-lg-4">
          <h3>Изменение данных о пользователе</h3>
          <br>
          <form>
            <div class="change_mail">
            <input type="text" placeholder="Ваша почта"> <!-- тут надо намутить тему шоб подставлялось мыло юзера на данный момент -->
          </div>
            <br>
            <div class="change_name">
            <input type="text" placeholder="Ваше имя">
          </div>
            <br>
            <div class="change_school">
            <input type="text" placeholder="Ваша школа"> <!-- тут тоже -->
          </div>
          <br>
          <button @click="check" class="btn btn-primary">Применить изменения</button>
          </form>
        </div>
        <div class="col-lg-4">
          <h3>Присоединение к группе</h3>
          <br>
          <form>

          <!-- временный костыль -->
          <div class="hideme">
          <input type="text">
        </div>
        <br>
        <div class="join_group">
        <input type="text" placeholder="Код группы">
      </div>
          <br>
          <div class="hideme">
          <input type="text">
        </div>
        <br>
        <!-- конец костыля -->
          <button @click="check" class="btn btn-primary">Присоединиться к группе</button>
          </form>
        </div>
      </div>
    </center>
</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('hideGames');
    this.$store.dispatch('zeroAttempts');
    this.$store.dispatch('testNotAvailable');
  }
}
</script>

<style lang="css">
.hideme{
  visibility: hidden;
}

.pad{
  padding: 20px;
}
</style>
