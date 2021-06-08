
title:: Gets the current folder
author:: Akos Balasko

----
 
 ```dataviewjs
  
 console.log("this:", this);
 let currentFolder = this.currentFilePath.split('/');
 currentFolder.pop();
 currentFolder = currentFolder.join('/');
 
 console.log("currentfolder: "+ currentFolder)
 ```
 