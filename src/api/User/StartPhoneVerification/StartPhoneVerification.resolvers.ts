import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Verification from "../../../entities/Verification";
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

        console.log(newVerification);

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
