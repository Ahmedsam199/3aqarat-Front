export default async ({ data, PartyMap, }) => {
  return {
    ...data,
    FirstParty: PartyMap.get(data.FirstParty).FullName,
    SecondParty: PartyMap.get(data.SecondParty).FullName,
  };
};
