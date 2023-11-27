import MessageDaoMongoDB from "../dao/mongoDB/chat.dao.js";
const msgDao = new MessageDaoMongoDB();

export const getAll = async () => {
  try {
    return await msgDao.getAll();
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const msg = await msgDao.getById(id);
    if (!msg) return false;
    else return prod;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (obj) => {
  try {
    const newMsg = await msgDao.create(obj);
    if (!newMsg) return false;
    else return newMsg;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (id, obj) => {
  try {
    const msgUpd = await msgDao.update(id, obj);
    if (!msgUpd) return false;
    else return msgUpd;
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (id) => {
  try {
    const msgDel = await msgDao.delete(id);
    if (!msgDel) return false;
    else return msgDel;
  } catch (error) {
    console.log(error);
  }
};
