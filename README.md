# Firestore Import Export
A script that help to export and import in Cloud Firestore

**Update: you can try the NPM package for [backup and restore from Firestore](https://github.com/dalenguyen/firestore-backup-restore) now.

# Requirements

You need [NODE](https://nodejs.org/en/download/) or something that can run JAVASCRIPT (JS) file.

Get **serviceAccount** JSON file from *Project Setting > SERVICE ACCOUNTS* in Firebase Console

# Setting Up

Download or clone this repository

```
git clone https://github.com/dalenguyen/firestore-import-export.git
```

Install NPM packages

```
npm install
```

# Export database from Firestore

This will help you create a backup of your collection and subcollection from Firestore to a JSON file.

```
Usage:
  export.js [OPTIONS] [ARGS]

Options:
  -d, --database URL         Database url
  -f, --credentials [FILE]   Credential file (Default is ./serviceAccountKey.json)
  -c, --collection STRING    Collection name
  -s, --subcollection STRING Subcollection name
  -e, --export [STRING]      Export file (Default is firebase-export.json)
  -h, --help                 Display help and usage details
```
example:
`node export.js --database='https://adatabase.firebaseio.com' --collection=collection_name --export=json_file.json`

# Import database to Firestore

This will import one collection to Firestore and it will overwrite your current collection if there is a collection with that name in your Firestore

```
node import.js import-to-firestore.json
```
**THIS IS A FORK. ISSUES SHOULD BE DIRECTED AT dalenguyen UNLESS THEY RELATE TO THE COMMAND LINE OPTIONS**
