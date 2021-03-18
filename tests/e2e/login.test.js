const puppeteer = require('puppeteer')
const config = require ('/Users/gkolh/Documents/GitHub/pod-stark-automation-functional/config/config')

describe('Login Suite', ()=>{
    let browser
    let page
    let testUrl
    
    before(async function(){
        browser = await puppeteer.launch({
            args:[
                   '--start-fullscreen'
                ],
            defaultViewport: null,
            headless: false,
        })
        testUrl = config.devUrl
        page = await browser.newPage()

        //***************** Change browser language *******************
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, "language", {
                get: function() {
                    return "en-GB"
                }
            })
            Object.defineProperty(navigator, "languages", {
                get: function() {
                    return ["en-GB", "en"]
                }
            })
        });     
        //************** Change browser language END *******************

    })

    after(async function(){

        console.log('Closing browser...')

        await page.close()
        await browser.close()
    })

    it('Login as Participant',async function(){

        await page.goto('https://' + testUrl + '.is-np.its-plus.com')
        await page.waitForSelector('.ping-body-container')
        await page.type('#username', config.adminUser) //{delay: 100}
        await page.type('#password', config.adminPass) //, {delay: 100}
        await page.waitFor(3000)
        await page.click('.ping-button')

        console.log('Redirecting....')

        *await page.waitForFunction(
          'document.querySelector("body").innerText.includes("STARK_A")'	  
        )

        //await page.waitFor(10000) 
        //await page.goto('https://' + testUrl + '.is-np.its-plus.com', {delay: 100})//, {waitUntil: 'domcontentloaded'})
        console.log('Redirecting to Grower....')
        await page.goto('https://' + testUrl + '.is-np.its-plus.com/grower/home')
        await page.waitForSelector('.grower-search-card', { visible: true, timeout: 0 })
        /*await page.type('#mat-input-0', 'FCORONEL', {delay: 100})
        /await page.waitForSelector('span[ng-reflect-content="fcoronel"]') //{ visible: true, timeout: 0 }
        await page.click('span[ng-reflect-content="fcoronel"]')

        await page.waitForSelector('#userInformationForm')

        await page.waitFor(5000)
        await page.screenshot({path: 'Participant_UserProfile.png'})

        await page.waitForSelector('#btn-logged-user')
        await page.click('#btn-logged-user')

        await page.waitForFunction(
          'document.querySelector("body").innerText.includes("Logout")'	  
        )

        await page.waitForSelector('#btn-logout')
        await page.click('#btn-logout')
        await page.waitFor(3000)
        await page.screenshot({path: 'LoginPage.png'})*/
    })

    it.only('Login as Admin',async function(){

        const userInput = "#username"
        const passwordInput = "#password"
        const loginButton = "#btn-login"
        const logoutButton = "#btn-logout"
        const userloged = "#btn-logged-user"
        const username ="STARK_S"
        const password = "Vct@34567"

        //await page.goto('https://' + testUrl + '.is-np.its-plus.com')
        await page.goto('https://pod-dev.is-np.its-plus.com/')
        await page.waitForSelector('#frmLogin')
         
         User = await page.$(userInput)
         Password = await page.$(passwordInput)
         Login = await page.$(loginButton)

         await User.click({ clickCount: 3 })
         await User.type(username) // add username

         await Password.click({ clickCount: 3})
         await Password.type(password) // add password

         await Login.click()
         await page.waitFor(3000)

         await page.waitForFunction(
            'document.querySelector("body").innerText.includes("STARK_S")'	  
          )
          await page.waitFor(3000) 
          
          LoggedUser = await page.$(userloged)
          await LoggedUser.click()

          await page.waitForFunction(
            'document.querySelector("body").innerText.includes("Logout")'	  
          )
          await page.waitForSelector('#cdk-overlay-0')

          await page.waitForSelector('#btn-logout')
          await page.click('#btn-logout')
          await page.waitFor(3000)
          await page.screenshot({path: 'LoginPage.png'})

          //linkLogout = await page.$(logoutButton)
          //await linkLogout.click()
          //await page.waitForSelector('#frmLogin')
    })

    it('Login with Invalid User',async function(){
        //TO DO
    })

    it('Login with Invalid Pass',async function(){
        //TO DO
    })

    it('Forgot Pass',async function(){
        //TO DO
    })
    
})