const { StreamChat } = require('stream-chat');

module.exports = async (req, res) => {
  // 设置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user_id } = req.body;
    
    if (!user_id) {
      return res.status(400).json({ error: 'Missing user_id' });
    }

    // Stream Chat 配置
    const apiKey = 'b2tgvdmsu8rm';
    const apiSecret = 'kavvdutsg95xtjc98222xuxs3eyefnrkktxjwmyxvedna6mp86y3endsba78qh4u';
    
    const serverClient = StreamChat.getInstance(apiKey, apiSecret);
    const token = serverClient.createToken(user_id);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 