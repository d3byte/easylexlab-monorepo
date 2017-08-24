<template>
    <div>
      <h3 v-if="success && !showPreloader" class="success">Сообщение отправлено.</h3>
      <i v-if="showPreloader" class="material-icons preloader">cached</i>
      <form v-if="!success && !showPreloader" onsubmit="return false">
        <textarea v-model="text" rows="8" cols="80" placeholder="Сообщение" required></textarea>
        <button @click="send" class="ui red basic cancel inverted button">Отправить</button>
      </form>
    </div>
</template>

<script>
export default {
  props: ['group'],
  data() {
    return {
      text: '',
      showPreloader: false,
      success: false
    }
  },
  computed: {
    user() {
        return this.$store.getters.user
    }
  },
  methods: {
    send() {
      const body = {
        groupId: this.group._id,
        msgText: this.text,
        author: {
          name: this.user.firstName + this.user.firstName,
          avaUrl: this.user.avaUrl
        }
      };
      const headers = {
        'Content-type' : 'application/json',
        'Authorization': 'Bearer ' + this.$store.getters.userToken
      };
      this.$http.post('newmsg', body, { headers }).then(res => {
        this.success = true;
        this.showPreloader = false;
      });
    }
  },
  http: {
    root: '/api'
  }
}
</script>

<style lang="css">
textarea {
  color: black;
  padding: 10px;
  border-radius: 2px;
}
</style>
