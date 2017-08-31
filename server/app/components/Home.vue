<template>
<div>
  <app-header />
  <div class="page-content" id="home">
    <div class="h-v white row-col">
      <div class="row-cell v-b">
        <div class="container p-y-lg pos-rlt">
          <h2 class="display-3 _700 l-s-n-3x m-t-lg m-b-md"><span class="text-primary">EasyLexLab</span></h2>
          <h5 class="text-muted m-b-lg">С нами эффективно учиться и легко учить</h5><br>
          <a href="#features" ui-scroll-to="features" class="btn btn-lg btn-outline b-primary text-primary b-2x">Наши особенности</a>
        </div>
      </div>
    </div>
    <div class="pos-rlt" id="features">
      <div class="h-v-5 row-col text-center">
        <div class="col-sm-6 deep-purple v-m">
          <div class="p-a-lg">
            <h2 class=" _700 l-s-n-1x m-y m-b-md">Удобно</h2>
            <p class="h5 text-muted l-h">Выполнение домашнего задания в интуитивно понятном и приятном интерфейсе.</p>
          </div>
        </div>
        <div class="col-sm-6 red-700 v-m">
          <div class="p-a-lg">
            <h2 class=" _700 l-s-n-1x m-y m-b-md">Кроссплатформенность</h2>
            <p class="h5 text-muted l-h">Работайте с планшета, телефона или компьютера.</p>
          </div>
        </div>
      </div>
      <div class="h-v-5 row-col text-center">
        <div class="col-sm-6 primary v-m">
          <div class="p-a-lg">
            <h2 class=" _700 l-s-n-1x m-y m-b-md">Действительно работает</h2>
            <p class="h5 text-muted l-h">Процесс изучения построен так, что ученик точно выучит большую часть слов в процессе выполнения заданий.</p>
          </div>
        </div>
        <div class="col-sm-6 warn v-m">
          <div class="p-a-lg">
            <h2 class=" _700 l-s-n-1x m-y m-b-md">Доступно каждому</h2>
            <p class="h5 l-h">Доступ к сайту может получить каждый абсолютно бесплатно. Так же у нас есть недорогие мобильные приложения для <strong>IOS</strong> и <strong>Android</strong>.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="p-y-lg" id="aboutus">
    <div class="container p-y-lg text-primary-hover">
      <h2 class=" _700 l-s-n-1x m-b-md">Немного о <span class="text-primary">нас</span></h2>
      <h5 class="text-muted m-b-lg">Choose what you like</h5>
      <div class="row m-y-lg">
        <div class="col-md-6 col-lg-4">
          <div class="box white box-shadow-z3 text-center">
              <a href="angular">
                <img class="img-responsive b-b m-b" src="assets/images/layout.png" alt="default">
                <span class="_800 p-a block h4 m-a-0">Default</span>
              </a>
              <div class="box-body">
                <p>
                  <a href="angular?bg=bg">Light</a>,
                  <a href="angular?bg=grey">Grey</a>,
                  <a href="angular?bg=dark">Dark</a>,
                  <a href="angular?bg=black">Black</a>
                </p>
              </div>
              <div class="row-col b-t">
                <a href="angular" class="row-cell _500 p-a b-r">Angular</a>
                <a href="html/dashboard.html" class="row-cell _500 p-a">Html</a>
              </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box white box-shadow-z3 text-center">
              <a href="angular/?layout=0">
                <img class="img-responsive b-b m-b" src="assets/images/layout.0.png" alt="zero">
                <span class="_800 p-a block h4 m-a-0">Zero</span>
              </a>
              <div class="box-body">
                <p>
                  <a href="angular?layout=0&bg=bg">Light</a>,
                  <a href="angular?layout=0&bg=grey">Grey</a>,
                  <a href="angular?layout=0&bg=dark">Dark</a>,
                  <a href="angular?layout=0&bg=black">Black</a>
                </p>
              </div>
              <div class="row-col b-t">
                <a href="angular/?layout=0" class="row-cell _500 p-a b-r">Angular</a>
                <a href="html/dashboard.0.html" class="row-cell _500 p-a">Html</a>
              </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box white box-shadow-z3 text-center">
              <a href="angular/?layout=1">
                <img class="img-responsive b-b m-b" src="assets/images/layout.1.png" alt="zero">
                <span class="_800 p-a block h4 m-a-0">One</span>
              </a>
              <div class="box-body">
                <p>
                  <a href="angular?layout=1&bg=bg">Light</a>,
                  <a href="angular?layout=1&bg=grey">Grey</a>,
                  <a href="angular?layout=1&bg=dark">Dark</a>,
                  <a href="angular?layout=1&bg=black">Black</a>
                </p>
              </div>
              <div class="row-col b-t">
                <a href="angular/?layout=1" class="row-cell _500 p-a b-r">Angular</a>
                <a href="html/dashboard.1.html" class="row-cell _500 p-a">Html</a>
              </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box white box-shadow-z3 text-center">
              <a href="angular/?layout=2">
                <img class="img-responsive b-b m-b" src="assets/images/layout.2.png" alt="zero">
                <span class="_800 p-a block h4 m-a-0">Two</span>
              </a>
              <div class="box-body">
                <p>
                  <a href="angular?layout=2&bg=bg">Light</a>,
                  <a href="angular?layout=2&bg=grey">Grey</a>,
                  <a href="angular?layout=2&bg=dark">Dark</a>,
                  <a href="angular?layout=2&bg=black">Black</a>
                </p>
              </div>
              <div class="row-col b-t">
                <a href="angular/?layout=2" class="row-cell _500 p-a b-r">Angular</a>
                <a href="html/dashboard.2.html" class="row-cell _500 p-a">Html</a>
              </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box white box-shadow-z3 text-center">
              <a href="angular/?layout=3">
                <img class="img-responsive b-b m-b" src="assets/images/layout.3.png" alt="zero">
                <span class="_800 p-a block h4 m-a-0">Three</span>
              </a>
              <div class="box-body">
                <p>
                  <a href="angular?layout=3&bg=bg">Light</a>,
                  <a href="angular?layout=3&bg=grey">Grey</a>,
                  <a href="angular?layout=3&bg=dark">Dark</a>,
                  <a href="angular?layout=3&bg=black">Black</a>
                </p>
              </div>
              <div class="row-col b-t">
                <a href="angular/?layout=3" class="row-cell _500 p-a b-r">Angular</a>
                <a href="html/dashboard.3.html" class="row-cell _500 p-a">Html</a>
              </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box white box-shadow-z3 text-center">
              <a href="angular/?layout=4">
                <img class="img-responsive b-b m-b" src="assets/images/layout.4.png" alt="zero">
                <span class="_800 p-a block h4 m-a-0">Four</span>
              </a>
              <div class="box-body">
                <p>
                  <a href="angular?layout=4&bg=bg">Light</a>,
                  <a href="angular?layout=4&bg=grey">Grey</a>,
                  <a href="angular?layout=4&bg=dark">Dark</a>,
                  <a href="angular?layout=4&bg=black">Black</a>
                </p>
              </div>
              <div class="row-col b-t">
                <a href="angular/?layout=4" class="row-cell _500 p-a b-r">Angular</a>
                <a href="html/dashboard.4.html" class="row-cell _500 p-a">Html</a>
              </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box white box-shadow-z3 text-center">
              <a href="angular/?layout=5">
                <img class="img-responsive b-b m-b" src="assets/images/layout.5.png" alt="zero">
                <span class="_800 p-a block h4 m-a-0">Five</span>
              </a>
              <div class="box-body">
                <p>
                  <a href="angular?layout=5&bg=bg">Light</a>,
                  <a href="angular?layout=5&bg=grey">Grey</a>,
                  <a href="angular?layout=5&bg=dark">Dark</a>,
                  <a href="angular?layout=5&bg=black">Black</a>
                </p>
              </div>
              <div class="row-col b-t">
                <a href="angular/?layout=5" class="row-cell _500 p-a b-r">Angular</a>
                <a href="html/dashboard.5.html" class="row-cell _500 p-a">Html</a>
              </div>
          </div>
        </div>
      </div>
      <h5 class="m-y-lg text-muted text-center">Создано школьниками для школьников</h5>
    </div>
  </div> -->
  <footer class="black pos-rlt">
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
          <!-- <a class="nav-link m-x" href="#aboutus" ui-scroll-to="#aboutus">
            <span class="nav-text">О нас</span>
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
          <div class="col-sm-4">
            <div class="text-sm-right text-xs-left">
              Создано с помощью <strong><a href="https://themeforest.net/item/flatkit-app-ui-kit/13231484" target="_blank">Flatkit</a></strong>
            </div>
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

<style lang="css">
</style>
