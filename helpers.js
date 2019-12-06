const fakeData = require('faker');

const randomNumberInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createMockCustomer = () => {
  return {
    customerName: `${fakeData.name.firstName()} ${fakeData.name.lastName()}`,
    customerAddress: `${fakeData.address.streetAddress()}`
  }
}

const createMockJob = (totalCustomers) => {
  const rando = randomNumberInRange;
  const statuses = ['quoted', 'quote accepted', 'in progress', 'complete'];

  return {
    customerId: rando(1, totalCustomers),
    quote: `${fakeData.commerce.price()}`,
    jobDescription: `${fakeData.lorem.sentences()}`,
    jobStatus: `${statuses[rando(0, 3)]}`
  }
}

const createMockMaterial = (totalJobs) => {
  const rando = randomNumberInRange;
  const qtyBought = fakeData.random.number();

  return {
    job: rando(1, totalJobs),
    name: `${fakeData.random.word()}`,
    qty_bought: `${qtyBought}`,
    qty_used: `${qtyBought - rando(1, qtyBought)}`,
    cost: `${fakeData.commerce.price()}`
  }
}
module.exports = {
  randomNumberInRange,
  createMockCustomer,
  createMockJob,
  createMockMaterial
}
