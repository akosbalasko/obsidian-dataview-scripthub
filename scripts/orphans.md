
title:: Lists all orphans in the vault
author:: Akos Balasko

----
 
 ```dataviewjs
 const orphanFiles = dv.pages().array().filter(note => (note.file.outlinks.length === 0 && note.file.inlinks.length === 0));
 dv.list(dv.array(orphanFiles).file.link)
 ```
 