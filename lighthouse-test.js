const fs = require('fs');
const { spawn } = require('child_process');

const BASE_URL = 'http://localhost:3000';

function runLighthouse(url, pageName) {
  return new Promise((resolve, reject) => {
    console.log(`\n🔍 Testing ${pageName} at ${url}...`);

    const lighthouse = spawn('npx', ['lighthouse', url, '--output=json', '--chrome-flags=--headless'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true
    });

    let output = '';
    let errorOutput = '';

    lighthouse.stdout.on('data', (data) => {
      output += data.toString();
    });

    lighthouse.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    lighthouse.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(output);
          const scores = {
            performance: Math.round(result.categories.performance.score * 100),
            accessibility: Math.round(result.categories.accessibility.score * 100),
            bestPractices: Math.round(result.categories['best-practices'].score * 100),
            seo: Math.round(result.categories.seo.score * 100),
          };
          console.log(`✅ ${pageName} Results:`, scores);
          resolve({ page: pageName, scores, url, timestamp: new Date().toISOString() });
        } catch (e) {
          reject(new Error(`Failed to parse lighthouse output: ${e.message}`));
        }
      } else {
        reject(new Error(`Lighthouse failed: ${errorOutput}`));
      }
    });
  });
}

async function runAllTests() {
  console.log('🚀 Starting Lighthouse Tests...\n');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`⏳ Make sure your Next.js app is running on port 3000!\n`);

  const results = [];

  try {
    const homeResult = await runLighthouse(`${BASE_URL}/`, 'Home');
    results.push(homeResult);
  } catch (error) {
    console.error('❌ Home page error:', error.message);
  }

  try {
    const loginResult = await runLighthouse(`${BASE_URL}/login`, 'Login');
    results.push(loginResult);
  } catch (error) {
    console.error('❌ Login page error:', error.message);
  }

  try {
    const dashboardResult = await runLighthouse(`${BASE_URL}/dashboard`, 'Dashboard (unauthenticated)');
    results.push(dashboardResult);
  } catch (error) {
    console.error('❌ Dashboard page error:', error.message);
  }

  // Save results to file
  const reportPath = './lighthouse-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Full report saved to: ${reportPath}`);

  console.log('\n✨ All tests completed!');
  if (results.length > 0) {
    console.log('\n📊 Summary:');
    results.forEach((result) => {
      console.log(`\n${result.page}:`);
      console.log(`  Performance: ${result.scores.performance}`);
      console.log(`  Accessibility: ${result.scores.accessibility}`);
      console.log(`  Best Practices: ${result.scores.bestPractices}`);
      console.log(`  SEO: ${result.scores.seo}`);
    });
  }
}

// Run tests
runAllTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
