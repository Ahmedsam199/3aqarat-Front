import Dexie from 'dexie';

const db = new Dexie('cacheDB');
db.version(1).stores({
  request: '++id,timestamp,synced,request,response,url',
  cache: '++id,timestamp,entity,chksum,value',
});

export default db;
