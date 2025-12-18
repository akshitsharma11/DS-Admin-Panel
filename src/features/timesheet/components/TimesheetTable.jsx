import { useState, useEffect } from "react";
import "./TimesheetTable.css";

// All hour columns in the correct order
const hourColumns = [
  "facilityImprovement",
  "training",
  "paidTimeOffVacation",
  "projectManagement",
  "grace",
  "sickTimeWithPay",
  "holidayPaid",
  "administrative",
  "emailsAsa",
  "warranty",
  "machineMaintenance",
  "organizationalMeeting",
  "rmi",
];

export function TimesheetTable({ data, onUpdate }) {
  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const calculateRowTotal = (row) => {
    return hourColumns.reduce((sum, key) => {
      const value = parseFloat(row[key]) || 0;
      return sum + value;
    }, 0);
  };

  const handleCellChange = (rowIndex, field, value) => {
    if (
      localData[rowIndex].isSummary ||
      localData[rowIndex].isPercentage
    ) {
      return; // Don't allow editing summary or percentage rows (weekend rows are now editable)
    }

    const updated = [...localData];
    updated[rowIndex] = {
      ...updated[rowIndex],
      [field]: value,
    };

    // Recalculate totals, percentages, and summary
    const dataRows = updated.filter(
      (row) => !row.isSummary && !row.isPercentage
    );
    const summary = calculateSummary(dataRows);
    const percentages = calculatePercentages(dataRows);

    // Update percentage row
    const percentageIndex = updated.findIndex((row) => row.isPercentage);
    if (percentageIndex !== -1) {
      updated[percentageIndex] = {
        ...percentages,
        date: "",
        day: "",
        isPercentage: true,
      };
    }

    // Update summary row
    const summaryIndex = updated.findIndex((row) => row.isSummary);
    if (summaryIndex !== -1) {
      updated[summaryIndex] = {
        ...summary,
        date: "SUMMARY",
        day: "",
        isSummary: true,
      };
    }

    setLocalData(updated);
    if (onUpdate) {
      onUpdate(updated);
    }
  };

  // Format number - remove .0 for whole numbers, keep decimals
  const formatNumber = (value) => {
    const num = parseFloat(value);
    if (isNaN(num) || num === 0) return "";
    // If it's a whole number, don't show .0
    if (num % 1 === 0) {
      return num.toString();
    }
    // Otherwise show with one decimal
    return num.toFixed(1);
  };

  const renderCell = (row, column, rowIndex) => {
    if (row.isPercentage) {
      // Percentage row - show only percentages
      if (column === "date" || column === "day") return "";
      if (column === "total") {
        return "100%";
      }
      if (column === "tmDescription") return "";
      if (hourColumns.includes(column)) {
        const percent = row.percentages?.[column] || 0;
        return `${percent}%`;
      }
      return "";
    }

    if (row.isSummary) {
      // Summary row - show totals
      if (column === "date") return "SUMMARY";
      if (column === "day") return ""; // Empty for day column, will be merged
      if (column === "total") {
        const total = hourColumns.reduce(
          (sum, key) => sum + (parseFloat(row[key]) || 0),
          0
        );
        return formatNumber(total);
      }
      if (column === "tmDescription") return "";
      if (hourColumns.includes(column)) {
        const value = parseFloat(row[column]) || 0;
        return formatNumber(value);
      }
      return "";
    }

    if (column === "date") return row.date;
    if (column === "day") return row.day;
    if (column === "total") {
      const total = calculateRowTotal(row);
      return formatNumber(total);
    }

    if (hourColumns.includes(column)) {
      // Editable hour field - use number input for spinner
      return (
        <input
          type="number"
          step="0.1"
          min="0"
          className="hour-input"
          value={row[column] || ""}
          onChange={(e) => {
            const val = e.target.value;
            handleCellChange(
              rowIndex,
              column,
              val === "" ? "" : parseFloat(val) || ""
            );
          }}
          placeholder=""
        />
      );
    }

    if (column === "tmDescription") {
      // Editable T&M Description field
      return (
        <input
          type="text"
          className="description-input"
          value={row[column] || ""}
          onChange={(e) => handleCellChange(rowIndex, column, e.target.value)}
          placeholder=""
        />
      );
    }

    return row[column] || "";
  };

  return (
    <div className="timesheet-table-wrapper">
      <div className="timesheet-table-scroll">
        <table className="timesheet-table">
          <thead>
            <tr>
              <th className="fixed-col date-col">Date</th>
              <th className="fixed-col day-col">Day</th>
              <th>Facility Improvement</th>
              <th>Training</th>
              <th>Paid time off - Vacation</th>
              <th>Project/Operations Management</th>
              <th>Grace - 11120 Mayton Pl Beverly Hills</th>
              <th>Sick Time with pay</th>
              <th>Holiday Paid</th>
              <th>Administrative</th>
              <th>Emails & Asana</th>
              <th>Warranty</th>
              <th>Machine maintenance</th>
              <th>Organizational Meeting</th>
              <th>RMI</th>
              <th className="fixed-col total-col">Total</th>
              <th className="fixed-col description-col">T&M Description</th>
            </tr>
          </thead>
          <tbody>
            {localData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  row.isWeekend
                    ? "weekend-row"
                    : row.isPercentage
                    ? "percentage-row"
                    : row.isSummary
                    ? "summary-row"
                    : ""
                }
              >
                {row.isSummary ? (
                  <td className="fixed-col date-col summary-merged" colSpan={2}>
                    {renderCell(row, "date", rowIndex)}
                  </td>
                ) : (
                  <>
                    <td className="fixed-col date-col">
                      {renderCell(row, "date", rowIndex)}
                    </td>
                    <td className="fixed-col day-col">
                      {renderCell(row, "day", rowIndex)}
                    </td>
                  </>
                )}
                <td>{renderCell(row, "facilityImprovement", rowIndex)}</td>
                <td>{renderCell(row, "training", rowIndex)}</td>
                <td>{renderCell(row, "paidTimeOffVacation", rowIndex)}</td>
                <td>{renderCell(row, "projectManagement", rowIndex)}</td>
                <td>{renderCell(row, "grace", rowIndex)}</td>
                <td>{renderCell(row, "sickTimeWithPay", rowIndex)}</td>
                <td>{renderCell(row, "holidayPaid", rowIndex)}</td>
                <td>{renderCell(row, "administrative", rowIndex)}</td>
                <td>{renderCell(row, "emailsAsa", rowIndex)}</td>
                <td>{renderCell(row, "warranty", rowIndex)}</td>
                <td>{renderCell(row, "machineMaintenance", rowIndex)}</td>
                <td>{renderCell(row, "organizationalMeeting", rowIndex)}</td>
                <td>{renderCell(row, "rmi", rowIndex)}</td>
                <td className="fixed-col total-col">
                  {renderCell(row, "total", rowIndex)}
                </td>
                <td className="fixed-col description-col">
                  {renderCell(row, "tmDescription", rowIndex)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
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
