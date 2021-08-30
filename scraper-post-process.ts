import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";

interface Post {
    creator?: {
        name: string,
        url: string,
    }
    datePublished?: Date,
    content?: string,
}

// The filename is the first invocation argument
const filename = Deno.args[0] // Same name as downloaded_filename
//const data = await readJSON(filename)
const html = await Deno.readTextFile("./dataview-plugin-snippet-showcase.html");
const $ = cheerio.load(html);

const posts = $('div[class="topic-body crawler-post"]');
var rawData: Array<Post> = []
await posts.each(function(index, data) {
    const post = cheerio.load(data);
    const creatorName = post('a[itemprop=url] > span[itemprop=name]');
    const creatorUrl = post('span[class=creator] > a[itemprop=url]');
    const publishedDate = post("span[class=crawler-post-infos] > time[itemprop=datePublished]");
    const publishDate = publishedDate.first().attr('datetime')?.toString();
    const content = post('div[class=post]')?.html() || '';
    rawData.push({
        creator: {
            url: creatorUrl.first().attr('href')?.toString() || '',
            name: creatorName.text(),
        },
        datePublished: publishDate ? new Date(publishDate): new Date(),
        content,
    })
    }
);
const dataviewCodes = rawData.filter(post => post.content?.includes('```dataview'));
for (const codePosts of dataviewCodes){
    const content = `---\ntitle:\nauthor:${codePosts?.creator?.name} (${codePosts?.creator?.url})\npublication date: ${codePosts.datePublished}\n---\n\n ${codePosts.content}`
    const fileName =`${codePosts.creator?.name || ''}_${codePosts.datePublished?.getTime()}.md` 
    await Deno.writeTextFile(`./scripts/${fileName}`, content);
}
