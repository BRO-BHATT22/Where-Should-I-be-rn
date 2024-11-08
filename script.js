var btn = $('#Day');

const bellSchedule = {
    1: { start: '8:24 AM', end: '9:31 AM' },
    2: { start: '9:36 AM', end: '10:43 AM' },
    3: { start: '10:48 AM', end: '11:55 AM' },
    lunch: { start: '11:55 AM', end: '12:36 PM' },
    4: { start: '12:41 PM', end: '1:48 PM' },
    5: { start: '1:53 PM', end: '3:00 PM' }
};
const dailyPeriods = {
    A: [1, 2, 3, "Lunch", 5, 6],
    B: [4, 1, 2, "Lunch", 7, 5],
    C: [3, 4, 1, "Lunch", 6, 7],
    D: [2, 3, 4, "Lunch", 5, 6],
    E: [1, 2, 3, "Lunch", 7, 5],
    F: [4, 1, 2, "Lunch", 6, 7],
    G: [3, 4, 7, "Lunch", 5, 6]
};
// choose day here
btn.on("click", () => {
    var selectedDay = $('#dayInput').val();
    $.ajax({
      url: `https://api.npoint.io/c59df1063adbe3c5c5e0`,
      method: "GET",
      success: (data) => {
        const schedule = data.schedule; 
        const daySchedule = dailyPeriods[selectedDay];
        $('#scheduleList').empty();
        daySchedule.forEach((period) => {
            if (period === "Lunch") {
            const Lunch = bellSchedule.lunch;
            $('#scheduleList').append(`
              <tr>
                <td>Lunch</td>
                <td>${Lunch.start} - ${Lunch.end}</td>
                <td colspan="3">Lunch</td>
              </tr>
            `);
          } else {




            const periodData = schedule.find(item => item.period === period && item.days.includes(selectedDay));
            if (periodData) {
              const time = bellSchedule[bellIndex];
              $('#scheduleList').append(`
                <tr class="centerall">
                  <td>${period}</td>
                  <td>${time.start} - ${time.end}</td>
                  <td>${periodData.class}</td>
                  <td>${periodData.teacher}</td>
                  <td>${periodData.room}</td>
                </tr>
              `);
            }
          }
        });
      },
    });
});