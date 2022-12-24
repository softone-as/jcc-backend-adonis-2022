import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateFieldValidator from "App/Validators/CreateFieldValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class FieldController {
  public async index({ request, response }: HttpContextContract) {
    let venue_id = request.param("venue_id");
    if (request.qs()) {
      let field_type = request.qs().field_type;

      let fieldsFiltered = await Database.from("fields")
        .select("id", "name", "type")
        .where("venue_id", venue_id)
        .andWhere("type", field_type);

      return response.ok({
        message: `Get data by ${field_type} succesfully!`,
        data: fieldsFiltered,
      });
    }

    let fields = await Database.from("fields")
      .select("id", "name", "type", "venue_id")
      .where("venue_id", venue_id);
    return response.ok({ message: "Get data succesfully!", data: fields });
  }

  public async store({ request, response }: HttpContextContract) {
    const venue_id = request.param("venue_id");
    try {
      await request.validate(CreateFieldValidator);
      const { name, type } = request.body();
      await Database.table("fields").insert({
        name,
        type,
        venue_id,
      });

      response.created({ message: "created!", data: request.body() });
    } catch (error) {
      response.badRequest({ errors: error.messages });
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { venue_id, id } = request.params();
    try {
      const venues = await Database.from("fields")
        .select("*")
        .where("id", id)
        .andWhere("venue_id", venue_id);
      response.ok({ message: `Get data by ${id} succesfully!`, data: venues });
    } catch (error) {
      response.badRequest({ errors: error.messages });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { venue_id, id } = request.params();
    const { name, type } = request.body();
    try {
      await request.validate(CreateFieldValidator);
      await Database.from("fields")
        .where("id", id)
        .andWhere("venue_id", venue_id)
        .update({ name, type });

      response.ok({ message: `Updated data ${id} succesfully!` });
    } catch (error) {
      response.badRequest({ errors: error.messages });
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { venue_id, id } = request.params();
    try {
      await Database.from("fields")
        .where("id", id)
        .andWhere("venue_id", venue_id)
        .delete();
      response.ok({ message: `Deleted data ${id} succesfully!` });
    } catch (error) {
      response.badRequest({ errors: error.messages });
    }
  }
}
