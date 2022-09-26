const db = require('../database/database')
const CropModel = db.Crop

exports.add = async (req, res) => {
  const newCrop = await CropModel.create({
    name: req.body.name,
    description: req.body.description,
    status: req.body.status
  });
  await newCrop.save()

  return (newCrop)
    ? res.status(200).json({ message: "A new crop has been added successfuly", data: newCrop})
    : res.status(400).json({message: "An error has benn ocurred"});
};

exports.list = async (req, res) => {
  const cropList = await CropModel.findAll()

  return (cropList.length > 0)
    ? res.status(200).json({ message: "Successfuly", data: cropList })
    : res.status(400).json({ message: "No items available on DB" });
};

exports.find = async (req, res) => {
  const cropById = await CropModel.findAll({
    where: {
      id: req.params.id,
    },
  });

  return (cropById.length > 0)
  ? res.status(200).json({ message: 'Successfully', data: cropById})
  : res.status(400).json({ message: 'Crop doesn´t match on DB' })
};

exports.update = async (req, res) => {
    const cropById = await CropModel.update({ name: req.body.name, description: req.body.description, status: req.body.status },{
            where: {
                id: req.params.id
            }
        });
  
    return(cropById.length > 0)
    ? res.status(200).json({ message: 'Successfully', data: cropById })
    : res.status(400).json({ message: 'Crop doesn´t match on DB' })
  };
  
