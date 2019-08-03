const conversation = document.querySelector('.conversation');
const messageInput = document.querySelector('.message-input');

let theme = "dark";

document.querySelector('.message-input').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      let message = messageInput.value;
      console.log(message.trim())
      if (message.startsWith('/received ') || message.startsWith('/r ')) {
        message = message.replace('/received ', '');
        message = message.replace('/r ', '');
        sendMessage(message, 'received');
      }
      else if (message.trim() === '/dark') { darkTheme(); }
      else if (message.trim() === '/light') { lightTheme(); }
      else { sendMessage(message, 'sent'); }
    }
});

const sendMessage = (message, type) => {
  if (message.trim() !== '') {
    const options = { timeZone: "Europe/Paris", hour12: true, hour: "2-digit", minute: "2-digit" }
    const time = new Date().toLocaleTimeString("en-US", options);

    const messages = document.getElementsByClassName('message');

    let divContainer = document.createElement("div");
    let divMessage = document.createElement("div");
    let messageNode = document.createTextNode(message);

    let a = document.createElement("a");
    let aText = document.createTextNode(time);

    a.classList.add('message-infos');
    divMessage.classList.add('message');
    divContainer.classList.add('message-container');

    if (type === 'sent') {
      divContainer.classList.add('right');
      a.classList.add('f-right');
      if (messages[messages.length - 1].classList.contains('sent') || messages[messages.length - 1].classList.contains('sent-continuous')) {
        divMessage.classList.add('sent-continuous');
        messages[messages.length - 1].parentNode.querySelector('a').remove();
      } else { divMessage.classList.add('sent'); }
    }
    else if (type === 'received') {
      divContainer.classList.add('left');
      a.classList.add('f-left');
      aText = document.createTextNode("Someone · " + time);
      if (messages[messages.length - 1].classList.contains('received') || messages[messages.length - 1].classList.contains('received-continuous')) {
        divMessage.classList.add('received-continuous');
        messages[messages.length - 1].parentNode.querySelector('a').remove();
      } else { divMessage.classList.add('received'); }
      if (theme === "light") { divMessage.classList.add('light-received') }
    }

    a.appendChild(aText);

    divMessage.appendChild(messageNode);
    divContainer.appendChild(divMessage);
    divContainer.appendChild(a);
    conversation.insertBefore(divContainer, messageInput);

    messageInput.value = '';
  }
}

const lightTheme = () => {
  theme = "light";
  document.querySelector('body').style.backgroundColor = "white";
  document.querySelector('.twitter-logo').classList.add('twitter-logo-light');
  document.querySelector('.title').style.color = "black";

  const receivedMessages = document.querySelectorAll('.received, .received-continuous');
  for (let i = 0; i < receivedMessages.length; i++) {
    receivedMessages[i].classList.add('light-received');
  }
  document.querySelector('.message-input').classList.add('message-input-light');
}

const darkTheme = () => {
  theme = "dark";
  document.querySelector('body').style.backgroundColor = "#15202B";
  document.querySelector('.twitter-logo').classList.remove('twitter-logo-light');
  document.querySelector('.title').style.color = "white";

  const receivedMessages = document.querySelectorAll('.received, .received-continuous');
  for (let i = 0; i < receivedMessages.length; i++) {
    receivedMessages[i].classList.remove('light-received');
  }
  document.querySelector('.message-input').classList.remove('message-input-light');
}
