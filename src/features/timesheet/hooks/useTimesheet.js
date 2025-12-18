import { useState, useMemo, useEffect } from "react";

/**
 * Hook for managing timesheet data and filters
 */
export function useTimesheet() {
  const [selectedEmployee, setSelectedEmployee] = useState("1");
  const [selectedMonth, setSelectedMonth] = useState(12);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [timesheetData, setTimesheetData] = useState([]);

  // Generate consistent data based on employee, month, year (not random)
  const generateTimesheetData = useMemo(() => {
    return (employeeId, month, year) => {
      const daysInMonth = new Date(year, month, 0).getDate();
      const data = [];

      // Use a seed based on employee, month, year for consistent data
      const seed = `${employeeId}-${month}-${year}`;
      const seededRandom = (day) => {
        const x =
          Math.sin(
            seed.split("").reduce((a, b) => {
              a = (a << 5) - a + b.charCodeAt(0);
              return a & a;
            }, day)
          ) * 10000;
        return x - Math.floor(x);
      };

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        const isWeekend = dayName === "Saturday" || dayName === "Sunday";

        // Consistent data based on seed
        const hasData = seededRandom(day) > 0.4 && !isWeekend;

        const row = {
          id: `${employeeId}-${year}-${month}-${day}`,
          date: day,
          day: dayName.substring(0, 3),
          facilityImprovement: "",
          training: "",
          paidTimeOffVacation: "",
          projectManagement: "",
          grace: "",
          sickTimeWithPay: "",
          holidayPaid: "",
          administrative: "",
          emailsAsa: "",
          warranty: "",
          machineMaintenance: "",
          organizationalMeeting: "",
          rmi: "",
          tmDescription: "",
          isWeekend,
        };

        if (hasData) {
          // Add some sample data based on day (consistent)
          if (seededRandom(day + 10) > 0.85) {
            row.facilityImprovement = Math.floor(seededRandom(day + 1) * 4);
          }
          if (seededRandom(day + 20) > 0.8) {
            row.training = Math.floor(seededRandom(day + 2) * 3);
          }
          if (seededRandom(day + 30) > 0.9) {
            row.paidTimeOffVacation = Math.floor(seededRandom(day + 3) * 4);
          }
          if (seededRandom(day + 40) > 0.7) {
            row.projectManagement = Math.floor(seededRandom(day + 4) * 6);
          }
          if (seededRandom(day + 50) > 0.75) {
            row.grace = Math.floor(seededRandom(day + 5) * 5);
          }
          if (seededRandom(day + 60) > 0.9) {
            row.sickTimeWithPay = Math.floor(seededRandom(day + 6) * 4);
          }
          if (seededRandom(day + 70) > 0.7) {
            row.holidayPaid = Math.floor(seededRandom(day + 7) * 4);
          }
          if (seededRandom(day + 80) > 0.7) {
            row.administrative = Math.floor(seededRandom(day + 8) * 8);
          }
          if (seededRandom(day + 90) > 0.6) {
            row.emailsAsa = Math.floor(seededRandom(day + 9) * 7);
          }
          if (seededRandom(day + 100) > 0.75) {
            row.warranty = Math.floor(seededRandom(day + 10) * 6);
          }
          if (seededRandom(day + 110) > 0.8) {
            row.machineMaintenance = Math.floor(seededRandom(day + 11) * 5);
          }
          if (seededRandom(day + 120) > 0.85) {
            row.organizationalMeeting = Math.floor(seededRandom(day + 12) * 3);
          }
          if (seededRandom(day + 130) > 0.75) {
            row.rmi = Math.floor(seededRandom(day + 13) * 4);
          }
          if (seededRandom(day + 140) > 0.5) {
            row.tmDescription = getDescription(seededRandom(day + 150));
          }
        }

        data.push(row);
      }

      // Calculate percentages
      const percentages = calculatePercentages(data);
      data.push({
        id: `percentage-${employeeId}-${year}-${month}`,
        ...percentages,
        date: "",
        day: "",
        isPercentage: true,
      });

      // Add summary row
      const summary = calculateSummary(data.filter((row) => !row.isPercentage));
      data.push({
        id: `summary-${employeeId}-${year}-${month}`,
        ...summary,
        date: "SUMMARY",
        day: "",
        isSummary: true,
      });

      return data;
    };
  }, []);

  // Load from localStorage or generate
  useEffect(() => {
    const storageKey = `timesheet-${selectedEmployee}-${selectedYear}-${selectedMonth}`;
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure percentage row exists
        if (!parsed.some((row) => row.isPercentage)) {
          const dataRows = parsed.filter(
            (row) => !row.isSummary && !row.isPercentage
          );
          const percentages = calculatePercentages(dataRows);
          const percentageRow = {
            id: `percentage-${selectedEmployee}-${selectedYear}-${selectedMonth}`,
            ...percentages,
            date: "",
            day: "",
            isPercentage: true,
          };
          // Insert before summary row
          const summaryIndex = parsed.findIndex((row) => row.isSummary);
          if (summaryIndex !== -1) {
            parsed.splice(summaryIndex, 0, percentageRow);
          } else {
            parsed.push(percentageRow);
          }
        }
        setTimesheetData(parsed);
      } catch (e) {
        // If parse fails, generate new data
        const generated = generateTimesheetData(
          selectedEmployee,
          selectedMonth,
          selectedYear
        );
        setTimesheetData(generated);
      }
    } else {
      const generated = generateTimesheetData(
        selectedEmployee,
        selectedMonth,
        selectedYear
      );
      setTimesheetData(generated);
    }
  }, [selectedEmployee, selectedMonth, selectedYear, generateTimesheetData]);

  const handleDataUpdate = (updatedData) => {
    setTimesheetData(updatedData);
    const storageKey = `timesheet-${selectedEmployee}-${selectedYear}-${selectedMonth}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedData));
  };

  return {
    selectedEmployee,
    setSelectedEmployee,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    timesheetData,
    handleDataUpdate,
  };
}

function calculateSummary(data) {
  const weekdays = data.filter(
    (row) => !row.isWeekend && !row.isSummary && !row.isPercentage
  );
  const totals = {
    facilityImprovement: 0,
    training: 0,
    paidTimeOffVacation: 0,
    projectManagement: 0,
    grace: 0,
    sickTimeWithPay: 0,
    holidayPaid: 0,
    administrative: 0,
    emailsAsa: 0,
    warranty: 0,
    machineMaintenance: 0,
    organizationalMeeting: 0,
    rmi: 0,
  };

  weekdays.forEach((row) => {
    Object.keys(totals).forEach((key) => {
      const value = parseFloat(row[key]) || 0;
      totals[key] += value;
    });
  });

  return totals;
}

function calculatePercentages(data) {
  const weekdays = data.filter(
    (row) => !row.isWeekend && !row.isSummary && !row.isPercentage
  );
  const totals = {
    facilityImprovement: 0,
    training: 0,
    paidTimeOffVacation: 0,
    projectManagement: 0,
    grace: 0,
    sickTimeWithPay: 0,
    holidayPaid: 0,
    administrative: 0,
    emailsAsa: 0,
    warranty: 0,
    machineMaintenance: 0,
    organizationalMeeting: 0,
    rmi: 0,
  };

  weekdays.forEach((row) => {
    Object.keys(totals).forEach((key) => {
      const value = parseFloat(row[key]) || 0;
      totals[key] += value;
    });
  });

  const grandTotal = Object.values(totals).reduce((sum, val) => sum + val, 0);
  const percentages = {};
  Object.keys(totals).forEach((key) => {
    percentages[key] =
      grandTotal > 0 ? ((totals[key] / grandTotal) * 100).toFixed(0) : 0;
  });

  return { percentages };
}

function getDescription(seed) {
  const descriptions = [
    "Quality assurance review",
    "Site preparation work",
    "Team coordination",
    "Training session",
    "Client meeting and site inspection",
    "Regular maintenance check",
    "Equipment installation and testing",
    "Documentation and reporting",
    "Emergency repair",
    "Project planning session",
  ];
  return descriptions[Math.floor(seed * descriptions.length)];
}
