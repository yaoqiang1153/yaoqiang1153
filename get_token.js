const { StreamChat } = require('stream-chat');

const apiKey = 'b2tgvdmsu8rm';
const apiSecret = 'kavvdutsg95xtjc98222xuxs3eyefnrkktxjwmyxvedna6mp86y3endsba78qh4u';
const serverClient = StreamChat.getInstance(apiKey, apiSecret);

module.exports = async (req, res) => {
  // 设置 CORS 头，允许跨域请求
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  try {
    const { user_id } = req.body;
    
    if (!user_id) {
      res.status(400).json({ error: 'user_id required' });
      return;
    }
    
    // 添加日志
    console.log('Generating token for user:', user_id);
    
    const token = serverClient.createToken(user_id);
    
    // 添加日志
    console.log('Token generated successfully for user:', user_id);
    
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 