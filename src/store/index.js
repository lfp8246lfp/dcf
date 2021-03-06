import Vue from 'vue';
import Vuex from 'vuex';
import loading from './modules/loading';
// import menu from './modules/menu';
import tagsView from './modules/tagsView';
import app from './modules/app';
import tree from "./modules/tree"
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    getters,
    modules: {
        loading,
        // menu,
        tagsView,
        app,
        tree
    },
    strict: process.env.NODE_ENV !== 'production'
});

export default store;
