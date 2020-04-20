import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";
import {
  EmailSignInMutationArgs,
  EmailSignUpResponse,
} from "./../../../types/graph.d";


const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email } = args;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            error: "You should log in instead",
            token: null,
          };
        } else {
          const newUser = await User.create({ ...args }).save();
          const token = createJWT(newUser.id);
          return {
            ok: true,
            error: null,
            token
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;