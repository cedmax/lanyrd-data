# Lanyrd data

When [Lanyrd](http://lanyrd.com/) was acquired by Eventbrite at the end of 2013 they already peaked. I think it was around 2012, just a couple of years after their launch. 

When the acquisition happened, a lot of people hoped the parent company would have continued investing in the platform, which was a really good collector for tech conferences and such, but awfully this didn't quite happen. 

After 4 years the relevance of Lanyrd in the community is close to zero, and on top of it the site seems to be in permanent lockdown.

![Lanyard maintenance mode](maintainance.png?raw=true)

Before it's too late, I decided to collect at least the data relevant to the front end community (mainly focusing on conferences and speakers)

Next step are a little blurry (even tho I know I want to analyse this data), but they might involve a gender rapresentation analysis (some quick tests suggested me we are talking about 85% male speakers, if you are curious), geographical and temporal distribution etc.

## Method

1) Fetched the all the events with the topic `Javascript` from [Lanyrd.com](http://lanyrd.com/topics/javascript)

2) Fetched the data (list of speakers, date and location) of each event

3) Listing (and deduping) who presented in an event with more than 5 speakers (magic number to determine a conference and exclude meetups)

4) Wip
