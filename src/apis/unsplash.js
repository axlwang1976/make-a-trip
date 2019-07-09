import axios from 'axios';

export default axios.create({
  headers: {
    Authorization:
      'Client-ID 57d7a5e379f6d7434c80ff621c152094d1977ba1c4a4465c610bde8886db9404',
  },
  baseURL: 'https://api.unsplash.com',
});

// async componentDidMount() {
//   const response = await unsplash.get('/photos/random?orientation=squarish');
//   const { data } = response;
//   this.setState({ url: data.urls.small });
// }
