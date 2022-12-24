const fs = require("fs");

class AuthController {
  static login(req, res) {
    fs.readFile("data.json", (err, data) => {
      if (err) {
        res.status(400).json({ error: "error membaca data" });
      } else {
        let dataFile = JSON.parse(data);

        let { name, password } = req.body;

        let updatedDataLogin = dataFile.map((row) =>
          row.name == name && row.password == password
            ? { ...row, isLogin: true }
            : row
        );

        fs.writeFile("data.json", JSON.stringify(updatedDataLogin), (err) => {
          if (err) {
            res.status(400).json({ errors: "Error menyimpan data" });
          } else {
            res.status(200).json({ message: "Berhasil login" });
          }
        });
      }
    });
  }
}

module.exports = AuthController;
