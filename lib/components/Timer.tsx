"use client";

import { useEffect, useState, useContext } from "react";
import moment from "moment-timezone";
import useStore from "../store/useStore";

const Timer = () => {
  const {startingTime,endingTime}=useStore();
  const [statusType, setStatusType] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!startingTime || !endingTime) return;

    const start = getDateTimeString(startingTime).valueOf();
    const end = getDateTimeString(endingTime).valueOf();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = start - now;
      const passTime = end - now;

      if (distance > 0) {
        setStatusType("Upcoming");
        return;
      } else if (distance < 0 && passTime > 0) {
        setStatusType("running");
        setTimeLeft(calcTime(passTime));
      } else {
        setStatusType("Expired");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startingTime, endingTime]);

  const getDateTimeString = (time: string) =>
    moment(time, "HH:mm:ss UTC: Z, DD MMMM YYYY, dddd");

  const formatValue = (num: number) => (num < 10 ? `0${num}` : num);

  const calcTime = (dist: number) => ({
    days: Math.floor(dist / (1000 * 60 * 60 * 24)),
    hours: Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((dist % (1000 * 60)) / 1000),
  });

  return (
    <div className="text-center font-bold text-lg">
      {statusType === "running" ? (
        timeLeft.days > 0 ? (
          <div className="timer">
            {timeLeft.days} Day(s) {formatValue(timeLeft.hours)}:
            {formatValue(timeLeft.minutes)}:{formatValue(timeLeft.seconds)}
          </div>
        ) : (
          <div className="timer">
            {formatValue(timeLeft.hours)}:{formatValue(timeLeft.minutes)}:
            {formatValue(timeLeft.seconds)}
          </div>
        )
      ) : (
        <div className="timer">{statusType}</div>
      )}
    </div>
  );
};

export default Timer;
