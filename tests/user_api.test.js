const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const userHelper = require("./test_user_helper");

beforeEach(async () => {
  await User.deleteMany({});
  // console.log("Delete all reservations in database");
  for (let user of userHelper.initialUsers) {
    let newUser = new User(user);
    await newUser.save();
    // console.log("New reservation added to database");
  }
  // console.log("All initial reservation in database added");
});

test("initial users were added", async () => {
  const response = await api.get("/api/users");
  const userIds = response.body.map((users) => users.userId);

  for (let user of userHelper.initialUsers) {
    expect(userIds).toContain(user.userId);
  }
});

test("users are returned as JSON objects", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all users are returned", async () => {
  const response = await api.get("/api/users");
  expect(response.body).toHaveLength(userHelper.initialUsers.length);
});

test("a user can be deleted", async () => {
  const userIdToDelete = userHelper.initialUsers[0].userId;
  await api
    .delete(`/api/users/${userIdToDelete}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await userHelper.usersInDB();
  const userId = response.map((user) => user.userId);

  expect(response).toHaveLength(userHelper.initialUsers.length - 1);
  expect(userId).not.toContain(userIdToDelete);
});

test("a user can be updated", async () => {
  const newUser = {
    userId: "aZyYdmamefhPId851Jo2uF54r5q2new",
    name: "Vincent Chiem",
    email: "vincentchiem925@gmail.com",
    isEmployee: false,
  };
  const userToReplace = userHelper.initialUsers[0];
  await api
    .put(`/api/users/${userToReplace.userId}`)
    .send(newUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await userHelper.usersInDB();

  expect(response).toHaveLength(userHelper.initialUsers.length);

  const updatedUser = await api.get(`/api/users/${newUser.userId}`);
  expect(updatedUser.body.userId).toContain(newUser.userId);
  expect(updatedUser.body.name).toContain(newUser.name);
  expect(updatedUser.body.email).toContain(newUser.email);
  expect(updatedUser.body.isEmployee).toBe(newUser.isEmployee);
});

afterAll(() => {
  mongoose.connection.close();
});
