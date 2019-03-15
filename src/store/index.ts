import Vue from 'vue';
import Vuex, {
  GetterTree,
  ActionTree,
  MutationTree
} from 'vuex';

import modules from './modules';

Vue.use(Vuex);

export interface State {

}

const state: State = {

};

const getters: GetterTree < State, any > = {

};

const actions: ActionTree < State, any > = {

};

const mutations: MutationTree < State > = {
  
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
});