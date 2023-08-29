import bcrypt from "bcrypt";

export const hasPassword = async (passStr) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passStr, salt);
    return hashedPassword;
};
