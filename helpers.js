const fakeData = require('faker');

const randomNumberInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createMockCustomer = () => {
  return {
    $customer_name: `${fakeData.name.firstName()} ${fakeData.name.lastName()}`,
    $customer_address: `${fakeData.address.streetAddress()}`
  }
}

const createMockJob = (totalCustomers) => {
  const statuses = ['quoted', 'quote accepted', 'in progress', 'complete'];
  const randomStatus = statuses[randomNumberInRange(0, 3)];

  return {
    $customer_id: randomNumberInRange(1, totalCustomers),
    $quote: `${fakeData.commerce.price()}`,
    $job_description: `${fakeData.lorem.sentences()}`,
    $job_status: `${randomStatus}`
  }
}

const createMockMaterial = (totalJobs) => {
  const qtyBought = fakeData.random.number();
  const qtyUsed = qtyBought - randomNumberInRange(1, qtyBought);

  return {
    $job_id: randomNumberInRange(1, totalJobs),
    $material_name: `${fakeData.random.word()}`,
    $qty_bought: `${qtyBought}`,
    $qty_used: `${qtyUsed}`,
    $cost: `${fakeData.commerce.price()}`
  }
}

module.exports = {
  randomNumberInRange,
  createMockCustomer,
  createMockJob,
  createMockMaterial
}
