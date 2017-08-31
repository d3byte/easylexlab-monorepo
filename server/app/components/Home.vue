<template>
<div>
  <app-header />
  <div class="page-content" id="home">
    <div class="h-v white row-col">
      <div class="row-cell v-b">
        <div class="container p-y-lg pos-rlt">
          <h2 class="display-2 _700 l-s-n-3x m-t-lg m-b-md"><span class="text-primary">EasyLexLab</span></h2>
          <h5 class="text-muted m-b-lg">С нами эффективно учиться и легко учить</h5>
          <h5 class="text-muted text-center m-b-lg">
            Наши особенности<br>
            <i class="material-icons icon">&#xE5C5;</i>
          </h5>
        </div>
      </div>
    </div>
    <div class="pos-rlt" id="features">
      <div class="h-v-5 row-col text-center">
        <div class="col-sm-6 v-m" style="background: #316672; color: white;">
          <div class="p-a-lg">
            <h2 class=" _700 l-s-n-1x m-y m-b-md">Удобно</h2>
            <p class="h5 text-muted l-h">Выполнение домашнего задания в интуитивно понятном и приятном интерфейсе.</p>
          </div>
        </div>
        <div class="col-sm-6 primary v-m">
          <div class="p-a-lg">
            <h2 class=" _700 l-s-n-1x m-y m-b-md">Кроссплатформенность</h2>
            <p class="h5 text-muted l-h">Работайте с планшета, телефона или компьютера.</p>
          </div>
        </div>
      </div>
      <div class="h-v-5 row-col text-center">
        <div class="col-sm-6 v-m" style="background: #6F9B80; color: white;">
          <div class="p-a-lg">
            <h2 class=" _700 l-s-n-1x m-y m-b-md">Действительно работает</h2>
            <p class="h5 text-muted l-h">Процесс изучения построен так, что ученик точно выучит большую часть слов в процессе выполнения заданий.</p>
          </div>
        </div>
        <div class="col-sm-6 v-m" style="background: #E2B100; color: white;">
          <div class="p-a-lg">
            <h2 class=" _700 l-s-n-1x m-y m-b-md">Доступно каждому</h2>
            <p class="h5 l-h">Доступ к сайту может получить каждый абсолютно бесплатно. Так же у нас есть недорогие мобильные приложения для <strong>IOS</strong> и <strong>Android</strong>.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="p-y-lg" id="roles">
    <div class="container p-y-lg text-primary-hover">
      <h2 class=" _700 l-s-n-1x m-b-md">Разделение на <span class="text-primary">роли</span></h2>
      <h5 class="text-muted m-b-lg">Вы можете создать аккаунт учителя или ученика.</h5>
      <h5 class="text-muted m-b-lg">Каждый тип аккаунта предполагает различный набор инструментов для работы</h5>
      <div class="row m-y-lg">
        <div class="col-md-12 col-lg-6">
          <div class="box white box-shadow-z3 text-center">
            <img src="pics/teacher.png" class="img-responsive b-b m-b">
            <span class="_800 p-a block h4 m-a-0">Профиль учителя</span>
            <div class="box-body">
            </div>
          </div>
        </div>
        <div class="col-md-12 col-lg-6">
          <div class="box white box-shadow-z3 text-center">
            <img src="pics/student.png" class="img-responsive b-b m-b">
            <span class="_800 p-a block h4 m-a-0">Профиль ученика</span>
            <div class="box-body">
            </div>
          </div>
        </div>
      </div>
      <div class="row m-y-lg">
        <div class="col-md-6 col-lg-4">
          <div class="box white box-shadow-z3 text-center">
            <img src="pics/group.png" class="img-responsive b-b m-b">
            <span class="_800 p-a block h4 m-a-0">Страница группы</span>
            <div class="box-body">
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box white box-shadow-z3 text-center">
            <img src="pics/stats.png" class="img-responsive b-b m-b">
            <span class="_800 p-a block h4 m-a-0">Статистика ученика</span>
            <div class="box-body">
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box white box-shadow-z3 text-center">
            <img src="pics/task.png" class="img-responsive b-b m-b">
            <span class="_800 p-a block h4 m-a-0">Страница задания</span>
            <div class="box-body">
            </div>
          </div>
        </div>
      </div>
      <h5 class="text-muted text-center m-b-lg">
        Заведите аккаунт уже сейчас – <router-link to="/signup">зарегистрироваться</router-link>
      </h5>
    </div>
  </div>
  <footer class="pos-rlt" style="background: #4D5E7C; color: white">
    <div class="footer dk">
      <div class="text-center container p-y-lg">
        <div class="clearfix text-lg m-t">
          <strong>EasyLexLab</strong>
        </div>
        <div class="nav m-y text-primary-hover">
          <a class="nav-link m-x" href="#" ui-scroll-to="" >
            <span class="nav-text">Наверх</span>
          </a>
          <a class="nav-link m-x" href="#features" ui-scroll-to="features" >
            <span class="nav-text">Особенности</span>
          </a>
          <a class="nav-link m-x" href="#roles" ui-scroll-to="#roles">
            <span class="nav-text">Роли</span>
          </a>
          <!-- <a class="nav-link m-x" href="#feedback" ui-scroll-to="#feedback">
            <span class="nav-text">Отзывы</span>
          </a> -->
        </div>
        <div class="block clearfix">
          <a href="https://twitter.com" target="_blank" class="btn btn-icon btn-social rounded btn-sm m-r">
            <i class="fa fa-twitter"></i>
            <i class="fa fa-twitter light-blue"></i>
          </a>
          <a href="https://vk.com" class="btn btn-icon btn-social rounded btn-sm">
            <i class="fa fa-vk"></i>
            <i class="fa fa-vk pink"></i>
          </a>
        </div>
      </div>
      <div class="b b-b"></div>
      <div class="p-a-md">
        <div class="row footer-bottom">
          <div class="col-sm-8">
            <small class="text-muted"><strong><a href="#" target="_blank">DoItNow.co</a></strong> &copy; Copyright 2017</small>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
</template>

<script>
import Header from './Header.vue';
export default {
    components: {
        'app-header': Header
    }
}
</script>

<style lang="css" scoped>
.icon {
  font-size: 36px;
}

.col-md-6.col-lg-4 img,
.col-md-12.col-lg-6 img {
  border-bottom: 1px solid black;
}
</style>
