export default async ({ data, PartyMap, PurposeMap }) => {
  return {
    ...data,
    PayParty: PartyMap.get(data.PayParty).FullName,
    ReceiveParty: PartyMap.get(data.ReceiveParty).FullName,
    Purpose: PurposeMap.get(data.Purpose).Purpose,
  };
};