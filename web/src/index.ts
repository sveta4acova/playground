// import { UserForm } from './views/UserForm';
// import { User } from './models/User';
// import { UserEdit } from './views/UserEdit';
//
// const user = User.buildUser({ name: 'Name', age: 20 });
// const root = document.getElementById('root');
// const userEdit = new UserEdit(root, user);
// userEdit.render();

import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { User, UserProps } from './models/User';

const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
  return User.buildUser(json);
});
console.log(users);
users.on('change', () => {
  new UserList(document.getElementById('root'), users).render();
})

users.fetch();