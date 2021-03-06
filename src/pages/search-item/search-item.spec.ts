import {
    JsonpModule,
    Jsonp,
    BaseRequestOptions,
    Response,
    ResponseOptions,
    Http    
} from '@angular/http';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { SearchProvider } from '../../providers/search/search';

describe('Service: Search', () => {

    let service: SearchProvider;
    let backend: MockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [JsonpModule],
            providers: [
                SearchProvider,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Jsonp,
                    useFactory: (backend, options) => new Jsonp(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });

        //Get the MockBackend
        backend = TestBed.get(MockBackend);

        //Returns a service with the MockBackend so we can test with dummy responses
        service = TestBed.get(SearchProvider);

    });

    it('Search should return SearchItems', fakeAsync(() => {
        let response = {
            "resultCount": 1,
            "results": [
                {
                    "artistId": 78500,
                    "artistName": "U2",
                    "trackName": 'Beautiful Day',
                    "atworkUrl60": "image.jpg",
                }]
        };

        //When the request subscribes for resuls on a connection, return a fake response
        backend.connections.subscribe(connection => {
            connection.mockRespond(new Response(<ResponseOptions>{
                body: JSON.stringify(response)
            }));
        });

        //Perform a request and make sure we get the response we expect
        service.search("U2");
        tick();

        expect(service.results.length).toBe(1);
        expect(service.results[0].artist).toBe("U2");
        expect(service.results[0].name).toBe("Beautiful Day");
       // expect(service.results[0].thumbnail).toBe("image.jpg");
        expect(service.results[0].artistId).toBe(78500);
    }));
});
