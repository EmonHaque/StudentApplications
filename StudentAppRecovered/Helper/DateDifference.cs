using System;

namespace StudentAppRecovered.Helper
{
    //Author: Mohammed Ali Babu AIUB
    //http://www.codeproject.com/Articles/28837/Calculating-Duration-Between-Two-Dates-in-Years-Mo
    public class DateDifference
    {
        private int[] monthDay = new int[12] { 31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
        private DateTime fromDate;
        private DateTime toDate;
        public int Year;
        public int Month;
        public int Day;
        private int increment;

        public DateDifference(DateTime toDate, DateTime fromDate)
        {
            if (toDate > fromDate)
            {
                this.fromDate = fromDate;
                this.toDate = toDate;
            }
            else
            {
                this.fromDate = toDate;
                this.toDate = fromDate;
            }

            increment = 0;
            if (this.fromDate.Day > this.toDate.Day)
            {
                increment = this.monthDay[this.fromDate.Month - 1];
            }
            if (increment == -1)
            {
                if (DateTime.IsLeapYear(this.fromDate.Year))
                {
                    increment = 29;
                }
                else
                {
                    increment = 28;
                }
            }
            if (increment != 0)
            {
                Day = (this.toDate.Day + increment) - this.fromDate.Day;
                increment = 1;
            }
            else
            {
                Day = this.toDate.Day - this.fromDate.Day;
            }

            if ((this.fromDate.Month + increment) > this.toDate.Month)
            {
                this.Month = (this.toDate.Month + 12) - (this.fromDate.Month + increment);
                increment = 1;
            }
            else
            {
                this.Month = (this.toDate.Month) - (this.fromDate.Month + increment);
                increment = 0;
            }

            this.Year = this.toDate.Year - (this.fromDate.Year + increment);
        }
    }
}