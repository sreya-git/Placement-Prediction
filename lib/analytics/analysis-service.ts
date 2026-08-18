import { CleanedStudentRecord, AnalysisSummary, ChartDataSets } from '../types/dataset';

export class AnalysisService {
  /**
   * Computes dynamic answers to the 5 exploratory data questions.
   */
  static generateAnalysis(records: CleanedStudentRecord[]): AnalysisSummary {
    if (!records || records.length === 0) {
      throw new Error('No cleaned records available for analysis.');
    }

    const totalAnalyzed = records.length;

    // 1. Department Score aggregations
    const deptScoreMap: Record<string, { totalScore: number; count: number }> = {};
    const deptCountMap: Record<string, number> = {};

    let totalAttendance = 0;
    let totalStudyHours = 0;
    let studentsWithBacklogsCount = 0;

    records.forEach((row) => {
      const dept = row.dept || 'Unknown';
      if (!deptScoreMap[dept]) {
        deptScoreMap[dept] = { totalScore: 0, count: 0 };
      }
      deptScoreMap[dept].totalScore += row.final_score;
      deptScoreMap[dept].count += 1;

      deptCountMap[dept] = (deptCountMap[dept] || 0) + 1;

      totalAttendance += row.attendance_percentage;
      totalStudyHours += row.study_hour;

      if (row.backlogs > 0) {
        studentsWithBacklogsCount += 1;
      }
    });

    // Q1: Highest score dept
    let highestScoreDept = { dept: 'N/A', avgScore: 0 };
    Object.entries(deptScoreMap).forEach(([dept, data]) => {
      const avg = data.totalScore / data.count;
      if (avg > highestScoreDept.avgScore) {
        highestScoreDept = { dept, avgScore: Number(avg.toFixed(1)) };
      }
    });

    // Q2: Average attendance
    const averageAttendance = Number((totalAttendance / totalAnalyzed).toFixed(1));

    // Q3: Students with backlogs
    const studentsWithBacklogs = {
      count: studentsWithBacklogsCount,
      percentage: Number(((studentsWithBacklogsCount / totalAnalyzed) * 100).toFixed(1)),
    };

    // Q4: Department with most students
    let mostStudentsDept = { dept: 'N/A', count: 0, percentage: 0 };
    Object.entries(deptCountMap).forEach(([dept, count]) => {
      if (count > mostStudentsDept.count) {
        mostStudentsDept = {
          dept,
          count,
          percentage: Number(((count / totalAnalyzed) * 100).toFixed(1)),
        };
      }
    });

    // Q5: Average study time
    const averageStudyHours = Number((totalStudyHours / totalAnalyzed).toFixed(1));

    const questions = [
      {
        id: 'q1',
        question: 'Which department has the highest average final score?',
        answer: highestScoreDept.dept,
        unit: `(Avg: ${highestScoreDept.avgScore}/100)`,
        badge: 'Top Department',
        detail: `Students in ${highestScoreDept.dept} achieved the highest average final exam score of ${highestScoreDept.avgScore} across all branches.`,
        context: 'Computed by grouping student final scores by department and calculating the mean.',
      },
      {
        id: 'q2',
        question: 'What is the average attendance across all students?',
        answer: `${averageAttendance}%`,
        unit: 'overall average',
        badge: 'Attendance Metric',
        detail: `The overall student body maintains an average attendance rate of ${averageAttendance}%. Regular attendance is a major factor in student success.`,
        context: 'Computed by taking the sum of attendance percentages divided by total students.',
      },
      {
        id: 'q3',
        question: 'How many students currently have one or more backlogs?',
        answer: studentsWithBacklogs.count,
        unit: `students (${studentsWithBacklogs.percentage}%)`,
        badge: 'Academic Health',
        detail: `${studentsWithBacklogs.count} out of ${totalAnalyzed} students (${studentsWithBacklogs.percentage}%) currently have active backlogs.`,
        context: 'Calculated by filtering students with backlogs > 0.',
      },
      {
        id: 'q4',
        question: 'Which department has the largest student enrollment?',
        answer: mostStudentsDept.dept,
        unit: `${mostStudentsDept.count} students (${mostStudentsDept.percentage}%)`,
        badge: 'Branch Size',
        detail: `${mostStudentsDept.dept} represents the largest student cohort with ${mostStudentsDept.count} registered students.`,
        context: 'Counted unique students per department branch.',
      },
      {
        id: 'q5',
        question: 'What is the average daily study time per student?',
        answer: `${averageStudyHours} hrs`,
        unit: 'per day',
        badge: 'Effort Metric',
        detail: `On average, students invest approximately ${averageStudyHours} hours per day in self-study and assignments.`,
        context: 'Calculated from the mean of daily self-study hours.',
      },
    ];

    return {
      highestScoreDept,
      averageAttendance,
      studentsWithBacklogs,
      mostStudentsDept,
      averageStudyHours,
      totalAnalyzed,
      questions,
    };
  }

  /**
   * Generates datasets tailored for interactive charts.
   */
  static generateChartData(records: CleanedStudentRecord[]): ChartDataSets {
    // 1. Avg Final Score by Dept
    const deptScoreMap: Record<string, { totalScore: number; count: number }> = {};
    const deptCountMap: Record<string, number> = {};
    const backlogMap: Record<string, number> = { '0': 0, '1': 0, '2': 0, '3+': 0 };

    records.forEach((r) => {
      const dept = r.dept || 'Other';
      if (!deptScoreMap[dept]) {
        deptScoreMap[dept] = { totalScore: 0, count: 0 };
      }
      deptScoreMap[dept].totalScore += r.final_score;
      deptScoreMap[dept].count += 1;

      deptCountMap[dept] = (deptCountMap[dept] || 0) + 1;

      if (r.backlogs === 0) backlogMap['0'] += 1;
      else if (r.backlogs === 1) backlogMap['1'] += 1;
      else if (r.backlogs === 2) backlogMap['2'] += 1;
      else backlogMap['3+'] += 1;
    });

    const avgFinalScoreByDept = Object.entries(deptScoreMap).map(([dept, val]) => ({
      dept,
      avgFinalScore: Number((val.totalScore / val.count).toFixed(1)),
      studentCount: val.count,
    })).sort((a, b) => b.avgFinalScore - a.avgFinalScore);

    // 2. Attendance vs Final Score
    const attendanceVsFinalScore = records.map((r) => ({
      attendance: Number(r.attendance_percentage.toFixed(1)),
      finalScore: Number(r.final_score.toFixed(1)),
      dept: r.dept,
      placement: r.placement_status,
      studyHour: Number(r.study_hour.toFixed(1)),
    }));

    // 3. Students by Dept
    const total = records.length;
    const studentsByDept = Object.entries(deptCountMap).map(([dept, count]) => ({
      dept,
      count,
      percentage: Number(((count / total) * 100).toFixed(1)),
    })).sort((a, b) => b.count - a.count);

    // 4. Backlog distribution
    const backlogDistribution = Object.entries(backlogMap).map(([key, count]) => ({
      backlogs: key === '3+' ? '3+ Backlogs' : `${key} Backlog${key === '1' ? '' : 's'}`,
      count,
      percentage: Number(((count / total) * 100).toFixed(1)),
    }));

    // 5. Study hours vs Final score
    const studyHoursVsFinalScore = records.map((r) => ({
      studyHour: Number(r.study_hour.toFixed(1)),
      finalScore: Number(r.final_score.toFixed(1)),
      dept: r.dept,
      placement: r.placement_status,
    }));

    return {
      avgFinalScoreByDept,
      attendanceVsFinalScore,
      studentsByDept,
      backlogDistribution,
      studyHoursVsFinalScore,
    };
  }
}
