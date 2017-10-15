<template>
  <main id="landing">
    <div class="home hidden-sm-down">
      <!-- Start of the first section -->
      <section class="section section--first">

        <app-header v-if="logged" />

        <div v-else class="navbar-parent">
          <div class="container">
            <ul class="nav navbar-nav pull-right text-primary-hover">
              <li class="nav-item">
                <router-link to="/signup/student" class="nav-link text-bold">
                    Регистрация ученика
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/signup/teacher" class="nav-link text-bold">
                    Регистрация учителя
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="container">

          <div class="page-title">
            <!-- <object type="image/svg+xml" data="../pics/logo-test.svg" class="logo">
              <img src="../pics/logo.png" class="logo">
            </object> -->
            <!-- <img src="../pics/dju.svg" class="logo"> -->
            <img src="../pics/logo.png" class="logo">
          </div>

          <h5 class="text-bold">
            <i>
              С нами эффективно учить<br>
              и легко учиться
            </i>
          </h5>

          <p class="brief-description">
            <span class="brief-description_name">EasyLexLab</span><br>
            <span class="brief-description_text">
              - это образовательная платформа<br>
              для изучения иностранных слов,<br>
              предназначенная для учителей<br>
              и учеников, изучающих языки
            </span>
          </p>

          <div class="row">
            <router-link to="/profile">
              <button
                class="large-button large-button--blue col-md-4 col-sm-12 col-xs-12">
                Личный кабинет
              </button>
            </router-link>

            <div class="col-md-8 text-align--right" style="padding-top:15px">
                <span class="brief-description_name blue-text">Мобильное приложение EasyLexLab,</span><br>
                <span class="brief-description_text">
                  разработанное для вашего удобства является<br>
                  дополнением к существующей платформе.<br>
                  Выполняйте домашние задание, где бы вы<br>
                  ни находились!
                </span>
            </div>
          </div>

          <div class="row features">

            <div class="col-md-3 feature">
              <div class="col-md-12 border-top border-top--blue">
                <div class="feature-header">
                  <img src="../pics/advantage-4.png" class="feature-img">
                </div>
                <div class="feature-body">
                  <p>Эффективно усваивать слова, необходимые для использования на уроках</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 feature">
              <div class="col-md-12 border-top border-top--green">
                <div class="feature-header">
                  <img src="../pics/advantage-2.png" class="feature-img">
                </div>
                <div class="feature-body">
                  <p>Выполнять домашнее задание в любом месте в любое время, используя смартфон, компьютер или планшет</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 feature">
              <div class="col-md-12 border-top border-top--purple">
                <div class="feature-header">
                  <img src="../pics/advantage-1.png" class="feature-img">
                </div>
                <div class="feature-body">
                  <p>В игровой форме запоминать слова, что превращает рутинную работу в интересное и полезное занятие</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 feature">
              <div class="col-md-12 border-top border-top--orange">
                <div class="feature-header">
                  <img src="../pics/advantage-3.png" class="feature-img">
                </div>
                <div class="feature-body">
                  <p>Ежедневно наблюдать прогресс и становиться всё ближе к цели – "свободно общаться на иностранном языке"</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>
      <!-- End of the first section    -->
      <!-- ––––––––––––––––––––––––––– -->
      <!-- Start of the second section -->
      <section class="section section--second">
        <div class="container video">
          <div class="video-header">
            <h2 class="text-center text-bold">Как работает EasyLexLab?</h2>
          </div>
          <div class="video-body">
            <video class="col-lg-12 col-md-12 col-sm-12 col-xs-12" src="" poster="" controls></video>
          </div>
        </div>
      </section>
      <!-- End of the second section -->
      <!-- –––––––––––––––––––––––––– -->
      <!-- Start of the third section -->
      <section class="section section--third">

        <div class="container">

          <div class="row">
            <div class="col-md-5">
              <div class="col-md-12 text-right">
                <h2 class="text-bold" style="margin-bottom:25px">Делитесь<br>знаниями</h2>
                <p>
                  Успеваемость 95% учеников,
                  использующих EasyLexLab,
                  улучшилась. Узнайте, как простые
                  средства от EasyLexLab позволят Вам
                  максимально эффективно построить
                  процесс обучения и помочь ученикам
                  достичь успеха в изучении
                  иностранных языков
                </p>
                <router-link to="/signup/teacher" class="text-right">
                  <button
                    class="large-button large-button--green large-button--width-70">
                    Я учитель
                  </button>
                </router-link>
              </div>
            </div>
            <div class="col-md-7">
              <div class="col-md-12 image-container">
                <img src="../pics/teacher.png" class="img-adaptive img">
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-7">
              <div class="col-md-12 image-container">
                <img src="../pics/students-third.png" class="img-adaptive img">
              </div>
            </div>
            <div class="col-md-5">
              <div class="col-md-12 text-left">
                <h2 class="text-bold" style="margin-bottom:25px">Учеба в<br>удовольствие</h2>
                <p>
                  Хочешь легко запомнить много слов?
                  EasyLexLab может тебе в этом помочь.
                  Выполняй домашнее задание с удовольствием
                  в любом месте и в любое время. Наблюдай за тем,
                  как пополняется твой словарный запас и не
                  забывай использовать эти слова в речи.
                </p>
                <router-link to="/signup/student" class="text-left">
                  <button
                    class="large-button large-button--green large-button--width-70">
                    Я ученик
                  </button>
                </router-link>
              </div>
            </div>
          </div>

        </div>

      </section>
      <!-- End of the second section -->
      <!-- ––––––––––––––––––––––––––– -->
      <!-- Start of the fourth section -->
      <section class="section section--fourth">

        <div class="container advantages">
          <img class="col-lg-12 col-md-12 col-sm-12 col-xs-12" src="../pics/tablet.png">
        </div>

        <div class="container center-content">
          <div class="statistic">
            <!-- 
              <p class="text-center text-bold">В течение нескольких лет учителя и ученики нашей школы используют EasyLexLab</p>
              <p class="text-center">на уроках английского языка. Интерактивные задания в союзе с традиционными учебниками дают хорошие результаты, повышают степень индивидуализации обучения и стимулируют детей к получению знаний.</p>
            -->
            <button class="large-button large-button--green" style="padding-left:10px;padding-right:10px">Зарегистрироваться</button>
          </div>
        </div>

      </section>
      <!-- End of the fourth section -->
      <!-- ––––––––––––––––––––––––––– -->
      <!-- Start of footer -->
      <div class="navbar-parent">
        <div class="container">
          <div class="footer">
            <router-link to="">EasyLexLab © 2017</router-link>
            <router-link to="">Политика конфиденциальности</router-link>
            <router-link to="/info/rules" target="_blank">Пользовательское соглашение</router-link>
          </div>
        </div>
      </div>
      <!-- End of footer -->
      <!-- ––––––––––––– -->
    </div>
    <div class="home hidden-md-up">
      <!--  Мобильная вёрстка -->
    </div>
  </main>
</template>

<script>
import Header from './Header.vue';
export default {
  computed: {
    logged() {
        return this.$store.getters.loginState
    },
  },
  components: {
      'app-header': Header
  }
}
</script>

<style lang="css" scoped>
.home {
  background: rgb(244, 248, 251);
}

.section {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  margin-bottom: 40px;
} .section:last-child {
  margin-bottom: 0;
} .section:first-child {
  padding-top: 0;
}

.text-bold {
  font-weight: bold;
}

.text-align--right {
  text-align: right;
}

.blue-text {
  color: rgb(65, 90, 175);
}

.container {
  box-sizing: border-box;
  width: 75%;
  margin-bottom: 0;
  padding:0 30px;
}

.navbar-parent {
  background: rgb(65, 90, 175);
  width: 100%;
}

.nav-link {
  color: white;
} .nav-link:hover {
  background: transparent !important;
}


.page-title {
  display: flex;
  align-items: center;
} .logo {
  margin-left: -5px;
  width: 230px;
  height: 100px;
} .title {
  font-size: 28px;
  font-weight: bold;
  color: rgb(29, 68, 170);
}

.brief-description {
  margin-top: 70px;
  margin-bottom: 40px;
} .brief-description_name {
  font-weight: bold;
  font-size: 18px;
}

.large-button {
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 15px 0;
  border: none;
  border-radius: 15px;
} .large-button--blue {
  background: rgb(13, 89, 164);
} .large-button--green {
  background: rgb(69, 207, 207);
} .large-button--width-70 {
  width: 70%;
}

.border-top {
  border-top: 3px solid #ccc;
  border-radius: 5px;
} .border-top--blue {
  border-color: rgb(13, 89, 164);
} .border-top--green {
  border-color: rgb(131, 223, 206);
} .border-top--purple {
  border-color: rgb(194, 142, 221);
} .border-top--orange {
  border-color: rgb(237, 146, 85);
}

.features {
  margin-top: 45px;
} .features .col-md-12 {
  background: rgb(239, 240, 241);
  border-left: 2px solid rgb(233, 235, 236);
  border-bottom: 2px solid rgb(233, 235, 236);
  border-right: 2px solid rgb(233, 235, 236);
  min-height: 185px !important;
} .feature {
  overflow: hidden;
} .feature-header {
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  font-size: 24px;
} .feature-body p {
  text-align: center;
}

.icon-color--blue {
  color: rgb(13, 89, 164);
} .icon-color--green {
  color: rgb(131, 223, 206);
} .icon-color--purple {
  color: rgb(194, 142, 221);
} .icon-color--orange {
  color: rgb(237, 146, 85);
}

.video-header {
  height: 10vh;
  padding: 10px;
} .video-body {
  height: 90vh;
} .video-body video {
  width: 100%;
  height: 100%;
}

.advantages {
  min-height: 1px;
  overflow: hidden;
} .advantages img {
  transform: scale(1.1);
}

.footer {
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  padding: 10px 0;
} .footer a {
  transition: 0.3s;
} .footer a:hover {
  text-decoration: underline;
}

.section--first {
  /* background: url('../pics/background-top.png') 50% 50% no-repeat; */
  background: url('../pics/about.png') 55% 0% no-repeat;
}

.section--second {
  background: url('../pics/background-second.png') 35% 100% no-repeat;
  background-size: 110%;
}

.section--fourth {
  min-height: 100vh;
  overflow: hidden;
  background: url('../pics/background-bottom.png') 10% 0% no-repeat;
  background-size: inherit;
  margin-bottom: 0;
}

.image-container {
  display: flex !important;
  justify-content: center;
  overflow: hidden;
  min-height: 10px;
} .img {
  height: 300px;
}

.center-content {
  margin-top: 30px;
  background: url('../pics/last.png') 50% 0% no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  min-height: 50vh;
} .center-content button {
  margin-bottom: 50px;
}

</style>
