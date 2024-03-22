<template>
  <v-app>
    <v-main>
      <LoginForm />
    </v-main>
  </v-app>
</template>

<script>

import LoginForm from '@/components/Login/LoginForm.vue'

export default {
  name: 'Login',

  components: {
      LoginForm,
  },

  data: () => ({
    //
  }),
}
</script>
  