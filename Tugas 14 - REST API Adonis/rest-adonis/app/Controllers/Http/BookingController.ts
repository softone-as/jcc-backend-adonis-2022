import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateBookingValidator from "App/Validators/CreateBookingValidator";

export default class BookingController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateBookingValidator);
      response.ok(request.body());
    } catch (error) {
      response.badRequest({ errors: error.messages });
    }
  }
}
