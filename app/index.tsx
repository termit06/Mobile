import React, { useState, useEffect } from "react";
import { Text, View, Button, TextInput } from "react-native";

export default function Timer() {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [inputTime, setInputTime] = useState<{ d: number; y: number; h: number; m: number; s: number }>({
    d: 0,
    y: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval>;

    if (isRunning) {
      timerInterval = setInterval(() => {
        if (seconds === 0 && minutes === 0 && hours === 0 && days === 0 && years === 0) {
          clearInterval(timerInterval);
          setIsRunning(false);
          console.log("Timer ended");
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              if (hours === 0) {
                if (days === 0) {
                  if (years > 0) {
                    setYears(years - 1);
                    setDays(365); // Reset days to 365 when a year is decremented
                  }
                } else {
                  setDays(days - 1);
                  setHours(23);
                  setMinutes(59);
                  setSeconds(59);
                }
              } else {
                setHours(hours - 1);
                setMinutes(59);
                setSeconds(59);
              }
            } else {
              setMinutes(minutes - 1);
              setSeconds(59);
            }
          } else {
            setSeconds(seconds - 1);
          }
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning, seconds, minutes, hours, days, years]);

  const startTimer = () => {
    setDays(inputTime.d);
    setYears(inputTime.y);
    setHours(inputTime.h);
    setMinutes(inputTime.m);
    setSeconds(inputTime.s);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resumeTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setDays(0);
    setYears(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setInputTime({ d: 0, y: 0, h: 0, m: 0, s: 0 }); // Reset input fields as well
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Years"
        keyboardType="numeric"
        onChangeText={(text) => setInputTime({ ...inputTime, y: parseInt(text) || 0 })}
        style={{ borderWidth: 1, margin: 5, padding: 5, width: 100 }}
      />
      <TextInput
        placeholder="Days"
        keyboardType="numeric"
        onChangeText={(text) => setInputTime({ ...inputTime, d: parseInt(text) || 0 })}
        style={{ borderWidth: 1, margin: 5, padding: 5, width: 100 }}
      />
      <TextInput
        placeholder="Hours"
        keyboardType="numeric"
        onChangeText={(text) => setInputTime({ ...inputTime, h: parseInt(text) || 0 })}
        style={{ borderWidth: 1, margin: 5, padding: 5, width: 100 }}
      />
      <TextInput
        placeholder="Minutes"
        keyboardType="numeric"
        onChangeText={(text) => setInputTime({ ...inputTime, m: parseInt(text) || 0 })}
        style={{ borderWidth: 1, margin: 5, padding: 5, width: 100 }}
      />
      <TextInput
        placeholder="Seconds"
        keyboardType="numeric"
        onChangeText={(text) => setInputTime({ ...inputTime, s: parseInt(text) || 0 })}
        style={{ borderWidth: 1, margin: 5, padding: 5, width: 100 }}
      />
      <Button title="START" onPress={startTimer} />
      <Button title="PAUSE" onPress={pauseTimer} />
      <Button title="RESUME" onPress={resumeTimer} disabled={isRunning} />
      <Button title="RESET" onPress={resetTimer} />
      <Text>
        {years} years, {days} days, {hours} : {minutes} : {seconds}
      </Text>
    </View>
  );
}