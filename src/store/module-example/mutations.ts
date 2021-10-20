import type { MutationTree } from 'vuex';
import type { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  someMutation(/* state: ExampleStateInterface */) {
    // your code
  },
};

export default mutation;
