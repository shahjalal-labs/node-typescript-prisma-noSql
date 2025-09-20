import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { redisQuery } from "../../../../pr/redisQuery";

const router = express.Router();

// create user with otp email verification
router.post(
  "/create",
  validateRequest(userValidation.userRegisterValidationSchema),
  UserControllers.createUser,
);

// create user without otp email verification
router.post(
  "/create-user",
  validateRequest(userValidation.userCreateValidationSchema),
  UserControllers.CreateUser,
);
router.post(
  "/signup-verification",
  validateRequest(userValidation.verificationSchema),
  UserControllers.signupVerification,
);
router.get("/redis", async (req: Request, res: Response) => {
  try {
    const result = await redisQuery();

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Redis query error ❌", error);

    res.status(500).json({
      success: false,
      message: "Redis query failed",
    });
  }
});

// router.get("/", auth(UserRole.Admin), UserControllers.getUsers);
router.get("/ruhulaminvai/amin", auth(), UserControllers.getUsers);
router.get("/:id", auth(), UserControllers.getSingleUser);
router.put(
  "/:id",
  validateRequest(userValidation.userUpdateValidationSchema),
  auth(UserRole.Admin),
  UserControllers.updateUser,
);
router.delete("/:id", auth(UserRole.Admin), UserControllers.deleteUser);
// Route
export const userRoutes = router;
