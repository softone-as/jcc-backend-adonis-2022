import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateVenueValidator from "App/Validators/CreateVenueValidator";

export default class VenueController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateVenueValidator);
      response.ok(request.body());
    } catch (error) {
      response.badRequest({ errors: error.messages });
    }
  }
}
