const { StreamChat } = require('stream-chat');

const apiKey = 'b2tgvdmsu8rm';
const apiSecret = 'kavvdutsg95xtjc98222xuxs3eyefnrkktxjwmyxvedna6mp86y3endsba78qh4u';
const serverClient = StreamChat.getInstance(apiKey, apiSecret);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { user_id } = req.body;
  if (!user_id) {
    res.status(400).json({ error: 'user_id required' });
    return;
  }
  const token = serverClient.createToken(user_id);
  res.status(200).json({ token });
};
