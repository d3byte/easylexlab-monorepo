<template>
  <div>
    <app-header></app-header>
    <div class="signup-container">
      <div v-if="success" class="signup">
        <h2 class="success">Вы успешно зарегистрировались!</h2>
      </div>
      <form v-if="!success" class="signup" onsubmit="return false">
          <h2>Форма регистрации</h2>
          <div class="name">
            <input v-model="name" required type="text" tabindex="1" placeholder="Как к вам обращаться?">
          </div>
          <div class="username">
            <input v-model="username" required type="text" tabindex="2" placeholder="Логин">
          </div>
          <div class="email">
            <input v-model="email" required type="email" tabindex="3" placeholder="Электронная почта для связи">
          </div>
          <div class="password">
            <input v-model="password" required type="password" tabindex="4" placeholder="Пароль">
          </div>
          <select v-model="role" class="ui dropdown">
            <option value="">Кто вы?</option>
            <option value="student">Ученик</option>
            <option value="teacher">Учитель</option>
          </select>
          <div class="school">
            <input type="text" v-model="school" placeholder="Школа №1">
          </div>
          <div v-if="role == 'student'" class="groupcode">
            <input type="text" v-model="groupCode" placeholder="Код группы (необязательно)">
          </div>
          <div class="agree">
            <input required type="checkbox" tabindex="5" id="agree">
            <label for="agree">Даю согласие на обработку персональных данных</label>
          </div>
        <center>
          <button @click="check" class="material-btn" tabindex="6">Отправить заявку</button>
        </center>
      </form>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  data() {
    return {
      name: '',
      username: '',
      email: '',
      password:'',
      role: '',
      groupCode: '',
      school: '',
      success: false
    }
  },
  http: {
    root: '/api'
  },
  methods: {
    check() {
      if(!!this.role.length && !!this.name.length && !!this.username.length && !!this.email.length && !!this.password.length && !!this.school.length) {
        const body = {
          name: this.name,
          username: this.username,
          email: this.email,
          permissions: this.role,
          group: this.groupCode,
          school: this.school
        };
        this.$http.post('signup', body).then(res => {
          console.log(res);
          this.success = res.body.success;
        }).catch(err => {
          throw err;
        })
      }
    }
  },
  mounted() {
    $('.ui.dropdown').dropdown();
  },
  components: {
    'app-header': Header
  }
}
</script>

<style lang="css" scoped>
  .signup-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 93vh;
  }

  .signup {
    max-width: 300px;
    background: #FFFFFF;
    box-shadow: 0 2px 10px black;
    padding: 20px;
  }

  .signup input[type="text"],
  .signup input[type="email"],
  .signup input[type="password"] {
    min-width: 260px;
    border-bottom: 1px solid #1DA1F2;
    font-size: 14px;
  } input[type="password"]:focus,
    input[type="email"]:focus,
    input[type="text"]:focus,
    input[type="password"]:active,
    input[type="email"]:active,
    input[type="text"]:active {
    border-bottom: 1px solid #1DA1F2;
  }

  option {
    font-size: 14px;
  }

  .signup div, .signup h2 {
    margin-bottom: 15px;
  }

  .groupcode {
    margin-top: 15px;
  }

  .agree {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
