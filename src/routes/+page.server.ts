import { UserModel } from "$lib/models/User";

const users = await UserModel.find();

console.log(users);