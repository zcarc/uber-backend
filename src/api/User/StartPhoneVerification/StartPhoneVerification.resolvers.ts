import Verification from "src/entities/Verification";
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs
    ): Promise<StartPhoneVerificationResponse> => {

      const { phoneNumber } = args;

      try {

        const exisitingVerification = await Verification.findOne({
          payload: phoneNumber,
        });

        if (exisitingVerification) {
          exisitingVerification.remove();
        }

        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: "PHONE",
        }).save();
        
        // to do send SMS

      } catch (error) {
        return {
          ok: false,
          error: error.message,
        };
      }
    },
  },
};

export default resolvers;
