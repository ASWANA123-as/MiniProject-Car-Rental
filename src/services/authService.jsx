const USERS_KEY = "car_rental_users";

export const registerUser = (user) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  return users.find((user) => user.email === email && user.password === password);
};
