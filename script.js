const conversation = document.querySelector('.conversation');
const messageInput = document.querySelector('.message-input');

document.querySelector('.message-input').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      let message = messageInput.value;

      if (message.startsWith('/received ') || message.startsWith('/r ')) {
        message = message.replace('/received ', '');
        message = message.replace('/r ', '');
        sendMessage(message, 'received');
      }
      else {
        sendMessage(message, 'sent');
      }
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
    }

    a.appendChild(aText);

    divMessage.appendChild(messageNode);
    divContainer.appendChild(divMessage);
    divContainer.appendChild(a);
    conversation.insertBefore(divContainer, messageInput);

    messageInput.value = '';
  }
}
