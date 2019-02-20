class InitPopup
{
    constructor()
    {
        this.CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
        this.RssUrl = this.CORS_PROXY + "https://medium.com/feed/the-story";
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
                    link.href = item.querySelector('link').textContent;
                    link.appendChild(h1);
                    link.appendChild(publicationDate);

                    document.getElementById('render-div').appendChild(link);

                })
            })
        });
    }
}

// Au click sur la popup
chrome.browserAction.setBadgeText({ text: '' });
new InitPopup().populatePopup();

