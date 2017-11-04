var express = require('express');
var app = express.Router();
var User = require('../Models/User');
var Document = require('../Models/Document');

app.post('/getdocument', (req, res)=>{
  console.log('inside get document');
  Document.findById(req.body.docid, (err, docs) => {
    if (err) {
      console.error(err);
    } else {
      console.log('docs', docs);
      res.send(docs);
    }
  });
});

async function findSharedDoc(user, sharedDoc){
  for(var doc of user.sharedDoc){
    var document = await Document.findById(doc);
    sharedDoc.push(document);
  }
  return sharedDoc;
}

app.post('/getAllDocs', (req, res)=>{
  var ownDoc = [];
  var sharedDoc=[];
  console.log('body in get all docs', req.body);
  // res.send(`{ownDoc: ${ownDoc}, sharedDoc: ${sharedDoc}}`);
  Document.find({user: req.body.userid}, (err, docs) => {
    if (err) {
      console.error(err);
    } else {
      ownDoc = docs.slice();
    }
  })
  .then(()=>{return User.findById(req.body.userid);})
  .then((user)=>{
    return findSharedDoc(user, sharedDoc);
  })
  .then(()=>{
    res.send({ownDoc: ownDoc, sharedDoc: sharedDoc});
    console.log(`{ownDocs: ${ownDoc}, sharedDoc: ${sharedDoc}}`);
  })
  .catch(err=>console.log(err));
});

app.post('/newdoc', (req, res) => {
  console.log(req.body);
  const newDoc = new Document(req.body);
  newDoc.save((doc)=>{return doc;})
  .then(resp=>{return User.findById(resp.user);})
  .then(user=>{
    user.ownDoc= user.ownDoc.concat(newDoc._id);
    return user.save();
  })
  .then(()=>res.send(newDoc))
  .catch(err=>console.log(err));
});

app.post('/updatedoc', (req, res) => {
  Document.findById(req.body.id, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      doc.body = req.body.body;
      doc.inlineStyles = req.body.inlineStyles;
      var timeStamp = Date.now();
      doc.history = Object.assign({}, doc.history, { [timeStamp]: {EditorState: req.body.body, inlineStyles: req.body.inlineStyles}});
      console.log('document after updated', doc);
      doc.save((err, result)=>{
        if (err){
          res.send(err);
        } else {
          res.send('body updated');
        }
      });
    }
  });
});


async function deleteSharedDoc(doc, contributor){
  for(var user of contributor){
    var foundUser = await User.findById(user);
    foundUser.sharedDoc.filter((x)=>{x !== doc});
  }
  return sharedDoc;
}

app.post('/deletedoc', (req, res) => {
  var docid;
  var contributor;
  Document.findByIdAndRemove(req.body.docid, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      docid = doc._id
      contributor = doc.contributor.slice();
      res.send('Successfully deleted!');
    }
  })
  .then(()=>{

  });
});

app.post('/updatedoc', (req, res) => {

  Document.findById(req.body.id, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      doc.body = req.body.body;
      doc.save()
      .then(()=>{
        console.log('body updated');
        res.send('body updated');
      });
    }
  });
});

app.post('/addSharedDoc', (req, res) => {
  //add document to the user's shared doc field, and add user to the contributor field to the doc
  console.log('req.body', req.body);
  User.findById(req.body.userid)
  .then(user=>{
    user.sharedDoc.push(req.body.docid);
    return user.save();
  })
  .then(()=>{
    Document.findById(req.body.docid, (err, doc) => {
      if (err) {
        res.send('Document does not exist! ', err);
      } else {
        doc.contributor.push(req.body.userid);
        doc.save();
        res.send(doc);
      }
    });
  })
  .catch(err=>{console.log('err in add shared doc', err);});
});

module.exports = app;
