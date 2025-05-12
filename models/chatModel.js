const db = require('../config/db');

exports.saveMessage = (chatroom_id, sender_id, message, callback) => {
  const query = 'INSERT INTO Messages (chatroom_id, sender_id, message) VALUES (?, ?, ?)';
  db.query(query, [chatroom_id, sender_id, message], callback);
};

exports.getMessagesByRoom = (roomId, callback) => {
  const query = `
    SELECT Messages.message, Messages.created_at, Users.name AS sender_name 
    FROM Messages 
    JOIN Users ON Messages.sender_id = Users.id 
    WHERE Messages.chatroom_id = ?
    ORDER BY Messages.created_at ASC
  `;
  db.query(query, [roomId], callback);
};
