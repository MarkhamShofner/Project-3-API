# heatmapr
#### @ga-dc WDI Project 3

Welcome to the **hottest new app** for checking out maps: **heatmapr**.

![heatmapr screenshot](http://i.imgur.com/YiGnp3n.png )

**Key Features:**
* **Loads OpenStreetMap data** using Leaflet.js and Mapbox
* **Automatically locates the user** and zeroes in on their location on app load
* **Automatically pulls data from the Yelp Search API** on every load, zoom, and scroll
* Narrows down data returned from Yelp with a **super simple searchbox**: type what you're looking for and start cruising around the map. **It Just Works®**, pulling (up to) the top 20 locations every time you move the map, ranked by distance from map center.
* **Shows the Yelp rating for each location as a colored circle** underneath each location marker. Bluer is higher, yellow is meh, red is bad. See at a glance which locations are worth checking out.
* **Shows a popup with expanded information about each location when you hover over the markers.** Each popup gives you the location's name, location type, address, and an image, as well as a link to Yelp to learn more.
* **Calculates the average distance between each shown location and map center** on every load, zoom, and scroll. Deciding between two apartment complexes? Want to see which of them is closer to the area's hottest bars? Oh yeah, we got you.

Coming Soon:
* We've got a **user login system** to make an account. Soon, you'll be able to select and save favorite locations.

Group(name, Github username):
* Josh Cohen, jacohen10
* Rebecca Estes, rebeccaestes
* Markham Shofner, markhamshofner
* Matt Popovich, mpopv

#### Explanations of the Technologies Used
Stack: [Express, MongoLab, CSS, HTML, Node]
Technologies: [Heroku, Github, Ajax, Yelp API, Leaflet API]

#### The Approach Taken
This was our first group project at GA, so a lot of our learning was done offline and outside of a terminal. Over the past week, we became better communicators with regards to team structure, work-streams, and project goals. Our first major chunk of time was spent discussing what we were actually going to build. Once we had an idea we determined a rough framework to achieve and MVP. Then we mapped that framework to a timeline, and began working towards it. As we progressed, our goals, action-items, and general understanding of what we were making iteratively changed as well. Eventually we hit an MVP where we were making AJAX calls to an external API (yelp business lat/longs/rankings), and paring that information with another API (leaflet mapping). Since then, the project has been about making the information shown more valuable, streamlining the user experience to be more intuitive, and adjusting the look to make the website more aesthetically appealing.

#### Installation Instructions

#### Unsolved Problems
With more time we would would users to favorite businesses or locations that appear after a query.
It would also be nice to add facebook and google login functionality.
