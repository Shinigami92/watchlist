import type { ActionTree } from 'vuex';
import type { StateInterface } from '../index';
import type { ExampleStateInterface } from './state';

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
