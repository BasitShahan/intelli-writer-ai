"use client";

import React, { useState, useRef } from "react";
import {
  FaChevronRight,
  FaMicrophone,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import Link from "next/link";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { MdCloudUpload, MdOutlineDelete } from "react-icons/md";
import IntelliSpeechText from "@/utils/IntelliSpeechText";
import { TbSend } from "react-icons/tb";

const Page: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [resultText, setResultText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setAudioFile(file);
      e.target.value = "";
    }
  };

  const handleRecordButtonClick = () => {
    if (isRecording) {
      if (isPaused) {
        handleResumeClick();
      } else {
        stopRecording();
      }
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        const chunks: Blob[] = [];
        setRecordingTime(0);

        mediaRecorder.current.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });

        mediaRecorder.current.addEventListener("stop", () => {
          const audioBlob = new Blob(chunks);
          if (!isPaused) {
            handleNewAudioRecorded(audioBlob);
          }
        });

        mediaRecorder.current.start();
        setIsRecording(true);
        timerRef.current = window.setInterval(() => {
          setRecordingTime((prevTime) => prevTime + 1);
        }, 1000);
        document.title = "Recording...";
      })
      .catch((error) => {
        console.error("Error recording audio: ", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
      clearInterval(timerRef.current!);
      setIsRecording(false);
      setAudioFile(null);
      setIsPaused(false);
      mediaRecorder.current = null;
      document.title = "Voice Content Generator";
    }
  };

  const handlePauseClick = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.pause();
      clearInterval(timerRef.current!);
      setIsRecording(false);
      setIsPaused(true);
      document.title = "Voice Content Generator";
    }
  };

  const handleResumeClick = () => {
    if (mediaRecorder.current && !isRecording) {
      mediaRecorder.current.resume();
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
      setIsRecording(true);
      setIsPaused(false);
      document.title = "Recording...";
    }
  };

  const handleNewAudioRecorded = (audioBlob: Blob) => {
    setAudioFile(new File([audioBlob], "audio.mp3", { type: "audio/mp3" }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    audioBlob: Blob | null
  ) => {
    e.preventDefault();
    setLoader(true);
    setResultText("");
    setError("");

    try {
      if (audioBlob) {
        const data = {
          file: audioBlob,
        };
        const result = await IntelliSpeechText(data);
        if (result.success) {
          setError("");
          setResultText(result.transcription);
        } else {
          setError(result.message);
          setResultText("");
        }
        setLoader(false);
      } else {
        setError("Please select file fi!");
        setLoader(false);
      }
    } catch (error) {
      setError(`${error}`);
      setLoader(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="absolute top-14 right-0 md:px-20 md:py-5 p-6 w-full lg:w-[calc(100%-250px)] text-white">
      <div className="flex justify-center w-full flex-col h-full text-white md:py-10 py-5 -mt-6">
        {/* Prompt box */}
        <div className="text-base text-slate-400 font-light p-2 flex items-center gap-2">
          <Link href="/user/dashboard">Dashboard</Link>
          <FaChevronRight className="text-sm" />
          <span>Speech Text Generator</span>
        </div>

        <h2 className="text-3xl font-semibold p-2 pb-3">
          Speech Text Generator
        </h2>

        {/* Prompt Form */}
        <form
          onSubmit={(e) => handleSubmit(e, audioFile)}
          className="w-full border border-gray-600 rounded-md bg-[rgba(32,45,72,0.41)]"
        >
          <div className="flex flex-col items-center gap-3 p-5">
            {/* Option to upload audio */}
            <label htmlFor="upload-audio" className="hidden">
              Upload Audio
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
              id="upload-audio"
            />
            <div
              className="cursor-pointer w-full h-30vh rounded-md p-10 border border-gray-600 bg-[rgba(32,45,72,0.41)] flex flex-col items-center justify-center"
              onClick={() => document.getElementById("upload-audio")?.click()}
            >
              <MdCloudUpload className="text-6xl text-white" />
              Upload Audio file
            </div>
            <span className="text-center py-6">OR</span>

            <div className="w-full flex flex-col justify-between items-center gap-5 py-5">
              {/* Prompt Form */}
              <div className="w-full flex flex-col items-center justify-center gap-4">
                <div className="w-full flex flex-col items-center justify-center gap-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-bl from-btnPrimary to-btnSecondary rounded-full flex items-center justify-center text-white cursor-pointer`}
                    onClick={handleRecordButtonClick}
                  >
                    {isRecording ? (
                      isPaused ? (
                        <FaPlay
                          className="text-2xl"
                          onClick={handleResumeClick}
                        />
                      ) : (
                        <FaPause
                          className="text-2xl"
                          onClick={handlePauseClick}
                        />
                      )
                    ) : (
                      <FaMicrophone className="text-2xl" />
                    )}
                  </div>
                  {isRecording && (
                    <div className="text-white text-lg">
                      {formatTime(recordingTime)}
                    </div>
                  )}
                  <span>Record Audio</span>
                </div>

                {/* Display uploaded or recorded audio */}
                {audioFile && (
                  <div className="bg-[rgba(32,45,72,0.41)] w-full flex md:flex-row flex-col-reverse items-center justify-between rounded-lg gap-3 p-3">
                    <div className="md:w-11/12 w-full">
                      <AudioPlayer
                        src={URL.createObjectURL(audioFile)}
                        autoPlayAfterSrcChange={false}
                      />
                    </div>
                    <MdOutlineDelete
                      className="text-white opacity-60 md:text-4xl text-3xl cursor-pointer"
                      onClick={() => setAudioFile(null)}
                    />
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-gradient-to-bl from-btnPrimary to-btnSecondary font-semibold my-5 px-4 py-2 rounded-md h-fit flex justify-between items-center gap-2 hover:opacity-90"
                >
                  Submit <TbSend className="text-white text-xl" />
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="py-10">
          {error !== "" && (
            <span className="w-full text-sm text-red-600">{error}</span>
          )}

          {/* Loading Box */}
          {loader && (
            <div className="bg-primary border border-gray-600 rounded-lg w-full h-60 flex items-center justify-center">
              <div className="inline-block mt-5 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </div>
          )}

          {/* Response Box */}
          {resultText !== "" && (
            <div className="w-full">
              <textarea
                className="bg-primary border border-gray-600 rounded-lg p-4 focus:outline-none w-full"
                rows={10}
                value={resultText}
                readOnly
              ></textarea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
