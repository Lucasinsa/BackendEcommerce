import { genSaltSync, hashSync, compareSync } from "bcrypt";

const createHash = (password) => hashSync(password, genSaltSync(10));

const isValidPass = (reqPass, dbPass) => compareSync(reqPass, dbPass);

export { createHash, isValidPass };
