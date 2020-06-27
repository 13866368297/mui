const path = require('path')
let relativePath = path.relative("/es","/src/components/button")
console.log(relativePath);
let absolutePath = path.join("/es",relativePath)
console.log(absolutePath);

