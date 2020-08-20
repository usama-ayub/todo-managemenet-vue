import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// https://www.youtube.com/watch?v=5lVQgZzLMHc
export const store = new Vuex.Store({
  state:{
      todos:[{id:1, name:"sdada"}]
  },
  getters :{
      doneTodo: state => {
          return state.todos
      }
  },
  mutations :{
      updateTodo: (state,payload)=>{
        state.todos.push(payload);
      }
  },
  actions :{
    updateTodo: (context,payload)=>{
        context.commit('updateTodo',payload);
    }
  }
})