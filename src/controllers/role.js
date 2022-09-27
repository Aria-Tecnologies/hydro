const db = require("../database/database");
const RoleModel = db.Role;

exports.add = async (req, res) => {
  const roleFound = await RoleModel.findAll({
    where: {
      name: req.body.name.toUpperCase(),
    },
  });

  if (roleFound.length > 0)
    return res
      .status(400)
      .json({ message: "An role with this name has been created" });

  const newRole = await RoleModel.create({
    name: req.body.name,
    isActive: req.body.isActive
  });
  await newRole.save();

  return newRole
    ? res
        .status(200)
        .json({
          message: "A new Role has been added successfuly",
          data: newRole,
        })
    : res.status(400).json({ message: "An error has benn ocurred" });
};

exports.list = async (req, res) => {
  const roleList = await RoleModel.findAll();

  return roleList.length > 0
    ? res.status(200).json({ message: "Successfuly", data: roleList })
    : res.status(400).json({ message: "No items available on DB" });
};

exports.find = async (req, res) => {
  const roleById = await RoleModel.findAll({
    where: {
      id: req.params.id,
    },
  });

  return roleById.length > 0
    ? res.status(200).json({ message: "Successfully", data: roleById })
    : res.status(400).json({ message: "Crop doesn´t match on DB" });
};
