let messages = [];

export const list = (req, res)=>{
    const result = {
      'status': 'success',
      'data': {
        'messages': messages
      }
    }
    res.json(result);
};

export const get = (req, res)=>{
    res.send("GET message with id" + req.params.id);
};

export const create = (req, res)=>{
    let message = {
      'user': "goodbytes",
      'text': "Hello, world!"
    };
    messages.push(message);
    
    const result = {
      'status': 'success',
      'data': {
        'message': message
      }
    }
    res.json(result);
};