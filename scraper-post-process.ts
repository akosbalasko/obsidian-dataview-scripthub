import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";

interface Post {
    creator?: {
        name: string,
        url: string,
    }
    url: string;
    publicationDate?: Date,
    lastModificationDate?: Date,
    content?: string,
}

const FORUM_BASE_URL= 'https://forum.obsidian.md/t/dataview-plugin-snippet-showcase/13673/';
// The filename is the first invocation argument
const filename = Deno.args[0] // Same name as downloaded_filename
//const data = await readJSON(filename)
const maxLimit = Number(await Deno.readTextFile("./maxLimit.txt"));

// getting the last post id
const lastPostResponse = await fetch(`${FORUM_BASE_URL}${maxLimit}`, {redirect: 'follow'});
const lastPostHtml = await lastPostResponse.text();
const maxPostNumber = await getMaxPostNumber(lastPostHtml);

const lastPostId = Number(await Deno.readTextFile("./lastPostId.txt"));

for (let i=maxPostNumber; i>lastPostId; --i ) {
    const textResponse = await fetch(`${FORUM_BASE_URL}${i}`, {redirect: 'follow'});
    const textData = await textResponse.text();
    // await Deno.writeTextFile(`./raw_content_${i}.html`, textData);
    await processPost(textData, i);
}

await Deno.writeTextFile("./lastPostId.txt", maxPostNumber);

async function getMaxPostNumber(html: string): Promise<any>{
    const $ = cheerio.load(html);
    const posts = $('div[class="topic-body crawler-post"]');
    let maxPost = 0;
    await posts.each(function(index, data) {
        const post = cheerio.load(data);
        const postNumber = getPostNumber(post);
        maxPost = Math.max(maxPost, postNumber);
    });

    return maxPost
}

function getPostNumber(data: any): number {
   return  Number(data('span[itemprop=position]').text().replace('#',''));
}
async function processPost(html: string, postIndex: number){

    const $ = cheerio.load(html);
    const posts = $('div[class="topic-body crawler-post"]');
    var rawData: Array<Post> = []
    await posts.each(function(index, data) {
        const post = cheerio.load(data);
        const creatorName = post('a[itemprop=url] > span[itemprop=name]');
        const creatorUrl = post('span[class=creator] > a[itemprop=url]');
        const publicationDate = post('span[class=crawler-post-infos] > time');
        const publishDate = publicationDate.first().attr('datetime')?.toString();
        const lastModificationDateContainer = post('span[class=crawler-post-infos] > meta');
        const lastModDate = lastModificationDateContainer.first().attr('content')?.toString()
        const postId =getPostNumber(post);
        const content = post('div[class=post]')?.html() || '';
        rawData.push({
            creator: {
                url: creatorUrl.first().attr('href')?.toString() || '',
                name: creatorName.text(),
            },
            url: `${FORUM_BASE_URL}${postId}`,
            publicationDate: publishDate ? new Date(publishDate): undefined,
            lastModificationDate: lastModDate ? new Date(lastModDate): undefined,
            content,
        })
        }
    );
    const dataviewCodes = rawData.filter(post => post.content?.includes('```dataview'));
    for (const codePost of dataviewCodes){
        const content = generateContent(codePost);
        const fileName =`${codePost.creator?.name || ''}_${codePost.publicationDate?.getTime()}.md` 
        await Deno.writeTextFile(`./scripts/${fileName}`, content);
    }
}

function generateContent(codePost: Post): string {
    const name = generateName(codePost?.creator?.name, codePost?.creator?.url);

    return `---\ntitle:\n${generateMetaItem('author', name)}${generateMetaItem('Publication Date', codePost.publicationDate?.toDateString())}${generateMetaItem('Last modification Date', codePost.lastModificationDate?.toDateString())}---\n\n${codePost.content}`;
}
function generateName(name: string | undefined, url: string | undefined): string {
    return `${name} (${url})`;
}
function generateMetaItem(label: string, item: string | undefined): string {
    return item
        ? `${label}: ${item}\n`
        : '';
}