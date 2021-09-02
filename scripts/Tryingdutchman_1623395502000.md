---
title:
author: Tryingdutchman (https://forum.obsidian.md/u/Tryingdutchman)
Publication Date: Fri Jun 11 2021
Last modification Date: Fri Jun 11 2021
---


          <p>A quick question;</p>
<p>Does anyone else have problems with the sort when using [[yyyy-mm-dd]] as the date field?</p>
<p>I have a dataview table that sorts by date but it doesn&#x2019;t sort accordingly&#x2026;</p>
<pre><code>```dataview
table project, date, attachment
from &quot;&quot;
where type = &quot;meeting&quot;
sort datum desc
limit 50
```
</code></pre>
<p>Then the dates sorted looks like this (again yyyy-mm-dd):<br>
</p><div class="lightbox-wrapper"><a class="lightbox" href="https://forum.obsidian.md/uploads/default/original/2X/b/b1ceb9106dc880b0f9a40e418645f2fa55e055ac.png" data-download-href="https://forum.obsidian.md/uploads/default/b1ceb9106dc880b0f9a40e418645f2fa55e055ac" title="dataview"><img src="https://forum.obsidian.md/uploads/default/original/2X/b/b1ceb9106dc880b0f9a40e418645f2fa55e055ac.png" alt="dataview" data-base62-sha1="pmXpFCT1VBElnoiauAEnn2QMzP6" width="77" height="500" data-small-upload="https://forum.obsidian.md/uploads/default/optimized/2X/b/b1ceb9106dc880b0f9a40e418645f2fa55e055ac_2_10x10.png"><div class="meta">
<svg class="fa d-icon d-icon-far-image svg-icon" aria-hidden="true"><use href="#far-image"/></svg><span class="filename">dataview</span><span class="informations">106&#xD7;681 9.64 KB</span><svg class="fa d-icon d-icon-discourse-expand svg-icon" aria-hidden="true"><use href="#discourse-expand"/></svg>
</div></a></div><p></p>
<p>If I remove the brackets, removing the link to my daily template, then it sorts fine but dataview adds day to the date making 2021-06-09 look like &#x201C;wo 9 jun. 2021&#x201D;. I don&#x2019;t like that.</p>
<p>Does anyone else has this issue or perhaps even the solution?</p>
        