
title:: Generates a table on the files of the current folder, notes sorted by last modification date
author:: Akos Balasko

----


```dataview
TABLE file.mtime as "Last modified at"
WHERE file.folder = this.file.folder
SORT file.mtime DESC
 ```
 
