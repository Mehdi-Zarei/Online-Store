const menuModel = require("../../models/menu");

// exports.getAll = async (req, res) => {
//   //! This func use for and forEach loop
//   const menus = await menuModel.find({}).lean();

//   menus.forEach((menu) => {
//     const submenus = [];
//     for (let i = 0; i < menus.length; i++) {
//       const mainMenu = menus[i];
//       if (mainMenu.parent?.equals(menu._id)) {
//         submenus.push(menus.splice(i, 1)[0]); // trace => support
//         i = i - 1;
//       }
//     }
//     menu.submenus = submenus;
//   });

//   return res.json(menus);
// };

exports.getAll = async (req, res) => {
  //! This func use forEach loop and filter method

  const menus = await menuModel.find({}).lean();

  const result = [];

  menus.forEach((menu) => {
    if (!menu.parent) {
      const submenus = menus.filter(
        (mainMenu) => String(mainMenu.parent) === String(menu._id)
      );
      result.push({ ...menu, submenus });
    }
  });

  return res.json(result);
};

exports.create = async (req, res) => {
  const { title, href, parent } = req.body;

  const menu = await menuModel.create({
    title,
    href,
    parent,
  });

  return res.status(201).json(menu);
};

exports.adminGetAll = async (req, res) => {
  const allMenu = await menuModel
    .find({}, "title href")
    .populate("parent", "title href")
    .lean();
  return res.json(allMenu);
};

exports.remove = async (req, res) => {};

exports.updateMenuName = async (req, res) => {};
