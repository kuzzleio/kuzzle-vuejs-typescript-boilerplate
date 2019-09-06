class AppState {
  public waitingForConnection: boolean;
  public online: boolean;

  constructor(waitingForConnection: boolean, online: boolean) {
    this.waitingForConnection = waitingForConnection;
    this.online = online;
  }
}

const state = new AppState(false, false);

const mutations = {
  SET_ONLINE: (s: AppState) => {
    s.online = true;
  },
  SET_OFFLINE: (s: AppState) => {
    s.online = false;
  },
  SET_WAITING_FOR_CONNECTION: (s: AppState) => {
    s.waitingForConnection = true;
  },
  UNSET_WAITING_FOR_CONNECTION: (s: AppState) => {
    s.waitingForConnection = false;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
