import type { GetterTree } from 'vuex';
import type { StateInterface } from '../index';
import type { ExampleStateInterface } from './state';

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
