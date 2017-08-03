import 'whatwg-fetch'

const makeParams = (method, body) => {
  let params
  if(method == 'POST'){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    params = {
        method,
        mode: 'cors',
        headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
        cache: 'default'
    }
    if(body){
        params.body = body
    }
  }else if(method == 'GET'){
    params = {
        method,
    }
  }
  return params
}

const attemptFetch = async (route, params, queryParam) => {
    let url = ''
    let count = 0
    for(var key in queryParam){
        if(count == 0){
            url = url + `?${key}=${queryParam[key]}` 
        }else{
            url = url + `&${key}=${queryParam[key]}` 
        }
        count++;
    }
    route = route+url
  try {
    //console.log(`${route}/${queryParam}`)
    let response = await fetch(`${route}`, params)
    let body = await response.json()
    return body
  } catch (error) {
    console.error('error fetching: ', error)
  }
}
// ********** FETCH POST ************

const fetchPost = (route, parameters) => {
  const params = makeParams('POST', parameters)
  return attemptFetch(route, params)
}

// ********** FETCH GET ************

const fetchGet = (route, parameters) => {
  const params = makeParams('GET')
  return attemptFetch(route, params, parameters)
}

// ********** FETCH PUT ************

const fetchPut = (route, parameters) => {
  const params = makeParams('PUT', parameters)
  return attemptFetch(route, params)
}

// ********** FETCH DELETE ************

const fetchDelete = (route, parameters) => {
  const params = makeParams('DELETE', parameters)
  return attemptFetch(route, params)
}

export const Fetcher = {
  get: fetchGet,
  post: fetchPost,
  put: fetchPut,
  delete: fetchDelete
}