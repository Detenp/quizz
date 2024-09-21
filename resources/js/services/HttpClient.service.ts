import 'whatwg-fetch'

export default class HttpClient {
    private static instance ?: HttpClient

    private clientId ?: string

    private baseUrl = 'http://localhost:8000/api/'

    protected constructor() {
        const clientId = sessionStorage.getItem('clientId')

        if (clientId) {
            this.clientId = clientId
        }
    }

    static HttpClient(): HttpClient {
        if (!this.instance) {
            this.instance = new HttpClient()
        }

        return this.instance
    }

    public setClientId(clientId: string) {
        sessionStorage.setItem('clientId', clientId)

        this.clientId = clientId
    }

    public get(route: string): Promise<any> {
        let headers = undefined

        if (this.clientId) {
            headers = {
                'X-ID': this.clientId
            }
        }

        return fetch(this.baseUrl + route, {
            method: 'get',
            headers: headers
        }).then((response: Response) => {
            return response.json()
        })
    }

    public post(route: string, body: any): Promise<any> {
        let headers = undefined

        if (this.clientId) {
            headers = {
                'X-ID': this.clientId
            }
        }

        return fetch(this.baseUrl + route, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(body)
        }).then((response: Response) => {
            return response.json()
        })
    }
}
