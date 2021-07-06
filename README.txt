Currently writing up a new script to look up some websites that I want to keep track of and alert me if there is
any news. I plan to turn it into an express app with a web view eventually. Will probably start with some basic
HTML and then scale up with React. Server will be using Express once I decide to start interacting with a web browser.

To install, clone this repository and install the latest version of NodeJS (I am using 10.16.3 currently).
Then do an npm install to get express set up. (Currently not using express).
Then create a folder in the root directory of the project called "EnvironmentFiles" to store local json.
Finally, run server.js with all flags set to save json for the script to check against for updates (you can run with -h or -help first to see the list of flags it looks for)

See ./source/Utils/WebCheck/WebCheck.js and ./source/Utils/Comparison/Comparison.js for more information on what this script does specifically.
To create more sites for the script to check, add more Actions (you'll have to see previous one's that I have made for examples as I have not OOP that part very much yet)


Specifically, this branch is to test integrating with Azure pipelines and Jie-rah
