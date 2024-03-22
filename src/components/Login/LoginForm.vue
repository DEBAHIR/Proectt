<template>
  <v-sheet width="300" class="mx-auto">
    <v-card>
      <v-card-title class="headline">Вход</v-card-title>
      <v-card-text>
        <v-form @submit.prevent>
          <v-text-field v-model="login" :rules="rulesLogin" label="Логин" outlined></v-text-field>
          <v-text-field v-model="password" :rules="rulesPass" label="Пароль" type="password" outlined></v-text-field>
          <v-btn v-if="!loading" @click="checkData" type="submit" color="primary" block>Войти</v-btn>
          <v-btn v-if="loading" disabled block>
            <v-progress-circular indeterminate color="primary" width="2"></v-progress-circular>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  name: 'LoginForm',
  data: () => ({
    login: '',
    password: '',
    loading: false,
    rulesLogin: [
      value => {
        if (!value) return 'Поле не должно быть пустым';
        if (value.length < 5) return 'Логин должен быть не менее 5 символов';
        return true;
      },
    ],
    rulesPass: [
      value => {
        if (!value) return 'Поле не должно быть пустым';
        if (value.length < 5) return 'Пароль должен быть не менее 5 символов';
        return true;
      },
    ],
  }),
  methods: {
    async checkData() {
      this.loading = true;
      if (this.login === '' || this.password === '') {
        this.loading = false;
        return;
      }
      
      let userData = { login: this.login, password: this.password };

      // this.$store.commit("LOGIN", userData)
      let res = await this.$store.dispatch("login", userData);

      if (res) this.loading = false;

      if (this.$store.state.user.curUser !== '') this.$router.push('/');
      
      this.loading = false;
    }
  }
}
</script>