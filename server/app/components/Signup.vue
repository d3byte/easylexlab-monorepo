<template>
  <div class="center-block w-xxl w-auto-xs p-y-md">
    <div class="p-a-md box-color r box-shadow-z1 text-color m-a" style="border-top:4px solid rgb(65, 159, 225);border-radius:5px;">
      <div v-if="!success" class="m-b text-md">
        Регистрация
      </div>
      <div v-if="success" class="m-b text-sm">
        <span class="text-success">
          Вы успешно зарегистрировались.
          <router-link to="/login" class="text-primary _600">Войти</router-link>
        </span>
      </div>
      <div v-if="error" class="alert ng-scope ng-isolate-scope alert-danger alert-dismissible">{{ errorMsg }}
      </div>
      <form v-if="!success" onsubmit="return false">
        <div class="md-form-group">
          <input v-model="firstName" type="text" tabindex="1" class="md-input" required>
          <label>Имя</label>
        </div>
        <div class="md-form-group">
          <input v-model="lastName" type="text" tabindex="1" class="md-input" required>
          <label>Фамилия</label>
        </div>
        <div class="md-form-group">
          <input v-model="email" type="email" tabindex="2" class="md-input" required>
          <label>Email</label>
        </div>
        <div class="md-form-group">
          <input v-model="username" type="text" tabindex="3" class="md-input" required>
          <label>Логин</label>
        </div>
        <div class="md-form-group">
          <input v-model="password" type="password" tabindex="4" class="md-input" required>
          <label>Пароль</label>
        </div>
        <div class="md-form-group">
          <input v-model="school" type="text" tabindex="5" class="md-input" required>
          <label>Название учебного заведения</label>
        </div>
        <div class="md-form-group">
          <input v-model="city" type="text" tabindex="6" class="md-input" required>
          <label>Город</label>
        </div>
        <div class="md-form-group" v-if="both">
          <input id="student" type="radio" v-model="role" value="student">
          <label for="student" style="margin-right:10px">Ученик</label>
          <input id="teacher" type="radio" v-model="role" value="teacher">
          <label for="teacher">Учитель</label>
        </div>
        <div class="md-form-group" v-if="role == 'student'">
          <input type="text" v-model="groupCode" class="md-input">
          <label>Код группы (необязательно)</label>
        </div>
        <div class="m-b-md">
          <label class="md-check" style="font-size: 12px">
            <input type="checkbox" v-model="agree" required><i class="primary"></i>
            Я ознакомлен с <router-link to="/info/rules" target="_blank"><u>пользовательским соглашением</u></router-link> и разрешаю обработку персональных данных
          </label>
        </div>
        <button type="submit" @click="check" class="btn primary btn-block p-x-md">Зарегистрироваться
        </button>
      </form>
    </div>

    <div class="p-v-lg text-center">
      <div>Уже есть аккаунт?
        <router-link to="/login" class="text-primary _600">Войти</router-link>
      </div>
    </div>
  </div>
</template>

<script>
    import Header from './Header.vue';

    export default {
        data() {
            return {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                role: '',
                groupCode: '',
                school: '',
                city: '',
                agree: false,
                success: false,
                error: false,
                errorMsg: '',
                showPreloader: false
            }
        },
        http: {
            root: '//ealapi.tw1.ru/api'
        },
        methods: {
            check() {
                if (this.username.length < 5) {
                    this.errorMsg = 'Длина логина должна быть не меньше 5 символов';
                    this.error = true;
                }
                if (this.password.length < 6) {
                    this.errorMsg = 'Длина пароля должна быть не меньше 6 символов';
                    this.error = true;
                }
                if (this.agree && !!this.role.length && this.username.length >= 5 && !!this.email.length && this.password.length >= 6 && !!this.school.length) {
                    this.showPreloader = true;
                    const body = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        permissions: this.role,
                        groupCode: this.groupCode,
                        school: this.school,
                        city: this.city,
                        both: false
                    };
                    this.$http.post('signup', body).then(res => {
                        if (res.body.success) {
                            if (!!this.groupCode) {
                                this.$http.patch('addstudent', {
                                    groupCode: this.groupCode,
                                    studentId: res.body.userId
                                }).then(res => {
                                    !!res.body.error ? this.errorMsg = res.body.error : this.errorMsg = '';
                                    this.success = res.body.success;
                                    this.error = false;
                                    this.showPreloader = false;
                                }).catch(err => {
                                    this.showPreloader = false;
                                    throw err;
                                });
                            } else {
                                !!res.body.error ? this.errorMsg = res.body.error : this.errorMsg = '';
                                this.success = res.body.success;
                                this.error = false;
                                this.showPreloader = false;
                            }
                        } else {
                            !!res.body.error ? this.errorMsg = res.body.error : this.errorMsg = '';
                            this.error = true;
                            this.showPreloader = false;
                        }
                    }).catch(err => {
                        this.showPreloader = false;
                        throw err;
                    });
                }
            }
        },
        created() {
            if (this.$store.getters.loginState)
                this.$router.push('/profile');
            if(this.$route.fullPath == '/signup/teacher') {
              this.role = 'teacher';
            } else if(this.$route.fullPath == '/signup/student'){
              this.role = 'student';
            } else if(this.$route.fullPath == '/signup') {
              this.both = true;
            }
        },
        components: {
            'app-header': Header
        }
    }
</script>

<style lang="css" scoped>
    .navbar {
        box-shadow: none;
    }
    .btn {
        text-transform: none;
    }
    
    label {
        font-size: 14px;
    }
</style>
