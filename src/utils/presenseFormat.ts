interface AttendanceEntry {
  date: string;
  in: string;
  out: string;
  total: string;
  presense: string;
}

export const presenseFormat = (data: any) => {
  const attendancesByDate: { [key: string]: AttendanceEntry } = {};

  data?.attendances?.forEach((attendance: any) => {
    // Extracting createdAt, type, and hour
    const { createdAt, type } = attendance;
    const createdDate = new Date(createdAt);
    const hour = createdDate.getHours();
    const minute = createdDate.getMinutes();
    const formattedHour = `${String(hour).padStart(2, '0')}.${String(
      minute,
    ).padStart(2, '0')}`;

    // Create a day variable based on month, day, and year
    const day = `${
      createdDate.getMonth() + 1
    }-${createdDate.getDate()}-${createdDate.getFullYear()}`;

    // Ensure the date entry exists
    if (!attendancesByDate[day]) {
      attendancesByDate[day] = {
        date: createdDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        in: '....',
        out: '....',
        total: '....',
        presense: 'Present',
      };
    }

    // Assign the in or out time based on type
    if (type === 'In') {
      attendancesByDate[day].in = formattedHour;
    } else if (type === 'Out') {
      attendancesByDate[day].out = formattedHour;
    }

    // Calculate total time if both in and out are present
    const { in: inTime, out: outTime } = attendancesByDate[day];

    if (inTime !== '....' && outTime !== '....') {
      const [inHour, inMinute] = inTime.split('.').map(Number);
      const [outHour, outMinute] = outTime.split('.').map(Number);

      const inDate = new Date(
        createdDate.getFullYear(),
        createdDate.getMonth(),
        createdDate.getDate(),
        inHour,
        inMinute,
      );
      const outDate = new Date(
        createdDate.getFullYear(),
        createdDate.getMonth(),
        createdDate.getDate(),
        outHour,
        outMinute,
      );

      const totalTimeInMinutes =
        Math.abs(outDate.getTime() - inDate.getTime()) / (1000 * 60); // Difference in minutes

      const totalHours = Math.floor(totalTimeInMinutes / 60);
      const totalMinutes = Math.floor(totalTimeInMinutes % 60);

      let totalTimeString = '';

      if (totalHours > 0) {
        totalTimeString += `${totalHours} hours `;
      }

      if (totalMinutes > 0) {
        totalTimeString += `${totalMinutes} minutes`;
      }

      attendancesByDate[day].total = totalTimeString.trim();
    }
  });

  const result = Object.values(attendancesByDate).map((entry, index) => ({
    id: index + 1,
    ...entry,
  }));

  return result;
};

export const dailyAttendaceFormat = (data: any) => {
  // Filter out invalid date entries
  const validAttendances = data.filter(
    (attendance: any) => !isNaN(new Date(attendance.createdAt).getTime()),
  );

  // Check if there are valid attendances
  if (validAttendances.length === 0) {
    return { start: '....:....', end: '....:....', totalHour: '....' };
  }

  // Sort the attendances by date
  const sortedAttendances = validAttendances.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  // Get the newest date
  const newestDate = new Date(sortedAttendances[0].createdAt)
    .toISOString()
    .split('T')[0];

  // Filter attendances to get only those from the newest date
  const newestAttendances = sortedAttendances.filter((attendance: any) => {
    const attendanceDate = new Date(attendance.createdAt)
      .toISOString()
      .split('T')[0];

    return attendanceDate === newestDate;
  });

  // Get the first two attendances of the newest date
  const finalAttendances = newestAttendances.slice(0, 2);
  let startTime: any | null = null;
  let endTime: any | null = null;

  // Determine start and end times
  finalAttendances.forEach((attendance: any) => {
    const attendanceDate = new Date(attendance.createdAt);
    if (attendance.type === 'In' && !isNaN(attendanceDate.getTime())) {
      startTime = attendanceDate;
    } else if (attendance.type === 'Out' && !isNaN(attendanceDate.getTime())) {
      endTime = attendanceDate;
    }
  });

  // Format start and end times
  const start = startTime
    ? `${startTime.getHours()}.${startTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
    : '....:....';
  const end = endTime
    ? `${endTime.getHours()}.${endTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
    : '....:....';

  // Calculate total hours and minutes
  let totalHour: string | number = '....';
  if (startTime && endTime) {
    const totalTimeInMinutes =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    const totalHours = Math.floor(totalTimeInMinutes / 60);
    const totalMinutes = Math.round(totalTimeInMinutes % 60);

    if (totalHours > 0) {
      totalHour = `${totalHours} hours`;
      if (totalMinutes > 0) {
        totalHour += ` ${totalMinutes} minutes`;
      }
    } else {
      totalHour = `${totalMinutes} minutes`;
    }
  }

  return { start, end, totalHour };
};
