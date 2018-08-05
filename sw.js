//Service Worker File. To install the service worker for the first and save the files which we want to be cached.
self.addEventListener('install' , (event) => {
    event.waitUntil(
        caches.open('Restaurant_repo').then((cache) => {
            //adding all images and the html,css files , also added data file so that data can be fetched when the user is offline
            return cache.addAll([
                'index.html',
                'restaurant.html',
                '/css/styles.css',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
                '/data/restaurants.json'
            ]);
        }).catch((err) => {
            console.log(err);
        })
    );
});
// Before fetching the file from the internet, we are checking whether the file exists in the cache or not.
// If doesnt exists fetch it from the internet.
self.addEventListener('fetch', (event) =>{
    // For more on match you can refer https://developer.mozilla.org/en-US/docs/Web/API/Cache/match
    event.respondWith(caches.match(event.request).then((match_response) => {
        console.log(match_response)
        /* according to Mozilla developer docs match always resolves, if not match is found it will return undefined.
         so we are making sure that if the file does exists it return the file from the cache or else return from the internet using fetch api.        
        */
        if(match_response !== undefined){
            return match_response;
        }
        else{
            return fetch(event.request).then(fetch_response => {
                let clone_response = fetch_response.clone();
                caches.open('Restaurant_repo').then(cache => {
                    //You can read more about put here https://developer.mozilla.org/en-US/docs/Web/API/Cache/put
                    cache.put(event.request,clone_response);
                })
                return fetch_response;
            }).catch(err => {
                console.log(err);   
            })
        }
        // console.log(response)
    }))
})