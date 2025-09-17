You are a **senior full-stack developer**.

## 📌 Task

You are given a real-world code module located at:

```
/home/sj/web/ruhulaminvai/node-typescript-prisma-noSql/src/app/modules/user
```

Refactor the entire codebase **without modifying any UI or changing behavior**. Instead, improve it using:

- ✅ Clear separation of concerns
- ✅ Consistent, semantic naming conventions
- ✅ Modular architecture (hooks, services, utils, components)
- ✅ Scalable file/folder structure
- ✅ Industry-standard project layout and architecture
- ✅ Readable, testable, production-grade code
- ✅ 100% behavior and API compatibility

👉 Output the refactored code to a new folder: `user_refactored`

Also return a `.sh` script that will:
- Create that folder
- Write all refactored files
- Run `git add` and `git commit` with message: `refactor: added improved user version`

---

## 🌲 Full Project Structure (cwd)

```bash
/home/sj/web/ruhulaminvai/node-typescript-prisma-noSql
├── bun.lock
├── developer.md
├── module.js
├── package.json
├── package-lock.json
├── prisma
│   └── schema.prisma
├── README.md
├── src
│   ├── app
│   │   ├── interfaces
│   │   │   ├── common.ts
│   │   │   └── file.ts
│   │   ├── middlewares
│   │   │   ├── auth.ts
│   │   │   ├── globalErrorHandler.ts
│   │   │   ├── optionalAuth.ts
│   │   │   ├── parseBodyData.ts
│   │   │   ├── postman.ts
│   │   │   ├── rateLimiter.ts
│   │   │   └── validateRequest.ts
│   │   ├── modules
│   │   │   ├── auth
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.validation.ts
│   │   │   └── user
│   │   │       ├── userApi.hurl
│   │   │       ├── user.controller.ts
│   │   │       ├── user.route.ts
│   │   │       ├── user.services.ts
│   │   │       └── user.validation.ts
│   │   └── routes
│   │       └── index.ts
│   ├── app.ts
│   ├── config
│   │   └── index.ts
│   ├── errors
│   │   ├── ApiErrors.ts
│   │   ├── handleClientError.ts
│   │   ├── handleValidationError.ts
│   │   ├── handleZodError.ts
│   │   └── parsePrismaValidationError.ts
│   ├── helpers
│   │   ├── fileUploader.ts
│   │   ├── generateOtp.ts
│   │   ├── jwtHelpers.ts
│   │   ├── redis.ts
│   │   ├── sendEmail.ts
│   │   └── uploadInSpace.ts
│   ├── interfaces
│   │   ├── common.ts
│   │   ├── error.ts
│   │   ├── file.ts
│   │   ├── index.d.ts
│   │   └── paginations.ts
│   ├── server.ts
│   └── shared
│       ├── catchAsync.ts
│       ├── pagination.ts
│       ├── pick.ts
│       ├── prisma.ts
│       ├── searchFilter.ts
│       └── sendResponse.ts
├── structure.md
├── tsconfig.json
├── uploads
│   └── google.png
└── vercel.json

16 directories, 55 files
```

## 📁 Target Module Tree (user)

```bash
/home/sj/web/ruhulaminvai/node-typescript-prisma-noSql/src/app/modules/user
├── userApi.hurl
├── user.controller.ts
├── user.route.ts
├── user.services.ts
└── user.validation.ts

1 directory, 5 files
```

## 📄 Module Files & Contents

### `user.services.ts`
```ts
import { User } from "@prisma/client";
import ApiError from "../../../errors/ApiErrors";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import prisma from "../../../shared/prisma";
import generateOTP from "../../../helpers/generateOtp";
import sendEmail from "../../../helpers/sendEmail";
import redisClient from "../../../helpers/redis";

//create new user
const createUser = async (payload: User) => {
  const existingUser = await prisma.user.findFirst({
    where: { email: payload.email },
  });
  if (existingUser) {
    throw new ApiError(409, "email already exist!");
  }

  const hashedPassword = await bcrypt.hash(payload.password as string, 10);

  // Prepare pending user object
  const pendingUserData = {
    email: payload.email,
    fullName: payload.fullName,
    password: hashedPassword,
  };

  // Save pending user in Redis (store as JSON string)
  await redisClient.set(
    `pendingUser:${payload.email}`,
    JSON.stringify(pendingUserData),
    { EX: 300 }, // Optional: expire after 5 minutes if you want
  );

  // Generate OTP and expiry time
  const otp = generateOTP(); // 4-digit OTP
  const subject = "Your Password Reset OTP";
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Password Reset Request</h2>
      <p>Hi <b>${payload.fullName}</b>,</p>
      <p>Your OTP for password reset is:</p>
      <h1 style="color: #007BFF;">${otp}</h1>
      <p>This OTP is valid for <b>5 minutes</b>. If you did not request this, please ignore this email.</p>
      <p>Thanks, <br>The Support Team</p>
    </div>
  `;
  await sendEmail(payload.email, subject, html);
  await redisClient.set(`otp:${payload.email}`, otp, { EX: 300 });

  return otp;
};

// Verify user using OTP for signup
const signupVerification = async (payload: { email: string; otp: string }) => {
  const { email, otp } = payload;

  // 1️⃣ Fetch OTP from Redis
  const savedOtp = await redisClient.get(`otp:${email}`);
  if (!savedOtp) {
    throw new ApiError(400, "Invalid or expired OTP.");
  }

  // 2️⃣ Compare OTP
  if (otp !== savedOtp) {
    throw new ApiError(401, "Invalid OTP.");
  }

  // 3️⃣ Fetch pending user data from Redis
  const pendingUserStr = await redisClient.get(`pendingUser:${email}`);
  if (!pendingUserStr) {
    throw new ApiError(404, "No pending user found. Please sign up again.");
  }
  const pendingUser = JSON.parse(pendingUserStr);

  // 4️⃣ Create new user inside DB transaction
  await prisma.$transaction(async (tx) => {
    const createdUser = await tx.user.create({
      data: {
        email: pendingUser.email,
        fullName: pendingUser.fullName,
        password: pendingUser.password,
      },
    });

    return createdUser;
  });

  // 5️⃣ Clean up Redis data after successful user creation
  await Promise.all([
    redisClient.del(`otp:${email}`),
    redisClient.del(`pendingUser:${email}`),
  ]);

  return;
};

//get single user
const getSingleUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new ApiError(404, "user not found!");
  }

  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};

//get all users
const getUsers = async () => {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    throw new ApiError(404, "Users not found!");
  }
  const sanitizedUsers = users.map((user) => {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  });
  return sanitizedUsers;
};

//update user
const updateUser = async (id: string, userData: any) => {
  if (!ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user ID format");
  }
  const existingUser = await getSingleUser(id);
  if (!existingUser) {
    throw new ApiError(404, "user not found for edit user");
  }
  const updatedUser = await prisma.user.update({
    where: { id },
    data: userData,
  });

  const { password, ...sanitizedUser } = updatedUser;

  return sanitizedUser;
};

//delete user
const deleteUser = async (userId: string, loggedId: string) => {
  if (!ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID format");
  }

  if (userId === loggedId) {
    throw new ApiError(403, "You can't delete your own account!");
  }
  const existingUser = await getSingleUser(userId);
  if (!existingUser) {
    throw new ApiError(404, "user not found for delete this");
  }
  await prisma.user.delete({
    where: { id: userId },
  });
  return;
};

export const userService = {
  createUser,
  signupVerification,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
```

### `user.controller.ts`
```ts
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.services";

// register user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Check your email for signup verification",
    data: result,
  });
});

// signup verification
const signupVerification = catchAsync(async (req, res) => {
  const result = await userService.signupVerification(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "OTP verification successful",
    data: result,
  });
});

//get users
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "users retrived successfully",
    data: users,
  });
});

//get single user
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getSingleUser(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user retrived successfully",
    data: user,
  });
});

//update user
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const updatedUser = await userService.updateUser(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user updated successfully",
    data: updatedUser,
  });
});

//delete user
const deleteUser = catchAsync(async (req: any, res: Response) => {
  const userId = req.params.id;
  const loggedId = req.user.id;
  await userService.deleteUser(userId, loggedId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user deleted successfully",
  });
});

export const UserControllers = {
  createUser,
  signupVerification,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
```

### `user.route.ts`
```ts
import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create",
  validateRequest(userValidation.userRegisterValidationSchema),
  UserControllers.createUser
);
router.post(
  "/signup-verification",
  validateRequest(userValidation.verificationSchema),
  UserControllers.signupVerification
);
router.get("/", auth(UserRole.Admin), UserControllers.getUsers);
router.get("/:id", auth(), UserControllers.getSingleUser);
router.put(
  "/:id",
  validateRequest(userValidation.userUpdateValidationSchema),
  auth(UserRole.Admin),
  UserControllers.updateUser
);
router.delete("/:id", auth(UserRole.Admin), UserControllers.deleteUser);

export const userRoutes = router;
```

### `user.validation.ts`
```ts
import { z } from "zod";

const userRegisterValidationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const verificationSchema = z.object({
  email: z.string().min(10, "Phone Number min 10 Digit"),
  otp: z.string().min(4, "OTP must be at least 4 characters long")
});

const userUpdateValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .optional(),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .optional(),
  mobile: z.string().min(10, "Mobile Number at least 10 Digit long").optional(),
  role: z.enum(["ADMIN", "USER"]).optional(),
  status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]).optional(),
});

export const userValidation = {
  userRegisterValidationSchema,
  verificationSchema,
  userUpdateValidationSchema,
};
```

### `userApi.hurl`
```hurl
GET http://localhost:5002/api/v1/users
Authorization: Bearer =eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzkzY2M3MzVkNDAzNzBlMDY0NGZkYiIsImVtYWlsIjoiamFuZS5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoiVXNlciIsImlhdCI6MTc1ODAyMDA3NywiZXhwIjoxNzU5MzE2MDc3fQ.lASuKtS7IcDZU4HJPlALjn4in4jGZc94S7N5gvbH_Is


POST http://localhost:5002/api/v1/auth/google-login
Content-Type: application/json

{
  "email": "jane.doe@example.com",
  "fullName": "Jane Doe",
  "fcmToken": "abc123xyz456"
}

```
