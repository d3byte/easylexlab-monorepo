<template>
  <main id="landing">
    <div class="home">
      <!-- Start of the first section -->

        <app-header v-if="logged" />

        <div class="main">

          <div class="top-bar" v-if="!logged">
            <div class="wrapper">
              <ul>
                <li><router-link to="/signup/teacher">Регистрация учителя</router-link></li>
                <li><router-link to="/signup/student">Регистрация ученика</router-link></li>
              </ul>
            </div>
          </div>

          <div class="wrapper">

            <div class="about-app">
              <div class="column">
                <router-link to="/" class="logo"></router-link>
                <div class="slogan">С нами эффективно учить и&nbsp;легко учиться</div>

                <div class="about">
                  <span>EasyLexLab</span>
                  - это образовательная платформа для изучения иностранных слов, предназначенная для учителей и учеников, изучающих языки."
                </div>


                <router-link to="/login" class="button">Личный кабинет</router-link>

              </div>
              <div class="column last">

                <div class="phones"></div>

                <div class="app-links">
                  <a href="javascript:;" class="g-play"></a>
                  <a href="javascript:;" class="a-store"></a>
                </div>

                <div class="notice">
                  <span>Мобильное приложение EasyLexLab,</span>
                  разработанное для вашего удобства, является дополнением к существующей платформе. Выполняйте домашнее задание, где бы вы ни находились!
                </div>

              </div>
            </div><!-- /.about-app -->

            <div class="benefits">

              <div class="benefit benefit-1">
                <div class="icon"></div>
                <div class="text">Эффективно усваивать слова, необходимые для использования на уроках</div>
              </div>

              <div class="benefit benefit-2">
                <div class="icon"></div>
                <div class="text">Выполнять домашнее задание в любом месте, в любое время, используя смартфон или планшет</div>
              </div>

              <div class="benefit benefit-3">
                <div class="icon"></div>
                <div class="text">В игровой форме запоминать слова, что превращает рутинную работу в интересное и полезное занятие</div>
              </div>

              <div class="benefit benefit-4">
                <div class="icon"></div>
                <div class="text">Ежедневно наблюдать прогресс и становиться все ближе к цели - “свободно общаться на иностранном языке”</div>
              </div>

            </div>



          </div><!-- /.wrapper -->

        </div><!-- /.main -->
      <!-- End of the first section    -->
      <!-- ––––––––––––––––––––––––––– -->
      <!-- Start of the second section -->
      <section class="section section--second">
        <div class="container video">
          <div class="video-header">
            <h2 class="text-center text-bold">Как работает EasyLexLab?</h2>
          </div>
          <div class="video-body">
            <iframe 
              class="col-lg-12 col-md-12 col-sm-12 col-xs-12" 
              height="520"
              src="https://www.youtube.com/embed/2o2B51LBFCg" 
              frameborder="0" 
              gesture="media" 
              allowfullscreen>
            </iframe>
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
                <img src="../pics/teacher.png" class="img-adaptive img" id="teacher">
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-7">
              <div class="col-md-12 image-container">
                <img src="../pics/students-third.png" class="img-adaptive img" id="student">
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

        <div class="container advantages hidden-sm-down">
          <img class="col-lg-12 col-md-12 col-sm-12 col-xs-12" src="../pics/tablet.png">
        </div>
        <div class="advantages-mobile hidden-md-up">
          <h3 class="text-center text-bold">Использовать EasyLexLab значит</h3>
          <div class="row">
            <div class="col-xs-12 advantage">
              <p>
                Использовать компьютерные технологии 
                не выходя за рамки образовательной
                программы и ФГОС
              </p>
            </div>
            <div class="col-xs-12 advantage">
              <p>
                Проводить уроки более эффективно, 
так как процесс изучения и усвоения 
новых слов вынесен за рамки урока 
(дети делают все самостоятельно, дома)
              </p>
            </div>
            <div class="col-xs-12 advantage">
              <p>
                Более гибко подходить к процессу 
изучения иностранного языка, 
учитывая уровень и потребности
каждой группы.
              </p>
            </div>
            <div class="col-xs-12 advantage">
              <p>
                Контролировать изучение слов, 
помогая ученикам быстрее
достигать успехов в изучении 
языков
              </p>
            </div>
          </div>
            

        </div>

        <div class="container center-content hidden-sm-down">
          <div class="statistic">
            <!-- 
              <p class="text-center text-bold">В течение нескольких лет учителя и ученики нашей школы используют EasyLexLab</p>
              <p class="text-center">на уроках английского языка. Интерактивные задания в союзе с традиционными учебниками дают хорошие результаты, повышают степень индивидуализации обучения и стимулируют детей к получению знаний.</p>
            -->
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
          </div>
        </div>
      </div>
      <!-- End of footer -->
      <!-- ––––––––––––– -->
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
ol,ul{list-style: none;}
*{-webkit-appearance:none}html{background:#fff}body{font-family:'Open Sans';background:#d8e1e8;background:-moz-linear-gradient(top,#d8e1e8 0%,#f8fafb 100%);background:-webkit-linear-gradient(top,#d8e1e8 0%,#f8fafb 100%);background:linear-gradient(to bottom,#d8e1e8 0%,#f8fafb 100%);filter:progid:DXImageTransform.Microsoft.gradient( startColorstr='#d8e1e8', endColorstr='#f8fafb',GradientType=0 )}a{text-decoration:none;color:inherit;outline:none}.clear{clear:both}.main,.wrapper{position:relative}.wrapper{max-width:980px;margin:0 auto;padding:0 10px}.main{min-height:100vh;padding:50px 0 0;background:url(../img/bg-icons.png) no-repeat center 70px}.main .top-bar{position:absolute;top:0;left:0;width:100%;height:50px;text-align:right;color:#fff;background:#4257b2}.main .top-bar ul{display:inline-block}.main .top-bar ul li{position:relative;float:left;margin-left:1px}.main .top-bar ul li::before{position:absolute;top:50%;left:-1px;width:1px;height:60%;content:'';-webkit-transform:translateY(-50%);transform:translateY(-50%);background:#5f74ce}.main .top-bar ul li:first-of-type{margin-left:0}.main .top-bar ul li:first-of-type::before{display:none}.main .top-bar ul li a{font-size:16px;line-height:50px;display:block;height:50px;padding:0 30px;transition:background .2s linear}.main .top-bar ul li a:hover{background:rgba(255,255,255,.2)}.about-app{display:flex;display:-webkit-flex;padding:20px 0 40px;background:url(../img/kids.png) no-repeat 120% calc(100% + 80px);justify-content:space-between;-webkit-justify-content:space-between}.about-app .column{flex-basis:50%;flex-shrink:0;-webkit-flex-basis:50%;-webkit-flex-shrink:0}.about-app .column.last{padding:70px 0 0}.about-app .logo{display:block;width:352px;height:108px;background:url(../img/logo.png) no-repeat center;background-size:contain}.about-app .slogan{font-family:'Bliss Pro';font-size:32px;font-weight:900;font-style:italic;position:relative;padding:10px 0 40px;color:#404040}.about-app .slogan::after{position:absolute;bottom:0;left:0;width:65px;height:1px;content:'';background:#ffd42a}.about-app .about{font-size:14px;line-height:23px;max-width:235px;padding:40px 0 65px;color:#595959}.about-app .about span,.about-app .notice span{font-size:21px;font-weight:800;display:block}.about-app .button{font-size:20px;line-height:75px;display:block;max-width:330px;height:75px;transition:opacity .2s linear;text-align:center;color:#fff;border-radius:10px;background:#0357a7}.about-app .button:hover{opacity:.7}.about-app .phones{width:100%;max-width:355px;height:325px;margin-left:auto;background:url(../img/phones.png) no-repeat center;background-size:contain}.about-app .app-links,.benefits{display:flex;display:-webkit-flex;justify-content:flex-end;-webkit-justify-content:flex-end}.about-app .app-links .a-store,.about-app .app-links .g-play{display:block;width:170px;height:62px}.about-app .app-links .g-play{background:url(../img/g-play.png) no-repeat center;background-size:contain}.about-app .app-links .a-store{margin-left:15px;background:url(../img/a-store.png) no-repeat center;background-size:contain}.about-app .notice{font-size:14px;line-height:21px;max-width:340px;margin-left:auto;padding:20px 0 0;text-align:right;color:#242424}.about-app .notice span{font-size:17px;color:#0357a7}.benefits{margin:0 -5px;justify-content:space-between;-webkit-justify-content:space-between}.benefit{margin:0 5px 10px;padding:6px 6px 15px;border-right:1px solid #e3e1e1;border-bottom:1px solid #e3e1e1;border-left:1px solid #e3e1e1;border-radius:8px;background:#f0f0f0;flex-shrink:0;-webkit-flex-shrink:0}.benefit .icon{width:100%;height:35px}.benefit .text{font-size:14px;line-height:20px;max-width:235px;margin:10px auto 0;text-align:center;color:#5c5c5c}.benefit-1{border-top:4px solid #51a1ed;flex-basis:calc(20% - 10px);-webkit-flex-basis:calc(20% - 10px)}.benefit-2,.benefit-3{border-top:4px solid #79decd;flex-basis:calc(25% - 10px);-webkit-flex-basis:calc(25% - 10px)}.benefit-3{border-top:4px solid #c386df}.benefit-4{border-top:4px solid #f08c3c;flex-basis:calc(30% - 10px);-webkit-flex-basis:calc(30% - 10px)}.benefit-1 .icon{background:url(../img/benefit-1.png) no-repeat center}.benefit-2 .icon{background:url(../img/benefit-2.png) no-repeat center}.benefit-3 .icon{background:url(../img/benefit-3.png) no-repeat center}.benefit-4 .icon{background:url(../img/benefit-4.png) no-repeat center}@media (max-width:1000px){.about-app{background-size:90%}}@media (max-width:750px){.main{padding:30px 0 0;background:url(../img/bg-icons.png) no-repeat center 50px;background-size:contain}.main .top-bar{height:30px;text-align:center}.main .top-bar ul li a{font-size:12px;line-height:30px;height:30px;padding:0 10px}.about-app,.benefits{flex-wrap:wrap;justify-content:flex-start;-webkit-flex-wrap:wrap;-webkit-justify-content:flex-start}.about-app{padding:10px 0 200px;background:url(../img/kids.png) no-repeat center calc(100% + 20px);background-size:100%}.about-app .column{flex-basis:100%;-webkit-flex-basis:100%}.about-app .column.last{padding:10px 0 0}.about-app .logo{width:250px;height:60px;margin:0 auto}.about-app .about,.about-app .slogan{font-size:16px;padding:10px 0;text-align:center}.about-app .slogan::after{right:0;margin:0 auto}.about-app .about{font-size:14px;line-height:22px;max-width:none}.about-app .about span{font-size:18px}.about-app .button{font-size:18px;line-height:50px;max-width:none;height:50px}.about-app .phones{max-width:none;height:170px;margin:0 auto 10px}.about-app .app-links .a-store,.about-app .app-links .g-play{display:block;width:130px;height:40px}.about-app .app-links{justify-content:center;-webkit-justify-content:center}.about-app .app-links .a-store{margin-left:10px}.about-app .notice{font-size:14px;line-height:18px;max-width:none;margin-left:inherit;padding:10px 0 0;text-align:center}.about-app .notice span{font-size:16px}.benefits{margin:0}.benefit{display:flex;display:-webkit-flex;margin:0 0 10px;align-items:center;flex-basis:100%;-webkit-align-items:center;-webkit-flex-basis:100%}.benefit .icon{margin:inherit;flex-basis:50px;flex-shrink:0;-webkit-flex-basis:50px;-webkit-flex-shrink:0}.benefit .text{max-width:none;padding-left:20px;text-align:left}}


.home {
  background: rgb(244, 248, 251);
}

.section {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  align-items: center;
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
  width: 300px;
  height: 100px;
  margin-bottom: 10px;
} .title {
  font-size: 28px;
  font-weight: bold;
  color: rgb(29, 68, 170);
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
  margin-bottom: 10px;
} .video-body {
  min-height: 1px;
  overflow: hidden;
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

@media (max-width: 768px) {
  .section .container {
    width: 100%;
    padding: 10px 20px;
  }

  .advantages-mobile {
    padding: 20px;
  } .advantage {
    background: rgb(239, 240, 241);
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 5px;
    text-align: center;
    vertical-align: middle;
  } .advantage p {
    margin: 5px 0;
  }

  .video-body {
    margin-bottom: 30px;
  } .video-body video {
    margin: 30px 0;
  }

  .text-right, .text-align--right, .text-left {
    text-align: center !important;;
  }

  .navbar-parent .container {
    width: 100%;
    text-align: center;
  } .navbar-parent .container ul li {
    text-align: center;
  }

  .section--first {
    background: none;
  }

  .section--first .logo {
    display: none;
  }

  .section--first .text-bold {
    width: 100%;
    margin-top: 100px;
    display: block;
  }

  .section--first .brief-description {
    width: 100%;
  }

  #teacher, #student {
    display: none;
  }

  .footer {
    flex-direction: column;
  }

  .footer a {
    margin: 10px 0;
    float: left;
    width: 100%;
    display: block;
  }

  h1, h2, h3, h4, h5, p {
    text-align: center !important;
  }

  .brief-description {
    margin-top: 0px !important;
  }

  .section--fourth {
    min-height: 50px !important;
    overflow: hidden;
  }
}

.center {
  display: flex;
  justify-content: center;
}

</style>
