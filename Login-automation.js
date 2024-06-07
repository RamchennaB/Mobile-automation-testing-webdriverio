const { remote } = require('webdriverio');

describe('sample', () => {
    let driver;

    // Initialize Appium driver before each test
    beforeEach(async () => {
        driver = await remote({
            protocol:'http',
            hostname: '127.0.0.1',
            port: 4723,
            path: '/',
            capabilities: {
                platformName: 'Android',
                'appium:deviceName': '112243141G051943', 
                'appium:automationName': 'UiAutomator2',
                'appium:app': 'C:/Users/ramch/OneDrive/Desktop/webdriverio-appium/app/android/appdemo.apk', 
            }
        });
    });

    // Close Appium driver after each test
    afterEach(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });

    it('should login to the app', async () => {
        try {
            // Wait for and click the SKIP button
            const skipButton = await driver.$("//android.widget.TextView[@text='SKIP']");
            await skipButton.waitForExist({ timeout: 5000 });
            await skipButton.click();

            // Enter username and password
            await (await driver.$("//android.widget.EditText[@content-desc='loginEmail']")).setValue("sample@email.com");
            await (await driver.$("//android.widget.EditText[@content-desc='loginPassword']")).setValue("sample123");

            // Click the login button
            await (await driver.$("//android.widget.TextView[@text='Sign In']")).click();

            // Wait for the home page to be displayed
            await driver.waitUntil(async () => {
                return await (await driver.$("//android.widget.LinearLayout[@resource-id='com.vyaconsumer:id/action_bar_root']")).isDisplayed();
            }, {
                timeout: 5000,
                timeoutMsg: 'Expected home page to be displayed'
            });

        } catch (error) {
            console.error('Error during test execution:', error);
        }
    });
});

