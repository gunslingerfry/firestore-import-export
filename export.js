const admin = require("firebase-admin");
const fs = require('fs');
const cli = require('cli');

cli.parse({
  database: [ 'd', 'Database url', 'url', undefined ],
  credentials: [ 'f', 'Credential file', 'file', './serviceAccountKey.json' ],
  collection: [ 'c', 'Collection name', 'string', undefined ],
  subcollection: [ 's', 'Subcollection name', 'string', undefined ],
  export: [ 'e', 'Export file', 'string', 'firebase-export.json' ]
});

if (cli.options.database === undefined) {
  cli.fatal('a database must be specified');
}
if (cli.options.collection === undefined) {
  cli.fatal('a collection must be specified');
}

let serviceAccount = require(cli.options.credentials);
let collectionName = cli.options.collection;
let subCollection = cli.options.subcollection != null ? cli.options.subcollection : undefined;

// You should replace databaseURL with your own
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: cli.options.database
});

let db = admin.firestore();

let data = {};
data[collectionName] = {};

let results = db.collection(collectionName)
.get()
.then(snapshot => {
  snapshot.forEach(doc => {
    data[collectionName][doc.id] = doc.data();
  })
  return data;
})
.catch(error => {
  console.log(error);
})

results.then(dt => {
  getSubCollection(dt).then(() => {
    // Write collection to JSON file
    fs.writeFile(cli.options.export, JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
  })
})

async function getSubCollection(dt){
  for (let [key, value] of Object.entries([dt[collectionName]][0])){
    if(subCollection !== undefined){
      data[collectionName][key]['subCollection'] = {};
      await addSubCollection(key, data[collectionName][key]['subCollection']);
    }
  }
}

function addSubCollection(key, subData){
  return new Promise(resolve => {
    db.collection(collectionName).doc(key).collection(subCollection).get()
    .then(snapshot => {
      snapshot.forEach(subDoc => {
        subData[subDoc.id] =  subDoc.data();
        resolve('Added data');
      })
    })
  })
}
