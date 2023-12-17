const { default: mongoose } = require("mongoose");
const menuModel = require("../../models/menu");

// exports.getAll = async (req, res) => {
//   try {
//     //! This func use "for" and "forEach" loop for find menus and subMenus.
//     const menus = await menuModel.find({}).lean();

//     menus.forEach((menu) => {
//       const submenus = [];
//       for (let i = 0; i < menus.length; i++) {
//         const mainMenu = menus[i];
//         if (mainMenu.parent?.equals(menu._id)) {
//           submenus.push(menus.splice(i, 1)[0]); // trace => support
//           i = i - 1;
//         }
//       }
//       menu.submenus = submenus;
//     });

//     return res.json(menus);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

exports.getAll = async (req, res) => {
  try {
    //* This function reads menus and submenus from the database and returns them in a structured and nested way.

    const menus = await menuModel.find({}).lean();

    const getSubmenus = (parentId) =>
      menus
        .filter((menu) => String(menu.parent) === String(parentId))
        .map((submenu) => ({ ...submenu, submenus: getSubmenus(submenu._id) }));

    const result = menus
      .filter((menu) => !menu.parent)
      .map((menu) => ({ ...menu, submenus: getSubmenus(menu._id) }));

    return res.json({ menus: result });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.create = async (req, res) => {
  try {
    const { title, href, parent } = req.body;

    const menu = await menuModel.create({
      title,
      href,
      parent,
    });

    return res.status(201).json(menu);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.adminGetAll = async (req, res) => {
  try {
    const allMenu = await menuModel
      .find({}, "title href")
      .populate("parent", "title href")
      .lean();
    return res.json(allMenu);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(409).json({ message: "Invalid menu ID !" });
    }

    const remove = await menuModel.findOneAndDelete({ _id: id });

    if (!remove) {
      return res.status(409).json({ message: "Menu not found !" });
    }

    return res.json(remove);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateMenuName = async (req, res) => {};
