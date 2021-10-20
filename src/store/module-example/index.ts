import type { Module } from 'vuex';
import type { StateInterface } from '../index';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import type { ExampleStateInterface } from './state';
import state from './state';

const exampleModule: Module<ExampleStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default exampleModule;
