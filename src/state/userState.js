const KEY = 'username';

export function setUserName(name) {
  localStorage.setItem(KEY, name);
}

export function getUserName() {
  return localStorage.getItem(KEY);
}
