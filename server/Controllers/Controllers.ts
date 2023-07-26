import User from "../Models/UserModel";
import { UserData, MyResponseType, RoutesMiddlewareType } from "./types";

export const getFriends: RoutesMiddlewareType = (req, res) => {
    const requestUserId = req.user.id;
    
    User.find({ _id: { $ne: requestUserId } })
      .select("id username profilePicture")
      .then((results: UserData[]) => {
        let data: MyResponseType<UserData[]> = {
          message: "User created successfully",
          success: true,
          response: results,
        };

        res.send(data).status(200);
      });
};
