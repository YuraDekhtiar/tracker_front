import store from "../store";

export default isAdmin();


function isAdmin() {
  return store.state.auth.user['roles'].includes('admin');
}
