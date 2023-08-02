const readline = require('readline');

const facilities = {
  Clubhouse: {
    '10:00-16:00': 100,
    '16:00-22:00': 500,
  },
  'Tennis Court': {
    '00:00-23:59': 50,
  },
};

const booking = {
  Clubhouse: new Set(),
  'Tennis Court': new Set(),
};

const isSlotAvailable = (facility, startTime, endTime) => {
  const bookedSlotsForFacility = booking[facility];
  for (const slot of bookedSlotsForFacility) {
    const [slotStart, slotEnd] = slot;
    if (slotStart <= endTime && slotEnd >= startTime) {
      return false;
    }
  }
  return true;
}

const bookFacility = (facility, date, startTime, endTime) => {
  if (!facilities[facility]) {
    return 'Invalid Facility';
  }

  const startTimeObj = new Date(`1970-01-01T${startTime}`);
  const endTimeObj = new Date(`1970-01-01T${endTime}`);

  if (startTimeObj >= endTimeObj) {
    return 'Invalid Time Range';
  }

  const slotStart = new Date(`${date}T${startTime}`);
  const slotEnd = new Date(`${date}T${endTime}`);

  if (!isSlotAvailable(facility, slotStart, slotEnd)) {
    return 'Booking Failed, Already Booked';
  }

  booking[facility].add([slotStart, slotEnd]);
  let bookingAmount = 0;

  for (const [slotRange, amount] of Object.entries(facilities[facility])) {
    const [rangeStartStr, rangeEndStr] = slotRange.split('-');
    const rangeStart = new Date(`1970-01-01T${rangeStartStr}`);
    const rangeEnd = new Date(`1970-01-01T${rangeEndStr}`);

    if (slotStart >= rangeStart && slotEnd <= rangeEnd) {
      const duration = (slotEnd - slotStart) / (1000 * 60 * 60);
      bookingAmount += amount * duration;
    }
  }

  return `Booked, Rs. ${bookingAmount}`;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptInput = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

const main = async() => {
  while (true) {
    console.log('\nAvailable Facilities: ', Object.keys(facilities).join(', '));
    const facility = await promptInput('Enter the facility to book: ');

    if (facility === 'exit') {
      break;
    }

    if (!facilities[facility]) {
      console.log('Invalid Facility');
      continue;
    }

    const date = await promptInput('Enter the date (DD-MM-YYYY): ').trim();
    const startTime = await promptInput('Enter the start time (HH:mm): ').trim();
    const endTime = await promptInput('Enter the end time (HH:mm): ').trim();

    const result = bookFacility(facility, date, startTime, endTime);
    console.log(result);
  }

  rl.close();
}

main().then(() => {
  process.exit(0);
});
