// Test file for all Bookshop API endpoints
const axios = require('axios');

// Test configuration
const BASE_URLS = {
    task1: 'http://localhost:3001',
    task2: 'http://localhost:3002',
    task3: 'http://localhost:3003',
    task4: 'http://localhost:3004',
    task5: 'http://localhost:3005',
    task6: 'http://localhost:3006',
    task7: 'http://localhost:3007',
    task8: 'http://localhost:3008',
    task9: 'http://localhost:3009',
    task10: 'http://localhost:3010',
    task11: 'http://localhost:3011',
    task12: 'http://localhost:3012',
    task13: 'http://localhost:3013'
};

let authToken = '';

// Helper function to make requests
async function makeRequest(method, url, data = null, headers = {}) {
    try {
        const config = {
            method,
            url,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };
        
        if (data) {
            config.data = data;
        }
        
        const response = await axios(config);
        return { success: true, data: response.data, status: response.status };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || error.message, 
            status: error.response?.status || 500 
        };
    }
}

// Test functions
async function testTask1() {
    console.log('\n=== Testing Task 1: Get book list ===');
    
    const result = await makeRequest('GET', `${BASE_URLS.task1}/api/books`);
    
    if (result.success) {
        console.log('✅ Task 1 PASSED');
        console.log(`   Found ${result.data.data.length} books`);
    } else {
        console.log('❌ Task 1 FAILED');
        console.log(`   Error: ${result.error.message || result.error}`);
    }
}

async function testTask2() {
    console.log('\n=== Testing Task 2: Search by ISBN ===');
    
    const result = await makeRequest('GET', `${BASE_URLS.task2}/api/books/isbn/978-0743273565`);
    
    if (result.success) {
        console.log('✅ Task 2 PASSED');
        console.log(`   Found book: ${result.data.data.title}`);
    } else {
        console.log('❌ Task 2 FAILED');
        console.log(`   Error: ${result.error.message || result.error}`);
    }
}

async function testTask3() {
    console.log('\n=== Testing Task 3: Search by Author ===');
    
    const result = await makeRequest('GET', `${BASE_URLS.task3}/api/books/author/Fitzgerald`);
    
    if (result.success) {
        console.log('✅ Task 3 PASSED');
        console.log(`   Found ${result.data.data.length} books by Fitzgerald`);
    } else {
        console.log('❌ Task 3 FAILED');
        console.log(`   Error: ${result.error.message || result.error}`);
    }
}

async function testTask4() {
    console.log('\n=== Testing Task 4: Search by Title ===');
    
    const result = await makeRequest('GET', `${BASE_URLS.task4}/api/books/title/Gatsby`);
    
    if (result.success) {
        console.log('✅ Task 4 PASSED');
        console.log(`   Found ${result.data.data.length} books with "Gatsby" in title`);
    } else {
        console.log('❌ Task 4 FAILED');
        console.log(`   Error: ${result.error.message || result.error}`);
    }
}

async function testTask5() {
    console.log('\n=== Testing Task 5: Get book reviews ===');
    
    const result = await makeRequest('GET', `${BASE_URLS.task5}/api/books/1/reviews`);
    
    if (result.success) {
        console.log('✅ Task 5 PASSED');
        console.log(`   Found ${result.data.data.reviews.length} reviews for book 1`);
    } else {
        console.log('❌ Task 5 FAILED');
        console.log(`   Error: ${result.error.message || result.error}`);
    }
}

async function testTask6() {
    console.log('\n=== Testing Task 6: Register new user ===');
    
    const userData = {
        username: `testuser_${Date.now()}`,
        email: `testuser_${Date.now()}@example.com`,
        password: 'password123'
    };
    
    const result = await makeRequest('POST', `${BASE_URLS.task6}/api/register`, userData);
    
    if (result.success) {
        console.log('✅ Task 6 PASSED');
        console.log(`   Registered user: ${result.data.data.username}`);
    } else {
        console.log('❌ Task 6 FAILED');
        console.log(`   Error: ${result.error.message || result.error}`);
    }
}

async function testTask7() {
    console.log('\n=== Testing Task 7: Login user ===');
    
    const loginData = {
        username: 'john_doe',
        password: 'password'
    };
    
    const result = await makeRequest('POST', `${BASE_URLS.task7}/api/login`, loginData);
    
    if (result.success) {
        console.log('✅ Task 7 PASSED');
        console.log(`   Logged in as: ${result.data.data.user.username}`);
        authToken = result.data.data.token;
    } else {
        console.log('❌ Task 7 FAILED');
        console.log(`   Error: ${result.error.message || result.error}`);
    }
}

async function testTask8() {
    console.log('\n=== Testing Task 8: Add/Modify book review ===');
    
    if (!authToken) {
        console.log('⚠️  Skipping Task 8 - No auth token available');
        return;
    }
    
    const reviewData = {
        rating: 5,
        comment: 'Excellent book! This is a test review.'
    };
    
    const result = await makeRequest(
        'POST', 
        `${BASE_URLS.task8}/api/books/1/reviews`, 
        reviewData,
        { 'Authorization': `Bearer ${authToken}` }
    );
    
    if (result.success) {
        console.log('✅ Task 8 PASSED');
        console.log(`   Review ${result.data.message.toLowerCase()}`);
    } else {
        console.log('❌ Task 8 FAILED');
        console.log(`   Error: ${result.error.message || result.error}`);
    }
}

async function testTask9() {
    console.log('\n=== Testing Task 9: Delete book review ===');
    
    if (!authToken) {
        console.log('⚠️  Skipping Task 9 - No auth token available');
        return;
    }
    
    const result = await makeRequest(
        'DELETE', 
        `${BASE_URLS.task9}/api/books/1/reviews`,
        null,
        { 'Authorization': `Bearer ${authToken}` }
    );
    
    if (result.success) {
        console.log('✅ Task 9 PASSED');
        console.log(`   Review deleted successfully`);
    } else {
        console.log('❌ Task 9 FAILED');
        console.log(`   Error: ${result.error.message || result.error}`);
    }
}

async function testTask10() {
    console.log('\n=== Testing Task 10: Get books with async callback ===');
    
    const result = await makeRequest('GET', `${BASE_URLS.task10}/api/books-async`);
    
    if (result.success) {
        console.log('✅ Task 10 PASSED');
        console.log(`   Retrieved ${result.data.data.length} books using async callback`);
    } else {
        console.log('❌ Task 10 FAILED');
        console.log(`   Error: ${result.error.message || result.error}`);
    }
}

async function testTask11() {
    console.log('\n=== Testing Task 11: Search by ISBN with Promises ===');
    
    const result = await makeRequest('GET', `${BASE_URLS.task11}/api/search/isbn/978-0743273565`);
    
    if (result.success) {
        console.log('✅ Task 11 PASSED');
        console.log(`   Found book using Promises: ${result.data.data.title}`);
    } else {
        console.log('❌ Task 11 FAILED');
        console.log(`   Error: ${result.error.message || result.error}`);
    }
}

async function testTask12() {
    console.log('\n=== Testing Task 12: Search by Author with Promises ===');
    
    const result = await makeRequest('GET', `${BASE_URLS.task12}/api/search/author/Fitzgerald`);
    
    if (result.success) {
        console.log('✅ Task 12 PASSED');
        console.log(`   Found ${result.data.data.length} books by Fitzgerald using Promises`);
    } else {
        console.log('❌ Task 12 FAILED');
        console.log(`   Error: ${result.error.message || result.error}`);
    }
}

async function testTask13() {
    console.log('\n=== Testing Task 13: Search by Title with Promises ===');
    
    const result = await makeRequest('GET', `${BASE_URLS.task13}/api/search/title/Gatsby`);
    
    if (result.success) {
        console.log('✅ Task 13 PASSED');
        console.log(`   Found ${result.data.data.length} books with "Gatsby" in title using Promises`);
    } else {
        console.log('❌ Task 13 FAILED');
        console.log(`   Error: ${result.error.message || result.error}`);
    }
}

// Main test runner
async function runAllTests() {
    console.log('🚀 Starting Bookshop API Tests...\n');
    
    try {
        await testTask1();
        await testTask2();
        await testTask3();
        await testTask4();
        await testTask5();
        await testTask6();
        await testTask7();
        await testTask8();
        await testTask9();
        await testTask10();
        await testTask11();
        await testTask12();
        await testTask13();
        
        console.log('\n🎉 All tests completed!');
        console.log('\n📝 Note: Some tests may fail if the corresponding servers are not running.');
        console.log('   Start individual servers with: node task1.js, node task2.js, etc.');
        
    } catch (error) {
        console.error('\n💥 Test runner error:', error.message);
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    runAllTests();
}

module.exports = {
    runAllTests,
    testTask1,
    testTask2,
    testTask3,
    testTask4,
    testTask5,
    testTask6,
    testTask7,
    testTask8,
    testTask9,
    testTask10,
    testTask11,
    testTask12,
    testTask13
}; 