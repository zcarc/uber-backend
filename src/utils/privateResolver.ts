// pricateResolver() 를 호출하게 되면 
// 두번째 ()는 graphql에서 보내주게 된다.
// privateResolver(myFynction)(parent, args, context)

const privateResolver = (resolverFunction) => async (
  parent,
  args,
  context,
  info
) => {

  if (!context.req.user) {
    throw new Error("No JWT. I refuse to proceed");
  }

  const resolved = await resolverFunction(parent, args, context, info);

  return resolved;
};

export default privateResolver;
