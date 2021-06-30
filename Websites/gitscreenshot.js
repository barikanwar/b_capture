'use strict'

const pages= [
    'https://www.google.com/',
    'https://guides.github.com/activities/hello-world'

]

// Give  directoryName as per your website. 
const Imagepath={
    DirectoryName:'git-image'
}

// In the following given device screenshot will  be captured.
const ViewPort={
    Devices:{
        Desktop:'1280X800',
        iPhone_Plus:'414X736',
        iPhoneX: '375X812',
        iPad: '768X1024',
        iPad_Pro : '1024X1366'
    }
}

//isFullPageShot : false - it will capture only visible area.
//isFullPageShot : true - it will capture whole page.
const fullPageScreenshot={
    isFullPageShot:true
}

//Hide Element.
//Selector, like class, Id ignore . or # 
// If you have to hide any part of the web page before taking screenshot
// pass the class or id or element name in the hideElement array  
//eg : const hideElement=['hide-element','hide-class','hide-id']
const hideElement=[]

//Selector, like class, Id ignore . or # 
// IF you have to fire any event before taking screencapture you can use below array.
//const firstClickOnEvent = ['paypls__icon']
const firstClickOnEvent = []

module.exports={
    pages,
    Imagepath,
    ViewPort ,
    fullPageScreenshot,
    hideElement,
    firstClickOnEvent  
}