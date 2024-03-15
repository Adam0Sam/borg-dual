<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">Bebras Organization Webpage and CMS</h3>

  <p align="center">
    <br />
    <a href="https://bebras.org">View Site</a>
    ·
    <a href="https://bebras.org/admin">View Admin Panel</a>
    <!-- <a href="https://github.com/81GB3N/simtadienis/issues">Report Bug</a>
    ·
    <a href="https://github.com/81GB3N/simtadienis/issues">Request Feature</a> -->
  </p>
</div>

### Built With

- [![React][React.js]][React-url]
- [![Express][Strapi]][Strapi-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

The dependencies of this project are managed with npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:Adam0Sam/borg-dual.git && cd /borg-dual
   ```
2. Install all the project dependencies
   ```sh
   npm i && npm run install-packages
   ```
3. Setup your `/backend/.env` file
   ```sh
   cd /backend && touch .env
   ```
   ```sh
   # /borg-dual/backend/.env
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS="toBeModified1,toBeModified2"
   API_TOKEN_SALT=tobemodified
   ADMIN_JWT_SECRET=tobemodified
   TRANSFER_TOKEN_SALT=tobemodified
   JWT_SECRET=tobemodified
   ```
4. Run the app
   ```sh
   cd .. && npm start
   ```

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

<table al>
    <tr>
      <th>
        <img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white">
      </th>
      <th>
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
      </th>
    </tr>
    <tr>
     <td>
        <a href="https://www.facebook.com/profile.php?id=100015847005996" target="_blank">Adam Samulionis</a>
        <br>
        <a href="https://www.facebook.com/jonas.balukonis" target="_blank">Jonas Balukonis</a>
     </td>
     <td>
                 <a href="https://www.linkedin.com/in/adam-samulionis-90683a2b8/" target="_blank">Adam Samulionis</a>
            <br>
            <a href="https://www.linkedin.com/in/jonas-balukonis-0045832ab/" target="_blank">Jonas Balukonis</a></td>
    </tr>

</table>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Strapi]: https://img.shields.io/badge/strapi-%232E7EEA.svg?style=for-the-badge&logo=strapi&logoColor=white
[Strapi-url]: https://strapi.io/
[Facebook]: https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white
[LinkedIn]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
