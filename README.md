# BBBWebsite

# Angular Folder Structure
I picked the setup based on an article that said using the typical MVC Model / View / Controller folder structure is not ideal 
for using with angular as angular can have multiple controllers and views per page making it harder to navigate as the site 
further develops and gets larger. So the following structure have been made

Each page on the iOS app is replicated into its own folder (single article, single contact, filtered news still pending). Then
within each of these folders add the views and controllers that will manage this portion of the site.

# Naming Conventions
* Views end with "View" and are predecessed all in lowercase
* Controllers end with "Controller" and are predecessed all in lowercase
* All routes are lowercase (though I don't think javascript is case sensitive

# Tips & Tricks & Notes
Don't forget navigation routing is all located within the `routes.js` file. If your route is not listed, your links will not work!

Note also links have to start with `'#'` otherwise they will trigger to outside of the project folder.
eg. <br>
````html
<a href="#/mycourses">Go To My Courses</a>
````

The name of the module this whole project so far is part of is called `'myApp'`. If you are comparing with medhat's github
examples this is the equivelent of the `"githubViewer"` module

If you want to add your own controller, you <b>must</b> make sure to add the js file to the controller list at the bottom
of the index.html file. Otherwise the controller will not be recognized
