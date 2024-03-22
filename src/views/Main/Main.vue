<template>
  <v-app>
    <v-main>
      <MainAdmin v-if="user.user_type == 'admin'" />
      <MainUser v-if="user.user_type == 'user'" />
    </v-main>
  </v-app>
</template>
  
<script>
import MainAdmin from './MainAdmin.vue';
import MainUser from './MainUser.vue';

export default {
  name: 'Main',
  components: {
    MainAdmin,
    MainUser
  },
  computed: {
    user() {
      return this.$store.state.user.curUser
    }
  },
  mounted() {
    if (this.user == '') {
      this.$router.push('/login')
    }
  },



}
</script>
  
  