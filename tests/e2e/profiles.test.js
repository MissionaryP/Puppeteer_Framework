const puppeteer = require('puppeteer')

describe('Profiles Suite', ()=>{
    let browser
    let page
    let metrics
    
    before(async function(){
        browser = await puppeteer.launch({
            args:[
                   '--start-fullscreen'
                ],
            defaultViewport: null,
            headless: true,
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

        console.log('Closing Browser...')

        await page.close()
        await browser.close()
    })

    it('Profile as Participant',async function(){
        //comment
        await page.goto('https://pod-inc-auth0.velocity-np.ag')
        await page.waitForSelector('#frmLogin')
        await page.type('#username', 'STARK_P') //{delay: 100}
        await page.type('#password', 'Monsanto1234$') //, {delay: 100}
        await page.waitFor(5000)
        await page.click('#btn-login')

        console.log('Redirecting...')

        await page.waitForFunction(
          'document.querySelector("body").innerText.includes("STARK_P")'	  
        )

        //await page.waitFor(10000)
        await page.goto('https://pod-inc-auth0.velocity-np.ag/user-profiles/list', {waitUntil: 'domcontentloaded'})
        await page.waitForSelector('#growerProfileReportForm')
        await page.screenshot({path: 'Profile.png'})
    })

    it('Profile as Admin',async function(){
        //TO DO
    })

    it('Create New Profile',async function(){
        //TO DO
    })

    it('Edit Profile',async function(){
        //TO DO
    })

    it('Delete Profile',async function(){
        //TO DO
    })
    
})