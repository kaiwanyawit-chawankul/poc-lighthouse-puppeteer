# 🧪 Login Testing with Puppeteer

This guide explains how to test your login functionality using Puppeteer.

## 📦 What is Puppeteer?

Puppeteer is a Node.js library that provides a high-level API to control Chrome or Chromium over the DevTools Protocol. It allows you to automate browser interactions and test web applications.

## ✨ What Tests Are Included?

The `login-test.js` file includes **6 comprehensive tests**:

### Test 1: Login Page Loads ✅
- Verifies the login page returns HTTP 200
- Checks that all form elements are present (username input, password input, submit button)
- Validates the page structure

### Test 2: Valid Login ✅
- Tests login with correct credentials (`user/password`)
- Verifies redirect to `/dashboard`
- Confirms authentication data is stored in localStorage
- Checks localStorage contains: `isAuthenticated: true` and `username: user`

### Test 3: Invalid Login ❌
- Tests login with wrong credentials
- Verifies error message is displayed
- Confirms user stays on `/login` page
- Ensures localStorage remains empty

### Test 4: Empty Fields Validation ⚠️
- Tests form submission with empty fields
- Verifies form validation (required attributes)
- Ensures form submission is blocked

### Test 5: Login → Dashboard Flow 🔐
- Full end-to-end login flow
- Verifies dashboard loads after login
- Checks that user information is displayed on dashboard
- Confirms logout button is present

### Test 6: Logout Functionality 🚪
- Tests the complete logout process
- Verifies redirect back to `/login`
- Confirms localStorage is cleared after logout

## 🚀 How to Run Tests

### Prerequisites
First, install Puppeteer (if not already installed):
```bash
npm install
```

### Run All Login Tests
```bash
npm run test:login
```

Or:
```bash
npm test
```

### Run With Dev Server

**Terminal 1 - Start the dev server:**
```bash
npm run dev
```

**Terminal 2 - Run the tests:**
```bash
npm run test:login
```

The tests will wait for the dev server to be running and then execute all test cases.

## 📊 Expected Output

When you run the tests, you should see:

```
╔════════════════════════════════════════════════════╗
║   🧪 PUPPETEER LOGIN TEST SUITE                   ║
╚════════════════════════════════════════════════════╝

📍 Testing: http://localhost:3000
⏳ Make sure your Next.js dev server is running!

🔐 Test 1: Login page loads correctly
   ✅ Page loaded successfully (Status: 200)
   ✅ Page title: "..."
   ✅ Login form elements found

✅ Test 2: Valid login with correct credentials
   ℹ️  Entered credentials (user/password)
   ✅ Login successful, redirected to: http://localhost:3000/dashboard
   ✅ Confirmed: Redirected to /dashboard
   ✅ Authentication data stored in localStorage
      - isAuthenticated: true
      - username: user

[... more tests ...]

╔════════════════════════════════════════════════════╗
║                  📊 TEST SUMMARY                   ║
╚════════════════════════════════════════════════════╝

Tests Passed: 6/6 (100%)

✅ All tests passed! Login functionality is working correctly.
```

## 🛠️ Customizing the Tests

### Add More Test Cases

Edit `login-test.js` and add a new test function:

```javascript
async function testCustomScenario() {
  console.log('\n🧪 Test: Custom scenario description');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    // Your test code here
    console.log('   ✅ Test passed');
    return true;
  } catch (error) {
    console.error(`   ❌ Test failed: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}
```

Then add it to the `runAllTests()` function:
```javascript
results.push(await testCustomScenario());
```

### Change Test Credentials

If you change your hardcoded credentials, update the tests:

```javascript
// Change this line in the tests:
await page.type('input[id="username"]', 'user');
await page.type('input[id="password"]', 'password');

// To your new credentials:
await page.type('input[id="username"]', 'newuser');
await page.type('input[id="password"]', 'newpass');
```

### Debug Individual Tests

Add `headless: false` to see the browser in action:

```javascript
const browser = await puppeteer.launch({
  headless: false,  // ← Add this to see the browser
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
```

## 📝 Common Puppeteer Methods Used

Here are the main Puppeteer methods used in the tests:

```javascript
// Navigation
page.goto(url, options)        // Navigate to a URL
page.waitForNavigation()       // Wait for page navigation

// Interaction
page.type(selector, text)      // Type text into an input
page.click(selector)           // Click an element
page.$(selector)               // Get a single element
page.$$(selector)              // Get multiple elements

// Waiting
page.waitForSelector()         // Wait for element to appear
page.waitForTimeout(ms)        // Wait for specified time

// Evaluation
page.evaluate(fn)              // Run JS in the browser context
page.$eval(selector, fn)       // Get element property/text

// Page info
page.url()                     // Get current URL
page.title()                   // Get page title
```

## 🐛 Troubleshooting

### "Browser not found" Error
Puppeteer needs Chromium to run. Try:
```bash
npm install puppeteer
```

### "Cannot find localhost:3000"
Make sure your dev server is running:
```bash
npm run dev
```

### Tests hang or timeout
- Check if the dev server is actually running
- Look for console errors in the dev server
- Increase timeout values if needed:
```javascript
await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 });
```

### Elements not found
Make sure selectors match the actual HTML. Check:
1. The form input IDs match: `id="username"` and `id="password"`
2. The submit button is a `<button type="submit">`
3. Element classes match the selectors used

## 📚 More Puppeteer Resources

- [Official Puppeteer Documentation](https://pptr.dev/)
- [Puppeteer GitHub Repository](https://github.com/puppeteer/puppeteer)
- [Common Puppeteer Patterns](https://pptr.dev/guides/introductory-examples)

## 🚀 CI/CD Integration

You can integrate these tests into your GitHub Actions workflow:

```yaml
name: Test Login

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build Next.js
        run: npm run build

      - name: Start dev server
        run: npm run dev &

      - name: Wait for server
        run: sleep 5

      - name: Run login tests
        run: npm run test:login
```

## ✅ Next Steps

1. **Install dependencies**: `npm install`
2. **Start dev server**: `npm run dev`
3. **Run tests**: `npm run test:login` (in another terminal)
4. **Review output**: Check the test results
5. **Customize**: Modify tests as needed for your use case

---

Happy testing! 🧪
