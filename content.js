// content.js

// Function to fetch chat data from WhatsApp Web
function getChatData() {
  const chatData = [];
  const chatElements = document.querySelectorAll('.All'); // Adjust the selector based on WhatsApp Web's structure

  chatElements.forEach(chatElement => {
    const chatName = chatElement.querySelector('.chat-title').innerText; // Update selector based on WhatsApp Web's structure
    const lastMessage = chatElement.querySelector('.last-message .selectable-text').innerText; // Update selector based on WhatsApp Web's structure
    const unreadCount = chatElement.querySelector('.unread-count').innerText;

    if (chatName) {
      chatData.push({
        name: chatName,
        lastMessage: lastMessage || 'No message',
        unreadCount: unreadCount || '0'
      });
    }
  });

  return chatData;
}

// Function to send chat data to the extension popup
function sendChatDataToExtension() {
  const chatData = getChatData();
  chrome.runtime.sendMessage({ action: 'chatData', data: chatData });
}

// Event listener to trigger data retrieval on page load and every 5 seconds
window.addEventListener('load', () => {
  sendChatDataToExtension();
  setInterval(sendChatDataToExtension, 5000); // Update every 5 seconds
});
