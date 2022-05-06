const User = require("../models/user");

const initialUsers = [
  {
    userId: "A4RPrxn4e6a5gNDetiof1W6pXOF2",
    name: "Martin Nguyen",
    email: "martin.nguyen02@sjsu.edu",
    isEmployee: true,
  },
  {
    userId: "AiRKA1ZeeCPVe9zxm88QVqXCRRn1",
    name: "Throw Away",
    email: "throwtestawaytest@gmail.com",
    isEmployee: false,
  },
  {
    userId: "dl1yXycs72WZgYqyJjPkGwRXXPA2",
    name: "Anthony Tran",
    email: "anthony.g.tran@sjsu.edu",
    isEmployee: true,
  },
];

const usersInDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialUsers,
  usersInDB,
};
