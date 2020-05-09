const mongoose = require('mongoose');
/*
const Mutation = mongoose.model('Mutation', models.mutationSchema);
const Conversation = mongoose.model('Conversation', models.conversationSchema);
*/

const ping = (req, res) => {
  res.status(200).send({
    'ok': true,
    'msg': 'pong'});
};

const getInfo = (req, res) => {
    res.status(200).send({
      'ok': true,
      'author': {
        'email': 'wildayk@gmail.com',
        'name': 'Katie Wilday'
      },
      'frontend': {
        'url': 'http://localhost:3000'
      },
      'language': 'node.js',
      'sources': 'https://github.com/KatieWilday/challenge_softwareengineer_katiewilday',
      'answers': {
        '1': "The way I approached the problem was with the frontend aspect first since I am applying for the Full-stack/Frontend Engineer role. I used React.js to build out the interface and JavaScript as it is my preferred language. I first created different components to display the form for user as well as one for displaying all the conversations. When building the application, I used the componentDidMount lifecycle method to fetch data from a server and to update the state of the conversation object.After typing in a new message, the application logs in the JavaScript console each character added and/or subtracted as well as the array of author and text. A problem that I ran into was that I was getting a NPM error in my terminal and I didn’t know where it was coming from. I ended up googling the error and finding out that it was actually a JSON issue. From there I was able to identify the missing of a comma in my package.json file. To make the application more visually appealing I chose to add CSS into an App.css file to apply to the different “classNames” throughout my code.",
        '2': "If I had more time I would have looked into creating more of the backend and connect it to a database. I would have gone back through my code and refactored some and renamed some variables to make it more clear and readable.",
        '3': "This challenge was really enjoyable for me as it gave me the opportunity to learn. Throughout this challenge I did do a lot of research and studying where I was able to pick up new skills and debugging ideas. If I were to add something to this challenge I would add little more time to work on it and perfect things."
      }
    });
};

const postMutation = (req, res) => {
  if(!req.body.conversationId){
    var newConversation = new Conversation(req.body);
    newConversation.save((error, doc) => {
      if(error){
        res.status(400).send(error);
      } else {
        // res.status(201).send(doc);
        res.status(201).send({
          'msg': 'Conversation created and mutation applied',
          'ok': true,
          'text': doc.text
        })
      }
    });
  } else {
    updateConversation(req.body.conversationId, req, res);
  }
};

const updateConversation = (id, req, res) => {
  Conversation.findById(id, (error, docs) => {
    if(error){
      res.send(error);
    } else {
      let insertMutation = operationalTransformation.performInsert(docs.text, req.body.index, req.body.author, req.body.text);
      let updateState =
      Conversation.updateOne({_id: req.body.conversationId}, {text: insertMutation}, (error, doc) => {
        if(error){
          console.log(error);
        } else {
          console.log(doc);
        };
      });
      let findType = req.body.text.length;
      let determineType = findType ? 'insert' : 'delete';
      let origin = operationalTransformation.getOrigin();
      createMutation(req, res, determineType, origin);
    };
  });
};

const createMutation = (req, res, type, origin) => {
  let newMutation = new Mutation({
      author: req.body.author,
      conversationId: req.body.conversationId,
      index: req.body.index,
      length: req.body.length,
      text: req.body.text,
      type: type,
      alice: origin[1],
      bob: origin[0]
  });
  newMutation.save((error, doc) => {
    if(error){
      res.status(400).send(error);
    } else {
      //res.status(201).send(doc);
      getConversation(req, res);
    };
  });
};

const getConversations = (req, res) => {
  Conversation.find({}, (error, conversations) => {
    if(error){
      res.status(400).send(error);
    } else {
      res.status(200).send(conversations);
    };
  });
};

const getConversation = (req, res) => {
  let id = req.params.conversationId || req.body.conversationId;
  Conversation.findById(id, (error, doc) => {
    if(error){
      res.status(400).send(error);
    } else {
      console.log(doc);
      res.status(201).send({
        'msg': 'Mutation applied to conversation',
        'ok': true,
        'text': doc.text
      });
    };
  });
};

const deleteConversation = (req, res) => {
  Conversation.findByIdAndDelete(req.body.id, (error, docs) => {
    if(error){
      res.status(400).send(error);
    } else {
      console.log(req.body.id)
      res.status(204).json({ msg: 'message', ok: true })
    };
  });
};

module.exports.ping = ping;
module.exports.getInfo = getInfo;
module.exports.postMutation = postMutation;
module.exports.getConversation = getConversation;
module.exports.getConversations = getConversations;
module.exports.deleteConversation = deleteConversation;
