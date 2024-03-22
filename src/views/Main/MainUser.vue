<template>
  <v-container>
    <v-row justify="center">
      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="1">Форма</v-tab>
        <v-tab :value="2">История тикетов</v-tab>
      </v-tabs>
    </v-row>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-container fluid>
          <v-row>
            <v-sheet width="300" class="mx-auto">
              <v-form @submit.prevent>
                <v-text-field v-model="summary" label="Тема тикета" :rules="[(v) => !!v || 'Поле обязательно для заполнения']" />
                <v-textarea v-model="content" label="Описание проблемы" :rules="[(v) => !!v || 'Поле обязательно для заполнения']" />
                <v-select v-model="priority" label="Приоритет" :items="['LOW', 'MED', 'HIGH']" :rules="[(v) => !!v || 'Поле обязательно для заполнения']" />
                <v-btn @click="addTicket" type="submit" block class="mt-2">Создать тикет</v-btn>
              </v-form>
            </v-sheet>
          </v-row>
        </v-container>
      </v-window-item>
      <v-window-item :value="2">
        <v-container fluid>
          <v-row class="ticket-pos">
            <div v-for="item in ticket">
              <TicketCard :ticket="item"/>
            </div>
            <v-btn @click="clearAllTickets" color="error">Очистить все тикеты</v-btn>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import TicketCard from '../../components/Main/TicketCard'

export default {
  name: 'MainUser',
  components: {
    TicketCard,
  },
  mounted() {
    this.$store.dispatch("getUserTickets", this.user.login)
  },
  computed: {
    ticket() {
      return this.$store.state.ticket.tickets.toReversed();
    },
    user() {
      return this.$store.state.user.curUser;
    }
  },
  data: () => ({
    tab: 1,
    summary: '',
    content: '',
    priority: '',
  }),
  methods: {
    addTicket() {

      const ticketContent = {
        summary: this.summary,
        content: this.content,
        priority: this.priority,
        from: this.user.login,
      };

      // this.$store.commit("ADD_TICKET", ticketContent);
      this.$store.dispatch("addTicket", ticketContent);

      this.summary = '';
      this.content = '';
      this.priority = '';
    },
    clearAllTickets() {
    this.$store.commit("CLEAR_ALL_TICKETS");
  },
  }
}
</script>

<style>
.ticket-pos {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
}

.ticket {
  width: 550px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid black;
  border-radius: 4px;
  margin: 10px 0 10px 0;
  padding: 10px;
}

.hr {
  width: 100%;
}
</style>