const CropModel = require("../models/crop");
const response = require("../helpers/response");

exports.add = async (req) => {
  const newCrop = await CropModel.create({
    name: req.body.name,
    description: req.body.description,
    status: req.body.status
  });
  await newCrop.save()

  return (newCrop)
    ? response(200, "A new crop has been added successfuly", newCrop)
    : response(204, "An error has benn ocurred");
};

exports.list = async () => {
  const cropList = await CropModel.findAll()

  return (cropList.length > 0)
    ? response(200, "Successfuly", cropList)
    : response(204, "No items available on DB");
};

exports.find = async (req) => {
  const cropById = await CropModel.findAll({
    where: {
      id: req.params.id,
    },
  });

  return (cropById.length > 0)
  ? response(200, 'Successfully', cropById)
  : response(204, 'Crop doesn´t match on DB')
};

exports.update = async (req) => {
    const cropById = await CropModel.update({ name: req.body.name, description: req.body.description, status: req.body.status },{
            where: {
                id: req.params.id
            }
        });
  
    return(cropById.length > 0)
    ? response(200, 'Successfully', cropById)
    : response(204, 'Crop doesn´t match on DB')
  };
  
