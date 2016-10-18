# WikiRacer
Shortest path algorithms using HTTP GET

### Goal: 
Given a starting page and destination page on wikipedia, find the shortest path through page links to get from one to the other.
### Example: 
**Start**: https://en.wikipedia.org/wiki/Keyboard_Cat

**End**: https://en.wikipedia.org/wiki/Windows_Phone

**Path**: /wiki/Keyboard_Cat /wiki/EBay /wiki/Windows_Phone

# How to Use
1. `node app.js` or `node bi-bfs.js` or etc...
2. You can change the start and endpoints easily within the files.

# Files
### app.js
A breadth-first approach to finding the shortest path from the start to destination. Uses a cache to prevent the checking of links that are already being checked. 

### bi-bfs.js
A bi-directional breadth-first approach, with both the starting point and destination point crawling towards each other.

**Note**: This is much faster than a simple breadth-first-search, but it is not directly applicable to wikipedia. This is because on wikipedia, the ability to go from '/wiki/England' to '/wiki/America' does not mean there is that shared ability to go from '/wiki/America' to '/wiki/England'. A bi-bfs approach only works on undirected graphs, where a path one way guarantees a path the other way. 

### no-lib.js
My own small implementation of a promisifed-request library that handles redirects, in case you were interested in knowing how that works. 

### utils.js
Functions used for parsing HTML for hrefs, and filtering out valid wikipedia links.
**Note**: Using your own regex to parse HTML is difficult to maintain. You would normally use a library to do this for you. Try [cheerio](https://github.com/cheeriojs/cheerio)!

# Still in the oven
### Dijkstra's Shortest Path
Dijkstra's Shortest Path is breadth-first-search, except that it also considers varying weights assigned to each node. BFS assumes each step is equivalent in labor, but this is not necessarily true, even for wikipedia. 

On wikipedia, even though it seems as if every link can be considered 'a step', and therefore can be weighted equivalently, this does not account for factors like the time to scroll to that part of the page. For example, if a certain href is near the top of the page, it should have a lower weight than an href near the bottom of the page. 

Thus, it is possible for Dijkstra's to return a path that requires more link traversals than BFS's path, yet take less actual work (depending on how you choose to assign weights to varying distances away from the top of the page).

### A* Shortest Path
A* is similar to Dijkstra's except that it has vision of approximately where the destination is from the beginning. This would be analogous to you trying to get to the Empire State Building from a random location in Manhattan. While you may not know the exact directions, you can look towards the sky to attain an approximate direction to walk towards. 

Applied to the Wikiracer, I would need to assign a heuristic to varying links, depending on closely related they seem to be to my destination. I would then target only the links with the highest score in terms of relation to the destination. 

For example, if I started at [Keyboard_Cat](https://en.wikipedia.org/wiki/Keyboard_Cat) and wanted to end up at [Windows Phone](https://en.wikipedia.org/wiki/Windows_Phone), I would rank all the hrefs on the Keyboard_Cat page a score based on how closely related they are to Windows Phones. Links like [Microsoft](https://en.wikipedia.org/wiki/Microsoft), [Bill](https://en.wikipedia.org/wiki/Bill), and [Azure](https://en.wikipedia.org/wiki/Keyboard_Cat/wiki/Azure), [Recycling](https://en.wikipedia.org/wiki/Recycling) would rank high, while links like [Dog](https://en.wikipedia.org/wiki/Keyboard_Cat) and [Pastry](https://en.wikipedia.org/wiki/Pastry) would rank low. The algorithm would then continue to follow a high ranking path until it ended up at the destination. 
