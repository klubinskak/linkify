"use client";
import React from "react";

const About = () => {
  return (
    <div className="p-5">
      <div>
        <h1 className="text-xl font-bold mb-8">About</h1>
        <p className="py-3">Hi there! Let me introduce myself.</p>
        <p className="mt-3">
          I&apos;m{" "}
          <a
            href="https://klubinska.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            Klaudia
          </a>
          , a Software Developer living and working in Poland 🇵🇱
        </p>
        <h1 className="font-bold text-xl pt-5 pb-2">🤔 Why I built Linkify? </h1>
        <h3 className="pb-8">I&apos;ve{" "}been sharing useful resources, such as websites, on my Threads profile and want to create a hub where I can easily organize them and share them with everyone :)</h3>
        <hr className="bg-white h-[2px]" />
        <div className="mt-8 flex flex-col gap-6">
          <p className="w-3/4">
            Feel free to contribute to the project and submit website or show
            your support by buying me a coffee! I would love to hear your
            feedback and suggestions— stay connected and get updates on new
            submissions via{" "}
            <a
              className="font-bold"
              target="_blank"
              href="https://www.instagram.com/klaudiadev/"
            >
              Instagram
            </a>{" "}
            😊
          </p>
          <div>
            <a
              href="https://www.buymeacoffee.com/klubinskadev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "#FFDD00",
                color: "#212529",
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                border: "2px solid #000000",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#FFD700")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#FFDD00")
              }
            >
              <span style={{ marginRight: "8px", fontSize: "20px" }}>☕</span>
              Buy me a coffee
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
