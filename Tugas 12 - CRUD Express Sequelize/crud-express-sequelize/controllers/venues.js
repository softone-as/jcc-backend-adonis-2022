const { Venues } = require("../models");

class VenuesController {
  static async addVenues(req, res) {
    let { name, address, phone } = req.body;
    let venues = await Venues.create({
      name,
      address,
      phone,
    });
    if (!venues) {
      res.status(400).json({ error: "Bad Request: Venues not found" });
    } else {
      res
        .status(201)
        .json({ message: "Add new venues succesfully", data: venues });
    }
  }

  static async findAll(req, res) {
    let venues = await Venues.findAll();
    if (!venues) {
      res.status(400).json({ error: "Database venues is empty" });
    } else {
      res.status(200).json({ message: "Get all data", data: venues });
    }
  }

  static async findById(req, res) {
    const idVenues = req.params.id;

    let venues = await Venues.findOne({
      where: {
        id: idVenues,
      },
    });

    if (!venues) {
      res.status(400).json({ error: "Bad Request: Venues not found" });
    } else {
      res.status(200).json({
        message: `Getting data venues with id: ${idVenues} is successfully  `,
        data: venues,
      });
    }
  }

  static async updateData(req, res) {
    const idVenues = req.params.id;
    let { name, address, phone } = req.body;

    let venues = Venues.update(
      { name, address, phone },
      {
        where: {
          id: idVenues,
        },
      }
    );

    if (!venues) {
      return res.status(400).json({ error: "Bad Request: Venues not found" });
    } else {
      res.status(204).json({
        message: `Updating data venues with id: ${idVenues} is successfully  `,
      });
    }
  }

  static async deleteData(req, res) {
    const idVenues = req.params.id;

    let venues = Venues.destroy({
      where: {
        id: idVenues,
      },
    });

    if (!venues) {
      return res.status(400).json({ error: "Bad Request: Venues not found" });
    } else {
      res.status(204).json({
        message: `Deleting data venues with id: ${idVenues} is successfully`,
      });
    }
  }
}

module.exports = VenuesController;
