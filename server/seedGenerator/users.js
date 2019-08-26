import faker from 'faker';
import { ObjectId } from 'mongodb';

const createUsers = (totalUsers) => {
  const users = [];
  const password = '$2b$10$s0AGabxSu71hErqZYwFui.OkB7NfuFHd1NUz59Sw34DO60kJyd1Sy';
  for (let i = 0; i < totalUsers; i += 1) {
    const gender = faker.random.arrayElement(['Male', 'Female']);
    const randomNumber = faker.random.number({ min: 1, max: 50 });
    let profilePic = 'https://randomuser.me/api/portraits/';
    if (gender === 'Male') {
      profilePic += `men/${randomNumber}.jpg`;
    } else {
      profilePic += `women/${randomNumber}.jpg`;
    }
    users.push({
      _id: ObjectId(),
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      password,
      profilePic,
      gender,
      DOB: faker.date.past(),
    });
  }
  return users;
};

export default createUsers;
