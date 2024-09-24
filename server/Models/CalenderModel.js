const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  eventName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

module.exports = CalendarEvent;
