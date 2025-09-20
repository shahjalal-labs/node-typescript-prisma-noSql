```
// 1. Find unique user by email (login)
prisma.user.findUnique({
  where: { email: payload.email },
});

// 2. Update user by email (update fcmToken after login)
prisma.user.update({
  where: { email: payload.email },
  data: { fcmToken: payload.fcmToken },
});

// 3. Find unique user by email (Google login check)
prisma.user.findUnique({
  where: { email: payload.email },
});

// 4. Create new user (Google login)
prisma.user.create({
  data: {
    email: payload.email,
    fullName: payload.fullName,
    password: "",
    fcmToken: payload.fcmToken,
  },
});

// 5. Find unique user by email (forgot password OTP)
prisma.user.findUnique({
  where: { email: email },
});

// 6. Find unique user by email (verify OTP)
prisma.user.findUnique({
  where: { email: email },
});

// 7. Find unique user by ID (reset password)
prisma.user.findUnique({
  where: { id: userId },
});

// 8. Update user password by email (reset password)
prisma.user.update({
  where: { email: email },
  data: { password: hashedPassword },
});

// 9. Find unique user by ID (my profile)
prisma.user.findUnique({
  where: { id: userId },
  select: { id: true, fullName: true, profileImage: true, email: true },
});

// 10. Find unique user by ID (update profile check)
prisma.user.findUnique({
  where: { id: userId },
});

// 11. Update user by ID (update profile)
prisma.user.update({
  where: { id: userId },
  data: {
    ...userData,
    profileImage: file ? profileImage : user.profileImage,
  },
});

```
