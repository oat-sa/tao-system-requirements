# TAO System requirements

## Homepage

**GH Page yet to be created!**

https://oat-sa.github.io/tao-system-requirements

### API 
A simple REST API is available.

- Latest version, combined: [/build/api/system-requirements-latest.json](https://oat-sa.github.io/tao-system-requirements/build/api/system-requirements-latest.json)
- Latest version, browsers only: [/build/api/browsers-latest.json](https://oat-sa.github.io/tao-system-requirements/build/api/browsers-latest.json)  
- Latest version, server side only: [/build/api/server-latest.json](https://oat-sa.github.io/tao-system-requirements/build/api/server-latest.json)  
- Latest version, viewports and devices only: [/build/api/viewportDevices-latest.json](https://oat-sa.github.io/tao-system-requirements/build/api/viewportDevices-latest.json)

You can also retrieve data for a particular release by replacing `-latest.json` with `-{release}.json`, data is kept for the two past releases. 

### Assets 
Download the [TAO Standard Viewport and Device Test](assets/test/tao-vd-test.zip).

Download the [PCI](assets/pci/taoenvinfo.zip) to create your own test. If you want to implement a similar system you are probably mostly interested in [/data-provider/viewport-devices.js](data-provider/viewport-devices.js).

If you want to use the styles from the website, the stylesheet including all icons is available at [/build/css/main.css](build/css/main.css). You can also use `/src/scss` as a base for your own flavor.

---

### Updating the repository
The repository needs to be updated with every TAO Community Release.

Update your local copy of the repository:

```bash 
git pull origin develop
```

If you have no local copy yet, clone the repository first:

```bash
git clone https://github.com/oat-sa/tao-system-requirements.git
git checkout develop
```

#### Updating the browser database and the versions of TAO, Server, Database or Docker

```bash
npm run update
```
Edit `/data/server.json` manually in case to add or remove a component. 

#### Updating viewports and devices

**Danger Zone: The test below is still incomplete, the PCI which is the cruical part is still missing. See /src/pci/developer-readme.md for more info!**

1. Download the [TAO Standard Viewport and Device Test](assets/test/tao-vd-test.zip). 
2. Run the test on at least one mobile device, ideally on a ~7″ screen in landscape mode.
3. In your TAO instance download the results from the tests and copy them to `/data/viewport-devices`. Older data will be deleted automatically during the build process. ![Download](assets/media/download.png)

#### Commit your changes
If you perform only some of the above tasks it is important to commit and push your changes to the repository.
```bash
git add -A
git commit -m "version updated to 1.2.3" # or "test results for 1.2.3"
git push origin develop
``` 

#### Rebuild the website and the APIs
Once everything is up-to-date you need to rebuild the website and the APIs and update the repository. If you aren't sure if all data are at the right version, don't worry - the build will then halt and show a comprehensive status report.

```bash
npm run build
git add -A
git commit -m "rebuilt API for 1.2.3"
git push origin develop
```

Finally create a pull request to `main` and merge your changes.
