class AuthState {
  // TODO Must define type KuzzleUser
  public currentUser?: any;

  constructor(currentUser?: any) {
    this.currentUser = currentUser;
  }
}

const state = new AuthState();

const g = {
  currentUser: (s: AuthState) => s.currentUser,
  currentUsername: (s: AuthState) =>
    s.currentUser ? s.currentUser.username : null
};

const actions = {
  LOGIN: async ({ dispatch }, { credentials, kuzzle }) => {
    let jwt;
    try {
      jwt = await kuzzle.auth.login('local', credentials, '7 days');
      await dispatch('FETCH_CURRENT_USER', kuzzle);
    } catch (error) {
      localStorage.removeItem('user_token');
      throw error;
    }

    localStorage.setItem('user_token', jwt);
  },
  CHECK_TOKEN: async ({ dispatch, getters }, kuzzle) => {
    const jwt = localStorage.getItem('user_token');

    if (!jwt) {
      return false;
    }

    const { valid } = await kuzzle.auth.checkToken(jwt);

    if (!valid) {
      await dispatch('LOG_OUT', kuzzle);
      return false;
    }

    kuzzle.jwt = jwt;

    if (!getters.currentUser) {
      await dispatch('FETCH_CURRENT_USER', kuzzle);
    }

    return true;
  },
  FETCH_CURRENT_USER: async ({ commit }, kuzzle) => {
    let currentUser;
    try {
      currentUser = await kuzzle.auth.getMyCredentials('local');
    } catch (error) {
      throw error;
    }

    commit('SET_CURRENT_USER', currentUser);

    /**
     * Here, you can perform some data fetch related to your user-session.
     */
  },
  LOG_OUT: async ({ commit }, kuzzle) => {
    /**
     * You should tear down your session here.
     */
    commit('UNSET_CURRENT_USER');
    kuzzle.jwt = null;
    localStorage.removeItem('user_token');
  }
};

const mutations = {
  SET_CURRENT_USER: (s: AuthState, user: any) => {
    s.currentUser = user;
  },
  UNSET_CURRENT_USER: (s: AuthState) => {
    s.currentUser = null;
  }
};

export default {
  namespaced: true,
  state,
  getters: g,
  actions,
  mutations
};
