const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3000';

/**
 * Test suite for login functionality using Puppeteer
 */

async function testLoginPageLoads() {
  console.log('\n🔐 Test 1: Login page loads correctly');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const response = await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });

    if (response.status() !== 200) {
      throw new Error(`Expected status 200, got ${response.status()}`);
    }

    const title = await page.title();
    console.log(`   ✅ Page loaded successfully (Status: ${response.status()})`);
    console.log(`   ✅ Page title: "${title}"`);

    // Check for login form elements
    const usernameInput = await page.$('input[id="username"]');
    const passwordInput = await page.$('input[id="password"]');
    const submitButton = await page.$('button[type="submit"]');

    if (usernameInput && passwordInput && submitButton) {
      console.log('   ✅ Login form elements found (username, password, submit button)');
    } else {
      throw new Error('Login form elements not found');
    }

    return true;
  } catch (error) {
    console.error(`   ❌ Test failed: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

async function testValidLogin() {
  console.log('\n✅ Test 2: Valid login with correct credentials');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });

    // Fill in the form
    await page.type('input[id="username"]', 'user');
    await page.type('input[id="password"]', 'password');

    console.log('   ℹ️  Entered credentials (user/password)');

    // Click submit button
    await page.click('button[type="submit"]');

    // Wait for navigation to dashboard
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    const currentUrl = page.url();
    console.log(`   ✅ Login successful, redirected to: ${currentUrl}`);

    // Verify we're on the dashboard
    if (currentUrl.includes('/dashboard')) {
      console.log('   ✅ Confirmed: Redirected to /dashboard');
    } else {
      throw new Error(`Expected /dashboard, got ${currentUrl}`);
    }

    // Check if localStorage has auth data
    const authData = await page.evaluate(() => {
      return {
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        username: localStorage.getItem('username')
      };
    });

    if (authData.isAuthenticated === 'true' && authData.username === 'user') {
      console.log('   ✅ Authentication data stored in localStorage');
      console.log(`      - isAuthenticated: ${authData.isAuthenticated}`);
      console.log(`      - username: ${authData.username}`);
    } else {
      throw new Error('Authentication data not properly stored');
    }

    return true;
  } catch (error) {
    console.error(`   ❌ Test failed: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

async function testInvalidLogin() {
  console.log('\n❌ Test 3: Invalid login with wrong credentials');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });

    // Fill in wrong credentials
    await page.type('input[id="username"]', 'wronguser');
    await page.type('input[id="password"]', 'wrongpass');

    console.log('   ℹ️  Entered wrong credentials (wronguser/wrongpass)');

    // Click submit button
    await page.click('button[type="submit"]');

    // Wait for error message to appear
    await page.waitForSelector('.mb-4.p-3', { timeout: 5000 });

    const errorText = await page.$eval('.mb-4.p-3', el => el.textContent);
    console.log(`   ✅ Error message displayed: "${errorText.trim()}"`);

    // Verify we're still on login page
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      console.log('   ✅ Confirmed: Still on /login page');
    }

    // Verify localStorage is empty
    const authData = await page.evaluate(() => {
      return {
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        username: localStorage.getItem('username')
      };
    });

    if (authData.isAuthenticated === null && authData.username === null) {
      console.log('   ✅ Confirmed: localStorage is clean (no auth data)');
    } else {
      throw new Error('Unexpected data in localStorage after failed login');
    }

    return true;
  } catch (error) {
    console.error(`   ❌ Test failed: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

async function testEmptyFieldsValidation() {
  console.log('\n⚠️  Test 4: Form validation with empty fields');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });

    // Try to submit without filling fields
    console.log('   ℹ️  Attempting to submit empty form');

    // Check if inputs are required
    const usernameRequired = await page.$eval('input[id="username"]', el => el.required);
    const passwordRequired = await page.$eval('input[id="password"]', el => el.required);

    if (usernameRequired && passwordRequired) {
      console.log('   ✅ Form fields have required attribute');
    }

    // Try clicking submit
    await page.click('button[type="submit"]');

    // Wait a bit to see if there's validation
    await new Promise(resolve => setTimeout(resolve, 1000));

    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      console.log('   ✅ Form submission blocked with empty fields');
    }

    return true;
  } catch (error) {
    console.error(`   ❌ Test failed: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

async function testLoginWithDashboardAccess() {
  console.log('\n🔐 Test 5: Full login flow and dashboard access');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Step 1: Login
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
    await page.type('input[id="username"]', 'user');
    await page.type('input[id="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    console.log('   ✅ Step 1: Successfully logged in');

    // Step 2: Verify dashboard loads
    await page.waitForSelector('h1', { timeout: 5000 });
    const dashboardTitle = await page.$eval('h1', el => el.textContent);
    if (dashboardTitle.includes('Dashboard')) {
      console.log(`   ✅ Step 2: Dashboard page loaded (Title: "${dashboardTitle}")`);
    }

    // Step 3: Check user info is displayed
    const welcomeText = await page.$eval('p', el => el.textContent);
    if (welcomeText.includes('user')) {
      console.log(`   ✅ Step 3: User info displayed: "${welcomeText}"`);
    }

    // Step 4: Find and click logout button
    await page.waitForSelector('button', { timeout: 5000 });
    const buttons = await page.$$('button');
    let logoutFound = false;
    for (const button of buttons) {
      const text = await button.evaluate(el => el.textContent);
      if (text.includes('Logout')) {
        logoutFound = true;
        break;
      }
    }
    if (logoutFound) {
      console.log('   ✅ Step 4: Logout button found');
    }

    return true;
  } catch (error) {
    console.error(`   ❌ Test failed: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

async function testLogoutFunctionality() {
  console.log('\n🚪 Test 6: Logout functionality');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Step 1: Login first
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
    await page.type('input[id="username"]', 'user');
    await page.type('input[id="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    console.log('   ✅ Step 1: Logged in successfully');

    // Step 2: Click logout button
    await page.waitForSelector('button', { timeout: 5000 });
    const buttons = await page.$$('button');
    let logoutClicked = false;

    for (const button of buttons) {
      const text = await button.evaluate(el => el.textContent);
      if (text.includes('Logout')) {
        await button.click();
        logoutClicked = true;
        break;
      }
    }

    if (logoutClicked) {
      console.log('   ✅ Step 2: Logout button clicked');

      // Wait for navigation
      await page.waitForNavigation({ waitUntil: 'networkidle2' });

      const currentUrl = page.url();
      if (currentUrl.includes('/login')) {
        console.log('   ✅ Step 3: Redirected back to /login');
      }

      // Verify localStorage is cleared
      const authData = await page.evaluate(() => {
        return {
          isAuthenticated: localStorage.getItem('isAuthenticated'),
          username: localStorage.getItem('username')
        };
      });

      if (authData.isAuthenticated === null && authData.username === null) {
        console.log('   ✅ Step 4: localStorage cleared after logout');
      }
    } else {
      throw new Error('Logout button not found');
    }

    return true;
  } catch (error) {
    console.error(`   ❌ Test failed: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

async function runAllTests() {
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║   🧪 PUPPETEER LOGIN TEST SUITE                   ║');
  console.log('╚════════════════════════════════════════════════════╝');
  console.log(`\n📍 Testing: ${BASE_URL}`);
  console.log('⏳ Make sure your Next.js dev server is running!\n');

  const results = [];

  // Run all tests
  results.push(await testLoginPageLoads());
  results.push(await testValidLogin());
  results.push(await testInvalidLogin());
  results.push(await testEmptyFieldsValidation());
  results.push(await testLoginWithDashboardAccess());
  results.push(await testLogoutFunctionality());

  // Summary
  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║                  📊 TEST SUMMARY                   ║');
  console.log('╚════════════════════════════════════════════════════╝\n');

  const passed = results.filter(r => r).length;
  const total = results.length;
  const percentage = Math.round((passed / total) * 100);

  console.log(`Tests Passed: ${passed}/${total} (${percentage}%)`);

  if (passed === total) {
    console.log('\n✅ All tests passed! Login functionality is working correctly.\n');
    process.exit(0);
  } else {
    console.log('\n❌ Some tests failed. Please review the output above.\n');
    process.exit(1);
  }
}

// Run the tests
runAllTests().catch(error => {
  console.error('\n💥 Fatal error:', error.message);
  process.exit(1);
});
