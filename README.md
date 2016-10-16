# express_limitlessLED
expressとlimitlessLEDであれこれするやつ

* for dual white(warm/cool)
* order by internet browser via your home server(ex. intel edison, raspberry pi)
* you can set timed and interval

Usage:
  1. download this project
  2. change line 4 on route/index.js
  
    > var led = new limitlessLED(your_limitlessLED_bridge_ip, your_limitlessLED_bridge_port); 
  3. use command on project root folder
  
    > npm start
  
  or
  
    > npm install -g forever 
    
    > forever start ./bin/www


If you need to change, you see 4 files:
  - limitlessLED.js
  - route/index.js
  - view/index.jade
  - view/layout.jade
  


