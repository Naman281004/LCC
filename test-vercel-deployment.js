import axios from 'axios';

const BACKEND_URL = 'https://lcc-qvi2.vercel.app';
const FRONTEND_ORIGIN = 'https://lcc-delta.vercel.app';

console.log('🧪 Testing Vercel Deployment...\n');

// Test 1: Health endpoint
async function testHealth() {
  console.log('1️⃣  Testing /api/health...');
  try {
    const response = await axios.get(`${BACKEND_URL}/api/health`);
    console.log('   ✅ Health check passed:', response.data);
    return true;
  } catch (error) {
    console.log('   ❌ Health check failed:', error.message);
    return false;
  }
}

// Test 2: CORS preflight for auth endpoint
async function testCORSPreflight() {
  console.log('\n2️⃣  Testing CORS preflight for /api/auth/otp/verify...');
  try {
    const response = await axios.options(`${BACKEND_URL}/api/auth/otp/verify`, {
      headers: {
        'Origin': FRONTEND_ORIGIN,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type, Authorization'
      }
    });
    
    const corsHeader = response.headers['access-control-allow-origin'];
    if (corsHeader) {
      console.log('   ✅ CORS preflight passed');
      console.log('   📋 Access-Control-Allow-Origin:', corsHeader);
      return true;
    } else {
      console.log('   ❌ CORS preflight failed: No Access-Control-Allow-Origin header');
      return false;
    }
  } catch (error) {
    console.log('   ❌ CORS preflight failed:', error.message);
    if (error.response) {
      console.log('   📋 Status:', error.response.status);
      console.log('   📋 Headers:', error.response.headers);
    }
    return false;
  }
}

// Test 3: CORS preflight for certificate endpoint
async function testCertificateCORS() {
  console.log('\n3️⃣  Testing CORS preflight for /api/certificate/test...');
  try {
    const response = await axios.options(`${BACKEND_URL}/api/certificate/test`, {
      headers: {
        'Origin': FRONTEND_ORIGIN,
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    const corsHeader = response.headers['access-control-allow-origin'];
    if (corsHeader) {
      console.log('   ✅ CORS preflight passed');
      return true;
    } else {
      console.log('   ❌ CORS preflight failed: No Access-Control-Allow-Origin header');
      return false;
    }
  } catch (error) {
    console.log('   ❌ CORS preflight failed:', error.message);
    return false;
  }
}

// Test 4: Actual GET request with CORS
async function testActualRequest() {
  console.log('\n4️⃣  Testing actual GET request to /api/certificate/nonexistent...');
  try {
    await axios.get(`${BACKEND_URL}/api/certificate/nonexistent`, {
      headers: {
        'Origin': FRONTEND_ORIGIN
      }
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      const corsHeader = error.response.headers['access-control-allow-origin'];
      if (corsHeader) {
        console.log('   ✅ Actual request passed (404 expected, CORS headers present)');
        return true;
      } else {
        console.log('   ❌ CORS headers missing on actual request');
        return false;
      }
    } else {
      console.log('   ❌ Request failed:', error.message);
      return false;
    }
  }
}

// Run all tests
async function runTests() {
  const results = [];
  
  results.push(await testHealth());
  results.push(await testCORSPreflight());
  results.push(await testCertificateCORS());
  results.push(await testActualRequest());
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 Test Results: ${passed}/${total} passed`);
  console.log(`${'='.repeat(50)}\n`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! Deployment is working correctly.');
    console.log('✅ CORS is configured properly');
    console.log('✅ Serverless functions are routing correctly');
  } else {
    console.log('⚠️  Some tests failed. Check the errors above.');
    console.log('\n📝 Next steps:');
    console.log('1. Verify Vercel Root Directory is set to "server"');
    console.log('2. Redeploy with "Clear build cache"');
    console.log('3. Check Vercel function logs for errors');
  }
}

runTests().catch(console.error);

