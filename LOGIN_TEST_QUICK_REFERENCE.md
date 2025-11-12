# 🧪 Login Test - Quick Reference

## ⚡ TL;DR - Run Tests in 2 Commands

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npm run test:login
```

That's it! 🎉

---

## 📋 What Gets Tested

| # | Test | Status |
|---|------|--------|
| 1 | Login page loads | ✅ |
| 2 | Valid login (user/password) | ✅ |
| 3 | Invalid login (wrong credentials) | ❌ |
| 4 | Empty fields validation | ⚠️ |
| 5 | Login → Dashboard flow | 🔐 |
| 6 | Logout functionality | 🚪 |

---

## 🎯 Test Credentials

```
Username: user
Password: password
```

---

## 📊 Expected Results

```
Tests Passed: 6/6 (100%)
✅ All tests passed! Login functionality is working correctly.
```

---

## 🔧 Commands

```bash
# Run login tests
npm run test:login

# Or use the alias
npm test

# Run with dev server in background (requires two terminals)
# Terminal 1:
npm run dev

# Terminal 2:
npm run test:login
```

---

## ❓ Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot connect to localhost:3000" | Make sure `npm run dev` is running |
| Tests hang | Check dev server is responsive |
| "Element not found" | Verify form element IDs haven't changed |
| Browser crashes | Try: `npm install puppeteer --save-dev` |

---

## 🧪 Test File Location

`/Users/kaiwanyawit/Repositories/poc-lighthouse-puppeteer/login-test.js`

---

## 📚 Full Documentation

See `LOGIN_TESTING_GUIDE.md` for detailed information about:
- What each test does
- How to customize tests
- Puppeteer methods reference
- CI/CD integration examples

---

## 🚀 Next Steps

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Run tests: `npm run test:login`
4. Check results and customize as needed

---

**Status**: ✅ Ready to test login functionality!
