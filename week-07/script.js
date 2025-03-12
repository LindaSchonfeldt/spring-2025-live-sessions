const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_last_updated_at=true"

const NASA_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"

const fetchCoinGecko = () => {
  fetch(COINGECKO_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      const unixTimestamp = data.bitcoin.last_updated_at
      console.log(unixTimestamp)
      const date = new Date(unixTimestamp * 1000)
      console.log(`Bitcoin price last updated at: ${date.toLocaleString()}`)
    })
    .catch((error) => console.error("Error:", error.message))
}

fetchCoinGecko()

const fetchNASA = async () => {
  // Try block
  try {
    const response = await fetch(NASA_URL)

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`)
    }
    const data = await response.json()
    console.log(`NASA's picture of the day: ${data.url}`)
  } catch (error) {
    // Catch block that will catch the errors
    console.log("Error:", error.message)
  }
}

fetchNASA()
