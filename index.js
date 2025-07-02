   const express = require('express');
   const bodyParser = require('body-parser');
   const { StreamChat } = require('stream-chat');

   const app = express();
   app.use(bodyParser.json());

   const apiKey = 'b2tgvdmsu8rm';
   const apiSecret = 'kavvdutsg95xtjc98222xuxs3eyefnrkktxjwmyxvedna6mp86y3endsba78qh4u';
   const serverClient = StreamChat.getInstance(apiKey, apiSecret);

   app.post('/get_token', (req, res) => {
       const { user_id } = req.body;
       if (!user_id) return res.status(400).json({ error: 'user_id required' });
       const token = serverClient.createToken(user_id);
       res.json({ token });
   });

   app.listen(3000, () => {
       console.log('Token server running on http://localhost:3000');
   });
