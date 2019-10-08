import * as type from '../mutation-types';
const state = {
  itemindex:0,
  itemid:3,
  nodedata:null
};
const getters ={
  itemindex(state){
    return state.itemindex
  },
  itemid(state){
    return state.itemid
  },
  nodedata(state){
    return state.nodedata
  },
}
const mutations = {
  CHANGEINDEX: (state, index) => {
    state.itemindex = index;
  },
  CHANGEID: (state, index) => {
    state.itemid = index;
  },
  CHANGENODEDATA: (state, index) => {
    state.nodedata = index;
  },
};

const actions = {
  // changeIndex ({ commit }, index) {
  //   commit('CHANGEINDEX', index);
  // }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};