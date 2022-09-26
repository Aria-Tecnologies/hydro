const db = require('../database/database')
const FarmerModel = db.Farmer

exports.add = async (req, res) => {
  const nweFarmer = await FarmerModel.create({
    name: req.body.name,
    nickname: req.body.nickname,
    location: req.body.location
  });
  await nweFarmer.save()

  return (nweFarmer)
    ? res.status(200).json({ message: "A new farmer has been added successfuly", data: nweFarmer})
    : res.status(400).json({message: "An error has benn ocurred"});
};

exports.list = async (req, res) => {
  const farmerList = await FarmerModel.findAll()

  return (farmerList.length > 0)
    ? res.status(200).json({ message: "Successfuly", data: farmerList })
    : res.status(400).json({ message: "No items available on DB" });
};

exports.find = async (req, res) => {
  const farmerById = await FarmerModel.findAll({
    where: {
      id: req.params.id,
    },
  });

  return (farmerById.length > 0)
  ? res.status(200).json({ message: 'Successfully', data: farmerById})
  : res.status(400).json({ message: 'Crop doesn´t match on DB' })
};

exports.update = async (req, res) => {
    const farmerById = await FarmerModel.update({ name: req.body.name, nickname: req.body.nickname, location: req.body.location },{
            where: {
                id: req.params.id
            }
        });
  
    return(farmerById.length > 0)
    ? res.status(200).json({ message: 'Successfully', data: farmerById })
    : res.status(400).json({ message: 'Crop doesn´t match on DB' })
  };
  
