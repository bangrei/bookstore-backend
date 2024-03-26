import { saveUser } from "../services/userService";

const seed = async () => {
  try {
      await saveUser(
          null,
          "naldi",
          "test",
          "andahmuhammad@gmail.com",
          "password",
          100
      );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default {
  seed,
};
