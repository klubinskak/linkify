"use client";
import React from "react";
import styled from "styled-components";
import { IoAddOutline } from "react-icons/io5";
import { SubmitModal } from "@/app/components/layout/submit-modal";


export const SubmitButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  const handleModal = () => {
    setIsModalOpen(true);
  }

  return (
    <StyledWrapper>
      <button className="btn" onClick={handleModal}>
        <div className="add">
          <IoAddOutline size={20} />
        </div>
        <div className="comment">
          <div className="flex justify-center items-center gap-2">
            <IoAddOutline size={20} />
            <span className="text-sm text-center font-excon font-light">Submit</span>
          </div>
        </div>
      </button>

      {isModalOpen && (
        <SubmitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: #ff4401;
  }

  /* plus sign */
  .add {
    width: 100%;
    transition-duration: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* text */
  .comment {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    transition-duration: 0.3s;
  }
  /* hover effect on button width */
  .btn:hover {
    width: 120px;
    border-radius: 40px;
    transition-duration: 0.3s;
  }

  .btn:hover .sign {
    width: 50%;
    transition-duration: 0.3s;
    padding-left: 20px;
  }
  .btn:hover .add {
    opacity: 0;
  }
  /* hover effect button's text */
  .btn:hover .comment {
    opacity: 1;
    width: 100%;
    text-align: center;
    transition-duration: 0.3s;
    padding-right: 10px;
  }
  /* button click effect*/
  .btn:active {
    transform: translate(2px, 2px);
  }
`;

