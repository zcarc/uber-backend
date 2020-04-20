import Verification from "../../../entities/Verification";
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse,
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { sendVerificationSMS } from "../../../utils/sendSMS";

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

        // send SMS
        await sendVerificationSMS(newVerification.payload, newVerification.key);
        return {
          ok: true,
          error: null,
        };

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
