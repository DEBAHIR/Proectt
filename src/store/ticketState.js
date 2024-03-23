import api from './api'

export const ticketState = {
    state: {
        tickets: JSON.parse(localStorage.getItem('tickets')) ?? []
    },
    mutations: {
        ADD_TICKET(state, payload) {
            let date = Date.now();
            const ticket = {
                id: date,
                summary: payload.summary,
                status: "Created",
                priority: payload.priority,
                content: payload.content,
                from: payload.from,
                create_date: date, 
                update_date: "",
                answ: ""
            };
    

            state.tickets.unshift(ticket);
        localStorage.setItem('tickets', JSON.stringify(state.tickets));

        },
        DELETE_TICKET(state, payload) {
            state.tickets = state.tickets.filter((ticket) => {
                if (ticket.id != payload.id) {
                    return ticket;
                }
            })

            localStorage.setItem('tickets', JSON.stringify(state.tickets))
        },
        REPLY_TICKET(state, payload) {
            state.tickets.forEach((ticket) => {
                if (ticket.id === payload.id) {
                    let date = Date.now(); // Get the current timestamp in milliseconds
                    ticket.answ = payload.update_date.answ;
                    ticket.status = 'Done';
                    ticket.update_date = date; // Store the timestamp of the update in milliseconds
                }
            });
    
            localStorage.setItem('tickets', JSON.stringify(state.tickets));
        },
        SET_TICKET(state, payload) {
            state.tickets = payload
            localStorage.setItem('tickets', JSON.stringify(state.tickets))
        },
        CLEAR_ALL_TICKETS(state) {
            state.tickets = [];
            localStorage.removeItem('tickets');
        },
    },
    actions: {
        async getAllTickets({ commit }) {
            try {
                const res = await api.get("/ticket/all");
                const formattedTickets = res.data.map((ticket) => {
                    return {
                        ...ticket,
                        create_date: new Date(ticket.create_date).toLocaleString(),
                        update_date: ticket.update_date ? new Date(ticket.update_date).toLocaleString() : null,
                    }
                })
                commit("SET_TICKET", formattedTickets)
                return formattedTickets
            } catch (error) {
                console.log(error)
            }
        },
        async getUserTickets({ commit }, username) {
            try {
                const res = await api.get("/ticket/user/" + username);
                const formattedTickets = res.data.map((ticket) => {
                    return {
                        ...ticket,
                        create_date: new Date(ticket.create_date).toLocaleString(),
                        update_date: ticket.update_date ? new Date(ticket.update_date).toLocaleString() : null,
                    }
                })
                commit("SET_TICKET", formattedTickets)
                return formattedTickets
            } catch (error) {
                console.log(error)
            }
        },
        async addTicket({ commit }, ticketData) {
            try {
                await api.post("/ticket", ticketData);

                commit("ADD_TICKET", ticketData)
                return res.data
            } catch (error) {
                console.log(error)
            }
        },
        async updateTicket({ commit }, { id, ticketData }) {
            try {
                await api.put("/ticket/" + id, ticketData);

                commit("REPLY_TICKET", { id, ticketData })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
