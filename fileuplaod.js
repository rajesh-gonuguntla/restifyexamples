
var restify = require('restify');

var options = {uploadDir:'/home/rajesh/restifyuploads/',
keepExtensions:true, mapFiles:true,rejectUnknown:false,overrideParams:true};



function respond(req, res, next) {
 try{
  console.log(req.headers['content-type']);
  console.log('uploaded file name'+ JSON.stringify(req.files.file)); 
  console.log(JSON.stringify(req.params));
  res.send({status:req.files.file.name+ ' file uploaded successfully'});
  // Write async callback function to save file to aws S3 here
  // Inform client developers to use file as file upload variable name
  // uploadToS3(req.files.file);
  next();
  return;
 }catch(error){
   res.send(error);
   next();
   return;
 }
}

var server = restify.createServer({});
server.use(restify.bodyParser(options));

server.post('/upload', respond);
//server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
  //console.log(server);
});
