/**
 * This script fetches and displays the edit count for a user on their contributions page.
 * 
 * Contributor: Sourav (Username: Sourav)
appropriate credit :
//github.com/Skhsouravhalder/Justapedia-MediaWiki-Gadget-Shortdesc-helper/tree/main
 */
(function() {
    // Function to fetch the number of articles created by the user
    function getArticlesCreated(username, callback) {
        // Use MediaWiki API to fetch the contributions
        var api = new mw.Api();
        api.get({
            action: 'query',
            list: 'usercontribs',
            ucuser: username,
            uclimit: 'max',
            ucnamespace: 0,
            ucprop: 'title|timestamp',
            format: 'json'
        }).done(function(data) {
            var createdArticles = 0;
            if (data.query && data.query.usercontribs) {
                createdArticles = data.query.usercontribs.length;
            }
            callback(createdArticles);
        });
    }

    // Function to add the article count to the user page
    function addArticleCountToUserPage(username) {
        getArticlesCreated(username, function(createdArticles) {
            // Find the user page header or title element to append the count
            var userPageHeader = document.getElementById('firstHeading');
            if (userPageHeader) {
                var countElement = document.createElement('span');
                countElement.id = 'articles-created-count';
                countElement.style.fontSize = 'small';
                countElement.style.marginLeft = '10px';
                countElement.textContent = ' (Articles created: ' + createdArticles + ')';
                userPageHeader.appendChild(countElement);
            }
        });
    }

    // Run the script only on user pages
    if (mw.config.get('wgNamespaceNumber') === 2) {
        var username = mw.config.get('wgTitle').split('/')[0]; // Get the username from the page title
        mw.loader.using(['mediawiki.api'], function() {
            addArticleCountToUserPage(username);
        });
    }
})();
