"use client";
import Invoice from "@/components/Invoice";
import { Fragment, MouseEventHandler, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

interface Transaction {
  id: number;
  invoiceNumber: string;
  amount: string;
  tax?: string;
  status: string;
  client: string;
  description: string;
  icon: any;
}

interface Day {
  date: string;
  dateTime: string;
  transactions: Transaction[];
}

const statuses: { [key: string]: string } = {
  Paid: "text-green-700 bg-green-50 ring-green-600/20",
  Withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
  Overdue: "text-red-700 bg-red-50 ring-red-600/10",
};

const days: Day[] = [];

type HandleViewTransaction = (
  amount: string,
  invoiceNumber: string,
  client: string,
  tax: string | undefined,
  status: string,
  dateTime: string
) => MouseEventHandler<HTMLButtonElement>;

export default function PaymentPage(): JSX.Element {
  const [selectedTransaction, setSelectedTransaction] =
    useState<HandleViewTransaction | null>(null);

  const handleViewTransaction: HandleViewTransaction = (
    amount,
    invoiceNumber,
    client,
    tax,
    status,
    dateTime
  ) => {
    return () => {
      setSelectedTransaction({
        amount,
        invoiceNumber,
        client,
        tax,
        status,
        dateTime,
      });
    };
  };

  function classNames(...classes: (string | boolean)[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="absolute top-14 right-0 md:px-20 md:py-10 p-6 w-full lg:w-[calc(100%-250px)] mx-auto text-white">
      <h1 className="text-3xl font-semibold p-2 pb-3">Payment History</h1>
      <div className="mt-6 overflow-hidden">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0B0427] to-[#151841] rounded-[16px]">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <table className="w-full text-left">
              <thead className="sr-only">
                <tr>
                  <th>Amount</th>
                  <th className="hidden sm:table-cell">Client</th>
                  <th>More details</th>
                </tr>
              </thead>
              <tbody>
                {days.length === 0 ? (
                  <div className="text-center text-white">
                    No payment history found.
                  </div>
                ) : (
                  <>
                    {days.map((day) => (
                      <Fragment key={day.dateTime}>
                        <tr className="text-sm leading-6 text-white ">
                          <th
                            scope="colgroup"
                            colSpan={3}
                            className="relative isolate py-2 font-semibold"
                          >
                            <time dateTime={day.dateTime}>{day.date}</time>
                            <div className="absolute inset-y-0 border-none right-full -z-10 w-screen bg-gradient-to-b from-[#0B0427] to-[#151841] " />
                            <div className="absolute inset-y-0 left-0 -z-10 w-screen bg-gradient-to-b from-[#0B0427] to-[#151841]" />
                          </th>
                        </tr>
                        {day.transactions.map((transaction, index) => (
                          <tr
                            key={transaction.id}
                            className={`border-gray-400${
                              index === day.transactions.length - 1
                                ? ""
                                : " border-b"
                            }`}
                          >
                            <td className="relative py-5 md:pr-6">
                              <div className="flex gap-x-0 md:gap-x-6">
                                <transaction.icon
                                  className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                                  aria-hidden="true"
                                />
                                <div className="flex-auto">
                                  <div className="flex items-start gap-x-3">
                                    <div className="text-sm font-medium leading-6 text-white">
                                      {transaction.amount}
                                    </div>
                                    <div
                                      className={classNames(
                                        statuses[transaction.status],
                                        "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                                      )}
                                    >
                                      {transaction.status}
                                    </div>
                                  </div>
                                  {transaction.tax ? (
                                    <div className="mt-1 text-xs leading-5 text-white">
                                      {transaction.tax} tax
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </td>
                            <td className="hidden py-5 pr-6 sm:table-cell">
                              <div className="text-sm leading-6 text-white">
                                {transaction.client}
                              </div>
                              <div className="mt-1 text-xs leading-5 text-white">
                                {transaction.description}
                              </div>
                            </td>
                            <td className="py-5 text-right">
                              <div className="flex justify-end">
                                <button
                                  onClick={handleViewTransaction(
                                    transaction.amount,
                                    transaction.invoiceNumber,
                                    transaction.client,
                                    transaction.tax,
                                    transaction.status,
                                    day.dateTime
                                  )}
                                  className="text-sm font-medium leading-6 text-blue-300 hover:text-blue-500"
                                >
                                  View{" "}
                                  <span className="hidden sm:inline">
                                    transaction
                                  </span>
                                  <span className="sr-only">
                                    , invoice #{transaction.invoiceNumber},
                                    {transaction.client}
                                  </span>
                                </button>
                              </div>
                              <div className="mt-1 text-xs leading-5 text-white">
                                Invoice
                                <span className="text-white">
                                  #{transaction.invoiceNumber}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedTransaction && (
        <div className=" fixed inset-0 flex  justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="pt-20 h-full overflow-y-auto w-full overflow-hidden bg-transparent backdrop-blur-md bg-opacity-5 p-6 rounded-lg">
            <Invoice {...selectedTransaction} />
            <button
              type="button"
              onClick={() => setSelectedTransaction(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
