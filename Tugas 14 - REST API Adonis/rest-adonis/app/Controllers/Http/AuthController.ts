import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import UserValidator from "App/Validators/UserValidator";

export default class AuthController {
  public async index({ response }: HttpContextContract) {
    try {
      const user = await User.all();
      response.ok({ message: "get data success", data: user });
    } catch (error) {
      return response.badRequest({
        messages: "Get data failed!",
        error: error.message,
      });
    }
  }

  public async register({ request, response }: HttpContextContract) {
    // const user = new User();

    try {
      const data = await request.validate(UserValidator);
      //   await user.fill(data).save();
      const newData = await User.create(data);

      response.created({ message: "created!", data: newData });
    } catch (error) {
      response.unprocessableEntity({ errors: error.messages });
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
    });

    const email = request.input("email");
    const password = request.input("password");

    try {
      await request.validate({ schema: userSchema });
      const token = await auth.use("api").attempt(email, password);

      return response.ok({ messages: "login succes!", token });
    } catch (error) {
      if (error.guard) {
        return response.badRequest({
          messages: "Login Error!",
          error: error.message,
        });
      } else {
        return response.badRequest({
          messages: "Login Error!",
          error: error.messages,
        });
      }
    }
  }
}
