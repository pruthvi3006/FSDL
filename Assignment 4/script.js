
const sampleData = {
    student_1: {
        label: 'Rahul Sharma',
        weeks: Array.from({length:14}, (_,i)=>`Week ${i+1}`),
        marks: [65,70,75,80,85,78,82,88,90,85,87,89,92,94],
        assignments: [2,1,3,2,2,3,1,2,3,2,1,3,2,2],
        attendance: [85,88,90,92,91,89,93,95,94,92,90,91,93,94]
    },
    student_2: {
        label: 'Priya Verma',
        weeks: Array.from({length:14}, (_,i)=>`Week ${i+1}`),
        marks: [55,60,58,65,70,72,75,78,80,82,85,88,90,92],
        assignments: [1,2,1,2,3,2,2,3,1,2,3,2,2,3],
        attendance: [75,78,80,82,84,83,85,88,90,89,87,88,90,91]
    },
    student_3: {
        label: 'Amit Patel',
        weeks: Array.from({length:14}, (_,i)=>`Week ${i+1}`),
        marks: [72,74,76,78,80,82,84,86,88,90,91,92,93,95],
        assignments: [2,2,2,3,2,3,3,2,2,3,2,2,3,3],
        attendance: [88,89,90,91,92,93,94,95,96,95,94,93,92,91]
    }
};

let currentStudent = 'student_1';
let range = 14;

let marksChart, assignmentChart, attendanceChart, donutChart;

const studentSelect = document.getElementById('studentSelect');
const rangeSelect = document.getElementById('rangeSelect');

const avgMarksEl = document.getElementById('avgMarks');
const avgAttendanceEl = document.getElementById('avgAttendance');
const totalAssignmentsEl = document.getElementById('totalAssignments');

function classifyGrades(marks){
    const counts = {A:0,B:0,C:0,D:0};
    marks.forEach(m=>{
        if(m>=85) counts.A++;
        else if(m>=70) counts.B++;
        else if(m>=50) counts.C++;
        else counts.D++;
    });
    return counts;
}

function updateSummary(marks, assignments, attendance){
    const avgMarks = Math.round(marks.reduce((a,b)=>a+b,0)/marks.length);
    const avgAttendance = Math.round(attendance.reduce((a,b)=>a+b,0)/attendance.length);
    const totalAssignments = assignments.reduce((a,b)=>a+b,0);

    avgMarksEl.textContent = avgMarks;
    avgAttendanceEl.textContent = avgAttendance + "%";
    totalAssignmentsEl.textContent = totalAssignments;
}

function updateView(){

    const raw = sampleData[currentStudent];

    const labels = raw.weeks.slice(0,range);
    const marks = raw.marks.slice(0,range);
    const assignments = raw.assignments.slice(0,range);
    const attendance = raw.attendance.slice(0,range);

    if(marksChart) marksChart.destroy();
    if(assignmentChart) assignmentChart.destroy();
    if(attendanceChart) attendanceChart.destroy();
    if(donutChart) donutChart.destroy();

    marksChart = new Chart(document.getElementById('marksChart'),{
        type:'line',
        data:{labels,datasets:[{
            label:'Marks',
            data:marks,
            borderColor:'#4CAF50',
            backgroundColor:'rgba(76,175,80,0.2)',
            tension:0.3
        }]},
        options:{responsive:true,scales:{y:{beginAtZero:true,max:100}}}
    });

    assignmentChart = new Chart(document.getElementById('assignmentChart'),{
        type:'bar',
        data:{labels,datasets:[{
            label:'Assignments',
            data:assignments,
            backgroundColor:'#2196F3'
        }]},
        options:{responsive:true,scales:{y:{beginAtZero:true}}}
    });

    attendanceChart = new Chart(document.getElementById('attendanceChart'),{
        type:'line',
        data:{labels,datasets:[{
            label:'Attendance %',
            data:attendance,
            borderColor:'#FF9800',
            backgroundColor:'rgba(255,152,0,0.2)',
            tension:0.3
        }]},
        options:{responsive:true,scales:{y:{beginAtZero:true,max:100}}}
    });

    const gradeCounts = classifyGrades(marks);

    donutChart = new Chart(document.getElementById('donutChart'),{
        type:'doughnut',
        data:{
            labels:['Grade A','Grade B','Grade C','Grade D'],
            datasets:[{
                data:[gradeCounts.A,gradeCounts.B,gradeCounts.C,gradeCounts.D],
                backgroundColor:['#4CAF50','#2196F3','#FFC107','#F44336']
            }]
        },
        options:{responsive:true}
    });

    updateSummary(marks,assignments,attendance);
}

studentSelect.addEventListener('change',e=>{
    currentStudent = e.target.value;
    updateView();
});

rangeSelect.addEventListener('change',e=>{
    range = Number(e.target.value);
    updateView();
});

updateView();