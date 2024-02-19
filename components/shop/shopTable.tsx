"use client";

import { v4 } from "uuid";
import { Datum, LotData } from "@/models/lotData.model";
import { useEffect, useState } from "react";
import { dateSplitYear, dateSplitDays } from "@/utils/stringFormaters";
import Button from "../shared/button";

interface IProps {
  params: string;
}

const ShopTable = ({ params }: IProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [data, setData] = useState<LotData>();
  const [lots, setLots] = useState<Datum[]>([]);
  const [err, setErr] = useState<boolean>(false);
  const [dataFilter, setDataFilter] = useState<string>("old");
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await fetch(
        `https://smstv.gov.tm/api/shop/messages-by-code?page=${currentPage}`,
        dataFilter === "old"
          ? {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                unique_code: params,
              }),
            }
          : {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                unique_code: params,
                sort_by_dt_descending: true,
              }),
            }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: LotData = await response.json();
      setErr(false);
      setData(data);
      setLastPage(data.data.lot_sms_messages.meta.last_page);
      setLots((prevLots) =>
        currentPage === 1
          ? [...data.data.lot_sms_messages.data]
          : [...prevLots, ...data.data.lot_sms_messages.data]
      );
      setDataLoading(false);
    } catch (error) {
      console.error((error as any).toString());
      // Handle errors as needed
      setErr(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, dataFilter]);

  const filterClickHandler = (dataType: string) => {
    setDataFilter(dataType);
    setCurrentPage(1);
  };

  console.log(dataFilter);

  return data?.data && !err ? (
    <div className="flex items-center flex-col gap-[40px] ">
      <h1 className="text-[60px] leading-[100%] text-textBlack font-bold text-center max-w-[900px] w-full">
        {data?.data.seller_name}
      </h1>
      <div className="flex flex-col items-end w-full gap-[20px] max-w-[900px]">
        <div className="flex flex-col items-end w-full gap-[10px]">
          <div className="table_sort flex items-center gap-[10px]">
            <h3 className="text-textLight text-sm">Показать:</h3>
            <button
              className={`block ${
                dataFilter === "old"
                  ? "text-fillLinkActive underline cursor-default pointer-events-none"
                  : "text-fillLinkRest"
              } hover:text-fillLinkHover text-sm font-medium cursor-pointer`}
              onClick={() => filterClickHandler("old")}
            >
              Сначало старые
            </button>
            <button
              className={`block ${
                dataFilter === "new"
                  ? "text-fillLinkActive underline cursor-default pointer-events-none"
                  : "text-fillLinkRest"
              } hover:text-fillLinkHover text-sm font-medium cursor-pointer`}
              onClick={() => filterClickHandler("new")}
            >
              Сначало новые
            </button>
          </div>

          <div className="table_body flex flex-col w-full rounded-[25px] overflow-hidden">
            <div className="table_head flex w-full justify-between bg-fillTableHead border border-b rounded-t-[25px] border-fillTableStrokeTableHead">
              <span className="block text-textBlack py-[20px] px-[24px] w-[80px] text-base leading-[125%] font-semibold">
                №
              </span>
              <span className="block text-textBlack py-[20px] px-[24px] w-[200px] text-base leading-[125%] font-semibold">
                Telefon belgisi
              </span>
              <span className="block text-textBlack py-[20px] px-[24px] w-[230px] text-base leading-[125%] font-semibold">
                Kod
              </span>
              <span className="block text-textBlack py-[20px] px-[24px] w-[180px] text-base leading-[125%] font-semibold">
                Wagty
              </span>
            </div>
            <div className="table_row_body flex flex-col w-full rounded-b-[25px]">
              {lots.map((lot, index) => (
                <div
                  className={`table_row flex w-full justify-between ${
                    index % 2 === 0 ? "bg-fillTableRow2" : "bg-fillTableRow"
                  } border border-b border-fillTableStrokeTableRow`}
                  key={v4()}
                >
                  <span className="block text-textDarkt py-[20px] px-[24px] w-[80px] text-base leading-[125%] font-normal">
                    {index + 1}
                  </span>
                  <span className="block text-textDarkt py-[20px] px-[24px] w-[200px] text-base leading-[125%] font-normal">
                    {lot.client}
                  </span>
                  <span className="block text-textDarkt py-[20px] px-[24px] w-[230px] text-base leading-[125%] font-normal">
                    {lot.msg}
                  </span>
                  <div className="flex flex-col py-[20px] px-[24px] w-[180px]  leading-[125%] font-normal">
                    <span className="text-textDarkt text-base">
                      {dateSplitYear(lot.dt)}
                    </span>
                    <span className="text-textLight text-sm">
                      {dateSplitDays(lot.dt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {currentPage !== lastPage ? (
          <button
            className="p-[20px] w-full text-white text-[18px] text-medium leading-[125%] bg-fillButtonAccentDefault rounded-[25px]"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Ýenede goş
          </button>
        ) : null}
      </div>
    </div>
  ) : err ? (
    <div className="h-full flex  items-center justify-center text-2xl font-semibold text-textDarkt">
      <div className="gap-5 flex flex-col w-[200px] items-center">
        <p>Kod nädogry</p>
        <Button size="small" buttonLink="/">
          Yza
        </Button>
      </div>
    </div>
  ) : (
    <div className="h-full w-full flex items-center justify-center text-2xl font-semibold text-textDarkt">
      Loading...
    </div>
  );
};

export default ShopTable;
