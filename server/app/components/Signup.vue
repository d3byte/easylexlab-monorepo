<template>
  <div class="center-block w-xxl w-auto-xs p-y-md">
    <div class="navbar">
      <div class="pull-center">
        <router-link to="/" tabindex="-1" class="ui small image logo">
          <img src="pics/logo-small.png">
        </router-link>
        <router-link to="/" tabindex="-1" class="logo-link">
          <h3>EasyLexLab</h3>
        </router-link>
      </div>
    </div>

    <div class="p-a-md box-color r box-shadow-z1 text-color m-a">
      <div class="m-b text-sm">
        Регистрация
      </div>
      <div v-if="error" class="alert ng-scope ng-isolate-scope alert-danger alert-dismissible">{{ errorMsg }}
      </div>
      <form v-if="!success && !showPreloader" onsubmit="return false">
        <div class="md-form-group float-label">
          <input v-model="name" type="text" tabindex="1" class="md-input" required>
          <label>Имя</label>
        </div>
        <div class="md-form-group float-label">
          <input v-model="email" type="email" tabindex="2" class="md-input" required>
          <label>Email</label>
        </div>
        <div class="md-form-group float-label">
          <input v-model="username" type="text" tabindex="3" class="md-input" required>
          <label>Логин</label>
        </div>
        <div class="md-form-group float-label">
          <input v-model="password" type="password" tabindex="4" class="md-input" required>
          <label>Пароль</label>
        </div>
        <div class="md-form-group float-label">
          <input v-model="school" type="text" tabindex="5" class="md-input" required>
          <label>Название учебного заведения</label>
        </div>
        <div class="md-form-group">
          <label class="md-check">
            <input type="radio" v-model="role" value="teacher" name="radio" class="has-value">
            <i class="indigo"></i>
            Учитель
          </label>
          <label class="md-check">
            <input type="radio" v-model="role" value="student" name="radio" class="has-value">
            <i class="indigo"></i>
            Ученик
          </label>
        </div>
        <div class="md-form-group float-label" v-if="role == 'student'">
          <input type="text" v-model="groupCode" class="md-input">
          <label>Код группы (необязательно)</label>
        </div>
        <div class="m-b-md">
          <label class="md-check">
            <input type="checkbox" v-model="agree" required><i class="primary"></i>
            <router-link to="/eula">Разрешаю обработку своих персональных данных</router-link>
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
                name: '',
                username: '',
                email: '',
                password: '',
                role: '',
                groupCode: '',
                school: '',
                agree: false,
                success: false,
                error: false,
                errorMsg: '',
                showPreloader: false
            }
        },
        http: {
            root: '/api'
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
                if (this.agree && !!this.role.length && !!this.name.length && this.username.length >= 5 && !!this.email.length && this.password.length >= 6 && !!this.school.length) {
                    this.showPreloader = true;
                    const body = {
                        name: this.name,
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        permissions: this.role,
                        groupCode: this.groupCode,
                        school: this.school
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
                                    this.showPreloader = false;
                                }).catch(err => {
                                    this.showPreloader = false;
                                    throw err;
                                });
                            } else {
                                !!res.body.error ? this.errorMsg = res.body.error : this.errorMsg = '';
                                this.success = res.body.success;
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
</style>
