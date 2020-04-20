import User from "src/entities/User";
import { Resolvers } from "src/types/resolvers";
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
          return {
            ok: true,
            error: null,
            token: "Coming soon!",
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