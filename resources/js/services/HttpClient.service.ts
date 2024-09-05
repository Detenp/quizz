import 'whatwg-fetch'

export default class HttpClient {
    private static instance ?: HttpClient

    private baseUrl = 'http://localhost:8000/api/'

    protected constructor() {
    }

    static HttpClient(): HttpClient {
        if (!this.instance) {
            this.instance = new HttpClient()
        }

        return this.instance
    }

    public get(route: string): Promise<any> {
        return fetch(this.baseUrl + route, {
            method: 'get'
        }).then((response: Response) => {
            return response.json()
        })
    }

    public post(route: string, body: any): Promise<Response> {
        return fetch(this.baseUrl + route, {
            method: 'post',
            body: JSON.stringify(body)
        })
    }
}
