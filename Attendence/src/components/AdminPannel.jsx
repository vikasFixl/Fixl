import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import useAttendanceStore from '../store/UseAttendenceStore';
export default function AdminPanel() {
      const { userId } = useParams();
      const {getUserAttendance, attendanceRecords,getLastMonthAttendance} = useAttendanceStore();
      console.log(userId);


    
  

  

 useEffect(() => {
    getUserAttendance(userId)
  }, [userId]);

  const downloadExcel = () => {
    const attendanceData = getLastMonthAttendance(userId);
    const ws = XLSX.utils.json_to_sheet(attendanceData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, `Attendance_${new Date().toISOString().slice(0,7)}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">📊 Admin Attendance Panel</h2>
          <button
            onClick={downloadExcel}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold"
          >
            Download Last Month's Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2">Name</th>
                <th className="p-2">Date</th>
                <th className="p-2">Day</th>
                <th className="p-2">In Time</th>
                <th className="p-2">Out Time</th>
                <th className="p-2">Late</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length === 0 && <tr><td colSpan="6" className="p-15 text-center">No attendance records found</td></tr>} 
              { attendanceRecords?.map((a, i) => (
                <tr key={i} className="border-b border-gray-600">
                  <td className="p-2">{a.user?.name || 'N/A'}</td>
                  <td className="p-2">{new Date(a.date).toLocaleDateString()}</td>
                  <td className="p-2">{a.day}</td>
                  <td className="p-2">{a.inTime}</td>
                  <td className="p-2">{a.outTime}</td>
                  <td className="p-2">{a.late ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
