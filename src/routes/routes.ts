import { Hono } from "hono";
import { PasswordService } from "../domain/services/password.service";
import { RegexPasswordValidator } from "../domain/validators/regex-password-validator";

const routes = new Hono();

// Dependency Injection manual (SOLID - D)
// Di proyek besar, kita bisa menggunakan library DI, tapi untuk latihan ini manual sudah cukup.
const passwordValidator = new RegexPasswordValidator();
const passwordService = new PasswordService(passwordValidator);

routes.post("/validate-password", async (c) => {
  try {
    const body = await c.req.json();
    const { password } = body;

    if (password === undefined || typeof password !== "string") {
      return c.json({
        isValid: false,
        errors: ["Password wajib diisi dan harus berupa string"]
      }, 400);
    }

    const result = passwordService.validatePassword(password);

    if (result.isValid) {
      return c.json({
        message: "Password aman dan memenuhi syarat",
        ...result
      }, 200);
    }

    return c.json({
      message: "Password tidak memenuhi syarat keamanan",
      ...result
    }, 400);

  } catch (error) {
    return c.json({
      error: "Request body tidak valid (JSON error)"
    }, 400);
  }
});

export default routes;
