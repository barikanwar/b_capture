const puppeteer = require('puppeteer');
var filessystem = require('fs');

//const webPage =require('./Websites/ClinicalTrial.js');
const captureFile = process.argv.slice(2)
const webPage =require(`./Websites/${captureFile[0]}`);

console.log(captureFile[0])

// use it to work get data from different page https://github.com/puppeteer/puppeteer/issues/3800

const PageEvalutaion = async (page)=>{
await page.evaluate(({elementToHide,isFullPageCapture,clickOnElemnt}) => {
        const beforeheight=document.body.scrollHeight;

        elementToHide.forEach((hideelement)=>{
               // Select all element and find the specific element and hide.
               document.querySelectorAll('*').forEach((el)=>{
               if(el.className === hideelement || el.id === hideelement)
               {
                   el.style.display='none'
               }
           })
       })

   

        clickOnElemnt.forEach((elementOnTriggerClick)=>{
    //     //Click on  selected element before screen  capture.
         document.querySelectorAll('*').forEach((newel)=>{
             if(newel.className === elementOnTriggerClick || newel.id === elementOnTriggerClick)
             {
                 console.log('element found',newel)
                 newel.click()
                 console.log('Clicked !!')
             }
             })
         })

        

       },({
           elementToHide:webPage.hideElement,
           isFullPageCapture:webPage.fullPageScreenshot.isFullPageShot,
           clickOnElemnt: webPage.firstClickOnEvent
        }))

//       const previousHeight = await page.evaluate('document.body.scrollHeight');
   //     console.log('Page evaluation :' +height)
  //      console.log('New Height page valueation :' +previousHeight)
        
}



//============================================================================
// THIS FUNCTION IS RESPONSIBLE FOR CAPTURING SCREENSHOT.
//============================================================================

 const takeShot  = async (url,browser,filename,directory)=>{
    const page = await browser.newPage();

//    await page.authenticate({'username':'otsuka', 'password': 'Site123!'});

    console.log('Opening Website...');
    console.log(url);
    await page.goto(url, {waitUntil: 'networkidle2'});
    
    page.waitFor(3000);
    console.log('Website Open.');
    
    let  isFullPage = webPage.fullPageScreenshot.isFullPageShot;
        
     for(const vport in webPage.ViewPort.Devices)
     {
        const imageNameAndPath=directory+'/'+vport+'_'+filename;
   

        const dimension = webPage.ViewPort.Devices[vport].split('X');
        if(dimension.length!=2){
             return;
        }
        const DeviceViewPort={
            width:Number(dimension[0]),
            height:Number(dimension[1])
        }
        
        await page.setViewport(DeviceViewPort);
        await PageEvalutaion(page)
        await page._client.send('Emulation.clearDeviceMetricsOverride');

        //Required -  Setting viewport again which calculate the height of viewport if increased dynamically
        await page.setViewport(DeviceViewPort);

        if(webPage.fullPageScreenshot.isFullPageShot)
        {
        await page.evaluate(()=>{
            window.scrollBy(0, document.body.scrollHeight);   
        })
    }

      console.log('Capturing Screenshot for',vport);
      await page.screenshot({
          path:imageNameAndPath,fullPage:isFullPage
      });
      console.log('Captured Screenshot for',vport);
    }
    
 //   await page.close();
}

// =====================================================================================
// HELPING FUNCTIONS START
// =====================================================================================
// Create Directory
const CreateDir = (dir) => {
   // var dir = `./Websites/${directoryName}`;
     
     if (!filessystem.existsSync(dir)){
         filessystem.mkdirSync(dir);
         console.log('Directory created');
         console.log(dir);
         console.log('--------------------------------------------');
     }else
     {
         console.log("Directory already exist, If file exist will be overwritten");
         console.log('--------------------------------------------');
     }
}

// Create filename from the url
const getFileNameFromUrl=(page)=>{
    let filename=page.substr(page.trim().lastIndexOf('/')+1,page.length).length==0?'Home.png':page.substr(page.lastIndexOf('/')+1,page.length)+'.png';
    return filename;
}


// =====================================================================================
// HELPING FUNCTIONS END
// =====================================================================================


// =====================================================================================
// Main Function Start
// =====================================================================================


(async () => {

    // List of urls for  which screenshot capture needed 
    const pages=webPage.pages;
  
    // Directory where the  image will be stored.
    let dirName=webPage.Imagepath.DirectoryName;

    if(dirName.length<=0)
     {
            // If directory name does not exist , return
         console.log('DirectoryName is empty, please provide directory name');
         return ;
     }  
     
    dirName = `./Websites/${dirName}`;
    await CreateDir(dirName);

    const browser = await puppeteer.launch({ headless: true,devtools:false });

    
    for(arrIndex in webPage.pages)
    {
        // Extracting filename from URL. em abc.com/hello (hello.png will be  the filename)
        let filename = getFileNameFromUrl(pages[arrIndex]);
        console.log('================================================');   
        console.log(`Capturing  Inprogress for url....${pages[arrIndex]}`);
           await takeShot(pages[arrIndex],browser,filename,dirName);
        console.log(`Capturing  Completed for url ....${pages[arrIndex]}`);
   }
    
    await browser.close();

})();


// =====================================================================================
// Main Function End
// =====================================================================================

/*
Reference urls.
https://github.com/puppeteer/puppeteer/blob/v2.1.1/docs/api.md#pagewaitforselectorselector-options
https://github.com/checkly/puppeteer-examples
https://devdocs.io/puppeteer/
;

commands example. breatthtek.js is the name of the file which has list of url which need to capture
node puppycap breatthtek.js


>*/

