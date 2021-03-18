const puppeteer = require('puppeteer')

describe('Users Suite', ()=>{
    let browser
    let page
    
    before(async function(){
        browser = await puppeteer.launch({
            args:[
                   '--start-fullscreen'
                ],
            defaultViewport: null,
            headless: false,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)

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

        console.log('entre al cierre')

        await page.close()
        await browser.close()
    })

    it('Users as Participant',async function(){
        //comment
        await page.goto('https://pod-inc-auth0.velocity-np.ag')
        await page.waitForSelector('#frmLogin')
        await page.type('#username', 'STARK_P') //{delay: 100}
        await page.type('#password', 'Monsanto1234$') //, {delay: 100}
        await page.waitFor(5000)
        await page.click('#btn-login')

        console.log('Redirecting....')

        await page.waitForFunction(
          'document.querySelector("body").innerText.includes("STARK_P")'	  
        )

        //await page.waitFor(10000)
        await page.goto('https://pod-inc-auth0.velocity-np.ag/user-management/home', {waitUntil: 'domcontentloaded'})
        await page.waitForSelector('#mat-input-0')
        await page.type('#mat-input-0', 'FCORONEL', {delay: 100})
        await page.waitForSelector('span[ng-reflect-content="fcoronel"]') //{ visible: true, timeout: 0 }
        await page.click('span[ng-reflect-content="fcoronel"]')
        await page.screenshot({path: 'Participant_UserProfile.png'})
    })

    it.skip('Users as Admin',async function(){
        //TO DO

        const userlInput = "#username"
        const passwordInput = "#password"
        const loginButton = "#btn-login"
        const username ="AQUAG"
        const password = "Monsanto1234$"

        await page.goto('https://pod-inc-auth0.velocity-np.ag')
        await page.waitForSelector('#frmLogin')
         
         linkUser = await page.$(userlInput)
         linkPassword = await page.$(passwordInput)
         linkLogin = await page.$(loginButton)

         await linkUser.click({ clickCount: 3 })
         await linkUser.type(username) // add username

         await linkPassword.click({ clickCount: 3})
         await linkPassword.type(password) // add password

         await linkLogin.click()
         await page.waitFor(3000)

         await page.waitForFunction(
            'document.querySelector("body").innerText.includes("AQUAG")'	  
          )     
    })

    it('Create New User',async function(){
        //TO DO
    })

    it('Edit User',async function(){
        //TO DO
    })

    it('Search user',async function(){
        //TO DO
    })
    
})