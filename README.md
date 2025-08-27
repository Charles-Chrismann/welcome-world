<h1 align="center">welcome-world</h1>

This project was inspired by a story I heard from either a YouTuber or a content creator. They made a video where they set up a server and demonstrated how quickly they received requests attempting to find unprotected configuration files such as environment variable files and database login credentials.

This project is a simple Express server that logs these connections to identify the countries from which these requests originate.

The following endpoints are accessible:

### GET /app

This provides a straightforward interface to quickly visualize the number of requests made by IPs from different countries.

### GET /country

Returns a list of all registered countries along with their regions, cities, and associated IPs.

### GET /ip

Returns a list of all data related to registered IPs (excluding the IP addresses themselves). This includes information about related organizations, coordinates, requests, and countries.

### GET /request

Returns a list of all requests, including details like the HTTP method, URL, and more.

> [!NOTE]
> For some obvious reasons, the IP adress themselves are not displayed.

### GET /img

Returns an image with the flag of all country requesters flag with the number of ip and requests.

## Development

```
docker run -p 3000:3000 --network transidb_ip -v `pwd`:/app/node/ -e NODE_ENV=dev wtth:1.0.5
```

## Deployment

NOTE: this section is for deployment on aws ec2 instance

Create Docker the docker image

```sh
docker build -t wtth:1.0.2 .
```

Start the database

```sh
docker-compose up ipdb
```

Reset database: change .env > DATABASE_URL @ipdb to @localhost

```sh
npx prisma migrate reset
```

change back .env > DATABASE_URL @localhost to @ipdb

Run the docker image on the same network as the database

```sh
docker run -p 3000:3000 --network welcome-world_ip -u root wtth:1.0.2
```

## TODO list

- [X] An image to display all country stats
- [ ] A world map to easily visalize countries
- [ ] A dashboard with all kind of stats

## License

This project is [MIT licensed](LICENSE).
