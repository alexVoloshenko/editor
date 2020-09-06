import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        slider: 4,
    },
    mutations: {
        setSliderValue(state, value) {
            state.slider = value;
        },
    },
});
