<template>
  <v-container>
    <v-row justify="center">
      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="1">Активные</v-tab>
        <v-tab :value="2">Выполненные</v-tab>
      </v-tabs>
    </v-row>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-container fluid>
          <v-row class="ticket-pos" v-if="!loading">
            <div v-for="item in ticket">
              <TicketCard :ticket="item" v-show="item.status == 'Created'" />
            </div>
          </v-row>
          <v-row class="ticket-pos" v-if="loading">
            <div v-for="item in 10">
              <v-skeleton-loader class="mx-auto border" max-width="300" type="article, actions"></v-skeleton-loader>
            </div>
          </v-row>
        </v-container>
      </v-window-item>
      <v-window-item :value="2">
        <v-container fluid>
          <v-row class="ticket-pos" v-if="!loading">
            <div v-for="item in ticket">
              <TicketCard :ticket="item" v-show="item.status == 'Done'" />
            </div>
          </v-row>
          <v-row class="ticket-pos" v-if="loading">
            <div v-for="item in 10">
              <v-skeleton-loader class="mx-auto border" max-width="300" type="article, actions"></v-skeleton-loader>
            </div>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import TicketCard from '../../components/Main/TicketCard'

export default {
  name: 'MainAdmin',

  components: {
    TicketCard,
  },
  async mounted() {
    this.loading = true;
    const res = await this.$store.dispatch("getAllTickets");
    this.loading = false
  },
  computed: {
    ticket() {
      return this.$store.state.ticket.tickets.toReversed();
    },
  },
  data: () => ({
    tab: 1,
    loading: false,
  }),
}
</script>
 
<style>
.ticket-pos {
  margin-top: 20px;
}
</style> 