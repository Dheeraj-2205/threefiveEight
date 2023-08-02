// const { expect } = require('chai');
// const { bookFacility, isSlotAvailable } = require('./booking');

// describe('Facility/Common Amenities Booking Module', function () {
//   beforeEach(function () {
//     for (const facility of Object.keys(bookedSlots)) {
//       bookedSlots[facility].clear();
//     }
//   });

//   describe('isSlotAvailable', function () {
//     it('should return true for an available slot', function () {
//       bookedSlots['Clubhouse'].add([new Date('2023-08-01T10:00'), new Date('2023-08-01T12:00')]);
//       const available = isSlotAvailable('Clubhouse', '12:00', '14:00');
//       expect(available).to.be.true;
//     });

//     it('should return false for a booked slot', function () {
//       bookedSlots['Clubhouse'].add([new Date('2023-08-01T10:00'), new Date('2023-08-01T12:00')]);
//       const available = isSlotAvailable('Clubhouse', '11:00', '13:00');
//       expect(available).to.be.false;
//     });
//   });

