const axios = require('axios');
const md5 = require('md5');
const { URL, URLSearchParams } = require('url');
var cacheClient;

function baseParam() {
  const params = {
    'apikey': process.env.MARVEL_PUBLIC_KEY,
    'ts': Date.now()
  }

  params['hash'] = md5(params['ts'] + process.env.MARVEL_PRIVATE_KEY + params['apikey'])

  return new URLSearchParams(params)
}

function cache(req, res, next) {
  const cacheKey = req.url;
  cacheClient.get(cacheKey, (error, cachedData) => {
    if (error) console.error(error);
    if (cachedData != null) {
      res.status(200).send(cachedData.split(',').map(Number));
    } else {
      next();
    }
  });
}

async function getCharacters(req, res, next) {
  try {
    let page = 0, repo = null, results = [];
    do {
      let params = baseParam();
      params.append('limit', 100);
      params.append('offset', page*100);
      const url = new URL(`/v1/public/characters?${params}`, process.env.MARVEL_BASE_URL);
      repo = await axios.get(url.toString());
      results = results.concat(repo.data.data.results);
      page++;
    }
    while (page * 100 < repo.data.data.total);

    results = results.map(ele => {
      return ele.id
    });
    cacheClient.setex(req.url, process.env.REDIS_TTL_MARVEL, results.join(','));

    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
};

async function getCharactersById(req, res, next) {
  try {
    const characterId = req.params.characterId;
    const url = new URL(`/v1/public/characters/${characterId}?${baseParam()}`, process.env.MARVEL_BASE_URL);
    repo = await axios.get(url.toString());
    const result = repo.data.data.results[0];
    res.status(200).send({
      'id': result.id,
      'name': result.name,
      'description': result.description
    });
  } catch(err) {
    next(err);
  }
};

function setCacheClient(inCacheClient) { 
  cacheClient = inCacheClient;
}

module.exports = {
  setCacheClient: setCacheClient,
  cache: cache,
  getCharacters: getCharacters,
  getCharactersById: getCharactersById
}