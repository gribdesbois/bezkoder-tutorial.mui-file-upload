# backend
terminal: npm i && node server.js

# todo
  * refresh token
  * do i really need multer on every route ?

  * file upload on frontend
  * absolute path in DB (img) is it really the most reusable way?

  * provide .env, fbServiceAccoundKey.json && specify where to paste them

# how to 
avoid duplicate likes entrie (ie same article)
==> unique! can we set a tuple of FK as as unique identifier?


# issues
get('/') : ==> getting status code way before resquest is finished
error when detroying a record not present in db