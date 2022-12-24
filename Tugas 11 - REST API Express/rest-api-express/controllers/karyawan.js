const fs = require("fs");

class KaryawanController {
  static register(req, res) {
    fs.readFile("data.json", (err, data) => {
      if (err) {
        res.status(400).json({ error: "error membaca data" });
      } else {
        let dataFile = JSON.parse(data);
        let { name, password, role } = req.body;

        let newKaryawan = {
          name,
          password,
          role,
          isLogin: false,
        };

        if (newKaryawan.role == "trainer") newKaryawan.students = [];
        dataFile.push(newKaryawan);

        fs.writeFile("data.json", JSON.stringify(dataFile), (err) => {
          if (err) {
            res.status(400).json({ errors: "Error menyimpan data" });
          } else {
            res.status(201).json({ message: "Berhasil register" });
          }
        });
      }
    });
  }

  static findAllData(req, res) {
    fs.readFile("data.json", (err, data) => {
      if (err) {
        res.status(400).json({ error: "error membaca data" });
      } else {
        let dataFile = JSON.parse(data);
        res
          .status(200)
          .json({ message: "Berhasil get karyawan", data: dataFile });
      }
    });
  }

  static addSiswa(req, res) {
    fs.readFile("data.json", (err, data) => {
      if (err) {
        res.status(400).json({ error: "error membaca data" });
      } else {
        let dataFile = JSON.parse(data);

        const trainerName = req.params.name;
        let { name, kelas } = req.body;

        let isAdminLogin = dataFile.find(
          (row) => row.role == "admin" && row.isLogin == true
        );

        if (isAdminLogin) {
          let foundTrainer = dataFile.find(
            (person) => person.name == trainerName && person.role == "trainer"
          );
          foundTrainer.students.push({ name, kelas });

          fs.writeFile("data.json", JSON.stringify(dataFile), (err) => {
            if (err) {
              res.status(400).json({ errors: "Error menyimpan data" });
            } else {
              res.status(201).json({ message: "Berhasil add siswa", data: dataFile });
            }
          });
        } else {
          res
            .status(400)
            .json({ errors: "Gunakan role admin dan login terlebih dahulu" });
        }
      }
    });
  }
}

module.exports = KaryawanController;
