import axios from 'axios';
const baseUrl = `https://jsonplaceholder.typicode.com`;
const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
    async fetchTodos({commit}) {
      const response = await axios.get(`${baseUrl}/todos`);
      commit('setTodos', response.data);
    },
    async addTodo({ commit }, title) {
      const response = await axios.post(`${baseUrl}/todos`,{ title, completed: false });
      commit('newTodo', response.data);
    },
    async deleteTodo({ commit }, id) {
      await axios.delete(`${baseUrl}/todos/${id}`);
  
      commit('removeTodo', id);
    },
    async updateTodo({ commit }, updTodo) {
      const response = await axios.put(`${baseUrl}/todos/${updTodo.id}`,updTodo);
      commit('updateTodo', response.data);
    },
    async filterTodos({ commit }, e) {
      const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
      const response = await axios.get( `${baseUrl}/todos?_limit=${limit}`)
      commit('setTodos', response.data);
    },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>  (state.todos = state.todos.filter(todo => todo.id !== id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};