class InitPopup
{
    constructor()
    {
        this.RssUrl = "https://medium.com/feed/the-story";
    }

    populatePopup()
    {
        fetch(this.RssUrl).then((res) => {
            res.text().then((plainxml) => {

                var domParser = new DOMParser();
                var xmlParsed = domParser.parseFromString(plainxml, 'text/xml');

                xmlParsed.querySelectorAll('item').forEach((item) => {

                    // Creating the render
                    var h1 = document.createElement('h1');
                    h1.textContent = item.querySelector('title').textContent;

                    var publicationDate = document.createElement('span');
                    publicationDate.textContent = item.querySelector('pubDate').textContent;

                    var link = document.createElement('a');
                    link.appendChild(h1);
                    link.appendChild(publicationDate);
                    link.onclick = function () {
                        chrome.tabs.create({ active: true, url: item.querySelector('link').textContent });
                    };

                    document.getElementById('render-div').appendChild(link);

                })
            })
        });
    }
}

// Au click sur la popup
chrome.browserAction.setBadgeText({ text: '' });
new InitPopup().populatePopup();
