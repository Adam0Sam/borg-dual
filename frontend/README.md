## ToDo of the Frontend


> Page templates (High Priority)
- Create `publication` collection type and make dynamic [publications page](http://borg.licejus.lt/publications.html)
- Create gallery component
- Can you [insert table](http://borg.licejus.lt/community.html) in RichText?
- Create [task example components](http://borg.licejus.lt/examples.html)

> Website and code improvements (Medium priority)
- Create more optimal Navbar animations with `transform` instead of `top`
- Make a smoother transition from nav__burger to nav__close usign` ::before` and `::after` pseudoclasses
- Make the Navbar mobile friendly with valid pointer-events and click handling
- Create visual error handling for all components
- Create API tokens
- Create a better way for checking unique dynamic zones in `CustomPage.js` (maybe implement single types instead of collection types in strapi?)

> Future potential (Low priority)
- Implement professional, production ready React Hooks for Data Fetching (*something like SWR Vercel?*)
- Add option to pass custom blocks/modifiers to `CustomBlockRenderer.js`