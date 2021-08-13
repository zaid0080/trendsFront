import React from 'react'
import Helmet from 'react-helmet'

function Index({tag, country, city ,trendDetail, data}) {
    
    return (
        <Helmet>
          <title>
            {data ? `Twitter Trends ${" "}
            ${city === undefined ? country : city + ", " + country} 🕊️ Top
            Trending Hashtags 🕊️ Today ${" "}` : 
            `${tag} 🕊️ ${city === undefined ? country : city + ', ' + country} 🕊️ Twitter Trends`}
          </title>
              <meta
                name="description"
                // content={`Find details about Current Top Twitter trending hashtags and Topics on Twitter in ${country} ${city}.`}
                content = {data ? `Latest top twitter trends and hashtags in ${
                  city === undefined ? country : city + ", " + country
                }. 
                Currently twitter trends and hashtags today are ${data[0].trends.slice(0,6).map(d => d.name)}` : 
                `Find details about Current Top Twitter trending hashtags and Topics on Twitter in ${country} ${city}.`}
              />
              <meta
                name="title"
                content={data ? `Top Twitter trends in ${country} ${
                  city || ""
                }are  ${data[0].trends.slice(0,6).map(d => d.name)}`:`Current Twitter Trend and Hashtag Name is ${tag}`}
              />
             <meta name="twitter:site" content="@alldaytrends1" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://alldaytrends.com/" />
              <meta property="og:site_name" content="alldaytrends" />
              <meta
                property="og:title"
                content={data ? `Top Twitter trends in ${country} ${city || ""}are ${data[0].trends
                  .map((d) => d.name)
                  .toString()
                  .replace(",", "")}` :`Current Twitter Hashtag Name is ${tag}`}
              />
              <meta
                property="og:description"
                content={data ? `Latest top twitter trends and hashtags in ${
                  city === undefined ? country : city + ", " + country
                }. 
                Currently twitter trends and hashtags today are ${data[0].trends.slice(0,6).map(d => d.name)}`
                :`Find details about Top trending hashtags on Twitter in ${country} ${city}.`}
              />
              <meta property="og:image" content="%PUBLIC_URL%/logo.png" />

              <meta property="twitter:card" content="summary_large_image" />
              <meta
                property="twitter:url"
                content="https://alldaytrends.com/"
              />
              <meta
                property="twitter:title"
                content={data ? `Top Twitter trends in ${country} ${city || ""}are ${data[0].trends.slice(0, 10)
                  .map((d) => d.name)
                  .toString()
                  .replace(",", "")}`:`Twitter trends ${trendDetail.trendingLocations.length} locations`}
              />
              <meta
                property="twitter:description"
                content={data ? `Find more details about Top Twitter  trending hashtags in ${country} ${city}. 
                Find more information on ${data[0].trends.slice(0,10)
                  .map((d) => d.name)
                  .toString()
                  .replace(",", "")}`:`Twitter trends ${trendDetail.trendingLocations.map(t => t.name)}`}
              />
              <meta property="twitter:image" content="%PUBLIC_URL%/logo.png" />
          </Helmet>
    )
}

export default Index
