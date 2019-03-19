export default {
  apiUrl: "http://localhost:3000/api",
  methods: {
    search: "/search",
    getDetails: "/get-details",
    fetch: "/fetch"
  },
  oauth: {
    url: 'https://stackoverflow.com/oauth',
    redirectUri: 'http://localhost:3000/oauth/redirect',
    clientId: 14647
  }
};
