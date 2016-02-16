To run chrome with cross origin disbaled, make sure all instances or chrome are closed and run following command

Win - "Program Files (x86)\Google\Chrome\Application\chrome.exe" –allow-file-access-from-files -disable-web-security
Mac - /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --allow-file-access-from-files --allow-file-access --user-data-dir=~/chrome-test/ spec/runner.html

Make search for 2+ chars. For e.g
Mobile - will present results
Mo - Won't provide any results
