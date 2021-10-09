import React from "react";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const checkPalindrome = () => {
    const dateArray = date.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day =
      Number(dateArray[2]).toString().length === 1
        ? "0" + Number(dateArray[2])
        : Number(dateArray[2]);
    let list = checkPalindromeForAllDateFormats(day, month, year);
    if (list.length > 0) {
      setMessage(`Yay! Your birthday is palindrome!`);
    } else {
      const [next, nextDate] = getNextPalindromeDate(day, month, year);
      const [prev, prevDate] = getPreviousPalindromeDate(day, month, year);
      if (next > prev) {
        setMessage(
          `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${prev} days.`
        );
      } else {
        setMessage(
          `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${next} days.`
        );
      }
    }
  };

  const getNextPalindromeDate = (d, m, y) => {
    let obj = getNextDate(d, m, y);
    let ctr = 0;
    while (1) {
      ctr++;
      let resultList = checkPalindromeForAllDateFormats(
        obj.day,
        obj.month,
        obj.year
      );
      if (resultList.length > 0) {
        return [ctr, obj];
      }
      obj = getNextDate(obj.day, obj.month, obj.year);
    }
  };

  const getPreviousPalindromeDate = (d, m, y) => {
    let obj = getPreviousDate(d, m, y);
    let ctr = 0;
    while (1) {
      ctr++;
      let resultList = checkPalindromeForAllDateFormats(
        obj.day,
        obj.month,
        obj.year
      );
      if (resultList.length > 0) {
        return [ctr, obj];
      }
      obj = getPreviousDate(obj.day, obj.month, obj.year);
    }
  };

  const isLeapYear = (year) => {
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    if (year % 4 === 0) return true;
    return false;
  };

  const getNextDate = (d, m, y) => {
    let day = Number(d) + 1;
    let month = Number(m);
    let year = Number(y);
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      } else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }

    if (month > 12) {
      month = 1;
      year++;
    }

    return {
      day: day.toString().length === 1 ? "0" + day : day,
      month: month.toString().length === 1 ? "0" + month : month,
      year: year,
    };
  };

  const getPreviousDate = (d, m, y) => {
    let day = Number(d) - 1;
    let month = Number(m);
    let year = Number(y);
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day === 0) {
      month--;
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      } else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        } else {
          day = 28;
        }
      } else {
        day = daysInMonth[month - 1];
      }
    }
    return {
      day: day.toString().length === 1 ? "0" + day : day,
      month: month.toString().length === 1 ? "0" + month : month,
      year: year,
    };
  };

  const checkPalindromeForAllDateFormats = (day, month, year) => {
    let formatList = getDateInAllFormats(day, month, year);
    let possibleList = [];
    for (let str of formatList) {
      let result = checkPalindromeStr(str);
      if (result) {
        possibleList.push(str);
      }
    }
    return possibleList;
  };

  const getDateInAllFormats = (day, month, year) => {
    day = day.toString();
    month = month.toString();
    year = year.toString();
    let ddmmyyyy = day + month + year;
    let mmddyyyy = month + day + year;
    let yyyymmdd = year + month + day;
    let ddmmyy = day + month + year.slice(-2);
    let mmddyy = month + day + year.slice(-2);
    let yyddmm = year.slice(-2) + day + month;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  };

  const checkPalindromeStr = (str) => {
    return str === str.toString().split("").reverse().join("");
  };

  return (
    <div className="App">
      <div>
        <h1 className="heading">Palindrome Birthday!</h1>
        <label className="input-label" htmlFor="dob">
          Select your Birth date:
        </label>
        <input
          className="input"
          id="dob"
          type="date"
          value={date}
          onChange={(e) => {
            setMessage("");
            setDate(e.target.value);
          }}
        />

        <button
          id="check-button"
          className={date !== "" ? "enabled" : "disabled"}
          disabled={date !== "" ? false : true}
          onClick={() => {
            checkPalindrome();
          }}
        >
          CHECK
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}
