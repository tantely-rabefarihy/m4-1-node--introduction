'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))

  // Any requests for static files will go into the public folder
  .use(express.static('public'))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
.get('/cat-message', (req, res) => {
  const message = {author: 'cat', text: 'Meow'};
  const randomTime = Math.floor(Math.random()* 3000);
  setTimeout(() => {
    res.status(200).json({status: 200, message});
  }, randomTime);

})

.get('/monkey-message', (req, res) => {
  const messages = [
    "Don’t monkey around with me.",
    "If you pay peanuts, you get monkeys.",
    "I fling 💩 at you!",
    "🙊",
    "🙈",
    "🙉",
  ];
  let randomIndex = Math.floor(Math.random()* 6);
  let ranMessage = messages[randomIndex];
  const randomTime = Math.floor(Math.random()* 3000);
  setTimeout(() => {
    let message = {author: 'monkey', text: ranMessage}
    res.status(200).json({status:200, message})
  }, randomTime);

})

.get('/parrot-message', (req, res) => {
  console.log("***",req.query);
  const message = {author: 'parrot', text: `${req.query.message}`};
  // if(req.query === "")
  const randomTime = Math.floor(Math.random()* 3000);
  setTimeout(() => {
    res.status(200).json({status: 200, message});
  }, randomTime);
  
})

.get('/bot-message', (req, res) => {

  console.log("***", req.query.message);

const getBotMessage = (text) => {
  const commonGreetings = ["hi","howdy","hello"];
  const commonGoodByes = ["bye","goodbye","see you later"];
  const jokes = ["What's a balloon's least favorite type of music? Pop.",
"What did the green grape say to the purple grape? Breathe, man! Breathe!", 
"Why did the taxi driver get fired? Passengers didn't like it when she went the extra mile.",
"Why do we tell actors to “break a leg? Because every play has a cast.",
"How do you make a tissue dance? Put a little boogie in it."
]
  let botMsg;

  let lowerCasedMessage = text.toLowerCase();
  
  // GREETINGS

  commonGreetings.filter(greet => {
    if (lowerCasedMessage.includes(greet)) { 
      return botMsg = "Hello Human !"
       
      }   
  });
  
  // GOODBYES
  
  commonGoodByes.filter(bye => {
    if (lowerCasedMessage.includes(bye)) {
      return botMsg = "Bye Human !"
       } 
  });

  // Something and and Jokes 


// if(isInGreet > 0) {return botMsg = "Hello Human!"}
// else if(isInBye > 0) { return botMsg = "Bye Human."}
if(lowerCasedMessage === "something funny") { botMsg = "Hey, do you want to listen to my well known jokes? ( YES / NO )"} 
else if (lowerCasedMessage.includes("yes")) { botMsg = jokes[Math.floor(Math.random() * jokes.length)] + " Another one ?"} 
else if (lowerCasedMessage.includes("no") ) { botMsg = "Bye Human." }
else { botMsg = text} ;


  return botMsg;
}

console.log("this is whats happening : ", getBotMessage(req.query.message));

  const message = {author: 'bot' , text: `Bzzt ${getBotMessage(req.query.message)}`};
  const randomTime = Math.floor(Math.random()* 3000);

setTimeout(() => {
  res.status(200).json({status: 200, message})
}, randomTime);
}
  
)


  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get('/', (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res
      .status(404)
      .json({
        status: 404,
        message: 'This is obviously not the page you are looking for.',
      });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
