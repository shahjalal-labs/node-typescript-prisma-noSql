const user = {
  id: 1,
  email: "test@gmail.com",
  password: "123456",
  fullName: "test",
};

const { password, ...sanitizeUser } = user;

console.log(sanitizeUser);

const { email, password: Password, ...publicUser } = user;
console.log(publicUser, "[1;31mpublicUser in sanitize.ts at line 13[0m");
