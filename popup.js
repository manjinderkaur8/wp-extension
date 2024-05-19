// popup.js

document.addEventListener('DOMContentLoaded', function () {
  // Function to handle received chat data from content script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'chatData') {
      displayContacts(message.data);
    }
  });

  // Function to display contacts in the popup
  function displayContacts(contacts) {
    const contactsContainer = document.querySelector('.contacts');
    contactsContainer.innerHTML = '';
    contacts.forEach(contact => {
      const contactDiv = document.createElement('div');
      contactDiv.classList.add('contact');
      contactDiv.innerHTML = `
        <strong>Name:</strong> ${contact.name}<br>
        <strong>Last Message:</strong> ${contact.lastMessage}<br>
        <strong>Unread Count:</strong> ${contact.unreadCount}<br>
      `;
      contactsContainer.appendChild(contactDiv);
    });
  }
});
