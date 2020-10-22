// here there be JS, yarrr ☠️

const conversationElem = document.querySelector("#conversation-container");
const messageInput = document.querySelector("#user-input");

const handlefocus = () => {
    messageInput.focus();
};

const updateConversation = (message) => {
    const { author, text } = message;
    const messageElem = document.createElement("p");
    messageElem.innerHTML = `<span>${text}</span>` ;
    conversationElem.appendChild(messageElem);
    conversationElem.scrollTop = conversationElem.scrollHeight;
    handlefocus();
    if(author === "user") {messageInput.value = "";}
    
}

const sendMessage = (event) => {
    // prevent the default "page reload" from occurring.
    event.preventDefault();
    const message = { author: "user", text: messageInput.value };
    updateConversation(message);
    fetch("/cat-message")
  .then((res) => res.json())
  .then((data) => {
      
    updateConversation(data.message);
  });
};

handlefocus();
