import { User } from './models/User';

const curUser = new User({ name: 'Petr', age: 25 });
// curUser.events.on('change', () => {
//   console.log('change!')
// });
// curUser.events.trigger('change');
