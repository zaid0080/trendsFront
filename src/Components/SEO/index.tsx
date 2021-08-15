import React from 'react'
import Helmet from 'react-helmet'

function Index({tag, place ,trendDetail}) {
    
    return (
        <Helmet>
              <meta
                name="description"
                content={`Find details about Current Top Twitter trending hashtags and Topics on Twitter in ${place}.`}
              />
              <meta
                name="title"
                content={`Current Twitter Trend and Hashtag Name is ${tag}`}
              />
             <meta name="twitter:site" content="@alldaytrends1" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://alldaytrends.com/" />
              <meta property="og:site_name" content="alldaytrends" />
              <meta
                property="og:title"
                content={`Current Twitter Hashtag Name is ${tag}`}
              />
              <meta
                property="og:description"
                content={`Find details about Top trending hashtags on Twitter in ${place}.`}
              />
              <meta property="og:image" content="%PUBLIC_URL%/logo.png" />

              <meta property="twitter:card" content="summary_large_image" />
              <meta
                property="twitter:url"
                content="https://alldaytrends.com/"
              />
              <meta
                property="twitter:title"
                content={`Twitter trends ${trendDetail.trendingLocations.length} locations`}
              />
              <meta
                property="twitter:description"
                content={`Twitter trends ${trendDetail.trendingLocations.map(t => t.name)}`}
              />
              <meta property="twitter:image" content="%PUBLIC_URL%/logo.png" />
            <title>{tag} 🕊️ {place} 🕊️ Twitter Trends</title>
          </Helmet>
    )
}

export default Index
