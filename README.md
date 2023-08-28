# welcome-world

This project was inspired by a story I heard from either a YouTuber or a content creator. They made a video where they set up a server and demonstrated how quickly they received requests attempting to find unprotected configuration files such as environment variable files and database login credentials.

This project is a simple Express server that logs these connections to identify the countries from which these requests originate.

The project runs on an EC2 instance and can be accessed at [http://wtth.charles-chrismann.fr/app](http://wtth.charles-chrismann.fr/app).

The following endpoints are accessible:

### GET wtth.charles-chrismann.fr/app

This provides a straightforward interface to quickly visualize the number of requests made by IPs from different countries.

### GET /country

Returns a list of all registered countries along with their regions, cities, and associated IPs.

### GET /ip

Returns a list of all data related to registered IPs (excluding the IP addresses themselves). This includes information about related organizations, coordinates, requests, and countries.

### GET /request

Returns a list of all requests, including details like the HTTP method, URL, and more.

/!\ NOTE: for some obvious reasons, the IP adress themselves are not displayed. /!\

## TODO list

- [ ] Image to display all country stats
- [ ] A world map to easily visalize countries
- [ ] A dashboard with all kind of stats