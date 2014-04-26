Workspace Cli
=============

> This is the support repository for **PoliteJS Workspace** project.  
> [Please visit the main project page](https://github.com/PoliteJS/workspace).

## Install Workspace CLI:

In order to use the utility command `wks` you need to install it in your system:

    sudo npm install -g workspace-cli
    
<small>(`sudo` should be avoided on Windows machines)</small>

> The only dependency is [NodeJS](http://nodejs.org) which need to be installed on your computer.
    
    
## Initialize a Workspace Project

    mkdir ~/my-project
    cd ~/my-project
    wks init

`wks init` initialize an empty folder as a new _Workspace_ project.

The app structure boilerplate is cloned from GitHub and all the NodeJS dependencies are solved thanks to `npm`.

> This task could take some time, it depends on you Internet connection quality!

## Start a Coding Session

    wks develop
    
> When I code you I to see only my IDE and the outcome on the browser!

This command sets up the debug server (which you can configure on your `Gruntfile.js`) and the live building process into one single terminal process.

Every time you modify a file from `src/*` the project is build again and you can see it on your browser.

> If you use [**LiveReload** extension for Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) you don't even need to reload the page!  

To exit the coding session just use `Ctrl + c`.

