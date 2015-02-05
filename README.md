Ajaxify
=========
Beginnings (or maybe all there will ever be) of a project to ajaxify the internet.
We're now used to websites updating when there's new content, rarely do we hit the reload button anymore when we look for new content.


So what to do for websites that don't update automatically? Ajaxify them!
The idea is to use a chrome extension to select an element that you want to be automatically updated, then voila, it will update every X seconds to ensure the most recent information.

> Note: I know that this isn't really the best name, because updates would be pushed to the client via websockets (as this project does) or long polling (lol), whereas ajax is (mostly) used to send or get specific data without reloading the page.


The server component consists of a phantomjs instance inside of node via phantom-node and will take a url and css-path as arguments, then returns the contents of that DOM element.
Either call this from a client every X seconds or finish the server so that it reloads the page and pushes updates out.
