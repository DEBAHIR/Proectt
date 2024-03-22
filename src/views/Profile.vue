<template>
  <v-container>
    <v-row justify="center">
      <v-card>
        <v-card-text>
          <div v-if="!loaded">
            <v-skeleton-loader class="mx-auto" elevation="2" height="380" type="card-avatar, article, actions"
              boilerplate></v-skeleton-loader>
          </div>
          <div v-else>
            <v-avatar size="150">
              <img
                src="https://photo8.wambacdn.net/92/07/84/1793487029/2104907226_square_small.jpg?hash=CSpHxzhs4FCP3EdAvaORcQ&expires=64060578000&updated=1644395230"
                alt="Avatar">
            </v-avatar>
            <h2 class="profile-name">{{ user.full_name }}</h2>
            <p class="profile-username">{{ user.user_name }}</p>
            <p class="profile-bio">{{ user.email }}</p>
            <div class="profile-info">
            </div>
            <v-divider></v-divider>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>role: {{ user.user_type }}(hidden)</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>mail: {{ user.email }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <div class="pa-4 text-center">
              <v-dialog v-model="dialog" max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn class="text-none font-weight-regular" prepend-icon="mdi-account" text="Edit Profile"
                    variant="tonal" v-bind="activatorProps"></v-btn>
                </template>
                <v-card prepend-icon="mdi-account" title="User Profile">
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" md="4" sm="6">
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                      </v-col>

                      <v-col cols="12" md="4" sm="6">
                        <v-text-field label="Email*" required></v-text-field>
                      </v-col>

                      <v-col cols="12" md="4" sm="6">
                        <v-text-field label="Password*" type="password" required></v-text-field>
                      </v-col>

                      <v-col cols="12" md="4" sm="6">
                        <v-text-field label="Confirm Password*" type="password" required></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">

                      </v-col>

                      <v-col cols="12" sm="6">
                      </v-col>
                    </v-row>
                    <small class="text-caption text-medium-emphasis">*indicates required field</small>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
                    <v-btn color="primary" text="Save" variant="tonal" @click="dialog = false"></v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="logoutDialog" max-width="290">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn class="text-none font-weight-regular" prepend-icon="mdi-logout" text="Выйти" variant="tonal"
                    v-bind="activatorProps"></v-btn>
                </template>
                <v-card title="Выйти" max-width="400">
                  <v-card-text>
                    Вы действительно хотите выйти?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="logoutDialog = false">
                      Отмена
                    </v-btn>
                    <v-btn color="error" text @click="logout">
                      Выйти
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      logoutDialog: false,
      loaded: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user.curUser
    },
  },
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push('/login')
    }
  },
  mounted() {
    if (this.user == '') {
      this.$router.push('/login')
    } else {
      setTimeout(() => {
        this.loaded = true
      }, 100)
    }
  },
}
</script>
<style scoped>
.profile-name {
  font-size: 24px;
  margin-top: 10px;
  transition: all 0.1s ease-in-out;
}

.profile-name:hover {
  transform: scale(1.1);
}

.profile-username {
  color: grey;
  margin-top: -10px;
}

.profile-bio {
  margin-top: 10px;
}

.profile-info {
  margin-top: 20px;
}

.profile-info strong {
  margin-right: 5px;
}

.hidden {
  display: none !important;
}
</style>
