"use client";
import { myData, useGitHubData } from "@/hooks/userFetch";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
const Userdetails = () => {
  let [input, setInput] = useState<string>("");
  const { theme: currentTheme } = useTheme();
  const isLightTheme = currentTheme === "light";
  const { userProfile } = useGitHubData(input);
  const { myProfile } = myData();
  const { data, isLoading, isError, error, refetch, isFetching } = userProfile;
  const {
    data: data1,
    isLoading: myLoading,
    isError: myError,
    error: myErrorData,
    isFetching: fetching,
  } = myProfile;
  const [showData1, setShowData1] = useState(true);

  const userFetch = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await refetch();
    setShowData1(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    setInput(newInput);

    // Reset showData1 to true if input is empty
    if (newInput.trim() === "") {
      setShowData1(true);
    }
  };
  const isoTimestamp = data1?.created_at;
  const date = new Date(isoTimestamp ?? "");
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const formattedDate = `${day} ${month}, ${year}`;

  const isoTimestamp1 = data?.created_at;
  const date1 = new Date(isoTimestamp1 ?? "");
  const year1 = date1.getFullYear();
  const month1 = date1.toLocaleString("default", { month: "long" });
  const day1 = date1.getDate();
  const formattedDate1 = `${day1} ${month1}, ${year1}`;

  return (
    <>
      <form
        action=""
        className={`
                flex
                md:flex-row
                gap-[30px]
                items-center
                justify-center
                border-[1px_solid_#eaeaea]
                w-full
                rounded-[15px]
               


            `}
      >
        <input
          type="text"
          required
          value={input}
          onChange={handleInputChange}
          placeholder="Search GitHub username..."
          className={`w-full p-[20px_30px] rounded-[5px] ${
            isLightTheme ? "bg-slate-200 shadow-md" : "shadow-none"
          } border-none outline-none`}
        />
        <button
          disabled={input.trim() === ""}
          onClick={userFetch}
          className={`
                    p-[20px_30px]
                    rounded-[5px]
                    border-none
                    outline-none
                    text-white
                    transition-colors
                    duration-300
                    ease-in-out
                    ${
                      input.trim() !== ""
                        ? "bg-[#1e86ff] hover:bg-[#1b75e8] cursor-pointer"
                        : "bg-gray-300 cursor-not-allowed"
                    }
                  `}
        >
          Search
        </button>
      </form>
      <div
        className={`
                flex 
                flex-row 
                lg:justify-center 
                items-start 
                gap-12
                border-none
                
                rounded-[10px]
                p-[12px]
            ${
              isLightTheme
                ? "bg-[#ededed] shadow-emerald-100"
                : "bg-[#1e2a47] shadow-none"
            }
            `}
      >
        {/* Show loading spinner while fetching data */}
        {myLoading ? (
          <div className="flex justify-center items-center">
            <ClockLoader size={50} color="#1e86ff" />
          </div>
        ) : (
          <>
            {showData1 && (
              <Image
                src={data1?.avatar_url ?? ""}
                alt="Picture of the author"
                width={117}
                height={117}
                className="
                                hidden
                                lg:block
                                rounded-[50%]
                                w-[117px]
                                h-[117px]
                                gap-8
                                "
              />
            )}
            {showData1 && (
              <div
                className="
                            grid
                            grid-cols-[repeat(2,_auto)]
                            lg:grid-rows-[repeat(2,_auto)]
                            md:grid-rows-[repeat(3,_auto)]
                            justify-start
                            items-between
                            md:justify-start
                            lg:justify-between
                            lg:gap-x-[13em]
                        gap-x-[1em]    
                            gap-y-[2px]
                            "
              >
                <Image
                  src={data1?.avatar_url ?? ""}
                  alt="Picture of the author"
                  width={100}
                  height={100}
                  className="
                                    sm:max-w-[100px]
                                    rounded-[50%]
                                    w-[100px]
                                    h-[100px]
                                    gap-8
                                    block
                                    lg:hidden
                            "
                />
                <div
                  className="
                                flex flex-col
                                lg:flex-row
                                flex-wrap
                                justify-between
                                lg:gap-x-[20px]
                                    "
                >
                  <h1
                    className={`text-[1.2rem] leading-9 font-[700] 
                                ${
                                  isLightTheme
                                    ? "text-[#2b3442]"
                                    : "text-[#fff]"
                                }
                                `}
                  >
                    {data1?.name}
                  </h1>
                  <h1
                    className={`text-[0.938rem] leading-[37px] font-[400] 
                                ${
                                  isLightTheme
                                    ? "text-[#535353]"
                                    : "text-[#697c9a]"
                                }
                                `}
                  >
                    Joined {formattedDate}
                  </h1>
                  <h1
                    className={`text-[1rem] leading-9 font-[700] 
                                ${
                                  isLightTheme
                                    ? "text-[#0079ff]"
                                    : "text-[#0079ff]"
                                }
                                `}
                  >
                    @{data1?.login}
                  </h1>
                  <p>{data1?.bio}</p>
                  <ul
                    className={`
                  flex justify-around mt-2 items-start p-[16px_32px] rounded-[5px] gap-4
                    ${isLightTheme ? "bg-[#e0e1e3]" : "bg-[#141d2f]"} mb-[36px]
                  `}
                  >
                    <li>
                      <h4 className="text-[#4b6a9b] text-[0.813rem] leading-[20px] font-[400]">
                        Repos
                      </h4>
                      <h1 className="text-[#2b3442] text-[1.375rem] leading-[33px] font-[700]">
                        {data1?.public_repos}
                      </h1>
                    </li>
                    <li>
                      <h4 className="text-[#4b6a9b] text-[0.813rem] leading-[20px] font-[400]">
                        Followers
                      </h4>
                      <h1 className="text-[#2b3442] text-[1.375rem] leading-[33px] font-[700]">
                        {data1?.followers}
                      </h1>
                    </li>
                    <li>
                      <h4 className="text-[#4b6a9b] text-[0.813rem] leading-[20px] font-[400]">
                        Following
                      </h4>
                      <h1 className="text-[#2b3442] text-[1.375rem] leading-[33px] font-[700]">
                        {data1?.following}
                      </h1>
                    </li>
                  </ul>
                  <div className='flex flex-col'>
                        <h1>@{data1?.twitter_username}</h1>
                        <h1 className='truncate'>{data1?.blog}</h1>
                      </div>

                      <div className='flex flex-col'>
                        <h1>{data1?.company}</h1>
                        <h1>{data1?.html_url}</h1>
                      </div>
                </div>
              </div>
            )}
          </>
        )}
        {isFetching ? (
          <div className="flex justify-center items-center">
            <ClockLoader size={50} color="#1e86ff" />
          </div>
        ) : (
          <>
            {isError ? (
              <div className="text-red-600 flex flex-col">
                <h1> Error: {error.message}</h1>
                <h1>Message: User {(error as any)?.response?.data?.message}</h1>
              </div>
            ) : (
              <>
                {!showData1 && !isError && data && (
                  <Image
                    src={data?.avatar_url ?? ""}
                    alt="Picture of the author"
                    width={117}
                    height={117}
                    className="
                            hidden
                            lg:block
                            rounded-[50%]
                            w-[117px]
                            h-[117px]
                            gap-8
                        "
                  />
                )}
                {!showData1 && data && (
                  <div
                    className="
                        grid
                        grid-cols-[repeat(2,_auto)]
                        lg:grid-rows-[repeat(2,_auto)]
                        md:grid-rows-[repeat(3,_auto)]
                        justify-start
                        items-between
                        md:justify-start
                        lg:justify-between
                        lg:gap-x-[13em]
                        gap-x-[1em]    
                        gap-y-[2px]
                    "
                  >
                    <Image
                      src={data?.avatar_url ?? ""}
                      alt="Picture of the author"
                      width={100}
                      height={100}
                      className="
                                rounded-[50%]
                                w-[100px]
                                h-[100px]
                                gap-8
                                block
                                lg:hidden
                            "
                    />
                    <div
                      className="
                                flex flex-col
                                lg:flex-row
                                flex-wrap
                                justify-between
                                lg:gap-x-[20px]
                            "
                    >
                      <h1
                        className={`text-[1.625rem] leading-9 font-[700] 
                                ${
                                  isLightTheme
                                    ? "text-[#2b3442]"
                                    : "text-[#fff]"
                                }
                            `}
                      >
                        {data?.name}
                      </h1>
                      <h1
                        className={`text-[0.938rem] leading-[37px] font-[400] 
                                ${
                                  isLightTheme
                                    ? "text-[#535353]"
                                    : "text-[#697c9a]"
                                }
                            `}
                      >
                        Joined {formattedDate1}
                      </h1>
                      <h1
                        className={`text-[1rem] leading-9 font-[700] 
                                ${
                                  isLightTheme
                                    ? "text-[#0079ff]"
                                    : "text-[#0079ff]"
                                }
                            `}
                      >
                        @{data?.login}
                      </h1>
                      <p>{data?.bio}</p>
                      <ul
                        className={`
                  flex justify-around mt-2 items-start p-[16px_32px] rounded-[5px] gap-4
                    ${isLightTheme ? "bg-[#e0e1e3]" : "bg-[#141d2f]"} mb-[36px]
                  `}
                      >
                        <li>
                          <h4 className="text-[#4b6a9b] text-[0.813rem] leading-[20px] font-[400]">
                            Repos
                          </h4>
                          <h1 className="text-[#2b3442] text-[1.375rem] leading-[33px] font-[700]">
                            {data?.public_repos}
                          </h1>
                        </li>
                        <li>
                          <h4 className="text-[#4b6a9b] text-[0.813rem] leading-[20px] font-[400]">
                            Followers
                          </h4>
                          <h1 className="text-[#2b3442] text-[1.375rem] leading-[33px] font-[700]">
                            {data?.followers}
                          </h1>
                        </li>
                        <li>
                          <h4 className="text-[#4b6a9b] text-[0.813rem] leading-[20px] font-[400]">
                            Following
                          </h4>
                          <h1 className="text-[#2b3442] text-[1.375rem] leading-[33px] font-[700]">
                            {data?.following}
                          </h1>
                        </li>
                      </ul>
                      <div className='flex flex-col'>
                        <h1>@{data?.twitter_username}</h1>
                        <h1 className='truncate'>{data?.blog}</h1>
                      </div>

                      <div className='flex flex-col'>
                        <h1>{data?.company}</h1>
                        <h1>{data?.html_url}</h1>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Userdetails;
