# b_capture
A website screenshot capture utility which can **capture screenshots** of the website in any give resolution eg (Desktop, Tab, iPhone, Ipad ..)
### What purpose does it solve?
- It takes screenshots of web pages.
- You can pass the URL of a number of web pages you want to capture.
- Any dynamic behavior like click on any icon or close any popup before taking a screenshot.
- Capture screenshots in any given resolution in one go.
### Installation

- Open command prompt as administrator 
- Clone the project
- After the project successfully cloned, go into the folder

    **Initial folder strucutre**
    ```
    Websites
        gitscreenshot.js
    b_capture.js
    package-lock.json
    package.json
    ```
- run npm install (It will install all required modules)

### Execution
- run command ``node b_capture gitscreenshot``
    -  This will capture a screenshot for the given URL in gitscreenshot.js file.
    - Create a folder ``git-image`` inside the ``Websites`` folder and place all the screenshots there.
    - It will take screenshots in **Desktop, iPad, iPhone, iPhone Plus, and iPhone x** view.   

**Below given folder structure, post executing the screen capture command**
```
    node_modules
    Websites >
            git-image >
                Decktop_hello-world.png
                Desktop-Home.png
                iPad_hello-world.png
                iPad_Home.png
                iPad_Pro_hello-world.png
                iPad_Pro_Home.png
                iPhone_Plus_hello-world.png
                iPhone_Plus_Home.png
                iPhoneX_hello-world.png
                iPhoneX_Home.png
            gitscreenshot.js
        b_capture.js
        package-lock.json
        package.json

```

#Project Set up to capture screenshot.     
- Create a copy of gitscreenshot.js file in the same place
- Rename it to your website which screen you want to capture, eg - **gitdocument.js**
- Open **gitdocument.js** file

**Code Explanation**
---
```
const pages= [
    'https://www.google.com/',
    'https://guides.github.com/activities/hello-world'
]
```

- Here you can add the lists of websites/URLs for which you want to take the screenshot.
- You can enter multiple websites by comma-separated.
---
```
const Imagepath={
    DirectoryName:'git-image'
}
```
- Directory name in which screenshot will be placed.
- You do not need to create a directory explicitly, it will be created automatically.
- If a directory already exists then the screenshot on the website will be replaced by the new screenshots.
---
```
const ViewPort={
    Devices:{
        Desktop:'1280X800',
        iPhone_Plus:'414X736',
        iPhoneX: '375X812',
        iPad: '768X1024',
        iPad_Pro : '1024X1366'
    }
}
```
- Here you mention the screenshot you want to capture for which device.
- If you want it for desktop only give it name Desktop and resolution and remove all others. 
***Example***.
```
const ViewPort={
    Devices:{
        Desktop:'1280X800'
    }
}
```
- If you want it for desktop and iPhone give it name and resolutions.
 ***Example***.
```
const ViewPort={
    Devices:{
        Desktop:'1280X800',
        iPhoneX: '375X812'
    }
}
```
**Note**: There is no limit, you can set any resolution for which you want to capture the screenshot.
***Example***
```
const ViewPort={
    Devices:{
        Custom:'1980X1200'
    }
}
```
---

```
const fullPageScreenshot={
    isFullPageShot:true
}

```
- true : It will capture a screenshot of your full website, header to footer.
- false : It will capture screenshots of the only visible area, which is visible on desktop or mobile.

---
```
const hideElement=[]
```
- If you want to hide any section of the website before taking a screenshot, you can add that element name/Id/class in the hedeElement array.
- Do not add # for id or . for CSS class just mention the name.
- Keep it blank if you do not need this.
***Example*** 
```
const hideElement=[P,cssclass,elementid]

here-
P - p is the paragraph element
cssclass - this is the css class name
elementId - this is the id of element
```
**Note** You can hide single or multiple elements as per your requirement

---

```
const firstClickOnEvent = []
```
- If you want to fire any click or change event before capturing a screenshot, pass the element/CSS class/id name here.
- It will fire the event and then capture the screenshot.
- Keep it blank if you do not need this.

***Example*** 
```
const firstClickOnEvent=[P,cssclass,elementid]

here-
P - p is the paragraph element
cssclass - this is the css class name
elementId - this is the id of element
```

**Note** You can fire events on single or multiple elements as per your requirement

---

***Execute***
- Go to the command prompt and hit the below command to take the screenshot 
**node b_capture gitdocument.js**
gitdocument.js is the name of the file that I have have created to expalin  the begining of code explanation.