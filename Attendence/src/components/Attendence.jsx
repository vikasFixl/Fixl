import { useState } from 'react';
import { CheckCircle, AlertCircle, Loader2, CalendarDays } from 'lucide-react';
import useAttendanceStore from '../store/UseAttendenceStore';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Attendance = () => {
  const { markAttendance } = useAttendanceStore();
  const [day, setDay] = useState('Monday');
  const [date, setDate] = useState(new Date());
  const [inTime, setInTime] = useState('09:00 AM');
  const [outTime, setOutTime] = useState('06:00 PM');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    console.log(day, date, inTime, outTime);
    try {
      const res = await markAttendance({
        day,
        date: date.toISOString(), // Send ISO format to backend
        inTime,
        outTime,
      });

      setDate(new Date());
      setDay("");
      setInTime("");
      setOutTime("");
      setMessage("Attendance marked successfully!");
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark attendance');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-3xl shadow-2xl p-10 w-full max-w-xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-blue-400 flex items-center justify-center gap-2">
            <CalendarDays className="w-8 h-8" /> Mark Your Attendance
          </h2>
          <p className="text-sm text-gray-400 mt-2">Please fill in your date and time details below</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Select Date</label>
          <div className="bg-gray-700 border border-gray-600 rounded-xl px-2 py-1 text-white">
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              dateFormat="dd/MM/yyyy"
              className="bg-transparent w-full py-2 px-3 text-white focus:outline-none"
              calendarClassName="bg-white text-black rounded-lg p-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Select Day</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">In Time</label>
            <div className="bg-gray-700 border border-gray-600 rounded-xl px-2 py-1">
              <TimePicker
                onChange={setInTime}
                value={inTime}
                disableClock={true}
                format="hh:mm a"
                className="w-full bg-transparent text-white"
                clearIcon={null}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Out Time</label>
            <div className="bg-gray-700 border border-gray-600 rounded-xl px-2 py-1">
              <TimePicker
                onChange={setOutTime}
                value={outTime}
                disableClock={true}
                format="hh:mm a"
                className="w-full bg-transparent text-white"
                clearIcon={null}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-8 w-full ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } text-white text-lg font-bold py-3 rounded-xl shadow-lg transition duration-200 flex items-center justify-center`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              Marking...
            </>
          ) : (
            'Submit Attendance'
          )}
        </button>

        {message && (
          <div className="mt-5 flex items-center text-green-400 bg-green-900/20 p-3 rounded-lg">
            <CheckCircle className="w-5 h-5 mr-2" /> {message}
          </div>
        )}

        {error && (
          <div className="mt-5 flex items-center text-red-400 bg-red-900/20 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5 mr-2" /> {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Attendance;
