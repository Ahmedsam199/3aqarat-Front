export default async ({ data, PartyMap, CTypeMap, AttributeMap }) => {
  console.log("DATA",data);
  return {
    ...data,
    FirstParty: PartyMap.get(data.FirstParty).FullName,
    SecondParty: PartyMap.get(data.SecondParty).FullName,
    ContractType: CTypeMap.get(data.ContractType).ContractType,
    // Attributes: AttributeMap.get(data.Attributes).Attributes[0],
  };
};
