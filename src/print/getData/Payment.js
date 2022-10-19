export default async ({ data, PartyMap, }) => {
  return {
    ...data,
    PayParty: PartyMap.get(data.PayParty).FullName,
    ReceiveParty: PartyMap.get(data.ReceiveParty).FullName,
    
  };
};