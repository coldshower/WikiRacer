# WikiRacer
Shortest path algorithms using HTTP GET

### Goal: 
Given a starting page and destination page on wikipedia, find the shortest path through page links to get from one to the other.
### Example: 
**Start**: https://en.wikipedia.org/wiki/Keyboard_Cat

**End**: https://en.wikipedia.org/wiki/Windows_Phone

**Path**: /wiki/Keyboard_Cat /wiki/EBay /wiki/Windows_Phone

# Files
### app.js
A breadth-first approach to finding the shortest path from the start to destination.

### bi-bfs.js
A bi-directional breadth-first approach, with both the starting point and destination point crawling towards each other.

### no-lib.js
My own small implementation of a promisifed-request library that handles redirects, in case you were interested in knowing how that works.

### utils.js
Functions used for parsing HTML for hrefs, and filtering out valid wikipedia links.


